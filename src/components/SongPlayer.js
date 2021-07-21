import { useRef } from "react";
import { Heading } from "./Heading";
import "./SongPlayer.css";
import PlayArrowRoundedIcon from "@material-ui/icons/PlayArrow";
import PauseRoundedIcon from "@material-ui/icons/Pause";

export function SongPlayer({ showControls = false, song }) {
  const audioRef = useRef();
  const { audioUrl, coverUrl } = song;
  return (
    <section className="SongPlayer">
      <Heading title="Music Player" />
      <img width="250" height="250" src={coverUrl} alt="Song cover" />
      <audio ref={audioRef} key={audioUrl} controls={showControls}>
        <source src={audioUrl} />
      </audio>
      <div className="SongPlayerControls">
        <PlayArrowRoundedIcon
          onClick={() => audioRef.current.play()}
        ></PlayArrowRoundedIcon>
        <PauseRoundedIcon
          onClick={() => audioRef.current.pause()}
        ></PauseRoundedIcon>
      </div>
    </section>
  );
}
