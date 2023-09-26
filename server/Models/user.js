const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    email : {type: String, require : true, validate: /^[^\s@]+@[^\s@]+$/},
    password: {type : String , require : true},
    username : {type : String , default : 'Player'},
    wins : {type : Number, default : 0},
    losts : {type : Number, default : 0},
    online : {type : Boolean , default : false},
    token : {type : String}
});

module.exports = mongoose.model('User',userSchema);