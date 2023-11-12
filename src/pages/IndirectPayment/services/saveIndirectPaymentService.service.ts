import API from "../../../lib/API";
import { IndirectPayment } from "../../../models";

const URL = "api/indirect-payment"
export async function saveIndirectPaymentService(indirectPayment: IndirectPayment) {
    console.log(indirectPayment);
    
    const res = await API.post<IndirectPayment>({ url: URL, data: indirectPayment });
    return res;
}