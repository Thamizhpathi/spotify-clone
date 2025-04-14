import React, { useEffect, useState } from 'react';

const Home = () => {
  const [topTracks, setTopTracks] = useState([]);

  const token = 'BQA1VTrTllRfiv3CjBBNMFSGuSskFZGbOTORgAft5sOV7QvneyUiTWb_L3y8yjCzqQLBDSazucWpdjxrWSD1he_uR4apODRK437iWnzq5o_pjwZ810jiEQ6DXjdl6zvntI-z5vkVViwy517m7VoKv_GrDLCXdiS2ZoH2cErbbZZBP1ShEIOUsURF2Ij5xVaXBPKjdpRCR16SBgxNskNdOeCVFAnRTJ_jEl4rUBUPFt_f2IbMjyDRWJS0JItuKjvbYDHZQHj0bDXVyItGP-jiGIm3qdXmJ0aJR_f1JLappepnhQJWvqPGhv8u6MUpoJPw';

  async function fetchWebApi(endpoint, method, body) {
    const res = await fetch(`https://api.spotify.com/${endpoint}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      method,
      body: body ? JSON.stringify(body) : null,
    });
    return await res.json();
  }

  async function getTopTracks() {
    const data = await fetchWebApi(
      'v1/me/top/tracks?time_range=long_term&limit=5', 'GET'
    );
    return data.items || [];
  }

  useEffect(() => {
    const fetchTracks = async () => {
      const tracks = await getTopTracks();
      setTopTracks(tracks);
      console.log(
        tracks.map(
          ({ name, artists }) =>
            `${name} by ${artists.map(artist => artist.name).join(', ')}`
        )
      );
    };

    fetchTracks();
  }, []);

  return (
    <div>
      <h2>Your Top Tracks:</h2>
      <ul>
        {topTracks.map((track) => (
          <li key={track.id}>
            {track.name} by {track.artists.map(artist => artist.name).join(', ')}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;

