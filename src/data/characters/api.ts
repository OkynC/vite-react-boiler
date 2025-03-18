import { CharacterDTO, CharactersSchema } from "../../types/authors.ts";
import { client } from "../client";

export const getCharacters = async (): Promise<CharacterDTO[]> => {
  const res = await client.get("/api/characters");
  return CharactersSchema.parse(res.data);
};
