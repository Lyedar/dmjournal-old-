var Spell = require('../models/spellModel')

function retrieveOne(req, res){
	console.log("Get Request Received for ", req.params.slug)
	Spell.findOne({_id : req.params.slug}, function(err, spell) {
		if(err) return console.log(err);
		res.writeHead(200, {"Content-Type": "text/json"})
		res.end(JSON.stringify(spell))
	})
}

function allName(req, res){
	console.log("Get Request Received for all spells")
	Spell.find({}, function(err, spells) {
		if(err) return console.log(err);
		spells = spells.map(function(spell){
			return {id : spell._id,
					name : spell.name,
					classes : spell.classes,
					level : spell.level,
					school : spell.school,
					creator : spell.creator}
		})
		res.writeHead(200, {"Content-Type": "text/json"})
		res.end(JSON.stringify(spells))
	})
}

function createSpell(req, res){
	var components = {
		verbal: req.body.spellVerbal,
		somatic: req.body.spellSomatic,
		material: req.body.materialsCheck,
		materials_needed: req.body.spellMaterials
	}

	var spell ={
		name : req.body.spellName,
		description: req.body.spellDesc,
		level: req.body.spellLevel,
		school: req.body.spellSchool,
		casting_time: req.body.spellCT,
		ritual: req.body.spellRitual,
		range: req.body.spellRange,
		duration: req.body.spellDuration,
		classes: req.body.spellClasses,
		creator: req.body.spellCreator,
		components: components
	}
	Spell.create(spell, function(err, spell){
		if(err) return console.log(err);
		res.writeHead(200, {"Content-Type": "text/json"})
		res.end(JSON.stringify({success: true}))
	})
}

function updateOneSpell(req, res) {
	console.log('Update resquest for ', req.body.userName , ' with ', req.body)
	Spell.findOneAndUpdate({_id:req.body.id}, req.body, function(err, spell) {
		if(err) return console.log(err);
		res.writeHead(200, {"Content-Type": "text/json"})
		res.end(JSON.stringify(spell))
	})
}


module.exports = {
	retrieveOne,
	allName,
	createSpell,
	updateOneSpell
}

//  function retrieveOne(req, res) {
// 	console.log("Get Request Received for ", req.params.slug)
// Spell.create(req.body, function(err, spell){
// 	if(err) return console.log(err);
// 	res.writeHead(200, {"Content-Type": "text/json"})
// 	res.end(JSON.stringify(spell))
// })
// }

// function updateOne(req, res) {
// 	console.log('Update resquest for ', req.body.userName , ' with ', req.body)
// 	Profile.findOneAndUpdate({userName:req.body.userName}, req.body, function(err, profile) {
// 		if(err) return console.log(err);
// 		res.writeHead(200, {"Content-Type": "text/json"})
// 		res.end(JSON.stringify(profile))
// 	})
// }
