import { Select } from "@mantine/core";
export default function Amortization() {
  return (
    <div>
      <Select
        label="Tipo de crédito"
        defaultValue="1"
        data={[
          { label: "Quirografario", value: "1" },
          { label: "Hipotecario", value: "2" },
          { label: "Prendario", value: "3" },
        ]}
      />
    </div>
  );
}
