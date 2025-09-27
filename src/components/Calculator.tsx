import { useState } from "react"


export const Calculator = () => {
  const [value, setValue] = useState<number>(0)
  const [history, setHistory] = useState<Array<number | string>>([]);
  const [isInAction, setIsInAction] = useState<boolean>(false);

  const handleClear = () => {
    setValue(0);
    setHistory([]);
    setIsInAction(false);
  }


  const getResult = () => {
    const sequence = history.join("");
    try {
      const result = eval(sequence);
      setIsInAction(false);
      setValue(result)
      setHistory([result])
    }
    catch (error) {
      alert(`Something went wrong!: ${error}`);
      setValue(0)
      setHistory([]);
    }
  }

  const handleClick = (value: number | string) => {
    if (value === "=") {
      getResult();
      return;
    };

    if (typeof value === "number") {
      setIsInAction(false);
      setValue(value)
    }

    if (typeof value === "string") {
      setIsInAction(true);
    }

    setHistory([...history, value])
  }


  return (
    <div className=" w-full px-10 mt-5 max-w-[427px]">
      <div className="flex bg-amber-50 text-black justify-end text-3xl rounded-md">
        <p>{isInAction ? '...' : value}</p>
      </div>
      <div className="flex">
        {history?.map((value) => {
          return <p className="pr-2">{value}</p>
        })}
      </div>
      <div className="flex flex-wrap gap-1 pt-5">

        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "+", "-", "*", "/", "="].map((value, index) => {
          return <button key={index} className="bg-amber-400 rounded-md w-[66px] py-5 " type="button" onClick={() => handleClick(value)}>{value}</button>
        })}
        <button className="bg-amber-400 rounded-md py-5 w-[66px]" onClick={handleClear}>Clear</button>
      </div>
    </div >
  )
}
