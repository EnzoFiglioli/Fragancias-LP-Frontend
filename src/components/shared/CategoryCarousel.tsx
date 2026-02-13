import { useRef } from "react";
import cardStyles from "./CategoryCarousel.module.css";

type Props = {
  categories: {
    category: string;
    image: string;
  }[];
};

export default function CategoryCarousel({ categories }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;

    const scrollAmount = 300;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <section className={cardStyles.carouselWrapper}>
      <button
        className={cardStyles.scrollButton}
        onClick={() => scroll("left")}
      >
        ◀
      </button>

      <div ref={scrollRef} className={cardStyles.carouselTrack}>
        {categories.map((c, ix) => (
          <article key={ix} className={cardStyles.categoryCard} onClick={()=> window.location.href = `/products?category=${c.category}`}>
            <div className={cardStyles.cardImage}>
              <img src={c.image} alt={c.category} />
            </div>
            <h3 className={cardStyles.cardTitle}>{c.category}</h3>
          </article>
        ))}
      </div>

      <button
        className={cardStyles.scrollButton}
        onClick={() => scroll("right")}
      >
        ▶
      </button>
    </section>
  );
}
