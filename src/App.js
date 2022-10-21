import "./App.css";
import { useState, useEffect } from "react";
import Book from "./components/Book";
import { getAll, update, search } from "./BooksApi";

function App() {
  const [showSearchPage, setShowSearchpage] = useState(false);
  const [books, setBooks] = useState([]);
  const [searchBooks, setSearchBooks] = useState([]);

  // call my books list api for one time on page load
  useEffect(() => {
    const getAllBooks = async () => {
      const result = await getAll();
      setBooks(result);
      // console.log(result);
    };

    getAllBooks();
  }, []);

  // on book shelf change
  const onBookUpdate = (book, shelf) => {
    // api call to update the book
    update(book, shelf);

    // check if we are updating a book in current shelf or we are adding new one from search result
    const isAdd = !book.shelf;

    // placeholder for my updated books list
    let newBooks;

    if (isAdd) {
      // add new book from search result to my books and set it's shelf to the selected one
      const newBook = { ...book, shelf };
      newBooks = [...books, newBook];

      // remove this book from search result
      setSearchBooks(searchBooks.filter((b) => b.id !== book.id));
    } else {
      // update currently added book from shelf to other shelf
      newBooks = books.map((b) => {
        if (b.id === book.id) {
          b.shelf = shelf;
        }

        return b;
      });
    }

    // update my books list
    setBooks(newBooks);
  };

  // on search input change
  const onSearch = async (query) => {
    // api call to search
    const result = await search(query, 20);
    // console.log(result);

    // check if result is array before updating the search result state
    if (result && result.length) setSearchBooks(result);
  };

  // filter my books list by currentlyReading shelf
  const currentlyReadingBooks = books.filter(
    (b) => b.shelf === "currentlyReading"
  );

  // filter my books list by wantToRead shelf
  const wantToReadBooks = books.filter((b) => b.shelf === "wantToRead");

  // filter my books list by read shelf
  const readBooks = books.filter((b) => b.shelf === "read");

  return (
    <div className="app">
      {showSearchPage ? (
        <div className="search-books">
          <div className="search-books-bar">
            <button
              className="close-search"
              onClick={() => {
                setShowSearchpage(!showSearchPage);
                setSearchBooks([]);
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
      ) : (
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            <div>
              <div className="bookshelf">
                <h2 className="bookshelf-title">Currently Reading</h2>
                <div className="bookshelf-books">
                  <ol className="books-grid ">
                    {currentlyReadingBooks.map((b) => (
                      <li key={b.id}>
                        <Book data={b} onBookUpdate={onBookUpdate} />
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
              <hr />
              <div className="bookshelf">
                <h2 className="bookshelf-title">Want to Read</h2>
                <div className="bookshelf-books">
                  <ol className="books-grid">
                    {wantToReadBooks.map((b) => (
                      <li key={b.id}>
                        <Book data={b} onBookUpdate={onBookUpdate} />
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
              <hr />
              <div className="bookshelf">
                <h2 className="bookshelf-title">Read</h2>
                <div className="bookshelf-books">
                  <ol className="books-grid">
                    {readBooks.map((b) => (
                      <li key={b.id}>
                        <Book data={b} onBookUpdate={onBookUpdate} />
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>
          </div>
          <div className="open-search">
            <button onClick={() => setShowSearchpage(!showSearchPage)}>
              Add a book
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
