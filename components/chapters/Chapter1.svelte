<script>
    import Video from '../elements/Video.svelte';
    import video0 from '../../static/chapters/1-1.mp4';
    import ChapterTitle from '../elements/ChapterTitle.svelte';

    const chapterNo = 1;
    
</script>

<style lang="scss">
</style>

<div class="chapter">
    <ChapterTitle chapterNo={ chapterNo } />

    <Video
        video={[ video0 ]}
        chapterNo={ chapterNo } />
</div>
