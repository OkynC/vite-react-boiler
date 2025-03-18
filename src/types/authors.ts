import { z } from "zod";

export const AlignementSchema = z.enum([
  "loyal",
  "neutral",
  "chaotic",
  "undefined",
]);
export type Alignement = z.infer<typeof AlignementSchema>;

export const CharacterSchema = z.object({
  id: z.string(),
  name: z.string(),
  alignment: AlignementSchema,
});

export const CharactersSchema = z.array(CharacterSchema);

export type CharacterDTO = z.infer<typeof CharacterSchema>;
