const { Sequelize, DataTypes } = require('sequelize')
const sequelize = require('../config/db')

const Country = sequelize.define('Country',{
	name:{
		type: DataTypes.STRING
	},
	location:{
		type: DataTypes.STRING
	}
})

module.exports = Country