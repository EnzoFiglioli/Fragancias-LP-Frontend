import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import type { RootState } from "../app/core/redux/store";

import { handlerSum } from "../utils/handlers/handlerSum";
import { currencyFormatter } from "../utils/currencyFormatter";
import { whatsappUrl } from "../utils/handlers/handlerWhatsapp";
import type { ProductCart } from "../@types";

import whatsapp from "/WhatsApp.svg.webp";
import { useState } from "react";
import { updateAmount } from "../app/core/slice/cartSlice";
import { motion } from "framer-motion";

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
    return (
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        style={{
          maxWidth: "640px",
          margin: "40px auto",
          padding: "32px 24px",
          borderRadius: "28px",
          background: "linear-gradient(135deg, #fffaf7 0%, #f4efe8 100%)",
          boxShadow: "0 24px 50px rgba(103, 73, 49, 0.12)",
          textAlign: "center",
          border: "1px solid rgba(130, 100, 80, 0.08)",
        }}
      >
        <div
          style={{
            width: "120px",
            height: "120px",
            margin: "0 auto 18px",
            display: "grid",
            placeItems: "center",
            borderRadius: "32px",
            background: "linear-gradient(135deg, #c9a381 0%, #7d5541 100%)",
            boxShadow: "0 20px 36px rgba(125, 85, 65, 0.24)",
            color: "#fff",
            fontSize: "3.2rem",
          }}
          aria-label="Carrito vacío"
        >
          🛍️
        </div>

        <p
          style={{
            margin: "0 0 10px",
            color: "#8b6b55",
            fontSize: "0.82rem",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            fontWeight: 700,
          }}
        >
          Tu carrito
        </p>

        <h2
          style={{
            margin: "0 0 14px",
            color: "#2d211c",
            fontSize: "clamp(2rem, 4vw, 2.7rem)",
            lineHeight: 1.1,
          }}
        >
          Está vacío por ahora
        </h2>

        <p
          style={{
            margin: "0 auto 28px",
            maxWidth: "440px",
            color: "#5d4b42",
            fontSize: "1.05rem",
            lineHeight: 1.7,
          }}
        >
          Descubrí nuestras fragancias y agregá tus favoritos para armar tu pedido
          perfecto.
        </p>

        <Link
          to="/products"
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "14px 24px",
            borderRadius: "999px",
            background: "linear-gradient(135deg, #b3835d 0%, #7b4d38 100%)",
            color: "#fff",
            textDecoration: "none",
            fontWeight: 700,
            boxShadow: "0 16px 28px rgba(123, 77, 56, 0.24)",
          }}
        >
          Ver fragancias
        </Link>
      </motion.section>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <h2>Carrito</h2>

      <section>
        {cartList.map((item: ProductCart) => (
          <article
            key={item.id}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "8px 0",
            }}
          >
            <img
              src={item.picture.url}
              alt={item.name}
              style={{ width: "50px", height: "50px" }}
            />

            <p style={{ flex: 1, marginLeft: "10px" }}>{item.name}</p>

            <p>{currencyFormatter(item.price)}</p>

            <div>
              <button
                style={{
                  opacity: item.amount > 0 ? "1" : "0.5",
                }}
                onClick={() =>
                  dispatch(updateAmount({ id: item.id, type: "DECREASE" }))
                }
              >
                -
              </button>
              <span style={{ margin: "0 10px" }}>{item.amount}</span>
              <button
                onClick={() =>
                  dispatch(updateAmount({ id: item.id, type: "INCREASE" }))
                }
              >
                +
              </button>
            </div>
          </article>
        ))}
      </section>

      <section style={{ marginTop: "20px" }}>
        <h4
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span>TOTAL</span>
          <span>{currencyFormatter(total)}</span>

          <button
            disabled
            style={{
              opacity: disabled ? "0.3" : "1",
              backgroundColor: "#26ac53",
              color: "#fff",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "8px 12px",
              borderRadius: "6px",
              border: "none",
              cursor: "pointer",
            }}
            onClick={() => window.open(whatsappUrl(phone, message), "_blank")}
          >
            <img src={whatsapp} alt="WhatsApp" width={20} height={20} />
            Encargar por WhatsApp
          </button>
        </h4>
      </section>
    </motion.div>
  );
};

export default CartPage;
