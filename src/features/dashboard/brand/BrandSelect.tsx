import { useFetch } from "@/api/useFetch";
import type { SelectProps } from "@/components/Select/Select";
import {
  useMemo,
} from "react";
import Select from "@/components/Select/Select";
import { brandService } from "./brand.service";



type Props = Omit<
  SelectProps,
  "options"
> & { allowedNull?: boolean }

export function BrandSelect({
  disabled,
  ...props
}: Props) {
  const {
    data,
    loading,
  } = useFetch(
    ["categories"],
    (signal) =>
      brandService.findAll(
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
    data?.data.map((brand) => ({
      label: brand.name,
      value: brand.id,
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