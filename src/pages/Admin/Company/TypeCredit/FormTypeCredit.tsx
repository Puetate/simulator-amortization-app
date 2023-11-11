import { Flex, Text, TextInput, Button, NumberInput } from "@mantine/core";
import { useRef, useState } from "react";


function FormTypeCredit({ onSubmitSuccess, onCancel }: {
    onSubmitSuccess: () => void,
    onCancel: () => void,
}) { 
    const [loading, setLoading] = useState(false);
    return (
        <Flex direction="column" p="lg">

            <Text className="text-blue-500 text-lg lg:text-xl xl:text-2xl font-bold"> Crear Crédito</Text>
            <form >

                <Flex direction="column" gap="lg" className="mt-4">
                    <TextInput
                        withAsterisk
                        label="Nombre del Crédito"               
                    />

                    <NumberInput
                        label="Taza de Interés"
                        placeholder="Porcentaje"
                        suffix="%"
                        defaultValue={12}
                        withAsterisk
                    />

                    <NumberInput
                        label="Tiempo Mínimo (meses)"
                        placeholder="Mínimo"
                        defaultValue={1}
                        min={1}
                        withAsterisk
                    />

                    <NumberInput
                        label="Tiempo Máximo (meses)"
                        placeholder="Máximo"
                        min={1}
                        defaultValue={1}
                        withAsterisk
                    />

                </Flex>
                <Flex justify="space-between"  className="mt-10">
                    <Button
                        className="bg-red-600 text-white hover:bg-red-700"
                        onClick={onCancel}
                        >
                        Cancelar
                        </Button>

                        <Button
                        className="bg-blue-500 text-white hover:bg-blue-600"
                        loading={loading}
                        type="submit"
                        >
                        Aceptar
                    </Button>
                </Flex>
            </form>
        </Flex>
    )
}

export default FormTypeCredit