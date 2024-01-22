import * as help from "./Helpers.js";
import { trackEvent } from '@wetransfer/wallpaper-ui';

export default class State {
    constructor(chapterEls) {
        this.chapterEls = chapterEls;
        this.menuBtnEls = null;
        this.mobileMenuBtnEls = null;
        this.containerEl = document.querySelector('.super-container');
        this.transitionDuration = 1600;
        this.inactivity = 0;

        // 0 = menu, 1,2,3,4,5 = chapters
        this.activeChapter = 0;
        this.muted = true;
        this.menuClicked = false;
        this.watched = {
            1: { 0: false },
            2: { 0: false, 1: false },
            3: { 0: false, 1: false },
            4: { 0: false, 1: false },
            5: { 0: false, 1: false }
        };

        this.init();
    }

    muteUnmute() {
        let videos = document.querySelectorAll('video');
        let audios = document.querySelectorAll('audio');
        this.muted = !this.muted;

        videos.forEach(video => {
            video.muted = this.muted;
        })

        audios.forEach(audio => {
            audio.muted = this.muted;
        })
    }

    goToMenu() {
        this.changeChapter(0);
    }

    changeChapter(newChapIndex) {
        if(window.browser === 'ie') return;

        this.activeChapter = newChapIndex;

        this.chapterEls.forEach(el => {
            el.classList.remove('active');
        });

        if (newChapIndex !== 0) {
            let cursorHide = window['cursorHide'];
            typeof cursorHide === 'function' && cursorHide();
        } else {
            let cursorShow = window['cursorShow'];
            typeof cursorShow === 'function' && cursorShow();
        } 

        this.resetInactivity();

        setTimeout(() => {
            // triger video start
            let videoInitFn =  window['initVideo' + newChapIndex];
            typeof videoInitFn === 'function' && videoInitFn();

            // SHOW / HIDE TRANSFER BOX
            if (newChapIndex === 0) {
                window.wetransfer.appShow();
                window.wetransfer.resetTimer();
            } else {
                window.wetransfer.appHide();
                // window.wetransfer.pauseTimer();
            }

            // SHOW / HIDE TRANSFER BOX
            if (newChapIndex === 0) {
                this.containerEl.classList.remove('chapter-active');
                window['resetAppToggle']();
            } else {
                this.containerEl.classList.add('chapter-active')
            }

            this.chapterEls[newChapIndex].classList.add('active')
        }, this.transitionDuration);
    }

    finishedVideo(chapterNo, videoNo) {
        this.watched[chapterNo][videoNo] = true;
        this._trackViews()
    }

    resetInactivity() {
        this.inactivity = 0;
    }

    _trackViews() {
        // AT LEAST 1 VIDEO WATCHED
        let videoWatched = false;
        for (const chap in this.watched) {
            for (const vid in this.watched[chap]) {
                this.watched[chap][vid] && (videoWatched = true);
            }
        }
        
        // WATCHED ALL VIDEOS OF 1 EXERCISE
        let chapterWatched = false;
        for (const chap in this.watched) {
            if (this.watched[chap][0] && this.watched[chap][1]) {
                chapterWatched = true;
            }
        }

        // WATCHED ALL VIDEOS OF ALL EXERCIES
        let everythingWatched = true;
        for (const chap in this.watched) {
            for (const vid in this.watched[chap]) {
                !this.watched[chap][vid] && (everythingWatched = false);
            }
        }

        if (videoWatched) {
            trackEvent({ category: 'view', action: 'VideoWatched' });
        }

        if (chapterWatched) {
            trackEvent({ category: 'view', action: 'ChapterWatched' });
        }

        if (everythingWatched) {
            trackEvent({ category: 'view', action: 'EverythingWatched' });
        }
    }
    
    _timeInactivity() {
        let inactive = false;
        setInterval(() => {
            this.inactivity++;

            if (!inactive && this.inactivity >= 9) {
                !inactive && window.wetransfer.resetTimer();
                inactive = true;
            }

            if (inactive && this.inactivity < 9) {
                window.wetransfer.pauseTimer();
                inactive = false;
            }

        }, 10000);
    }

    _setMenuButtonEvents(buttons) {
        buttons.forEach((btn, i) => {

            btn.addEventListener('click', e => {
                // + 1 to account for the menu (there is no btn for menu);
                this.changeChapter(i + 1);

                // unmute on first menu click
                if (!this.menuClicked) {
                    trackEvent({ category: 'click', action: 'video clicked', label: 'VideoClicked' });
                    this.muteUnmute();
                    this.menuClicked = true;

                    let openPopup =  window['openPopup'];
                    typeof openPopup === 'function' && openPopup();
                }
            });

            btn.addEventListener('mouseenter', e => {
                let cursorExpand =  window['cursorExpand'];
                typeof cursorExpand === 'function' && cursorExpand();
            });

            btn.addEventListener('mouseleave', e => {
                let cursorShrink =  window['cursorShrink'];
                typeof cursorShrink === 'function' && cursorShrink();
            });

        })
    }
    
    init() {
        this.menuBtnEls = document.querySelectorAll('.menu-item');
        this.mobileMenuBtnEls = document.querySelectorAll('.mobile-menu-item');
        this._setMenuButtonEvents(this.menuBtnEls);
        this._setMenuButtonEvents( this.mobileMenuBtnEls);
        this._timeInactivity();
        // trackEvent({ category: 'load', action: 'page loaded', label: 'PageLoaded' });
    }
}
