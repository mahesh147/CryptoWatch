// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
      apiKey: "AIzaSyBzRb10Wz7JKoP5VymAR6vmzvfPb7Omcw4",
      authDomain: "cryptowatch-eb130.firebaseapp.com",
      databaseURL: "https://cryptowatch-eb130.firebaseio.com",
      projectId: "cryptowatch-eb130",
      storageBucket: "cryptowatch-eb130.appspot.com",
      messagingSenderId: "832538306430" 
  }
};
