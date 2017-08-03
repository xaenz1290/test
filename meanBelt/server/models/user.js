const mongoose = require('mongoose');
const { Schema } = mongoose

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Must enter a first name'],
        trim: true,
        unique: true
    },
    items: [{
        type: Schema.Types.ObjectId,
        ref: 'Item',
    }], 
    
}, {
    timestamps: true
});






module.exports =  mongoose.model('User', userSchema)