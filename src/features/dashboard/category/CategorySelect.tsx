import { useFetch } from "@/api/useFetch";
import type { SelectProps } from "@/components/Select/Select";
import {
  useMemo,
} from "react";
import { categoryService } from "./category.service";
import Select from "@/components/Select/Select";



type Props = Omit<
  SelectProps,
  "options"
> & { allowedNull?: boolean }

export function CategorySelect({
  disabled,
  ...props
}: Props) {
  const {
    data,
    loading,
  } = useFetch(
    ["categories"],
    (signal) =>
      categoryService.findAll(
        {
          limit: 50,
          sort: "createdAt",
          page: 1
        },
        signal,
      ),
  );

const options = useMemo(() => {
  const items =
    data?.data.map((category) => ({
      label: category.name,
      value: category.id,
    })) ?? [];

  return [
    {
      label: "None",
      value: "",
    },
    ...items,
  ];
}, [data]);

  return (
    <Select
      {...props}
      disabled={
        disabled || loading
      }
      options={options}
    />
  );
}