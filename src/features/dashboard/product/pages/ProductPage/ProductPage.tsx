import { useState } from "react";
import styles from "./styles.module.css";
import { useFetch } from "@/api/useFetch";
import { Pagination } from "@/components/Pagination/Pagination";
import { productService } from "../../product.service";
import ProductTable from "../../components/ProductTable/ProductTable";
import { DataToolbar } from "@/components/DataToolBar/DataToolBar";
import { CategorySelect } from "@/features/dashboard/category";
import type { ProductFilterRequest } from "../../types";
import Button from "@/components/Button/Button";
import { Plus } from "lucide-react";
import { Link } from 'react-router-dom';
import { routes } from "@/constants/routes";
import { ConfirmDialog } from "@/components/ConfirmDialog/ConfirmDialog";
import { toast } from "sonner";
import type { ApiErrorResponse } from "@/api/types";
import { DebounceInput } from "@/components/DebounceInput";


const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 8;
const SORT_OPTIONS = [
    {
        label: "Newest",
        value: "-createdAt",
    },
    {
        label: "Oldest",
        value: "createdAt",
    },
    {
        label: "Price (asc)",
        value: "price",
    },
    {
        label: "Price (desc)",
        value: "-price",
    },
    {
        label: "Name (asc)",
        value: "name",
    },
    {
        label: "Name (desc)",
        value: "-name",
    },

]

export function ProductPage() {
    const [page, setPage] = useState(DEFAULT_PAGE);
    const [limit] = useState(DEFAULT_LIMIT);
    const [sort, setSort] = useState("-createdAt");
    const [filter, setFilter] = useState<ProductFilterRequest>({})
    const [confirm, setConfirm] = useState<unknown>(false);
    const [actionLoading, setActionLoading] = useState(false);
    const {
        loading,
        data,
        refetch,
        error,
    } = useFetch(
        ["product", page, limit, sort, filter],
        (signal) =>
            productService.findAll(
                { limit, page, sort },
                filter,
                signal,
            ),
    );




    function parsePrice(value: string): number | undefined {
        const v = value.trim();

        if (v === "") return undefined;

        const number = Number(v);

        if (Number.isNaN(number) || number < 0) return undefined;

        return number;
    }

    function handleMinPriceChange(value: string): void {
        const number = parsePrice(value);

        setFilter((prev) => ({
            ...prev,
            minPrice: number,
        }));
    }

    function handleMaxPriceChange(value: string): void {
        const number = parsePrice(value);
        if (number) {
            setPage(DEFAULT_PAGE)
        }
        setFilter((prev) => ({
            ...prev,
            maxPrice: number,
        }));
    }

    async function handleDelete() {
        setActionLoading(true)
        try {
            if (typeof confirm == 'string') await productService.delete(confirm)
            refetch()
            toast.success("Delete success !")

        } catch (e) {
            const error = e as ApiErrorResponse;
            toast.error(error.message)
        } finally {
            setActionLoading(false)
            setConfirm(false)
        }
    }

    return (
        <div className={styles.page}>
            <div className={styles.header}>
                <div>
                    <h1>Products</h1>

                    <p>
                        Manage your
                        products
                    </p>
                </div>
                <div>
                    <Button as={Link} to={routes.createProduct}> <Plus /> Create</Button>
                </div>
            </div>

            {error && (
                <p className={styles.error}>
                    {error.message}
                </p>
            )}


            <DataToolbar
                searchDebounce={500}
                search={filter.query}
                onSearch={(v) => {
                    setFilter({ ...filter, query: v })
                    setPage(DEFAULT_PAGE)
                }}
                sort={sort}
                onSort={setSort}
                left={
                    <>
                        <CategorySelect onValueChange={(v) => {
                            setFilter({ ...filter, categoryId: String(v) })
                            setPage(DEFAULT_PAGE)
                        }} />
                    </>
                }
                right={
                    <>
                        <DebounceInput
                            onValueChange={handleMinPriceChange}
                            type="number"
                            style={{ maxWidth: 128 }}
                            delay={500}
                            value={String(filter.minPrice)} placeholder="Min price"
                        />
                        <DebounceInput
                            onValueChange={handleMaxPriceChange}
                            style={{ maxWidth: 128 }}
                            type="number"
                            delay={500}
                            value={String(filter.maxPrice)} placeholder="Max price"
                        />
                    </>
                }

                sortOptions={SORT_OPTIONS}
            />


            <ProductTable items={data?.data ?? []} loading={loading} onDelete={(p) => setConfirm(p.id)} />

            <Pagination
                page={page}

                totalPages={
                    data?.pagination.totalPages ?? 1
                }
                onChange={setPage}
            />


            <ConfirmDialog
                open={confirm}
                variant="danger"
                title="Delete product"
                loading={actionLoading}
                description="This product will be permanently deleted."
                confirmText="Delete"
                onCancel={() =>
                    setConfirm(false)
                }
                onConfirm={handleDelete}
            />;
        </div>
    );
}