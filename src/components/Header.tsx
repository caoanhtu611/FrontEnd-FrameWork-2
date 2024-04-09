import React, { useState } from "react";
import logo from "../image/z5268627828943_96922bac34d1406d53e2d91d78f56a59.jpg";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [search, setSearch] = useState("");
  const [token, setToken] = useState(localStorage.getItem("token"));
  const navigate = useNavigate();
  let check = localStorage.getItem("token");
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken("");
    check = "";
  };
  return (
    <header>
      <div
        className=""
        style={{ borderBottom: "1px solid black", padding: "10px 0" }}
      >
        <div className="container mx-auto">
          <div className="flex justify-content-between align-items-center">
            <div className="flex">
              <span
                className="px-4 py-2"
                style={{ borderRight: "1px solid black" }}
              >
                Phone Number: 956 742 455 678
              </span>
              <span className="px-4 py-2">
                {" "}
                Email:info@ddsgnr.com English Sign In
              </span>
            </div>
            <div className="flex gap-20 align-items-center">
              <div className="flex gap-3">
                <i className="fa-brands fa-facebook-f"></i>
                <i className="fa-brands fa-instagram"></i>
                <i className="fa-brands fa-twitter"></i>
                <i className="fa-brands fa-linkedin"></i>
              </div>
              <div className="flex gap-6">
                <div className="flex gap-1 align-items-center">
                  <i className="fa-solid fa-globe"></i>
                  <span>Language</span>
                  <i className="fa-solid fa-angle-down"></i>
                </div>
                {check ? (
                  <div
                    onClick={handleLogout}
                    className="flex gap-1 align-items-center"
                  >
                    <i className="fa-regular fa-user"></i>
                    <span>LogOut</span>
                  </div>
                ) : (
                  <div
                    onClick={() => navigate("/login")}
                    className="flex gap-1 align-items-center"
                  >
                    <i className="fa-regular fa-user"></i>
                    <span Navlink to>
                      Sign In
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="py-[10px]" style={{ borderBottom: "1px solid black" }}>
        <div className="container mx-auto flex justify-content-between  align-items-center ">
          <div className="flex align-items-center gap-2">
            <img src={logo} alt="" />
            <span style={{ fontWeight: "bold", fontSize: "20px" }}>Design</span>
          </div>
          <div className="flex align-items-center gap-12">
            <div className="">
              <ul
                className="flex gap-10  align-items-center"
                style={{ margin: 0 }}
              >
                <li>Home</li>
                <li>Product</li>
                <li>About</li>
                <li>Contact</li>
              </ul>
            </div>
            <div className="">
              <div
                className=""
                style={{
                  width: "126px",
                  height: "40px",
                  border: "1px solid black",
                  padding: "10px",
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  borderRadius: "8px",
                }}
              >
                <input
                  type="text"
                  placeholder="Search"
                  onChange={(e) => setSearch(e.target.value)}
                  style={{ outline: "none", border: "none", width: "70px" }}
                />
                <i
                  onClick={() => navigate(`/search/${search}`)}
                  className="fa-solid fa-magnifying-glass"
                ></i>
              </div>
            </div>
            <div className="flex  align-items-center gap-4">
              <div className="flex  flex-column align-items-center gap-1">
                <i className="fa-regular fa-heart"></i>
                <span>Whitlist</span>
              </div>
              <div className="flex  flex-column align-items-center gap-1">
                <i className="fa-solid fa-cart-shopping"></i>
                <span>Cart</span>
              </div>
              <div className="flex  flex-column align-items-center gap-1">
                <i className="fa-solid fa-bell"></i>
                <span>Notification</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
