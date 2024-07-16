import mongoose from "mongoose";

const PricingSchema = new mongoose.Schema({
    id: String,
    price: Number,
    time: {
        type: Date,
        default: Date.now
    }
});

const Price = mongoose.model('Price', PricingSchema);

export default Price;