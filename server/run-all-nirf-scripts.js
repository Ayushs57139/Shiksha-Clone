import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

async function runAllNirfScripts() {
  const scripts = [
    'nirf_scripts/add-nirf-data.js',
    'nirf_scripts/add-nirf-innovation.js',
    'nirf_scripts/add-nirf-state-public-university.js',
    'nirf_scripts/add-nirf-skill-university.js',
    'nirf_scripts/add-nirf-open-university.js',
    'nirf_scripts/add-nirf-architecture.js',
    'nirf_scripts/add-nirf-agriculture.js'
  ];

  console.log('🚀 Starting to run all NIRF scripts...\n');

  for (const script of scripts) {
    try {
      console.log(`📝 Running ${script}...`);
      const { stdout, stderr } = await execAsync(`node ${script}`);
      
      if (stdout) {
        console.log(stdout);
      }
      if (stderr) {
        console.error(stderr);
      }
      
      console.log(`✅ Completed ${script}\n`);
    } catch (error) {
      console.error(`❌ Error running ${script}:`, error.message);
    }
  }

  console.log('🎉 All NIRF scripts completed!');
}

runAllNirfScripts();
