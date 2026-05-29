import { useState, useEffect } from "react";
import { TextInput } from "./TextInput/TextInput";




type Props = {
    value?: string;
    delay?: number;
    onValueChange: (
        value: string,
    ) => void;
} & React.ComponentProps<
    typeof TextInput
>;

export function DebounceInput({
    value,
    delay = 500,
    onValueChange,
    ...props
}: Props) {
    const [innerValue, setInnerValue] =
        useState<string>(value ?? "");

    useEffect(() => {
        setInnerValue(value ?? "");
    }, [value]);

    useEffect(() => {
        const id = setTimeout(() => {
            onValueChange(
                innerValue,
            );
        }, delay);

        return () =>
            clearTimeout(id);
    }, [innerValue, delay, onValueChange]);

    return (
        <TextInput
            {...props}
            value={innerValue}
            onChange={(e) =>
                setInnerValue(
                    e.target.value,
                )
            }
        />
    );
}