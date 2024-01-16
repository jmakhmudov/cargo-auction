import { ImFilesEmpty } from "react-icons/im";

const Empty = () => {
  return (
    <div className=" mt-16 flex flex-col items-center justify-center text-gray">
      <ImFilesEmpty size={30} />
      Нет лотов
    </div>
  )
}

export default Empty;