const Sequelize = require('sequelize')
const db = require('../index')

module.exports = db.define('campus',{
    name:{
        type: Sequelize.STRING,
        allowNull: false,
        isUnique : true
    },
    content: {
        type: Sequelize.TEXT,
        allowNull: true
    },
    image: {
        type: Sequelize.STRING,
        allowNull : false
        }
})