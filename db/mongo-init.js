// db = db.getSiblingDB("admin");

// db.auth(
//   process.env.MONGO_INITDB_ROOT_USERNAME,
//   process.env.MONGO_INITDB_ROOT_PASSWORD
// );

// const databases = [
//   {
//     name: process.env.DATABASE1_NAME,
//     user: process.env.DATABASE1_USER,
//     pwd: process.env.DATABASE1_PASSWORD,
//     collections: ["rooms", "users"],
//   },
// ];

// databases.forEach(({ name, user, pwd, collections }) => {
//   db = db.getSiblingDB(name);
//   db.createUser({
//     user: user,
//     pwd: pwd,
//     roles: [{ role: "readWrite", db: name }],
//   });

//   collections.forEach((collection) => {
//     db.createCollection(collection);
//     db[collection].insertOne({ initDoc: "initDoc", time: new Date() });
//   });
// });

// Load environment variables
const username = process.env.MONGO_INITDB_ROOT_USERNAME;
const password = process.env.MONGO_INITDB_ROOT_PASSWORD;
const database = process.env.MONGO_INITDB_DATABASE;

// Connect to the admin database to create users
db = db.getSiblingDB("admin");

// Create root user if it doesn’t exist
db.createUser({
  user: username,
  pwd: password,
  roles: [{ role: "root", db: "admin" }],
});

// Switch to the specified database
db = db.getSiblingDB(database);

// Create collections, indexes, or other setup as needed
db.createCollection("users");

// Example document insertion
db.users.insertOne({
  name: "sample document",
  created_at: new Date(),
});

db.createCollection("rooms");
// Example document insertion
db.rooms.insertOne({
  name: "sample document",
  created_at: new Date(),
});
