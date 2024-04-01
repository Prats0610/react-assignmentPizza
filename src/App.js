import React, { useState, useEffect } from "react";
import PlaceOrder from "./PlaceOrder";
import Display from "./Display";

const stopTimerStates = ["Cancelled", "Order Picked"];

function App() {
  const [orders, setOrders] = useState([]);
  const [totalDelivered, setTotalDelivered] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      updateTimers();
    }, 1000);

    return () => clearInterval(interval);
  }, [orders]);

  const addOrder = (order) => {
    if (orders.length >= 10) {
      alert("Not taking any order for now");
      return;
    }
    setOrders([
      ...orders,
      {
        ...order,
        stage: "Order Placed",
        time: Date.now(),
        id: orders.length + 1,
        timer: 0,
      },
    ]);
  };

  const updateOrderStage = (id, stage) => {
    const updatedOrders = orders.map((order) => {
      if (order.id === id) {
        if (stage === "Order Picked") {
          setTotalDelivered(totalDelivered + 1);
        }
        return { ...order, stage };
      }
      return order;
    });
    setOrders(updatedOrders);
  };

  const updateTimers = () => {
    setOrders((orders) =>
      orders.map((order) => {
        if (!stopTimerStates.includes(order.stage)) {
          return { ...order, timer: order.timer + 1 };
        }
        return order;
      })
    );
  };

  return (
    <div className="App">
      <h1>Pizza Restaurant Simulation</h1>
      <PlaceOrder addOrder={addOrder} />
      <Display
        orders={orders}
        totalDelivered={totalDelivered}
        updateOrderStage={updateOrderStage}
      />
    </div>
  );
}

export default App;
