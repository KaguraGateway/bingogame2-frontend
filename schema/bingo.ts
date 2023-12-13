import { number, object, boolean, Output, array } from "valibot";

export const BingoRowSchema = object({
    BingoNumber: number(),
    IsMarked: boolean(),
})
export type BingoRowType = Output<typeof BingoRowSchema>;

export const BingoCardSchema = array(array(BingoRowSchema))
export type BingoCardType = Output<typeof BingoCardSchema>;
