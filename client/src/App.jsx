import { useEffect, useMemo, useState } from "react";
import { io } from 'socket.io-client'; 

const App = () => {
  // Memoize the socket instance to prevent re-creation on re-renders
  const socket = useMemo(() =>
    io("http://localhost:5000", {
      withCredentials: true,
    }),
    []
  );

  const [order, setOrder] = useState(null);

  useEffect(() => {
 
    socket.on("connect", () => {
      console.log("Connected to server with ID:", socket.id);
    });

   
    socket.on("getOrders", (data) => {
      console.log("Received data:", data);
      setOrder(data); 
    });

    return () => {
      socket.disconnect();
    };
  }, [socket]);

  return (
    <div>
      <p>User Data: {order ? JSON.stringify(order) : "No data received"}</p>
    </div>
  );
}

export default App;
