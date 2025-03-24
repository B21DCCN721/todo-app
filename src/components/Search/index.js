import { ReactComponent as IconSearch } from "../../assets/icons/search.svg";
import { useState } from "react";

function Search({onSearch}) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(search, filter)
  };
  return (
    <form className="flex" onSubmit={handleSubmit}>
      <div className="flex-1 flex items-center justify-between border rounded border-purple  
                  focus-within:outline focus-within:outline-indigo-300">
        <input
          className="outline-none mx-3 py-2 flex-1"
          placeholder="Tìm kiếm"
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <IconSearch className="mr-3" />
      </div>
      <select
        className="ml-3 bg-purple rounded text-white outline-none *:bg-white *:text-purple focus:bg-purple-2 cursor-pointer"
        value={filter}
        onChange={(e) => {
          setFilter(e.target.value);
          e.target.blur(); // Mất focus ngay sau khi chọn
        }}
      >
        <option value="all">Tất cả</option>
        <option value="complete">Hoàn thành</option>
        <option value="incomplete">Chưa hoàn thành</option>
      </select>
    </form>
  );
}

export default Search;
