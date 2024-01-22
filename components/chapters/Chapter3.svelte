<script>
    import Videos from '../elements/Videos.svelte';
    import video0 from '../../static/chapters/3-1.mp4';
    import video1 from '../../static/chapters/3-2.mp4';
    import video3 from '../../static/chapters/3-3.mp4';
    import ChapterTitle from '../elements/ChapterTitle.svelte';

    const chapterNo = 3;
    
</script>

<style lang="scss">
</style>

<div class="chapter">
    <ChapterTitle chapterNo={ chapterNo } />

    <Videos
        videos={[ video0, video1, video3 ]}
        chapterNo={ chapterNo } />
</div>
