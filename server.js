const fs = require('mz/fs')

const {readdir} = fs

module.exports = async (req, res) => readdir(`/Applications`)
