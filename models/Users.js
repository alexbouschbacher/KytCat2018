var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var UsersSchema   = mongoose.Schema({
		firstName: String,
		lastName: String,

		email: String,
		password: String,

		role : String, //Student, Aer, Pedago, Admin
});

var Users = module.exports = mongoose.model('Users', UsersSchema);
