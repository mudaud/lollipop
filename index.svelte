<script>
  import { Background, FontFace, disableClickOut } from '@wetransfer/wallpaper-ui';
  import Browser from './js/Browser.js';
  import Cursor from './components/elements/Cursor.svelte';
  import State from "./js/State.js";
  import AppToggle from './components/elements/AppToggle.svelte';
  import CookieBanner from './components/elements/CookieBanner.svelte';
  import Cta from './components/elements/Cta.svelte';
  import Menu from './components/chapters/Menu.svelte';
  import Popup from './components/elements/Popup.svelte';
  import Chapter1 from './components/chapters/Chapter1.svelte';
  import Chapter2 from './components/chapters/Chapter2.svelte';
  import Chapter3 from './components/chapters/Chapter3.svelte';
  import Chapter4 from './components/chapters/Chapter4.svelte';
  import Chapter5 from './components/chapters/Chapter5.svelte';
  import pitchWoff1 from './static/fonts/Pitch-Light.woff';
  import pitchWoff2 from './static/fonts/Pitch-Light.woff2';

  disableClickOut();

  document.addEventListener('DOMContentLoaded', function(event) {

    const appHeight = () => {
      const doc = document.documentElement;
      let vh = window.innerHeight * 0.01;
      doc.style.setProperty('--vh', `${vh}px`);

      setTimeout(() => {
        let vh = window.innerHeight * 0.01;
        doc.style.setProperty('--vh', `${vh}px`);
      }, 300);
    }

    window.addEventListener('resize', appHeight)
    appHeight()
   
    window.browser = Browser();
    const chapterEls = document.querySelectorAll('.chapter');
    const superContainer = document.querySelector('.super-container');
    const fallbackEl = document.querySelector('.fallback');
    process.env.STANDALONE.toString() == 'true' && superContainer.classList.add('microsite');
    superContainer.classList.add(`browser-${ window.browser }`);
    fallbackEl.classList.add(`browser-${ window.browser }`);

    if (window.browser === 'ie') return;

    window.state = new State(chapterEls);
  });
  
</script>

<style lang="scss">

  :global(.microsite.super-container) {
    width: 100vw;
    // height: 100vh; /* Fallback for browsers that do not support Custom Properties */
    // height: calc(var(--vh, 1vh) * 100) !important;
    touch-action: manipulation;
  }

  .wrap {
    top: 0;
    width: calc(100vw - 360px);
    height: 100vh;
    margin-left: 360px;
    position: absolute;
    transition: 0.6s ease;
  }

  :global(.microsite .wrap) {
    margin-left: 50vw !important;
    transform: translateX(-50%) !important;
    // iphone real height
    // height: calc(100vh - calc(100vh - 100%)) !important;
    height: 100vh;
    min-height: -webkit-fill-available;
    touch-action: manipulation;

    @media only screen and (max-width: 1320px) {
      width: calc(100vw - 10vw) !important;
    }
  }

  :global(.chapter-active) {
    .wrap {
      width: 94vw;
      margin-left: 6vw;
    }
  }

  .logo {
    bottom: 0;
    width: 250px;
    margin: 22px 23px;
    position: absolute;
    transition: 1s ease;
    z-index: 10;
    pointer-events: none;
  }

  :global(.microsite .logo) {
      // Mobile hidden
      @media only screen and (max-width: 500px) {
        display: none
      }
    }

  :global(.chapter-active) {
    .logo {
      opacity: 0;
    }
  }

  // Adjust microsite mobile height
  :global(.microsite .chapters) {
    @media only screen and (max-width: 500px) {
        height: 100vh; /* Fallback for browsers that do not support Custom Properties */
        height: calc(var(--vh, 1vh) * 100) !important;
        position: relative;
    }
  }

  :global(.chapter) {
    opacity: 0;
    pointer-events: none;
    transition: opacity 2s ease;
  }

  :global(.chapter.active) {
    opacity: 1;
    pointer-events: auto;
  }

  // IE11
  .fallback {
    position: relative;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    display: none;

    img {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 80%;
      margin-left: 50px;

      @media (min-aspect-ratio: 8/5) {
        width: auto;
        height: 100vh;
      }
    }
  }

  :global(.super-container.browser-ie) {
    display: none;
  }

  :global(.fallback.browser-ie) {
    display: block !important;
  }

</style>

<FontFace
  name="Pitch"
  weight="100"
  woff2={pitchWoff1}
  woff={pitchWoff2}
/>

<Background color="#F0F0F0" />

<CookieBanner />

<Cursor />

<div class="fallback">
  <img src="./static/fallback.jpg" alt="">
</div>

<div class="super-container">
  
  <Popup />
  <AppToggle />

  <img src="./static/logo.png" alt="" class="logo">
  
  <Cta />

  <div class="wrap">
    <div class="chapters">
      <Menu />
      
      <!-- {#if ready} -->
      <Chapter1 />
      <Chapter2 />
      <Chapter3 />
      <Chapter4 />
      <Chapter5 />
      <!-- {/if} -->
      
    </div>
    
  </div>
  
</div>
