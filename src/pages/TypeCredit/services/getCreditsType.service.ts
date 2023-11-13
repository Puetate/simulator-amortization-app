import API from "../../../lib/API";
import { CreditType } from "../../../models";

export async function getCreditsTypeService() {
    const url = "/credit-type";
    const res = await API.get<CreditType[]>({ url });
    return res;
}