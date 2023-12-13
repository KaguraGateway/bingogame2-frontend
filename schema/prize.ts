import { object, number, Output } from "valibot";
import { UserIdSchema, UserNameSchema } from "./user";

export const PrizeSpinResultSchema = object({
    PrizeNumber: number(),
    UserId: UserIdSchema,
    UserName: UserNameSchema,
})
export type PrizeSpinResultType = Output<typeof PrizeSpinResultSchema>;
