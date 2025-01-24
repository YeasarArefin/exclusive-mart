import sendResponse from "@/lib/sendResponse";
import CouponModel from "@/models/Coupon";
import ProductModel from "@/models/Product";
import { PaymentData, Product } from "@/types/types";
import { NextRequest } from "next/server";
import SSLCommerzPayment from 'sslcommerz-lts';
import { v4 as uuid } from 'uuid';

const store_id = 'exclu671a2b862984a';
const store_passwd = 'exclu671a2b862984a@ssl';
const is_live = false; //true for live, false for sandbox

export async function POST(request: NextRequest) {
    try {
        const paymentData = await request.json() as PaymentData;
        console.log("🚀 ~ POST ~ paymentData:", paymentData);

        const { name, email, address, city, phone, postCode, products, code } = paymentData || {};


        let totalAmount = 0;
        let productName = '';
        for (let i = 0; i < products.length; i++) {
            const pd = products[i];
            const product = await ProductModel.findById(pd._id) as Product;
            const subTotal = product.price * pd.quantity;
            totalAmount += subTotal;
            productName += i === products.length - 1 ? `${product.name}` : `${product.name}, `;
        }

        totalAmount = totalAmount + totalAmount * (7 / 100);
        let discount = 0;
        if (code) {
            const coupon = await CouponModel.findOne({ code });
            discount = coupon?.discount as number;
        }
        totalAmount = totalAmount - (totalAmount * (discount / 100)) + 60;

        const data = {
            total_amount: totalAmount,
            currency: 'BDT',
            tran_id: uuid(),
            success_url: 'http://localhost:3000/success',
            fail_url: 'http://localhost:3000/fail',
            cancel_url: 'http://localhost:3000/cancel',
            ipn_url: 'http://localhost:3000/ipn',
            shipping_method: 'Courier',
            product_name: productName,
            product_category: 'Electronic',
            product_profile: 'general',
            cus_name: name,
            cus_email: email,
            cus_add1: address,
            cus_add2: address,
            cus_city: city,
            cus_state: city,
            cus_postcode: postCode,
            cus_country: 'Bangladesh',
            cus_phone: phone,
            cus_fax: phone,
            ship_name: name,
            ship_add1: address,
            ship_add2: address,
            ship_city: city,
            ship_state: city,
            ship_postcode: postCode,
            ship_country: 'Bangladesh',
        };
        console.log(data);

        const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
        sslcz.init(data)
            .then(apiResponse => {
                // Redirect the user to payment gateway
                let GatewayPageURL = apiResponse.GatewayPageURL;
                console.log('Redirecting to: ', GatewayPageURL);
                // return sendResponse(true, "Success Payment URL", 200, GatewayPageURL);
                // res.redirect(GatewayPageURL);
            });


    } catch (error) {
        return sendResponse(false, "False Payment URL", 501);
    }
}