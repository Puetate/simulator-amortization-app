import { Button, Drawer} from "@mantine/core";
import { useDisclosure } from '@mantine/hooks';
import FormTypeCredit from "./TypeCredit/FormTypeCredit";

function Company() {
    const [opened, { open, close }] = useDisclosure(false);
    const onSubmitSuccess = async () => {
        close();
    };
    return (
        <>
            <Drawer opened={opened} onClose={close} position="right">
            <FormTypeCredit
                onSubmitSuccess={onSubmitSuccess}
                onCancel={close}
            />
            </Drawer>
            <Button
            onClick={open}
            className=" justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
            Agregar Crédito
            </Button>
        </>
    );
}
export default Company
