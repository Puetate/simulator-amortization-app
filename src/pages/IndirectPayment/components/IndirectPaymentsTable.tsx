import { useEffect, useMemo, useRef, useState } from "react";
import { DataTableColumn } from "mantine-datatable";
import { IndirectPayment } from "../../../models/indirectPayment.model";
import { ActionIcon, Button, Flex, Group, Modal, Tooltip } from "@mantine/core";
import DataTable from "../../../components/DataTable";
import { IconEdit, IconSquareRoundedPlusFilled } from "@tabler/icons-react";
import { getIndirectPaymentsService } from "../services";
import { useDisclosure } from "@mantine/hooks";
import FormIndirectPayment from "./FormIndirectPayment";

// const TITLE = 'Lista de pagos indirectos';

function IndirectPaymentsTable() {
    const [listIndirectPayments, setListIndirectPayments] = useState<IndirectPayment[]>([]);
    const [selectedIndirectPayment, setSelectedIndirectPayment] = useState<IndirectPayment | null>(null);
    const listIndirectPaymentsRef = useRef<IndirectPayment[]>([]);
    const [opened, { open, close }] = useDisclosure()



    const getIndirectPayments = async () => {
        const res = await getIndirectPaymentsService();
        if (res.error || res.data === null) return
        
        const indirectPaymentsData = res.data;

        const products: IndirectPayment[] = indirectPaymentsData.map(indPayment => (
            {
                _id: indPayment._id,
                mount: indPayment.mount,
                name: indPayment.name,

            }
        ));
        setListIndirectPayments(products);
        listIndirectPaymentsRef.current = products;
    };

    const onClickEditButton = async (indPayment: IndirectPayment) => {
        console.log(indPayment);
        
        setSelectedIndirectPayment(indPayment);
        open()
    }



    const onSubmitSuccess = async () => {
        close()
        await getIndirectPayments()
    }

    const onClickAddButton = () => {
		open()
		setSelectedIndirectPayment(null)
	}

    useEffect(() => {
        getIndirectPayments();
    }, []);

    const usersColumns = useMemo<DataTableColumn<IndirectPayment>[]>(
        () => [
            { accessor: "name", title: "Nombre", textAlign: 'center' },
            { accessor: "mount", title: "Monto", textAlign: 'center' },
            {
                accessor: "actions",
                title: "Acciones",
                render: (indirectPayment) => (
                    <Group>
                        <Tooltip label="Editar">
                            <ActionIcon
                                color="violet"
                                variant="light"
                                onClick={() => onClickEditButton(indirectPayment)}
                            >
                                <IconEdit />
                            </ActionIcon>
                        </Tooltip>
                    </Group>
                ),
                textAlignment: 'center'
            },
        ]
        , []);

    return (
        <>
            <Flex justify="start">
                <Button className="ml-9" onClick={onClickAddButton} leftSection={<IconSquareRoundedPlusFilled />}>
						Agregar
					</Button>
            </Flex>
            <Modal opened={opened} onClose={close} withCloseButton={false} radius="lg" padding="xs">
                <FormIndirectPayment onCancel={close} onSubmitSuccess={onSubmitSuccess} selectedIndirectPayment={selectedIndirectPayment} />
            </Modal>
            <div className="p-9">
                <DataTable columns={usersColumns} records={listIndirectPayments} className="w-full" />
            </div>
        </>
    )
}

export default IndirectPaymentsTable