import { Flex, Text, TextInput, Button, NumberInput } from "@mantine/core";
import { useRef, useState } from "react";
import { CreditType, IndirectPayment } from "../../../models";
import * as Yup from "yup";
import { useForm, yupResolver } from "@mantine/form";
import { editCreditTypeService, saveTypeCreditService } from "../services";
import { SnackbarManager } from "../../../utils";
import { CreditTypeIndirectPayment } from "../../../models/creditTypeIndirectPayment.model";
import { editIndirectPaymentService } from "../../IndirectPayment/services";

    const title = {
        edit: "Editar crédito"
    }

    const messages = {
        edit: "Crédito y cobro Indirecto editado exitosamente"
    }
    
    const initialValuesCreditType: CreditType = {
        _id: "",
        name: "",
        interestRate: 0,
        maxTime: 0,
        minTime: 0
    };

    const initialValuesIndirectPayment: IndirectPayment = {
        name: "",
        mount: 0,
    };

    const validationSchema = Yup.object<CreditType>().shape({
        name: Yup.string().required("El nombre del crédito es obligatorio."),
        interestRate: Yup.number().required("La taza de interés es obligatoria.").min(0),
        maxTime: Yup.number().required("El tiempo de plazo es obligatorio."),
        minTime: Yup.number().required("El tiempo de plazo es obligatorio.")
    });

    const validationSchemaIndirectPayment = Yup.object<IndirectPayment>().shape({
        name: Yup.string().required("Este campo es requerido"),
        mount: Yup.number().required("Este campo es requerido"),
    });

    function FormEditTypeCredit({
        onSubmitSuccess,
        onCancel,
        selectedCreditType
        }: {
        onSubmitSuccess: () => void;
        onCancel: () => void;
        selectedCreditType: CreditTypeIndirectPayment | null;
    }) {
    const [loading, setLoading] = useState(false);
    const idRef = useRef<string>(selectedCreditType?._id || "");

    const formCreditType = useForm({
        initialValues: selectedCreditType?.creditType || initialValuesCreditType,
        validate: yupResolver(validationSchema)
    })
    
    const formIndirectPayment = useForm({
        initialValues: selectedCreditType?.indirectPayment || initialValuesIndirectPayment,
        validate: yupResolver(validationSchemaIndirectPayment)
    })

    
    const handleSubmitCreditType = async (formCreditType: CreditType) => {
        const creditTypeId = selectedCreditType?.creditType?._id;
        setLoading(true);
        if(!creditTypeId) return setLoading(false);
        const res = await editCreditTypeService(creditTypeId, formCreditType);
        if (res.error || res.data == null) return setLoading(false);
        SnackbarManager.success(messages.edit);
        };
        
    const handleSubmit = async (formIndirectPaymentValues: IndirectPayment) => {
        const indirectPaymentId = selectedCreditType?.indirectPayment?._id;
        if(!indirectPaymentId) return setLoading(false);
        const res = await editIndirectPaymentService(indirectPaymentId, formIndirectPaymentValues)
        if (res.error || res.data == null) return setLoading(false)
        setLoading(false)
        onSubmitSuccess()
    }

    return (
        <Flex direction="column" p="lg">
            <Text className="text-lg font-bold text-blue-500 lg:text-xl xl:text-2xl">{title.edit}</Text>
            <form>
                <Flex direction="column" gap="lg" className="mt-4">
                    <TextInput withAsterisk label="Nombre del Crédito" {...formCreditType.getInputProps("name")} />

                    <NumberInput
                    label="Taza de Interés"
                    placeholder="Porcentaje"
                    defaultValue={12}
                    withAsterisk
                    {...formCreditType.getInputProps("interestRate")}
                    />

                    <NumberInput
                    label="Tiempo Mínimo (meses)"
                    defaultValue={1}
                    min={1}
                    withAsterisk
                    valueIsNumericString={false}
                    {...formCreditType.getInputProps("minTime")}
                    />

                    <NumberInput
                    label="Tiempo Máximo (meses)"
                    min={1}
                    defaultValue={1}
                    withAsterisk
                    {...formCreditType.getInputProps("maxTime")}
                    />
                </Flex>
            </form>

            <form>
            <Flex direction="column" gap="lg" className="mt-4">
                <TextInput label="Nombre de cobro indirecto" {...formIndirectPayment.getInputProps("name")} />

                <NumberInput
                label="Monto de cobro"
                {...formIndirectPayment.getInputProps("mount")}
                min={1}
                max={20}
                />
            </Flex>
            </form>

            <Flex justify="space-between" className="mt-10">
            <Button className="bg-red-600 text-white hover:bg-red-700" onClick={onCancel}>
                Cancelar
            </Button>
            <Button className="bg-blue-500 text-white hover:bg-blue-600" loading={loading} onClick={() => {
                handleSubmitCreditType(formCreditType.values);
                handleSubmit(formIndirectPayment.values);
            }}>
                Aceptar
            </Button>
            </Flex>
        </Flex>
    );
}

export default FormEditTypeCredit;
