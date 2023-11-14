import { Button, Flex, Text, TextInput, FileButton } from "@mantine/core";
import { useRef, useState } from "react";
import * as Yup from "yup";
import { useForm, yupResolver } from "@mantine/form";
import { Company } from "../../../../models/company.model";
import { SnackbarManager } from "../../../../utils";
import { saveCompanyService } from "../services/saveCompany.service";
import { editCompanyService } from "../services/editCompany.service";



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
    ruc: Yup.string().required("El ruc es obligatorio").length(13),
    name: Yup.string().required("El nombre de la entidad finaciera es obligatorio"),
    address: Yup.string().required("La dirección es obligatoria"),
    phone: Yup.string().required("El celular es obligatorio"),
});


export default function FormCompany(
    { onSubmitSuccess, onCancel , selectedCompany}:
        {
            onSubmitSuccess: () => void,
            onCancel: () => void,
            selectedCompany: Company | null
        }
) {
    const [loading, setLoading] = useState(false);
    const [file, setFile] = useState<File | null>(null);
    const idRef = useRef<string>(selectedCompany?._id || "");   

    const form = useForm(
        {
            initialValues: idRef.current && selectedCompany !== null ?
            { ...selectedCompany } :
            initialValues,
            validate: yupResolver(validationSchema)
        }
    )


    const handleSaveCompany = async (company: Company) => {
        setLoading(true);

        try {
            const formData = new FormData();

            formData.append("_id", company._id);
            formData.append("ruc", company.ruc);
            formData.append("name", company.name);
            formData.append("address", company.address);
            formData.append("phone", company.phone);

            if (file) {
                formData.append("logo", file);
            }

            if (idRef.current !== "") {
                // Aquí va tu lógica para editar (si tienes una función específica)
                const res = await editCompanyService(idRef.current, formData);

                if (res.error || res.data == null) {
                    return setLoading(false);
                }

                SnackbarManager.success(messages.edit);
            } else {
                // Aquí va tu lógica para crear
                const res = await saveCompanyService(formData);

                if (res.error || res.data == null) {
                    return setLoading(false);
                }

                SnackbarManager.success(messages.create);
            }

            setLoading(false);
            onSubmitSuccess();
        } catch (error) {
            console.error("Error al guardar la compañía:", error);
            setLoading(false);
        }
    };




    return (
        <Flex direction="column" p="lg">
            <Text className="text-lg font-bold text-blue-500 lg:text-xl xl:text-2xl">{idRef.current ? title.edit : title.create}</Text>
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
                        <div className="mt-1">
                            <Text className="mb-2 font-medium" fz="sm">
                                Logo
                            </Text>
                                <FileButton
                                    onChange={(files) => setFile(files)}
                                    accept="image/png,image/jpeg"
                                    >
                                    {(props) => <Button className="bg-green-500 mb-2" {...props}>Subir imagen</Button>}
                                </FileButton>
                            
                            {file && (
                                <Text size="sm" mt="sm">
                                Nombre file: {file.name}
                                </Text>
                            )}
                        </div>
                    </div>
                    
                </Flex>
                <Flex justify="space-between" mt="lg">
                    <Button className="bg-red-600 text-white hover:bg-red-700" onClick={onCancel}>
                        Cancelar
                    </Button>

                    <Button className="bg-blue-500 text-white hover:bg-blue-600" loading={loading} type="submit">
                        Aceptar
                    </Button>
                </Flex>
            </form>
        </Flex>
    )
}