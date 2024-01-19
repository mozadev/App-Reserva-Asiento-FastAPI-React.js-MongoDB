from datetime import datetime
from pydantic import BaseModel, Field
from typing import Optional
from bson import (
    ObjectId,
)  # importamos el ObjectId de bson para poder usarlo en la clase PyObjectId


class PyObjectId(ObjectId):
    @classmethod
    def __get_validators__(cls):
        yield cls.validate

    @classmethod
    def validate(cls, v, values):
        if not ObjectId.is_valid(v):
            raise ValueError("Invalid objectid")
        return str(v)


class Viaje(BaseModel):
    id: Optional[PyObjectId] = Field(alias="_id", default=None)
    title: str
    description: Optional[str] = None
    price: int = Field(..., gt=0, le=100)
    asientos_disponibles: int = Field(..., gt=0, le=40)
    origen: str
    destino: str
    fecha_salida: datetime
    hora_salida: str
    hora_llegada: str
    tipo_servicio: str
    thumbnail: str
    completed: bool = False
    


    class Config:
        from_atributes = True
        populate_by_name = True
        json_encoders = {ObjectId: str}


class UpdateViaje(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    price: Optional[int] = Field(..., gt=0, le=100)
    asientos_disponibles: Optional[int] = Field(..., gt=0, le=40)
    origen: Optional[str] = None
    destino: Optional[str] = None
    fecha_salida: Optional[datetime] = None
    hora_salida: Optional[str] = None
    hora_llegada: Optional[str] = None
    tipo_servicio: Optional[str] = None
    thumbnail: Optional[str] = None
    completed: Optional[bool] = False
    
    
 

    class Config:
        from_atributes = True
        populate_by_name = True
        json_encoders = {ObjectId: str}
