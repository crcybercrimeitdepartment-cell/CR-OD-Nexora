const fs = require('fs');
const pages = [
  { file: 'SMI', arr: 'SMI_TOOLS' },
  { file: 'RII', arr: 'RII_TOOLS' },
  { file: 'TGRI', arr: 'TGRI_TOOLS' },
  { file: 'LIH', arr: 'LIH_TOOLS' },
  { file: 'KYCDI', arr: 'KYC_TOOLS' },
  { file: 'GHLRI', arr: 'GHLRI_TOOLS' },
  { file: 'CRI', arr: 'CRI_TOOLS' }
];

pages.forEach(p => {
  const filePath = `./src/page/${p.file}.jsx`;
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Remove the array definition
  const regex = new RegExp(`const\\s+${p.arr}\\s*=\\s*\\[([\\s\\S]*?)\\];`);
  content = content.replace(regex, '');
  
  // Add the import statement
  content = `import { ${p.arr} } from '../data/subTools';\n` + content;
  
  fs.writeFileSync(filePath, content);
});

console.log('Successfully updated 7 page files to import from subTools.');
