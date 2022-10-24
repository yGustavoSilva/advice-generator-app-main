'use strict';

const dom = [...document.querySelectorAll('[id]')].reduce((acc, cur) => ({...acc, [cur.getAttribute('id')]: cur}), {});

const advice = {
    get: async () => (await (await fetch(`https://api.adviceslip.com/advice`)).json()).slip,

    show: async function () {
        let {id, advice} = await this.get();
        dom.id.textContent = `#${id}`;
        dom.advice.textContent = `“${advice}”`;
    }
}

const button = {
    sleep: async () => new Promise((resolve, reject) => setTimeout(() => resolve(), 2000)),

    load: async function () {
        dom.dice.style.animation = 'load 2s';
        dom.dice.disabled = true;
        await this.sleep();
        dom.dice.style.animation = '';
        dom.dice.disabled = false;
    }
}

dom.dice.addEventListener('click', e => {
    advice.show();
    button.load();
});

advice.show();