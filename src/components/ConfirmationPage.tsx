import { Timer } from "./Timer";
import { Header } from "./Header";

export const ConfirmationPage = () => {
  const orderNumber = random();

  function random() {
    const min = 1000;
    const max = 9999;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  return (
    <>
      <div className="container-fluid max-width text-center p-sm-5 p-3 my-5 pb-5">
        <Header />
        <div className="row justify-content-center align-items-center">
          <h2 className="mb-4 fw-normal">Tack för din beställning (❁´◡`❁)</h2>
          <h4 className="mb-5 fw-normal">
            Vi påbörjar din beställning straxt!
          </h4>
          <div className="order-number-container mb-5">
            <h4>Ditt ordernummer:</h4>
            <div className="display-4 mt-5">
              <strong>#{orderNumber}</strong>
            </div>
          </div>
          <Timer />
        </div>
      </div>
    </>
  );
};
