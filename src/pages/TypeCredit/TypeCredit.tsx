import { useEffect } from "react";
import TypeCreditTable from "./components/TypeCreditTable";

function TypeCredit() {

    useEffect(() => {
        document.title = "TypeCredit";
    }, []);

    return (
        <>
            <TypeCreditTable />
        </>
    );
}
export default TypeCredit;



