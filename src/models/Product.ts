// import { Product, Review } from "@/types/types";
// import mongoose, { Schema } from "mongoose";
// import CategoryModel from "./Category";

// const ReviewSchema: Schema<Review> = new mongoose.Schema({
//     user: {
//         type: Schema.Types.ObjectId,
//     },
//     review: {
//         type: String
//     }
// });

// export const ProductSchema: Schema<Product> = new mongoose.Schema({
//     name: {
//         type: String,
//         required: [true, 'name is required'],
//         trim: true
//     },
//     description: {
//         type: String,
//         required: [true, 'description is required']
//     },
//     images: {
//         type: [String],
//         required: [true, 'images is required']
//     },
//     price: {
//         type: Number,
//         required: [true, 'price is required']
//     },
//     stocks: {
//         type: Number,
//         required: [true, 'stocks is required']
//     },
//     category: {
//         type: Schema.Types.ObjectId,
//         ref: CategoryModel.modelName,
//         required: [true, 'category is required']
//     },
//     brand: {
//         type: String,
//         required: [true, 'brand is required']
//     },
//     discount: {
//         type: Number,
//         default: 0
//     },
//     rating: {
//         type: Number,
//         default: 0
//     },
//     reviews: [ReviewSchema],
//     featured: {
//         type: Boolean,
//         default: false
//     },
//     size: {
//         type: [String],
//         default: []
//     },
//     colors: {
//         type: [String],
//         default: []
//     },
//     cartQuantity: {
//         type: Number,
//         default: 0
//     },
//     cartId: {
//         type: String,
//         default: ''
//     }
// },
//     {
//         timestamps: true
//     }
// );

// const ProductModel = (mongoose.models.Product as mongoose.Model<Product>) || (mongoose.model<Product>('Product', ProductSchema));
// export default ProductModel;

import { Product, Review } from "@/types/types";
import mongoose, { Schema } from "mongoose";

const ReviewSchema: Schema<Review> = new mongoose.Schema({
    user: {
        type: Schema.Types.ObjectId,
    },
    review: {
        type: String
    }
});
export const ProductSchema: Schema<Product> = new mongoose.Schema({
    type: {
        type: String,
        enum: ['phone', 'laptop', 'accessory'],
        required: [true, 'type is required']
    },
    name: {
        type: String,
        required: [true, 'name is required'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'description is required']
    },
    images: [
        {
            color_name: { type: String, required: true },
            image: { type: String, required: true },
        }
    ],
    brand: {
        type: String,
        required: [true, 'brand is required']
    },
    discount: {
        type: Number,
        default: 0
    },
    featured: {
        type: Boolean,
        default: false
    },
    variants: [
        {
            size: { type: String, required: true },
            price: { type: Number, required: true },
            stocks: { type: Number, required: true }
        }
    ],
    colors: [
        {
            color_name: { type: String, required: true },
            color_code: { type: String, required: true },
            inStock: { type: Boolean, default: true }
        }
    ],
    cartQuantity: {
        type: Number,
        default: 0
    },
    cartId: {
        type: String,
        default: ''
    }
},
    {
        timestamps: true
    });

const ProductModel = (mongoose.models.Product as mongoose.Model<Product>) || (mongoose.model<Product>('Product', ProductSchema));
export default ProductModel;
