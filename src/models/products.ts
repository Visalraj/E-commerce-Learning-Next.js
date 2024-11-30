import mongoose, { Schema } from "mongoose";
const productSchema = new Schema(
    {
        product_name: { type: String },
        product_desc: { type: String },
        product_price: { type: Number },
        isActive: { type: Boolean, default: true }
    },
    {
        timestamps: true
    }
);

const Products = mongoose.models.products || mongoose.model("products", productSchema);

export default Products;