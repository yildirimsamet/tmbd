const { default: Link } = require("next/link");
import styles from "./styles.module.scss";
import cn from "classnames";

const Dropdown = ({ title, dropdownList, dropdownOpenSide, color}) => {
  const directionClass =
    dropdownOpenSide === "down"
      ? styles.dropdownDown
      : styles.dropdownTop;

  return (
    <div className={styles.dropdownWrapper}>
      <div style={color && { color }} className={styles.dropdownTitle}>{title}</div>
      <div className={cn(styles.dropdownMenu, directionClass)}>
        {dropdownList.map(({ title, link }, index) => (
          <Link style={color && { color }} key={ index } className={styles.dropdownMenuItem} href={link}>
            {title}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Dropdown;
