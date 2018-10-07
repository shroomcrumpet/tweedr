

const sha256 = require('js-sha256');
const SALT = 'IMQXhem3mhim23jxda38jwxw3';


const verif = (request) => {

    return (sha256(request.cookies['userId'] + SALT) === request.cookies['loggedIn']);
};




module.exports = (db) => {


    const newUserForm = (request, response) => {

        response.render('user/NewUser');

    };


    const newUserPost = (request, response) => {

        db.user.newUser(request.body, (error, queryResult) => {

            if (error) {
                console.error('error getting user:', error);
                response.sendStatus(500);
            }

            if (queryResult.rowCount >= 1) {
                console.log('User created successfully');

                response.cookie('loggedIn', sha256(queryResult.rows[0].id + SALT));
                response.cookie('userId', queryResult.rows[0].id);
                response.cookie('username', request.body.username);

            } else {
                console.log('User could not be created');
            };

            response.redirect('/');
        });
    };


    const login = (request, response) => {

        db.user.login(request.body, (error, queryResult) => {

            if (error) {
                console.error('error getting user:', error);
                response.sendStatus(500);
            }

            if (queryResult.rowCount >= 1) {
                console.log('User found, logging in...');

                if (sha256(request.body.password) === queryResult.rows[0].password) {

                    console.log('Login Successful');

                    response.cookie('loggedIn', sha256(queryResult.rows[0].id + SALT));
                    response.cookie('userId', queryResult.rows[0].id);
                    response.cookie('username', request.body.username);

                } else {

                    console.log('Password incorrect, please try again');

                };

            } else {

                console.log('User not found, please try again');

            };

            response.redirect('/');
        });
    };


    const logout = (request, response) => {

        response.clearCookie('loggedIn');
        response.clearCookie('userId');
        response.clearCookie('username');

        console.log('You have been logged out~!');

        response.redirect('/');

    };


    const root = (request, response) => {

        if (verif(request)) {

            console.log ('verif, logged in.');
            response.render('root', request.cookies);

        } else {

            console.log ('verif, NOT logged in.');
            response.render('root');
        };
    };


    return {

        newUserForm,
        newUserPost,
        login,
        logout,
        root

    };
};






