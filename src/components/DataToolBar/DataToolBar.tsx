import {
    Search,
    SlidersHorizontal,
    ArrowUpDown,
} from "lucide-react";

import {
    useEffect,
    useState,
    type ChangeEvent,
} from "react";

import { useDebounce } from "../../hooks/useDebounce";
import styles from "./styles.module.css";
import { TextInput } from "../TextInput/TextInput";
import Select from "../Select/Select";

type Option = {
    label: string;
    value: string;
};

type Props = {
    /* search */
    search?: string;
    searchPlaceholder?: string;
    searchDebounce?: number;
    onSearch?: (value: string) => void;

    /* filter */
    filter?: string;
    filterOptions?: Option[];
    onFilter?: (value: string) => void;

    /* sort */
    sort?: string;
    sortOptions?: Option[];
    onSort?: (value: string) => void;

    /* slots */
    left?: React.ReactNode;
    right?: React.ReactNode;
};

export function DataToolbar({
    search = "",
    searchPlaceholder = "Search...",
    searchDebounce = 500,
    onSearch,

    filter,
    filterOptions = [],
    onFilter,

    sort,
    sortOptions = [],
    onSort,

    left,
    right,
}: Props) {
    const [searchValue, setSearchValue] = useState(search);

    const debouncedSearch = useDebounce(searchValue, searchDebounce);

    /* sync external -> internal */
    useEffect(() => {
        setSearchValue(search);
    }, [search]);

    /* debounce search emit */
    useEffect(() => {
        if (!onSearch) return;
        onSearch(debouncedSearch.trim());
    }, [debouncedSearch]);

    return (
        <div className={styles.bar}>
            <div className={styles.left}>
                {left}

                {/* SEARCH */}
                {onSearch && (
                    <div className={styles.search}>
                        <Search size={16} className={styles.searchIcon} />

                        <TextInput
                            value={searchValue}
                            placeholder={searchPlaceholder}
                            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                setSearchValue(e.target.value)
                            }
                        />
                    </div>
                )}



                {/* SORT */}
                {sortOptions.length > 0 && (

                    <Select options={sortOptions} onValueChange={onSort} value={sort}/>

                )}
            </div>

            {right && <div className={styles.right}>{right}</div>}
        </div>
    );
}