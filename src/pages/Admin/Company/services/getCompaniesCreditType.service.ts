import API from "../../../../lib/API";
import { CompanyCreditsTableProps } from "../components/CompanyCreditTypeTable";


export async function getCompaniesCreditTypeService() {
    const url = "/company-credit-type/company";
    const res = await API.get<CompanyCreditsTableProps[]>({ url });
    return res;
}