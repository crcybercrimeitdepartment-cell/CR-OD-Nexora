const fs = require('fs');
const files = [
  'src/page/AccountSetting/DeleteHistory.jsx',
  'src/page/AccountSetting/StorageUsage.jsx'
];

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let updated = false;

  content = content.replace(/(<div[^>]*className=["'][^"']*(?:overflow-auto|overflow-y-auto)[^"']*["'])([^>]*>)/g, (match, p1, p2) => {
    if (match.includes('data-lenis-prevent')) return match;
    updated = true;
    return p1 + ' data-lenis-prevent' + p2;
  });

  if (updated) {
    fs.writeFileSync(file, content);
    console.log('Updated ' + file);
  } else {
    console.log('No updates for ' + file);
  }
});
