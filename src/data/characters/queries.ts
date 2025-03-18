import { useQuery, UseQueryOptions } from "@tanstack/react-query";

import { CharacterDTO } from "../../types/authors.ts";
import { getCharacters } from "./api";
import { getCharactersQueryKey } from "./keys";

export const charactersQuery: () => UseQueryOptions<CharacterDTO[]> = () => ({
  queryKey: getCharactersQueryKey(),
  queryFn: getCharacters,
});

export const useCharactersQuery = () => {
  const { data, isLoading, isError } = useQuery(charactersQuery());

  return {
    characters: data || [],
    isLoading,
    isError,
  };
};
