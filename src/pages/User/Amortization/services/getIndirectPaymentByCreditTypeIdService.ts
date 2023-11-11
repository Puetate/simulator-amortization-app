import API from "../../../../lib/API";
import { CreditType, IndirectPayment } from "../../../../models";

export interface CreditTypeIndirectPayments {
  creditType: CreditType;
  indirectPayments: IndirectPayment[];
}

const URL = "/api/credit-type-indirect-payment/credit-type";

export async function getIndirectPaymentByCreditTypeIdService(
  creditTypeId: string
) {
  const url = `${URL}/${creditTypeId}`;
  const res = await API.get<CreditTypeIndirectPayments>({ url });
  return res;
}
