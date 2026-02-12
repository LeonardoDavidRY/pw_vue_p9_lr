<template>
  <div class="tabla">
    <h2>VEHICULO</h2>
    <table v-if="vehiculos.length > 0">
      <thead>
        <tr>
          <th>ID</th>
          <th>Marca</th>
          <th>Chasis</th>
          <th>Fecha de fabricación</th>
          <th>Acción</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="vehiculo in vehiculos" :key="vehiculo.id">
          <td>{{ vehiculo.id }}</td>
          <td>{{ vehiculo.marca }}</td>
          <td>{{ vehiculo.chasis || '....' }}</td>
          <td>{{ formatearFecha(vehiculo.fechaFabricacion) }}</td>
          <td>
            <button class="btn-eliminar" @click="eliminar(vehiculo.id)">
              Eliminar
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <p v-else class="no-data">
      No hay vehículos registrados
    </p>
  </div>
</template>

<script>
export default {
  name: "VehiculoTabla",
  props: {
    vehiculos: {
      type: Array,
      required: true,
    },
  },
  methods: {
    eliminar(id) {
      if (confirm("¿Está seguro de que desea eliminar este vehículo?")) {
        this.$emit("eliminarVehiculo", id);
      }
    },
    formatearFecha(fecha) {
      if (!fecha) return "....";
      
   
      if (typeof fecha === 'string' && fecha.includes('-')) {
        return fecha;
      }
      
     
      const date = new Date(fecha);
      if (!isNaN(date.getTime())) {
        return date.toISOString().split('T')[0];
      }
      
      return fecha;
    },
  },
};
</script>

<style scoped>
.tabla {
  max-width: 1000px;
  margin: 40px auto;
  padding: 40px;
  border: 2px solid #003d82;
  border-radius: 8px;
  background-color: transparent;
}

h2 {
  color: #003d82;
  text-align: center;
  font-size: 42px;
  font-weight: bold;
  margin-bottom: 30px;
  letter-spacing: 2px;
}

table {
  width: 100%;
  border-collapse: collapse;
  background-color: white;
}

th,
td {
  padding: 14px;
  text-align: center;
  border: 2px solid #003d82;
}

th {
  background-color: #f8f9fa;
  font-weight: bold;
  color: #003d82;
  font-size: 15px;
}

tbody tr:hover {
  background-color: #f8f9fa;
}

.btn-eliminar {
  background-color: #dc3545;
  color: white;
  padding: 10px 25px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  font-weight: bold;
  transition: all 0.3s ease;
}

.btn-eliminar:hover {
  background-color: #c82333;
  transform: translateY(-2px);
}

.btn-eliminar:active {
  transform: translateY(0);
}

.no-data {
  text-align: center;
  color: #666;
  font-style: italic;
  padding: 30px;
  font-size: 16px;
}
</style>
