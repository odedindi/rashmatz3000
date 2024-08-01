import { Table } from '@tanstack/react-table';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DataTableViewOptions } from '../components/data-table-view-options';

import { priorities, statuses } from '../data/data';
import { DataTableFacetedFilter } from './data-table-faceted-filter';
import { CircleX, PlusIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  const router = useRouter();
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 flex-col-reverse items-start gap-y-2 sm:flex-row sm:items-center sm:space-x-2">
        <Input
          placeholder="Filter tasks..."
          value={(table.getColumn('title')?.getFilterValue() as string) ?? ''}
          onChange={(event) =>
            table.getColumn('title')?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] rounded lg:w-[250px]"
        />
        <div className="flex gap-x-2">
          {table.getColumn('status') ? (
            <DataTableFacetedFilter
              column={table.getColumn('status')}
              title="Status"
              options={statuses}
            />
          ) : null}
          {table.getColumn('priority') ? (
            <DataTableFacetedFilter
              column={table.getColumn('priority')}
              title="Priority"
              options={priorities}
            />
          ) : null}
        </div>
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 rounded px-2 lg:px-3"
          >
            Reset
            <CircleX className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <div className="flex flex-col gap-2 md:flex-row">
        <Button
          size="sm"
          className="ml-auto h-8 w-full rounded"
          title="Add New"
          onClick={() => router.push('/task/new')}
        >
          <PlusIcon className="mr-2 h-4 w-4" />
          Add New
        </Button>
        <DataTableViewOptions table={table} />
      </div>
    </div>
  );
}
