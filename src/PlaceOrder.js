import React, { useState } from "react";

const PlaceOrder = ({ addOrder }) => {
  const [type, setType] = useState("");
  const [size, setSize] = useState("");
  const [base, setBase] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    addOrder({ type, size, base });
    setType("");
    setSize("");
    setBase("");
  };

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={handleSubmit}
      >
        <div style={{ paddingBottom: 15 }}>
          <label>
            Type:
            <select
              style={{ width: 100 }}
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="Veg">Veg</option>
              <option value="Non-Veg">Non-Veg</option>
            </select>
          </label>
        </div>
        <div style={{ paddingBottom: 15 }}>
          <label>
            Size:
            <select
              style={{ width: 105 }}
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="Large">Large</option>
              <option value="Medium">Medium</option>
              <option value="Small">Small</option>
            </select>
          </label>
        </div>
        <div style={{ paddingBottom: 15 }}>
          <label>
            Base:
            <select
              style={{ width: 100 }}
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="Thin">Thin</option>
              <option value="Thick">Thick</option>
            </select>
          </label>
        </div>
        <button type="submit">Place Order</button>
      </form>
    </div>
  );
};

export default PlaceOrder;
