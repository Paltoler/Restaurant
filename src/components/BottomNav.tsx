import { useLocation, useNavigate } from "react-router-dom";

export const BottomNav = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const cancelAlert = () => {
  let text = "Din beställning kommer avslutas";
  if (confirm(text) == true) {
    text = "You pressed OK!";
    cancelMenuOrder();
  } else {
    text = "You canceled!";
  }
 }
  const cancelMenuOrder = () => {
    localStorage.clear();
    navigate("/store");
  }
  let navButton1Props, navButton2Props;

  switch (location.pathname) {
    case "/chooseside":
      navButton1Props = { text: "Avbryt", navigateTo: "/store" };
      navButton2Props = { text: "Till dryck", navigateTo: "/chooseDrink" };
      break;
    case "/cartpage":
      navButton1Props = { text: "Till meny", navigateTo: "/store" };
      navButton2Props = { text: "Till kassa", navigateTo: "/paymentpage" };
      break;
    case "/paymentpage":
      navButton1Props = { text: "Till varukorg", navigateTo: "/cartpage" };
      navButton2Props = null;
      break;
    default:
      navButton1Props = null;
      navButton2Props = null;
      break;
  }

  const navbarButtons = () => {
    if (navButton1Props && navButton1Props.text === "Avbryt" && navButton2Props){
      return (
        <>
          <button className="btn btn-lg btn-dark nav-btn shadow-lg mx-lg-5 mx-2 my-2 p-0" onClick={() => cancelAlert()}>
            {navButton1Props.text}
          </button>
          <button
            className="btn btn-lg btn-dark nav-btn shadow-lg mx-lg-5 mx-2 my-2 p-0"
            onClick={() => {
              navigate(navButton2Props.navigateTo);
            }}>
            {navButton2Props.text}
          </button>
        </>
      );
      }
    else if (navButton1Props && navButton2Props) {
      return (
        <>
          <button className="btn btn-lg btn-dark nav-btn shadow-lg mx-lg-5 mx-2 my-2 p-0" onClick={() => navigate(navButton1Props.navigateTo)}>
            {navButton1Props.text}
          </button>

          <button
            className="btn btn-lg btn-dark nav-btn shadow-lg mx-lg-5 mx-2 my-2 p-0"
            onClick={() => {
              navigate(navButton2Props.navigateTo);
            }}>
            {navButton2Props.text}
          </button>
        </>
      );
    } else if (navButton1Props && !navButton2Props) {
      return (
        <button className="btn btn-lg btn-dark nav-btn shadow-lg mx-lg-5 mx-2 my-2 p-0" onClick={() => navigate(navButton1Props.navigateTo)}>
          {navButton1Props.text}
        </button>
      );
    }
  };

  return (
    <>
        <div className="bottom-nav text-center">{navbarButtons()}</div>
    </>
  );
};
