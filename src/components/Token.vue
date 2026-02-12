<template>
  <div class="token">
    <h1>TOKEN</h1>
    <div class="form">
      <label for="id_usuario">Usuario</label>
      <input type="text" id="id_usuario" v-model="usuario" />
      
      <label for="id_password">Password</label>
      <input type="password" id="id_password" v-model="password" />
      
      <label for="id_rol">Rol</label>
      <input type="text" id="id_rol" v-model="rol" />
      
      <label for="id_token">Token</label>
      <textarea name="id_token" id="id_token" :value="token" readonly></textarea>
      
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    </div>

    <button @click="generarToken">Generar</button>
  </div>
</template>

<script>
import { getTokenFachada } from "@/clients/TokenClient";

export default {
  name: "Token",
  data() {
    return {
      usuario: "",
      password: "",
      rol: "",
      token: "",
      errorMessage: "",
    };
  },
  methods: {
    async generarToken() {
      try {
        this.errorMessage = "";
        this.token = "";
        
        if (!this.usuario || !this.password || !this.rol) {
          this.errorMessage = "Por favor complete todos los campos";
          return;
        }
        
        const respuesta = await getTokenFachada(this.usuario, this.password, this.rol);
        
        this.token = respuesta.accessToken;
        
        alert("Token generado exitosamente");
      } catch (error) {
        this.errorMessage = "Error al generar el token. Verifica tus credenciales.";
        console.error("Error:", error);
      }
    },
  },
};
</script>

<style scoped>
.token {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 80vh;
  padding: 40px 20px;
  background-color: #f8f9fa;
}

h1 {
  color: #0099cc;
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
  border: 2px solid #000000;
  border-radius: 8px;
  padding: 40px;
}

label {
  color: #0099cc;
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
  padding: 14px 16px;
  border: 2px solid #000000;
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

button {
  background-color: #0babeb;
  color: white;
  padding: 16px 70px;
  border: 2px solid #000000;
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

.error-message {
  color: #dc3545;
  font-weight: bold;
  margin-top: 20px;
  text-align: center;
  font-size: 14px;
}

.role-info {
  color: #003d82;
  font-weight: bold;
  margin-top: 15px;
  text-align: center;
}
</style>
