import React, { useEffect, useState } from 'react';
import { CoinList, HistoricalChart } from '../Config/api';
import { CryptoState } from '../CryptoContext';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Label
} from 'recharts';

export default function Dashboard() {
    const [selectedState, SetSelectedState] = useState("btn1");
    const [coin, setCoin] = useState([]);
    const [graphData, setGraphData] = useState([]);
    const [loading, setLoading] = useState(false);
    const { currency, symbol } = CryptoState();
    const [userData, setUserData] = useState(null);
   const [tradeMode, setTradeMode] = useState(null); // "buy" or "sell"
const [tradeAmount, setTradeAmount] = useState("");
const [showTradeModal, setShowTradeModal] = useState(false);
const [walletBalance, setWalletBalance] = useState(0);
const [transactions, setTransactions] = useState([]);

useEffect(() => {
  const saved = JSON.parse(localStorage.getItem("transactions")) || [];
  setTransactions(saved);
}, [walletBalance]);  // Update on wallet balance change


// Load current user's wallet balance
useEffect(() => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  if (currentUser) {
    setWalletBalance(parseFloat(currentUser.deposit));
  }
}, []);

useEffect(() => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  if (currentUser) {
    setWalletBalance(parseFloat(currentUser.deposit));
    setUserData(currentUser);
  }
}, []);

const handleTradeSubmit = (e) => {
  e.preventDefault();

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const allUsers = JSON.parse(localStorage.getItem("users")) || [];
  const transactions = JSON.parse(localStorage.getItem("transactions")) || [];

  const amount = parseFloat(tradeAmount);
  const currentPrice = coin[0]?.current_price || 0;

  let updatedDeposit = parseFloat(currentUser.deposit);
  let updatedBTC = parseFloat(currentUser.btc || 0);

  if (tradeMode === "buy") {
    if (amount > updatedDeposit) {
      alert("Insufficient funds");
      return;
    }
    updatedDeposit -= amount;
    updatedBTC += amount / currentPrice;
  } else {
    updatedDeposit += amount;
    updatedBTC -= amount / currentPrice;
  }

  const updatedUser = {
    ...currentUser,
    deposit: updatedDeposit,
    btc: updatedBTC,
  };

  // Save updated user info
  setWalletBalance(updatedDeposit);
  setUserData(updatedUser);
  localStorage.setItem("currentUser", JSON.stringify(updatedUser));

  const updatedUsers = allUsers.map((u) =>
    u.name === currentUser.name ? updatedUser : u
  );
  localStorage.setItem("users", JSON.stringify(updatedUsers));

  // Add transaction
  const newTransaction = {
    type: tradeMode,
    amount: amount,
    currency,
    date: new Date().toLocaleString(),
    priceAtTrade: currentPrice,
    btcAmount: (amount / currentPrice).toFixed(6),
  };
  transactions.unshift(newTransaction);
  localStorage.setItem("transactions", JSON.stringify(transactions));
  setTransactions(transactions); // update UI

  // Cleanup
  setShowTradeModal(false);
  setTradeAmount("");
  setTradeMode(null);
};


const calculateGain = () => {
  const totalSpent = transactions
    .filter(tx => tx.type === "buy")
    .reduce((sum, tx) => sum + parseFloat(tx.amount), 0);

  const currentValue = (userData?.btc || 0) * (coin[0]?.current_price || 0);
  if (totalSpent === 0) return 0;
  return (((currentValue - totalSpent) / totalSpent) * 100).toFixed(2);
};



    // Fetch Coin Data
    const fetchCoin = async () => {
        setLoading(true);
        try {
            const response = await fetch(CoinList(currency));
            if (!response.ok) throw new Error("Failed to fetch data");
            const data = await response.json();
            setCoin(data);
        } catch (error) {
            console.error("Error fetching coins:", error);
        }
        setLoading(false);
    };

    // Fetch Chart Data
    const fetchChart = async () => {
        try {
            const daysMap = {
                btn1: 0.0416, 
                btn2: 1,      
                btn3: 7,      
                btn4: 30,     
            };
            const days = daysMap[selectedState];
            const response = await fetch(HistoricalChart("bitcoin", days, currency));
            const data = await response.json();
            const formatted = data.prices.map(([timestamp, price]) => ({
                time: new Date(timestamp).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                }),
                price: parseFloat(price.toFixed(2)),
            }));
            setGraphData(formatted);
        } catch (error) {
            console.error("Chart fetch failed:", error);
        }
    };
    useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    if (user) setUserData(user);
}, []);

    useEffect(() => {
        fetchCoin();
    }, [currency]);

    useEffect(() => {
        fetchChart();
    }, [selectedState, currency]);

    return (
        <div className="dashboard-wrapper" >
            <div className="container-fluid">
                <div className="row g-0 mb-3">
                    <div className="col-12 text-center px-0">
                        <div className="fs-4 text-white" style={{
                            width: "5vw",
                            backgroundColor: "#19152e",
                            marginLeft: "16px",
                            padding: 0,
                            borderRadius: "5px 5px 0 0",
                        }}>
                            Wallet
                        </div>
                    </div>
                    <div className="col-8 mx-3" style={{
                        backgroundColor: "#252237",
                        borderRadius: "0 10px 10px 10px"
                    }}>
                        <div className="row">
                            <div className="col-4 py-2">
  <p className="text-secondary">Total portfolio value <i className="bi bi-info-circle-fill"></i></p>
  <h2 className="text-white px-2">
    ₹{userData?.deposit ? (parseFloat(userData.deposit) * 1.1).toLocaleString() : "0"}
  </h2>
</div>
<div className="col-4 py-2">
  <p className="text-secondary px-3">Wallet Balance</p>
  <h2 className="text-white px-2">
   ₹{walletBalance.toLocaleString(undefined, { maximumFractionDigits: 2 })}
</h2>

</div>
<div className="col-4 py-2">
  <p className="text-secondary px-3">In USD</p>
  <h2 className="text-white px-2">
    ${(walletBalance / 83).toFixed(2)}
  </h2>
</div>

                        </div>
                    </div>
                </div>
            </div>

            <div className="container py-3 px-5 text-center" >
                <div className="row mb-3" >
                   <div className="col-6 text-start my-4 px-4" >
  <div className="linearBorder mx-3" style={{borderRadius: "60px"}}>
    <div className="scroll px-5 py-3 px-4"style={{borderRadius: "60px"}}>

      {/* Toggle Buttons */}
      <div className="row mt-3">
        <div className="col-12 text-start px-2" style={{ backgroundColor: "#55466e", borderRadius: "10px" }}>
            <div className='d-flex justify-content-around'>
          <h5 className="text-white">Bitcoin Price Chart</h5>
           <form className="d-flex gap-2">
  <button
    className="btn btn-md btn-success px-4"
    type="button"
    onClick={() => {
      setTradeMode("buy");
      setShowTradeModal(true);
    }}
  >
    Buy
  </button>
  <button
    className="btn btn-md btn-danger px-4"
    type="button"
    onClick={() => {
      setTradeMode("sell");
      setShowTradeModal(true);
    }}
  >
    Sell
  </button>
</form>

{showTradeModal && (
  <div style={{
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 999
  }}>
    <div style={{
      backgroundColor: "#252237",
      padding: "2rem",
      borderRadius: "12px",
      width: "400px",
      color: "#fff"
    }}>
      <h3 className="text-center mb-4">{tradeMode === "buy" ? "Buy Bitcoin" : "Sell Bitcoin"}</h3>

      <form onSubmit={handleTradeSubmit}>
        <div className="mb-3">
          <label>Amount ({currency === "INR" ? "₹" : "$"}):</label>
          <input
            type="number"
            className="form-control"
            required
            value={tradeAmount}
            onChange={(e) => setTradeAmount(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label>Current BTC Price:</label>
          <h5 className="text-light mt-2">{coin[0] ? `${symbol}${coin[0].current_price.toLocaleString()}` : "Loading..."}</h5>
        </div>

        <button className="btn w-100 mt-2" type="submit" style={{ backgroundColor: "#55466e" }}>
          Confirm {tradeMode === "buy" ? "Buy" : "Sell"}
        </button>

        <div className="text-center mt-3">
          <button
            type="button"
            className="btn btn-sm text-danger mt-2"
            onClick={() => {
              setShowTradeModal(false);
              setTradeMode(null);
              setTradeAmount("");
            }}
          >
            Close
          </button>
        </div>
      </form>
    </div>
  </div>
)}


</div>
         <h5 className="text-white mb-0">Current Price:</h5>
          <div className="d-flex gap-3 align-items-center mb-2  flex-wrap">
           
  {/* Left: Current Price */}
  <div className="d-flex align-items-center gap-3">
   
    <div>
      {coin[0] && (
        <div className="d-flex align-items-end justify-content-end gap-3">
    <h4 className="text-white mb-0">
      {symbol}{coin[0].current_price.toLocaleString()}
    </h4>
    <span
      className="fs-5 d-flex align-items-end justify-content-end"
      style={{
        color: coin[0].price_change_percentage_24h >= 0 ? 'lightgreen' : 'red'
      }}
    >
      {coin[0].price_change_percentage_24h.toFixed(2)}%
      {coin[0].price_change_percentage_24h >= 0 ? (
        <i className="bi bi-arrow-up-right "></i>
      ) : (
        <i className="bi bi-arrow-down-right "></i>
      )}
    </span>
  </div>
)}
    </div>
  </div>
  {/* Right: H1 D1 W1 M1 Buttons */}
  <div className="d-flex gap-2 flex-wrap mt-2 mt-md-0">
    {["btn1", "btn2", "btn3", "btn4"].map((btn, idx) => (
      <React.Fragment key={btn}>
        <input
          type="radio"
          className="btn-check"
          name="chartRange"
          id={`btnradio${idx + 1}`}
          checked={selectedState === btn}
          onChange={() => SetSelectedState(btn)}
        />
        <label
          className="btn btn-outline-light"
          htmlFor={`btnradio${idx + 1}`}
        >
          {["H1", "D1", "W1", "M1"][idx]}
        </label>
      </React.Fragment>
    ))}
  </div>
</div>
          <div style={{ height: "170px", backgroundColor: "#55466e", borderRadius: "8px", padding: "6px" }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={graphData} margin={{ top: 5, right: 15, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#9800ff" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#71569d" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#71569d" />
                <XAxis dataKey="time" stroke="#fff" />
                <YAxis stroke="#fff" />
                <Tooltip contentStyle={{ backgroundColor: '#55466e', border: 'none', color: '#fff' }} />
                <Area
                  type="monotone"
                  dataKey="price"
                  strokeWidth={2}
                  stroke="#9800ff"
                  fillOpacity={1}
                  fill="url(#colorPrice)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>


                    {/* Right Side: Transactions */}
                    <div className="col-6 text-start my-5">
                        <div className='linearBorder mx-4'>
                            <div className="module">
                                <p className='mx-2'>Recent Transactions</p>
                                <div className="d-flex flex-column gap-3">
                                    {/* Transaction 1 */}
                                      <div className="d-flex align-items-center gap-3 w-auto">
    <div className="text-white rounded-circle d-flex align-items-center justify-content-center mx-4"
      style={{ width: '40px', height: '40px', backgroundColor: "#55466e" }}>
      <i className="bi bi-wallet2"></i>
    </div>
    <div>
      <h5 className="mb-0">BTC Balance</h5>
      <p className="mb-0" style={{ color: "#b1b2b5" }}>{new Date().toLocaleString()}</p>
    </div>
    <div className="mx-5">
      <h5 className="mb-0">{(userData?.btc || 0).toFixed(6)} BTC</h5>
    </div>
  </div>

  {/* % Gain */}
  <div className="d-flex align-items-center gap-3 w-auto">
    <div className="text-white rounded-circle d-flex align-items-center justify-content-center mx-4"
      style={{ width: '40px', height: '40px', backgroundColor: "#55466e" }}>
      <i className="bi bi-graph-up-arrow"></i>
    </div>
    <div>
      <h5 className="mb-0">% Gain</h5>
      <p className="mb-0" style={{ color: "#b1b2b5" }}>{new Date().toLocaleString()}</p>
    </div>
    <div className="mx-5">
      <h5 className="mb-0" style={{ color: calculateGain() >= 0 ? 'lightgreen' : 'red' }}>
        {calculateGain()}%
      </h5>
    </div>
    </div>

                                </div>
                                <div className="d-flex justify-content-center my-2">
                                    <button type="button" className=" text-white px-5 mt-3" style={{ backgroundColor: "#55466e", border: "none", padding: "5px" }}>View all</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom: Crypto Table */}
                <div className="row justify-content-start">
                    <div className="col-9 text-white" style={{ backgroundColor: "#64617b" }}>
                        <div className='row my-2 py-2 mx-2 align-items-center' style={{ backgroundColor: "#55466e" }}>
                            <div className='col-3 d-flex align-items-center gap-2'>Crypto</div>
                            <div className='col-3'>Price</div>
                            <div className='col-3'>24h%</div>
                            <div className='col-3'>Market Cap</div>
                        </div>

                        {coin.slice(0, 3).map((c, index) => (
                            <React.Fragment key={c.id}>
                                <div className="row py-1 align-items-center mx-2">
                                    <div className="col-3 d-flex align-items-center gap-2">
                                        <img src={c.image} alt={c.name} width="25" height="25" />
                                        <span>{c.name}</span>
                                    </div>
                                    <div className="col-3">
                                        {symbol} {c.current_price.toLocaleString()}
                                    </div>
                                    <div className="col-3">
                                        <span style={{ color: c.price_change_percentage_24h >= 0 ? 'lightgreen' : 'red' }}>
                                            {c.price_change_percentage_24h?.toFixed(2)}%
                                            {c.price_change_percentage_24h >= 0 ? (
                                                <i className="bi bi-arrow-up-right ms-1"></i>
                                            ) : (
                                                <i className="bi bi-arrow-down-right ms-1"></i>
                                            )}
                                        </span>
                                    </div>
                                    <div className="col-3">
                                        {symbol} {c.market_cap.toLocaleString()}
                                    </div>
                                </div>
                                {index !== 2 && <hr className="mx-2 my-1" />}
                            </React.Fragment>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
