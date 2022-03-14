var mongoose = require('mongoose');

var StreamSchema = new mongoose.Schema({
	title: String,
	description: String,
	userId: String,
});

module.exports = mongoose.model('Stream', StreamSchema);
