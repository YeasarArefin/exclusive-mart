'use client';
import Product from "@/components/home/Explore/Product";
import ProductLoader from "@/components/product/ProductLoader";
import { Input } from "@/components/ui/input";
import Pagination from "@/components/ui/pagination";
import { useGetProductsCountQuery, useGetProductsQuery } from "@/features/api/apiSlice";
import usePagination from "@/hooks/usePagination";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { LuSearch } from "react-icons/lu";
import { useDebounceCallback } from 'usehooks-ts';

export default function Page() {
    const router = useRouter();
    const [brandFilters, setBrandFilters] = useState<string[]>([]);
    const [categoryFilters, setCategoryFilters] = useState<string[]>([]);
    const [name, setName] = useState<string>('');
    const searchParams = useSearchParams();

    const { data: pdCount } = useGetProductsCountQuery({});
    const productCount = pdCount?.data || 0;
    const { currentPage, handleItemPerPageChange, handleNextPage, handlePreviousPage, itemsPerPage, pages, setCurrentPage, setItemsPerPage } = usePagination({ totalItems: productCount });


    // filtering
    const handleBrandBox = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        if (checked) {
            setBrandFilters((prev) => [...prev, name]);
        } else {
            setBrandFilters((prev) => prev.filter((filter) => filter !== name));
        }
    };

    const handleCategoryBox = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        if (checked) {
            setCategoryFilters((prev) => [...prev, name]);
        } else {
            setCategoryFilters((prev) => prev.filter((filter) => filter !== name));
        }
    };

    const debounced = useDebounceCallback(setName, 500);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.value;
        debounced(name);
    };

    useEffect(() => {
        const brandQuery = searchParams.get('brand');
        const categoryQuery = searchParams.get('category');
        const page = searchParams.get('page');
        const limit = searchParams.get('limit');

        if (brandQuery) setBrandFilters(brandQuery.split(','));
        if (categoryQuery) setCategoryFilters(categoryQuery.split(','));
        if (page) setCurrentPage(parseInt(page));
        if (limit) setItemsPerPage(parseInt(limit));
    }, [searchParams, setCurrentPage, setItemsPerPage]);

    const brandQuery = brandFilters.length > 0 ? `brand=${brandFilters.join(',')}&` : '';
    const categoryQuery = categoryFilters.length > 0 ? `category=${categoryFilters.join(',')}&` : '';
    let query = [brandQuery, categoryQuery].filter(Boolean).join('&');

    if (name.length > 0) {
        query = query ? `${query}&name=${name}` : `name=${name}&`;
    }

    query += `page=${currentPage}&limit=${itemsPerPage}`;

    const { data: products, isLoading, isSuccess } = useGetProductsQuery(query); // Use RTK Query


    useEffect(() => {
        router.push(`?${query}`, undefined);
    }, [brandFilters, categoryFilters, name, currentPage, itemsPerPage, router, query]);

    let content;
    if (isLoading) {
        content = <ProductLoader count={itemsPerPage} />;
    }
    if (!isLoading && isSuccess) {
        content = <>
            {isSuccess && <h1 className="px-4 mb-2">Items Found : <span className="text-primary_red font-semibold">{products?.data.length || 0}</span></h1>}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5">
                {isLoading && <div>Loading...</div>}
                {products?.data?.length == 0 && <h1>No Items</h1>}
                {products?.data?.length > 0 && products?.data.map(pd => <Product key={pd._id} product={pd} />)}
            </div>
            {isSuccess && <div className="flex justify-center my-20">
                <div className="flex flex-col">
                    <h1 className="text-center mb-5">Current Page : <span className="text-primary_red font-semibold">{currentPage}</span></h1>

                    <Pagination totalItems={productCount} currentPage={currentPage} handleItemPerPageChange={handleItemPerPageChange} handleNextPage={handleNextPage} handlePreviousPage={handlePreviousPage} itemsPerPage={itemsPerPage} pages={pages} setCurrentPage={setCurrentPage} setItemsPerPage={setItemsPerPage} />

                </div>
            </div>}
        </>;
    }

    return (
        <div>
            <div>
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-y-10 lg:gap-5">
                    <div className="col-span-1">
                        <div className="mb-4">
                            <div className="relative">
                                <LuSearch className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input
                                    type="search"
                                    placeholder="Search products..."
                                    className="w-full appearance-none bg-background pl-8 shadow-none"
                                    onChange={handleSearch}
                                />
                            </div>
                        </div>

                        <div>
                            <div>Brands</div>
                            <div>
                                <div><input type="checkbox" className="mr-2" onChange={handleBrandBox} name="Apple" checked={brandFilters.includes('Apple')} />Apple</div>
                                <div><input type="checkbox" className="mr-2" onChange={handleBrandBox} name="zotac" checked={brandFilters.includes('zotac')} />Zotac</div>
                                <div><input type="checkbox" className="mr-2" onChange={handleBrandBox} name="amd" checked={brandFilters.includes('amd')} />Amd</div>
                                <div><input type="checkbox" className="mr-2" onChange={handleBrandBox} name="intel" checked={brandFilters.includes('intel')} />Intel</div>
                            </div>
                        </div>

                        <div>
                            <div>Categories</div>
                            <div>
                                <div><input type="checkbox" className="mr-2" onChange={handleCategoryBox} name="phone" checked={categoryFilters.includes('phone')} />Phone</div>
                                <div><input type="checkbox" className="mr-2" onChange={handleCategoryBox} name="gadget" checked={categoryFilters.includes('gadget')} />Gadget</div>
                                <div><input type="checkbox" className="mr-2" onChange={handleCategoryBox} name="laptop" checked={categoryFilters.includes('laptop')} />Laptop</div>
                                <div><input type="checkbox" className="mr-2" onChange={handleCategoryBox} name="accessory" checked={categoryFilters.includes('accessory')} />Accessory</div>
                            </div>
                        </div>

                    </div>

                    <div className="col-span-3">
                        {content}
                    </div>

                </div>
            </div>
        </ div>
    );
};