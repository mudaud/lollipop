<script>

  let appHidden = true;

  // RESET EXTERNALLY
  window['resetAppToggle'] = () => {
    appHidden = true;
  }
 
  const handleClick = () => {
    if(window.browser === 'ie') return;
    if (appHidden) {
      window.wetransfer.appShow();
      appHidden = false;
    } else {
      window.wetransfer.appHide();
      appHidden = true;
    }
  } 
</script>

<style lang="scss">
  .app-toggle {
    top: 50vh;
    width: 34px;
    height: 44px;
    left: 34px;
    transform: translate(-50%, -50%);
    padding: 10px;
    position: absolute;
    transition: 0.6s ease;
    cursor: pointer;
    opacity: 0;
    z-index: 1000;
    box-sizing: border-box;

    &:hover {
      .arrow {
        transform: translateX(-6px);
      }
    }

    .arrow {
      position: absolute;
      transition: opacity 0.2s ease, transform 0.4s ease;
      width: 13px
    }

    .arrow-right {
      opacity: 0;
    }

    &.hidden {
      left: 60px;

      &:hover {
        .arrow {
          transform: translateX(6px);
        }
      }

      .arrow-right {
        opacity: 1;
      }

      .arrow-left {
        opacity: 0;
      }
    }
  }

  :global(.chapter-active) {
    .app-toggle {
      opacity: 1;
    }
  }

  :global(.microsite .app-toggle) {
    display: none;
  }
</style>


  
<div on:click={ handleClick } class="app-toggle { appHidden ? 'hidden' : '' }">

  <!-- ARROW LEFT -->
  <svg class="arrow arrow-left" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 15 26">
    <defs/>
    <path stroke="#000" d="M14 25L1 13 14 1"/>
  </svg>

  <!-- ARROW RIGHT -->
  <svg class="arrow arrow-right" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 15 26">
    <defs/>
    <path stroke="#000" d="M1 1l13 12L1 25"/>
  </svg>

</div>

  