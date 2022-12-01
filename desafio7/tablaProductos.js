const { optionsSqlite3 } = require('./options/config.js');
const knex = require('knex')(optionsSqlite3);

knex.schema
  .createTable("products", (table) => {
    table.increments("id");
    table.string("name");
    table.string("price");
    table.string("img");
  })
  .then(() => console.log("Table creada"))
  .catch((err) => {
    console.log(err);
    throw err;
  })
  .finally(() => knex.destroy());