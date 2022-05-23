// get the client
const mysql = require('mysql2');

// create the connection to database
const connection = mysql.createConnection({
    host: process.env.SQL_HOST,
    user: process.env.SQL_USER,
    password: process.env.SQL_PASSWORD,
    database: process.env.SQL_DB
});

// simple query

const createUser = ({ first_name, last_name, password, email, isAdmin }) => {
    connection.query(
        `INSERT INTO users_tb (first_name, last_name, password, email, isAdmin) 
         VALUES ('${first_name}', '${last_name}', '${password}', '${email}', ${isAdmin});`,
        function (err, results, fields) {
            if (err) console.log(err)
            console.log("new user added: ", results); // results contains rows returned by server
        }
    );
}

const readUserByEail = email => {
    return new Promise(function (resolve, reject) {
        connection.query(
            `select * from users_tb where email = '${email}';`,
            function (err, results, fields) {
                if (err) reject(err);
                else resolve(results[0]);
            }
        );
    });
}

const readUserById = id => {
    return new Promise(function (resolve, reject) {
        connection.query(
            `select * from users_tb where id = '${id}';`,
            function (err, results, fields) {
                if (err) reject(err);
                else resolve(results[0]);
            }
        );
    });
}

const readUsers = () => {
    return new Promise(function (resolve, reject) {
        connection.query(
            `select * from users_tb;`,
            function (err, results, fields) {
                if (err) reject(err);
                else resolve(results);
            }
        );
    });
}


const updateUser = (id, props) => {
    let columns = "";
    for (let prop in props) {
        if (columns) columns += ','
        columns += `${prop} = '${props[prop]}'`
    }
    console.log("props ", props)
    connection.query(
        `UPDATE users_tb
         SET ${columns} 
         WHERE id=${id};`,
        function (err, results, fields) {
            if (err) console.log(err)
            console.log("user updated: ", id); // results contains rows returned by server
        }
    );
}

const deleteUser = (id) => {
    connection.query(
        `DELETE FROM users_tb WHERE id=${id};`,
        function (err, results, fields) {
            console.log("user deleted: ", id); // results contains rows returned by server
        }
    );
}


module.exports = {
    createUser,
    readUsers,
    readUserByEail,
    readUserById,
    updateUser,
    deleteUser
}