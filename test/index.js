const fs = require('fs');
const test = require('tape');

const db = require('../').promises;

function clean () {
  try {
    fs.unlinkSync('/tmp/db.json');
  } catch (error) {}
}

test('insert a record', async t => {
  t.plan(1);

  clean();

  const connection = await db.connect('/tmp/db.json');
  const insertedRecord = await db.post(connection, { example: 1 });
  await db.close(connection);

  t.deepEqual(insertedRecord.doc, { example: 1 });
});

test('read an inserted record', async t => {
  t.plan(1);

  clean();

  const connection = await db.connect('/tmp/db.json');
  const insertedRecord = await db.post(connection, { example: 1 });
  const readRecord = await db.get(connection, insertedRecord.meta.id);
  await db.close(connection);

  t.deepEqual(readRecord.doc, { example: 1 });
});

test('update a record', async t => {
  t.plan(1);

  clean();

  const connection = await db.connect('/tmp/db.json');
  const insertedRecord = await db.post(connection, { example: 1 });
  const updatedRecord = await db.put(connection, insertedRecord.meta.id, { different: 2 });
  const readRecord = await db.get(connection, updatedRecord.meta.id);
  await db.close(connection);

  t.deepEqual(readRecord.doc, { different: 2 });
});

test('patch a record', async t => {
  t.plan(1);

  clean();

  const connection = await db.connect('/tmp/db.json');
  const insertedRecord = await db.post(connection, { example: 1 });
  const updatedRecord = await db.patch(connection, insertedRecord.meta.id, { different: 2 });
  const readRecord = await db.get(connection, updatedRecord.meta.id);
  await db.close(connection);

  t.deepEqual(readRecord.doc, { example: 1, different: 2 });
});

test('delete a record', async t => {
  t.plan(2);

  clean();

  const connection = await db.connect('/tmp/db.json');
  const insertedRecord = await db.post(connection, { example: 1 });
  const updatedRecord = await db.del(connection, insertedRecord.meta.id);
  const readRecord = await db.get(connection, insertedRecord.meta.id);
  await db.close(connection);

  t.notOk(updatedRecord);
  t.notOk(readRecord);
});

test('add listen', async t => {
  t.plan(1);

  clean();

  const connection = await db.connect('/tmp/db.json');
  db.addListener(connection, function (line) {
    t.pass();
    db.close(connection);
  });

  await db.post(connection, { example: 1 });
});

test('remove listen', async t => {
  clean();

  const connection = await db.connect('/tmp/db.json');
  const handler = function () {
    t.fail();
  };

  db.addListener(connection, handler);
  db.removeListener(connection, handler);

  await db.post(connection, { example: 1 });

  setTimeout(() => {
    db.close(connection);
  }, 100);
});
