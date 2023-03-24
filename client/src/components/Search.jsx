import React  from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlassDollar } from "@fortawesome/free-solid-svg-icons";

export default function Search(props) {
  const {searchKey, setSearchKey, searchItems } = props;
  return (
    <>
      <input
        type="search"
        className="form-control"
        onChange={(e) => setSearchKey(e.target.value)}
        placeholder="Find Items"
        id="search-bar"
        value={searchKey}
      />
      <button type="submit" onClick={searchItems} className="search-icon">
        <FontAwesomeIcon icon={faMagnifyingGlassDollar} />
      </button>
    </>
  );
}
