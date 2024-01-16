from motor.motor_asyncio import AsyncIOMotorClient
from models import Viaje
from bson import (
    ObjectId,
)  # importamos to convert string to ObjectId in get_one_viaje_id

client = AsyncIOMotorClient("mongodb://localhost:27017")
database = client.viajedatabase
collection = database.viajes


async def get_one_viaje_id(id):
    viaje = await collection.find_one({"_id": ObjectId(id)})
    return viaje


async def get_one_viaje(title):
    viaje = await collection.find_one({"title": title})
    return viaje


async def get_all_viajes():
    viajes = []
    cursor = collection.find({})
    async for document in cursor:
        viajes.append(Viaje(**document))
    return viajes


async def create_viaje(viaje):
    new_viaje = await collection.insert_one(viaje)
    created_viaje = await collection.find_one({"_id": new_viaje.inserted_id})
    return created_viaje


async def update_viaje(id: str, data):
    viaje = {k: v for k, v in data.dict().items() if v is not None}
    print(viaje)
    await collection.update_one({"_id": ObjectId(id)}, {"$set": viaje})
    document = await collection.find_one({"_id": ObjectId(id)})
    return document


async def delete_viaje(id: str):
    await collection.delete_one({"_id": ObjectId(id)})
    return True
