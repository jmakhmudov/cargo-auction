import { useEffect } from "react";

const tg = window.Telegram.WebApp;

const App = () => {
  const userId = tg.initDataUnsafe.user ? tg.initDataUnsafe.user.id : 'none';
  
  useEffect(() => {
    tg.ready();
  })

  return (
    <>
      {userId}
    </>
  );
}

export default App;
