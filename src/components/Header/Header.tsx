import style from "./Header.module.css";

export const Header = () => {
  return (
    <>
      <header className="header">
        <img
          src="./assets/pokeball.svg"
          alt="Imagen pokeball"
          className={style["header__imagen"]}
        />
        <h1 className={style["header__h1"]}>Pokédex</h1>
      </header>
    </>
  );
};
