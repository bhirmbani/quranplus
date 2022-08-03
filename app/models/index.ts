import Dexie from "dexie";

class QuranPlusDB extends Dexie {
  // Declare implicit table properties.
  // (just to inform Typescript. Instanciated by Dexie in stores() method)
  collection!: Dexie.Table<CollectionModel, number>; // number = type of the primkey
  statistic!: Dexie.Table<StatisticModel, number>; // number = type of the primkey
  //...other tables goes here...

  constructor() {
    super("QuranPlusDB");
    this.version(2).stores({
      collection: "++id, name",
      statistic: "++id",
      //...other tables goes here...
    });
    this.collection.mapToClass(Collection);
  }
}

export class Collection {
  id: number | undefined;
  name: string;
  content: ContentModel[] | undefined;

  constructor(name: string, id?: number) {
    this.name = name;
    if (id) this.id = id;
  }

  log() {
    console.log(JSON.stringify(this));
  }
}

export class Statistic {
  id: number | undefined;
  last_read: StatisticModel["last_read"];
  daily_checkin: StatisticModel["daily_checkin"];
  memorized: StatisticModel["memorized"];

  constructor(
    id: number,
    last_read: StatisticModel["last_read"],
    daily_checkin: StatisticModel["daily_checkin"],
    memorized: StatisticModel["memorized"]
  ) {
    this.last_read = last_read;
    this.daily_checkin = daily_checkin;
    this.memorized = memorized;
    if (id) this.id = id;
  }

  log() {
    console.log(JSON.stringify(this));
  }
}

const db = new QuranPlusDB();

export default db;
