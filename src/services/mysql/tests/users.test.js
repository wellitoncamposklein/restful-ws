const test = require('ava')
const { connection, errorHandler } = require('./setup')

const users = require('../users')({ connection, errorHandler })

const create = () => users.save('user@test.com', '123456')
const update = () => users.update(1,'1234')
const del = () => users.del(1)

test.beforeEach(() => connection.query('TRUNCATE TABLE users'))
test.after.always(() => connection.query('TRUNCATE TABLE users'))

test('List users', async t => {
    await create()
    const list = await users.all()
    t.is(list.users.length, 1)
    t.is(list.users[0].email, 'user@test.com')
})

test('Creation user', async t => {
    const result = await create()
    t.is(result.user.email, 'user@test.com')
})

test('Update user', async t => {
    await create()
    const updated = await update()
    t.is(updated.affectedRows, 1)
})

test('Remove user', async t => {
    await create()
    const removed = await del()
    t.is(removed.affectedRows, 1)
})