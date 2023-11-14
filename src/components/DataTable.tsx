import { DataTable as MantineDataTable, DataTableColumn, DataTableProps } from 'mantine-datatable';
import { useEffect, useMemo, useRef, useState } from "react";

const PAGE_SIZE = 15;


function DataTable<T>(props: DataTableProps<T>) {
    const [page, setPage] = useState(1);
	const [fetching, setFetching] = useState(false);
	const recordsRef = useRef<Array<T>>();
	const [tableRecords, setTableRecords] = useState<Array<T>>();
	const [tableColumns, setTableColumns] = useState<DataTableColumn<T>[]>([]);
	const titleStyle = useMemo(() => ({ backgroundColor: "#4062C0", color: "white" }), [])

	useEffect(() => {
		const from = (page - 1) * PAGE_SIZE;
		const to = from + PAGE_SIZE;
		setTableRecords(recordsRef.current?.slice(from, to)); 
	}, [page]);

	useEffect(() => {
		setTableColumns(props.columns!.map((column) => ({ ...column, titleStyle })));
	}, [props.columns]);

	useEffect(() => {
		setFetching(true)
		if (props.records?.length === 0) {
			setTableRecords([]);
			setTimeout(() => {
				setFetching(false);
			}, 3000); 
		} else {
			recordsRef.current = props.records;
			setTableRecords(props.records?.slice(0, PAGE_SIZE));
			setFetching(false)
		}
	}, [props.records]);

    
    return (
		
        <MantineDataTable
        withTableBorder
		withColumnBorders
        borderRadius="md"
        columns={tableColumns}
        records={tableRecords}
        totalRecords={recordsRef.current?.length}
        recordsPerPage={PAGE_SIZE}
        fetching={fetching}
        borderColor="#91A4D8"
        page={page}
        idAccessor="_id"
        noRecordsText="No hay registros"
        onPageChange={(page) => setPage(page)}
        />
    )
}

export default DataTable