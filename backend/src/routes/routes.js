const express = require('express')
const sequelize = require('../config/db')
const Country = require('../models/Country')
const Language = require('../models/Language')
const router = express.Router()

Country.hasMany(Language,{as:'languages'})
Language.belongsTo(Country)

sequelize.sync({alter:true}).then(()=>console.log('We are N*Sync'))
.catch((err)=>console.log('We are not Synced up',err))

//Country Routes//
router.get('/hello',(req,res)=>{
	res.send('Hello World')
})

router.get('/',async(req,res)=>{
	try{
		const countries = await Country.findAll({include:'languages'})
		res.send(countries)
	}catch(error){
		console.log(error)
		res.status(500).send('Not Available....')
	}
})

router.get('/:id',async(req,res)=>{
	try{
		const co = await Country.findByPk(req.params.id,{include:'languages'})
		res.send(co)
	}catch(error){
		console.log(error)
		res.status(500).send('Not Available....')
	}
})

router.put('/:id',async(req,res)=>{
	try{
		const co = await Country.findByPk(req.params.id)
		if(co){
			co.name = req.body.name;
			co.location = req.body.location;
			await co.save();
			res.redirect('/api/countries')
		}
	}catch(error){
		console.log(error)
		res.status(500).send('Not Available....')
	}
})

router.delete('/:id',async(req,res)=>{
	try{
		const co = await Country.findByPk(req.params.id)
		if(co){
			co.destroy()
			res.redirect('/api/countries')
		}
	}catch(error){
		console.log(error)
		res.status(500).send('Not Available....')
	}
})

router.post('/',async(req,res)=>{
	try{
		const newCo = {
			name: req.body.name,
			location: req.body.location
		}
		const country = await Country.create(newCo)
		console.log(country)
		res.redirect('/api/countries')
	}catch(error){
		console.log(error)
		res.status(500).send('Not Available....')
	}
})
//End Country Routes//

//Lang Routes//
router.get('/:id/languages',async(req,res)=>{
	try{
		const co = await Country.findByPk(req.params.id,{include:'languages'})
		res.send(co.languages)
	}catch(error){
		console.log(error)
		res.status(500).send('Not Available....')
	}
})

router.get('/:id/languages/:id',async(req,res)=>{
	try{
		const lang = await Language.findByPk(req.params.id)
		res.send(lang)
	}catch(error){
		console.log(error)
		res.status(500).send('Not Available....')
	}
})

router.put('/:id/languages/:id',async(req,res)=>{
	try{
		const lang = await Language.findByPk(req.params.id)
		if(lang){
			lang.name = req.body.name;
			lang.CountryId = lang.CountryId;
			await lang.save()
			res.redirect('/api/countries')
		}
	}catch(error){
		console.log(error)
		res.status(500).send('Not Available....')
	}
})

router.delete('/:id/languages/:id',async(req,res)=>{
	try{
		const lang = await Language.findByPk(req.params.id)
		if(lang){
			lang.destroy()
			res.redirect('/api/countries')
		}
	}catch(error){
		console.log(error)
		res.status(500).send('Not Available....')
	}
})

router.post('/:id/languages',async(req,res)=>{
	try{
		const newLang = {
			name: req.body.name,
			CountryId: req.params.id
		}
		const lang = await Language.create(newLang)
		console.log(lang)
		res.redirect('/api/countries')
	}catch(error){
		console.log(error)
		res.status(500).send('Not Available....')
	}
})
//End Lang Routes//

module.exports = router;