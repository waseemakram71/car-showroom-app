// Temporary script to generate Prisma client
const { execSync } = require('child_process');
const path = require('path');

try {
  console.log('Generating Prisma Client...');
  execSync('npx prisma generate', {
    cwd: path.resolve(__dirname),
    stdio: 'inherit',
    shell: true
  });
  console.log('Done!');
} catch (e) {
  console.error('Generation failed:', e.message);
}
