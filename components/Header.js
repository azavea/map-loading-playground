import PropTypes from "prop-types";
import styles from "/styles/Header.module.css";
import Icon from "/components/Icon";
import Link from "next/link";

import { useState } from "react";
import useDropdownMenu from "react-accessible-dropdown-menu-hook";

const links = [
  {
    text: "Github",
    permalink: "https://github.com/azavea/map-loading-playground",
  },
  {
    text: "Azavea",
    permalink: "https://azavea.com",
  },
];

const Header = () => {
  const { buttonProps, itemProps, isOpen } = useDropdownMenu(links.length);

  return (
    <div className={styles.header}>
      <div className={styles.left}>
        <Link href={`/`}>
          <a className={styles.brand}>Map Loading Playground</a>
        </Link>
      </div>
      <div className={styles.right}>
        <div className={styles.menucontainer}>
          <button
            className={`${styles.button} ${isOpen ? styles.buttonopen : ""}`}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            {...buttonProps}
          >
            <Icon name="bars" />
          </button>
          <div
            className={`${styles.menu} ${isOpen ? styles.menuopen : ""}`}
            role="menu"
          >
            {links.map((link) => (
              <a key={link.permalink} href={link.permalink}>
                {link.text}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

Header.propTypes = {};

export default Header;
