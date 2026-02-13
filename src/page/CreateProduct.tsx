import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { categories } from "../utils/categories";
import productService from "../services";
import styles from "./CreateProduct.module.css";
import type { CreateProduct } from "../@types";

const initialProduct: CreateProduct = {
  name: "",
  brand: "",
  price: 0,
  category: "",
  stock: 0,
};

export default function CreateProduct() {
  const [product, setProduct] = useState<CreateProduct>(initialProduct);

  const { mutate, isPending } = useMutation({
    mutationKey: ["product"],
    mutationFn: (data: CreateProduct) =>
      productService.create(data),
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setProduct((prev) => ({
      ...prev,
      [name]: name === "price" || name === "stock"
        ? Number(value)
        : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate(product);
  };

  if (isPending) return <p>Creando producto...</p>;

  return (
    <section className={styles.container}>
      <h2 className={styles.title}>Agregar producto</h2>

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.field}>
          <label htmlFor="name">Nombre del producto</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Ej: Perfume Natura Kaiak"
            value={product.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="brand">Marca</label>
          <select
            name="brand"
            id="brand"
            value={product.brand}
            onChange={handleChange}
            required
          >
            <option value="">Seleccionar</option>
            <option value="Avon">Avon</option>
            <option value="Amodil">Amodil</option>
            <option value="Natura">Natura</option>
          </select>
        </div>

        <div className={styles.field}>
          <label htmlFor="price">Precio</label>
          <input
            type="number"
            id="price"
            name="price"
            placeholder="Ej: 15000"
            value={product.price}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="category">Categoría</label>
          <select
            name="category"
            id="category"
            value={product.category}
            onChange={handleChange}
            required
          >
            <option value="">Seleccionar</option>
            {categories.map((i, ix) => (
              <option key={ix} value={i.category}>
                {i.category}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.field}>
          <label htmlFor="stock">Stock</label>
          <input
            type="number"
            id="stock"
            name="stock"
            placeholder="Ej: 20"
            value={product.stock}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className={styles.submit}>
          Guardar producto
        </button>
      </form>
    </section>
  );
}
