<script>
  export let video;
  export let chapterNo;

  import Subtitles from '../../js/Subtitles.js';
  import { VideoWithEvents } from '@wetransfer/wallpaper-ui';
  
  let subtitles;
  let activeVideo = 0;
  let playing = true;

  const main = () => {
    const videosContainer = document.querySelector(`.chapter-videos-${ chapterNo }`);
    const videoContainers = videosContainer.querySelectorAll(".chapter-video");
    const videoEls =  videosContainer.querySelectorAll("video");
    const playEl =  videosContainer.querySelector(".play");
    const muteEl =  videosContainer.querySelector(".mute");
    const selectEls =  videosContainer.querySelectorAll(".select");
    const progressBar =  videosContainer.querySelector(".progress-bar-inner");

    subtitles = new Subtitles(videosContainer, chapterNo);

    // SET ACTIVE STATES
    const setActiveStates = () => {
      videoContainers.forEach(el => {
        el.classList.remove('active');
      })

      selectEls.forEach(el => {
        el.classList.remove('active');
      })

      if (playing) {
        playEl.classList.add('playing');
      } else {
        playEl.classList.remove('playing');
      }

      videoContainers[activeVideo].classList.add('active');
      selectEls[activeVideo].classList.add('active');
      window.state.muted ? muteEl.classList.add('muted') : muteEl.classList.remove('muted');
    }

    setActiveStates();

    // RESET EXTERNALLY
    window['resetVideo' + chapterNo] = () => {
      activeVideo = 0;

      videoEls.forEach(el => {
        el.currentTime = 0;
        el.pause();
      });
      
      playing = false;
      subtitles.reset();
      setActiveStates();
    }

    // PLAY FIRST
    window['initVideo' + chapterNo] = () => {
      activeVideo = 0;
      videoEls[0].currentTime = 0;
      playing = true;
      setActiveStates();

      setTimeout(() => {
        playing && videoEls[0].play();
        setActiveStates();
      }, 1000);
    }
    
    // PLAY NEXT
    videoEls.forEach((videoEl, i) => {
      videoEl.addEventListener('ended', () => {

        window.state.finishedVideo(chapterNo, i);

        if (videoEls[i + 1]) {
          videoEls[i + 1].currentTime = 0;
          videoEls[i + 1].play();
          activeVideo = i + 1;
          setActiveStates();
        } else {
          playing = false;
          activeVideo = 0;
          
          // GO TO NEXT CHAPTER
          if (chapterNo <= 4) {
            window.state.changeChapter(chapterNo + 1)
          } else {
            window.state.goToMenu();
          }

        }

        subtitles.reset();
      });
    });


    // PLAY & PAUSE
    playEl.addEventListener('click', () => {
        if (playing) {
          videoEls[activeVideo].pause();
          playing = false;
        } else {
          videoEls[activeVideo].play();
          playing = true;
        }

        setActiveStates();
    });

    // SELECT VIDEO
    selectEls.forEach((btn, i) => {
      btn.addEventListener('click', () => {
        if (i !== activeVideo) {
          playing = true;
          activeVideo = i;
          videoEls.forEach(videoEl => { videoEl.pause() });
          videoEls[activeVideo].currentTime = 0;
          videoEls[activeVideo].play();
          setActiveStates();
          subtitles.reset();
        }
      });
    })

    // MUTE
    muteEl.addEventListener('click', () => {
      window.state.muteUnmute();
      window.state.muted ? muteEl.classList.add('muted') : muteEl.classList.remove('muted');
    });

    // PROGRESS BAR
    videoEls.forEach((videoEl, i) => {
      videoEl.addEventListener("timeupdate", function () {
        window.state.resetInactivity();
        let currentPos = videoEl.currentTime;
        let maxduration = videoEl.duration;
        let percentage = 100 * currentPos / maxduration;
        percentage = percentage.toFixed(4);

        i == activeVideo && (progressBar.style.width = percentage+'%');

        if (progressBar.parentNode.classList.contains('hidden')) {
          progressBar.parentNode.classList.remove('hidden');
        }
        
        if (percentage > 99.5 || percentage < 0.5) {
          progressBar.classList.add('no-transition');
        } else {
          progressBar.classList.remove('no-transition');
        }
      }); 
    });

    // SUBTITLES
    videoEls.forEach((videoEl, i) => {
      videoEl.addEventListener("timeupdate", function () {
        let currentPos = videoEl.currentTime;

        if (i == activeVideo) {
          subtitles.update(activeVideo, currentPos)
        }

      }); 
    });
  }

  document.addEventListener('DOMContentLoaded', function(event) {
    window.browser !== 'ie' && main();
  });

</script>

<style lang="scss">
  .chapter-videos {
    width: 100%;
    height: 100%;
  }

  :global(.chapter-video) {
    position: absolute;
    opacity: 0;
    transition: opacity 1.5s ease;
    background: #F0F0F0;

    @media (max-aspect-ratio: 3/2) {
      width: 100%;
      height: auto;
      top: 50%;
      transform: translateY(-50%);
    }

    @media (min-aspect-ratio: 3/2) {
      left: 50%;
      transform: translateX(-50%);
      height: 100%;
      width: auto !important;
    }

    &.active {
      opacity: 1;
    }
  }

  :global(.chapter-video video) {
    mix-blend-mode: darken;
  }

  :global(.chapter-video.normal video) {
    @media (min-aspect-ratio: 3/2) {
      width: auto !important;
    }
  }

  .controls {
    width: calc(100% - 6.8vw);
    bottom: 0;
    margin: 2.4vw 3.4vw;
    position: absolute;
    font-size: 0;

    @media only screen and (max-width: 500px) {
      margin: 7.4vw 3.4vw;
    }

    &__button {
      width: 32px;
      height: 32px;
      padding: 0.2vw;
      margin-right: 5px;
      display: inline-block;
      font-size: 0.7vw;
      border: 1px solid black;
      overflow: hidden;

      @media only screen and (min-width: 1800px) {
        width: 42px;
        height: 42px;
      }

      &.play {
        margin-left: 5px;
        margin-right: 0;

        &__play-icon {
          display: block;
        }

        &.playing {
          .play__play-icon {
            display: none;
          }

          .play__pause-icon {
            display: block;
          }
        }
      }

      &.mute {
        margin-right: 0;

        &__mute-icon {
          display: block;
        }

        &.muted {

          .mute__mute-icon {
            display: none !important;
          }

          .mute__unmute-icon {
            display: block !important;
          }
        }
      }
    }

    div {
      vertical-align: bottom;
    }
  }

  :global(.select) {
    opacity: 0.3;
    transition: opacity 1.5s ease;

    &.active {
      opacity: 1;
    }
  }

  .progress-bar {
    height: 2vw;
    width: calc(100% - 106px);
    position: relative;
    display: inline-block;
    border-top: 0px solid transparent;
    border-bottom: 1px dashed rgba(0,0,0,0);
    border-image: url('./static/border.png') 20% round;
    transition: opacity 1s;

    &.hidden {
      opacity: 0;
    }

    @media only screen and (min-width: 1800px) {
      width: calc(100% - 230px);
    }
  }

  :global(.progress-bar-inner) {
    height: 1px;
    bottom: 0;
    transform: translateY(1px);
    background: black;
    transition: width 0.1s linear;
    display: inline-block;
    position: absolute;
    vertical-align: bottom;

    &.no-transition {
      transition: 0s;
    }
  }

  :global(.subtitles) {
    top: 45%;
    margin: 0 2.5vw;
    transform: translateY(-50%);
    position: absolute;
    font-size: 1.2vw;
    color: transparent;
    font-family: "Pitch";

    @media only screen and (min-width: 1800px) {
      font-size: 0.8vw;
    }
  }

  :global(.subtitles.left) {
    left: 0;
  }

  :global(.subtitles.right) {
    right: 0;
  }

  :global(.char) {
    transition: 1.5s ease;
  }

  :global(.animation-before) {
      color: white;
  }

  :global(.animation-in) {
      color: black;
  }

  :global(.animation-out) {
      color: white;
  }
</style>


  
<div class="chapter-videos chapter-videos-{ chapterNo }">

    <div class="chapter-video normal">
      <VideoWithEvents
        mp4={ video }
        muted={ true }
      />
    </div>

  <div class="controls">
    
    <!-- 1 BUTTON -->
    <div class="select controls__button">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 45 45">
        <defs/>
        <path d="M16.7 18.1l.7 1 4.2-2.9V27l-.5.5h-4.5v1.1h11.2v-1.1h-4.3l-.6-.5V15h-1.6l-4.6 3.1z"/>
        <path fill="none" d="M-.2-.4h45v45h-45z"/>
      </svg>
    </div>
   
    <!-- PLAY BUTTON -->
    <div class="play playing controls__button">
      <svg class="play__play-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 45 45">
        <defs/>
        <path fill="none" d="M-.2-.4h45v45h-45z"/>
        <path fill="none" stroke="#000" d="M16.8 33.6v-23l15 11.5-15 11.5z"/>
      </svg>

      <svg class="play__pause-icon" xmlns="http://www.w3.org/2000/svg" id="Layer_1" x="0" y="0" version="1.1" viewBox="0 0 45 45" xml:space="preserve">
        <defs/>
        <path fill="none" d="M-.2-.4h45v45h-45z"/>
        <path d="M17.8 14.6v17.5M26.3 14.6v17.5" stroke="#000"/>
      </svg>
    </div>
    
    <!-- PROGRESS BAR -->
    <div class="progress-bar">
      <div class="progress-bar-inner"></div>
    </div>

    <!-- MUTE BUTTON -->
    <div class="mute controls__button">
      <svg class="mute__mute-icon" xmlns="http://www.w3.org/2000/svg" id="Layer_1" x="0" y="0" version="1.1" viewBox="0 0 45 45" xml:space="preserve">
        <defs/>
        <path fill="none" d="M-.2-.4h45v45h-45z"/>
        <path d="M14.8 15.7c1.5 1.2 3 3.1 3 5.6s-1.5 4.3-3 5.5M19.3 12c2.2 2.1 4.5 5.1 4.5 9.2s-2.2 7.2-4.5 9.2" fill="none" stroke="#000000"/>
        <path d="M23.8 7.6c3 3.2 6 7.3 6 13.6S26 32.2 23 35.4" fill="none" stroke="#000000" />
      </svg>

      <svg class="mute__unmute-icon" xmlns="http://www.w3.org/2000/svg" id="Layer_1" x="0" y="0" version="1.1" viewBox="0 0 45 45" xml:space="preserve">
        <defs/>
        <path fill="none" d="M-.2-.4h45v45h-45z"/>
        <path d="M14.8 15.7c1.5 1.2 3 3.1 3 5.6 0 2.5-1.5 4.3-3 5.6M19.3 12c2.2 2.1 4.5 5.1 4.5 9.2s-2.2 7.2-4.5 9.2" fill="none" stroke="#000000"/>
        <path d="M23.8 7.6c3 3.2 6 7.3 6 13.6S26 32.2 23 35.4" fill="none" stroke="#000000"/>
        <path fill="none" stroke="#000" stroke-opacity=".5" d="M-.2-.4l45 45"/>
      </svg>
    </div>

  </div>
</div>

