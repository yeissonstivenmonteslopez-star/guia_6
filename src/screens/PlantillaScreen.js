import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import PlayerCard from '../components/PlayerCard';
import { obtenerPlantilla } from '../services/api';

export default function PlantillaScreen() {
  const [jugadores, setJugadores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);

  const cargarPlantilla = async () => {
    try {
      setError(null);
      const data = await obtenerPlantilla();
      setJugadores(data);
    } catch (err) {
      setError(err.message || 'No se pudieron cargar los jugadores');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    cargarPlantilla();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    cargarPlantilla();
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#39a900" />
        <Text style={styles.loadingText}>Cargando la plantilla...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorEmoji}>⚠️</Text>
        <Text style={styles.errorTitle}>No se pudo cargar la plantilla</Text>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={cargarPlantilla}>
          <Text style={styles.retryText}>Reintentar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1b5e20" />

      <View style={styles.header}>
        <Text style={styles.headerTitle}>⚽ Plantilla del Club</Text>
        <Text style={styles.headerSubtitle}>Temporada 2026</Text>
      </View>

      <FlatList
        data={jugadores}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['#39a900']} />
        }
        renderItem={({ item }) => <PlayerCard jugador={item} />}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f5f2',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#f2f5f2',
  },
  loadingText: {
    marginTop: 12,
    color: '#2c3e50',
    fontSize: 14,
  },
  header: {
    backgroundColor: '#1b5e20',
    paddingVertical: 18,
    paddingHorizontal: 20,
  },
  headerTitle: {
    color: '#ffffff',
    fontSize: 22,
    fontWeight: 'bold',
  },
  headerSubtitle: {
    color: '#c8e6c9',
    fontSize: 13,
    marginTop: 2,
  },
  listContent: {
    padding: 16,
  },
  errorEmoji: {
    fontSize: 40,
    marginBottom: 8,
  },
  errorTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#c62828',
  },
  errorText: {
    color: '#7f8c8d',
    textAlign: 'center',
    marginTop: 6,
    fontSize: 13,
  },
  retryButton: {
    marginTop: 18,
    backgroundColor: '#39a900',
    paddingHorizontal: 22,
    paddingVertical: 11,
    borderRadius: 8,
  },
  retryText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
});
