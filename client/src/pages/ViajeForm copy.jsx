

import { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom'
// import axios from 'axios'
import { fetchViaje, createViaje, updateViaje, deleteViaje } from '../api/viajes'

function ViajeForm() {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const params = useParams()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        // not send date y don't refres page
        e.preventDefault();

        try {
            if (!params.id) {
                const res = await createViaje({ title, description })
                console.log(res);
                // const res = await axios.post(
                //     'http://localhost:8000/api/viajes',
                //     {
                //         title,
                //         description,
                //     });
            } else {
                const res = await updateViaje(params.id, { title, description })
                console.log(res);
                // const res = await axios.put(
                //     `http://localhost:8000/api/viajes/${params.id}`,
                //     {
                //         title,
                //         description,
                //     }
                // );
            }
            navigate("/")
        } catch (error) {
            console.log(error);
        }
        e.target.reset();
        // console.log(title, description)
        // const res = await fetch('http://localhost:8000/api/viajes',
        //     {
        //         method: 'POST',
        //         body: JSON.stringify({
        //             title,
        //             description
        //         }),
        //         headers: {
        //             'Content-type': 'application/json'
        //         }
        //     })
        // const data = await res.json()
        // console.log(res);
        // console.log(e.target);
    }
    useEffect(() => {
        if (params.id) {
            fetchViaje(params.id)
                .then(res => {
                    setTitle(res.data.title || '')
                    setDescription(res.data.description || '')
                })
                .catch((err) => console.log(err))


            // console.log("editando")
            // loadViaje()
        }

        // async function loadViaje() {
        //     const res = await axios.get(`http://localhost:8000/api/viajes/${params.id}`)
        //     console.log(res);
        //     setTitle(res.data.title)
        //     setDescription(res.data.description)
        // }

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
                    <textarea
                        placeholder="description"
                        className="block py-2 px-3 mb-4 w-full text-black"
                        rows={3}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
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
                            // const res = await axios.delete
                            //     (`http://localhost:8000/api/viajes/${params.id}`)
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