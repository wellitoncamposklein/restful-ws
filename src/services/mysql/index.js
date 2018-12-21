const mysqlServer = require('mysql')

const connection = mysqlServer.createConnection({
    host: 'localhost',
    user: 'tom',
    password: 'root',
    database: 'restful_ws'
})

const categoryModule = require('./categories')({ connection })

module.exports = {
    categories: () => categoryModule
}