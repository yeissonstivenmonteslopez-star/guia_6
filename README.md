# Plantilla Fútbol — Consumo de APIs con React Native + EXPO

Laboratorio práctico (punto 3.4) de la Guía de Aprendizaje — Clase 6.
Programa: Análisis y Desarrollo de Software (ADSO) — SENA.

Consumo asíncrono del endpoint `https://jsonplaceholder.typicode.com/users`,
presentado con temática de fútbol: cada usuario se renderiza como la ficha de
un jugador con su dorsal, nombre, correo, club y ciudad.

## Versiones

- Expo SDK 57 (`expo ~57.0.17`)
- React Native 0.86.3
- React 19.2

## Cómo ejecutarlo

```bash
npm install
npx expo start
```

Luego escanea el código QR con la app Expo Go, o pulsa `a` para Android / `i` para iOS.

Si alguna dependencia queda desalineada con el SDK:

```bash
npx expo install --fix
```

## Estructura

```
plantilla-futbol/
├── App.js                        # Componente raíz
├── index.js                      # Punto de entrada (registerRootComponent)
├── app.json                      # Configuración de Expo
├── babel.config.js
├── package.json
└── src/
    ├── components/
    │   └── PlayerCard.js         # Ficha individual del jugador
    ├── screens/
    │   └── PlantillaScreen.js    # Estados, useEffect y FlatList
    └── services/
        └── api.js                # Capa de red aislada del componente visual
```

## Requisitos de la guía cubiertos

| Requisito | Dónde se resuelve |
|---|---|
| Persistencia de estado (`users`, `loading`, `error`) | `PlantillaScreen.js` — tres `useState` |
| Ciclo de vida: una sola consulta al renderizar | `useEffect(() => {...}, [])` con arreglo de dependencias vacío |
| Renderizado eficiente | `FlatList` con `data`, `keyExtractor` y `renderItem` |
| Manejo de errores | `try / catch / finally` + validación de `response.ok` en `services/api.js` |

`fetch` no rechaza la promesa ante códigos HTTP de error (404, 500), por eso se
valida `response.ok` y se lanza el error manualmente para que llegue al `catch`.

## Variante con Axios

```bash
npm install axios
```

```js
import axios from 'axios';

export const obtenerPlantilla = async () => {
  const { data } = await axios.get(API_URL);
  return data; // conversión automática, sin .json()
};
```

Con Axios se elimina la validación de `response.ok`: la librería rechaza la
promesa ante cualquier estado fuera del rango 2xx y el flujo llega solo al `catch`.
