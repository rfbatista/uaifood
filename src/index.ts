import 'reflect-metadata';

import('@di/startup')
  .then(({ startup }) => {
    startup();
  })
  .catch((error) => {
    console.error(error);
    if (process.env.NODE_ENV === 'production') {
      process.kill(process.pid, 'SIGTERM');
    }
  });
