import React from 'react'
import './App.css'
import Book from './Book'
import Search from './Search';
import { Link, Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'

class BooksApp extends React.Component {
  state = {
    books: []
  }

  onBookShelfChange = (id, value) => {
    this.setState((state) => {
      const newBooks = state.books.map((book) => {
        if(book.id === id){
          book.shelf = value
        }
        return book
      })
      return {
        books: newBooks
      }
    })
    BooksAPI.update({id: id},value)
  }

  componentDidMount() {
    BooksAPI.getAll()
    .then(books => {
      this.setState({
        books: books
      })
    })
  }

  render() {
    return (
      <div className="app">
        <Route path='/search' component={Search}/>
        <Route exact path='/' render={({history}) => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Currently Reading</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                    {this.state.books.filter((book) => (book.shelf === 'currentlyReading')).map((book)=> (
                      <li key={book.id}>
                        <Book book={book} onShelfChange={this.onBookShelfChange}/>
                      </li>
                    ))}
                    </ol>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Want to Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                    {this.state.books.filter((book) => (book.shelf === 'wantToRead')).map((book)=> (
                      <li key={book.id}>
                        <Book book={book} onShelfChange={this.onBookShelfChange}/>
                      </li>
                    ))}
                    </ol>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                    {this.state.books.filter((book) => (book.shelf === 'read')).map((book)=> (
                      <li key={book.id}>
                        <Book book={book} onShelfChange={this.onBookShelfChange}/>
                      </li>
                    ))}
                    </ol>
                  </div>
                </div>
              </div>
            </div>
            <div className="open-search">
              <Link
                to = '/search'
                className='open-search'
              >Add a book</Link>
            </div>
          </div>
        )}/>
      </div>
    )
  }
}

export default BooksApp
