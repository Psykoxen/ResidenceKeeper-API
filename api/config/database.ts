import SQLiteDatabase, { Database } from "better-sqlite3";
let database: Database;
const connection = (): Promise<void> => {
  return new Promise((resolve) => {
    database = new SQLiteDatabase("data.db");
    loadDatabase(database);
    return resolve();
  });
};
const loadDatabase = (db: Database): void => {
  db.prepare(
    `
CREATE TABLE IF NOT EXISTS user
(
id INTEGER PRIMARY KEY AUTOINCREMENT,
username VARCHAR NOT NULL,
email VARCHAR NOT NULL UNIQUE,
password VARCHAR NOT NULL
)
`
  ).run();
  db.prepare(
    `
CREATE TABLE IF NOT EXISTS home 
(
id INTEGER PRIMARY KEY AUTOINCREMENT,
name VARCHAR NOT NULL
)
`
  ).run();

  db.prepare(
    `
CREATE TABLE IF NOT EXISTS home_user
(
    user_id INTEGER NOT NULL,
    home_id INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES user (id),
    FOREIGN KEY (home_id) REFERENCES home (id),
    PRIMARY KEY (user_id, home_id)
)
`
  ).run();

  db.prepare(
    `
CREATE TABLE IF NOT EXISTS category
(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR NOT NULL
)
`
  ).run();

  db.prepare(
    `
CREATE TABLE IF NOT EXISTS payment
(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    home_id INTEGER NOT NULL,
    category_id INTEGER NOT NULL,
    amount INTEGER NOT NULL,
    date DATE NOT NULL,
    name VARCHAR NOT NULL,
    FOREIGN KEY (user_id) REFERENCES user (id),
    FOREIGN KEY (home_id) REFERENCES home (id),
    FOREIGN KEY (category_id) REFERENCES category (id)
)
`
  ).run();

  db.prepare(
    `
CREATE TABLE IF NOT EXISTS payment_user_repartition
(
    payment_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    repartition INTEGER NOT NULL,
    FOREIGN KEY (payment_id) REFERENCES payment (id),
    FOREIGN KEY (user_id) REFERENCES user (id),
    PRIMARY KEY (payment_id, user_id)
)
`
  ).run();
};
export { connection, database };
