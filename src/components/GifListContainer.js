import React, { useState } from "react";
import GifList from "./GifList";
import GifSearch from "./GifSearch";

function GifListContainer() {
  const [gifs, setGifs] = useState([]);
  const API_KEY = process.env.REACT_APP_API_KEY;

  const handleFormSubmit = async (searchQuery) => {
    try {
      const response = await fetch(
        `https://api.giphy.com/v1/gifs/search?q=${searchQuery}&api_key=${API_KEY}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const responseData = await response.json();
      setGifs(responseData.data.slice(0, 3));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  console.log("THIS IS THE STATE:", gifs);

  return (
    <>
      <GifList gifs={gifs} />
      <GifSearch onFormSubmit={handleFormSubmit} />
    </>
  );
}

export default GifListContainer;
