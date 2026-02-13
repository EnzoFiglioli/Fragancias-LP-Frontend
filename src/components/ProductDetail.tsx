import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { Product } from "../@types";
import productService from "../services";
import style from "./ProductDetail.module.css";
import { formatter } from "../utils/formatteRegex";
import { currencyFormatter } from "../utils/currencyFormatter";
import { useDispatch } from "react-redux";
import { addElement } from "../app/core/slice/cartSlice";
import type { AppDispatch } from "../app/core/redux/store";
import Breadcrumb from "./shared/BreadCumb";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (!id) return;

    const fetchItem = async () => {
      const response = await productService.getById(id);
      setProduct(response);
    };

    fetchItem();
  }, [id]);

  if (!product) {
    return <p style={{ color: "white" }}>Loading...</p>;
  }

  return (
    <div style={{ marginTop: "100px" }}>
      <Breadcrumb category={product.category.categoryName} />
      <div className={style.container}>
        <figure className={style.media}>
          <img
            className={style.image}
            src={product.pictures[0].url}
            alt={product.name}
            loading="lazy"
          />
        </figure>

        <section className={style.details}>
          <header className={style.header}>
            <h1 className={style.title}>{product.name}</h1>
          </header>

          <article
            className={style.description}
            dangerouslySetInnerHTML={{
              __html: formatter(product.description),
            }}
          />
          <aside
            style={{
              color: "#000",
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
              marginTop: "1rem",
              fontWeight: "600",
            }}
          >
            <span>Stock: {product.stock}</span>
            <span className={style.price}>
              {currencyFormatter(product.price)}
            </span>
          </aside>
          <div className={style.actions}>
            <button
              className={style.primary}
              onClick={() => {
                dispatch(
                  addElement({
                    id: product.id,
                    picture: {
                      url: product.pictures[0].url,
                      id: product.pictures[0].id,
                      productId: product.pictures[0].productId,
                    },
                    name: product.name,
                    price: product.price,
                    amount: 0,
                    count: 0,
                    category: "",
                    pictures: [],
                    stock: 0
                  }),
                );
              }}
            >
              Agregar al carrito
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ProductDetail;
