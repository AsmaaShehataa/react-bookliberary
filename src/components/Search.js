import React from 'react'
import {useState} from 'react';
import {update, search} from "../BooksApi"
import Book from './Book';
import {useNavigate} from 'react-router-dom'


const Search = () => {
    const [searchBooks, setSearchBooks] = useState([]);
    const [books, setBooks] = useState([]);
    const navigate = useNavigate()
     // on book shelf change
  const onBookUpdate = (book, shelf) => {
    // api call to update the book
    update(book, shelf);

    // check if we are updating a book in current shelf or we are adding new one from search result
    const isAdd = !book.shelf;

    // placeholder for my updated books list
    let newBooks;

    if (isAdd) {
        console.log(isAdd)
      // add new book from search result to my books and set it's shelf to the selected one
      const newBook = { ...book, shelf };
      newBooks = [...books, newBook];

      // remove this book from search result
     // let filteredItems = searchBooks.filter((b) => b.id !== book.id)
     // setSearchBooks(filteredItems.length ? filteredItems: []);
     setSearchBooks(newBooks)
    } else {
      // update currently added book from shelf to other shelf
     /* newBooks = books.map((b) => {
        if (b.id === book.id) {
          b.shelf = shelf;
        }

        return b;
      });*/
    }

    // update my books list
    //setBooks(newBooks);
  };

  // on search input change
  const onSearch = async (query) => {

    // api call to search
    const result = await search(query, 20);
    // console.log(result);

    // check if result is array before updating the search result state
    if (result && result.length) setSearchBooks(result);
    else setSearchBooks([]);
    console.log("==",searchBooks)
  };
  return (
      <div className="search-books">
        <div className="search-books-bar">
          <button
            className="close-search"
            onClick={() => {
              setSearchBooks([]);
              navigate('/')
            }}

          >
            Close
          </button>
          <div className="search-books-input-wrapper">
            {/* search input */}
            <input
              autoFocus
              type="text"
              placeholder="Search by title, author, or ISBN"
              onChange={(e) => onSearch(e.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {/* search result */}
            {searchBooks?.map((b) => (
              <li key={b.id}>
                <Book data={b} onBookUpdate={onBookUpdate} />
              </li>
            ))}
          </ol>
        </div>
      </div>
  
      
  )
}

export default Search