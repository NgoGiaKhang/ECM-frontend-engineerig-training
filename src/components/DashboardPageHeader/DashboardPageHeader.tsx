import type {
    ReactNode,
} from "react";

import styles from "./styles.module.css";

type Props = {
    title: string;

    description?: string;

    icon?: ReactNode;

    actions?: ReactNode;
};

export function DashboardPageHeader({
    title,

    description,

    icon,

    actions,
}: Props) {
    return (
        <div className={styles.header}>
            <div className={styles.left}>
                {icon && (
                    <div
                        className={styles.icon}
                    >
                        {icon}
                    </div>
                )}

                <div>
                    <h1
                        className={styles.title}
                    >
                        {title}
                    </h1>

                    {description && (
                        <p
                            className={
                                styles.description
                            }
                        >
                            {description}
                        </p>
                    )}
                </div>
            </div>

            {actions && (
                <div
                    className={
                        styles.actions
                    }
                >
                    {actions}
                </div>
            )}
        </div>
    );
}