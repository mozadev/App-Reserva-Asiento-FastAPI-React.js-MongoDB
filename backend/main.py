from fastapi import FastAPI
from routes.viaje import viaje
from fastapi.middleware.cors import CORSMiddleware
from decouple import config

app = FastAPI()
print(config('FRONTEND_URL'))
#this is to configure array by out
origins = [
    config('FRONTEND_URL'),
    # 'http://localhost:3000'
    #'http://localhost:8000'
    # 'http://localhost:8080'
    # 'http://localhost:8081'
]
app.add_middleware(
    CORSMiddleware,
    #allow_origins = ['http://localhost:5173'],
    allow_origins = origins,
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*']
    
)
@app.get("/")
def welcome():
    return {"message": "hola cesar"}
app.include_router(viaje)
