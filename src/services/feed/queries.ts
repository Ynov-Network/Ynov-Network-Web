import { useInfiniteQuery } from "@tanstack/react-query";
import * as feedApi from "./api";

export function useGetUserFeed(options: { enabled?: boolean } = {}) {
    return useInfiniteQuery({
        queryKey: ["feed", "user"],
        queryFn: ({ pageParam }) => feedApi.getUserFeed({ page: pageParam, limit: 10 }),
        initialPageParam: 1,
        getNextPageParam: (lastPage) => {
            const { page, totalPages } = lastPage.data;
            return page < totalPages ? page + 1 : undefined;
        },
        ...options,
    });
}

export function useGetTrendingFeed(options: { enabled?: boolean } = {}) {
    return useInfiniteQuery({
        queryKey: ["feed", "trending"],
        queryFn: ({ pageParam }) => feedApi.getPublicFeed({ page: pageParam, limit: 10, feedType: 'trending' }),
        initialPageParam: 1,
        getNextPageParam: (lastPage) => {
            const { page, totalPages } = lastPage.data;
            return page < totalPages ? page + 1 : undefined;
        },
        ...options,
    });
}

export function useGetForYouFeed(options: { enabled?: boolean } = {}) {
    return useInfiniteQuery({
        queryKey: ["feed", "for-you"],
        queryFn: ({ pageParam }) => feedApi.getPublicFeed({ page: pageParam, limit: 10, feedType: 'for_you' }),
        initialPageParam: 1,
        getNextPageParam: (lastPage) => {
            const { page, totalPages } = lastPage.data;
            return page < totalPages ? page + 1 : undefined;
        },
        ...options,
    });
} 