// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
export const environment = {
  production: false,
  hmr: true,
  // philgoServerUrl: 'https://www.philgo.com/api.php',
  // philgoFileServerUrl: 'https://file.philgo.com/index.php',
  // newFileServerUrl: 'https://file.philgo.com/~file_server/index.php'

  // philgoServerUrl: 'https://local.philgo.com/api.php',
  // philgoFileServerUrl: 'https://local.philgo.com/index.php',
  // newFileServerUrl: 'http://work.org/file-server/index.php',

  philgoServerUrl: 'http://office.philgo.com/api.php',
  philgoFileServerUrl: 'http://office.philgo.com/index.php',
  newFileServerUrl: 'http://office.com/file-server/index.php',
  /**
   * Office network.
   */
  // philgoServerUrl: 'http://192.168.0.174/sapcms_1_2/api.php',
  // philgoFileServerUrl: 'http://192.168.0.174/sapcms_1_2/index.php',
  // newFileServerUrl: 'http://192.168.0.174/file-server/index.php',

  // philgoServerUrl: 'http://59.30.59.162/sapcms_1_2/api.php',
  // philgoFileServerUrl: 'http://59.30.59.162/sapcms_1_2/index.php',
  // newFileServerUrl: 'http://59.30.59.162/file-server/index.php',
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
