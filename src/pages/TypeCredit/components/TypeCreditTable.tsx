import { useEffect, useMemo, useRef, useState } from "react";
import { DataTableColumn } from "mantine-datatable";
import { ActionIcon, Button, Flex, Group, Tooltip, Modal } from "@mantine/core";
import DataTable from "../../../components/DataTable";
import { IconEdit, IconSquareRoundedPlusFilled } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import { FormTypeCredit } from ".";
import { CreditType, IndirectPayment } from "../../../models";
import { getCreditsTypeService, getCreditsTypeIndirectPaymentService } from "../services";
import { CreditTypeIndirectPayment } from "../../../models/creditTypeIndirectPayment.model";
import FormEditTypeCredit from "./FormEditTypeCredit";



function TypeCreditTable() {
    const [listCreditsType, setListCreditsType] = useState<CreditTypeIndirectPayment[]>([]);
    const [selectedCreditType, setSelectedCreditType] = useState<CreditTypeIndirectPayment | null>(null);
    const listCreditsTypeRef = useRef<CreditTypeIndirectPayment[]>([]);
    const [openedAdd, { open: openAdd, close: closeAdd }] = useDisclosure();
    const [openedEdit, { open: openEdit, close: closeEdit }] = useDisclosure();


    const getCreditsType = async () => {
        const res = await getCreditsTypeIndirectPaymentService();
        if (res.error || res.data === null) return
        
        const creditsTypeData = res.data;

        const products: CreditTypeIndirectPayment[] = creditsTypeData.map((credType) => ({
            _id: credType._id,
            creditType: credType.creditType || { name: "", interestRate: 0, minTime: 0, maxTime: 0 },
            indirectPayment: credType.indirectPayment || { name: "", mount: 0 },
        }));
            setListCreditsType(products);
            listCreditsTypeRef.current = products;
            console.log(products);
    };

    const onClickEditButton = async (credType: CreditTypeIndirectPayment) => {
        
        setSelectedCreditType(credType);
        openEdit()
    }

    const onSubmitSuccess = async () => {
        closeEdit();
        closeAdd();
        await getCreditsType()
    }

    const onClickAddButton = () => {
        openAdd();
		setSelectedCreditType(null)
	}

    useEffect(() => {
        getCreditsType();
    }, []);

    const usersColumns = useMemo<DataTableColumn<CreditTypeIndirectPayment>[]>(
        () => [
            { accessor: "creditType.name", title: "Crédito", textAlign: "center" },
            { accessor: "creditType.interestRate", title: "Taza Interés", textAlign: "center" },
            { accessor: "indirectPayment.name", title: "Pago Indirecto", textAlign: "center" },
            { accessor: "indirectPayment.mount", title: "Monto", textAlign: "center" },
            {
            accessor: "actions",
            title: "Acciones",
            render: (creditType) => (
                <Group>
                <Tooltip label="Editar">
                    <ActionIcon color="violet" variant="light" onClick={() => onClickEditButton(creditType)}>
                    <IconEdit />
                    </ActionIcon>
                </Tooltip>
                </Group>
            ),
            textAlignment: "center"
            }
        ],
        []
    );

    return (
        <>            
            <Flex justify="start">
                <Button className="ml-9" onClick={onClickAddButton} leftSection={<IconSquareRoundedPlusFilled />}>
						Crear Crédito
					</Button>
            </Flex>
            <Modal  opened={openedAdd} onClose={closeAdd} withCloseButton={false} radius="lg" padding="xs">
                <FormTypeCredit onCancel={closeAdd} onSubmitSuccess={onSubmitSuccess}/>
            </Modal>
            <Modal opened={openedEdit} onClose={closeEdit} withCloseButton={false} radius="lg" padding="xs">
                <FormEditTypeCredit onCancel={closeEdit} onSubmitSuccess={onSubmitSuccess} selectedCreditType={selectedCreditType} />
            </Modal>
            <div className="p-9">
                <DataTable columns={usersColumns} records={listCreditsType} className="w-full" />
            </div>
        </>
    )
}

export default TypeCreditTable