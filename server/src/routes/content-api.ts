export default [
  {
    method: 'GET',
    path: '/',
    // name of the controller file & the method.
    handler: 'controller.config',
    config: {
      policies: ['admin::isAuthenticatedAdmin'],
    },
  },
];
