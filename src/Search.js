import React from 'react'
import { Link } from 'react-router-dom'
import Book from './Book'
import * as BooksAPI from './BooksAPI'

class Search extends React.Component {
    state = {
        books: [],
        booksOnShelf: []
    }

    onSearchQueryChange = (query) => {
        BooksAPI.search(query).then((books) => {
            if(query === '' || Array.isArray(books) === false){
                books = []
            }
            let newBooks = books.map((book) => {
                const index = this.state.booksOnShelf.findIndex(s => s.id === book.id)
                if(this.state.booksOnShelf[index]){
                    book.shelf = this.state.booksOnShelf[index].shelf
                }else{
                    book.shelf = 'none'
                }
                return book
            })
            this.setState((state) => ({
                ...state,
                books: newBooks
            }))
        })
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
                ...state,
                books: newBooks
            }
        })
        BooksAPI.update({id: id},value)
    }

    componentDidMount() {
        BooksAPI.getAll()
        .then(books => {
            this.setState((state) => ({
                ...state,
                booksOnShelf: books
            }))
        })
    }

    render() {
        return (
            <div className="search-books">
            {console.log('books array is: ', this.state.books)}
                <div className="search-books-bar">
                    <Link 
                        className="close-search"
                        to = '/'/>
                    <div className="search-books-input-wrapper">
                    <input
                        type="text"
                        placeholder="Search by title or author"
                        onChange={(event) => this.onSearchQueryChange(event.target.value)} />
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid"></ol>
                    {this.state.books.map((book)=> (
                      <li key={book.id}>
                        <Book book={book} onShelfChange={this.onBookShelfChange}/>
                      </li>
                    ))}
                </div>
            </div>
        )
    }
}

export default Search