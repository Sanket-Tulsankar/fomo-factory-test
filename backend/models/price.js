"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const PricingSchema = new mongoose_1.default.Schema({
    id: String,
    price: Number,
    time: {
        type: Date,
        default: Date.now
    }
});
const Price = mongoose_1.default.model('Price', PricingSchema);
exports.default = Price;
