// ==UserScript==
// @name         AntiAdblocker remover
// @run-at       document-start
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Remove tipical anti adblocker
// @author       d0whc3r
// @match        https://infrafandub.xyz/*
// @match        https://taurusfansub.com/*
// @match        https://novelasligeras.net/*
// @match        https://samuraiscan.org/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=infrafandub.xyz
// @grant        none
// ==/UserScript==

function removeAntiAdblock() {
    const predefined = document.querySelector('#ytburi-blanket')
    if (predefined) {
        //predefined.querySelector('button')?.click()
        predefined.remove()
    } else {
        document.querySelectorAll('body > div').forEach((x) => {
            const id = x.id
            console.log('checking div...', x)
            if (id.length > 25 && x.classList.contains(id)) {
                console.log('remove id', id, x)
                x.remove()
            }
        })
        const body = document.querySelector('body')
        body.style.setProperty('overflow', 'auto', 'important')
    }
}
window.removeAntiAdblock = removeAntiAdblock

setInterval(() => removeAntiAdblock(), 1_000)
