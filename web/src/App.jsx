import { useEffect } from "react";

const tg = window.Telegram.WebApp;

const App = () => {

  useEffect(() => {
    tg.ready();
  })

  return (
    <>

    </>
  );
}

export default App;
