import React from 'react'
import * as BooksAPI from './BooksAPI'

class Book extends React.Component{

    render() {
        return(
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${this.props.book.imageLinks ? this.props.book.imageLinks.thumbnail : ''})` }}></div>
                    <div className="book-shelf-changer">
                        <select onChange={(event) => this.props.onShelfChange(this.props.book.id, event.target.value)}>
                            <option value="move" disabled>Move to...</option>
                            <option value="currentlyReading" selected={this.props.book.shelf === 'currentlyReading'}>Currently Reading</option>
                            <option value="wantToRead" selected={this.props.book.shelf === 'wantToRead'}>Want to Read</option>
                            <option value="read" selected={this.props.book.shelf === 'read'}>Read</option>
                            <option value="none" selected={this.props.book.shelf === 'none'}>None</option>
                        </select>
                    </div>
                </div>
                <div className="book-title">{this.props.book.title}</div>
                <div className="book-authors">{this.props.book.author}</div>
            </div>
        )
    }
}

export default Book;