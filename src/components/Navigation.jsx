import { Link } from "react-router-dom";
import styles from "./Navigation.module.css";

function Navigation() {
  return (
    <nav className={styles.navbar}>
      <ul className={styles.navList}>
        <li className={styles.navItem}><Link to="/">Start</Link></li>
        <li className={styles.navItem}><Link to="/about">Über</Link></li>
        <li className={styles.navItem}><Link to="/notes">Notizen</Link></li>
      </ul>
    </nav>
  );
}

export default Navigation;