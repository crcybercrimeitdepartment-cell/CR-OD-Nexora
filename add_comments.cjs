const fs = require('fs');
const path = require('path');

const HEADER_COMMENT = `/**
 * Header Component.
 * Renders the title and a brief description of the page's purpose.
 * 
 * @param {Object} props - Component properties.
 * @param {string} [props.title] - Optional override for the title.
 * @param {string} [props.description] - Optional override for the description.
 * @returns {JSX.Element} The rendered header component.
 */
export function Header`;

const PAGE_COMMENT = `/**
 * Main Page Component.
 * Handles the display, routing, and user interactions for this specific intelligence record.
 * 
 * @param {Object} props - Component properties.
 * @param {Function} props.onBack - Callback function triggered when the user clicks the "Back" button to return to the parent dashboard.
 * @returns {JSX.Element} The rendered page layout.
 */
export default function`;

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

let modifiedCount = 0;

walkDir('./src/page', (filePath) => {
  if (filePath.endsWith('.jsx')) {
    let content = fs.readFileSync(filePath, 'utf8');
    let changed = false;

    // Check for Header export
    if (content.includes('export function Header') && !content.includes('* Header Component.')) {
      content = content.replace(/export function Header/, HEADER_COMMENT);
      changed = true;
    }

    // Check for default function export
    if (content.includes('export default function') && !content.includes('* Main Page Component.')) {
      content = content.replace(/export default function/, PAGE_COMMENT);
      changed = true;
    }

    if (changed) {
      fs.writeFileSync(filePath, content, 'utf8');
      modifiedCount++;
      console.log(`Updated comments in: ${filePath}`);
    }
  }
});

console.log(`Finished processing. Modified ${modifiedCount} files.`);
