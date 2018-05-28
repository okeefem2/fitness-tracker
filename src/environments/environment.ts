// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: "AIzaSyBeu5gLTD6nU8HKoVI2Dg6NM5ZOp9GqHtM",
    authDomain: "fitness-tracker-ngrx.firebaseapp.com",
    databaseURL: "https://fitness-tracker-ngrx.firebaseio.com",
    projectId: "fitness-tracker-ngrx",
    storageBucket: "fitness-tracker-ngrx.appspot.com",
    messagingSenderId: "411518458204"
  }
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
