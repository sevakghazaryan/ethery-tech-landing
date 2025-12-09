const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Icon sizes and output paths
const sizes = [
  { size: 16, output: 'public/icon/favicon-16x16.png', name: '16x16 Favicon' },
  { size: 32, output: 'public/icon/favicon-32x32.png', name: '32x32 Favicon' },
  { size: 192, output: 'public/icon/favicon-192x192.png', name: '192x192 Android Chrome' },
  { size: 512, output: 'public/icon/favicon-512x512.png', name: '512x512 Android Chrome' },
  { size: 180, output: 'public/icon/apple-touch-icon.png', name: '180x180 Apple Touch Icon' },
];

async function generateIcons() {
  console.log('🎨 Ethery Tech - Icon Generator\n');
  console.log('📁 Looking for logo SVG file...\n');

  // Check if source SVG exists - use the icon-only version (no text)
  const svgPath = 'public/icon/logo_vector.svg';
  if (!fs.existsSync(svgPath)) {
    console.error(`❌ Error: Source SVG not found at ${svgPath}`);
    console.error('Please ensure your logo icon SVG exists at this location.');
    console.error('Using logo_vector.svg (icon only, no text) for better quality at small sizes.');
    process.exit(1);
  }

  console.log(`✓ Found source SVG: ${svgPath}\n`);
  console.log('🔄 Generating icons...\n');

  try {
    // Generate all PNG sizes
    for (const { size, output, name } of sizes) {
      await sharp(svgPath)
        .resize(size, size, {
          fit: 'contain',
          background: { r: 0, g: 0, b: 0, alpha: 0 }
        })
        .png()
        .toFile(output);
      console.log(`  ✓ Generated ${name}: ${output}`);
    }

    console.log('\n📦 Generating favicon.ico...\n');

    // For favicon.ico, we'll use the 32x32 version
    // Note: True multi-size ICO requires additional libraries
    // This creates a simple 32x32 ICO which works for most cases
    await sharp('public/icon/favicon-32x32.png')
      .resize(32, 32)
      .toFile('public/favicon.ico');
    console.log('  ✓ Generated favicon.ico\n');

    console.log('✅ All icons generated successfully!\n');
    console.log('📝 Next steps:');
    console.log('  1. Verify icons: ls -lh public/icon/*.png');
    console.log('  2. Rebuild site: npm run build');
    console.log('  3. Test locally: npm run dev');
    console.log('  4. Deploy to production');
    console.log('  5. Request re-indexing in Google Search Console\n');

  } catch (error) {
    console.error('\n❌ Error generating icons:', error.message);
    console.error('\nTroubleshooting:');
    console.error('  - Ensure sharp is installed: npm install sharp --save-dev');
    console.error('  - Check SVG file is valid');
    console.error('  - Verify write permissions for output directories\n');
    process.exit(1);
  }
}

// Check if sharp is installed
try {
  require.resolve('sharp');
} catch (e) {
  console.error('❌ Error: sharp package not found\n');
  console.error('Please install it by running:');
  console.error('  npm install sharp --save-dev\n');
  process.exit(1);
}

// Run the generator
generateIcons().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});

