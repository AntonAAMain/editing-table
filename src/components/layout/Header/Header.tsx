import cn from "classnames";

import cls from "./Header.module.scss";
import Image from "next/image";

export const Header = () => {
  return (
    <div className={cn(cls.container)}>
      <div className={cls.text}>
        <h1>Тестовое задание</h1>

        <h2>Frontend-разработчик Ахтырский Антон Алексеевич</h2>
      </div>

      <Image width={154} height={100} src={"/logo.svg"} alt="" />
    </div>
  );
};
