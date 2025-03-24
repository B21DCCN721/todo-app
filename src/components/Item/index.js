import { useState } from "react";
import { ReactComponent as IconPen } from "../../assets/icons/pen.svg";
import { ReactComponent as IconTrash } from "../../assets/icons/trash.svg";

function Item({
  id,
  checked,
  onCheckChange,
  content,
  onDelete = () => {},
  onEdit = () => {},
}) {
  const [text, setText] = useState(content);
  const [isEditing, setIsEditing] = useState(false);
  const handleChangeCheckBox = () => {
    onCheckChange(id, !checked);
  };
  const handleEditItem = () => {
    setIsEditing(true);
  };
  return (
    <div className="w-4/5 h-14 flex items-center text-wrap truncate text-xl font-semiBold *:cursor-pointer *:mx-2">
      <input
        className="w-[20px] h-[20px] rounded border border-purple checked:bg-purple"
        id={id}
        type="checkbox"
        checked={checked}
        onChange={handleChangeCheckBox}
      />
      <div className={`${checked === true ? "line-through" : ""} flex-1`}>
        {isEditing ? (
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onBlur={() => {
              setIsEditing(false);
              onEdit(id, text);
            }}
            autoFocus
            className="outline-none w-full bg-gray-100 p-1"
          />
        ) : (
          <p className="w-full text-start">{text}</p>
        )}
      </div>
      <IconPen
        className="hover:text-purple fill-current"
        onClick={handleEditItem}
      />
      <IconTrash
        className="hover:text-red-500 fill-current"
        onClick={() => onDelete(id)}
      />
    </div>
  );
}

export default Item;
