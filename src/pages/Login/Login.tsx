import { useEffect } from "react";
import { FormLogin } from "./components";

export default function Login() {
    useEffect(() => {
        console.log("Login component mounted");
        document.title = "Login";
    }, []);
    return (
        <div className="flex items-center justify-center h-screen">
            <FormLogin />
        </div>
    );
}
