import { useLocation, useNavigate } from "@remix-run/react";
import { useEffect, useState } from "react";

type StateData = {
  name: string;
  href: string;
  isActive: boolean;
  icon: React.ReactNode;
};

const NavbarBottom = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [activeIndex, setActiveIndex] = useState(0);

  /**
   * THIS STATE MUST IN ORDER LEFT TO RIGHT
   * AND HREF MUST MATCH ROUTE NAME
   */
  const state: StateData[] = [
    {
      name: "index",
      href: "/",
      isActive: true,
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
          />
        </svg>
      ),
    },
    {
      name: "collection",
      href: "/collection",
      isActive: false,
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
          />
        </svg>
      ),
    },
    {
      name: "stats",
      href: "/stats",
      isActive: false,
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          />
        </svg>
      ),
    },
  ];

  const bottomNavPosition = state.findIndex(
    (each) => each.href === location.pathname
  );

  useEffect(() => {
    setActiveIndex(bottomNavPosition);
  }, [location, bottomNavPosition]);

  const handleOnClick = (item: Pick<StateData, "href">, index: number) => {
    navigate(`${item.href}${location.search}`);
  };

  return (
    <div className="container sm max-w-2xl fixed bottom-0">
      <div className="btm-nav relative">
        {state.map((item, index) => {
          const className =
            index === activeIndex ? { className: "active" } : {};
          return (
            <button
              {...className}
              key={item.name}
              onClick={() => handleOnClick(item, index)}
            >
              {item.icon}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default NavbarBottom;
