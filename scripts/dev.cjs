const { spawn } = require('node:child_process');
const path = require('node:path');
const net = require('node:net');
const root = path.resolve(__dirname, '..');
const children = [];
let stopping = false;

function stop(code = 0) {
  if (stopping) return;
  stopping = true;
  for (const child of children) {
    if (!child.pid) continue;
    try { process.kill(-child.pid, 'SIGTERM'); }
    catch (error) { if (error.code !== 'ESRCH') console.error(error.message); }
  }
  process.exitCode = code;
}

function start(command, args) {
  const child = spawn(command, args, { cwd: root, stdio: 'inherit', detached: true });
  children.push(child);
  child.on('error', error => { console.error(error.message); stop(1); });
  child.on('exit', code => { if (!stopping) stop(code ?? 1); });
}

process.on('SIGINT', () => stop());
process.on('SIGTERM', () => stop());
async function checkPort(port) {
  return new Promise((resolve, reject) => {
    const server = net.createServer();
    server.once('error', error => {
      if (error.code === 'EADDRINUSE') {
        reject(new Error(`El puerto ${port} ya está ocupado. Detén la instancia anterior con Ctrl+C antes de iniciar otra.`));
      } else reject(error);
    });
    server.listen(port, '127.0.0.1', () => server.close(resolve));
  });
}

async function main() {
  require('../be_p2_hfds/node_modules/dotenv').config({ path: path.join(root, 'be_p2_hfds/.env') });
  const port = Number(process.env.PORT || 3000);
  await checkPort(port);
  await checkPort(5500);
  if (stopping) return;
  console.log(`Frontend: http://localhost:5500\nSwagger: http://localhost:${port}/docs\nCtrl+C detiene ambos servicios.`);
  start('npm', ['--prefix', 'be_p2_hfds', 'run', 'start:dev']);
  start('python3', ['-m', 'http.server', '5500', '--bind', '127.0.0.1', '--directory', 'fe_p2_hfds']);
}

main().catch(error => { console.error(error.message); stop(1); });
