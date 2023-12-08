const { Sequelize, DataTypes } = require('sequelize')
const sequelize = require('../config/db')

const Language = sequelize.define('Language',{
	name:{
		type: DataTypes.STRING
	}
})

module.exports = Language