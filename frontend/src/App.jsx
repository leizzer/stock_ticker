import { useState } from "react";
import Table from "./components/table";
import "./App.css";

function App() {
  const [query, setQuery] = useState("");
  const [stockName, setStockName] = useState();

  const handleChange = (e) => {
    setQuery(e.target.value.toUpperCase());
  };

  const handleSubmit = (form) => {
    form.preventDefault();
    setStockName(form.target.query.value);
  };

  return (
    <>
      <form id="search" onSubmit={handleSubmit}>
        <label>
          Enter a Stock Ticker
          <input
            type="text"
            name="query"
            value={query}
            onChange={handleChange}
          />
          <input type="submit" value="Search" />
        </label>
      </form>

      <Table stock={stockName} />
    </>
  );
}

export default App;
