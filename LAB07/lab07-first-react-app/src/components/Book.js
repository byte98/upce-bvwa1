import './Book.css';
import OrderButton from './OrderButton';

const Book = (props) => {
    return (
        <div className='Book'>
            <h2 className='book'>{props.bookTitle}</h2>
            <img src={props.bookImage}></img>
            <OrderButton></OrderButton>
        </div>
    );
};

export default Book;
