import React, { useEffect, useState } from "react";
import TextYellow from "../styles/TextYellow";
import BookCard from "./featured-books-section/BookCard";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import axios from "axios";

export default function FeaturedBookList() {
  const [bookList, setBookList] = useState([]);

  useEffect(() => {
    const fetchBookList = async () => {
      try {
        const response = await axios.get("http://localhost:8001/book");
        console.log(response.data);
        setBookList(response.data);
      } catch (error) {
        console.error("Error occured while fetching bookList", error);
      }
    };
    fetchBookList();
  }, []);

  const filteredBooks = bookList.filter((book) => {
    return book.category === "free";
  });
  // from react-slick-slider
  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <>
      <div className="max-w-sm md:max-w-screen-2xl container md:px-10 ml-2 flex flex-col justify-center my-8">
        <div className="flex  flex-col gap-6  mb-8">
          <h1 className="text-xl md:text-2xl font-bold">
            Featured <TextYellow text="Books" />
          </h1>
          <p className="text-sm  md:mr-4 md:text-md">
            Welcome to our Featured Books section, where we highlight must-read
            titles that offer profound insights and captivating stories. Each
            selection is curated to inspire, educate, and entertain, ensuring a
            diverse range of genres and topics to pique your interest. Dive into
            these exceptional works and discover the brilliance of acclaimed
            authors and thought leaders.
          </p>
        </div>
        <div className="slider-container mx-8">
          <Slider {...settings}>
            {filteredBooks.map((book, index) => (
              <BookCard
                key={index}
                name={book.name}
                description={book.description}
                author={book.author}
                img={book.img}
                category={book.category}
              />
            ))}
          </Slider>
        </div>
      </div>
    </>
  );
}
