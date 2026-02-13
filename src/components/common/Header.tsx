import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from "./Header.module.css";
import logo from "/logo.png";

export const Header = () => {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // Detect scroll
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Bloquear scroll del body
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  }, [isOpen]);

  // Cerrar con ESC
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  const headerClass = `
    ${styles.header}
    ${isHome && !scrolled ? styles.transparent : styles.solid}
  `;

  const closeMenu = () => setIsOpen(false);

  return (
    <>
      <header className={headerClass}>
        <img src={logo} width={80} alt="logo" />

        <nav className={styles.nav}>
          <ul className={styles.nav__links}>
            <li><Link to="/">Inicio</Link></li>
            <li><Link to="/products">Productos</Link></li>
            <li><Link to="/cart">Carrito</Link></li>
            <li><Link to="/login">Iniciar Sesión</Link></li>
          </ul>
        </nav>

        <button
          className={`${styles.hamburger} ${isOpen ? styles.active : ""}`}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Abrir menú"
        >
          <span />
          <span />
          <span />
        </button>
      </header>

      {/* Overlay */}
      {isOpen && (
        <div className={styles.overlay} onClick={closeMenu} />
      )}

      {/* Mobile Menu */}
      <aside
        className={`${styles.mobileMenu} ${isOpen ? styles.open : ""}`}
      >
        <ul>
          <li><Link to="/" onClick={closeMenu}>Inicio</Link></li>
          <li><Link to="/products" onClick={closeMenu}>Productos</Link></li>
          <li><Link to="/cart" onClick={closeMenu}>Carrito</Link></li>
          <li><Link to="/login" onClick={closeMenu}>Iniciar Sesión</Link></li>
        </ul>
      </aside>
    </>
  );
};
