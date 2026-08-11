const fs = require('fs');
const path = require('path');

const pageDir = path.join(__dirname, '../src/page');
const files = fs.readdirSync(pageDir).filter(f => f.endsWith('.jsx'));

files.forEach(file => {
  const filePath = path.join(pageDir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Skip if already injected
  if (content.includes('usePageLayout')) {
    console.log(`Skipping ${file} - already injected.`);
    return;
  }

  // Find the tools import
  const toolsImportMatch = content.match(/import\s+{\s*(\w+_TOOLS)\s*}\s+from\s+['"]\.\.\/data\/subTools['"];/);
  if (!toolsImportMatch) {
    console.log(`Skipping ${file} - no TOOLS imported.`);
    return;
  }
  
  const toolsName = toolsImportMatch[1];
  
  // Find the parentId associated with this tool in subTools.js (or just deduce it from the file name / toolsName)
  // e.g. CDR_TOOLS -> CDR, ABOUTUS_TOOLS -> about-us? 
  // Let's use the file name prefix.
  let pageId = file.split('-')[0].split('.')[0].toLowerCase();
  // Special cases:
  if (file === 'AboutUs.jsx') pageId = 'about-us';
  if (file === 'AccountSetting.jsx') pageId = 'account-setting';

  // Inject the import
  content = content.replace(
    /import ToolCard from \'\.\.\/components\/nexora\';/,
    `import ToolCard from '../components/nexora';\nimport { usePageLayout } from '../components/usePageLayout';`
  );
  if (!content.includes('usePageLayout')) {
      content = content.replace(
        /import React, { useState, useEffect } from 'react';/,
        `import React, { useState, useEffect } from 'react';\nimport { usePageLayout } from '../components/usePageLayout';`
      );
  }

  // Find the component definition: export default function CDRPage({ onBack
  const compRegex = /export default function \w+\(\{[^}]*\}\)\s*\{/;
  const compMatch = content.match(compRegex);
  
  if (compMatch) {
    const insertPos = compMatch.index + compMatch[0].length;
    
    const injection = `\n  const { dynamicGridClass, displayTools } = usePageLayout('${pageId}', ${toolsName});`;
    content = content.slice(0, insertPos) + injection + content.slice(insertPos);
    
    // Replace the mapping logic
    // From: <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2.5 sm:gap-4 md:gap-5">
    // To: <div className={\`grid \${dynamicGridClass} gap-2.5 sm:gap-4 md:gap-5\`}>
    content = content.replace(
      /<div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2\.5 sm:gap-4 md:gap-5">/,
      `<div className={\`grid \${dynamicGridClass} gap-2.5 sm:gap-4 md:gap-5\`}>`
    );
    
    // Replace {XXX_TOOLS.map( with {displayTools.map(
    content = content.replace(
      new RegExp(`{\\s*${toolsName}\\.map\\(`),
      `{displayTools.map(`
    );

    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${file} successfully.`);
  } else {
    console.log(`Could not find component definition in ${file}`);
  }
});
