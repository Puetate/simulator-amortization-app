import API from "../../../lib/API";
import { IndirectPayment } from "../../../models";

const URL = "/indirect-payment";
export async function saveIndirectPaymentService(indirectPayment: IndirectPayment) {
  const res = await API.post<IndirectPayment>({ url: URL, data: indirectPayment });
  return res;
}
