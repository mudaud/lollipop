import { SubCopy } from "./SubCopy.js";

export default class Subtitles {
    constructor(container, chapterNo) {
        this.container = container;
        this.chapterNo = chapterNo;
        this.prevCurrentTime = 0;
        this.activeParagraphInd = 0;
        this.prevActiveParagraphInd = -1;
        this.subCopy = SubCopy;
        this.lineEls = null;
        this.lineDuration = 3000;
        this.charStaggerIn = 100;
        this.charTransition = 1500;
        this.debug = false;
        this.init();
    }

    reset() {
        this.prevCurrentTime = 0;
        this.activeParagraphInd = 0;
        this.prevActiveParagraphInd = -1;
        let onScreenParagraphs = this.container.querySelectorAll('.subtitles');

        onScreenParagraphs.forEach(paragraph => {
            paragraph.style.opacity = 0;
        })
        
        setTimeout(() => {
            onScreenParagraphs.forEach(paragraph => {
                paragraph.parentNode.removeChild(paragraph);
            })
        }, this.charTransition);
    }

    update(videoNo, currentTime) {
        
        let activeCopy = this.subCopy['c' + this.chapterNo]['v' + videoNo];
        
        let paragraphInitTimings = [];
        
        activeCopy && activeCopy.forEach(paragraph => {
            paragraphInitTimings.push(paragraph.timings[0])
        })
        
        
        paragraphInitTimings.forEach((timing, i) => {

            // THIS TRIGGERS EVERY TIME IT'S TIME TO ADD A NEW PARAGRAPH
            if (timing >= this.prevCurrentTime && timing <= currentTime) {
                this._appendText(i, activeCopy)
            }
        })

        let onScreenParagraphs = this.container.querySelectorAll('.subtitles');

        onScreenParagraphs.forEach((paragraph, i) => {

            let lines = paragraph.querySelectorAll('.line');
            let paragraphInd = paragraph.getAttribute('paragraph-ind');
            let paragraphTimings = activeCopy && activeCopy[paragraphInd] ? activeCopy[paragraphInd].timings : [];

            paragraphTimings.forEach((timing, j) => {

                // THIS TRIGGERS EVERY TIME IT'S TIME TO ANIMATE IN EACH LINE
                if (timing >= this.prevCurrentTime && timing <= currentTime) {
                    this.debug && (lines[j].style.background = 'yellow');
                    let chars = lines[j].querySelectorAll('.char');
                    this._enterLine(chars, 'black');
                    this._exitLine(chars);
                }
            })

            // IF FINISHED ANIMATING ALL LINES
            if (lines[lines.length - 1].classList.contains('animation-complete')) {
                paragraph.parentNode.removeChild(paragraph);
            }

        })

        this.prevCurrentTime = currentTime;
    }

    _formatLines(paragraph) {
        let activeParagraphLines = paragraph.split("\n");
        let formattedLines = '';

        activeParagraphLines.forEach(line => {

            let formattedLine = '';

            formattedLine += '<span class="line">'
            
            for (let i = 0; i < line.length; i++) {
                let char = line[i];

                if (char === '_') {
                    formattedLine += `<span class="space">&nbsp;</span>`;
                } else if (char === ' ' || char === '&#9;') {
                    // ignore spaces and tabs
                } else {
                    formattedLine += `<span class="char">${ char }</span>`;
                }
            }

            formattedLine += '</span><br>'
            formattedLines += formattedLine;
        })

        return formattedLines;
    }

    _enterLine(chars, color) {
        chars.forEach((char, j) => {
            setTimeout(() => {
                char.style.color = color;
            }, j * this.charStaggerIn);
        });
    }

    _exitLine(chars) {
        // WAIT UNTIL LINE IS REVEALED
        setTimeout(() => {

            // WAIT TO FADE OUT LINE
            setTimeout(() => {
                chars.forEach((char, j) => {
                    char.style.color = 'transparent';
                    this.debug && (char.style.color = 'orange');
                });

                setTimeout(() => {
                    chars[0] && chars[0].parentNode.classList.add('animation-complete')
                }, this.charTransition);

            }, this.lineDuration);

        }, chars.length * this.charStaggerIn);
    }

    _appendText(i, activeCopy) {
        let activeParagraph = activeCopy[i];
        let formattedLines = this._formatLines(activeParagraph.text);
        let newParagraphEl = document.createElement("div");
        newParagraphEl.setAttribute('paragraph-ind', i);
        newParagraphEl.classList.add('subtitles');
        newParagraphEl.classList.add(activeCopy[i].side);
        newParagraphEl.innerHTML = formattedLines;
        this.container.appendChild(newParagraphEl);
    }

    init() {

    }
}
