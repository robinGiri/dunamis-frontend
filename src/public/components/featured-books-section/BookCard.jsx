import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function BookCard({
  _id,
  name,
  description,
  author,
  category,
  img,
  isProfile = false,
}) {
  const [imgSrc, setImgSrc] = useState(img);
  const fallbackImage = "https://via.placeholder.com/300x400?text=No+Image";

  const truncateDescription = (text, maxLength) => {
    if (text?.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  };

  return (
    <Link to={`/course/${_id}?isProfile=${isProfile}`}>
      <div className="flex md:justify-center ml-4 md:mx-auto my-8 rounded-xl cursor-pointer">
        <div
          style={{ height: "300px" }}
          className="card dark:bg-base-100 bg-white h-5/6 md:h-full w-72 md:w-96 shadow-xl transition duration-300 ease-in-out transform hover:scale-105"
        >
          {/* Uncomment if you wish to show the image */}
          {/* <figure>
            <img
              src={imgSrc}
              alt="Book cover"
              className="object-cover w-full h-full"
              onError={() => setImgSrc(fallbackImage)}
            />
          </figure> */}
          <div className="card-body h-1/3 flex flex-col gap-4">
            <h2 className="card-title text-sm md:text-lg">
              {name}
              <div className="badge badge-secondary">{category}</div>
            </h2>
            <div className="flex flex-col justify-center mx-auto w-30">
              <p className="text-sm">{truncateDescription(description, 100)}</p>
              <button
                style={{ borderRadius: "50px" }}
                className="dark:bg-base-200 bg-slate-300 font-semibold px-2 py-1 text-xs md:px-5 md:py-2 md:text-sm border border-white hover:bg-amber-400 dark:hover:bg-yellow-500 hover:text-white"
              >
                Download
              </button>
            </div>
            <div className="card-actions justify-end items-end ml-4">
              <div className="text-xs md:text-sm">~{author}</div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
