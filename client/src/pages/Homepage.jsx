import { useEffect, useState } from "react";
// import axios from "axios";
import ViajeList from "../components/ViajeList";
import { fetchViajes } from '../api/viajes'

function Homepage() {

    const [viajes, setViajes] = useState([]);

    useEffect(() => {
        fetchViajes()
            .then(res => {
                setViajes(res.data)
            })
            .catch(err => console.log(err))

        // async function fetchViajes() {
        //     const res = await axios.get("http://localhost:8000/api/viajes");
        //     // console.log(res);
        //     setViajes(res.data);
        // }

        // fetchViajes();
    }, []);

    return (
        <>
            {/* <h1 className="text-3xl font-bold text-red-400">Homepage</h1> */}
            <ViajeList viajes={viajes} />
            {/* {
                viajes.map(viaje => (
                    <div key={viaje._id}>
                        <h2>{viaje.title}</h2>
                        <p>{viaje.description}</p>
                    </div>
                ))
            } */}
        </>
    )
}

export default Homepage;