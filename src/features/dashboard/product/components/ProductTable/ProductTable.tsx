// ProductTable.tsx

import { useMemo } from "react";

import { Link } from "react-router-dom";



import styles from "./styles.module.css";
import type { Product } from "../../types";
import { DataTable, type Column } from "@/components/DataTable/DataTable";
import IconButton from "@/components/IconButton/IconButton";
import { Delete, Edit, PackageSearch, Trash2 } from "lucide-react";
import { formatCurrency } from "@/utils/format";
import { routes } from "@/constants/routes";

type Props = {
    items: Product[];

    loading?: boolean;

    onDelete?: (
        product: Product,
    ) => void;
};


export default function ProductTable({
    items,
    loading,
    onDelete,
}: Props) {
    const columns = useMemo<
        Column<Product>[]
    >(
        () => [
            {
                key: "thumbnail",

                title: "Image",

                width: "90px",

                render: (_, row) => (
                    <img
                        src={row.thumbnail}
                        alt={row.name}
                        className={
                            styles.thumbnail
                        }
                    />
                ),
            },

            {
                key: "name",

                title: "Product",

                render: (_, row) => (
                    <div>
                        <strong>
                            {row.name}
                        </strong>

                        <p
                            className={
                                styles.sku
                            }
                        >
                            {row.sku}
                        </p>
                    </div>
                ),
            },

            {
                key: "brandName",

                title: "Brand",
            },

            {
                key: "price",

                title: "Price",

                render: (_, row) =>
                    formatCurrency(
                        row.price,
                        row.currency,
                    ),
            },

            {
                key: "stock",

                title: "Stock",

                align: "center",
            },

            {
                key: "rating",

                title: "Rating",

                align: "center",

                render: (value) =>
                    `${value} ⭐`,
            },

            {
                key: "actions",

                title: "Actions",

                width: "160px",

                align: "right",

                render: (_, row) => (
                    <div
                        className={
                            styles.actions
                        }
                    >
                        <IconButton
                            size="sm"
                            variant="default"
                            as={Link}
                            to={`${routes.manageProducts}/${row.id}/edit`}
                        >
                            <Edit />
                        </IconButton>

                        <IconButton
                            size="sm"
                            variant="danger"
                            onClick={() =>
                                onDelete?.(row)
                            }
                        >
                            <Trash2 />
                        </IconButton>
                    </div>
                ),
            },
        ],
        [onDelete],
    );

    return (
        <DataTable<Product>

            rowKey="id"
            data={items}
            columns={columns}
            loading={loading}
            emptyProps={
                {
                    icon:
                        <PackageSearch
                            size={48}
                        />,
                    title: "No products found",
                    description: "Try adjusting your search or filters."
                }
            }
        />
    );
}