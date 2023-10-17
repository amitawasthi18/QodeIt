import "./App.scss";
import "./SelectBox.css";
import React, { useState } from "react";
import DatePicker from "react-datepicker";  
  
import "react-datepicker/dist/react-datepicker.css";  

function App() {
  const WORDS_PER_PAGE = 275;
  
  const pricingData = {
    "Academic writing": {
      "High school": 12,
      "Undergraduate": 15,
      "Bachelor": 21,
      "Professional": 25  
    },
    "Editing and  proofreading": {
      "High school": 3,
      "Undergraduate": 5,
      "Bachelor": 7,
      "Professional": 13
    },
    "Calculations": {
      "High school": 18,
      "Undergraduate": 23,
      "Bachelor": 32,
      "Professional": 38
    }
  };

  const [activeTopTier, setActiveTopTier] = useState(null);
  const [activeMiddleTier, setActiveMiddleTier] = useState(null);
  const [selectedValue, setSelectedValue] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [mode, setMode] = useState("Pages"); // 'Pages' or 'Words'

  const [date, setDate] = useState(new Date());

  const handleChange = (e) => {
    const value = Number(e.target.value);
    if (mode === "Pages") {
      setQuantity(Math.max(1, value)); 
    } else {
      setQuantity(Math.max(1, value)); 
    }
  };

  const toggleToPages = () => {
    if (mode !== "Pages") {
      setQuantity((prev) => Math.ceil(prev / WORDS_PER_PAGE));
      setMode("Pages");
    }
  };

  const toggleToWords = () => {
    if (mode !== "Words") {
      setQuantity((prev) => prev * WORDS_PER_PAGE);
      setMode("Words");
    }
  };

  const computePrice = () => {
    if (!activeTopTier || !activeMiddleTier) return 0; // Ensuring both tiers are selected

    const basePrice = pricingData[activeTopTier][activeMiddleTier];
    const totalWords = mode === "Pages" ? quantity * WORDS_PER_PAGE : quantity;
    const totalPages = Math.ceil(totalWords / WORDS_PER_PAGE);
    return basePrice * totalPages;
  };

  const approxPrice = computePrice();

  return (
    <div className="App">
      <div className="outer">
        <div className="inner">
          <div className="box" id="top">
            <div
              id="0"
              className={`btn-tier ${activeTopTier === "Academic writing" ? "highlight" : ""}`}
              onClick={() => setActiveTopTier("Academic writing")}
              style={{marginTop:'5%'}}
            >
              <p>Academic writing</p>
            </div>
            <div
              id="1"
              className={`btn-tier ${activeTopTier === "Editing and proofreading" ? "highlight" : ""}`}
              onClick={() => setActiveTopTier("Editing and proofreading")}
              style={{marginTop:'5%'}}
            >
              <p>Editing and proofreading</p>
            </div>
            <div
              id="2"
              className={`btn-tier ${activeTopTier === "Calculations" ? "highlight" : ""}`}
              onClick={() => setActiveTopTier("Calculations")}
              style={{marginTop:'5%'}}
            >
              <p>Calculations</p>
            </div>
          </div>

          <div className="box" id="middle">
            <div
              id="0"
              className={`btn-tier ${activeMiddleTier === "High school" ? "highlight" : ""}`}
              onClick={() => setActiveMiddleTier("High school")}
              style={{marginTop:'5%'}}
            >
              <p >High school</p>
            </div>
            <div
              id="1"
              className={`btn-tier ${activeMiddleTier === "Undergraduate" ? "highlight" : ""}`}
              onClick={() => setActiveMiddleTier("Undergraduate")}
              style={{marginTop:'5%'}}
            >
              <p>Undergraduate</p>
            </div>
            <div
              id="2"
              className={`btn-tier ${activeMiddleTier === "Bachelor" ? "highlight" : ""}`}
              onClick={() => setActiveMiddleTier("Bachelor")}
              style={{marginTop:'5%'}}
            >
              <p>Bachelor</p>
            </div>
            <div
              id="3"
              className={`btn-tier ${activeMiddleTier === "Professional" ? "highlight" : ""}`}
              onClick={() => setActiveMiddleTier("Professional")}
              style={{marginTop:'5%'}}
            >
              <p>Professional</p>
            </div>
          </div>

          <div className="paper-select">
            <p>Type of paper</p>
            <div className="select-container">
              <select
                value={selectedValue}
                onChange={(e) => setSelectedValue(e.target.value)}
                className="centered-select"
              >
                <option value="">Select...</option>
                <option value="Research paper">Research paper</option>
                <option value="Research proposal">Research proposal</option>
                <option value="Speech">Speech</option>
                <option value="Thesis">Thesis</option>
                <option value="Thesis proposal">Thesis proposal</option>
                <option value="Thesis statement">Thesis statement</option>
              </select>
            </div>
          </div>

          <div className="quantity-c">
            <div className="pw-ip-c">
              <div>
                <p>Quantity</p>
                <div className="quantity">
                  <input type="number" value={quantity} onChange={handleChange}  />
                </div>
              </div>

              <div className="pw-c">
                <div className="pw">
                  <div
                    className={`btn-tier ${mode === "Pages" ? "highlight" : ""}`}
                    onClick={toggleToPages}
                  >
                    Pages
                  </div>
                  <div
                    className={`btn-tier ${mode === "Words" ? "highlight" : ""}`}
                    onClick={toggleToWords}
                  >
                    Words
                  </div>
                </div>
              </div>
            </div>

            <div className="calen-c">
              <p>Deadline</p>
              <div>
                <DatePicker selected={date} onChange={(date) => setDate(date)} />
               </div>
            </div>
          </div>

          <div className="price-c">
            <div>
              <div className="price-main">
                <p>Approx. Price</p>
              </div>
              <div className="price">
                <h2>{`$${approxPrice.toFixed(2)}`}</h2>
              </div>
            </div>
            <div className="order-btn">
              <button>PROCEED TO ORDER</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
