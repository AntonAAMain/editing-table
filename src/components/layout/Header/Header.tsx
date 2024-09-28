import cn from "classnames";

import cls from "./Header.module.scss";

export const Header = () => {
  return (
    <div className={cn(cls.container)}>
      <div className={cls.text}>
        <h1>Тестовое задание</h1>

        <h2>Frontend-разработчик Ахтырский Антон Алексеевич</h2>
      </div>
    </div>
  );
};
