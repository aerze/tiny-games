
export function h(tagName, className, children) {
    /** @type {HTMLElement} */
    const el = document.createElement(tagName);
    if (className) el.className = className;
    if (children) children.map((child) => el.appendChild(child));
    return el;
}

export function div(className, children) {
    return h('div', className, children);
}

export function img(className, src, children) {
    const el = h('img', className, children);
    el.src = src;
    return el;
}

export function audio(className, src, volume, children) {
    /** @type {HTMLAudioElement} */
    const el = h('audio', className, children);
    el.volume = volume;
    el.src = src;    
    return el;
}