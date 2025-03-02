import React, { useEffect, useState } from "react";
import TextYellow from "../styles/TextYellow";
import BookCard from "./featured-books-section/BookCard";
import Slider from "react-slick";
import axios from "axios";

// Import the slick-carousel CSS files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function FeaturedBookList() {
  const [bookList, setBookList] = useState([]);

  useEffect(() => {
    const fetchBookList = async () => {
      try {
        // Use your backend API endpoint for fetching courses
        const response = await axios.get("http://localhost:3000/api/v1/course/getAllCourse");
        console.log("Fetched books:", response.data);
        // Set bookList with the returned data
        setBookList(response.data.data);
      } catch (error) {
        console.error("Error occurred while fetching bookList", error);
      }
    };
    fetchBookList();
  }, []);

  // Filter books to only show free courses (change the field as needed)
  const filteredBooks = bookList.filter((book) => book.type === "free");

  // Slider settings for react-slick
  const settings = {
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
    <div className="max-w-sm md:max-w-screen-2xl container md:px-10 ml-2 flex flex-col justify-center my-8">
      <div className="flex flex-col gap-6 mb-8">
        <h1 className="text-xl md:text-2xl font-bold">
          Featured <TextYellow text="Books" />
        </h1>
        <p className="text-sm md:mr-4 md:text-md">
          Welcome to our Featured Books section, where we highlight must-read titles that offer profound insights and captivating stories.
          Dive into these exceptional works and discover the brilliance of acclaimed authors and thought leaders.
        </p>
      </div>
      <div className="slider-container mx-8">
        <Slider {...settings}>
          {filteredBooks.map((book, index) => (
            <BookCard
              key={index}
              _id={book._id}
              name={book.courseName}
              description={book.description}
              author={book.author}
              img={book.img}
              category={book.type}
            />
          ))}
        </Slider>
      </div>
    </div>
  );
}
