import { useTableStore } from "@/shared/zustand/useTableStore";
import { useState } from "react";
import cn from "classnames";

import cls from "./Headers.module.scss";

export const Headers = () => {
  const { headers, addHeader, deleteHeader, addRow, rows, changeColumnType } =
    useTableStore();

  const [addingHeader, setAddingHeader] = useState<string>("");

  const clickAdding = () => {
    addHeader(addingHeader);

    setAddingHeader("");
  };

  const getData = () => {
    console.log("Table is - ", rows);
    alert("Смотрите в консоль");
  };

  return (
    <div className={cn(cls.container)}>
      <div className={cls.list}>
        {headers.map((header) => (
          <div className={cls.item} key={header.name}>
            {header.name}

            <button onClick={() => changeColumnType(header.name)}>
              {" "}
              {`Переключить на ${
                header.type === "number" ? "string" : "number"
              }`}{" "}
            </button>

            <button onClick={() => deleteHeader(header.name)}>Удалить</button>
          </div>
        ))}
      </div>

      <div className={cls.addingHeader}>
        <input
          value={addingHeader}
          placeholder="Имя столбца"
          onChange={(e) => setAddingHeader(e.target.value)}
          type="text"
        />

        <div className={cls.buttons}>
          <button onClick={clickAdding}>Добавить столбец</button>
          <button onClick={addRow}>Добавить строку</button>

          <button onClick={getData}>Получить данные в JSON (в консоли)</button>
        </div>
      </div>
    </div>
  );
};
