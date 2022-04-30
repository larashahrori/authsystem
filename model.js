const mongoose=require('mongoose');

const schema = new mongoose.Schema({
    username: { type: String
    },
    name: { firsname:{type: String},
    lastname:{type: String}},
    password: { type: String ,min:6},
    email: { type: String}
});

module.exports =mongoose.model('User',schema);