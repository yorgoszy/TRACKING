import { Skeleton } from "@/components/ui/skeleton"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function ProgramsLoading() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Skeleton className="h-10 w-[200px]" />
        <Skeleton className="h-10 w-[150px]" />
      </div>

      <div className="flex items-center">
        <div className="relative flex-1 max-w-sm">
          <Skeleton className="h-10 w-full" />
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <Skeleton className="h-5 w-[100px]" />
              </TableHead>
              <TableHead>
                <Skeleton className="h-5 w-[150px]" />
              </TableHead>
              <TableHead>
                <Skeleton className="h-5 w-[80px]" />
              </TableHead>
              <TableHead>
                <Skeleton className="h-5 w-[100px]" />
              </TableHead>
              <TableHead>
                <Skeleton className="h-5 w-[100px]" />
              </TableHead>
              <TableHead className="text-right">
                <Skeleton className="h-5 w-[80px] ml-auto" />
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: 5 }).map((_, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Skeleton className="h-5 w-[150px]" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-5 w-[180px]" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-5 w-[100px]" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-5 w-[100px]" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-5 w-[100px]" />
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Skeleton className="h-8 w-8" />
                    <Skeleton className="h-8 w-8" />
                    <Skeleton className="h-8 w-8" />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
