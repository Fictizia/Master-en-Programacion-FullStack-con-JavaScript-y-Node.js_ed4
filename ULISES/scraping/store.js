const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('db.json')
const db = low(adapter)

// Set some defaults (required if your JSON file is empty)
db.defaults({ articles: [] }).write()

const save = (data) => db.get('articles').push(data).write()
const getAll = () => db.get('articles').value()
const getById = (id) => db.get('articles').find({ id }).value()
const getAllBySource = (source) => db.get('articles').filter({ source }).value() 

module.exports = {
    save, getAll, getById, getAllBySource
}
