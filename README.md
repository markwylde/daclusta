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
const connection = db.connect('./db.json');

const insertedRecord = await db.post(connection, {
  firstName: 'Joe',
  lastName: 'Bloggs
});

const readRecord = await db.get(connection, insertedRecord.meta.id);

await db.close(connection);

// readRecord.doc === { example: 1 }
```

## License
This project is licensed under the terms of the AGPL-3.0 license.
