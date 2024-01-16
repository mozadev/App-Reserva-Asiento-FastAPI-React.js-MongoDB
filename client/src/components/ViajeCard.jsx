import { useNavigate } from 'react-router-dom'

function ViajeCard({ viaje }) {
    const navigate = useNavigate()
    return (
        <div className="bg-zinc-950 p-4 hover:cursor-pointer
        hover:bg-gray-950" onClick={() => {
                navigate(`/viajes/${viaje._id}`)
                //navigate('/viajes/' + viaje._id)
            }}>
            <h2 className='font-bold text-2xl'>{viaje.title}</h2>
            <p className='text-slate-300'>{viaje.description}</p>
        </div>
    )
}

export default ViajeCard