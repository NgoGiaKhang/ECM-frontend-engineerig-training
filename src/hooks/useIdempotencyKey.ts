import { useRef } from "react";

function generateIdempotencyKey(): string {
  return crypto.randomUUID();
}

export function useIdempotencyKey() {
  const keyRef = useRef<string>(generateIdempotencyKey());

  const refresh = (): string => {
    const next = generateIdempotencyKey();

    keyRef.current = next;

    return next;
  };

  return {
    key: keyRef.current,
    refresh,
  };
}
