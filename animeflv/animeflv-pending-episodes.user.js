// ==UserScript==
// @author        d0whc3r
// @namespace     https://openuserjs.org/users/d0whc3r
// @name          Animeflv pending episodes
// @description   Get pending episodes in following series
// @license       MIT
// @version       0.1.6
// @match         https://*.animeflv.net/perfil/*/siguiendo*
// @match         https://*.animeflv.net/perfil/*/favoritos*
// @match         https://*.animeflv.net/perfil/*/lista_espera*
// @match         https://*.animeflv.net/ver/*
// @grant         none
// @icon          https://www.google.com/s2/favicons?domain=www3.animeflv.net
// @updateURL     https://raw.githubusercontent.com/d0whc3r/scripts/main/animeflv/animeflv-pending-episodes.user.js
// @downloadURL   https://raw.githubusercontent.com/d0whc3r/scripts/main/animeflv/animeflv-pending-episodes.user.js
// ==/UserScript==

;(function () {
  function parseInfo(data) {
    const result = /<script>([\s\S]+?)(var anime_info[\s\S]+?)<\/script>/.exec(data)
    const variables = result[2]
      .replace(/\n/g, '')
      .replace(/  /g, '')
      .match(/(var (.*) = (.*))+/g)
    const info = {}
    variables
      .map((cont) => cont.match(/var (.*) = (.*);/))
      .forEach((cont) => {
        let name = cont[1]
        let value = cont[2]
        info[name] = JSON.parse(value)
      })
    return info
  }

  function isToday(date) {
    const today = new Date()
    const todayDay = [today.getDate(), today.getMonth(), today.getFullYear()].join('-')
    const dateDay = [date.getDate(), date.getMonth(), date.getFullYear()].join('-')
    return todayDay === dateDay
  }

  function getAllSeries() {
    const series = $('ul.ListAnimes.Rows li').toArray()
    series.forEach((serie) => {
      const title = $('article > h3.Title a', serie)
      let url = title[0].href
      $.ajax({
        url,
        async: true,
        cache: true,
        dataType: 'html',
        method: 'GET',
        success: function (data) {
          let info = parseInfo(data)
          const nextDate = info.anime_info[3] && new Date(info.anime_info[3])
          const lastEpisode = parseInt(info.episodes[0][0])
          const totalEpisodes = info.episodes.length
          const lastSeen = parseInt(info.last_seen)
          if (lastEpisode !== lastSeen) {
            title.attr({
              style: 'color: red',
            })
            const text = title.text()
            title.text(`${text} [${lastEpisode - lastSeen}/${totalEpisodes}]`)
          } else if (nextDate && isToday(nextDate)) {
            title.attr({
              style: 'color: green',
            })
          }
        },
      })
    })
  }

  function extractIframe() {
    const iframe = $('iframe')
    if (iframe.length) {
      const expandIcon = $('i.fa-expand').parent()
      const iframeIcon = $('<span class="BtnNw Clgt BxSdw fa-file-movie-o" data-toggle="tooltip" title="Abrir iframe video">')
      iframeIcon.click(() => window.open(iframe[0].src, '_blank'))
      expandIcon.after(iframeIcon)
    }
  }

  function init() {
    getAllSeries()
    setTimeout(extractIframe, 1000)
  }

  init()
})()
