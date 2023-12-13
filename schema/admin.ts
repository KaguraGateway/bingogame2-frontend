import { object, number, array, Output, string } from "valibot";

export const AdminInitSchema = object({
    BingoNumbers: array(number()),
    ExchangedPrizes: array(number()),
    PrizeNum: number(),
})
export type AdminInitType = Output<typeof AdminInitSchema>;

export const BingoSpinResultSchema = object({
    BingoNumber: number(),
})
export type BingoSpinResultType = Output<typeof BingoSpinResultSchema>;

export const UserBingoSchema = object({
    UserId: string(),
    UserName: string(),
})
export type UserBingoType = Output<typeof UserBingoSchema>;
