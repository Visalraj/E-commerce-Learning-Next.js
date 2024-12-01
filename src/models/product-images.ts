import mongoose, { Schema } from "mongoose";

const productImages = new Schema({
    product_id: { type: Schema.Types.ObjectId, ref: "product" },
    images: { type: [String] },
});

const ProductImages = mongoose.models.product_images || mongoose.model("product_images", productImages);

export default ProductImages;
