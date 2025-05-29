import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"

export default function CreateProgramLoading() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Skeleton className="h-10 w-[250px]" />
      </div>

      <div className="w-full">
        <div className="mb-4">
          <Skeleton className="h-10 w-[300px]" />
        </div>
        <Card>
          <CardHeader>
            <Skeleton className="h-8 w-[200px] mb-2" />
            <Skeleton className="h-4 w-[350px]" />
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Skeleton className="h-4 w-[100px]" />
              <Skeleton className="h-10 w-full" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-[100px]" />
              <Skeleton className="h-24 w-full" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-[100px]" />
              <Skeleton className="h-10 w-full" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Skeleton className="h-4 w-[100px]" />
                <Skeleton className="h-10 w-full" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-[100px]" />
                <Skeleton className="h-10 w-full" />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Skeleton className="h-6 w-12" />
              <Skeleton className="h-4 w-[120px]" />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Skeleton className="h-10 w-[100px]" />
            <Skeleton className="h-10 w-[150px]" />
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
