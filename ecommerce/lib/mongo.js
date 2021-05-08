const { MongoClient, ObjectID } = require("mongodb");
const config = require("../config/index");

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const DB_NAME = config.dbName;

const MONGO_URI = `mongodb+srv://${USER}:${PASSWORD}@${config.dbHost}/${DB_NAME}?retryWrites=true&w=majority`;

class MongoLib {
  constructor() {
    this.client = new MongoClient(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    this.dbName = DB_NAME;
  }

  // connect() {
  //   return new Promise((resolve, reject) => {
  //     this.client.connect((error) => {
  //       if (error) return reject(error);

  //       console.log("Connected succesfully to mongo");
  //       resolve(this.client.db(this.dbName));
  //     });
  //   });
  // }

  async connect() {
    if (!MongoLib.connection) {
      try {
        await this.client.connect()
        console.log('Connected successfully to mongo')
        MongoLib.connection = this.client.db(this.dbName)
      } catch (error) {
        console.log(error)
      } 
    }
    return MongoLib.connection
  }

  getAll(collection, query) {
    return this.connect().then((db) => {
      return db.collection(collection).find(query).toArray();
    });
  }

  get(collection, id) {
    return this.connect().then((db) => {
      return db.collection(collection).findOne({ _id: ObjectID(id) });
    });
  }

  create(collection, data) {
    return this.connect()
      .then((db) => {
        return db.collection(collection).insertOne(data);
      })
      .then((result) => result.insertedId);
  }

  update(collection, id, data) {
    return this.connect()
      .then((db) => {
        return db
          .collection(collection)
          .updateOne({ _id: ObjectID(id) }, { $set: data }, { upsert: true });
      })
      .then((result) => result.upsertedId || id);
  }

  delete(collection, id) {
    return this.connect().then((db) => {
      return db
        .collection(collection)
        .deleteOne({ _id: ObjectID(id) })
        .then(() => id);
    });
  }
}

module.exports = MongoLib;
