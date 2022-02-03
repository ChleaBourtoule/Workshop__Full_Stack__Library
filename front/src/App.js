import "./App.css";
import Menu from "./components/Menu";
import Home from "./components/Home";
import Authors from "./components/Authors";
import AuthorDetails from "./components/AuthorDetails";
import Books from "./components/Books";
import BookDetails from "./components/BookDetails";
import PublishingHouses from "./components/PublishingHouses";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <div className="menu">
          <Menu />
        </div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/authors" element={<Authors />} />
          <Route path="/authors/:id" element={<AuthorDetails />} />
          <Route path="/books" element={<Books />} />
          <Route path="/books/:quote" element={<BookDetails />} />
          <Route path="/publishing_houses" element={<PublishingHouses />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
