import { VscLoading } from "react-icons/vsc";

const Loading = () => {
  return (
    <div className=" mt-16 flex flex-col items-center justify-center text-gray">
      <VscLoading size={24} className='rotate-360 animate-spin cursor-pointer' />
      Загрузка...
    </div>
  )
}

export default Loading;