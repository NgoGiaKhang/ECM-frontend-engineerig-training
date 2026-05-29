import { useIdempotencyKey } from "@/hooks/useIdempotencyKey";
import { ProductForm, type ProductFormType } from "../components/ProductForm/ProductForm";
import { productService } from "../product.service";
import type { ApiErrorResponse } from "@/api/types";
import { ErrorCode } from "@/constants/error";
import { toast } from "sonner";
import { useState } from "react";
import { DashboardPageHeader } from "@/components/DashboardPageHeader/DashboardPageHeader";
import { PackagePlus } from "lucide-react";

export const initialProductForm: ProductFormType = {
    sku: "",
    slug: "",
    name: "",
    description: "",

    price: 0,
    originalPrice: undefined,
    discountPercent: undefined,

    currency: "USD",

    isAvailable: true,

    thumbnail: "",
    images: [],

    categoryId: "",
    brandId: "",

    tags: "",
};


export function ProductFormPage() {

    const { key } = useIdempotencyKey()
    const [form] = useState(initialProductForm);


    async function handleSubmit({ tags, ...rest }: ProductFormType): Promise<void> {
        try {
            const res = await productService.create({
                ...rest,
                tags: tags
                    .split(",")
                    .map((t) => t.trim())
                    .filter(Boolean),
            }, key)

            toast.success("Create product success !")

        } catch (e) {
            const error = e as ApiErrorResponse;
            if (error.code == ErrorCode.ValidationError) {

            } else if (error.status == 400) {
                toast.error(error.message)
            }

        }
    }

    return (
        <>
            <DashboardPageHeader
                title="Create Product"
                description="Add a new product to your catalog."
                icon={
                    <PackagePlus size={22} />
                }
            />
            <ProductForm
                onSubmit={handleSubmit}
                initialValues={form}
            />
        </>
    )
}


