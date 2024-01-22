<script>
import Grid from '../elements/Grid.svelte';
import MobileMenu from '../elements/MobileMenu.svelte';
import Title from '../elements/Title.svelte';
import * as help from "../../js/Helpers.js";
import Vivus from 'vivus';

let isMicrosite = process.env.STANDALONE.toString() == 'true';

document.addEventListener('DOMContentLoaded', function(event) {
    let title = document.querySelector('.title');
    let menuItems = document.querySelectorAll('.menu-item');
    let dividersV = document.querySelectorAll('.line-vertical')
    let dividersH = document.querySelectorAll('.line-horizontal')
    let grid = document.querySelector('.grid');
    const myVivus = new Vivus(grid, {type: 'delayed', delay: 350,  duration: 400, start: 'manual' }, () => {});

    // hover vids
    const hoverVids = () => {
        menuItems.forEach((item, i) => {
            let videoContainer = item.querySelector('.menu-video')
            let video = videoContainer.querySelector('video');
            let btn = item.querySelector('.menu-text');
            let btnItalic = item.querySelector('.menu-text-italic');

            item.addEventListener('mouseenter', e => {

                // hide others
                menuItems.forEach(item => {
                    item.querySelector('.menu-text').classList.add('transparent');
                });

                btn.classList.remove('transparent')
                btn.classList.add('hidden');
                btnItalic.classList.add('visible');
                videoContainer.classList.add('visible');
                video.play();
            });

            item.addEventListener('mouseleave', e => {

                // show all
                menuItems.forEach(item => {
                    item.querySelector('.menu-text').classList.remove('transparent');
                });

                btn.classList.remove('hidden');
                btnItalic.classList.remove('visible');
                videoContainer.classList.remove('visible');
                video.pause();
            });
        })
    }


    // fade in lines
    const fadeInLines = () => {
        const stagger = 240;

        dividersV.forEach((divider, i) => {
            divider.style.transform = `translateY(${help.rand(-800, 800)}px)`;

            setTimeout(() => {
                divider.style.opacity = 1;
                divider.style.transform = `translateY(0px)`;
            }, i * stagger);
        })
        
        dividersH.forEach((divider, i) => {
            divider.style.transform = `translateX(${help.rand(-1200, 1200)}px)`;

            setTimeout(() => {
                divider.style.opacity = 1;
                divider.style.transform = `translateX(0px)`;
            }, (i + 1) * stagger);
        })

        myVivus.play();
    }

     // fade in menu els
     const fadeInMenu = () => {
        const stagger = 240;

        menuItems.forEach((el, i) => {
            el.style.transform = `translateY(${help.rand(-400, 400)}px)`;

            setTimeout(() => {
                el.style.opacity = 1;
                el.style.transform = `translateY(0px)`;
            }, i * stagger);
        })
    }

    setTimeout(() => {
        title.style.opacity = 1;
        fadeInLines();
    }, 1000);

    setTimeout(() => {
      fadeInMenu();
      hoverVids();
    }, 3000);
})
</script>

<style lang="scss">

  // Mobile menu wrap
  :global(.microsite .menu-outer) {
    @media only screen and (max-width: 500px) {
      width: 100vw;
      height: 100vh; /* Fallback for browsers that do not support Custom Properties */
      height: calc(var(--vh, 1vh) * 100) !important;
      top: 0;
      left: 0;
      overflow-x: visible;
      overflow-y: scroll;
      margin-left: -5vw;
      z-index: 1000;
      touch-action: manipulation;
    }
  }

  .menu {
    top: 50%;
    width: 75vw;
    height: 45vw;
    margin-left: 2.5vw;
    transform: translateY(-50%);
    position: absolute;
    box-sizing: border-box;
    font-size: 0;
    transform-origin: left center;

    @media only screen and (max-width: 1750px) {
      transform: translateY(-50%) scale(0.92);
    }

    @media only screen and (max-width: 1510px) {
      transform: translateY(-50%) scale(0.9);
    }

    @media only screen and (max-width: 1320px) {
      transform: translateY(-50%) scale(0.8);
    }

    @media only screen and (max-width: 1040px) {
      transform: translateY(-50%) scale(0.75);
    }
  }

  :global(.microsite .menu) {
    margin-left: 5.5vw !important;

    @media (max-aspect-ratio: 8/5) {
      transform: translateY(-50%) !important;
    }

    @media only screen and (max-width: 1320px) {
      margin-left: 0 !important;
      transform: translateY(-50%) scale(1.2) !important;
    }

    // Mobile menu should appear
    @media only screen and (max-width: 500px) {
      display: none;
    }
  }

  .menu-item {
    width: 20%;
    height: 100%;
    display: inline-block;
    box-sizing: border-box;
    position: relative;
    opacity: 0;
    transition: opacity 2.5s ease;

    .menu-text,
    .menu-text-italic {
      z-index: 20;
      width: 100%;
      vertical-align: top;
      position: absolute;
      transition: 1.2s ease;
    }

    .menu-text-1 {
      margin-top: 23.45vw;
    }

    .menu-text-2 {
      margin-top: 11.45vw;
    }

    .menu-text-3 {
      margin-top: 34.55vw;
    }

    .menu-text-4 {
      margin-top: 9.85vw;
    }

    .menu-text-5 {
      margin-top: 28.7vw;
    }
  }

  :global(.microsite .menu-item) {
    .menu-text-3 {
      @media only screen and (max-width: 950px) {
        margin-top: 29.7vw;
      }
    }
  }

  :global(.menu-text.transparent) {
    opacity: 0.3;
  }

  :global(.menu-text.hidden) {
    opacity: 0;
  }

  :global(.menu-text-italic) {
    opacity: 0;
    pointer-events: none;
  }

  :global(.menu-text-italic.visible) {
    opacity: 1;
  }

  :global(.menu-video) {
    position: absolute;
    width: 100%;
    top: 50%;
    transform: translateY(-50%);
    opacity: 0;
    pointer-events: none;
    transition: 2s ease;
    z-index: 10;
    background: #F0F0F0;
    pointer-events: none;
    
    video {
      width: 100%;
      mix-blend-mode: darken;
    }
  }

  :global(.menu-video.visible) {
    opacity: 1;
  }
</style>

<div class="chapter active menu-outer">

  <Title />
  <MobileMenu />

  <div class="menu">
  
    <Grid />

    <div class="menu-item">
      <div class="menu-video" style="top: 20.4vw;">
          <video loop muted src="./static/menu/menu0.mp4"></video>
      </div>
      <img src="./static/menu/buttons/1.svg" alt="" class="menu-text menu-text-1">
      <img src="./static/menu/buttons-italic/1.svg" alt="" class="menu-text-italic menu-text-1">
    </div>

    <div class="menu-item">
      <div class="menu-video" style="top: 25.5vw;">
          <video loop muted src="./static/menu/menu1.mp4"></video>
      </div>
      <img src="./static/menu/buttons/2.svg" alt="" class="menu-text menu-text-2">
      <img src="./static/menu/buttons-italic/2.svg" alt="" class="menu-text-italic menu-text-2">
    </div>

    <div class="menu-item">
      <div class="menu-video" style="top: 19vw;">
          <video loop muted src="./static/menu/menu2.mp4"></video>
      </div>
      <img src="./static/menu/buttons/3.svg" alt="" class="menu-text menu-text-3">
      <img src="./static/menu/buttons-italic/3.svg" alt="" class="menu-text-italic menu-text-3">
    </div>

    <div class="menu-item menu-item-4">
      <div class="menu-video" style="top: 28vw;">
          <video loop muted src="./static/menu/menu3.mp4"></video>
      </div>
      <img src="./static/menu/buttons/4.svg" alt="" class="menu-text menu-text-4">
      <img src="./static/menu/buttons-italic/4.svg" alt="" class="menu-text-italic menu-text-4">
    </div>

    <div class="menu-item">
      <div class="menu-video" style="top: 18vw;">
          <video loop muted src="./static/menu/menu4.mp4"></video>
      </div>
      <img src="./static/menu/buttons/5.svg" alt="" class="menu-text menu-text-5">
      <img src="./static/menu/buttons-italic/5.svg" alt="" class="menu-text-italic menu-text-5">
    </div>
  </div>
</div>
  