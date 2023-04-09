import { useEffect, useReducer, useRef, useState } from "react";

export default function VideoPlayer(props) {
  const [controls, setControls] = useState(false);
  const videoRef = useRef(null);
  const videoContainer = useRef(null);
  const [fullscreen, setFullscreen] = useState(false);
  const [curreTime, setCurreTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMute, setIsMute] = useState(false);
  const [, forceUpdate] = useReducer((x) => x + 1, 0);

  const showControls = (e) => {
    setControls(true);
  };

  const closeControls = (e) => {
    setControls(false);
  };

  const handlePlay = () => {
    setIsPlaying(true);
    videoRef.current.play();
    videoRef.current.ontimeupdate = (evt) => {
      setCurreTime(videoRef.current.currentTime);
    };
  };

  const handlePause = () => {
    setIsPlaying(false);
    videoRef.current.pause();
  };

  const getVideoTime = (dur, currTime) => {
    const duration = dur;
    var durH = Math.floor(duration / 3600);
    var durM = Math.floor((duration % 3600) / 60);
    var durS = Math.floor((duration % 3600) % 60);

    const currentTime = currTime;
    var curH = Math.floor(currentTime / 3600);
    var curM = Math.floor((currentTime % 3600) / 60);
    var curS = Math.floor((currentTime % 3600) % 60);
    return `${curH > 0 ? (curH > 9 ? curH : `0${curH}`) : ""}${
      curM > 9 ? curM : `0${curM}:${curS > 9 ? curS : `0${curS}`}`
    } / ${durH > 0 ? (durH > 9 ? durH : `0${durH}`) : ""}${
      durM > 9 ? durH : `0${durM}:${durS > 9 ? durS : `0${durS}`}`
    }`;
  };

  const getCurrTimeWidth = (curTime, duration) => {
    var percent = (curTime / duration) * 100;
    return percent;
  };

  const changeCurrentTime = (e) => {
    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left;

    const posInPercent = (x / e.target.clientWidth) * 100;
    var vidTimePosInSecond = (posInPercent / 100) * duration;

    if (vidTimePosInSecond < 0) {
      vidTimePosInSecond = 0;
    }
    videoRef.current.currentTime = vidTimePosInSecond;
    setCurreTime(vidTimePosInSecond);
  };

  const toggleFullscreen = (e) => {
    if (fullscreen) {
      setFullscreen(false);
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    } else {
      setFullscreen(true);
      const videoCont = videoContainer.current;

      if (videoCont.requestFullscreen) {
        videoCont.requestFullscreen();
      } else if (videoCont.webkitRequestFullscreen) {
        videoCont.webkitRequestFullscreen();
      } else if (videoCont.msRequestFullscreen) {
        videoCont.msRequestFullscreen();
      }
    }
  };

  const muteVideo = () => {
    if (isMute) {
      videoRef.current.volume = 1;
      setIsMute(false);
    } else {
      videoRef.current.volume = 0;
      setIsMute(true);
    }
  };

  const handleVideoLoaded = (e) => {
    setDuration(e.target.duration);
    props.loaded(e);
  };

  return (
    <div
      className="w-full h-[400px] relative flex items-center justify-center bg-black"
      onMouseEnter={showControls}
      onMouseLeave={closeControls}
      ref={videoContainer}
    >
      {controls ? (
        <div className="w-full h-full bg-[rgba(0,0,0,0.25)] absolute text-gray-300">
          <div className="w-full h-full relative">
            <div className="w-full absolute top-0 left-0 px-8 py-4 flex ">
              <div className="text-sm truncate">{props.videoName}</div>
            </div>
            <div className="w-full absolute bottom-0 left-0 z-20 flex px-8 py-2 flex-col gap-2">
              <div
                className="w-full h-1 hover:h-[6px] bg-[rgba(255,255,255,0.25)] rounded-full relative flex"
                onMouseDown={changeCurrentTime}
              >
                <div
                  className="bg-[rgba(255,255,255,0.5)]"
                  style={{ width: getCurrTimeWidth(curreTime, duration) + "%" }}
                ></div>
              </div>
              <div className="w-full flex items-center">
                <div className="flex items-center text-sm">
                  {getVideoTime(duration, curreTime)}
                </div>
                <div className="flex gap-2 items-center mx-auto">
                  <div className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-[rgba(255,255,255,0.1)] transition-all duration-100 ease-in-out text-gray-300 cursor-pointer">
                    <i className="fa-light fa-backward"></i>
                  </div>
                  {isPlaying ? (
                    <div
                      className="w-16 h-16 flex items-center justify-center rounded-full hover:bg-[rgba(255,255,255,0.1)] transition-all duration-100 ease-in-out text-gray-300 cursor-pointer"
                      onClick={handlePause}
                    >
                      <i className="fa-solid fa-pause"></i>
                    </div>
                  ) : (
                    <div
                      className="w-16 h-16 flex items-center justify-center rounded-full hover:bg-[rgba(255,255,255,0.1)] transition-all duration-100 ease-in-out text-gray-300 cursor-pointer"
                      onClick={handlePlay}
                    >
                      <i className="fa-light fa-play"></i>
                    </div>
                  )}
                  <div className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-[rgba(255,255,255,0.1)] transition-all duration-100 ease-in-out text-gray-300 cursor-pointer">
                    <i className="fa-light fa-forward"></i>
                  </div>
                </div>
                <div className="flex">
                  <div
                    className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-[rgba(255,255,255,0.1)] transition-all duration-100 ease-in-out text-gray-300 cursor-pointer"
                    onClick={muteVideo}
                  >
                    {isMute ? (
                      <i className="fa-light fa-volume-mute"></i>
                    ) : (
                      <i className="fa-light fa-volume"></i>
                    )}
                  </div>
                  <div className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-[rgba(255,255,255,0.1)] transition-all duration-100 ease-in-out text-gray-300 cursor-pointer">
                    <i className="fa-light fa-cog"></i>
                  </div>
                  <div
                    className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-[rgba(255,255,255,0.1)] transition-all duration-100 ease-in-out text-gray-300 cursor-pointer"
                    onClick={toggleFullscreen}
                  >
                    {fullscreen ? (
                      <i className="fa-light fa-compress"></i>
                    ) : (
                      <i className="fa-light fa-expand"></i>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
      <video
        className="min-h-[400px] h-full"
        id="video-source"
        ref={videoRef}
        onLoadedData={handleVideoLoaded}
        onEnded={props.ended}
      >
        <source src={props.url} />
      </video>
    </div>
  );
}
