<script>
    export let chapterNo;

    const handleClicka = () => {
        let activeChapter = window.state.activeChapter;

        if (activeChapter <= 4) {
            window.state.changeChapter(activeChapter + 1)
        } else {
            window.state.goToMenu();
        }

        let videoResetFn =  window['resetVideo' + chapterNo];
        typeof videoResetFn === 'function' && videoResetFn();
    }
</script>

<style lang="scss">
    .next-chapter {
        width: 18%;
        margin-left: 33.6%;
        cursor: pointer;

        &__arrow {
            transition: 0.4s ease;
        }

        &:hover {
            .next-chapter__arrow {
                transform: translateX(6px);
            }
        }

        svg {
            overflow: visible;
        }

        &.next-chapter-2 {
            margin-top: 8%;
            margin-left: 32%;
        }

        &.next-chapter-4 {
            width: 8%;
            margin-top: -11%;
            margin-left: 68%;
        }

        &.next-chapter-5 {
            margin-top: 10%;
            margin-left: 32.2%;
        }

    }
</style>
  
<div on:click={ handleClicka } class="next-chapter { 'next-chapter-' + chapterNo }">

    {#if chapterNo !== 5}
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 118 22">
            <defs/>
            <path class="next-chapter__text" fill="#000" d="M9.94 18V7.48l.32-.32h1.36V6.6H7.66v.56h1.36l.32.32v9.5L3.54 6.6H.9v.56h1.36l.32.32v9.64l-.32.32H.9V18h3.96v-.56H3.5l-.32-.32V7.26L9.24 18h.7zm12.025-4.8h-7.32c.24-1.94 1.78-3.4 3.82-3.4 2.02 0 3.22 1.36 3.5 3.4zm.22 3.56l-.36-.44c-.8.88-1.98 1.4-3.36 1.4-2.24 0-3.86-1.76-3.86-3.96h8.02c0-2.56-1.58-4.52-4.16-4.52s-4.48 1.96-4.48 4.52c0 2.56 1.9 4.52 4.48 4.52 1.54 0 2.88-.58 3.72-1.52zm12.125-6.68h1.6v-.56h-4.46v.56h1.74l.2.26-2.68 2.9-2.68-2.9.2-.26h1.74v-.56h-4.54v.56h1.6l3.3 3.58-3.5 3.78h-1.6V18h4.46v-.56h-1.74l-.2-.26 2.92-3.16 2.92 3.16-.2.26h-1.74V18h4.54v-.56h-1.6l-3.54-3.82 3.26-3.54zm5.925.32V14c0 3.16 1.78 4.28 3.86 4.28 1.64 0 2.82-.86 3.6-2.06l-.42-.38c-.68 1.1-1.78 1.86-3.18 1.86-1.72 0-3.26-.88-3.26-3.8v-3.5l.32-.32h5.34v-.56h-5.64V6.44h-.62v3.08h-2.5v.56h2.18l.32.32z"/>
            <path class="next-chapter__arrow" stroke="#000" stroke-width=".6" d="M63 12h54M110 5l7 7-7 7"/>
        </svg>
    {:else}
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 118 22">
            <defs/>
            <path class="next-chapter__text" fill="#000" d="M3.82 12.34h2.76c2.64 0 3.84.9 3.84 2.56 0 1.66-1.2 2.54-3.84 2.54H3.82v-5.1zm2.52-.56H3.82V7.16h2.52c2.42 0 3.52.78 3.52 2.3 0 1.52-1.1 2.32-3.52 2.32zm1.92.26c1.28-.34 2.2-1.12 2.2-2.58 0-1.84-1.32-2.86-4.06-2.86H1.02v.56h1.86l.32.32v9.64l-.32.32H1.02V18h5.6c2.94 0 4.4-1.08 4.4-3.1 0-1.64-1.16-2.68-2.76-2.86zm6.185-1.06c0 .52.32.82.76.82s.78-.32.78-.74c0-.26-.18-.56-.48-.64.68-.44 1.5-.6 2.52-.6 1.58 0 2.38.78 2.38 2.52v.5l-2.56.44c-2.56.44-3.86 1.2-3.86 2.76 0 1.44 1.14 2.24 2.64 2.24 1.58 0 2.94-.82 3.8-2.02.04 1.32.74 2.02 1.7 2.02.62 0 1.16-.32 1.6-.94l-.36-.4c-.38.54-.74.78-1.24.78-.72 0-1.12-.64-1.12-1.72v-3.66c0-2.1-1.04-3.1-2.98-3.1-1.74 0-3.58.62-3.58 1.74zm5.96 4.64c-1.2 1.4-2.24 2.1-3.78 2.1-1.02 0-2.02-.56-2.02-1.68 0-1.34 1.4-1.9 3.32-2.22l2.48-.42v2.22zm12.645-3.58c0 .42.34.72.76.72.44 0 .8-.36.8-.88 0-1.56-1.52-2.64-3.64-2.64-2.64 0-4.7 1.96-4.7 4.52 0 2.56 1.94 4.52 4.58 4.52 1.58 0 2.96-.58 3.82-1.52l-.36-.44c-.82.88-2.04 1.4-3.46 1.4-2.28 0-3.96-1.76-3.96-3.96s1.8-3.96 4.08-3.96c1.72 0 2.82.78 2.84 1.6-.36-.14-.76.18-.76.64zm9.486 5.4h-1.76l-.32-.32v-1.84l1.96-1.58 3.28 3.76V18h2.94v-.56h-2.14l-3.6-4.12 4-3.24h1.16v-.56h-4.32v.56h1.74l.2.26-5.22 4.26V5.74h-2.68v.56h1.76l.32.32v10.5l-.32.32h-1.76V18h4.76v-.56z"/>
            <path class="next-chapter__arrow" stroke="#000" stroke-width=".6" d="M63 12h54M110 5l7 7-7 7"/>
        </svg>
    {/if}
</div>
