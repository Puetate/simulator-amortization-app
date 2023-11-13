import API from "../../../lib/API";
import { CreditType } from "../../../models";

const URL = "/credit-type"
export async function editCreditTypeService(id: string, creditType: CreditType) {
    const url = `${URL}/${id}`;
    const res = await API.patch<CreditType>({ url, data: creditType })
    return res
} 