// ==UserScript==
// @name         Bet365 Reporter
// @namespace    https://github.com/d0whc3r
// @version      1.0.15
// @description  Send bet365 bets to tipster-tools website
// @author       d0whc3r
// @match        https://www.bet365.es/
// @match        https://members.bet365.es/defaultapi/*
// @icon         https://www.bet365.es/sportsbook-static/favicons/main-favicon.ico
// @grant        none
// @license      MIT
// @downloadURL  https://raw.githubusercontent.com/d0whc3r/scripts/main/tipster-tools/bet365-reporter.user.js
// @updateURL    https://raw.githubusercontent.com/d0whc3r/scripts/main/tipster-tools/bet365-reporter.user.js
// ==/UserScript==

var v=Object.defineProperty;var U=(t,e,n)=>e in t?v(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n;var l=(t,e,n)=>(U(t,typeof e!="symbol"?e+"":e,n),n);var r={BACKEND_HOST:"https://tipster-tools.tunnelto.dev"};function a(t,e=document){return e.readyState==="complete"&&!!e.querySelector(t)}function g(t,e){setTimeout(()=>{t()?e():g(t,e)},1e3)}function c(t,e){return new Promise(n=>{t.document.readyState==="complete"?g(e,()=>n(!0)):t.addEventListener("load",()=>{g(e,()=>n(!0))},!1)})}var o=class{};l(o,"USERINFO","userInfo"),l(o,"BET365_COLLECT","/api/bet365/collect"),l(o,"BACKEND_HOST",r.BACKEND_HOST);var h="bet365-reporter__";function y(t){switch(t){case"session":return window.sessionStorage;case"local":default:return window.localStorage}}function O(t,e,n=null){let i=y(t).getItem(h+e);try{return i?JSON.parse(i):n}catch{return n}}function T(t,e,n){y(t).setItem(h+e,JSON.stringify(n))}function d(t,e){T("session",t,e)}function f(t,e=null){return O("session",t,e)}var w="members_iframe";function x(t){let e=t.flashvars;return{USER_NAME:e.USER_NAME,LOGGED_IN:e.LOGGED_IN,CURRENCY_CODE:e.CURRENCY_CODE}}function B(){if(u(),!f(o.USERINFO)){let e=document.createElement("iframe");e.src="https://members.bet365.es/defaultapi/up-configuration?bs=0&displaymode=desktop&handler=rdapi&mh=2&pid=8030&platform=1&prdid=1",e.id=w,document.body.appendChild(e)}}function u(){document.getElementById(w)?.remove()}function b(){c(window,()=>a(".myb-MyBetsScroller",document)).then(()=>L())}function L(){setInterval(()=>{M()},200)}function M(){let t=document.querySelectorAll(".myb-OpenBetItem"),e=document.querySelectorAll(".myb-SettledBetItem"),n="tt__scan-button",i=document.getElementById(n);if(!t.length&&!e.length){i?.remove();return}if(i)return;let s=document.createElement("div");s.id=n,s.classList.add("myb-HeaderButton"),s.textContent="Scan",s.addEventListener("click",()=>{N()});let m=document.querySelector(".myb-MyBetsHeader_Scroller"),S=m?.querySelectorAll(".myb-HeaderButton"),p=S?.[S.length-1];!m||!p||(m.insertBefore(s,p),m.insertBefore(p,s))}function N(){let t=document.querySelector(".myb-BetItemsContainer_BetItemsContainer");if(!t){alert("No se han encontrado apuestas");return}alert("Enviando apuestas al servidor... tenga paciencia, se le notificara cuando se hayan enviado"),C(),F(t.outerHTML).then(()=>{alert("Todas las apuestas han sido enviadas al servidor")}).catch(()=>{alert("No se han podido enviar las apuestas al servidor, intentelo de nuevo m\xE1s tarde o contacte con el administrador")})}function C(){document.querySelector(".myb-MyBetsScroller")?.querySelectorAll(".myb-OpenBetItem,.myb-SettledBetItem").forEach(e=>{let n=e.classList.contains("myb-OpenBetItem");(n?e.classList.contains("myb-OpenBetItem_Collapsed"):!e.querySelector(".myb-SettledBetItemInnerView"))&&e.querySelector(n?".myb-OpenBetItem_StakeDesc":".myb-SettledBetItemHeader_Text")?.click()})}async function F(t){let e=f(o.USERINFO);if(!e)throw new Error("No user found");let n=new URL(o.BET365_COLLECT,o.BACKEND_HOST);return n.searchParams.set("user",e.USER_NAME),fetch(n.toString(),{mode:"cors",method:"POST",headers:{Accept:"application/json","Content-Type":"application/x-www-form-urlencoded"},body:new URLSearchParams(Object.entries({bets:t})).toString()}).then(i=>i.json())}function I(){window.addEventListener("message",t=>{let{data:e}=t;if(e){let{type:n,payload:i}=e;switch(n){case 0:{d(o.USERINFO,i),u();break}}}})}function E(t){window.parent.postMessage(t,"*")}function _(){window.document.documentURI.startsWith("https://members.bet365.es/defaultapi/up-configuration")?R():(c(window,()=>a(".hm-MainHeaderMembersNarrow,.hm-MainHeaderMembersWide",document)).then(()=>H()),c(window,()=>a(".hm-MainHeaderRHSLoggedOutWide_Login,.hm-MainHeaderRHSLoggedOutNarrow_Login",document)).then(()=>D()))}function D(){d(o.USERINFO,null)}function H(){I(),B(),b()}function R(){try{let t=document.body.outerText;if(t.startsWith("{")){let e=JSON.parse(t),n=x(e);E({type:0,payload:n})}}catch(t){console.error(t)}finally{u()}}_();
