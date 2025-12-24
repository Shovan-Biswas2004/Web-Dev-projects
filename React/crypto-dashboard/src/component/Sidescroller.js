import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Dashboard from "./Dashboard";
import {
  CircularProgressbar,
  buildStyles
} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export default function Sidescroller() {
  const score = 720;
  const maxScore = 900;
  const percentage = (score / maxScore) * 100;

  const [selectedState, setSelectedState] = useState("btn1");
  const [coinData, setCoinData] = useState({ score: 0, change: 0 });
  const [authVisible, setAuthVisible] = useState(false);
  const [isSignup, setIsSignup] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    deposit: ""
  });
  const [loggedInUser, setLoggedInUser] = useState(null);

  // Load user from localStorage
 useEffect(() => {
  const current = JSON.parse(localStorage.getItem("currentUser"));
  if (current?.name) {
    setLoggedInUser(current.name);
  }
}, []);


  // Fetch CoinGecko data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://api.coingecko.com/api/v3/coins/bitcoin");
        const data = await response.json();

        const priceChange = data.market_data.price_change_percentage_24h;
        const score = data.market_data.market_cap_rank;

        setCoinData({
          score: score ?? 0,
          change: priceChange ?? 0
        });
      } catch (error) {
        console.error("Error fetching CoinGecko data:", error);
      }
    };

    fetchData();
  }, []);

  // Form submit handler
  const handleAuthSubmit = (e) => {
  e.preventDefault();

  const allUsers = JSON.parse(localStorage.getItem("users")) || [];

  if (isSignup) {
    const newUser = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      deposit: formData.deposit,
    };

    // Check if user already exists
    const exists = allUsers.find(u => u.name === newUser.name);
    if (exists) {
      alert("User already exists. Please log in.");
      return;
    }

    const updatedUsers = [...allUsers, newUser];
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    localStorage.setItem("currentUser", JSON.stringify(newUser));
    setLoggedInUser(newUser.name);
    setAuthVisible(false);
  } else {
    // Login logic
    const matchedUser = allUsers.find(
      user => user.name === formData.name && user.password === formData.password
    );

    if (matchedUser) {
      localStorage.setItem("currentUser", JSON.stringify(matchedUser));
      setLoggedInUser(matchedUser.name);
      setAuthVisible(false);
    } else {
      alert("Invalid name or password.");
    }
  }
};


  const handleLogout = () => {
  localStorage.removeItem("currentUser");
  setLoggedInUser(null);
};


  return (
    <>
      <div style={{ display: "flex", height: "100vh" }}>
        {/* Sidebar */}
        <div className="dashboard-wrapper"
          style={{
            width: "15%",
            backgroundColor: "#f8f9fa",
            borderRight: "1px solid #dee2e6",
            padding: "1rem",
            boxSizing: "border-box"
          }}
        >
          <h5>Sidebar</h5>

          {/* Menu */}
          <div className="container mt-3 mb-3 rounded-3 linearBorder" style={{ backgroundColor: "#55466e" }}>
            <div className="scroll py-3">
              <div className="btn-group-vertical d-flex align-items-center gap-2 text-white" role="group">
                {[
                  { icon: "house-door-fill", label: "Home", key: "btn1" },
                  { icon: "inboxes-fill", label: "Dashboard", key: "btn2" },
                  { icon: "cash-stack", label: "Transactions", key: "btn3" },
                  { icon: "gift-fill", label: "Rewards", key: "btn4" },
                ].map(({ icon, label, key }) => (
                  <button
                    key={key}
                    type="button"
                    className={`btn d-flex align-items-center gap-2 text-white ${selectedState === key ? "custom-active" : ""}`}
                    onClick={() => setSelectedState(key)}
                  >
                    <i className={`bi bi-${icon}`}></i> <span>{label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div style={{ width: 130, height: 130 }} className="ms-4 mb-2">
            <CircularProgressbar
              value={Math.abs(percentage)}
              text={`${percentage.toFixed(1)}%`}
              strokeWidth={20}
              styles={buildStyles({
                textColor: "#ffffff",
                pathColor: percentage >= 0 ? "#9700ff" : "#ff4d4f",
                trailColor: "#ddd",
                pathTransitionDuration: 0.5
              })}
            />
          </div>

          {/* Bottom Buttons */}
          <div className="container mt-2 mb-3 rounded-3 linearBorder2" style={{ backgroundColor: "#55466e" }}>
            <div className="scroll py-3">
              <div className="btn-group-vertical d-flex justify-content-center gap-2" role="group">
                <button type="button" className="btn text-white" style={{ backgroundColor: "#71569d" }}>
                  <span className="fs-6">Boost Your Account</span>
                </button>
                <button type="button" className={`btn d-flex align-items-center gap-2 text-white ${selectedState === "btn6" ? "custom-active" : ""}`} onClick={() => setSelectedState("btn6")}>
                  <i className="bi bi-gear-fill"></i> <span>Settings</span>
                </button>
                <button type="button" className={`btn d-flex align-items-center gap-2 text-white ${selectedState === "btn5" ? "custom-active" : ""}`} onClick={() => setSelectedState("btn5")}>
                  <i className="bi bi-question-circle"></i> <span>Support</span>
                </button>

                {/* Auth Section */}
                {loggedInUser ? (
                  <div className="text-white fw-bold ms-2">
                    <div className="d-flex align-items-center gap-2">
                      <i className="bi bi-person-circle fs-3"></i>
                      <span>{loggedInUser}</span>
                    </div>
                    <div className="">
                      <button className="btn btn-sm btn-outline-light" onClick={handleLogout}>Logout</button>
                    </div>
                  </div>
                ) : (
                  <button type="button" className="btn btn-lg text-white" style={{ backgroundColor: "#71569d" }} onClick={() => setAuthVisible(true)}>
                    Signup
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", height: "100vh" }}>
          <Navbar />
          <div style={{ flex: 1, overflowY: "auto" }}>
            <Dashboard />
          </div>

          {/* Modal */}
          {authVisible && (
            <div style={{
              position: "fixed",
              top: 0, left: 0,
              width: "100%", height: "100%",
              backgroundColor: "rgba(0,0,0,0.5)",
              display: "flex", alignItems: "center", justifyContent: "center",
              zIndex: 999,
              overflow: "hidden",
            }}>
              <div style={{
                backgroundColor: "#252237",
                padding: "2rem",
                borderRadius: "12px",
                width: "400px",
                color: "#fff",
                overflow: "hidden",
              }}>
                <h3 className="text-center mb-4">{isSignup ? "Signup" : "Login"}</h3>
                <form onSubmit={handleAuthSubmit}>
                  <div className="mb-3">
                    <label>Name</label>
                    <input type="text" className="form-control" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                  </div>

                  {isSignup && (
                    <div className="mb-3">
                      <label>Email</label>
                      <input type="email" className="form-control" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                    </div>
                  )}

                  <div className="mb-3">
                    <label>Password</label>
                    <input type="password" className="form-control" required value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
                  </div>

                  {isSignup && (
                    <div className="mb-3">
                      <label>Deposit Amount (₹)</label>
                      <input type="number" className="form-control" required value={formData.deposit} onChange={(e) => setFormData({ ...formData, deposit: e.target.value })} />
                    </div>
                  )}

                  <button className="btn w-100" type="submit" style={{ backgroundColor: "#55466e" }}>
                    {isSignup ? "Sign Up" : "Log In"}
                  </button>

                  <div className="text-center mt-3">
                    <button type="button" className="btn btn-sm btn-link text-light" onClick={() => setIsSignup(!isSignup)}>
                      {isSignup ? "Already have an account? Log in" : "Don't have an account? Sign up"}
                    </button>
                    <br />
                    <button className="btn btn-sm text-danger mt-2" type="button" onClick={() => setAuthVisible(false)}>Close</button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
