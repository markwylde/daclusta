const fs = require('fs');
const uuid = require('uuid').v4;

const operations = {
  POST: 1,
  PUT: 2,
  PATCH: 3,
  DELETE: 4
};

function get (connection, id, callback) {
  const db = connection.getDb();
  const record = db[id];
  callback(null, record);
}

function post (connection, record, callback) {
  const id = uuid();
  const db = connection.getDb();
  const line = [operations.POST, id, record];

  connection.tail.on('line', line => {
    const data = JSON.parse(line);
    if (data[1] === id) {
      callback(null, db[id]);
    }
  });

  fs.writeFile(connection.file, JSON.stringify(line) + '\n', { flag: 'a' }, () => {});
}

function put (connection, id, record, callback) {
  const line = [operations.PUT, id, record];
  const db = connection.getDb();

  connection.tail.on('line', line => {
    const data = JSON.parse(line);
    if (data[1] === id) {
      callback(null, db[id]);
    }
  });

  fs.writeFile(connection.file, JSON.stringify(line) + '\n', { flag: 'a' }, () => {});
}

function patch (connection, id, record, callback) {
  const line = [operations.PATCH, id, record];
  const db = connection.getDb();

  connection.tail.on('line', line => {
    const data = JSON.parse(line);
    if (data[1] === id) {
      callback(null, db[id]);
    }
  });

  fs.writeFile(connection.file, JSON.stringify(line) + '\n', { flag: 'a' }, () => {});
}

function del (connection, id, callback) {
  const line = [operations.DELETE, id];
  const db = connection.getDb();

  connection.tail.on('line', line => {
    const data = JSON.parse(line);
    if (data[1] === id) {
      callback(null, db[id]);
    }
  });

  fs.writeFile(connection.file, JSON.stringify(line) + '\n', { flag: 'a' }, () => {});
}

function addListener (connection, handler) {
  connection.tail.on('line', handler);
}

function removeListener (connection, handler) {
  connection.tail.off('line', handler);
}

module.exports = {
  get,
  post,
  put,
  patch,
  del,
  addListener,
  removeListener
};
