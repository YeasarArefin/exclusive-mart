"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import LoadingIcon from "@/components/ui/loadingIcon";
import { useUploadBrandMutation } from "@/features/api/apiSlice";
import { Brand } from "@/types/types";
import { Check, Plus } from "lucide-react";
import type React from "react";
import { useState } from "react";
import BrandImageUpload from "./BrandImageUpload";

const brandTypes = [
    { id: "phone", label: "Phone" },
    { id: "laptop", label: "Laptop" },
    { id: "accessory", label: "Accessory" },
];

export function AddBrand() {
    const [open, setOpen] = useState(false);
    const [image, setImage] = useState('');
    const [formData, setFormData] = useState<Partial<Brand>>({
        name: "",
        type: [],
        image: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [uploadBrand, { isError, isLoading, isSuccess }] = useUploadBrandMutation();
    const getImage = (img: string) => {
        setImage(img);
        return img;
    };

    const handleInputChange = (field: keyof Brand, value: any) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };


    const handleTypeChange = (typeId: string, checked: boolean) => {
        setFormData((prev) => {
            const currentTypes = prev.type || [];
            if (checked) {
                return { ...prev, type: [...currentTypes, typeId] };
            } else {
                return { ...prev, type: currentTypes.filter((t) => t !== typeId) };
            }
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const newData = { ...formData, image };
        uploadBrand(newData);
        setFormData({
            image: '',
            name: '',
            type: []
        });
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="bg-red-600 hover:bg-red-700 text-white">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Brand
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <DialogTitle>Add New Brand</DialogTitle>
                    <DialogDescription>Fill in the details to add a new brand to your system.</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Brand Name */}
                    <div className="space-y-2">
                        <Label htmlFor="name">Brand Name*</Label>
                        <Input
                            id="name"
                            value={formData.name}
                            onChange={(e) => handleInputChange("name", e.target.value)}
                            placeholder="Enter brand name (e.g., Apple, Samsung)"
                            required
                        />
                    </div>

                    {/* Brand Types */}
                    <div className="space-y-3">
                        <Label>Product Types*</Label>
                        <p className="text-sm text-gray-600">Select the types of products this brand offers</p>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            {brandTypes.map((type) => (
                                <div key={type.id} className="flex items-center space-x-2">
                                    <Checkbox
                                        id={type.id}
                                        checked={formData.type?.includes(type.id) || false}
                                        onCheckedChange={(checked) => handleTypeChange(type.id, checked as boolean)}
                                    />
                                    <Label
                                        htmlFor={type.id}
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        {type.label}
                                    </Label>
                                </div>
                            ))}
                        </div>
                        {formData.type && formData.type.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-2">
                                {formData.type.map((type) => (
                                    <span
                                        key={type}
                                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800"
                                    >
                                        {brandTypes.find((t) => t.id === type)?.label}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Brand Image */}
                    <div className="space-y-3">
                        <Label htmlFor="image">Brand Image*</Label>
                        <div className="space-y-3">
                            <BrandImageUpload getImage={getImage} />
                        </div>
                    </div>

                    <DialogFooter className="pt-4 border-t">
                        <Button type="button" variant="outline" onClick={() => setOpen(false)} disabled={isSubmitting}>
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            className="bg-red-600 hover:bg-red-700 text-white"
                            disabled={isLoading || isSuccess}
                        >
                            {isLoading ? <div className="flex gap-x-3 items-center"><LoadingIcon /> Adding...</div> : isSuccess ? <div className="flex gap-x-3 items-center"><Check className="mr-2" />Uploaded</div> : "Add Brand"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
