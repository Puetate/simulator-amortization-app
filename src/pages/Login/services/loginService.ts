import API from "../../../lib/API";
import { User } from "../../../models";
import { Credentials } from "../components/FormLogin";



export interface UserAuthResponse {
    user: User;
    token: string;
}

const URL = "/auth/login";
export default async function loginService(credentials: Credentials) {
    const res = await API.post<UserAuthResponse>({ url: URL, data: credentials });
    return res;
}