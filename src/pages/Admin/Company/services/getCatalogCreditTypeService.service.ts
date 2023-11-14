import API from "../../../../lib/API";
import { Catalog } from "../../../Register/components/FormRegister";




const URL = "/credit-type"
export async function getCatalogCreditTypeService() {
    const res = await API.get<Catalog[]>({ url: URL });
    if (res.error || res.data === null) return
    return res;
}