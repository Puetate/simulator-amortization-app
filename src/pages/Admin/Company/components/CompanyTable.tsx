import { useEffect, useMemo, useRef, useState } from "react";
import { DataTableColumn } from "mantine-datatable";
import DataTable from "../../../../components/DataTable";
import { ActionIcon, Button, Flex, Group, Modal, Tooltip } from "@mantine/core";

import { IconEdit, IconSquareRoundedPlusFilled } from "@tabler/icons-react";

import { useDisclosure } from "@mantine/hooks";
import FormCompany from "./FormCompany";
import { Company } from "../../../../models";
import { getCompaniesService } from "../services/getCompanies.service";


function CompanyTable() {
    const [listCompanies, setListCompanies] = useState<Company[]>([]);
    const [opened, { open, close }] = useDisclosure();
    const listCompaniesRef = useRef<Company[]>([]);
    const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);

    const getCompanies = async () => {
        const res = await getCompaniesService();
        if (res.error || res.data === null) return
        
        const companyData = res.data;

        const products: Company[] = companyData.map(company => (
            {
                _id: company._id,
                ruc: company.ruc,
                name: company.name,
                address: company.address,
                phone: company.phone,
                logo: company.logo

            }
        ));
        setListCompanies(products);
        listCompaniesRef.current = products;
    };

    const onClickEditButton = async (company: Company) => {
    console.log(company);

    setSelectedCompany(company);
    open();
    };

    const onClickAddButton = () => {
		open()
        setSelectedCompany(null);
	}

    const onSubmitSuccess = async () => {
        close()
        await getCompanies();
    }

    useEffect(() => {
        getCompanies();
    }, []);

    const usersColumns = useMemo<DataTableColumn<Company>[]>(
      () => [
        { accessor: "ruc", title: "Ruc", textAlign: "center" },
        { accessor: "name", title: "Nombre", textAlign: "center" },
        { accessor: "address", title: "Dirección", textAlign: "center" },
        { accessor: "phone", title: "Teléfono", textAlign: "center" },
        {
          accessor: "actions",
          title: "Acciones",
          render: (company) => (
            <Group>
              <Tooltip label="Editar">
                <ActionIcon color="violet" variant="light" onClick={() => onClickEditButton(company)}>
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
                Crear Entidad Financiera
            </Button>
            </Flex>
            <Modal opened={opened} onClose={close} withCloseButton={false} radius="lg" padding="xs">
            <FormCompany onCancel={close} onSubmitSuccess={onSubmitSuccess} />
            </Modal>
            <div className="p-9">
            <DataTable columns={usersColumns} records={listCompanies} className="w-full" />
            </div>
        </>
    );
}

export default CompanyTable