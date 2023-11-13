import API from "../../../lib/API";
import { CreditType_InterestPayment } from "../../../models/creditTypeIndirectPayment.model";

export async function getCreditsTypeIndirectPaymentService() {
    const url = "/credit-type-indirect-payment/all-with-indirect-payment";
    const res = await API.get<CreditType_InterestPayment[]>({ url });
    return res;
}