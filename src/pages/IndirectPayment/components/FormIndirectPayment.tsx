import { Button, Flex, NumberInput, Text, TextInput } from "@mantine/core";
import { IndirectPayment } from "../../../models";
import { useRef, useState } from "react";
import * as Yup from "yup";
import { useForm, yupResolver } from "@mantine/form";
import { SnackbarManager } from "../../../utils";
import { editIndirectPaymentService, saveIndirectPaymentService } from "../services";


const title = {
    create: "Crear cobro indirecto",
    edit: "Editar cobro indirecto"
}

const messages = {
    create: "Cobro indirecto editada exitosamente",
    edit: "Cobro indirecto creada exitosamente"
}
const initialValues: IndirectPayment = {
    name: "",
    mount: 0,
}

const validationSchema = Yup.object<IndirectPayment>().shape({
    name: Yup.string().required("Este campo es requerido"),
    mount: Yup.number().required("Este campo es requerido"),
});

export default function FormIndirectPayment(
    { onSubmitSuccess, onCancel, selectedIndirectPayment }:
        {
            onSubmitSuccess: () => void,
            onCancel: () => void,
            selectedIndirectPayment: IndirectPayment | null
        }
) {
    const [loading, setLoading] = useState(false);
    const idRef = useRef<string>(selectedIndirectPayment?._id || "");   

    const form = useForm(
        {
        initialValues: idRef.current && selectedIndirectPayment !== null ?
            { ...selectedIndirectPayment } :
            initialValues,
        validate: yupResolver(validationSchema)
    })


    const handleSubmit = async (formIndirectPaymentValues: IndirectPayment) => {
        setLoading(true)
        
        if (idRef.current !== "") {
            const res = await editIndirectPaymentService(idRef.current, formIndirectPaymentValues)
            if (res.error || res.data == null) return setLoading(false)
            SnackbarManager.success(messages.create)
        } else {
            const res = await saveIndirectPaymentService(formIndirectPaymentValues)
            if (res.error || res.data == null) return setLoading(false)
            SnackbarManager.success(messages.edit)
        }
        setLoading(false)
        onSubmitSuccess()
    }

    return (
        <Flex direction="column" p="lg">
            <Text  className="text-lg font-bold text-blue-500 lg:text-xl xl:text-2xl" mb="lg">{idRef.current ? title.edit : title.create}</Text>
            <form onSubmit={form.onSubmit(handleSubmit)} >
                <Flex direction="column" gap="lg">
                    <TextInput
                        label="Nombre de cobro indirecto"
                        {...form.getInputProps("name")}

                    />

                    <NumberInput
                        label="Monto de cobro"
                        {...form.getInputProps("mount")}
                        min={1}
                        max={20}

                    />
                </Flex>
                <Flex justify="space-between" mt="lg">
                    <Button variant="white" onClick={onCancel}>Cancelar</Button>
                    <Button loading={loading} type="submit">Aceptar</Button>
                </Flex>
            </form>
        </Flex>
    )
}