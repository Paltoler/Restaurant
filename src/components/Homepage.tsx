import { useNavigate } from "react-router-dom";
export const Homepage = () => {
  const navigate = useNavigate();

  const GoToStore = () => {
    navigate("/store");
  };

  return (
    <>
      <div className="homepage p-0 m-0">
        <div className="d-block">
          <figure className="animated-frame fade-in my-3">
            <h1 className="display-1 fw-bold text-custom mb-0">
              Flavor<span className="text-secondary">Town</span>
            </h1>
            <h2 className="display-3 homepage-header fw-bold text-uppercase mt-0">Steakhouse</h2>

            <div className="frame-animation first-animation">
              <div></div>
            </div>
            <div className="frame-animation second-animation">
              <div></div>
            </div>
          </figure>
          <div className="text-center">
            <button onClick={GoToStore} className="btn btn-lg btn-outline-light border-custom text-uppercase mt-1">
              Beställ nu
            </button>{" "}
          </div>
        </div>
      </div>
    </>
  );
};
