"use strict";(self.webpackChunktwilio_webchat_widget=self.webpackChunktwilio_webchat_widget||[]).push([[119],{14473:function(t,n,e){e.r(n),e.d(n,{form:function(){return o},link:function(){return i}});var r=e(17144);function i(t,n,e,i){var o=this;return t?((t instanceof Element?[t]:"toArray"in t?t.toArray():t).forEach((function(t){t.addEventListener("click",(function(u){var c,a,f=n instanceof Function?n(t):n,l=e instanceof Function?e(t):e,s=t.getAttribute("href")||t.getAttributeNS("http://www.w3.org/1999/xlink","href")||t.getAttribute("xlink:href")||(null===(c=t.getElementsByTagName("a")[0])||void 0===c?void 0:c.getAttribute("href")),h=(0,r.FJ)(o.track(f,l,null!==i&&void 0!==i?i:{}),null!==(a=o.settings.timeout)&&void 0!==a?a:500);(function(t,n){return!("_blank"!==t.target||!n)})(t,s)||function(t){var n=t;return!!(n.ctrlKey||n.shiftKey||n.metaKey||n.button&&1==n.button)}(u)||s&&(u.preventDefault?u.preventDefault():u.returnValue=!1,h.catch(console.error).then((function(){window.location.href=s})).catch(console.error))}),!1)})),this):this}function o(t,n,e,i){var o=this;return t?(t instanceof HTMLFormElement&&(t=[t]),t.forEach((function(t){if(!(t instanceof Element))throw new TypeError("Must pass HTMLElement to trackForm/trackSubmit.");var u=function(u){var c;u.preventDefault?u.preventDefault():u.returnValue=!1;var a=n instanceof Function?n(t):n,f=e instanceof Function?e(t):e;(0,r.FJ)(o.track(a,f,null!==i&&void 0!==i?i:{}),null!==(c=o.settings.timeout)&&void 0!==c?c:500).catch(console.error).then((function(){t.submit()})).catch(console.error)},c=window.jQuery||window.Zepto;c?c(t).submit(u):t.addEventListener("submit",u,!1)})),this):this}}}]);
//# sourceMappingURL=auto-track.js.map