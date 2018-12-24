const test = require('ava')
const { connection, errorHandler } = require('./setup')

const users = require('../users')({ connection, errorHandler })
const auth = require('../auth')({ connection, errorHandler })

const create = () => users.save('user@test.com', '123456')

test.beforeEach(() => connection.query('TRUNCATE TABLE users'))
test.after.always(() => connection.query('TRUNCATE TABLE users'))

test('Login user - sucesso', async t => {
    await create()
    const result = await auth.authenticate('user@test.com', '123456')
    t.not(result.token, null)
    t.not(result.token.length, 0)
})