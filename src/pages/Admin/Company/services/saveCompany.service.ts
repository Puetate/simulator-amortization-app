import { Company } from "../../../../models";
import API from "../../../../lib/API";


const URL = "company"
export async function saveCompanyService(formData: FormData) {
    const res = await API.post<Company>({ url: URL, data: formData });
    return res;
}