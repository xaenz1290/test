const mongoose = require('mongoose');
const {Schema} = mongoose;

const itemSchema = new Schema({
    'title': {
        type: String,
        required: [true, 'Please enter a title'],
        minlength: [5, 'must be atleaste 5 characters'],

    },
    'description': {
        type: String,
        required: true,
        minlength: [10, 'Must be 10 characters']
    },
    'postedBy': {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    'tags': {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    'status': {
        type: Boolean,
        default: false
    }
    
    
    
}, {timestamps: true});

module.exports = mongoose.model('Item', itemSchema)