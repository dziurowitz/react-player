import { useEffect, useState } from "react";
import { Heading } from "./Heading";
import { SongListItem } from "./SongListItem";
import { SongPlayer } from "./SongPlayer";
import { Songs } from "./Songs";
import "./App.css";

export function App() {
  const URL = "https://examples.devmastery.pl/songs-api/songs";
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    fetch(URL).then((response) => {
      if (response.ok) {
        response.json().then(setSongs);
      }
    });
  }, []);

  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const currentSong = songs[currentSongIndex];

  function handleSelectSong(selectedSong) {
    const audioIndex = songs.findIndex(
      (song) => song.audioUrl === selectedSong.audioUrl
    );
    if (audioIndex >= 0) {
      setCurrentSongIndex(audioIndex);
    }
  }

  const handlePreviousSong = () => {
    const previousCurrentSongIndex = currentSongIndex;
    setCurrentSongIndex(
      (previousCurrentSongIndex + songs.length - 1) % songs.length
    );
  };

  const handleNextSong = () => {
    const previousCurrentSongIndex = currentSongIndex;
    setCurrentSongIndex((previousCurrentSongIndex + 1) % songs.length);
  };

  return (
    <div className="App">
      {songs.length === 0 ? (
        "Loading..."
      ) : (
        <>
          <SongPlayer
            song={currentSong}
            onPreviousSong={handlePreviousSong}
            onNextSong={handleNextSong}
          />
          <Songs>
            <Heading title="Songs" />
            <ul>
              {songs.map((song) => (
                <SongListItem
                  key={song.audioUrl}
                  song={song}
                  isCurrent={currentSong.audioUrl === song.audioUrl}
                  onSelect={handleSelectSong}
                />
              ))}
            </ul>
          </Songs>
        </>
      )}
    </div>
  );
}
