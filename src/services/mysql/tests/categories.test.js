const test = require('ava')
const { connection, errorHandler } = require('./setup')

const categories = require('../categories')({ connection, errorHandler })

const create = () => categories.save('category-save')
const update = () => categories.update(1,'category-updated')
const del = () => categories.del(1)

test.beforeEach(() => connection.query('TRUNCATE TABLE categories'))
test.after.always(() => connection.query('TRUNCATE TABLE categories'))

test('List categories', async t => {
    await create()
    const list = await categories.all()
    t.is(list.categories.length, 1)
    t.is(list.categories[0].name, 'category-save')
})

test('Creation category', async t => {
    const result = await create()
    t.is(result.category.name, 'category-save')
})

test('Update category', async t => {
    await create()
    const updated = await update()
    t.is(updated.category.name, 'category-updated')
    t.is(updated.affectedRows, 1)
})

test('Remove category', async t => {
    await create()
    const removed = await del()
    t.is(removed.affectedRows, 1)
})