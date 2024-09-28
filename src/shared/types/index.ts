export interface IHeader {
  type: "string" | "number";
  name: string;
}

export interface ICell {
  value: string;
  name: string;
  id: string;
}

export interface IRow {
  id: string;
  cells: ICell[];
}
