import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import PlantillaScreen from './src/screens/PlantillaScreen';
import TablaPosicionesScreen from './src/screens/TablaPosicionesScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: '#39a900',
          tabBarInactiveTintColor: '#7f8c8d',
          tabBarStyle: { backgroundColor: '#1b5e20', paddingBottom: 5, height: 60 },
          tabBarLabelStyle: { fontSize: 12, fontWeight: 'bold' },
        }}
      >
        <Tab.Screen 
          name="Plantilla" 
          component={PlantillaScreen} 
          options={{ tabBarLabel: '⚽ Jugadores' }}
        />
        <Tab.Screen 
          name="Posiciones" 
          component={TablaPosicionesScreen} 
          options={{ tabBarLabel: '🏆 Tabla' }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}