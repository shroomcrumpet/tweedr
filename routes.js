

module.exports = (app, db) => {

    const usersController = require('./controllers/user')(db);

    // =========================================
    // Users
    // =========================================

    app.get('/users/new', usersController.newUserForm);
    app.post('/users', usersController.newUserPost);

};