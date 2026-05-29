// DashboardSidebar.tsx

import {
    LayoutDashboard,
    ShoppingBag,
    Package,
    Users,
    Settings,
    LogOut,
    X,
} from "lucide-react";

import { NavLink, useLocation, useNavigation } from "react-router-dom";

import { routes } from "../../constants/routes";

import styles from "./styles.module.css";

type Props = {
    open?: boolean;
    onClose?: () => void;
};

const menu = [
    {
        label: "Dashboard",
        icon: LayoutDashboard,
        to: routes.dashboard,
    },
    {
        label: "Products",
        icon: Package,
        to: routes.manageProducts,
    },
    {
        label: "Users",
        icon: Users,
        to: "/users",
    },
];

export const DashboardSidebar = ({
    open = true,
    onClose,
}: Props) => {

    return (
        <>


            <aside
                className={`${styles.sidebar} ${open ? styles.open : ""
                    }`}
            >
                {/* header */}
                <div className={styles.header}>
                    <h2 className={styles.logo}>
                        Admin<span>Panel</span>
                    </h2>

                    <button
                        className={styles.close}
                        onClick={onClose}
                    >
                        <X size={18} />
                    </button>
                </div>

                {/* menu */}
                <nav className={styles.nav}>
                    {menu.map((item) => {
                        const Icon = item.icon;

                        return (
                            <NavLink
                                key={item.to}
                                to={item.to}
                                className={({ isActive }) =>
                                    `${styles.link} ${isActive
                                        ? styles.active
                                        : ""
                                    }`
                                }
                            >
                                <Icon size={18} />

                                <span>{item.label}</span>
                            </NavLink>
                        );
                    })}
                </nav>

                {/* footer */}
                <div className={styles.footer}>
                    <button className={styles.logout}>
                        <LogOut size={18} />

                        <span>Logout</span>
                    </button>
                </div>
            </aside>
        </>
    );
}