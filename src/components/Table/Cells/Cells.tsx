import { useTableStore } from "@/shared/zustand/useTableStore";
import { IHeader } from "@/shared/types";
import { useEffect, useRef, useState, ChangeEvent } from "react";
import cn from "classnames";

import cls from "./Cells.module.scss";

export const Cells = () => {
  const { headers, updateCell, rows, deleteRow } = useTableStore();

  const length = rows.length;

  return (
    <div className={cn(cls.container)}>
      {rows.map((row) => (
        <div key={row.id} className={cls.line}>
          {headers.map((header, index) => (
            <Cell header={header} rowId={row.id} key={row.id + header.name} />
          ))}
          <button onClick={() => deleteRow(row.id)} className={cls.deleteBtn}>
            Удалить строку
          </button>
        </div>
      ))}
    </div>
  );
};

interface CellProps {
  rowId: string;
  header: IHeader;
}

const Cell = ({ rowId, header }: CellProps) => {
  const { rows, updateCell } = useTableStore();

  const [localValue, setLocalValue] = useState<string>(
    rows
      .find((row) => row.id === rowId)
      ?.cells?.find((cell) => cell.name === header.name)?.value === undefined
      ? ""
      : (rows
          .find((row) => row.id === rowId)
          ?.cells?.find((cell) => cell.name === header.name)?.value as string)
  );

  const ref = useRef<HTMLInputElement>(null);

  const handleBlur = () => {
    updateCell(rowId, header.name, localValue);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLocalValue(e.target.value);
  };

  return (
    <input
      ref={ref}
      className={cls.input}
      onChange={handleChange}
      onBlur={handleBlur}
      value={localValue}
      key={header.name}
      type={header.type === "number" ? "number" : "text"}
    />
  );
};
