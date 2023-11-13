import { Box, Button, Text, TextInput, PasswordInput } from "@mantine/core";
import logo from "../../../assets/logo.png";
import { Link } from "react-router-dom";
import { AdminRoutes, AppRoutes, PublicRoutes, UserRoutes } from "../../../models/routes";
import { useSessionStore } from "../../../store";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useForm, yupResolver } from "@mantine/form";
import loginService from "../services/loginService";
import { useState } from "react";
import { UserRoles } from "../../../models";
import { CheckSession } from "../../../components";

export interface Credentials {
    email: string;
    password: string;
}

const defaultRoutes: Record<string, string> = {
    ADMIN: AdminRoutes.company,
    USER: UserRoutes.amortization
};

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
    const { setUser, setToken } = useSessionStore();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();



    const form = useForm({
        initialValues,
        validate: yupResolver(validationSchema),
    });


    const handleSubmit = async (credentials: Credentials) => {
        setLoading(true);
        const res = await loginService(credentials);
        if (res.error || res == null) return setLoading(false);
        const userRoles = res.data!.user.roles;
    
        if (!userRoles || userRoles.length === 0) {
            setLoading(false);
            return;
        }
        setUser(res.data!.user);
        setToken(res.data!.token);
        setLoading(false);
        const userRole = userRoles[0].name;
        navigate(defaultRoutes[userRole]);
    }


    return (
        <>
            <Box className="bg-white flex items-center justify-center h-full w-1/3 mx-auto">
                <div className="sm:mx-auto sm:w-96 sm:max-w-full">
                    <div className="sm:mx-auto sm:w-96 sm:max-w-full">
                        <img
                            className="mx-auto h-55 w-40"
                            src={logo}
                            alt="Your Company"
                        />
                        <Text className="text-center text-2xl font-bold leading-9 tracking-tight text-blue-800">
                            Sistema de Amortización
                        </Text>
                    </div>
                    <div className="mt-5">
                        <form className="space-y-6" onSubmit={form.onSubmit(handleSubmit)}>
                            <TextInput
                                id="email"
                                name="email"
                                type="email"
                                label="Correo Electrónico"
                                autoComplete="email"
                                required
                                withAsterisk
                                classNames={{
                                    input: "border-gray-900 placeholder:text-gray-500",
                                }}
                                {...form.getInputProps("email")}
                            />

                            <PasswordInput
                                id="password"
                                name="password"
                                type="password"
                                label="Contraseña"
                                autoComplete="current-password"
                                required
                                withAsterisk
                                classNames={{
                                    input: "border-gray-900 placeholder:text-gray-500",
                                }}
                                {...form.getInputProps("password")}
                            />
                            <div>

                                <Button
                                    type="submit"
                                    loading={loading}
                                    className="flex w-full justify-center rounded-md bg-blue-800 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Ingresar
                                </Button>
                            </div>
                        </form>
                    </div>

                    <p className="mt-10 text-center text-sm text-gray-500">
                        No tienes una cuenta?{" "}
                        <Link
                            to={PublicRoutes.register}
                            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                        >
                            Registrate Aquí!
                        </Link>
                    </p>
                </div>
            </Box>
        </>
    );
}