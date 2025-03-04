const adminApiRoutes = {
    type: 'admin',
    routes: [
        {
            method: 'GET',
            path: '/config',
            handler: 'revalidation-button.config',
            config: {
                policies: ['admin::isAuthenticatedAdmin'],
            },
        },
    ],
};

export default adminApiRoutes;
