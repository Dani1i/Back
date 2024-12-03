import React, { useState, useEffect, useRef } from 'react';

const WebSocketView = () => {
  const [currentHumidity, setCurrentHumidity] = useState(null); // Estado para la humedad actual
  const [isConnected, setIsConnected] = useState(false); // Estado de conexión del WebSocket
  const socketRef = useRef(null); // Referencia al WebSocket

  // Inicializar la conexión WebSocket
  const initializeWebSocket = () => {
    if (
      socketRef.current &&
      (socketRef.current.readyState === WebSocket.OPEN ||
        socketRef.current.readyState === WebSocket.CONNECTING)
    ) {
      console.log("WebSocket ya está conectado o en proceso de conexión");
      return;
    }

    const socket = new WebSocket('ws://localhost:4001');
    socketRef.current = socket;

    // Cuando se abre la conexión WebSocket
    socket.onopen = () => {
      console.log('Conexión al WebSocket establecida');
      setIsConnected(true);
    };

    // Cuando se reciben mensajes del WebSocket
    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        const { randomValue } = data;
        setCurrentHumidity(parseFloat(randomValue)); // Actualizar la humedad actual
      } catch (error) {
        console.error('Error al procesar los datos del WebSocket:', error);
      }
    };

    // Cuando se cierra la conexión WebSocket
    socket.onclose = () => {
      console.log('Conexión al WebSocket cerrada');
      setIsConnected(false);
    };

    // Manejar errores en el WebSocket
    socket.onerror = (error) => {
      console.error('Error en el WebSocket:', error);
      setIsConnected(false);
    };
  };

  // Intentar conexión desde el inicio y reintentar siempre
  useEffect(() => {
    initializeWebSocket(); // Intentar conexión desde el inicio
    return () => {
      if (socketRef.current) socketRef.current.close();
    };
  }, []);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: 'black', color: 'white' }}>
      <div style={{ textAlign: 'center' }}>
        <h1>{isConnected ? 'Conectado al sensor de humedad' : 'Esperando conexión'}</h1>
        <p style={{ fontSize: '3rem' }}>
          {currentHumidity !== null && !isNaN(currentHumidity)
            ? `${currentHumidity.toFixed(2)} %`
            : 'Cargando...'}
        </p>
      </div>
    </div>
  );
};

export default WebSocketView;
