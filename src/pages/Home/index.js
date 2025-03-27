import DefaultLayout from "../../layouts/DefaultLayout";
import Search from "../../components/Search";
import Item from "../../components/Item";
import { ReactComponent as ImgEmpty } from "../../assets/imgs/empty.svg";
import { ReactComponent as IconAdd } from "../../assets/icons/addButton.svg";
import { useState, useEffect } from "react";
import AddItem from "../../components/Dialog/AddItem";
import useGetData from "../../hooks/useGetData";
import usePostData from "../../hooks/usePostData";
import useDeleteData from "../../hooks/useDeleteData";
import usePatchData from "../../hooks/usePatchData";

function Home() {
  //state
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [openAddItem, setOpenAddItem] = useState(false);
  const [items, setItems] = useState([]);
  const [hasDataLoaded, setHasDataLoaded] = useState(false);

  //call api
  const getData = useGetData("/");
  const postData = usePostData("/add");
  const deleteData = useDeleteData("/delete");
  const patchData = usePatchData("/update");
  const searchData = useGetData(`/search?search=${search}&filter=${filter}`);
  

  const handleSearch = (search, filter) => {
    setSearch(search);
    setFilter(filter);
  };
  useEffect(() => {
    if (searchData.data) setItems(searchData.data);
  }, [searchData.data]);
  // lấy dữ liệu về
  useEffect(() => {
    if (getData.data) {
      setItems(getData.data);
      setHasDataLoaded(true);
    }
  }, [getData.data]);

  //đổi trạng thái note
  const handleCheckChange = (id, newCheck) => {
    patchData.patchData(id, { checked: newCheck });
    setItems((prevItems) =>
      prevItems.map((item) =>
        item._id === id ? { ...item, checked: newCheck } : item
      )
    );
  };
  // xóa notenote
  const handleDelete = (id) => {
    deleteData.deleteData(id);
    setItems(items.filter((item) => item._id !== id));
  };
  // thêm notenote
  const handleApply = (hide, note) => {
    setOpenAddItem(hide);
    postData.postData({ content: note });
    setItems([
      ...items,
      { id: items.length + 1, checked: false, content: note },
    ]);
    //id: items.length > 0 ? Math.max(...items.map((item) => item.id)) + 1 : 1
  };
  // chỉnh sửa note
  const handleEdit = (id, newContent) => {
    patchData.patchData(id, { content: newContent });
  };

  return (
    <DefaultLayout>
      <div className="w-[750px] mx-auto min-h-screen">
        <h1 className="text-center font-bold pt-10 mb-5">TODO LIST</h1>
        <Search onSearch={handleSearch} />
        <div className="flex flex-col items-center divide-y divide-purple">
          {hasDataLoaded && items.length === 0 ? (
            <div className="mt-5">
              <ImgEmpty />
              <p className="text-center font-semibold mt-3">Empty...</p>
            </div>
          ) : (
            items.map((item) => (
              <Item
                key={item._id}
                id={item._id}
                checked={item.checked}
                content={item.content}
                onCheckChange={handleCheckChange}
                onDelete={handleDelete}
                onEdit={handleEdit}
              />
            ))
          )}
        </div>
        <div
          className="fixed right-1/4 bottom-10 rounded-full border border-purple hover:bg-purple-2
          w-[50px] h-[50px] bg-purple flex items-center justify-center cursor-pointer ease-in-out duration-300 hover:scale-110"
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
