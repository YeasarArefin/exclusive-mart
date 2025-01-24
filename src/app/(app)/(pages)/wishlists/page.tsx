import Wishlists from "@/components/wishlists/wishlists";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Wishlists | Exclusive Mart",
    description: "Largest Online Store",
};

export default function page() {
    return (
        <div>
            <Wishlists />
        </div>
    );
}
