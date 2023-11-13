import { Button, Flex, Text, TextInput, FileInput } from "@mantine/core";
import { useRef, useState } from "react";
import * as Yup from "yup";
import { useForm, yupResolver } from "@mantine/form";
import { Company } from "../../../../models/company.model";
import { SnackbarManager } from "../../../../utils";
import { saveCompanyService } from "../services/saveCompany.service";



const title = {
    create: "Crear Entidad Financiera",
    edit: "Editar Entidad Financiera"
}

const messages = {
    create: "Entidad Financiera creada exitosamente",
    edit: "Entidad Financiera editada exitosamente"
};

const initialValues: Company = {
    _id: "",
    ruc: "",
    name: "",
    address: "",
    phone: "",
    logo:""
};

const validationSchema = Yup.object<Company>().shape({
    ruc: Yup.string().required("El ruc es obligatorio"),
    name: Yup.string().required("El nombre de la entidad finaciera es obligatorio"),
    address: Yup.string().required("La dirección es obligatoria"),
    phone: Yup.string().required("El celular es obligatorio"),

});


export default function FormCompany(
    { onSubmitSuccess, onCancel }:
        {
            onSubmitSuccess: () => void,
            onCancel: () => void,
            
        }
) {
    const [loading, setLoading] = useState(false);
    const [file, setFile] = useState<File | null>(null);

    const form = useForm(
        {
            initialValues,
            validate: yupResolver(validationSchema)
        }
    )


    const handleSaveCompany = async (company: Company) => {
        console.log(company);
        
        /* setLoading(true);
        const res = await saveCompanyService(company);
        if (res.error || res.data == null) return setLoading(false);
        SnackbarManager.success(messages.create);
        setLoading(false);
        onSubmitSuccess(); */
    };


    return (
        <Flex direction="column" p="lg">
            <Text className="text-lg font-bold text-blue-500 lg:text-xl xl:text-2xl">Entidad Finaciera</Text>
            <form  onSubmit={form.onSubmit(handleSaveCompany)} >
                <Flex direction="column" gap="lg">
                    <div className="flex flex-col gap-3">

                        <TextInput                        
                            label="RUC"
                            {...form.getInputProps("ruc")}
                        />
                        <TextInput                        
                            label="Entidad Financiera"
                            {...form.getInputProps("name")}
                        />
                        <TextInput                        
                            label="Dirección"
                            {...form.getInputProps("address")}
                        />
                        <TextInput                        
                            label="Teléfono"
                            {...form.getInputProps("phone")}
                        />
                        <div>
                            <FileInput
                                label="Logo"
                                placeholder="Input placeholder"
                                accept="image/png,image/jpeg,vector/svg"
                            {...form.getInputProps("logo")}
                                /> 
                        </div>
                    </div>
                    
                </Flex>
                <Flex justify="space-between" mt="lg">
                    <Button variant="white" onClick={onCancel}>Cancelar</Button>
                    <Button loading={loading} type="submit">Aceptar</Button>
                </Flex>
            </form>
        </Flex>
    )
}