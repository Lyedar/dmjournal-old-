var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var monsterSchema = new Schema({
    "name" : String,
    "size" : String,
    "type" : String,
    "subtype" : String,
    "alignment" : String,
    "armor_class" : Number,
    "hit_points" : Number,
    "hit_dice" : String,
    "speed" : String,
    "strength" : Number,
    "dexterity" : Number,
    "constitution" : Number,
    "intelligence" : Number,
    "wisdom" : Number,
    "charisma" : Number,
    "saving_throws" : {},
    "skills" : {}, 
    "damage_vulnerabilities" : String,
    "damage_resistances" : String,
    "damage_immunities" : String,
    "condition_immunities" : String,
    "senses" : String,
    "challenge_rating" : String,
    "environment" : [String],
    "special_abilities" : [ 
        {
            "name" : String,
            "desc" : String,
            "attack_bonus" : Number
        }
    ],
    "actions" : [ 
        {
            "name" : String,
            "desc" : String,
            "attack_bonus" : Number,
            "damage_dice" : String
        }
    ],
    "legendary_actions": [
    {
      "attack_bonus": Number,
      "desc": String,
      "name": String
    }
    ]
}, {minimize : false})

var Monster = mongoose.model('Monster', monsterSchema);

module.exports = Monster