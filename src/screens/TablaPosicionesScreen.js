import React, { useState, useEffect } from 'react';
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
import { obtenerTablaPosiciones } from '../services/api';

export default function TablaPosicionesScreen() {
  const [tabla, setTabla] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);

  const cargarTabla = async () => {
    try {
      setError(null);
      const data = await obtenerTablaPosiciones();
      setTabla(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    cargarTabla();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    cargarTabla();
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#39a900" />
        <Text style={styles.loadingText}>Cargando la tabla del torneo...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorEmoji}>⚠️</Text>
        <Text style={styles.errorTitle}>Error al cargar posiciones</Text>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={cargarTabla}>
          <Text style={styles.retryText}>Reintentar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1b5e20" />

      {/* Encabezado */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>🏆 Tabla de Posiciones</Text>
        <Text style={styles.headerSubtitle}>Torneo Apertura 2026</Text>
      </View>

      {/* Cabecera de la tabla */}
      <View style={styles.tableHeader}>
        <Text style={[styles.columnHeader, styles.colPos]}>#</Text>
        <Text style={[styles.columnHeader, styles.colTeam]}>Club / DT</Text>
        <Text style={[styles.columnHeader, styles.colStat]}>PJ</Text>
        <Text style={[styles.columnHeader, styles.colStat]}>PG</Text>
        <Text style={[styles.columnHeader, styles.colStat]}>PE</Text>
        <Text style={[styles.columnHeader, styles.colStat]}>PP</Text>
        <Text style={[styles.columnHeader, styles.colPts]}>PTS</Text>
      </View>

      {/* Filas con FlatList */}
      <FlatList
        data={tabla}
        keyExtractor={(item) => item.id.toString()}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['#39a900']} />
        }
        renderItem={({ item, index }) => {
          const posicion = index + 1;
          const esZonaClasificacion = posicion <= 4; // Top 4 en zona verde

          return (
            <View style={[styles.row, index % 2 === 0 && styles.rowEven]}>
              <View style={styles.colPos}>
                <Text style={[styles.posBadge, esZonaClasificacion && styles.posClasificado]}>
                  {posicion}
                </Text>
              </View>

              <View style={styles.colTeam}>
                <Text style={styles.teamName} numberOfLines={1}>{item.equipo}</Text>
                <Text style={styles.dtName} numberOfLines={1}>DT: {item.dt}</Text>
              </View>

              <Text style={[styles.statText, styles.colStat]}>{item.pj}</Text>
              <Text style={[styles.statText, styles.colStat]}>{item.pg}</Text>
              <Text style={[styles.statText, styles.colStat]}>{item.pe}</Text>
              <Text style={[styles.statText, styles.colStat]}>{item.pp}</Text>
              <Text style={[styles.ptsText, styles.colPts]}>{item.pts}</Text>
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f2f5f2' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 },
  loadingText: { marginTop: 12, color: '#2c3e50', fontSize: 14 },

  header: { backgroundColor: '#1b5e20', paddingVertical: 18, paddingHorizontal: 20 },
  headerTitle: { color: '#ffffff', fontSize: 22, fontWeight: 'bold' },
  headerSubtitle: { color: '#c8e6c9', fontSize: 13, marginTop: 2 },

  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#2e7d32',
    paddingVertical: 10,
    paddingHorizontal: 12,
    alignItems: 'center',
  },
  columnHeader: { color: '#ffffff', fontWeight: 'bold', fontSize: 12, textAlign: 'center' },

  row: {
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 12,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    backgroundColor: '#ffffff',
  },
  rowEven: { backgroundColor: '#f9fbf9' },

  colPos: { width: 30, alignItems: 'center' },
  colTeam: { flex: 1, paddingLeft: 8 },
  colStat: { width: 28, textAlign: 'center' },
  colPts: { width: 36, textAlign: 'center' },

  posBadge: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#555',
    width: 20,
    height: 20,
    textAlign: 'center',
    lineHeight: 20,
    borderRadius: 10,
  },
  posClasificado: { backgroundColor: '#c8e6c9', color: '#1b5e20' },

  teamName: { fontSize: 13, fontWeight: 'bold', color: '#2c3e50' },
  dtName: { fontSize: 11, color: '#7f8c8d' },

  statText: { fontSize: 12, color: '#333' },
  ptsText: { fontSize: 13, fontWeight: 'bold', color: '#1b5e20' },

  errorEmoji: { fontSize: 40, marginBottom: 8 },
  errorTitle: { fontSize: 17, fontWeight: 'bold', color: '#c62828' },
  errorText: { color: '#7f8c8d', textAlign: 'center', marginTop: 6, fontSize: 13 },
  retryButton: {
    marginTop: 18,
    backgroundColor: '#39a900',
    paddingHorizontal: 22,
    paddingVertical: 11,
    borderRadius: 8,
  },
  retryText: { color: '#ffffff', fontWeight: 'bold' },
});