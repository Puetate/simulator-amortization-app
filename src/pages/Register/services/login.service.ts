import API from "../../../lib/API";
import { User } from "../../../models";
import { AuthRegister } from "../components/FormRegister";

const URL = "/auth/register";

export async function registerService(authRegister: AuthRegister) {
    const res = await API.post<User>({ url: URL, data: authRegister });
    return res;
}