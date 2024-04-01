import React from "react";
import "./Display.css";

const formatTime = (time) => {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  return `${minutes}m ${seconds}s`;
};

// Moved outside because it does not rely on the component's state or props
const getNextStage = (currentStage) => {
  switch (currentStage) {
    case "Order Placed":
      return "Order in Making";
    case "Order in Making":
      return "Order Ready";
    case "Order Ready":
      return "Order Picked";
    default:
      return "";
  }
};

// Component for rendering individual order cards
const OrderCard = ({ order, updateOrderStage }) => {
  const isDelayed = order.timer > 180; // This should depend on the size of the pizza
  const cardClass = isDelayed ? "card delayed" : "card";

  return (
    <div className={cardClass} key={order.id}>
      <p>{order.id}</p>
      <p>Time Spent: {formatTime(order.timer)}</p>
      {order.stage !== "Order Picked" && order.stage !== "Cancelled" && (
        <button
          onClick={() => updateOrderStage(order.id, getNextStage(order.stage))}
        >
          Next
        </button>
      )}
    </div>
  );
};

const Display = ({ orders, totalDelivered, updateOrderStage }) => {
  const stages = [
    "Order Placed",
    "Order in Making",
    "Order Ready",
    "Order Picked",
    "Cancelled",
  ];

  return (
    <div>
      <h2>Order Display</h2>
      <div className="order-container">
        {stages.map((stage) => (
          <div key={stage} className="stage-card">
            <h3 style={{ paddingRight: 40 }}>{stage}</h3>
            {orders
              .filter((order) => order.stage === stage)
              .map((order) => (
                <OrderCard
                  key={order.id}
                  order={order}
                  updateOrderStage={updateOrderStage}
                />
              ))}
          </div>
        ))}
      </div>

      <h2>Main Section</h2>
      <table>
        <thead>
          <tr>
            <th>Order Id</th>
            <th>Stage</th>
            <th>Total time spent (from order placed)</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.stage}</td>
              <td>{formatTime(order.timer)}</td>
              <td>
                {order.stage !== "Order Ready" &&
                  order.stage !== "Order Picked" && (
                    <button
                      onClick={() => updateOrderStage(order.id, "Cancelled")}
                    >
                      Cancel
                    </button>
                  )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="total-delivered">
        <h1>Total order delivered: {totalDelivered}</h1>
      </div>
    </div>
  );
};

export default Display;
