import { useRef, useState } from "react";
import { Heading } from "./Heading";
import "./SongPlayer.css";
import PlayArrowRoundedIcon from "@material-ui/icons/PlayArrow";
import PauseRoundedIcon from "@material-ui/icons/Pause";
import SkipNextRoundedIcon from "@material-ui/icons/SkipNextRounded";
import SkipPreviousRoundedIcon from "@material-ui/icons/SkipPreviousRounded";

export function SongPlayer({
  showControls = false,
  song,
  onPreviousSong,
  onNextSong
}) {
  const audioRef = useRef();
  const { audioUrl, coverUrl } = song;

  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  function handlePreviousSong() {
    onPreviousSong();
    setIsAudioPlaying(false);
  }
  function handleNextSong() {
    onNextSong();
    setIsAudioPlaying(false);
  }

  return (
    <section className="SongPlayer">
      <Heading title="Music Player" />
      <img width="250" height="250" src={coverUrl} alt="Song cover" />
      <audio loop ref={audioRef} key={audioUrl} controls={showControls}>
        <source src={audioUrl} />
      </audio>
      <div className="SongPlayerControls">
        <SkipPreviousRoundedIcon
          onClick={handlePreviousSong}
        ></SkipPreviousRoundedIcon>
        {isAudioPlaying ? (
          <PauseRoundedIcon
            onClick={() => {
              audioRef.current.pause();
              setIsAudioPlaying(false);
            }}
          ></PauseRoundedIcon>
        ) : (
          <PlayArrowRoundedIcon
            onClick={() => {
              audioRef.current.play();
              setIsAudioPlaying(true);
            }}
          ></PlayArrowRoundedIcon>
        )}
        <SkipNextRoundedIcon onClick={handleNextSong}></SkipNextRoundedIcon>
      </div>
    </section>
  );
}
