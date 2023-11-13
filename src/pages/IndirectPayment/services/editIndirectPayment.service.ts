import API from "../../../lib/API";
import { IndirectPayment } from "../../../models";

const URL = "/indirect-payment"
export async function editIndirectPaymentService(id: string, indirectPayment: IndirectPayment) {
    const url = `${URL}/${id}`;
    const res = await API.patch<IndirectPayment>({ url, data: indirectPayment })
    return res
} 