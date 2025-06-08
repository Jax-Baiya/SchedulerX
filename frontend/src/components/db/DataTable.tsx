import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";

export function DataTable({ model, fields }: { model: string; fields: any[] }) {
  const [data, setData] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/v1/${model}?search=${encodeURIComponent(search)}`)
      .then((res) => res.json())
      .then((res) => {
        // Accepts array, {data: array}, or fallback to []
        if (Array.isArray(res)) setData(res);
        else if (Array.isArray(res.data)) setData(res.data);
        else setData([]);
      })
      .finally(() => setLoading(false));
  }, [model, search]);

  return (
    <div>
      <div className="flex gap-2 mb-2">
        <Input
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button onClick={() => setSearch("")}>Clear</Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead></TableHead>
            {fields.map((f) => (
              <TableHead key={f.name}>{f.name}</TableHead>
            ))}
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {(Array.isArray(data) ? data : []).map((row) => (
            <TableRow key={row.id || row[fields[0].name]}>
              <TableCell>
                <input
                  type="checkbox"
                  checked={selected.has(row.id || row[fields[0].name])}
                  onChange={() => {
                    const id = row.id || row[fields[0].name];
                    setSelected((prev) =>
                      prev.has(id)
                        ? new Set([...prev].filter((x) => x !== id))
                        : new Set(prev).add(id)
                    );
                  }}
                />
              </TableCell>
              {fields.map((f) => (
                <TableCell key={f.name}>{String(row[f.name] ?? "")}</TableCell>
              ))}
              <TableCell>
                <Button>Edit</Button>
                <Button variant="destructive">Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {loading && <div className="mt-2">Loading...</div>}
    </div>
  );
}
