import React, { useEffect } from "react";
import "../styles.css";

const Carousel = () => {
  useEffect(() => {
    const carousel = document.querySelector("#carouselExampleDark");
    if (carousel) {
      new window.bootstrap.Carousel(carousel, {
        interval: 4000, 
        ride: "carousel", 
        pause: false, 
        wrap: true, 
      });
    }
  }, []);

  return (
    <div id="carouselExampleDark" className="carousel slide" data-bs-ride="carousel">
      <div className="carousel-indicators">
        {[...Array(4)].map((_, index) => (
          <button
            key={index}
            type="button"
            data-bs-target="#carouselExampleDark"
            data-bs-slide-to={index}
            className={index === 0 ? "active" : ""}
            aria-current={index === 0 ? "true" : "false"}
            aria-label={`Slide ${index + 1}`}
          ></button>
        ))}
      </div>

      <div className="carousel-inner">
        {[
          {
            img: "imge1.jpeg",
            title: "Easy Recipe Sharing",
            desc: "Share your favorite recipes with others easily!",
          },
          {
            img: "img2.jpg",
            title: "Categorized Recipes",
            desc: "Filter recipes by categories such as Veg, Non-Veg, and Meal Type.",
          },
          {
            img: "imge3.webp",
            title: "Real-Time Updates",
            desc: "See the latest recipes as soon as they are added!",
          },
          {
            img: "img5.webp",
            title: "Recipe Bookmarking",
            desc: "Save your favorite recipes for easy access.",
          },
        ].map((slide, index) => (
          <div key={index} className={`carousel-item ${index === 0 ? "active" : ""}`}>
            <img src={slide.img} className="d-block w-100" alt={slide.title} />
            <div className="carousel-caption">
              <h5>{slide.title}</h5>
              <p>{slide.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default Carousel;
