// DataTable.tsx

import type {
    ReactNode,
} from "react";

import styles from "./styles.module.css";
import EmptyState, { type EmptyProps } from "./Empty";

export type Column<T> = {
    key: keyof T | string;

    title: ReactNode;

    width?: string;

    align?: "left" | "center" | "right";

    render?: (
        value: unknown,
        row: T,
        index: number,
    ) => ReactNode;
};

type DataTableProps<T> = {
    data: T[];

    columns: Column<T>[];

    rowKey: keyof T;

    loading?: boolean;

    emptyProps?: EmptyProps;
};

export const DataTable = <
    T extends Record<
        string,
        unknown
    >,
>({
    data,
    columns,
    rowKey,
    loading,
    emptyProps
}: DataTableProps<T>) => {
    if (loading) {
        return (
            <div className={styles.wrapper}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            {columns.map((column) => (
                                <th key={String(column.key)}>
                                    {column.title}
                                </th>
                            ))}
                        </tr>
                    </thead>

                    <tbody>
                        {Array.from({
                            length: 6,
                        }).map((_, index) => (
                            <tr key={index}>
                                {columns.map((column) => (
                                    <td
                                        key={String(
                                            column.key,
                                        )}
                                    >
                                        <div
                                            className={
                                                styles.skeleton
                                            }
                                        />
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }

    return (
        <div className={styles.wrapper}>
            <table className={styles.table}>
                <thead>
                    <tr>
                        {columns.map((column) => (
                            <th
                                key={String(
                                    column.key,
                                )}
                                style={{
                                    width:
                                        column.width,
                                    textAlign:
                                        column.align,
                                }}
                            >
                                {column.title}
                            </th>
                        ))}
                    </tr>
                </thead>

                <tbody>
                    {data.length === 0 ? (
                        <tr>
                            <td
                                colSpan={
                                    columns.length
                                }
                                className={
                                    styles.empty
                                }
                            >
                                {<EmptyState {...emptyProps} />}
                            </td>
                        </tr>
                    ) : (
                        data.map(
                            (row, index) => (
                                <tr
                                    key={String(
                                        row[rowKey],
                                    )}
                                >
                                    {columns.map(
                                        (
                                            column,
                                        ) => {
                                            const value =
                                                row[
                                                column.key as keyof T
                                                ];

                                            return (
                                                <td
                                                    key={String(
                                                        column.key,
                                                    )}
                                                    style={{
                                                        textAlign:
                                                            column.align,
                                                    }}
                                                >
                                                    {column.render
                                                        ? column.render(
                                                            value,
                                                            row,
                                                            index,
                                                        )
                                                        : String(
                                                            value ??
                                                            "",
                                                        )}
                                                </td>
                                            );
                                        },
                                    )}
                                </tr>
                            ),
                        )
                    )}
                </tbody>
            </table>
        </div>
    );
}