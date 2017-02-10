var Monster = require('../models/monsterModel')

function retrieveOne(req, res){
	console.log("Get Request Received for ", req.params.slug)
	Monster.findOne({_id : req.params.slug}, function(err, monster) {
		if(err) return console.log(err);
		res.writeHead(200, {"Content-Type": "text/json"})
		res.end(JSON.stringify(monster))
	})
}

function allName(req, res){
	console.log("Get Request Received for all Monsters")
	Monster.find({}, function(err, monsters) {
		if(err) return console.log(err);
		monsters = monsters.map(function(monster){
			return {id : monster._id,
					name : monster.name,
					type : monster.type,
					environment : monster.environment,
					challenge_rating : monster.challenge_rating
				}
		})
		res.writeHead(200, {"Content-Type": "text/json"})
		res.end(JSON.stringify(monsters))
	})
}





module.exports = { 
	retrieveOne,
	allName
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




