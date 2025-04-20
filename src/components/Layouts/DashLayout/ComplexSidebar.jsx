import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
function ComplexSidebar() {
  const [role, setRole] = useState(null);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname) {
      const currentRole = location.pathname.split("/")[2];
      setRole(currentRole);
    }
  }, [location.pathname]);

  const menuItems = {
    admin: [
      {
        group: "Workout",
        items: [
          { label: "Workout Plan", link: "/dashboard/admin/workoutplan" },
          {
            label: "Manage Workout Plan",
            link: "/dashboard/admin/manageworkoutplan",
          },
          {
            label: "Manage Workout Log",
            link: "/dashboard/admin/manageworkoutlog",
          },
          { label: "Manage Activity", link: "/dashboard/admin/manageactivity" },
        ],
      },
      {
        group: "Diet",
        items: [
          { label: "Diet Plan", link: "/dashboard/admin/dietplan" },
          {
            label: "Manage Diet Plan",
            link: "/dashboard/admin/managedietplan",
          },
          {
            label: "Manage Food Catalogue",
            link: "/dashboard/admin/managefoodcatalogue",
          },
          { label: "Manage Food Log", link: "/dashboard/admin/managefoodlog" },
        ],
      },
      {
        group: "Shop",
        items: [
          { label: "Shop", link: "/dashboard/admin/shop" },
          { label: "Orders", link: "/dashboard/admin/orders" },
          { label: "Wishlist", link: "/dashboard/admin/wishlist" },
          { label: "Cart", link: "/dashboard/admin/cart" },
        ],
      },
      {
        group: "Personal",
        items: [
          { label: "Personal Record", link: "/dashboard/admin/personalrecord" },
          { label: "Settings", link: "/dashboard/admin/settings" },
        ],
      },
      {
        group: "Manage",
        items: [
          { label: "Manage Orders", link: "/dashboard/admin/manageorders" },
          { label: "Manage Products", link: "/dashboard/admin/manageproducts" },
          { label: "Manage Users", link: "/dashboard/admin/manageusers" },
        ],
      },
      {
        group: "Integration",
        items: [{ label: "Integration", link: "/dashboard/admin/integration" }],
      },
    ],
    vendor: [
      {
        group: "Workout",
        items: [
          { label: "Workout Plan", link: "/dashboard/vendor/workoutplan" },
        ],
      },
      {
        group: "Diet",
        items: [{ label: "Diet Plan", link: "/dashboard/vendor/dietplan" }],
      },
      {
        group: "Shop",
        items: [
          { label: "Shop", link: "/dashboard/vendor/shop" },
          { label: "Orders", link: "/dashboard/vendor/orders" },
          { label: "Wishlist", link: "/dashboard/vendor/wishlist" },
          { label: "Cart", link: "/dashboard/vendor/cart" },
        ],
      },
      {
        group: "Personal",
        items: [
          {
            label: "Personal Record",
            link: "/dashboard/vendor/personalrecord",
          },
          { label: "Settings", link: "/dashboard/vendor/settings" },
        ],
      },
      {
        group: "Manage",
        items: [
          { label: "Manage Orders", link: "/dashboard/vendor/manageorders" },
          {
            label: "Manage Products",
            link: "/dashboard/vendor/manageproducts",
          },
        ],
      },
    ],
    user: [
      {
        group: "Workout",
        items: [{ label: "Workout Plan", link: "/dashboard/user/workoutplan" }],
      },
      {
        group: "Diet",
        items: [{ label: "Diet Plan", link: "/dashboard/user/dietplan" }],
      },
      {
        group: "Shop",
        items: [
          { label: "Shop", link: "/dashboard/user/shop" },
          { label: "Orders", link: "/dashboard/user/orders" },
          { label: "Wishlist", link: "/dashboard/user/wishlist" },
          { label: "Cart", link: "/dashboard/user/cart" },
        ],
      },
      {
        group: "Personal",
        items: [
          { label: "Personal Record", link: "/dashboard/user/personalrecord" },
          { label: "Settings", link: "/dashboard/user/settings" },
        ],
      },
    ],
  };
  const currentMenuItems = menuItems[role] || [];

  return (
    <div className="deznav">
      <div className="deznav-scroll">
        <ul className="metismenu" id="menu">
          {currentMenuItems.map((group, index) => (
            <li key={index}>
              <Link
                className="has-arrow ai-icon"
                href="javascript:void()"
                aria-expanded="false"
              >
                <i className="flaticon-381-networking" />
                <span className="nav-text">{group.group}</span>
              </Link>
              <ul aria-expanded="false">
                {group.items.map((item, subIndex) => (
                  <li key={subIndex}>
                    <Link to={item.link}>
                      <span className="nav-text">{item.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          ))}
          {/* <li>
            <a
              className="has-arrow ai-icon"
              href="javascript:void()"
              aria-expanded="false"
            >
              <i className="flaticon-381-networking" />
              <span className="nav-text">Dashboard</span>
            </a>
            <ul aria-expanded="false">
              <li>
                <a href="index.html">Dashboard</a>
              </li>
            </ul>
          </li> */}
        </ul>
        <div className="drum-box">
          <img src="images/card/drump.png" alt />
          <p className="fs-18 font-w500 mb-4">Start Plan Your Workout</p>
          <a className href="javascript:;">
            Check schedule
            <svg
              className="ms-3"
              width={6}
              height={12}
              viewBox="0 0 6 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M0 12L6 6L0 0" fill="#BCD7FF" />
            </svg>
          </a>
        </div>
        <div className="copyright">
          <p>
            <strong>Fito Fitness Admin Dashboard</strong> © 2023 All Rights
            Reserved
          </p>
          <p>
            Made with <span className="heart" /> by DexignZone
          </p>
        </div>
      </div>
    </div>
  );
}

export default ComplexSidebar;
