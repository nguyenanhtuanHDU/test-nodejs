const mongoose = require('mongoose')

const serviceSchema = new mongoose.Schema({
    name: String,
    customerInfo: [{ type: mongoose.Schema.Types.ObjectId, ref: 'customer' }]

}, {
    timestamps: true
});
const Service = mongoose.model('service', serviceSchema);

module.exports = Service