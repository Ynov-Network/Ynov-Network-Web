import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

export const PostCardSkeleton = () => {
  return (
    <Card className="border-0 shadow-sm py-6">
      <CardContent>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[150px]" />
              <Skeleton className="h-3 w-[200px]" />
            </div>
          </div>
          <Skeleton className="h-6 w-6 rounded-md" />
        </div>
        <div className="space-y-3 my-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-[90%]" />
        </div>
        <Skeleton className="h-64 w-full rounded-lg" />
        <div className="flex items-center justify-between mt-4 text-sm text-muted-foreground mb-4">
          <div className="flex space-x-4">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-20" />
          </div>
        </div>
        <div className="flex items-center justify-between pt-4 border-t">
          <div className="flex space-x-1">
            <Skeleton className="h-9 w-24" />
            <Skeleton className="h-9 w-28" />
            <Skeleton className="h-9 w-24" />
          </div>
          <Skeleton className="h-9 w-10" />
        </div>
      </CardContent>
    </Card>
  );
}; 