import { useMutation } from "@tanstack/react-query";
import * as reportsApi from "./api";

export function useCreateReport() {
    return useMutation({
        mutationFn: (data: reportsApi.CreateReportRequest) => reportsApi.createReport(data),
    });
} 