const fs = require('fs');
const path = require('path');

// Path to the component file
const filePath = path.join(__dirname, 'components', 'reviews', 'GoogleReviewsSection.tsx');

// Read the file
try {
  const content = fs.readFileSync(filePath, 'utf8');
  
  console.log('File content length:', content.length);
  console.log('First 100 characters:', content.substring(0, 100));
  
  // Check for import statements
  const imports = content.match(/import.*from.*/g);
  console.log('\nAll imports:', imports);
  
  // Check specifically for useHydration import
  const useHydrationImport = content.match(/import.*useHydration.*from.*/g);
  if (useHydrationImport && useHydrationImport.length > 0) {
    console.log('\nFound useHydration import:', useHydrationImport[0]);
    
    // Create a fixed version by removing the useHydration import
    const fixed = content.replace(/import.*useHydration.*from.*;\n/, '');
    
    // Write to a new file for safety
    fs.writeFileSync(path.join(__dirname, 'components', 'reviews', 'GoogleReviewsSection.fixed.tsx'), fixed);
    console.log('\nFixed file written to GoogleReviewsSection.fixed.tsx');
  } else {
    console.log('\nNo useHydration import found in the file');
  }
  
} catch (error) {
  console.error('Error reading or processing file:', error);
} 