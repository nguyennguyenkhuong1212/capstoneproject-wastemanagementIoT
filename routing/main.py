from fastapi import FastAPI, HTTPException
app = FastAPI()
from fastapi.middleware.cors import CORSMiddleware
import itertools
from pymongo import MongoClient
import requests
from bson import ObjectId
from fastapi.responses import JSONResponse
from typing import List, Dict

app = FastAPI()

# MongoDB connection setup
client = MongoClient('mongodb+srv://User1:GiaHy@cluster0.gpocbk2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
db = client['hidden_one']
collection = db['basim']

# Mapbox API key
MAPBOX_API_KEY = 'pk.eyJ1IjoidG9naWFoeSIsImEiOiJjbHd3NThyeXgwdWE0MnFxNXh3MzF4YjE3In0.Ikxdlh66ijGULuZhR3QaMw'

## Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins, adjust this to your needs
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def json_serial(obj):
    """JSON serializer for objects not serializable by default json code"""
    if isinstance(obj, ObjectId):
        return str(obj)
    raise TypeError("Type not serializable")

@app.get("/get-locations")
def get_locations():
    locations = list(collection.find())  # Get all documents from the collection
    for loc in locations:
        loc["_id"] = str(loc["_id"])  # Convert ObjectId to string
    return JSONResponse(content=locations)

def get_travel_time_matrix(locations):
    coordinates = ";".join([f"{loc['lng']},{loc['lat']}" for loc in locations])
    
    url = f"https://api.mapbox.com/directions-matrix/v1/mapbox/driving/{coordinates}?access_token={MAPBOX_API_KEY}"
    
    response = requests.get(url)
    if response.status_code != 200:
        raise HTTPException(status_code=response.status_code, detail="Error fetching travel times from Mapbox API")
    
    data = response.json()
    return data['durations']

@app.post("/find-route")
def find_route():
    locations = list(collection.find())  # Get all documents from the collection
    for loc in locations:
        loc["_id"] = str(loc["_id"])  # Convert ObjectId to string
    travel_time_matrix = get_travel_time_matrix(locations)
    num_locations = len(travel_time_matrix)
    
    def compute_route_time(route):
        total_time = 0
        for i in range(len(route) - 1):
            total_time += travel_time_matrix[route[i]][route[i + 1]]
        return total_time

    def solve_tsp():
        min_cost = float('inf')
        min_route = []
        for perm in itertools.permutations(range(1, num_locations)):
            route = [0] + list(perm) + [0]
            cost = compute_route_time(route)
            if cost < min_cost:
                min_cost = cost
                min_route = route
        return min_route, min_cost

    try:
        route, cost = solve_tsp()
        return JSONResponse(content={"route": route, "cost": cost, "locations": locations})
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/optimize-route")
def optimize_route(bins: List[Dict]):
    travel_time_matrix = get_travel_time_matrix(bins)
    num_locations = len(travel_time_matrix)
    
    def compute_route_time(route):
        total_time = 0
        for i in range(len(route) - 1):
            total_time += travel_time_matrix[route[i]][route[i + 1]]
        return total_time

    def solve_tsp():
        min_cost = float('inf')
        min_route = []
        for perm in itertools.permutations(range(1, num_locations)):
            route = [0] + list(perm)
            cost = compute_route_time(route)
            if cost < min_cost:
                min_cost = cost
                min_route = route
        return min_route, min_cost

    try:
        route, cost = solve_tsp()
        optimized_bins = [bins[i] for i in route]
        return JSONResponse(content={"route": route, "cost": cost, "optimized_bins": optimized_bins})
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)
