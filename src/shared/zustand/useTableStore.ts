import { immer } from "zustand/middleware/immer";
import { create } from "zustand";
import { ICell, IHeader, IRow } from "../types";

interface StoreState {
  headers: IHeader[];

  rows: IRow[];

  addHeader: (name: string) => void;
  deleteHeader: (name: string) => void;

  updateCell: (rowId: string, cellName: string, value: string) => void;

  addRow: () => void;

  deleteRow: (rowId: string) => void;

  changeColumnType: (name: string) => void;
}

export const useTableStore = create<StoreState>()(
  immer((set, get) => ({
    headers: [
      { type: "string", name: "first" },
      { type: "string", name: "second" },
    ],

    changeColumnType: (name: string) => {
      for (let i = 0; i < get().headers.length; i++) {
        if (get().headers[i].name === name) {
          set((state) => {
            state.headers[i].type =
              get().headers[i].type === "number" ? "string" : "number";
          });
        }
      }
    },

    deleteRow: (rowId: string) => {
      set((state) => {
        state.rows = get().rows.filter((row) => row.id !== rowId);
      });
    },

    addRow: () => {
      if (get().rows.length === 5) {
        alert("Достигнуто максимальное количество строчек");
      } else {
        set((state) => {
          state.rows.push({
            id: Math.random().toString(),
            cells: [],
          });
        });
      }
    },

    addHeader: (name: string) => {
      const isExisted =
        get().headers.findIndex((header) => header.name === name) !== -1;

      if (get().headers.length === 5) {
        alert("Достигнуто максимальное количество столбцов");
      } else if (name.length === 0) {
        alert("Название столбца не может быть пустым");
      } else {
        if (!isExisted) {
          set((state) => {
            state.headers.push({
              type: "string",
              name: name.toLocaleUpperCase(),
            });
          });
        } else {
          alert("Такой столбец уже существует!");
        }
      }
    },

    deleteHeader: (name: string) => {
      set((state) => {
        state.headers = get().headers.filter((header) => header.name !== name);
      });

      for (let i = 0; i < get().rows.length; i++) {
        for (let j = 0; j < get().rows[i].cells.length; j++) {
          set((state) => {
            state.rows[i].cells = get().rows[i].cells.filter(
              (cell) => cell.name !== name
            );
          });
        }
      }
    },

    rows: [
      { id: "2", cells: [{ id: "11", value: "ss", name: "first" }] },
      { id: "3", cells: [{ id: "12", value: "sdd", name: "second" }] },
    ],

    updateCell: (rowId: string, cellName: string, value: string) => {
      set((state) => {
        state.rows.map((row) => {
          if (
            row.cells.findIndex(
              (cell) => row.id === rowId && cell.name === cellName
            ) === -1
          ) {
            if (row.id === rowId)
              row.cells.push({
                id: Math.random().toString(),
                name: cellName,
                value: value,
              });
          } else {
            row.cells.map((cell) => {
              if (row.id === rowId && cell?.name === cellName) {
                cell.value = value;

                return;
              }
            });
          }
        });
      });
    },
  }))
);
