import { FiUserX } from "react-icons/fi";

const NotReg = () => {
  return (
    <div className="grid place-items-center text-center text-blue h-[100dvw]">
      <div className="grid place-items-center">
        <FiUserX size={50} color="#AB3434"/>
        <div>
          <strong className="text-red">Вы не зарегестрированы!</strong> 
          <br />
          Пройдите регистрацию в боте 
          <pre>Введите /start</pre>
        </div>
      </div>
    </div>
  )
}

export default NotReg