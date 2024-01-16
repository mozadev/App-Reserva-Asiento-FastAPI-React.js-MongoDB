from fastapi import APIRouter, HTTPException
from database import get_all_viajes, create_viaje, get_one_viaje
from database import get_one_viaje_id, delete_viaje, update_viaje
from models import Viaje, UpdateViaje

viaje = APIRouter()


@viaje.get("/api/viajes")
async def get_viajes():
    viajes = await get_all_viajes()
    return viajes


@viaje.post("/api/viajes", response_model=Viaje)
async def save_viaje(viaje: Viaje):
    viajeFound = await get_one_viaje(viaje.title)
    if viajeFound:
        raise HTTPException(400, "Viaje already exists")
    response = await create_viaje(viaje.model_dump())
    if response:
        return response
    raise HTTPException(400, "Something went wrong")


@viaje.get("/api/viajes/{id}", response_model=Viaje)
async def get_viaje(id: str):
    viaje = await get_one_viaje_id(id)
    if viaje:
        return viaje
    raise HTTPException(404, f"Viaje with {id} not found")


@viaje.put("/api/viajes/{id}", response_model=Viaje)
async def put_viaje(id: str, viaje: UpdateViaje):
    response = await update_viaje(id, viaje)
    if response:
        return response
    return HTTPException(404, f"Viaje with {id} not found")


@viaje.delete("/api/viajes/{id}")
async def remove_task(id: str):
    response = await delete_viaje(id)
    if response:
        return "Successfully deleted viaje"
    raise HTTPException(404, f"Viaje with {id} not found")
