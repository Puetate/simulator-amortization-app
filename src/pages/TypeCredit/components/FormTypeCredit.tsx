import { Flex, Text, TextInput, Button, NumberInput } from "@mantine/core";
import { useRef, useState } from "react";
import { CreditType } from "../../../models";
import * as Yup from "yup";
import { useForm, yupResolver } from "@mantine/form";
import { editCreditTypeService, saveTypeCreditService } from "../services";
import { SnackbarManager } from "../../../utils";
import { CreditTypeIndirectPayment } from "../../../models/creditTypeIndirectPayment.model";

    const title = {
        create: "Crear crédito",
    }

    const messages = {
        create: "Crédito creado exitosamente",
}
    
    const initialValues: CreditType = {
    _id: "",
    name: "",
    interestRate: 0,
    maxTime: 0,
    minTime: 0
    };

    const validationSchema = Yup.object<CreditType>().shape({
    name: Yup.string().required("El nombre del crédito es obligatorio."),
    interestRate: Yup.number().required("La taza de interés es obligatoria.").min(0),
    maxTime: Yup.number().required("El tiempo de plazo es obligatorio."),
    minTime: Yup.number().required("El tiempo de plazo es obligatorio.")
    });

    function FormTypeCredit({
    onSubmitSuccess,
    onCancel,
    }: {
    onSubmitSuccess: () => void;
            onCancel: () => void,
        }
    ) {
    const [loading, setLoading] = useState(false);
        
    const form = useForm(
        {
        initialValues,
        validate: yupResolver(validationSchema)
    })

    const handleSubmit = async (creditType: CreditType) => {
    setLoading(true)
        const res = await saveTypeCreditService(creditType);
        if (res.error || res.data == null) return setLoading(false)
        SnackbarManager.success(messages.create)
    setLoading(false)
    onSubmitSuccess()
    };

    return (
        <Flex direction="column" p="lg">
        <Text className="text-lg font-bold text-blue-500 lg:text-xl xl:text-2xl">{title.create}</Text>
        <form onSubmit={form.onSubmit(handleSubmit)}>
            <Flex direction="column" gap="lg" className="mt-4">
            <TextInput withAsterisk label="Nombre del Crédito" {...form.getInputProps("name")} />

            <NumberInput
                label="Taza de Interés"
                placeholder="Porcentaje"
                defaultValue={12}
                withAsterisk
                {...form.getInputProps("interestRate")}
            />

            <NumberInput
                label="Tiempo Mínimo (meses)"
                defaultValue={1}
                min={1}
                withAsterisk
                valueIsNumericString={false}
                {...form.getInputProps("minTime")}
            />

            <NumberInput
                label="Tiempo Máximo (meses)"
                min={1}
                defaultValue={1}
                withAsterisk
                {...form.getInputProps("maxTime")}
            />
            </Flex>
            <Flex justify="space-between" className="mt-10">
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

export default FormTypeCredit;
