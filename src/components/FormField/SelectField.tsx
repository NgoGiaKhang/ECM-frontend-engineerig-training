import { useFormContext } from "@/core/Form/FormContext";
import type { SelectProps, SelectValue } from "../Select/Select";
import Select from "../Select/Select";
import styles from "./styles.module.css"
type SelectComponentProps<TValue extends SelectValue = string> =
    SelectProps<TValue>;

type SelectFieldProps<
    T extends Record<string, unknown> = Record<string, unknown>,
    TValue extends SelectValue = string,
> = Omit<SelectProps<TValue>, "value" | "onValueChange"> & {
    label?: string;
    name: keyof T;
    component?: React.ComponentType<SelectComponentProps<TValue>>;
};

export default function SelectField<
    T extends Record<string, unknown> = Record<string, unknown>,
    TValue extends SelectValue = string,
>({
    label,
    name,
    options,
    component: Component = Select,
    ...props
}: SelectFieldProps<T, TValue>) {
    const {
        form,
        touched,
        errors,
        handleBlur,
        handleChange,
        handleFocus,
        isSubmitting,
    } = useFormContext<T>();

    const isError = touched[name] && errors[name];

    const value = form[name] as TValue;

    return (
        <div
            className={`${styles.group} ${isError ? styles.error : ""
                } ${props.fullWidth ? styles.fullWidth : ""}`}
        >
            {label && <label htmlFor={props.id}>{label}</label>}

            <Component
                {...props}
                name={String(name)}
                value={value}
                disabled={props.disabled || isSubmitting}
                options={options}
                onValueChange={(val) => {
                    handleChange({
                        target: {
                            name: String(name),
                            value: val,
                        },
                    } as any);
                }}
                onBlur={(e) => {
                    handleBlur(e);
                    props.onBlur?.(e);
                }}
                onFocus={(e) => {
                    handleFocus(e);
                    props.onFocus?.(e);
                }}
            />

            {isError && (
                <span className={styles.errorText}>
                    {String(errors[name])}
                </span>
            )}
        </div>
    );
}