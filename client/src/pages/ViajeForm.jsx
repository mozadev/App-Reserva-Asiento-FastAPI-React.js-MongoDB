

import { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom'
// import axios from 'axios'
import { fetchViaje, createViaje, updateViaje, deleteViaje } from '../api/viajes'

function ViajeForm() {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [stock, setStock] = useState('')
    const [category, setCategory] = useState('')
    const [thumbnail, setThumbnail] = useState('')

    const params = useParams()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        // not send date y don't refres page
        e.preventDefault();
        try {
            if (!params.id) {
                const res = await createViaje({ title, description, price, stock, category, thumbnail })
                console.log(res);

            } else {
                const res = await updateViaje(params.id, { title, description, price, stock, category, thumbnail })
                console.log(res);
            }
            navigate("/")
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
                    setStock(res.data.stock || '')
                    setCategory(res.data.category || '')
                    setThumbnail(res.data.thumbnail || '')
                })
                .catch((err) => console.log(err))
        }
    }, [])

    return (
        <div className="flex items-center justify-center h-[calc(100vh-10rem)]">
            <div>
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
                        placeholder="stock"
                        className="block py-2 px-3 mb-4 w-full text-black"
                        onChange={(e) => setStock(e.target.value)}
                        value={stock}
                        autoFocus
                    />

                    <input
                        type="text"
                        placeholder="category"
                        className="block py-2 px-3 mb-4 w-full text-black"
                        onChange={(e) => setCategory(e.target.value)}
                        value={category}
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
                            navigate("/")
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