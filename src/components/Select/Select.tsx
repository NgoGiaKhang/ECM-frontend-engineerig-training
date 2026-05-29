// components/Select/Select.tsx

import { ChevronDown } from "lucide-react";
import {
    forwardRef,
    type ChangeEvent,
    type SelectHTMLAttributes,
    type ForwardedRef,
    type ReactElement,
} from "react";
import styles from "./styles.module.css";

export type SelectValue = string | number;

export type SelectOption<TValue extends SelectValue = string> = {
    label: string;
    value: TValue;
    disabled?: boolean;
};

type SelectSize = "sm" | "md" | "lg";

type SelectVariant = "default" | "error";

export type SelectProps<TValue extends SelectValue = string> =
    Omit<SelectHTMLAttributes<HTMLSelectElement>, "size"> & {
        label?: string;
        hint?: string;
        error?: string;
        options: SelectOption<TValue>[];
        placeholder?: string;
        fullWidth?: boolean;
        size?: SelectSize;
        variant?: SelectVariant;
        onValueChange?: (value: TValue) => void;
    };

function SelectComponent<TValue extends SelectValue = string>(
    {
        label,
        hint,
        error,
        options,
        placeholder,
        fullWidth = false,
        size = "md",
        variant = "default",
        className,
        disabled,
        onChange,
        onValueChange,
        ...props
    }: SelectProps<TValue>,
    ref: ForwardedRef<HTMLSelectElement>,
) {
    const hasError = !!error || variant === "error";

    return (
        <div className={`${styles.group} ${fullWidth ? styles.full : ""}`}>
            {label && (
                <label className={styles.label}>
                    {label}
                </label>
            )}

            <div
                className={`${styles.wrapper} ${styles[size]} ${
                    hasError ? styles.error : ""
                } ${disabled ? styles.disabled : ""}`}
            >
                <select
                    {...props}
                    ref={ref}
                    disabled={disabled}
                    className={`${styles.select} ${className ?? ""}`}
                    onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                        onChange?.(e);
                        // Safely cast or parse back to expected generic type
                        onValueChange?.(e.target.value as TValue);
                    }}
                >
                    {placeholder && (
                        <option value="">
                            {placeholder}
                        </option>
                    )}

                    {options.map((option) => (
                        <option
                            key={option.value}
                            value={option.value}
                            disabled={option.disabled}
                        >
                            {option.label}
                        </option>
                    ))}
                </select>

                <ChevronDown
                    size={18}
                    className={styles.icon}
                />
            </div>

            {error ? (
                <p className={styles.message}>
                    {error}
                </p>
            ) : hint ? (
                <p className={styles.hint}>
                    {hint}
                </p>
            ) : null}
        </div>
    );
}

// Fixed generic forwardRef casting
const Select = forwardRef(SelectComponent) as <
    TValue extends SelectValue = string,
>(
    props: SelectProps<TValue> & { ref?: ForwardedRef<HTMLSelectElement> },
) => ReactElement;

export default Select;