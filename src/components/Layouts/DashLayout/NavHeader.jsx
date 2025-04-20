function NavHeader({ isSidebarOpen, toggleSidebar }) {
  return (
    <div className="nav-header">
      <a className="brand-logo">
        <img
          className={`logo-abbr ${isSidebarOpen ? "d-xl-block" : "d-xl-none"}`}
          src="/assets/images/ftbgic.png"
          alt="logo"
        />
        <img className="logo-compact" src="/assets/images/lot.png" alt="logo" />
        <img
          className={`brand-title ${
            isSidebarOpen ? "d-xl-none" : "d-xl-block"
          }`}
          src="/assets/images/lotbg.png"
          alt="logo"
          style={{
            scale: 2,
            margin: "0 auto",
          }}
        />
      </a>
      <div className="nav-control">
        <div
          className={`hamburger ${isSidebarOpen ? "is-active" : ""}`}
          onClick={toggleSidebar}
        >
          <span className="line" />
          <span className="line" />
          <span className="line" />
        </div>
      </div>
    </div>
  );
}

export default NavHeader;
