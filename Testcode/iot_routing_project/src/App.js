import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [distances, setDistances] = useState(null);

  useEffect(() => {
    const fetchDistances = async () => {
      try {
        const response = await axios.post(
          '/api/distances',
          {
            locations: [
              [8.681495, 49.41461],
              [8.687872, 49.420318],
              [8.682127, 49.416283]
            ]
          },
          {
            headers: {
              'Content-Type': 'application/json'
            }
          }
        );
        setDistances(response.data.distances);
      } catch (error) {
        console.error('Error fetching distances:', error);
      }
    };

    fetchDistances();
  }, []);

  return (
    <div>
      <h1>Distance Matrix</h1>
      {distances ? (
        <pre>{JSON.stringify(distances, null, 2)}</pre>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default App;
