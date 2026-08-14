const fs = require('fs');
const path = require('path');

const dir = 'd:\\PRINCE CRCCF\\Final Projects\\Nexora\\src\\page\\AccountSetting';

fs.readdirSync(dir).forEach(file => {
  if (file.endsWith('.jsx')) {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replace 'min-h-screen' with ''
    if (content.includes('min-h-screen')) {
      content = content.replace(/\bmin-h-screen\b/g, '');
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Updated ${file}`);
    }
  }
});
