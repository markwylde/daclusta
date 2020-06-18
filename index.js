const EventEmitter = require('events');
const { promisify } = require('util');
const fs = require('fs');
const tailRead = require('tail-read');

const actions = require('./actions');

const operations = {
  POST: 1,
  PUT: 2,
  PATCH: 3,
  DELETE: 4
};

function connect (file, callback) {
  const eventEmitter = new EventEmitter();

  fs.writeFile(file, '', () => {});
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

  setTimeout(() => {
    callback(null, {
      eventEmitter,
      getDb: () => db,
      tail,
      file
    });
  }, 5);
}

function close (connection, callback) {
  connection.tail.close(callback);
}

module.exports = {
  connect,
  close,
  ...actions,

  promises: {
    connect: promisify(connect),
    close: promisify(close),
    get: promisify(actions.get),
    post: promisify(actions.post),
    put: promisify(actions.put),
    patch: promisify(actions.patch),
    del: promisify(actions.del),
    addListener: promisify(actions.addListener),
    removeListener: promisify(actions.removeListener)
  }
};
