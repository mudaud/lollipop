<script>
    import { TweenLite } from 'gsap';
    import * as help from "../../js/Helpers.js";

    let isMicrosite = process.env.STANDALONE.toString() == 'true';
    let cursorEl;

    // EXPAND EXTERNALLY
    window['cursorExpand'] = () => {
        cursorEl && cursorEl.classList.add('active');
    }

    // SHRINK EXTERNALLY
    window['cursorShrink'] = () => {
        cursorEl && cursorEl.classList.remove('active');
    }

    // HIDE EXTERNALLY
    window['cursorShow'] = () => {
        cursorEl && cursorEl.classList.remove('hidden');
    }

    // HIDE EXTERNALLY
    window['cursorHide'] = () => {
        cursorEl && cursorEl.classList.add('hidden');
    }

    const cursorFollow = () => {
        const delay = 5;
        let mouseX =  window.innerWidth / 2;
        let mouseY =  window.innerHeight / 2;
        let posX = window.innerWidth / 2;
        let posY = window.innerHeight / 2;

        document.addEventListener('mousemove', e => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        TweenLite.to({}, 0.0016, {
            repeat: -1,
            onRepeat: function() {
                posX += help.round((mouseX - posX) / delay, 5);
                posY += help.round((mouseY - posY) / delay, 5);
                cursorEl.style.left = posX + 'px';
                cursorEl.style.top = posY + 'px';
            }
        });
    };
    
    window.onload = function() {
        if (isMicrosite) return;
        setTimeout(() => {
            cursorEl = document.querySelector('.cursor');
            cursorEl.style.opacity = 1;
            cursorFollow();
        }, 1200);
    }
</script>

<style lang="scss">
    .cursor {
        position: absolute;
        width: 1.8vw;
        height: 1.8vw;
        top: 50%;
        left: 50%;
        padding: 6px;
        transform: translate(-50%, -50%);
        z-index: 10;
        pointer-events: none;
        color: white;
        font-family: "Pitch";
        transition: width 0.8s ease, height 0.8s ease, opacity 2s ease;
        opacity: 0;

        &__inner {
            width: 100%;
            height: 100%;
            border-radius: 100%;
            background: black;
        }

        &__text {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            text-align: center;
            opacity: 0;
            font-size: 0.7vw;
            transition: opacity 1.2s ease;

            @media only screen and (max-width: 1100px) {
                font-size: 0.9vw;
            }
        }
    }

    :global(.cursor.active) {
        width: 5vw;
        height: 5vw;

        @media only screen and (max-width: 1100px) {
            width: 7vw;
            height: 7vw;
        }

        .cursor__text {
            opacity: 1;
        }
    }

    :global(.cursor.hidden) {
        opacity: 0 !important;
    }
</style>
  
{#if !isMicrosite}
    <div class="cursor">
        <div class="cursor__inner">
            <div class="cursor__text">
                Watch<br>
                now
            </div>
        </div>
    </div>
{/if}