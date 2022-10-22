import React from 'react'
import { useState, useEffect } from "react";
import Book from "./Book";
import { getAll, update} from "../BooksApi";
import { useNavigate} from "react-router-dom";

const Home = () => {
    
        //const [showSearchPage, setShowSearchpage] = useState(false);
        const [books, setBooks] = useState([]);
        const [searchBooks, setSearchBooks] = useState([]);
        const navigate = useNavigate();
      
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
      
                  <button onClick={() =>{navigate('/search')}}>
                    Add a book
                  </button>
                  
                </div>
                
              </div>
              
            
            
            </div>
            
            
        );
      }

export default Home