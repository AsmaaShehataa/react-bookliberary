import React from "react";

const Book = ({ data, onBookUpdate = () => null }) => {
  return (
    <div className="book">
      <div className="book-top">
        <div
          className="book-cover"
          style={{
            width: 128,
            height: 193,
            backgroundImage: `url("${data?.imageLinks ? data.imageLinks.thumbnail: ''}")`,
          }}
        ></div>
        <div className="book-shelf-changer">
          <select
            value={data?.shelf || "none"}
            onChange={(e) => onBookUpdate(data, e.target.value)}
          >
            <option value="none" disabled>
              Move to...
            </option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            <option value="none">None</option>
          </select>
        </div>
      </div>
      <div className="book-title">{data.title}</div>
      <div className="book-authors">{data.authors?.join(", ")}</div>
    </div>
  );
};

export default Book;
