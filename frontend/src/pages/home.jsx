import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setShowAlbum, setArtistAlbum } from "../features/homepagesSlicer";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { setPlayList } from "../features/homepagesSlicer";

const Home = () => {
  const [allData, setAllData] = useState([]);
  const [loading, setLoading] = useState(true);
  const playList = useSelector((state) => state.home.playlist);
  const isAlbumOpen = useSelector((state) => state.home.showAlbum);
  const isArtistAlbum = useSelector((state) => state.home.artistAlbums);
  const dispatch = useDispatch();
  // console.log(playList[0].data.data.results[0].name);
  console.log("albums", isArtistAlbum);

  const tamilArtists = [
    "A. R. Rahman",
    "Ilaiyaraaja",
    "S. P. Balasubrahmanyam",
    "K. S. Chithra",
    "Anirudh Ravichander",
    "Harris Jayaraj",
    "Vijay Antony",
    "Yuvan Shankar Raja",
    "Sid Sriram",
    "Shreya Ghoshal",
    "Asha Bhosle",
    "Karthik",
    "Hariharan",
    "Srinivas",
    "Benny Dayal",
    "Deva",
    "G. V. Prakash Kumar",
    "D. Imman",
  ];
  const tamilPlaylists = [
    "Tamil Romantic Hits",
    "Kollywood Love Songs",
    "Melodious Tamil",
    "Trending Tamil Tracks",
    "Ilaiyaraaja Classics",
    "A. R. Rahman Tamil Hits",
    "Tamil Workout Mix",
    "Feel Good Tamil",
    "Tamil Chill Vibes",
    "Kadhal Kadhal",
    "Tamil Top 50",
    "Kuthu Dance Hits",
    "Tamil Sad Songs",
    "90s Tamil Hits",
    "Fresh Tamil Beats",
  ];

  useEffect(() => {
    const fetchArtistData = async () => {
      try {
        const result = await Promise.all(
          tamilArtists.map(async (artist) => {
            const [songsRes, artistRes] = await Promise.all([
              axios.get("http://localhost:3000/api/search/songs", {
                params: { query: `${artist} tamil` },
              }),
              axios.get("http://localhost:3000/api/search/artists", {
                params: { query: artist },
              }),
            ]);

            const songs = songsRes.data?.data?.results || [];
            const artistData = artistRes.data?.data?.results?.[0];
            const image = artistData?.image?.[2]?.url || ""; // Medium-size image

            return {
              artist,
              image,
              songs,
            };
          })
        );

        setAllData(result);
        setLoading(false);
      } catch (error) {
        console.error("API Error:", error);
        setLoading(false);
      }
    };

    fetchArtistData();
  }, []);

  const fetchAlbums = async (artist) => {
    const options = {
      method: "GET",
      url: "http://localhost:3000/api/search/albums",
      params: {
        query: `${artist} tamil`,
        limit: 50,
        page: 1,
      },
    };
    try {
      const { data } = await axios.request(options);

      dispatch(setArtistAlbum(data));
      dispatch(setShowAlbum());
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const response = await Promise.all(
          tamilPlaylists.map(async (type) => {
            const res = await axios.get(
              "http://localhost:3000/api/search/playlists",
              {
                params: {
                  query: `${type}, tamil`,
                },
              }
            );
            
            if ( res.data.data.total>0) {
              return {
                type: type,
                data: res.data,
              };
            } else {
              return null;
            }
          })
        );

        
        const filtered = response.filter(Boolean);
        dispatch(setPlayList(filtered));
        const playlistData = response.map((r) => r.data);
        console.log("Playlists:", playlistData);
      } catch (error) {
        console.error("Error fetching playlists:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlaylists();
  }, []);

  const capitalizeFirstLetter = (str) => {
    if (typeof str === "string" && str.length > 0) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    }
    return str;
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-[20%,1fr,20%] gap-6 w-[98%] mx-auto mt-10 ">
        <div className=" bg-custom-gray rounded-lg  h-[600px] overflow-y-auto scrollbar-hide pt-4">
          {/* <h1 className="font-bold text-2xl ml-3">Playlist</h1> */}
          {isAlbumOpen && (
            <div className="overflow-x-auto scrollbar-hide">
              {loading ? (
                <h1>loding</h1>
              ) : (
                <>
                  <h1 className="text-2xl font-bold ml-5">Popular</h1>
                  <div className="flex flex-col ">
                    {isArtistAlbum.data.results.map((song, i) => (
                      <div
                        key={i}
                        className="m-3 flex hover:bg-black  hover:rounded-lg "
                      >
                        <img
                          src={song.image[2].url}
                          alt=""
                          className="w-[90px] rounded-lg mr-5 "
                        />
                        <div className="">
                          <p>{song.name} </p>
                          <p>
                            {" "}
                            {capitalizeFirstLetter(song.language)} &nbsp;
                            {capitalizeFirstLetter(song.type)}
                          </p>
                          <Link
                            to={song.url}
                            target="blank"
                            className="text-[#1ED760]"
                          >
                            Play on Jio Svaan
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          )}
        </div>
     
        <div className=" h-[600px] overflow-x-auto scrollbar-hide bg-custom-gray rounded-lg ">
          {loading ? (
            <p>Loading...</p>
          ) : (
            // <Skeleton count={5} />
            <>
              <h1 className="text-2xl font-bold ml-5">Artist</h1>

              <div className="flex space-x-4 overflow-x-auto scrollbar-hide px-">
                {allData.map((entry, index) => (
                  <div
                    key={index}
                    className="p-5 w-[150px] flex-shrink-0"
                    onClick={() => fetchAlbums(entry.artist)}
                  >
                    {entry.image && (
                      <img
                        src={entry.image || <Skeleton />}
                        alt={entry.artist || <Skeleton />}
                        className="w-full rounded-full"
                      />
                    )}
                    <div className="text-center mt-2">
                      <h2>{entry.artist}</h2>
                      <p className="mt-2 text-gray-400">Artist</p>
                    </div>
                    {/* Uncomment below for song listing */}
                    {/* <ul style={{ marginTop: '10px' }}>
                  {entry.songs.length > 0 ? (
                    entry.songs.map((song, idx) => (
                      <li key={idx}>{song.name}</li>
                    ))
                  ) : (
                    <li>No songs found</li>
                  )}
                </ul> */}
                  </div>
                ))}
              </div>
             
            </>
          )}
          <div className="bg-custom-gray rounded-lg  overflow-y-auto scrollbar-hide pt-2">
            <h1 className="font-bold text-2xl ml-3">Playlist</h1>
            {playList.map((list, index) => (
              <React.Fragment key={index}>
                <div className="font-bold text-2xl ml-3 mt-5">{list.type}</div>

                {/* Make each row horizontally scrollable */}
                <div className="flex overflow-x-auto space-x-2 p-3  border-b-2 border-red-500 scrollbar-hide">
                  {list.data?.data?.results.map((playlist, index) => (
                    <div
                      key={index}
                      className="p-3 w-[150px] flex-shrink-0  hover:bg-black hover:rounded-lg"
                    >
                      <img
                        src={playlist.image[2].url}
                        alt="playlist"
                        className="w-full rounded-lg mb-3"
                      />
                      <div className=" text-gray-300 text-sm  text-gray-400">
                        {playlist.name}
                      </div>
                    </div>
                  ))}
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>

        <div className="bg-custom-gray rounded-lg  ">
          <div className="rounded-lg shadow-lg">
            <div className="flex justify-between w-[85%] mt-5 mx-auto">
              <p>Credits </p> <p>show All</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
