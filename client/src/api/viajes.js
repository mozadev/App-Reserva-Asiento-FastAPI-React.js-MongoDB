import axios from 'axios'

const URL = 'http://localhost:8000'
const endpoint = `${URL}/api/viajes`

export const fetchViajes = async () => await axios.get(endpoint)

export const fetchViaje = async (id) => await axios.get(`${endpoint}/${id}`)

export const createViaje = (newViaje) => axios.post(endpoint, newViaje)

export const updateViaje = (id, viaje) => axios.put(`${endpoint}/${id}`, viaje)

export const deleteViaje = (id)=> axios.delete(`${endpoint}/${id}`)


// const res = await axios.get("http://localhost:8000/api/viajes");


// const res = await axios.delete
// (`http://localhost:8000/api/viajes/${params.id}`)
// console.log(res);

// const res = await axios.put(
//     `http://localhost:8000/api/viajes/${params.id}`,
//     {
//         title,
//         description,
//     }
// )




    // async function fetchViajes() {
        //     const res = await axios.get("http://localhost:8000/api/viajes");
        //     // console.log(res);
        //     setViajes(res.data);
        // }

        // fetchViajes();