// import invariant from "tiny-invariant";

// export function getEnv() {
//   invariant(process.env.FIREBASE_APIKEY, "FIREBASE_APIKEY should be defined");
//   invariant(process.env.FIREBASE_AUTHDOMAIN, "FIREBASE_AUTHDOMAIN should be defined");
//   invariant(process.env.FIREBASE_PROJECTID, "FIREBASE_PROJECTID should be defined");
//   invariant(process.env.FIREBASE_STORAGEBUCKET, "FIREBASE_STORAGEBUCKET should be defined");
//   invariant(process.env.FIREBASE_MESSAGINGSENDERID, "FIREBASE_MESSAGINGSENDERID should be defined");
//   invariant(process.env.FIREBASE_APPID, "FIREBASE_APPID should be defined");
//   invariant(process.env.FIREBASE_MEASUREMENTID, "FIREBASE_MEASUREMENTID should be defined");

//   return {
//     FIREBASE_APIKEY: process.env.FIREBASE_APIKEY,
//     FIREBASE_AUTHDOMAIN: process.env.FIREBASE_AUTHDOMAIN,
//     FIREBASE_PROJECTID: process.env.FIREBASE_PROJECTID,
//     FIREBASE_STORAGEBUCKET: process.env.FIREBASE_STORAGEBUCKET,
//     FIREBASE_MESSAGINGSENDERID: process.env.FIREBASE_MESSAGINGSENDERID,
//     FIREBASE_APPID: process.env.FIREBASE_APPID,
//     FIREBASE_MEASUREMENTID: process.env.FIREBASE_MEASUREMENTID,
//   };
// }

// type ENV = ReturnType<typeof getEnv>;

// declare global {
//   var ENV: ENV;
//   interface Window {
//     ENV: ENV;
//   }
// }

export default {}