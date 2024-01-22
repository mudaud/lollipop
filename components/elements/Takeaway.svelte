<script>
    export let chapterNo;

    import Next from './Next.svelte';
    import Takeaway2 from '../svgs/Takeaway2.svelte';
    import Takeaway3 from '../svgs/Takeaway3.svelte';
    import Takeaway5 from '../svgs/Takeaway5.svelte';

    let takeawayEl;
    let headerEl;
    let instructionEls;
    let horizontalLineEls;
    let verticalLineEls;
    let nextButtonEl;

    let active = false;
    let iteration = 0;
    
    export function animate() {
        reset();
        const stagger = 2000;
        const wait = 2000;
        // this is to only animate the current iteration,
        // in case the user switches back and forth fast
        let currIteration = iteration;
        active = true;
        
        setTimeout(() => {
            active && currIteration === iteration && headerEl.classList.add('active');
        }, wait / 2);
        
        instructionEls.forEach((el, i) => {
            setTimeout(() => {
                active && currIteration === iteration && el.classList.add('active');
            }, (i * stagger) + wait);
        })

        horizontalLineEls.forEach((el, i) => {
            setTimeout(() => {
                active && currIteration === iteration && el.classList.add('active');
            }, (i * stagger / 2) + 300);
        })

        verticalLineEls.forEach((el, i) => {
            setTimeout(() => {
                active && currIteration === iteration && el.classList.add('active');
            }, (i * stagger / 2.5));
        })

        setTimeout(() => {
            nextButtonEl && nextButtonEl.classList.add('active');
        }, instructionEls.length * stagger + stagger);
    }

    export function reset() {
        active = false;
        iteration++;

        headerEl.classList.remove('active');
        nextButtonEl && nextButtonEl.classList.remove('active');

        instructionEls.forEach((el, i) => {
            el.classList.remove('active');
        })

        horizontalLineEls.forEach((el, i) => {
            el.classList.remove('active');
        })

        verticalLineEls.forEach((el, i) => {
            el.classList.remove('active');
        })
    }
    
    document.addEventListener('DOMContentLoaded', function(event) {
        takeawayEl = document.querySelector(`.takeaway-${chapterNo}`);
        headerEl = takeawayEl.querySelector('.header');
        instructionEls = takeawayEl.querySelectorAll('.instruction');
        horizontalLineEls = takeawayEl.querySelectorAll('.line-solid');
        verticalLineEls = takeawayEl.querySelectorAll('.line-dashed');
        nextButtonEl = takeawayEl.querySelector('.next-button');
    });
</script>

<style lang="scss">
    .takeaway {
        
    }

    :global(.header),
    :global(.instruction),
    :global(.next-button) {
        opacity: 0;
        transition: 1s ease;

        &.active {
            opacity: 1;
        }
    }

    :global(.line-solid) {
        fill:none;stroke:#000000;stroke-width:0.6;
        transform: translateX(-100px);
    }

    :global(.line-dashed) {
        fill:none;stroke:#000000;stroke-width:0.5;stroke-dasharray:6,6;
        transform: translateY(-120px);
    }

    :global(.line-dashed),
    :global(.line-solid) {
        transition: 2s ease;
        opacity: 0;

        &.active {
            opacity: 1;
            transform: none;
        }
    }

    :global(.header.active),
    :global(.audio-text.active),
    :global(.instruction.active),
    :global(.next-button.active),
    :global(.line-dashed.active),
    :global(.line-solid.active) {
        opacity: 1;
        transform: none;
    }
</style>
  
<div class="takeaway-{chapterNo}">
    <!-- 2. DRINKING WATER -->
    {#if chapterNo === 2}
        <Takeaway2 />
    {/if}

    <!-- 3. RICE COUNTING -->
    {#if chapterNo === 3}
        <Takeaway3 />
    {/if}

    <!-- 5. MUTUAL GAZING -->
    {#if chapterNo === 5}
        <Takeaway5 />
    {/if}

    <div class="next-button">
        <Next chapterNo={ chapterNo } />
    </div>

</div>
