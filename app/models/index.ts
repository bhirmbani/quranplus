import Dexie from "dexie";

class QuranPlusDB extends Dexie {
  // Declare implicit table properties.
  // (just to inform Typescript. Instanciated by Dexie in stores() method)
  collection!: Dexie.Table<CollectionModel, number>; // number = type of the primkey
  //...other tables goes here...

  constructor() {
    super("QuranPlusDB");
    this.version(1).stores({
      collection: "++id, name",
      //...other tables goes here...
    });
    this.collection.mapToClass(Collection);
  }
}

export class Collection {
  id: number | undefined;
  name: string;
  content: CollectionModel["content"] | undefined;

  constructor(name: string, id?: number) {
    this.name = name;
    if (id) this.id = id;
  }

  log() {
    console.log(JSON.stringify(this));
  }
}

const db = new QuranPlusDB();

export default db;
