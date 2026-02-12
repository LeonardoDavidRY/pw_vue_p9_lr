<template>
  <div class="formulario">
    <h2>VEHICULO</h2>
    <div class="form">
      <label for="token">Token</label>
      <textarea name="token" id="token" v-model="token"></textarea>
      
      <label for="marca">Marca</label>
      <input type="text" id="marca" name="marca" v-model="marca" />
      
      <label for="modelo">Modelo</label>
      <input type="text" id="modelo" name="modelo" v-model="modelo" />
      
      <label for="chasis">Chasis</label>
      <input type="text" id="chasis" name="chasis" v-model="chasis" />
      
      <div class="fecha-group">
        <div class="fecha-item">
          <label for="fechaFabricacion">Fecha de fabricación</label>
          <input type="date" id="fechaFabricacion" name="fechaFabricacion" v-model="fechaFabricacion" />
        </div>
        
        <div class="fecha-item">
          <label for="fechaMatricula">Fecha de matrícula</label>
          <input type="date" id="fechaMatricula" name="fechaMatricula" v-model="fechaMatricula" />
        </div>
      </div>
    </div>
    <button @click="guardar">Guardar</button>
  </div>
</template>

<script>
import { guardarFac } from "@/clients/VehiculoClient";

export default {
  name: "VehiculoFormulario",
  data() {
    return {
      token: "",
      marca: "",
      modelo: "",
      chasis: "",
      fechaFabricacion: "",
      fechaMatricula: "",
    };
  },
  watch: {
    token(newToken) {
      // Emitir evento cuando el token cambie
      this.$emit("tokenActualizado", newToken);
    },
  },
  methods: {
    async guardar() {
      try {
        if (!this.token || !this.marca || !this.modelo || !this.chasis || 
            !this.fechaFabricacion || !this.fechaMatricula) {
          alert("Por favor complete todos los campos");
          return;
        }

        const vehiculo = {
          marca: this.marca,
          modelo: this.modelo,
          chasis: this.chasis,
          fechaFabricacion: this.fechaFabricacion,
          fechaMatricula: this.fechaMatricula,
        };

        const resultado = await guardarFac(vehiculo, this.token);
        
        alert("Vehículo guardado exitosamente");
        
     
        this.$emit("vehiculoGuardado", resultado);
        
       
        this.marca = "";
        this.modelo = "";
        this.chasis = "";
        this.fechaFabricacion = "";
        this.fechaMatricula = "";
      } catch (error) {
        if (error.response?.status === 401) {
          alert("Token inválido o expirado. Por favor genere un nuevo token.");
        } else {
          alert("Error al guardar el vehículo. Verifique los datos y el token.");
        }
        console.error("Error:", error);
      }
    },
  },
};
</script>

<style scoped>
.formulario {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 80vh;
  padding: 40px 20px;
  background-color: #f8f9fa;
}

h2 {
  color: #003d82;
  text-align: center;
  font-size: 42px;
  font-weight: bold;
  margin-bottom: 40px;
  letter-spacing: 2px;
}

.form {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 500px;
  background-color: transparent;
  border: 2px solid #003d82;
  border-radius: 8px;
  padding: 40px;
}

label {
  color: #003d82;
  font-weight: bold;
  font-size: 16px;
  margin-top: 18px;
  margin-bottom: 8px;
}

label:first-of-type {
  margin-top: 0;
}

input,
textarea {
  padding: 12px 15px;
  border: 2px solid #003d82;
  border-radius: 6px;
  width: 100%;
  font-size: 15px;
  background-color: #ffffff;
  box-sizing: border-box;
  transition: border-color 0.2s ease;
}

input:focus,
textarea:focus {
  outline: none;
  border-color: #0066cc;
}

textarea {
  min-height: 90px;
  resize: vertical;
  font-family: monospace;
  font-size: 13px;
  line-height: 1.5;
}

.fecha-group {
  display: flex;
  gap: 20px;
  margin-top: 10px;
}

.fecha-item {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.fecha-item label {
  margin-top: 0;
}

.fecha-item input {
  margin-top: 0;
}

button {
  background-color: #0babeb;
  color: white;
  padding: 16px 70px;
  border: 2px solid #003d82;
  border-radius: 10px;
  cursor: pointer;
  font-size: 18px;
  font-weight: bold;
  margin-top: 35px;
  align-self: center;
  transition: all 0.3s ease;
}

button:hover {
  background-color: #0099d6;
  transform: translateY(-2px);
}

button:active {
  transform: translateY(0);
}
</style>
