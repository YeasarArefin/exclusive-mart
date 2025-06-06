import dbConnect from "@/lib/dbConnect";
import sendResponse from "@/lib/sendResponse";
import BrandModel from "@/models/Brand";
import { Brand } from "@/types/types";
import { NextRequest } from "next/server";

const allowedTypes = ['phone', 'laptop', 'accessory'];

export async function POST(request: NextRequest) {
    dbConnect();
    try {
        const body = await request.json();
        const { name, type, image } = body as Brand;
        if (!name || !type || !image) {
            return sendResponse(false, 'name, type, and image are required', 400);
        }
        if (type.length === 0) {
            return sendResponse(false, 'type must be a non-empty array with valid values', 400);
        }
        const response = await BrandModel.create({ name, type, image });
        return sendResponse(true, 'brand uploaded successfully', 200, response);
    } catch (error) {
        console.log("🚀 ~ POST ~ error: /api/brand - error uploading brand", error);
        return sendResponse(false, 'error uploading brand', 500, error);
    }
}

export async function GET(request: NextRequest) {
    dbConnect();
    const { searchParams } = new URL(request.url);
    const _id = searchParams.get('id');
    try {

        if (_id) {
            const brand = await BrandModel.findById(_id) as Brand;
            return sendResponse(true, 'brand sent successfully', 200, brand);
        }

        const brands = await BrandModel.find({}) as Brand[];
        return sendResponse(true, 'brands sent successfully', 200, brands);
    } catch (error) {
        console.log("🚀 ~ GET ~ error: /api/brand - error sending brands", error);
        return sendResponse(false, 'error sending brands', 500, error);
    }
}

export async function DELETE(request: NextRequest) {
    dbConnect();
    try {
        const { id } = await request.json();
        if (!id) {
            return sendResponse(false, 'Brand id is required', 400);
        }
        const deleted = await BrandModel.findByIdAndDelete(id);
        if (!deleted) {
            return sendResponse(false, 'Brand not found', 404);
        }
        return sendResponse(true, 'Brand deleted successfully', 200, deleted);
    } catch (error) {
        console.log("🚀 ~ DELETE ~ error: /api/brand - error deleting brand", error);
        return sendResponse(false, 'error deleting brand', 500, error);
    }
}

export async function PUT(request: NextRequest) {
    dbConnect();
    try {
        const body = await request.json();
        const { _id, name, type, image } = body as Brand;
        if (!_id) {
            return sendResponse(false, 'Brand id is required', 400);
        };

        const updated = await BrandModel.findByIdAndUpdate(_id, body, { new: true });
        if (!updated) {
            return sendResponse(false, 'Brand not found', 404);
        }
        return sendResponse(true, 'Brand updated successfully', 200, updated);
    } catch (error) {
        console.log("🚀 ~ PUT ~ error: /api/brand - error updating brand", error);
        return sendResponse(false, 'error updating brand', 500, error);
    }
}