import { useQuery } from "@tanstack/react-query";
import * as searchApi from "./api";

export type { SearchParams } from "./api";

export function useSearch(params: searchApi.SearchParams) {
    return useQuery({
        queryKey: ["search", params],
        queryFn: () => searchApi.performSearch(params),
        enabled: !!params.q,
    });
} 