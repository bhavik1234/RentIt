const mongoose = require('mongoose');
var Schema = mongoose.Schema;


var ReviewSchema = new Schema({
    name: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    reviewDate: { type: Date, required: true },
    comment: { type: String }
});

var ProductSchema = new Schema({
    resolution: { type: String },
    graphiclensSizeCard: { type: String },
    memory: { type: String },
    connectivity: { type: String },
    usbPort: { type: String }
})

var ElectronicSchema = new Schema({
    image: { type: String, required: true },
    name: { type: String, required: true },
    details: { type: String },
    product_type: { type: String },
    level: { type: String },
    price: { type: Number, required: true },
    productSpecs: [ProductSchema],
    reviews: [ReviewSchema]
});

module.exports = mongoose.model('Electronic', ElectronicSchema);