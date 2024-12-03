import asyncio
import websockets
import json
import random

# Estado inicial de la humedad
current_humidity = 50  # Humedad inicial

# Función para generar cambios en la humedad
def generate_humidity():
    global current_humidity
    # La humedad fluctúa en un rango razonable
    current_humidity += random.uniform(-1.5, 1.5)

    # Limitar la humedad al rango 30%-70%
    current_humidity = min(max(current_humidity, 30), 70)

    # Redondear la humedad a dos decimales
    return round(current_humidity, 2)

# Función para manejar las conexiones WebSocket
async def handle_connection(websocket):
    print("Cliente WebSocket conectado")

    try:
        while True:
            # Generar nueva humedad
            humidity = generate_humidity()

            # Crear el objeto de respuesta
            response_object = {
                "randomValue": humidity
            }

            # Enviar el objeto al cliente
            await websocket.send(json.dumps(response_object))

            # Esperar 1 segundo antes de enviar el siguiente valor
            await asyncio.sleep(1)

    except websockets.exceptions.ConnectionClosed:
        print("Cliente WebSocket desconectado")
    except Exception as e:
        print(f"Error en WebSocket: {e}")

# Función para iniciar el servidor WebSocket
async def start_server():
    # Iniciar el servidor WebSocket en localhost y puerto 4001
    server = await websockets.serve(handle_connection, "localhost", 4001)
    print('Servidor WebSocket iniciado en ws://localhost:4001')
    await server.wait_closed()

# Iniciar el servidor WebSocket
if __name__ == "__main__":
    asyncio.run(start_server())
