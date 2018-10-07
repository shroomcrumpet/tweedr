

const sha256 = require('js-sha256');
const SALT = 'IMQXhem3mhim23jxda38jwxw3';


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


    return {
        newUserForm,
        newUserPost
    };
};
