import { Company } from "../../../../models";
import API from "../../../../lib/API";


const URL = "company"
export async function saveCompanyService(company: Company) {
    
    const res = await API.post<Company>({ url: URL, data: company });
    return res;
}