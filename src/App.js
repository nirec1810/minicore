import React, { useState } from 'react';
import { getVendedores, getVentasPorFecha, getReglas } from './api';
import './App.css';

function App() {
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin]       = useState('');
  const [comisiones, setComisiones]   = useState([]);
  const [loading, setLoading]         = useState(false);
  const [error, setError]             = useState('');

  const calcularComisiones = async () => {
    // Validación de fechas
    if (!fechaInicio || !fechaFin) {
      setError('Por favor selecciona ambas fechas.');
      return;
    }
    if (fechaInicio > fechaFin) {
      setError('La fecha de inicio no puede ser mayor a la fecha fin.');
      return;
    }

    setError('');
    setLoading(true);

    try {
      const [ventas, vendedores, reglas] = await Promise.all([
        getVentasPorFecha(fechaInicio, fechaFin),
        getVendedores(),
        getReglas(),
      ]);

      // Ordenar reglas de mayor a menor para aplicar la más específica
      const reglasOrdenadas = [...reglas].sort((a, b) => b.amount - a.amount);

      const resultado = vendedores.map(vendedor => {
        const ventasVendedor = ventas.filter(v => v.vendedor_id === vendedor.id);
        let totalComision = 0;

        ventasVendedor.forEach(venta => {
          const regla = reglasOrdenadas.find(r => venta.monto >= r.amount);
          if (regla) {
            totalComision += venta.monto * regla.rule;
          }
        });

        return { nombre: vendedor.nombre, totalComision };
      });

      setComisiones(resultado);
    } catch (err) {
      setError('Error al conectar con la base de datos.');
    }

    setLoading(false);
  };

  return (
    <div className="app-container">
      <h1>Calcular Comisión de Ventas</h1>

      <div className="form-group">
        <label>
          Fecha Inicio:
          <input
            type="date"
            value={fechaInicio}
            onChange={e => setFechaInicio(e.target.value)}
          />
        </label>
        <label>
          Fecha Fin:
          <input
            type="date"
            value={fechaFin}
            onChange={e => setFechaFin(e.target.value)}
          />
        </label>
        <button onClick={calcularComisiones} disabled={loading}>
          {loading ? 'Calculando...' : 'Calcular'}
        </button>
      </div>

      {error && <p className="error">{error}</p>}

      {comisiones.length > 0 && (
        <>
          <h2>Resultados</h2>
          <table className="tabla-resultados">
            <thead>
              <tr>
                <th>Vendedor</th>
                <th>Comisión Total</th>
              </tr>
            </thead>
            <tbody>
              {comisiones.map((c, i) => (
                <tr key={i}>
                  <td>{c.nombre}</td>
                  <td>${c.totalComision.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}

      {comisiones.length === 0 && !loading && !error && (
        <p className="sin-resultados">Selecciona un rango de fechas y presiona Calcular.</p>
      )}
    </div>
  );
}

export default App;