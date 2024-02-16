import anime from 'animejs/lib/anime.es.js';
import { Timer, get } from './helpers';
import { audio, div, h, img } from './element';
import { Scene } from './scene';
import slapperURL from './slapper.png';
import loudHitURL from 'url:./loud_hit.wav';

const gamecontainer = get('game');
const startButton = get('start');
const shoutText = get('shout');
const startMenu = get('menu');

function shout(text) {
    shoutText.innerText = text;
}

class Menu extends Scene {
    countdown = new Timer(2999, 'down');
    create() {
        this.countdown.start();
        this.countdown.completion.then(() => {
            this.delete();
            SlapScene.start();
        })
    }

    destroy() {
        startMenu.remove();
        shout('');
    }

    update() {
        shout(Math.floor(this.countdown.elapsed / 1000) + 1);
    }
}

class SlapGame extends Scene {
    constructor() {
        super();
        this.loudHit = audio('slap-audio', loudHitURL, 0.25);
        this.slapTarget = div('slap-target');
        this.slapperImage = img('slapper-image', slapperURL);
        this.slapper = div('slapper', [this.slapperImage, this.loudHit]);
        this.container = div('slap-container', [
            this.slapTarget,
            this.slapper
        ])
        
        this.hide();

        this.slapper.style.left = `${500}px`
        this.slapper.style.top = `${500}px`
        
        gamecontainer.appendChild(this.container);
    }

    playHit() {
        this.loudHit.pause();
        this.loudHit.currentTime = 0
        this.loudHit.play();
    }

    /** @type {Touch} */
    touch = null;

    create() {

        this.container.addEventListener('click', (e) => {
            e.preventDefault();
            this.slapper.style.left = `${e.clientX - 50}px`
            this.slapper.style.top = `${e.clientY - 50}px`
            this.slapperImage.classList.add('down');
            this.playHit();
            setTimeout(() => {
                this.slapperImage.classList.remove('down');
            }, 50);
        })
        // this.container.addEventListener('touchmove', (event) => {
        //     console.log('touch detected');
        //     this.touch = event.touches[0];
        // })
    }

    destroy() {}

    update() {
        // get cursor position
        // if (this.touch) {
        //     this.slapper.style.left = `${this.touch.clientX - 50}px`
        //     this.slapper.style.top = `${this.touch.clientY - 50}px`
        //     shout(`${this.touch.clientX}, ${this.touch.clientY}`);
        // }
        // apply position to element


    }
}

const MenuScene = new Menu();
const SlapScene = new SlapGame();

MenuScene.delete();
SlapScene.start();

// startButton.addEventListener('click', (e) => {
//     e.preventDefault();
//     MenuScene.start();
//     startButton.remove();
// })


// shoutText.style.opacity = 0;

// const shoutAnimation = anime({
//     targets: shoutText,
//     rotate: 360,
//     duration: 1000,
//     loop: false,
// });

// startButton.addEventListener("click", () => {
//     shoutText.style.opacity = 1;
//     shoutAnimation.play();
// });


