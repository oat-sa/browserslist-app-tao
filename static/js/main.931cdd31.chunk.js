(this["webpackJsonpbrowserslist-app-tao"]=this["webpackJsonpbrowserslist-app-tao"]||[]).push([[0],{11:function(e,s,r){},12:function(e,s,r){},21:function(e,s){},25:function(e,s,r){"use strict";r.r(s);var t=r(1),n=r.n(t),o=r(4),i=r.n(o),c=(r(11),r(12),r(5)),a=r.n(c),l=r(6),d=r.n(l);const b={and:"Android",chr:"Chrome",ff:"Firefox",ios:"iOS",ie:"Internet Explorer",saf:"Safari",chrome:"Chrome",edge:"Edge",firefox:"Firefox",safari:"Safari"};var p=function(){const e={desktop:{},mobile:{}};a()(d.a).reduce(((s,r)=>{const t=r.split(" ")[0],n=(e=>{const s=e.split(" ")[0].split("_").reverse().map((e=>b[e]?b[e]:e)),r=s[1]&&["iOS","Android"].includes(s[1])?"mobile":"desktop";return{browser:s[0],os:s[1]||"",versions:[e.split(" ")[1]],device:r}})(r);return e[n.device][t]?e[n.device][t].versions=e[n.device][t].versions.concat(n.versions):e[n.device][t]=n,e}),{});for(let s in e){for(let r of Object.values(e[s]))r.versions.sort();Object.keys(e[s]).sort().reduce(((r,t)=>(r[t]=e[s][t],r)),{})}return Object.values(e.desktop).concat(Object.values(e.mobile))},u=r(0);var j=function(){return Object(u.jsxs)("div",{className:"app",children:[Object(u.jsx)("h1",{className:"title",children:"Browsers supported by TAO"}),Object(u.jsx)("ul",{className:"browsers",children:(()=>{const e=e=>e.os?e.browser+"/"+e.os:e.browser,s=e=>(e.os?e.browser+"-"+e.os:e.browser).toLowerCase().replace(/\W+/g,"-"),r=e=>e.versions.join(", "),t=e=>1!==e.versions.length||e.versions[0].includes("-")?"Versions":"Version";return p().map((n=>Object(u.jsxs)("li",{className:s(n),children:[Object(u.jsx)("span",{className:"icon",children:" "}),Object(u.jsx)("h2",{className:"title",children:e(n)}),Object(u.jsx)("span",{className:"supported",children:t(n)}),Object(u.jsx)("span",{className:"versions",children:r(n)})]},s(n))))})()})]})};var v=e=>{e&&e instanceof Function&&r.e(3).then(r.bind(null,26)).then((({getCLS:s,getFID:r,getFCP:t,getLCP:n,getTTFB:o})=>{s(e),r(e),t(e),n(e),o(e)}))};i.a.render(Object(u.jsx)(n.a.StrictMode,{children:Object(u.jsx)(j,{})}),document.getElementById("root")),v()}},[[25,1,2]]]);
//# sourceMappingURL=main.931cdd31.chunk.js.map