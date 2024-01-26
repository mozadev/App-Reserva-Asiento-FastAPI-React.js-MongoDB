
import { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom'
// import axios from 'axios'
import { fetchViaje, createViaje, updateViaje, deleteViaje } from '../api/viajes'
import './ViajeForm.css'


function ViajeForm() {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [asientos_disponibles, setasientos_disponibles] = useState('')
    const [origen, setorigen] = useState('')
    const [destino, setdestino] = useState('')
    const [fecha_salida, setFecha_salida] = useState('')
    const [hora_salida, sethora_salida] = useState('')
    const [hora_llegada, sethora_llegada] = useState('')
    const [tipo_servicio, settipo_servicio] = useState('')
    const [thumbnail, setThumbnail] = useState('')

    const params = useParams()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        // not send date y don't refres page
        e.preventDefault();
        try {
            const datetimeFechaSalida = fecha_salida ? `${fecha_salida}T00:00:00` : null;

            if (!params.id) {
                const res = await createViaje({ title, description, price, asientos_disponibles, origen, destino, fecha_salida: datetimeFechaSalida, hora_salida, hora_llegada, tipo_servicio, thumbnail })
                console.log(res);

            } else {
                const res = await updateViaje(params.id, { title, description, price, asientos_disponibles, origen, destino, fecha_salida: datetimeFechaSalida, hora_salida, hora_llegada, tipo_servicio, thumbnail })
                console.log(res);
            }
            navigate("/admin")
        } catch (error) {
            console.log(error);
        }
        e.target.reset();
    }
    useEffect(() => {
        if (params.id) {
            fetchViaje(params.id)
                .then(res => {
                    setTitle(res.data.title || '')
                    setDescription(res.data.description || '')
                    setPrice(res.data.price || '')
                    setasientos_disponibles(res.data.asientos_disponibles || '')
                    setorigen(res.data.origen || '')
                    setdestino(res.data.destino || '')
                    // setFecha_salida(res.data.fecha_salida || '')

                    const fechaSalidaFormatted = res.data.fecha_salida ? res.data.fecha_salida.split('T')[0] : '';
                    setFecha_salida(fechaSalidaFormatted);

                    sethora_salida(res.data.hora_salida || '')
                    sethora_llegada(res.data.hora_llegada || '')
                    settipo_servicio(res.data.tipo_servicio || '')
                    setThumbnail(res.data.thumbnail || '')
                })
                .catch((err) => console.log(err))
        }
    }, [])

    return (
        <div className="flex items-center justify-center h-[calc(100vh-10rem)]">
            <div className="form-container">
                <form className="bg-zinc-950 p-10" onSubmit={handleSubmit}>
                    <h1
                        className="text-3xl font-bold text-red-400 mb-5 my-4"
                    >
                        {
                            params.id ? 'Update Viaje' : 'Create Viaje'
                        }
                    </h1>
                    <input
                        type="text"
                        placeholder="title"
                        className="block py-2 px-3 mb-4 w-full text-black"
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                        autoFocus
                    />

                    <input
                        type="text"
                        placeholder="price"
                        className="block py-2 px-3 mb-4 w-full text-black"
                        onChange={(e) => setPrice(e.target.value)}
                        value={price}
                        autoFocus
                    />

                    <input
                        type="text"
                        placeholder="asientos_disponibles"
                        className="block py-2 px-3 mb-4 w-full text-black"
                        onChange={(e) => setasientos_disponibles(e.target.value)}
                        value={asientos_disponibles}
                        autoFocus
                    />

                    <input
                        type="text"
                        placeholder="origen"
                        className="block py-2 px-3 mb-4 w-full text-black"
                        onChange={(e) => setorigen(e.target.value)}
                        value={origen}
                        autoFocus
                    />

                    <input
                        type="text"
                        placeholder="destino"
                        className="block py-2 px-3 mb-4 w-full text-black"
                        onChange={(e) => setdestino(e.target.value)}
                        value={destino}
                        autoFocus
                    />

                    <input
                        type="date"
                        placeholder="fecha salida"
                        className="block py-2 px-3 mb-4 w-full text-black"
                        onChange={(e) => setFecha_salida(e.target.value)}
                        value={fecha_salida}
                        autoFocus
                    />

                    <input
                        type="text"
                        placeholder="hora salida"
                        className="block py-2 px-3 mb-4 w-full text-black"
                        onChange={(e) => sethora_salida(e.target.value)}
                        value={hora_salida}
                        autoFocus
                    />

                    <input
                        type="text"
                        placeholder="hora llegada"
                        className="block py-2 px-3 mb-4 w-full text-black"
                        onChange={(e) => sethora_llegada(e.target.value)}
                        value={hora_llegada}
                        autoFocus
                    />

                    <input
                        type="text"
                        placeholder="tipo servicio"
                        className="block py-2 px-3 mb-4 w-full text-black"
                        onChange={(e) => settipo_servicio(e.target.value)}
                        value={tipo_servicio}
                        autoFocus
                    />

                    <textarea
                        placeholder="description"
                        className="block py-2 px-3 mb-4 w-full text-black"
                        rows={3}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    ></textarea>

                    <input
                        type="text"
                        placeholder="link de la imagen"
                        className="block py-2 px-3 mb-4 w-full text-black"
                        onChange={(e) => setThumbnail(e.target.value)}
                        value={thumbnail}
                        autoFocus
                    />



                    <button
                        className="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 rounded mt-5"
                    >
                        {params.id ? 'Update Viaje' : 'Create Viaje'}
                    </button>
                </form >

                {params.id && (<button className="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 rounded mt-5"

                    onClick={async () => {
                        try {
                            const res = await deleteViaje(params.id)
                            console.log(res);
                            navigate("/admin")
                        } catch (error) {
                            console.log(error);
                        }
                    }}
                >
                    Delete
                </button>)}
            </div>
        </div>
    );
}


export default ViajeForm;