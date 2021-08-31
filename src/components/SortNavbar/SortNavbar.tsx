import { useNavigate, useLocation } from '@reach/router';
import './SortNavbar.css';

interface Props {}

const btnData = [
  {
    name: 'Latest',
    value: '/',
  },
  {
    name: 'Alphabetical',
    value: '/alphabetical',
  },
  {
    name: 'Rating',
    value: '/rating',
  },
];

const SortNavbar = (props: Props) => {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <div className="container__sort-navbar">
      {btnData.map((btn) => {
        const className =
          location.pathname === btn.value ? 'button__sort-navbar-active' : '';
        console.log('pathname ' + location.pathname);
        console.log('btn.value ' + btn.value);
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
