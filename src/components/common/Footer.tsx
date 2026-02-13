import styles from "./Footer.module.css";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <section className={styles.brand}>
          <h3 style={{color:"white"}}>FraganciasLP</h3>
          <p>
            Perfumes y fragancias originales para cada estilo y ocasión.
          </p>
        </section>

        <section className={styles.links}>
          <h4>Navegación</h4>
          <ul>
            <li><Link to="/">Inicio</Link></li>
            <li><Link to="/products">Productos</Link></li>
            <li><Link to="/categories">Categorías</Link></li>
            <li><Link to="/cart">Carrito</Link></li>
            <li><Link to="/create">Agregar</Link></li>
          </ul>
        </section>

        {/* Confianza / info */}
        <section className={styles.info}>
          <h4>Información</h4>
          <ul>
            <li>Productos originales</li>
            <li>Envíos a todo el país</li>
            <li>Pago seguro</li>
          </ul>
        </section>
      </div>

      {/* Copyright */}
      <div className={styles.copy}>
        <p>Desarrollado por <a href="https://enzo-figlioli.vercel.app/" target="__blank">Enzo Figlioli</a></p>
        <p>
          © {new Date().getFullYear()} FraganceStore. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
};
