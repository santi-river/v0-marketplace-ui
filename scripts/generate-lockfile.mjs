import { execSync } from 'child_process';

try {
  console.log('Generating pnpm-lock.yaml...');
  execSync('pnpm install --no-frozen-lockfile', { 
    cwd: '/vercel/share/v0-project',
    stdio: 'inherit'
  });
  console.log('pnpm-lock.yaml generated successfully.');
} catch (error) {
  console.error('Failed to generate lockfile:', error.message);
  process.exit(1);
}
