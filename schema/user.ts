import { StringSchema, string, minLength, maxLength, Output, object } from 'valibot';
import { BingoCardSchema } from './bingo';

export const UserIdSchema: StringSchema<string> = string([
    minLength(26),
    maxLength(26),
])
export type UserIdType = Output<typeof UserIdSchema>;

export const UserNameSchema: StringSchema<string> = string([
    minLength(3),
    maxLength(26),
])
export type UserNameType = Output<typeof UserNameSchema>;

export const UpdateBingoCardSchema = object({
    bingoCard: BingoCardSchema,
})
export type UpdateBingoCardType = Output<typeof UpdateBingoCardSchema>;
