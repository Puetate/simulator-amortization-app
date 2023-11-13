import { IndirectPayment } from "./indirectPayment.model"
import { CreditType } from "./creditType.model"

    export interface CreditTypeIndirectPayment{
        _id: string,
        creditType: CreditType,
        indirectPayment: IndirectPayment
    }
