import { useEffect } from "react";

const tg = window.Telegram.WebApp;

const App = () => {
  const userId = tg.initDataUnsafe.user.id;
  
  useEffect(() => {
    tg.init();
  })

  return (
    <>
      {userId}
    </>
  );
}

export default App;
