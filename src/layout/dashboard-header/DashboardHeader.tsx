// DashboardHeader.tsx

import {
    Menu,
    Search,
    Bell,
    User,
} from "lucide-react";

import { Link } from "react-router-dom";

import styles from "./styles.module.css";

type Props = {
    onToggleSidebar?: () => void;
};

export const DashboardHeader = (_props: Props) => {
    return (
        <header className={styles.header}>

            {/* SEARCH */}
            <div className={styles.search}>
                <Search
                    size={16}
                    className={styles.searchIcon}
                />

                <input
                    className={styles.input}
                    placeholder="Search..."
                />
            </div>

            {/* ACTIONS */}
            <div className={styles.actions}>
                <button
                    className={styles.iconButton}
                >
                    <Bell size={18} />

                    <span
                        className={styles.badge}
                    >
                        3
                    </span>
                </button>

                <Link
                    to="/profile"
                    className={
                        styles.iconButton
                    }
                >
                    <User size={18} />
                </Link>
            </div>
        </header>
    );
}