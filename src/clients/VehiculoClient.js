import axios from 'axios';

const API_URL = 'http://localhost:8081/matricula/api/v1.0/vehiculos';

const guardar = async (vehiculo, token) => {
    const cleanToken = token.trim();
    
    console.log('Token siendo enviado:', cleanToken.substring(0, 50) + '...');
    
    return axios.post(`${API_URL}/guardar`, vehiculo, {
        headers: {
            "Authorization": `Bearer ${cleanToken}`,
            "Content-Type": "application/json"
        }
    }).then(resp => resp.data)
    .catch(error => {
        console.error('Error en la petición:', error.response?.status);
        console.error('Headers enviados:', error.config?.headers);
        throw error;
    });
}

const consultarTodos = async (token) => {
    const cleanToken = token.trim();
    
    return axios.get(`${API_URL}/todos`, {
        headers: {
            "Authorization": `Bearer ${cleanToken}`,
            "Content-Type": "application/json"
        }
    }).then(resp => resp.data)
    .catch(error => {
        console.error('Error al consultar vehículos:', error.response?.status);
        throw error;
    });
}

const eliminar = async (id, token) => {
    const cleanToken = token.trim();
    
    return axios.delete(`${API_URL}/eliminar/${id}`, {
        headers: {
            "Authorization": `Bearer ${cleanToken}`,
            "Content-Type": "application/json"
        }
    }).then(resp => resp.data)
    .catch(error => {
        console.error('Error al eliminar vehículo:', error.response?.status);
        throw error;
    });
}

export const guardarFac = async (vehiculo, token) => {
    return await guardar(vehiculo, token);
}

export const consultarTodosFac = async (token) => {
    return await consultarTodos(token);
}

export const eliminarFac = async (id, token) => {
    return await eliminar(id, token);
}
