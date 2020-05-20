# daclusta
[![Build Status](https://travis-ci.org/markwylde/daclusta.svg?branch=master)](https://travis-ci.org/markwylde/daclusta)
[![David DM](https://david-dm.org/markwylde/daclusta.svg)](https://david-dm.org/markwylde/daclusta)
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/markwylde/daclusta)
[![GitHub package.json version](https://img.shields.io/github/package-json/v/markwylde/daclusta)](https://github.com/markwylde/daclusta/releases)
[![GitHub](https://img.shields.io/github/license/markwylde/daclusta)](https://github.com/markwylde/daclusta/blob/master/LICENSE)

An in memory/file based database that can run on multiple threads.

## Insallation

```bash
npm i --save daclusta
```

## Usage

```javascript
const db = require('daclusta')
const connection = db.connect('./db.json');

const insertedRecord = await db.post(connection, {
  firstName: 'Joe',
  lastName: 'Bloggs
});

const readRecord = await db.get(connection, insertedRecord.meta.id);

await db.close(connection);

// readRecord.doc === { example: 1 }
```

## API

<table>
  <tr>
    <th></th>
    <th>Method</th>
    <th>Arguments</th>
    <th>Description</th>
  </tr>
  <tr>
    <td colspan=4>
      <strong>Connection</strong></br>
      These methods control opening and closing database connections.
    </td>
  </tr>
  <tr>
    <td><a href="https://www.github.com/bitabase/bitabase-manager">1.1</a></td>
    <td>.connect</td>
    <td>filename</td>
    <td>Connect to a database. Will create if does not exist.</td>
  </tr>
  <tr>
    <td><a href="https://www.github.com/bitabase/bitabase-manager">1.2</a></td>
    <td>.close</td>
    <td>connection</td>
    <td>Close a connection.</td>
  </tr>
  <tr>
    <td colspan=4>
      <strong>Actions</strong></br>
      These methods allow operating on a connection
    </td>
  </tr>
  <tr>
    <td><a href="https://www.github.com/bitabase/bitabase-manager">2.1</a></td>
    <td>.get</td>
    <td>connection, id</td>
    <td>Get a record on a database by id.</td>
  </tr>
  <tr>
    <td><a href="https://www.github.com/bitabase/bitabase-manager">2.2</a></td>
    <td>.post</td>
    <td>connection, record</td>
    <td>Create a new record on a database.</td>
  </tr>
  <tr>
    <td><a href="https://www.github.com/bitabase/bitabase-manager">2.3</a></td>
    <td>.put</td>
    <td>connection, id, newRecord</td>
    <td>Replace an existing record with another on a database.</td>
  </tr>
  <tr>
    <td><a href="https://www.github.com/bitabase/bitabase-manager">2.4</a></td>
    <td>.patch</td>
    <td>connection, id, partialRecord, </td>
    <td>Set some properties on an existing record on a database.</td>
  </tr>
  <tr>
    <td><a href="https://www.github.com/bitabase/bitabase-manager">2.5</a></td>
    <td>.del</td>
    <td>connection, id</td>
    <td>Delete an existing record on a database.</td>
  </tr>
</table>

## License
This project is licensed under the terms of the AGPL-3.0 license.
