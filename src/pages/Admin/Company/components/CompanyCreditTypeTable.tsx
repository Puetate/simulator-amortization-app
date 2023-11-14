import { Chip } from "@mantine/core";
import { DataTableColumn } from "mantine-datatable";
import { useEffect, useMemo, useState } from "react";
import { getCompaniesCreditTypeService } from "../services/getCompaniesCreditType.service";
import DataTable from "../../../../components/DataTable";


export interface CompanyCreditsTableProps {
    ruc: string;
    name: string;
    creditTypes: string[];
}



function CompanyCreditTypeTable() {
    const usersColumns = useMemo<DataTableColumn<CompanyCreditsTableProps>[]>(
        () => [
            { accessor: "ruc", title: "Ruc", textAlign: "center" },
            { accessor: "name", title: "Nombre", textAlign: "center" },
            {
                accessor: "creditTypes",
                title: "Tipos de crédito",
                render: (company) => (

                    <>
                        {company.creditTypes.map((credit) => (
                            <Chip color="blue">
                                {credit}
                            </Chip>
                        ))
                        }
                    </>
                ),
                textAlignment: "center"
            }
        ],
        []
    );


    const [listCompanies, setListCompanies] = useState<CompanyCreditsTableProps[]>([]);
    const getCompanies = async () => {
        const res = await getCompaniesCreditTypeService();
        if (res.error || res.data === null) return

        setListCompanies(res.data);
    };

    useEffect(() => {
        getCompanies();
    }, []);

    return (
        <div className="p-9">
            <DataTable columns={usersColumns} records={listCompanies} className="w-full" />
        </div>
    )
}

export default CompanyCreditTypeTable