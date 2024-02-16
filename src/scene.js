
export class Scene {
    paused = false;
    
    /**@type {HTMLElement} */
    container = null;

    constructor() {
        this.hide();
    }

    start() {
        this.show();
        this.create();
        
        this.paused = false;
        this.render();
    }

    stop() {
        this.paused = true;
    }

    delete() {
        this.hide();
        this.stop();
        this.destroy();
    }

    toggle() {
        if (this.paused) this.start();
        else this.stop()
    }

    create() {}

    destroy() {}

    update() {}

    render = () => {
        if (this.paused) return;
        requestAnimationFrame(this.render)
        this.update();
    }

    hide() {
        if (this.container) {
            this.container.style.display = 'none';
        }
    }

    show() {
        if (this.container) {
            this.container.style.display = 'flex';
        }
    }
}