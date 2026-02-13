import type { Product } from "../@types";

type Filter = {
  brand?: string;
  category?: string;
};

export const getAllProducts = async (filter?: Filter) => {
  const params = new URLSearchParams();

  if (filter?.brand) {
    params.append("brand", filter.brand);
  }

  if (filter?.category) {
    params.append("category", filter.category);
  }

  const queryString = params.toString();
  const url = queryString ? `/api/products?${queryString}` : `/api/products`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  return await response.json();
};

export const getById = async (id: string) => {
  const response = await fetch("/api/products/" + id);
  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  return await response.json();
};

export const create = async (product: Product) => {
  const response = await fetch("/api/products", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(product),
  });

  if (!response.ok) {
    throw new Error("Failed to create a new product");
  }

  return await response.json();
};

export const getAllOffers = async () => {
  try {
    const response = await fetch("/api/products/offers");

    if (!response.ok) throw new Error("Failed to find products in offers");

    return response.json();
  } catch (err) {
    if (err instanceof Error) throw new Error(err.message);
  }
};

export default { getAllProducts, getById, create, getAllOffers };
