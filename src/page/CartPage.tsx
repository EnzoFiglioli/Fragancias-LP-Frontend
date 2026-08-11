import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../app/core/redux/store";

import { handlerSum } from "../utils/handlers/handlerSum";
import { currencyFormatter } from "../utils/currencyFormatter";
import { whatsappUrl } from "../utils/handlers/handlerWhatsapp";
import type { ProductCart } from "../@types";

import whatsapp from "/WhatsApp.svg.webp";
import { useState } from "react";
import { updateAmount } from "../app/core/slice/cartSlice";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import styles from "./CartPage.module.css";
import EmptyCart from "../components/EmptyCart";

const phone = "";

const CartPage = () => {
  const cartList = useSelector((state: RootState) => state.cart);
  const [disabled] = useState(true);
  const dispatch = useDispatch();

  const total = handlerSum(
    ...cartList.map((item: ProductCart) => item.price * item.amount),
  );

  const message = (() => {
    let msg = "Hola Lili 👋\n\n";
    msg += "Te encargo los siguientes productos:\n\n";

    msg += cartList
      .map(
        (item: ProductCart) =>
          `• ${item.name} x${item.amount} - ${currencyFormatter(item.price)}`,
      )
      .join("\n");

    msg += `\n\nTOTAL: ${currencyFormatter(total)}`;

    return msg;
  })();

  if (cartList.length === 0) {
    return <EmptyCart />;
  }

  return (
    <motion.main
      className={styles.cartContainer}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <h2 className={styles.pageTitle}>Carrito</h2>

      <section className={styles.cartList} aria-live="polite">
        {cartList.map((item: ProductCart) => (
          <article key={item.id} className={styles.cartItem}>
            <img
              className={styles.itemImage}
              src={item.picture.url}
              alt={item.name}
            />

            <div className={styles.itemInfo}>
              <p className={styles.itemName}>{item.name}</p>
            </div>

            <div className={styles.itemPrice}>{currencyFormatter(item.price)}</div>

            <div className={styles.qtyControls}>
              <button
                aria-label={`Disminuir cantidad de ${item.name}`}
                onClick={() => dispatch(updateAmount({ id: item.id, type: "DECREASE" }))}
                style={{ opacity: item.amount > 0 ? 1 : 0.5 }}
              >
                -
              </button>

              <div className={styles.qtyCount} aria-live="off">{item.amount}</div>

              <button
                aria-label={`Aumentar cantidad de ${item.name}`}
                onClick={() => dispatch(updateAmount({ id: item.id, type: "INCREASE" }))}
              >
                +
              </button>
            </div>
          </article>
        ))}
      </section>

      <section className={styles.totalSection}>
        <div>
          <div className={styles.totalLabel}>TOTAL</div>
          <div>{currencyFormatter(total)}</div>
        </div>

        <button
          className={styles.checkoutBtn}
          disabled={disabled}
          aria-disabled={disabled}
          onClick={() => window.open(whatsappUrl(phone, message), "_blank")}
          title={disabled ? "Disponible en próximas versiones" : "Encargar por WhatsApp"}
        >
          <img src={whatsapp} alt="WhatsApp" width={18} height={18} />
          Encargar por WhatsApp
        </button>
      </section>
    </motion.main>
  );
};

export default CartPage;
