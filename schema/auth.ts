import { object, Output } from "valibot";
import { UserIdSchema, UserNameSchema } from "./user";
import { BingoCardSchema } from "./bingo";

export const UserAuthSchema = object({
    UserId: UserIdSchema,
})
export type UserAuthType = Output<typeof UserAuthSchema>;

export const UserRegisterSchema = object({
    UserName: UserNameSchema,
})
export type UserRegisterType = Output<typeof UserRegisterSchema>;

export const UserAuthSuccessSchema = object({
    BingoCard: BingoCardSchema,
    UserId: UserIdSchema,
})
export type UserAuthSuccessType = Output<typeof UserAuthSuccessSchema>;
