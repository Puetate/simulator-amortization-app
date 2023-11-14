import API from "../../../../lib/API";
import { Company } from "../../../../models";

const URL = "/company"
export async function editCompanyService(id: string,formData: FormData) {
    const url = `${URL}/${id}`;
    const res = await API.patch<Company>({ url, data: formData });
    return res
} 