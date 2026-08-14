const { execSync } = require('child_process');
const fs = require('fs');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    const dirPath = dir + '/' + f;
    const isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(dirPath);
  });
}

walkDir('./src', (file) => {
  if (!file.endsWith('.jsx') && !file.endsWith('.js')) return;
  let content = fs.readFileSync(file, 'utf8');
  if (!content.includes('calc(*var')) return;
  
  let oldContent;
  try {
    oldContent = execSync(`git show "HEAD:${file.replace('./', '')}"`, {encoding: 'utf8'});
  } catch(e) { return; }
  
  const oldMatches = [...oldContent.matchAll(/text-\[(\d+(?:\.\d+)?)px\]/g)];
  let matchIndex = 0;
  
  const newContent = content.replace(/text-\[calc\(\*var\(--text-scale,1\)\)\]/g, () => {
    if (matchIndex < oldMatches.length) {
      const val = oldMatches[matchIndex++][1];
      return `text-[calc(${val}px*var(--text-scale,1))]`;
    }
    return 'ERROR';
  });
  
  fs.writeFileSync(file, newContent, 'utf8');
  console.log('Fixed ' + file);
});
