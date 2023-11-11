import { useEffect } from "react";
import FormRegister from "./components/FormRegister";

function Register() {
    useEffect(() => {
        document.title = "Registro";
    }, []);
    return (

        <div className="flex items-center justify-center h-screen">
            <FormRegister />
        </div>
    );
}

export default Register;
