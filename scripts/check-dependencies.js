// Dependency checker script
import fs from 'fs';
import path from 'path';

function checkDependencies() {
  try {
    // Read package.json
    const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    const dependencies = { ...packageJson.dependencies, ...packageJson.devDependencies };
    
    // Get all .ts, .tsx, .js, and .jsx files
    const sourceFiles = getAllFiles('src');
    
    // Track imports
    const imports = new Set();
    const missingDeps = new Set();
    
    // Check each file for imports
    sourceFiles.forEach(file => {
      const content = fs.readFileSync(file, 'utf8');
      const importLines = content.match(/^import.*from\s+['"]([^'"./][^'"]+)['"]/gm) || [];
      
      importLines.forEach(line => {
        const match = line.match(/from\s+['"]([^'"./][^'"]+)['"]/);
        if (match) {
          const packageName = match[1].split('/')[0]; // Get base package name
          imports.add(packageName);
          
          // Check if package is in dependencies
          if (!dependencies[packageName]) {
            missingDeps.add(packageName);
          }
        }
      });
    });
    
    // Report results
    if (missingDeps.size > 0) {
      console.error('\nMissing dependencies found:');
      missingDeps.forEach(dep => {
        console.error(`- ${dep}`);
      });
      process.exit(1);
    } else {
      console.log('\nAll dependencies are properly declared in package.json');
    }
    
  } catch (error) {
    console.error('Error checking dependencies:', error);
    process.exit(1);
  }
}

function getAllFiles(dir) {
  const files = [];
  
  fs.readdirSync(dir).forEach(file => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      files.push(...getAllFiles(fullPath));
    } else if (/\.(ts|tsx|js|jsx)$/.test(file)) {
      files.push(fullPath);
    }
  });
  
  return files;
}

checkDependencies();