// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  backend: {
    host: 'http://165.227.117.130:8001'
  },
  oauth: {
    url: 'http://165.227.117.130:8001',
    client_id: '2',
    client_secret: 'mlcCh4V74XZOkvVqNDbIHSjaxnOGWqSxt5Z1YqFc',
    grant_type: 'password',
    scope: '*'
  }
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
