import { useState } from "react";
import { GoSearch } from "react-icons/go";
import { toast } from "react-toastify";
import s from "./Searchbar.module.css";

export default function Searchbar({ onSubmit }) {
  const [searchQuery, setSearchQuery] = useState("");
  const handleQueryChange = (event) => {
    setSearchQuery(event.currentTarget.value.toLowerCase());
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    if (searchQuery.trim() === "") {
      toast("Enter query in the search field.");
      return;
    }
    onSubmit(searchQuery);
    setSearchQuery("");
  };
  return (
    <header className={s.searchbar}>
      <form onSubmit={handleSubmit} className={s.searchForm}>
        <button type="submit" className={s.button}>
          <span className={s.buttonLabel}>Search</span>
          <GoSearch />
        </button>

        <input
          value={searchQuery}
          onChange={handleQueryChange}
          className={s.input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
}
