from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pymongo import MongoClient
from bson import ObjectId
import requests
from typing import List, Dict
import itertools

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# MongoDB connection setup
client = MongoClient('mongodb+srv://User1:GiaHy@cluster0.gpocbk2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
db = client['hidden_one']
collection = db['basim']

# Mapbox API key
MAPBOX_API_KEY = 'pk.eyJ1IjoidG9naWFoeSIsImEiOiJjbHd3NThyeXgwdWE0MnFxNXh3MzF4YjE3In0.Ikxdlh66ijGULuZhR3QaMw'

# Starting location coordinates
START_LOCATION = {"lat": 10.753688014887688, "lng": 106.63344825126651}

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

@app.post("/multi-run-route")
def multi_run_route(bins: List[Dict], max_weight: int = 100, bin_max_weight: int = 50):
    def solve_tsp(travel_time_matrix):
        num_locations = len(travel_time_matrix)
        min_cost = float('inf')
        min_route = []
        for perm in itertools.permutations(range(1, num_locations)):
            route = [0] + list(perm) + [0]
            cost = sum(travel_time_matrix[route[i]][route[i + 1]] for i in range(len(route) - 1))
            if cost < min_cost:
                min_cost = cost
                min_route = route
        return min_route, min_cost

    run1_bins = []
    run2_bins = []
    current_weight = 0
    current_run = 1

    # Ensure the starting location is included at the start of the first run
    if bins and (bins[0]['lat'] != START_LOCATION['lat'] or bins[0]['lng'] != START_LOCATION['lng']):
        bins.insert(0, {"name": "Start", "lat": START_LOCATION['lat'], "lng": START_LOCATION['lng'], "fullness": 0})

    for bin in bins:
        if bin['lat'] == START_LOCATION['lat'] and bin['lng'] == START_LOCATION['lng']:
            if current_run == 2:
                run2_bins.append(bin)
            else:
                run1_bins.append(bin)
            continue

        bin_weight = (bin['fullness'] / 100) * bin_max_weight

        if current_weight + bin_weight > max_weight:
            current_run += 1
            current_weight = 0  # Reset the weight for the new run
            if current_run > 2:
                break

        if current_run == 1:
            run1_bins.append(bin)
        elif current_run == 2:
            run2_bins.append(bin)

        current_weight += bin_weight

    # Ensure the runs end at the starting location
    if run1_bins and (run1_bins[-1]['lat'] != START_LOCATION['lat'] or run1_bins[-1]['lng'] != START_LOCATION['lng']):
        run1_bins.append({"name": "Start", "lat": START_LOCATION['lat'], "lng": START_LOCATION['lng'], "fullness": 0})
    if run2_bins and (run2_bins[-1]['lat'] != START_LOCATION['lat'] or run2_bins[-1]['lng'] != START_LOCATION['lng']):
        run2_bins.append({"name": "Start", "lat": START_LOCATION['lat'], "lng": START_LOCATION['lng'], "fullness": 0})

    def optimize_run(bins):
        if len(bins) > 1:
            travel_time_matrix = get_travel_time_matrix(bins)
            route, _ = solve_tsp(travel_time_matrix)
            return [bins[i] for i in route]
        return bins

    optimized_run1_bins = optimize_run(run1_bins)
    optimized_run2_bins = optimize_run(run2_bins)

    return JSONResponse(content={"Run1": optimized_run1_bins, "Run2": optimized_run2_bins})


@app.post("/filter-bins-by-weight")
def filter_bins_by_weight(bins: List[Dict], max_weight: int = 100, bin_max_weight: int = 50):
    filtered_bins = []
    current_weight = 0

    # Ensure the starting location is included in the route
    for bin in bins:
        if bin['lat'] == START_LOCATION['lat'] and bin['lng'] == START_LOCATION['lng']:
            filtered_bins.append(bin)
            break
    else:
        raise HTTPException(status_code=400, detail="Starting location not found in the bins list.")

    # Filter the bins based on the weight limit
    for bin in bins:
        if bin['lat'] == START_LOCATION['lat'] and bin['lng'] == START_LOCATION['lng']:
            continue
        
        # Calculate the actual weight of the bin based on its fullness percentage
        bin_weight = (bin['fullness'] / 100) * bin_max_weight

        # Check if adding this bin exceeds the set weight limit
        if current_weight + bin_weight <= max_weight:
            filtered_bins.append(bin)
            current_weight += bin_weight

    if len(filtered_bins) == 1:  # Only the starting location is included
        raise HTTPException(status_code=400, detail="No bins can be collected within the weight limit.")

    travel_time_matrix = get_travel_time_matrix(filtered_bins)
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
        filteredRoute, filteredCost = solve_tsp()
        optimized_bins = [filtered_bins[i] for i in filteredRoute]
        return JSONResponse(content={"filteredRoute": filteredRoute, "filteredCost": filteredCost, "filtered_bins": optimized_bins})
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

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
    # Ensure the starting location is the first in the list
    starting_index = next((i for i, bin in enumerate(bins) if bin['lat'] == START_LOCATION['lat'] and bin['lng'] == START_LOCATION['lng']), None)
    if starting_index is None:
        raise HTTPException(status_code=400, detail="Starting location not found in the bins list.")
    
    # Move the starting location to the first position if it's not already there
    if starting_index != 0:
        bins.insert(0, bins.pop(starting_index))

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
            route = [0] + list(perm) + [0]
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

@app.post("/baseline-route")
def baseline_route(bins: List[Dict]):
    # Ensure the starting location is the first in the list
    starting_index = next((i for i, bin in enumerate(bins) if bin['lat'] == START_LOCATION['lat'] and bin['lng'] == START_LOCATION['lng']), None)
    if starting_index is None:
        raise HTTPException(status_code=400, detail="Starting location not found in the bins list.")
    
    # Move the starting location to the first position if it's not already there
    if starting_index != 0:
        bins.insert(0, bins.pop(starting_index))
    
    return JSONResponse(content={"route": list(range(len(bins))), "cost": 0, "optimized_bins": bins})

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)
