import { Company } from "../../../../models";
import API from "../../../../lib/API";


export async function getCompaniesService() {
    const url = "/company";
    const res = await API.get<Company[]>({ url });
    return res;
}