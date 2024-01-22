<script>
    let bannerEl;
    
    document.addEventListener('DOMContentLoaded', function(event) {
        bannerEl = document.querySelector('.cookie-banner');

        if (sessionStorage.getItem('set') === 'set') {
            bannerEl.style.display = 'none';
            bannerEl && bannerEl.parentNode.removeChild(bannerEl);
        }
    });


    const handleClicka = () => {
        bannerEl.style.opacity = 0;
        sessionStorage.setItem('set', 'set');

        setTimeout(() => {
            bannerEl && bannerEl.parentNode.removeChild(bannerEl)
        }, 500);
    }
</script>

<style lang="scss">
    .cookie-banner {
        bottom: 0;
        left: 50%;;
        width: 840px;
        transform: translateX(-50%);
        background: rgba(#000000, 0.7);
        position: absolute;
        padding: 20px;
        transition: 0.5s ease;
        font-size: 15px;
        font-family: "Pitch";
        z-index: 9999999;
        
        @media only screen and (max-width: 1600px) {
            width: 710px;
            font-size: 12px
        }

        @media only screen and (max-width: 840px) {
            width: 100%;
            padding: 20px 50px;
        }

        &__text {
            text-align: center;
            color: white;

            a {
                color: white;
            }
        }

        &__close {
            width: 40px;
            top: 0;
            right: 0;
            padding: 11px;
            position: absolute;
            cursor: pointer;

            @media only screen and (max-width: 1600px) {
                width: 36px;
            }
        }
    }
</style>
  
{#if process.env.STANDALONE.toString() == 'true'}
    <div class="cookie-banner">
        <div class="cookie-banner__text">
            We use regular and analytical cookies to make sure you have the best time.<br>
            You can read more about that in our <a href="https://wetransfer.com/legal/privacy" target="_blank">privacy and cookie statement</a>.
        </div>
        <div on:click={ handleClicka }  class="cookie-banner__close">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <defs/>
                <path stroke="#fff" stroke-width="1.2" d="M1 1l18 18M1 19L19 1"/>
            </svg>
        </div>
    </div>
{/if}
