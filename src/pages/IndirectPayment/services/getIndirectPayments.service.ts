import API from "../../../lib/API";
import { IndirectPayment } from "../../../models";

export async function getIndirectPaymentsService() {
    const url = "/indirect-payment";
    const res = await API.get<IndirectPayment[]>({ url });
    return res;
}