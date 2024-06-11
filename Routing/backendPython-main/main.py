from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List

app = FastAPI()

class TravelTimeRequest(BaseModel):
    travel_time_matrix: List[List[int]]

# In-memory storage for travel times
travel_times_storage = [
    [0, 15, 30, 45],  # Times from warehouse to other locations
    [15, 0, 10, 25],  # Times from cust1 to other locations
    [30, 10, 0, 20],  # Times from cust2 to other locations
    [45, 25, 20, 0]   # Times from cust3 to other locations
]

@app.get("/get-travel-times")
async def get_travel_times():
    return travel_times_storage

@app.post("/find-route")
async def find_route(data: TravelTimeRequest):
    travel_time_matrix = data.travel_time_matrix
    num_locations = len(travel_time_matrix)
    
    def compute_route_time(route):
        total_time = 0
        for i in range(len(route) - 1):
            total_time += travel_time_matrix[route[i]][route[i + 1]]
        return total_time

    def solve_tsp():
        import itertools
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
        return {"route": route, "cost": cost}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Enable CORS
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins, adjust this to your needs
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
