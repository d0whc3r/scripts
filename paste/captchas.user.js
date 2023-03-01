// ==UserScript==
// @author        d0whc3r
// @namespace     https://openuserjs.org/users/d0whc3r
// @name          Captchas
// @description   Remove redirects and simple captchas
// @license       MIT
// @version       0.2
// @match         *://*-id.tv/*
// @match         *://pasted.co/*
// @match         *://controlc.com/*
// @grant         none
// @updateURL     https://raw.githubusercontent.com/d0whc3r/scripts/main/paste/captchas.user.js
// @downloadURL   https://raw.githubusercontent.com/d0whc3r/scripts/main/paste/captchas.user.js
// ==/UserScript==

;(function () {
  'use strict'

  const TIMEOUT = 1500

  function pasted() {
    const url = document.URL
    return {
      web: url.indexOf('pasted.co/') >= 0 || url.indexOf('controlc.com/') >= 0,
      full: url.indexOf('/fullscreen.php') >= 0,
    }
  }

  function checkRedirects() {
    if (pasted().web) {
      return
    }
    const links = document.querySelectorAll('a[href*="://ouo.io/"]')
    const expr = /http[s]*:\/\/ouo.io\/s\/.*\?s=[%20]*/gi
    const regexp = new RegExp(expr)
    links.forEach((link) => {
      link.href = link.href.replace(regexp, '')
    })
  }

  function cleanCaptcha() {
    const paste = pasted()
    if (paste.web && paste.full) {
      return
    }
    let button = document.createElement('button')
    button.textContent = 'Remove'
    button.setAttribute('style', 'margin: 0 50%; top: 0; left: 0; right: 0; position: fixed; z-index: 999999999999999;')
    button.onclick = removeCaptcha
    const base = document.querySelector('body')
    base.appendChild(button)
  }

  function removeCaptcha() {
    const bg = document.querySelector('.bg-danger')
    if (bg) {
      bg.remove()
    }
    const captcha = document.querySelector('#captcha_overlay')
    if (captcha) {
      captcha.parentNode.removeChild(captcha)
      this.parentNode.removeChild(this)
    }
  }

  function convertLinks() {
    if (pasted().web && !pasted().full) {
      return
    }
    const base = document.querySelector('#thepaste')
    const expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-zA-Z  ]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#!?&//=]*)?/gi
    const regex = new RegExp(expression)
    const result = base.textContent.match(regex)
    result.forEach((link) => {
      let space = document.createElement('br')
      base.parentNode.appendChild(space)
      let thelink = document.createElement('a')
      thelink.setAttribute('href', link)
      thelink.setAttribute('target', '_blank')
      thelink.setAttribute('rel', 'noopener noreferrer')
      thelink.textContent = link
      base.parentNode.appendChild(thelink)
    })
  }

  function init() {
    setTimeout(() => {
      checkRedirects()
      cleanCaptcha()
      convertLinks()
    }, TIMEOUT)
  }

  init()
})()
