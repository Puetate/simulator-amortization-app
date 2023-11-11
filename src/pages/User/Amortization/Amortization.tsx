import { Button, NumberInput, Radio, Select, Text } from "@mantine/core";
import { useEffect, useState } from "react";
import { cn } from "../../../utils";
import {
  Credits,
  getCreditTypesService,
} from "./services/getCreditTypeService";
import {
  CreditTypeIndirectPayments,
  getIndirectPaymentByCreditTypeIdService,
} from "./services/getIndirectPaymentByCreditTypeIdService";

const creditInitialValue: CreditTypeIndirectPayments = {
  creditType: {
    _id: "",
    name: "",
    interestRate: 0,
    maxTime: 0,
    minTime: 0,
  },
  indirectPayments: [],
};

export default function Amortization() {
  const [credits, setCredits] = useState<Credits[]>([]);
  const [balance, setBalance] = useState<number>(0);
  const [months, setMonths] = useState<number>(0);
  const [amortization, setAmortization] = useState<string>("alemana");
  const [creditTypeIndirectPayments, setCreditTypeIndirectPayments] =
    useState<CreditTypeIndirectPayments>(creditInitialValue);

  const [loadingCreditType, setLoadingCreditType] = useState<boolean>(false);

  const onCreditTypeChange = async (amortization: string | null) => {
    if (!amortization) return;
    setLoadingCreditType(true);
    const res = await getIndirectPaymentByCreditTypeIdService(amortization);
    setCreditTypeIndirectPayments(res);
    setMonths(res.creditType.minTime);
    setLoadingCreditType(false);
  };

  const generateAmortizationTable = () => {
    const { creditType } = creditTypeIndirectPayments;
    const interest = (balance * (creditType.interestRate / 100)) / 12;
    return (
      <tbody>
        <tr>
          <td className="border border-black">1</td>
        </tr>
      </tbody>
    );
  };

  useEffect(() => {
    getCreditTypesService().then((response) => {
      setCredits(response);
    });
  }, []);

  useEffect(() => {
    getCreditTypesService().then((response) => {
      setCredits(response);
    });
  }, [creditTypeIndirectPayments.creditType?._id]);

  return (
    <div>
      <div className="flex gap-5 items-center">
        <Select
          className="flex-[0.4]"
          label="Tipo de crédito"
          placeholder="Seleccione un tipo de crédito"
          onChange={onCreditTypeChange}
          disabled={loadingCreditType}
          data={credits}
        />
        <Radio.Group
          label="Amortización"
          value={amortization}
          onChange={setAmortization}
        >
          <div className="flex gap-2">
            <Radio
              disabled={loadingCreditType}
              checked
              label="Francesa"
              value="francesa"
            />
            <Radio
              disabled={loadingCreditType}
              label="Alemana"
              value="alemana"
            />
          </div>
        </Radio.Group>
        {creditTypeIndirectPayments.creditType?._id === "" ? (
          ""
        ) : (
          <>
            <NumberInput
              min={creditTypeIndirectPayments.creditType.minTime}
              max={creditTypeIndirectPayments.creditType.maxTime}
              value={months}
              label={`Meses (${creditTypeIndirectPayments.creditType.minTime} - ${creditTypeIndirectPayments.creditType.maxTime})`}
              onChange={(value) => setMonths(+value)}
              placeholder="5"
              disabled={loadingCreditType}
            />
            <NumberInput
              min={0}
              label="Saldo"
              onChange={(value) => setBalance(+value)}
              placeholder="1000"
              value={balance}
              disabled={loadingCreditType}
            />
          </>
        )}
        <Button>Calcular</Button>
      </div>
      {loadingCreditType && <div>Cargando...</div>}
      <div
        className={cn(
          `flex flex-col gap-4 ${
            creditTypeIndirectPayments.creditType?._id === "" ||
            loadingCreditType
              ? "hidden"
              : ""
          }`
        )}
      >
        <Text className="text-center">
          {creditTypeIndirectPayments.creditType?._id === ""
            ? "Ningún crédito seleccionado"
            : `Crédito ${creditTypeIndirectPayments.creditType?.name} seleccionado`}
        </Text>
        <div className="flex gap-3 justify-center">
          <Text>
            <span className="font-bold">Crédito: </span>
            {creditTypeIndirectPayments.creditType.name}
          </Text>
          <Text>
            <span className="font-bold">Tiempo mínimo: </span>
            {creditTypeIndirectPayments.creditType.minTime}
          </Text>
          <Text>
            <span className="font-bold">Tiempo máximo: </span>
            {`${creditTypeIndirectPayments.creditType.maxTime} meses`}
          </Text>
          <Text>
            <span className="font-bold"> Tasa de interés: </span>
            {`${creditTypeIndirectPayments.creditType.interestRate} meses`}
          </Text>
        </div>
      </div>
      <div>
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="border border-black">Nro</th>
              <th className="border border-black">Cuota</th>
              <th className="border border-black">Capital</th>
              <th className="border border-black">Saldo</th>
            </tr>
          </thead>
        </table>
      </div>
    </div>
  );
}
