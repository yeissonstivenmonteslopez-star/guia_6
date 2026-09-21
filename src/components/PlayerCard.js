import React from 'react';
import { StyleSheet, Text, View } from 'react-native';



export default function PlayerCard({ jugador }) {
  return (
    <View style={styles.card}>
      <View style={styles.dorsal}>
        <Text style={styles.dorsalNumber}>{jugador.id}</Text>
      </View>

      <View style={styles.info}>
        <Text style={styles.name}>{jugador.name}</Text>
        <Text style={styles.email}>{jugador.email}</Text>
        <Text style={styles.club}>Club: {jugador.company.name}</Text>
      </View>

      <View style={styles.cityTag}>
        <Text style={styles.cityText}>{jugador.address.city}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000000',
    shadowOpacity: 0.08,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  dorsal: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: '#39a900',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  dorsalNumber: { color: '#ffffff', fontSize: 18, fontWeight: 'bold' },

  info: { flex: 1 },
  name: { fontSize: 15, fontWeight: 'bold', color: '#1b1b1b' },
  email: { fontSize: 12, color: '#7f8c8d', marginTop: 2 },
  club: { fontSize: 12, color: '#2c3e50', marginTop: 4 },

  cityTag: {
    backgroundColor: '#e8f5e9',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },
  cityText: { fontSize: 11, color: '#1b5e20', fontWeight: '600' },
});
