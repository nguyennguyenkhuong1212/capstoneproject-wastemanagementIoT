from flask import Flask, request, jsonify
import requests

app = Flask(__name__)

API_KEY = '5b3ce3597851110001cf6248d53c8cd304df47cfaf6c1d7306881793'  # Replace with your API key

def get_distance_matrix(api_key, locations):
    url = 'https://api.openrouteservice.org/v2/matrix/driving-car'
    headers = {
        'Authorization': api_key,
        'Content-Type': 'application/json'
    }
    body = {
        'locations': locations,
        'metrics': ['distance'],  # Requesting distance metric only
        'units': 'm'  # Distance in meters
    }
    response = requests.post(url, json=body, headers=headers)
    return response.json()

@app.route('/api/distances', methods=['POST'])
def distances():
    data = request.json
    locations = data['locations']
    distance_matrix_response = get_distance_matrix(API_KEY, locations)
    # Extract only the distances from the response
    distances = distance_matrix_response.get('distances', [])
    return jsonify({'distances': distances})

if __name__ == '__main__':
    app.run(debug=True)
