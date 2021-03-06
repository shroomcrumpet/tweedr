

module.exports = (app, db) => {

    const usersController = require('./controllers/user')(db);

    // =========================================
    // Users
    // =========================================

    app.get('/users/new', usersController.newUserForm);
    app.post('/users', usersController.newUserPost);


    // =========================================
    // Homepage
    // =========================================

    app.get('/', usersController.root);

    app.post('/login', usersController.login);
    app.delete('/logout', usersController.logout);

};