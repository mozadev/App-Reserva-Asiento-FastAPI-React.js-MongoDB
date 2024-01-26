
import { Link } from "react-router-dom"

function Navbar() {
    return (
        <header className="flex justify-between items-center my-7">
            <Link to="/admin">
                <h1 className="text-3xl font-bold"> Sistema de Venta de Boleto de Viaje 💼 -  Moza-Bus 🚌 (Panel Administrativo)</h1>
            </Link>
            <Link
                to="/viajes/new"
                className="bg-zinc-950 hover:bg-gray-950 text-white font-bold
                py-2 px-4 rounded"
            >Create Viaje</Link>
        </header>
    )
}
export default Navbar