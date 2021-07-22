const profileRoutes = require('./profile/profile.route');

const routes = (app) => {
    app.use('/api/profile', profileRoutes);
}

module.exports = routes