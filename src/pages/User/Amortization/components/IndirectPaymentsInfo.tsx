import { Text } from "@mantine/core";
import { IndirectPayment } from "../../../../models";
import { truncateToDecimals } from "../../../../utils";
import Item from "./Item";

type IndirectPaymentsInfoProps = { indirectPayments: IndirectPayment[]; months: number };

export default function IndirectPaymentsInfo(props: IndirectPaymentsInfoProps) {
  return (
    <>
      {props.indirectPayments.map((indirectPayment) => (
        <div key={indirectPayment.name} className="flex flex-col">
          <Text className="text-center font-bold">Pagos indirectos</Text>
          <div className="flex justify-center gap-3">
            <Item label="Tipo: " value={indirectPayment.name} />
            <Item label="Monto: " value={`$${indirectPayment.mount}`} />
            <Item
              label="Monto mensual: "
              value={`$${truncateToDecimals(indirectPayment.mount / props.months, 2)}`}
            />
          </div>
        </div>
      ))}
    </>
  );
}
