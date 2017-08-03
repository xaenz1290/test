const Item = require('mongoose').model('Item')
const User = require('mongoose').model('User')

const errorHandler = require('./errors')


module.exports = {
    index(req, res) {
        console.log('in get items')
        Item.find({}).populate('postedBy')
        .then(items => res.json(items))
        .catch(errorHandler.bind(res))
    },
    create(req, res) {
        console.log(req.body)

    Item.create(req.body)
        .then(item => {
            console.log(item)
            return User.findByIdAndUpdate(req.body.tags, { $push : { items: item } }, { upsert: true, new: true})
                .then((user) => {
                    console.log('testing next ',req.body.tags,item)
                        return User.findByIdAndUpdate(req.body.postedBy, { $push : { items: item } }, { upsert: true, new: true})
                })
                .then(user => res.json(user))
        })
        .catch(errorHandler.bind(res));
    },
    update(req, res) {
        console.log(req.body)
        Item.findByIdAndUpdate(req.params.id, { $set: {status: req.body.status} }, {new: true})
        .then(item => res.json(item))
        .catch(errorHandler.bind(res))
    },
    
    
    


}
