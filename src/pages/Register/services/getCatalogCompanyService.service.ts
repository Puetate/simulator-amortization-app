import API from "../../../lib/API";
import { Catalog } from "../components/FormRegister";


const URL = "/company/combo"
export async function getCatalogCompanyService() {
    const res = await API.get<Catalog[]>({ url: URL });
    if (res.error || res.data === null) return
    return res;
}