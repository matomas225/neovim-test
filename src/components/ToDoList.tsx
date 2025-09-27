import { useState, type ChangeEvent, type KeyboardEvent } from "react"

export const ToDoList = () => {
  const [items, setItems] = useState<Array<string>>([]);
  const [inputValue, setInputValue] = useState<string>("");

  const deleteItem = (index: number) => {
    const itemsWithRemovedItem = items.filter((_, i) => i !== index)

    setItems(itemsWithRemovedItem);
  }

  const handleAddItem = () => {
    if (inputValue === "") {
      alert("Can't add empty items")
      return
    }
    setItems([...items, inputValue])
    setInputValue("");
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    const eventValue = e.target.value;

    if (typeof eventValue === "string") {
      setInputValue(eventValue)
    }
  }

  const addItemOnEnter = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleAddItem();
    }
  }

  return (
    <div className="mt-18 flex flex-col items-center mb-18">
      <h2 className="font-bold text-2xl">This is ToDo List</h2>
      <p>(i know so boring)</p>
      <p>NOTE: Reload resets state</p>
      <div className="flex mt-5 ">
        <input className="bg-amber-50 min-w-80 placeholder-amber-950 text-amber-950 py-2 rounded-md rounded-r-none pl-2" placeholder="Write what you want to do..." onChange={(e) => handleInputChange(e)} value={inputValue} onKeyDown={(e) => addItemOnEnter(e)} />
        <button className="bg-amber-50 rounded-r-md px-2 hover:bg-amber-100" onClick={() => handleAddItem()}>✏️</button>
      </div>
      <div>
        {items?.map((item, i) => {
          return (
            <div className="bg-amber-100  flex w-full min-w-100 gap-2 items-center my-2 py-1 px-2 rounded-md" key={i}>
              <p className=" w-full flex-wrap  text-amber-950 mr-2">{i + 1}. {item}</p>
              <input type="checkbox" className="cursor-pointer" />
              <button className="text-red-600 cursor-pointer" onClick={() => deleteItem(i)}>❌</button>
            </div>)
        })}
      </div>
    </div>
  )
}
