import {
  useReactTable,
  createColumnHelper,
  getCoreRowModel,
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { useState } from "react";

interface Task {
  id: string;
  name: string;
  typeofexchange: string;
  createddate: boolean;
  enddate: boolean;
  status: string;
}

const DataTable: React.FC<{
  data: Task[];
  onUpdate: (task: Task) => void;
  onDelete: (id: string) => void;
}> = ({ data, onUpdate, onDelete }) => {
  const columnHelper = createColumnHelper<Task>();

  const columns = [
    columnHelper.accessor("id", {
      header: "Task",
    }),
    columnHelper.accessor("name", {
      header: "name",
    }),
    columnHelper.accessor("typeofexchange", {
      header: "typeofexchange",
    }),
    columnHelper.accessor("createddate", {
      header: "createddate",
    }),
    columnHelper.accessor("enddate", {
      header: "enddate",
      cell: (info) => (info.getValue() ? "Yes" : "No"),
    }),
    columnHelper.accessor("status", {
      header: "Created At",
    }),
    columnHelper.display({
      id: "actions",
      cell: ({ row }) => (
        <div className="flex gap-2">
          <Dialog>
            <DialogTrigger>
              <Button>Edit</Button>
            </DialogTrigger>
            <DialogContent>
              <EditForm task={row.original} onUpdate={onUpdate} />
            </DialogContent>
          </Dialog>
          <Button
            onClick={() => onDelete(row.original.id)}
            variant="destructive"
          >
            Delete
          </Button>
        </div>
      ),
    }),
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div>
      <table className="min-w-full border">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} className="border px-4 py-2">
                  {header.isPlaceholder
                    ? null
                    : typeof header.column.columnDef.header === "function"
                    ? header.column.columnDef.header(header.getContext())
                    : header.column.columnDef.header}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="border px-4 py-2">
                  {typeof cell.column.columnDef.cell === "function"
                    ? cell.column.columnDef.cell(cell.getContext())
                    : cell.column.columnDef.cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const EditForm: React.FC<{ task: Task; onUpdate: (task: Task) => void }> = ({
  task,
  onUpdate,
}) => {
  const [formData, setFormData] = useState(task);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>name</label>
      <input
        name="name"
        value={formData.name}
        onChange={handleChange}
        className="border p-1"
      />
      <label>typeofexchange</label>
      <input
        name="typeofexchange"
        value={formData.typeofexchange}
        onChange={handleChange}
        className="border p-1"
      />
      <label>createddate</label>
      <input
        name="createddate"
        value={formData.createddate ? "true" : "false"}
        onChange={handleChange}
        className="border p-1"
      />
      <Button type="submit">Update</Button>
    </form>
  );
};

export default DataTable;
