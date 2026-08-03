const fs = require('fs');
const path = require('path');

const pages = [
  { file: 'SMI', parent: 'SMI', arr: 'SMI_TOOLS' },
  { file: 'RII', parent: 'RII', arr: 'RII_TOOLS' },
  { file: 'TGRI', parent: 'TGRI', arr: 'TGRI_TOOLS' },
  { file: 'LIH', parent: 'LIH', arr: 'LIH_TOOLS' },
  { file: 'KYCDI', parent: 'KYCDI', arr: 'KYC_TOOLS' },
  { file: 'GHLRI', parent: 'GHLRI', arr: 'GHLRI_TOOLS' },
  { file: 'CRI', parent: 'CRI', arr: 'CRI_TOOLS' }
];

let allIcons = new Set();
let allArrays = [];
let exportsList = [];

pages.forEach(p => {
  const content = fs.readFileSync(`./src/page/${p.file}.jsx`, 'utf8');
  
  // Extract lucide-react imports
  const importMatch = content.match(/import\s+\{([^}]+)\}\s+from\s+['"]lucide-react['"]/);
  if (importMatch) {
    importMatch[1].split(',').forEach(i => {
      const icon = i.trim();
      if (icon) allIcons.add(icon);
    });
  }

  // Extract the tools array
  const regex = new RegExp(`const\\s+${p.arr}\\s*=\\s*\\[([\\s\\S]*?)\\];`);
  const match = content.match(regex);
  if (match) {
    // Add parentId to every object inside the array
    let arrContent = match[1];
    arrContent = arrContent.replace(/\{\s*id:/g, `{ parentId: '${p.parent}', id:`);
    allArrays.push(`export const ${p.arr} = [\n${arrContent}\n];`);
    exportsList.push(p.arr);
  }
});

let finalFile = `import React from 'react';\n`;
finalFile += `import { ${Array.from(allIcons).join(', ')} } from 'lucide-react';\n\n`;
finalFile += allArrays.join('\n\n') + '\n\n';
finalFile += `export const ALL_SUB_TOOLS = [\n  ...${exportsList.join(',\n  ...')}\n];\n`;

fs.writeFileSync('./src/data/subTools.jsx', finalFile);
console.log('Successfully created src/data/subTools.jsx');
