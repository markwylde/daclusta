const { promisify } = require('util');
const fs = require('fs');
const tailRead = require('tail-read');

const operations = {
  POST: 1,
  PUT: 2,
  PATCH: 3,
  DELETE: 4
};

function connect (file) {
  fs.writeFileSync(file, '', () => {});
  const tail = tailRead(file);
  const db = {};

  tail.on('line', function (data) {
    if (!data) {
      return;
    }

    data = JSON.parse(data);
    if (data[0] === operations.POST) {
      db[data[1]] = {
        meta: {
          id: data[1],
          ops: db[data[1]] ? db[data[1]].meta.ops + 1 : 1
        },
        doc: data[2]
      };
    }

    if (data[0] === operations.PUT) {
      if (!db[data[1]]) {
        return;
      }

      db[data[1]] = {
        meta: {
          id: data[1],
          ops: db[data[1]] ? db[data[1]].meta.ops + 1 : 1
        },
        doc: data[2]
      };
    }

    if (data[0] === operations.PATCH) {
      if (!db[data[1]]) {
        return;
      }

      db[data[1]] = {
        meta: {
          id: data[1],
          ops: db[data[1]] ? db[data[1]].meta.ops + 1 : 1
        },
        doc: {
          ...db[data[1]].doc,
          ...data[2]
        }
      };
    }

    if (data[0] === operations.DELETE) {
      delete db[data[1]];
    }
  });

  return {
    getDb: () => db,
    tail,
    file
  };
}

function close (connection, callback) {
  connection.tail.close(callback);
}

module.exports = {
  connect,
  close: promisify(close),

  ...require('./actions')
};
