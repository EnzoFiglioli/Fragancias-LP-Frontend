import React from "react";
import { Link } from "react-router-dom";
import styles from "./EmptyCart.module.css";

type Props = {
  title?: string;
  description?: string;
  homeLink?: string;
};

const EmptyCart: React.FC<Props> = ({
  title = "Tu carrito está vacío",
  description = "Agrega productos para verlos aquí. Encontrá tus fragancias favoritas y sorprende a alguien (o a vos mismo).",
  homeLink = "/",
}) => {
  return (
    <section className={styles.emptyRoot} aria-live="polite">
      <div className={styles.emptyInner} role="status">
        <div className={styles.icon} aria-hidden>
          🛒
        </div>

        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>

        <div className={styles.actions}>
          <Link to={homeLink} className={styles.primaryBtn} aria-label="Seguir comprando">
            Seguir comprando
          </Link>

          <Link to="/" className={styles.secondaryBtn} aria-label="Ver ofertas">
            Ver ofertas
          </Link>
        </div>
      </div>
    </section>
  );
};

export default EmptyCart;
