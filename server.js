const Cluster = require('cluster');
const Application = require('./src/app');
const numCPUs = require('os').cpus().length;

if (Cluster.isMaster) {
    console.log(`Master ${process.pid} is running`);
  
    // Fork workers.
    for (let i = 0; i < numCPUs; i++) {
        Cluster.fork();
    }
  
    Cluster.on('exit', (worker, code, signal) => {
      console.log(`worker ${worker.process.pid} died`);
    });
  } else {
    Application.bootstrap(process);
  
    console.log(`Worker ${process.pid} started`);
  }


