import { Button, Flex, Text, Select } from "@mantine/core";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import { useForm, yupResolver } from "@mantine/form";
import { Company } from "../../../../models/company.model";
import { SnackbarManager } from "../../../../utils";
import { getCatalogCompanyService } from "../../../Register/services/getCatalogCompanyService.service";
import { getCatalogCreditTypeService } from "../services/getCatalogCreditTypeService.service";
import { Catalog } from "../../../Register/components/FormRegister";
import { saveCompanyCreditTypeService } from "../services/saveCompanyCreditTypeService.service";

const validationSchema = Yup.object<Company>().shape({
    company: Yup.string().required("La entidad financiera es obligatoria"),
    creditType: Yup.string().required("El tipo de crédito es obligatorio"),
});
export interface CompanyCreditType {
    company: string;
    creditType: string;
}
const initialValues: CompanyCreditType = {

    company: "string",
    creditType: "string"

}

function FormCompanyCreditType({ onSubmitSuccess, onCancel }:
    {
        onSubmitSuccess: () => void,
        onCancel: () => void,
    }
) {
    const [loading, setLoading] = useState(false);

    const [catalogCompanies, setCatalogCompanies] = useState<Catalog[]>([])
    const [catalogCreditType, setCatalogCreditType] = useState<Catalog[]>([])

    const form = useForm(
        {
            initialValues: initialValues,
            validate: yupResolver(validationSchema)
        }
    )

    const getCatalogCompany = async () => {
        const res = await getCatalogCompanyService();
        if (res == null) return;
        setCatalogCompanies(res.data);
    }

    const getCatalogCreditType = async () => {
        const res = await getCatalogCreditTypeService();
        if (res == null) return;
        setCatalogCreditType(res.data);
    }

    const handleSubmit = async (companyCreditType: CompanyCreditType) => {
        setLoading(true);
        console.log(companyCreditType);
        
         const res = await saveCompanyCreditTypeService(companyCreditType);
         if (res.error || res == null) return setLoading(false);
         setLoading(false);
         onSubmitSuccess();
         SnackbarManager.success("Crédito Registrado correctamente");

    };


    useEffect(() => {
        getCatalogCompany();
        getCatalogCreditType();
    }, [])

    return (
        <Flex direction="column" p="lg">
            <Text className="text-lg font-bold text-blue-500 lg:text-xl xl:text-2xl">Tipos de Crédito a Entidad Financiera</Text>
            <form onSubmit={form.onSubmit(handleSubmit)} >
                <Flex direction="column" gap="lg">
                    <div className="flex flex-col gap-3">


                        <Select
                            clearable
                            label="Entidad Financiera"
                            placeholder="Seleccione"
                            data={catalogCompanies}
                            {...form.getInputProps("company")}

                        />
                        <Select
                            clearable
                            label="Tipos de credito"
                            placeholder="Seleccione"
                            data={catalogCreditType}
                            {...form.getInputProps("creditType")}

                        />
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

export default FormCompanyCreditType