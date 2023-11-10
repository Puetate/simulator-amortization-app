import { useEffect } from "react";
import FormRegister from "./components/FormRegister";

function Register() {
    useEffect(() => {
        document.title = "Registro";
    }, []);
    return (
        <FormRegister />
    );
}

export default Register;
