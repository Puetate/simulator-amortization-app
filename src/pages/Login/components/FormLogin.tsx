import { Box, Button, Text,TextInput } from "@mantine/core";
import logo from "../../../assets/logo.png";
import { Link } from "react-router-dom";
import { PublicRoutes } from "../../../models/routes";
import { useSessionStore } from "../../../store";
import * as Yup from "yup";
import { useForm, yupResolver } from "@mantine/form";
import loginService from "../services/loginService";
import { useState } from "react";

export interface Credentials {
    email: string;
    password: string;
}

const initialValues: Credentials = {
    email: "",
    password: "",
};

const validationSchema = Yup.object<Credentials>().shape({
    email: Yup.string().required().email("Correo invalido"),
    password: Yup.string()
        .required()
        .min(6, "La contraseña debe ser como mínimo de 6 caracteres"),
});

export default function FormLogin() {
    const [loading, setLoading] = useState(false);
    const { setUser, setToken } = useSessionStore();


    const form = useForm({
        initialValues,
        validate: yupResolver(validationSchema),
    });


    const handleSubmit = async (credentials: Credentials) => {
        const res = await loginService(credentials);
        if (res.error || res == null) return setLoading(false);
        
            setUser(res.user);
            setToken(res.token);
        }
   



    return (
        <>
            <Box className="bg-white flex items-center justify-center h-full w-1/3 mx-auto">
                <div className="sm:mx-auto sm:w-96 sm:max-w-full">
                    <div className="sm:mx-auto sm:w-96 sm:max-w-full">
                        <img className="mx-auto h-55 w-40" src={logo} alt="Your Company" />
                        <Text className="text-center text-2xl font-bold leading-9 tracking-tight text-blue-800">
                            Sistema de Amortización
                        </Text>
                    </div>

                    <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
                        <form className="space-y-6">
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                > Correo Electrónico
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        required
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div>
                                <div className="flex items-center justify-between">
                                    <label
                                        htmlFor="password"
                                        className="block text-sm font-medium leading-6 text-gray-900"
                                    >
                                        Contraseña
                                    </label>
                                </div>
                                <div className="mt-2">
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        autoComplete="current-password"
                                        required
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                            <div>
                                <Button
                                    type="submit"
                                    className="flex w-full justify-center rounded-md bg-blue-800 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Ingresar
                                </Button>
                            </div>
                        </form>

                        <p className="mt-10 text-center text-sm text-gray-500">
                            No tienes una cuenta?{" "}
                            <Link
                                to={PublicRoutes.register}
                                className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                            > Registrate Aquí!
                            </Link>
                        </p>
                    </div>
                </div>
            </Box>
        </>
    );
}