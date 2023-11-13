import { CreditType } from "../../../models";
import API from "../../../lib/API";


const URL = "credit-type";
export async function saveTypeCreditService(creditType: CreditType) {
    const res = await API.post<CreditType>({ url: URL, data: creditType });
    return res;
}