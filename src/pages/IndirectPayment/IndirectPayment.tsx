import { Flex } from "@mantine/core"
import IndirectPaymentsTable from "./components/IndirectPaymentsTable"

function IndirectPayment() {
  return (
    <Flex
    h="100%"
    direction="column"
    >
        <IndirectPaymentsTable/>
    </Flex>
  )
}

export default IndirectPayment