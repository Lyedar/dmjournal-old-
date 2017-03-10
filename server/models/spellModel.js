var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var spellSchema = new Schema({
  "name": String,
  "tags": [String],
  "classes": [String],
  "type": String,
  "ritual": Boolean,
  "level": String,
  "school": String,
  "casting_time": String,
  "range": String,
  "components": {
    "verbal": Boolean,
    "somatic": Boolean,
    "material": Boolean,
    "raw": String
  },
  "duration": String,
  "description": String,
  "owner":String
})

var Spell = mongoose.model('Spell', spellSchema);

module.exports = Spell