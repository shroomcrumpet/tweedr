

const sha256 = require('js-sha256');



module.exports = (dbPoolInstance) => {

    const newUser = (reqbody, callback) => {

        var hashedValue = sha256(reqbody.password);

        const queryString = 'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id';

        const values = [
            reqbody.username,
            hashedValue
        ];

        dbPoolInstance.query(queryString, values, (error, queryResult) => {

            callback(error, queryResult);
        });
    };

    return {

        newUser
    };
};
