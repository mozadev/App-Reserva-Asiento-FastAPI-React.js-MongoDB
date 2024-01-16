import ViajeCard from "../components/ViajeCard.jsx";

function ViajeList({ viajes }) {
    return (
        <div className="grid grid-cols-3 gap-4">
            {
                viajes.map(viaje => (
                    <ViajeCard viaje={viaje} key={viaje._id} />
                    // <div key={viaje._id} className="bg-zinc-950 p-4
                    // hover:cursor-pointer hover:bg-gray-950">
                    //     <h2>{viaje.title}</h2>
                    //     <p>{viaje.description}</p>
                    // </div>
                ))
            }
        </div>

    )
}

export default ViajeList