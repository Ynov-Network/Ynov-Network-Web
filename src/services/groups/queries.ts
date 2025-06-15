import { useQuery } from "@tanstack/react-query";
import * as groupsApi from "./api";

export function useGetAllGroups(params: groupsApi.GetGroupsParams) {
  return useQuery({
    queryKey: ["groups", params],
    queryFn: () => groupsApi.getAllGroups(params),
  });
}

export function useGetGroupById(groupId: string) {
  return useQuery({
    queryKey: ["group", groupId],
    queryFn: () => groupsApi.getGroupById(groupId),
    enabled: !!groupId,
  });
}
