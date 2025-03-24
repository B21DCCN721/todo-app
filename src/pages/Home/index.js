import DefaultLayout from "../../layouts/DefaultLayout";
import Search from "../../components/Search";
import Item from "../../components/Item";
import { ReactComponent as IconAdd } from "../../assets/icons/addButton.svg";
import { useState } from "react";
import AddItem from "../../components/Dialog/AddItem";

function Home() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [openAddItem, setOpenAddItem] = useState(false);
  const [newNote, setNewNote] = useState("");
  const handleSearch = (search, filter) => {
    setSearch(search);
    setFilter(filter);
  };
  console.log('tim kiem:', search, 'filter:', filter);
  
  const [items, setItems] = useState([
    { id: 1, checked: false, content: "abc" },
    { id: 2, checked: false, content: "def" },
  ]);

  const handleCheckChange = (id, newCheck) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, checked: newCheck } : item
      )
    );
  };
  const handleDelete = (id) => {
    setItems(items.filter((item) => item.id !== id));
  }
  const handleApply = (hide, note) => {
    setOpenAddItem(hide);
    setNewNote(note);
    setItems([...items, { id: items.length + 1, checked: false, content: note }]);
    //id: items.length > 0 ? Math.max(...items.map((item) => item.id)) + 1 : 1
  }
  const handleEdit = (id, newContent) => {
    console.log(id, newContent);
    
  }
  
  return (
    <DefaultLayout>
      <div className="w-[750px] mx-auto min-h-screen">
        <h1 className="text-center font-bold pt-10 mb-5">TODO LIST</h1>
        <Search onSearch={handleSearch} />
        <div className="flex flex-col items-center divide-y divide-purple">
          {items.map((item) => (
            <Item
              key={item.id}
              id={item.id}
              checked={item.checked}
              content={item.content}
              onCheckChange={handleCheckChange}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          ))}
        </div>
        <div
          className="fixed right-1/4 bottom-10 rounded-full border border-purple hover:bg-purple-2 w-[50px] h-[50px] bg-purple flex items-center justify-center cursor-pointer"
          onClick={() => setOpenAddItem(true)}
        >
          <IconAdd />
        </div>
        {openAddItem && (
          <AddItem
            hide={openAddItem}
            cancel={setOpenAddItem}
            apply={handleApply}
          />
        )}
      </div>
    </DefaultLayout>
  );
}

export default Home;
