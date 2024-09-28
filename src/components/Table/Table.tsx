"use client";

import cn from "classnames";

import cls from "./Table.module.scss";
import { Headers } from "./Headers/Headers";
import { Cells } from "./Cells/Cells";

export const Table = () => {
  return (
    <div className={cn(cls.container)}>
      <Headers />
      <Cells />
    </div>
  );
};
