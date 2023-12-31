import { Box, Button, PasswordInput, Select, Text, TextInput } from "@mantine/core";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { PublicRoutes } from "../../../models/routes";
import { Person } from "../../../models/person.model";
import { useForm, yupResolver } from "@mantine/form";
import { registerService } from "../services/login.service";
import { useEffect, useState } from "react";
import { getCatalogCompanyService } from "../services/getCatalogCompanyService.service";
import { validateEcuadorianIdCard } from "../../../utils/validate-ecuadorian-id-card.util";
import { SnackbarManager } from "../../../utils";
export interface AuthUser {
    email: string;
    password: string;
}

export interface Catalog {
    _id: string,
    value: string,
    label: string,
}
export interface AuthRegister {
    user: AuthUser;
    person: Person;
    company: string;
}

export default function FormRegister() {
    const [loading, setLoading] = useState(false);
    const [catalogCompanies, setCatalogCompanies] = useState<Catalog[]>([])

    const navigate = useNavigate();


    const initialValues: AuthRegister = {
        user: {
            email: "",
            password: "",
        },
        person: {
            firstName: "",
            lastName: "",
            dni: "",
            phone: "",
            address: ""
        },
        company: ""
    };

    const validationSchema = Yup.object<AuthRegister>().shape({
        user: Yup.object<AuthUser>().shape({
            email: Yup.string().email().required("El email es obligatorio").email("Email inválido"),
            password: Yup.string().min(6).required("La contraseña es obligatorio"),
        }),
        person: Yup.object<Person>().shape({
            firstName: Yup.string().required("El nombres es obligatorio"),
            lastName: Yup.string().required("El apellido es obligatorio"),
            dni: Yup.string().required("La cédula es obligatorio").min(10, "La cédula debe tener al menos 10 caracteres").max(10).test("validate-identification", "Ingrese una identificación correcta", (val: string) => validateEcuadorianIdCard(val)),
            phone: Yup.string().required("El teléfono es obligatorio").min(10, "El teléfono debe tener al menos 10 caracteres"),
            address: Yup.string().required("La dirección es obligatorio")
        }),
        company: Yup.string().required("La entidad financiera es obligatorio")

    })

    const getCatalogCompany = async () => {
        const res = await getCatalogCompanyService();
        if (res == null) return;
        setCatalogCompanies(res.data);
    }

    const form = useForm<AuthRegister>({
        initialValues,
        validate: yupResolver(validationSchema)
    });

    const handleSubmit = async (authRegister: AuthRegister) => {
        setLoading(true);
        const res = await registerService(authRegister);
        if (res.error || res == null) return setLoading(false);
        SnackbarManager.success("Usuario registrado correctamente");
        navigate(PublicRoutes.login);

    };

    useEffect(() => {
        getCatalogCompany();
    }, [])

    return (
        <>
            <Box className="bg-white flex items-center justify-center h-full w-1/2 mx-auto">
                <div className="sm:mx-auto sm:w-96 sm:max-w-full">
                    <div className="sm:mx-auto sm:w-96 sm:max-w-full">
                        {/* <img className="mx-auto h-55 w-40" src={logo} alt="Your Company" /> */}
                        <Text className="text-center text-2xl font-bold leading-9 tracking-tight text-blue-800">
                            Sistema de Amortización
                        </Text>
                        <Text className="text-center text-2xl font-bold leading-9 tracking-tight text-blue-800">
                            Registrarse
                        </Text>
                    </div>
                    <form className="w-full" onSubmit={form.onSubmit(handleSubmit)}>
                        <div className="flex gap-4">
                            <div className="flex flex-col gap-3">

                                <TextInput
                                    label="Nombres"
                                    {...form.getInputProps("person.firstName")}
                                />
                                <TextInput
                                    label="Apellidos"
                                    {...form.getInputProps("person.lastName")}
                                />
                                <TextInput
                                    label="Cédula"
                                    
                                    maxLength={10}
                                    {...form.getInputProps("person.dni")}
                                />
                                <TextInput
                                    label="Teléfono"
                                    maxLength={13}
                                    {...form.getInputProps("person.phone")}
                                />
                                <TextInput
                                    label="Dirección"
                                    {...form.getInputProps("person.address")}
                                />
                            </div>
                            <div className="flex flex-col gap-3">

                                <TextInput
                                    label="Email"
                                    {...form.getInputProps("user.email")}
                                />
                                <PasswordInput
                                    label="Contraseña"

                                    {...form.getInputProps("user.password")}
                                />
                                <Select
                                    clearable
                                    label="Promoción"
                                    placeholder="Seleccione"
                                    data={catalogCompanies}
                                    {...form.getInputProps("company")}

                                />
                            </div>
                        </div>
                        <Button
                            className="flex mt-5 w-full justify-center rounded-md bg-blue-800 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            type="submit"
                            loading={loading}
                        >
                            Registrarse
                        </Button>
                    </form>


                    <p className="mt-10 text-center text-sm text-gray-500">
                        Ya tienes una cuenta?{" "}
                        <Link
                            to={PublicRoutes.login}
                            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                        > Iniciar Sesión!
                        </Link>
                    </p>
                </div>
            </Box>
        </>
    );
}