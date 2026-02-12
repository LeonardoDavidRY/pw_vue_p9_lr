<template>
  <div class="vehiculo-view">
    <VehiculoFormulario 
      @vehiculoGuardado="onVehiculoGuardado"
      @tokenActualizado="onTokenActualizado"
    />
    <VehiculoTabla 
      :vehiculos="vehiculos"
      @eliminarVehiculo="onEliminarVehiculo"
    />
  </div>
</template>

<script>
import VehiculoFormulario from "@/components/VehiculoFormulario.vue";
import VehiculoTabla from "@/components/VehiculoTabla.vue";
import { eliminarFac } from "@/clients/VehiculoClient";

export default {
  name: "VehiculoView",
  components: {
    VehiculoFormulario,
    VehiculoTabla,
  },
  data() {
    return {
      vehiculos: [],
      ultimoToken: "",
    };
  },
  mounted() {
    document.title = "Vehículo";
  },
  methods: {
    onVehiculoGuardado(vehiculoGuardado) {
   
      this.vehiculos.push(vehiculoGuardado);
    },
    onTokenActualizado(token) {
   
      this.ultimoToken = token;
    },
    async onEliminarVehiculo(id) {
      try {
       
        let token = this.ultimoToken;
        
        if (!token || token.trim() === "") {
          token = prompt("Por favor ingrese su token para confirmar la eliminación:");
        }
        
        if (!token) {
          alert("Token requerido para eliminar");
          return;
        }

        await eliminarFac(id, token);
      
        this.vehiculos = this.vehiculos.filter(v => v.id !== id);
        
        alert("Vehículo eliminado exitosamente");
      } catch (error) {
        if (error.response?.status === 401) {
          alert("Token inválido o expirado. Por favor genere un nuevo token.");
      
          this.ultimoToken = "";
        } else {
          alert("Error al eliminar el vehículo");
        }
        console.error("Error:", error);
      }
    },
  },
};
</script>

<style scoped>
.vehiculo-view {
  padding: 0;
  max-width: 100%;
  margin: 0 auto;
  background-color: #f8f9fa;
  min-height: 100vh;
}
</style>
