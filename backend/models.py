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
    stock: int = Field(..., gt=0, le=40)
    category: str
    thumbnail: str
    completed: bool = False

    class Config:
        from_atributes = True
        populate_by_name = True
        json_encoders = {ObjectId: str}


class UpdateViaje(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    completed: Optional[bool] = False
    price: Optional[int] = Field(..., gt=0, le=100)
    stock: Optional[int] = Field(..., gt=0, le=40)
    category: Optional[str] = None
    thumbnail: Optional[str] = None

    class Config:
        from_atributes = True
        populate_by_name = True
        json_encoders = {ObjectId: str}
