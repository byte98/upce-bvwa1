import './App.css';
import Book from './components/Book';
import Example from './components/Example';

function App() {
  const books = [
    {
      id: 1,
      image: "https://www.knihydobrovsky.cz/thumbs/book-list/mod_eshop/produkty/h/harry-potter-a-kamen-mudrcu-9788000061917.jpg.webp",
      title: "Harry Potter a Kámen mudrců"
    },
    {
      id: 2,
      image: "https://www.knihydobrovsky.cz/thumbs/book-list/mod_eshop/produkty/333420609/10.jpg.webp",
      title: "Harry Potter a Tajemná komnata"
    },
    {
      id: 3,
      image: "https://www.knihydobrovsky.cz/thumbs/book-list/mod_eshop/produkty/h/harry-potter-a-vezen-z-azkabanu-9788000063393.jpg.webp",
      title: "Harry Potter a Vězeň z Azkabanu"
    }];
  return (
    <div>
      <Example></Example>
      <Book bookImage={books[0].image} bookTitle={books[0].title}></Book>
      <Book bookImage={books[1].image} bookTitle={books[1].title}></Book>
      <Book bookImage={books[2].image} bookTitle={books[2].title}></Book>
    </div>
  );
}

export default App;
