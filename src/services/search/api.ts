import { createServiceClient } from "@/lib/axios";
import type { UserProfile } from "../users/api";
import type { Post } from "../posts/api";

const searchClient = createServiceClient("search");

export interface SearchParams {
    q: string;
    page?: number;
    limit?: number;
    type?: 'users' | 'hashtags' | 'all';
}

export interface SearchResults {
    users: UserProfile[];
    posts: Post[];
}

export interface SearchResponse {
    message: string;
    results: SearchResults;
    query: SearchParams;
}

export const performSearch = (params: SearchParams) => {
    return searchClient.get<SearchResponse>("/", { params });
};