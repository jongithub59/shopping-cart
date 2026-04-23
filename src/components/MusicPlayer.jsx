import { useState, useEffect, useRef } from "react";
import shopMusic from "../assets/curio_music.mp3";
import music from "../assets/music_note.png";
import noMusic from "../assets/music_note_slash.svg";

function MusicPlayer() {
  const audioRef = useRef(null); // state variable for reference to <audio> element so we can manipulate it later
  const [isPlaying, setIsPlaying] = useState(false);

  // turn background music on and off
  function toggleMusic() {
    if (!audioRef.current) return; // check to prevent errors with null values
    // pause music if already playing
    if (isPlaying) {
      audioRef.current.pause();
      // otherwise play music as normal
    } else {
      audioRef.current.volume = 0.2; //set default volume when playing
      audioRef.current.play();
    }

    // flip state to opposite
    setIsPlaying(!isPlaying);
  }

  return (
    <>
      {/* button for toggling music */}
      <div className="musicButton">
        <button onClick={toggleMusic}>
          <img src={isPlaying ? music : noMusic} alt="music note" />
        </button>

        {/* reference to manipulate audio html tag */}
        <audio ref={audioRef} loop>
          <source src={shopMusic} type="audio/mpeg" />
        </audio>
      </div>
    </>
  );
}

export default MusicPlayer;
