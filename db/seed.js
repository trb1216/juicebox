const { client, getAllUsers, createUser } = require("./index");

// attempt to create users

const createInitialUsers = async () => {
  try {
    console.log("Starting to create users..");

    const albert = await createUser({
      username: "albert",
      password: "bertie99",
    });
    const sandra = await createUser({
      username: "sandra",
      password: "2sandy4",
    });
    const glamgal = await createUser({
      username: "glamgal",
      password: "soglam",
    });

    console.log(albert);
    console.log(sandra)
    console.log(glamgal)
    console.log("Finished creating users.");
  } catch (error) {
    console.error("Error creating users.");
    throw error;
  }
}

const rebuildDB = async () => {
  try {
    client.connect();

    await dropTables();
    await createTables();
    await createInitialUsers();
  } catch (error) {
    throw error;
  }
}
// call a query which drops all tables from our database
async function dropTables() {
  try {
    console.log("Starting to drop tables..");
    await client.query(`DROP TABLE IF EXISTS users;`);
    console.log("Finished dropping tables.");
  } catch (error) {
    console.error("Error dropping tables");
    throw error; // error up to the function that calls dropTables
  }
}

// call a query which creates all tables for our database

const createTables= async () => {
  try {
    console.log("Starting to build tables..");
    await client.query(`
    CREATE TABLE users (
      id SERIAL PRIMARY KEY,
      username varchar(255) UNIQUE NOT NULL,
      password varchar(255) NOT NULL
      );
    `);
    console.log("Finished building tables.");
  } catch (error) {
    console.error("Error building tables");
    throw error; // error up to the function that calls createTables
  }
}

const testDB = async () => {
  try {
    console.log("Starting to test database..");

    const users = await getAllUsers();

    console.log("getAllUsers", users);
    console.log("Finished database tests.");
  } catch (error) {
    console.error("Error testing database.");
    throw error;
  }
}

rebuildDB()
  .then(testDB)
  .catch(console.error)
  .finally(() => client.end());
