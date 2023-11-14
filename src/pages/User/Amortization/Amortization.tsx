import { ActionIcon, Button, Loader, NumberInput, Radio, Select, Text } from "@mantine/core";
import { IconFileTypePdf } from "@tabler/icons-react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { useEffect, useRef, useState } from "react";
import { CreditType, IndirectPayment } from "../../../models";
import { useSessionStore } from "../../../store";
import { cn, truncateToDecimals } from "../../../utils";
import IndirectPaymentsInfo from "./components/IndirectPaymentsInfo";
import Item from "./components/Item";
import { Credits, getCreditTypesByCompanyId } from "./services/getCreditTypeService";
import { getIndirectPaymentByCreditTypeIdService } from "./services/getIndirectPaymentByCreditTypeIdService";

const creditTypeInitialValue: CreditType = {
  _id: "",
  name: "",
  interestRate: 0,
  maxTime: 0,
  minTime: 0
};

export default function Amortization() {
  const { user } = useSessionStore();
  const [credits, setCredits] = useState<Credits[]>([]);
  const [balance, setBalance] = useState<number>(0);
  const [months, setMonths] = useState<number>(0);
  const [amortization, setAmortization] = useState<string>("alemana");
  const [creditType, setCreditType] = useState<CreditType>(creditTypeInitialValue);
  const [indirectPayments, setIndirectPayments] = useState<IndirectPayment[]>([]);
  const [amortizationTBody, setAmortizationTBody] = useState<JSX.Element | null>(null);

  const [loadingCreditType, setLoadingCreditType] = useState<boolean>(false);

  const pdfRef = useRef(null);

  const onCreditTypeChange = async (amortization: string | null) => {
    if (!amortization) return;
    setLoadingCreditType(true);
    const res = await getIndirectPaymentByCreditTypeIdService(amortization);
    setCreditType(res.data!.creditType);
    setIndirectPayments(res.data!.indirectPayments ?? []);
    setMonths(res.data!.creditType.minTime);
    setAmortizationTBody(null);
    setLoadingCreditType(false);
  };

  const handleExportPDF = () => {
    if (!pdfRef.current) return;
    const orientation = "landscape"; // Orientación "portrait" para vertical, "landscape" para horizontal
    const doc = new jsPDF({ orientation });
    autoTable(doc, { html: pdfRef.current });
    doc.save("table.pdf");
  };

  const generateAmortizationTBody = () => {
    let currentBalance = balance;
    const monthlyInterest = creditType.interestRate / 100 / 12;
    return (
      <tbody className="w-full">
        {Array.from({ length: months + 1 }).map((_, index) => {
          const interest = (currentBalance * (creditType.interestRate / 100)) / 12;
          let capital = 0;
          let quota = 0;
          if (amortization === "alemana" && index !== 0) {
            capital = balance / months;
            quota = interest + capital;
          } else if (amortization === "francesa" && index !== 0) {
            quota = balance * (monthlyInterest / (1 - (1 + monthlyInterest) ** -months));
            capital = quota - interest;
          }
          currentBalance -= capital;
          const row = (
            <tr key={index}>
              <td className="border border-black">{index}</td>
              <td className="border border-black">{index === 0 ? "-" : truncateToDecimals(quota, 2)}</td>
              <td className="border border-black">{index === 0 ? "-" : truncateToDecimals(interest, 2)}</td>
              <td className="border border-black">{index === 0 ? "-" : truncateToDecimals(capital, 2)}</td>
              <td className="border border-black">{truncateToDecimals(currentBalance, 2)}</td>
              {indirectPayments.map((indirectPayment) => (
                <th key={indirectPayment.name} className="border border-black">
                  {index === 0 ? "-" : truncateToDecimals(quota + indirectPayment.mount / months, 2)}
                </th>
              ))}
            </tr>
          );
          return row;
        })}
      </tbody>
    );
  };

  useEffect(() => {
    getCreditTypesByCompanyId(user.company._id).then((response) => {
      setCredits(response.data!);
    });
  }, [user.company._id]);

  return (
    <div>
      <div className="flex items-end gap-5">
        <Select
          label="Tipo de crédito"
          placeholder="Seleccione un tipo de crédito"
          onChange={onCreditTypeChange}
          disabled={loadingCreditType}
          data={credits}
          classNames={{ input: "border border-blue-800" }}
        />
        <Radio.Group
          className="self-center"
          label="Amortización"
          value={amortization}
          onChange={setAmortization}
        >
          <div className="flex gap-2">
            <Radio
              classNames={{ radio: "border border-blue-800" }}
              disabled={loadingCreditType || creditType?._id === ""}
              checked
              label="Francesa"
              value="francesa"
            />
            <Radio
              classNames={{ radio: "border border-blue-800" }}
              disabled={loadingCreditType || creditType?._id === ""}
              label="Alemana"
              value="alemana"
            />
          </div>
        </Radio.Group>
        {creditType?._id === "" ? (
          ""
        ) : (
          <>
            <NumberInput
              min={creditType.minTime}
              max={creditType.maxTime}
              value={months}
              label={`Meses (${creditType.minTime} - ${creditType.maxTime})`}
              classNames={{ input: "border border-blue-800" }}
              onChange={(value) => setMonths(+value)}
              placeholder="5"
              disabled={loadingCreditType}
            />
            <NumberInput
              min={0}
              label="Saldo"
              onChange={(value) => setBalance(+value)}
              classNames={{ input: "border border-blue-800" }}
              placeholder="1000"
              value={balance}
              disabled={loadingCreditType}
            />
          </>
        )}
        <Button
          className="bg-blue-800"
          size="md"
          disabled={creditType?._id === "" || loadingCreditType || balance === 0}
          onClick={() => setAmortizationTBody(generateAmortizationTBody())}
        >
          Generar
        </Button>
        <ActionIcon
          className="bg-red-700"
          size="xl"
          disabled={creditType?._id === "" || loadingCreditType || balance === 0}
          onClick={() => handleExportPDF()}
        >
          <IconFileTypePdf />
        </ActionIcon>
      </div>
      {loadingCreditType && (
        <div className="flex justify-center py-7">
          <Loader color="blue" />
        </div>
      )}
      <div
        className={cn(
          `mt-4 flex flex-col gap-4 ${creditType?._id === "" || loadingCreditType ? "hidden" : ""}`
        )}
      >
        <Text className="text-center font-bold ">
          {creditType?._id === ""
            ? "Ningún crédito seleccionado"
            : `Crédito ${creditType?.name} seleccionado`}
        </Text>
        <div className="flex flex-col gap-1">
          <div className="flex justify-center gap-3">
            <Item label="Tiempo mínimo: " value={`${creditType.minTime} meses`} />
            <Item label="Tiempo máximo: " value={`${creditType.maxTime} meses`} />
            <Item label="Tasa de interés: " value={`${creditType.interestRate}%`} />
          </div>
          <IndirectPaymentsInfo indirectPayments={indirectPayments} months={months} />
        </div>
      </div>
      <div>
        <table ref={pdfRef} style={{ width: "100%" }} className="mt-3 w-full" id="#my-table">
          <thead>
            <tr className="bg-blue-800 text-white">
              <th className="border border-black">Nro</th>
              <th className="border border-black">Interés</th>
              <th className="border border-black">Cuota</th>
              <th className="border border-black">Capital</th>
              <th className="border border-black">Saldo</th>
              {indirectPayments.map((indirectPayment) => (
                <th key={indirectPayment.name} className="border border-black">
                  Cuota incluido {indirectPayment.name.toLowerCase()}
                </th>
              ))}
            </tr>
          </thead>
          {amortizationTBody}
        </table>
      </div>
    </div>
  );
}
