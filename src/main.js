import anime from 'animejs/lib/anime.es.js';
import { Timer, get, randomInt } from './helpers';
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
        
        this.lastSecond = 0;
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

    create() {
        shout("SLAP!!")
        this.lastSecond = Date.now();
        this.container.addEventListener('click', (e) => {
            e.preventDefault();
            this.slapper.style.left = `${e.clientX - 25}px`
            this.slapper.style.top = `${e.clientY - 25}px`
            this.slapperImage.classList.add('down');
            this.playHit();
            setTimeout(() => {
                this.slapperImage.classList.remove('down');
            }, 50);
        })
    }

    destroy() {}

    update() {
        const now = Date.now();
        if ((now - this.lastSecond) > 1000) {
            this.lastSecond = now;
            this.slapTarget.style.left = `${randomInt(0, 300)}px`;
            this.slapTarget.style.top = `${randomInt(0, 500)}px`;
        }
    }
}

const MenuScene = new Menu();
const SlapScene = new SlapGame();

// THIS IS A SHORTCUT
// MenuScene.delete();
// SlapScene.start();

startButton.addEventListener('click', (e) => {
    e.preventDefault();
    MenuScene.start();
    startButton.remove();
})


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


