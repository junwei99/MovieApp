import { useNavigate, useLocation } from "@reach/router";
import useWindowSize from "../../hooks/useWindowSize";
import "./SortNavbar.css";

interface Props {}

const btnData: { name: string; value: string }[] = [
  {
    name: "Popular",
    value: "/",
  },
  {
    name: "Upcoming",
    value: "/upcoming",
  },
  {
    name: "Now Playing",
    value: "/nowplaying",
  },
  {
    name: "Top Rated",
    value: "/rating",
  },
];

const SortNavbar = (props: Props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const windowSize = useWindowSize();

  return (
    <div
      className={`container__sort-navbar${
        windowSize.width > 560 ? " desktop-navbar" : ""
      }`}
    >
      {btnData.map((btn) => {
        const className =
          location.pathname === btn.value ? "button__sort-navbar-active" : "";
        return (
          <button
            className={`button__sort-navbar ${className}`}
            key={btn.value}
            onClick={(e) => {
              navigate(`${btn.value}`, { replace: true });
            }}
          >
            {btn.name}
          </button>
        );
      })}
    </div>
  );
};

export default SortNavbar;
