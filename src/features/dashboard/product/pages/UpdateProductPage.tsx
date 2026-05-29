
import {
    useNavigate,
    useParams,
} from "react-router-dom";

import { toast } from "sonner";

import {
    ProductForm,
    type ProductFormType,
} from "../components/ProductForm/ProductForm";

import {
    productService,
} from "../product.service";



import {
    useIdempotencyKey,
} from "@/hooks/useIdempotencyKey";

import type {
    ApiErrorResponse,
} from "@/api/types";

import {
    ErrorCode,
} from "@/constants/error";
import { useFetch } from "@/api/useFetch";
import FormLoading from "../components/FormLoading/FormLoading";
import Empty from "@/components/DataTable/Empty";
import { DashboardPageHeader } from "@/components/DashboardPageHeader/DashboardPageHeader";


export function UpdateProductPage() {
    const { id } =
        useParams();

    const navigate =
        useNavigate();


    const {
        data,
        loading,
        error,
    } = useFetch(
        ["product", id],
        (signal) =>
            productService.findById(
                id!,
                signal,
            ),
    );

    async function handleSubmit({
        tags,
        ...rest
    }: ProductFormType): Promise<void> {
        if (!id) {
            return;
        }

        try {
            await productService.update(
                id,
                {
                    ...rest,

                    tags: tags
                        .split(",")
                        .map((t) =>
                            t.trim(),
                        )
                        .filter(Boolean),
                },
            );

            toast.success(
                "Update product success!",
            );

            navigate(-1);
        } catch (e) {
            const error =
                e as ApiErrorResponse;

            if (
                error.code ===
                ErrorCode.ValidationError
            ) {
                return;
            }

            toast.error(
                error.message,
            );
        }
    }

    if (loading) {
        return <FormLoading />;
    }

    if (error || !data) {
        return (
            <Empty />
        );
    }


    return (
        <>

            <DashboardPageHeader
                title="Edit Product"
                description="Manage product details, pricing."
            />
            <ProductForm
                initialValues={{
                    sku: data.sku ?? "",

                    slug: data.slug ?? "",

                    name: data.name,

                    description:
                        data.description ??
                        "",

                    price: data.price,

                    originalPrice:
                        data.originalPrice,

                    discountPercent:
                        data.discountPercent,

                    currency: "USD",

                    isAvailable:
                        data.isAvailable ??
                        true,

                    thumbnail:
                        data.thumbnail,

                    images:
                        data.images ?? [],

                    categoryId:
                        data.categoryId ??
                        "",

                    brandId:
                        data.brandId ?? "",

                    tags:
                        data.tags?.join(
                            ", ",
                        ) ?? "",
                }}
                onSubmit={handleSubmit}
            />
        </>
    );
}