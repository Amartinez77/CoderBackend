const optionsMysql = {
  client: 'mysql2',
  connection: {
    host: '127.0.0.1',
    port:33066,
    // user:"coder",
    // password:"house",
    user: 'root',
    password: '123456',
    database: 'test'
  }
};

const optionsSqlite3 = {
  client: 'sqlite3',
  connection: {
    filename: './db/products.sqlite',
  },
  useNullAsDefault: true,
};


module.exports = { optionsMysql, optionsSqlite3 };