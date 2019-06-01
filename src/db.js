import Dexie from "dexie";

const scheduleDb = new Dexie("schedule");

scheduleDb.version(1).stores({
  schedules: "++id,title,description,start_date,end_date,category,important"
});

export { scheduleDb };