(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{RU2G:function(e,t,a){e.exports={containerHome:"image-mapper-module--containerHome--3GXfu",containerOverlay:"image-mapper-module--containerOverlay--1Il1H",imageMap:"image-mapper-module--imageMap--29wKU",canvas:"image-mapper-module--canvas--2uH4N"}},RXBc:function(e,t,a){"use strict";a.r(t),a.d(t,"default",(function(){return f}));var n=a("q1tI"),o=a.n(n),r=a("Wbzz"),c=a("Bl7J"),i=a("vrFN"),s=a("e9zI"),l=a("vGFT"),h=a.n(l),m=a("aSCi"),d=a.n(m),u=function(e){return o.a.createElement("li",{className:h.a.listLink},o.a.createElement(r.Link,{to:e.to},e.children))};function f(e){var t=e.data;return o.a.createElement(c.a,{homePage:!0},o.a.createElement(i.a,{title:"Home",description:t.site.siteMetadata.description}),o.a.createElement("h1",null,"Home"),o.a.createElement("div",{className:h.a.row},o.a.createElement("div",{className:h.a.column},o.a.createElement("p",null,"Welcome to ",t.site.siteMetadata.title,". Click the links below or different body parts on the anatomical diagram to learn more!"),o.a.createElement("ul",{className:h.a.listLinks},o.a.createElement(u,{to:"/terminology"},"Terminology"),o.a.createElement(u,{to:"/stretches"},"Stretches"),o.a.createElement(u,{to:"/warm-up"},"Warm Up"),o.a.createElement(u,{to:"/cool-down"},"Cool Down")),o.a.createElement("p",null,"Credit to CMS athletic trainers,  instructors of PE 090A ",o.a.createElement("i",null,"Prevention of Athletic Injuries"),"."),o.a.createElement("br",null),o.a.createElement("p",null,"NOTE: Please make sure that if any of these exercises cause pain or discomfort to discontinue that activity and seek professional help for proper instructions on the movement.")),o.a.createElement("div",{className:h.a.column},o.a.createElement(s.a,{src:d.a,map:{name:"anatomy-map",areas:[{name:"Ankle",shape:"rect",coords:[119,628,278,677],href:"/4-ankle"},{name:"Knee",shape:"rect",coords:[115,469,284,560],href:"/5.1-knee"},{name:"Hip",shape:"rect",coords:[121,292,266,428],href:"/5.2-hip"},{name:"Spine",shape:"rect",coords:[209,214,172,132],href:"/6-spine"},{name:"Core",shape:"rect",coords:[132,217,251,290],href:"/7-core"},{name:"Shoulder",shape:"rect",coords:[94,132,161,202],href:"/8-shoulder"},{name:"Shoulder",shape:"rect",coords:[220,198,284,131],href:"/8-shoulder"},{name:"Elbow",shape:"rect",coords:[75,228,128,289],href:"/9-elbow"},{name:"Elbow",shape:"rect",coords:[255,283,300,226],href:"/9-elbow"},{name:"Wrist",shape:"rect",coords:[46,310,106,345],href:"/10.1-wrist"},{name:"Wrist",shape:"rect",coords:[279,310,339,345],href:"/10.1-wrist"},{name:"Hand",shape:"rect",coords:[28,355,99,412],href:"/10.2-hand"},{name:"Hand",shape:"rect",coords:[351,355,281,407],href:"/10.2-hand"},{name:"Head and Neck",shape:"rect",coords:[136,20,244,127],href:"/11-head-and-neck"}]},name:"anatomy-map",home:!0,orgWidth:382,orgHeight:737,height:400}),o.a.createElement("a",{href:"https://www.kenhub.com/en/library/anatomy/the-musculoskeletal-system",className:h.a.source},"Source: KenHub"))))}},aSCi:function(e,t,a){e.exports=a.p+"static/musculoskeletal-d985b5c7be7f3f5cdae030fbf0b1b709.png"},e9zI:function(e,t,a){"use strict";a.d(t,"a",(function(){return l}));var n=a("q1tI"),o=a.n(n),r=a("Wbzz"),c=a("RU2G"),i=a.n(c),s=a("t5R/");function l(e){var t=this,a=e.orgWidth,c=e.orgHeight,l=e.height,h=e.src,m=e.name,d=e.map,u=e.hoverAction,f=e.home,p=void 0!==f&&f,v=e.lineWidth,w=void 0===v?1:v,g=e.strokeColor,M=void 0===g?"rgba(0, 0, 0, 0.5)":g,b=a,E=c;l&&(b=a*(l/c),E=l),"undefined"!=typeof window&&b>window.width&&(b=window.width,E=c*(window.width/a));var k,y,x=Object(n.useRef)(null);function C(e,t,a,n,o){if(void 0===o&&(o="rgba(255, 255, 255, 0.5)"),console.log("hover on",n,e),y=x.current.getContext("2d"),a){for(var r=0;r<a.arrows.length;r++){var c=a.arrows[r];Object(s.a)(y,c.coords,o)}for(var i=0;i<a.text.length;i++){var l=a.text[i];Object(s.d)(y,l.coords,l.text,l.textFont,l.textAlign,o)}for(var h=0;h<a.circles.length;h++){var m=a.circles[h];Object(s.b)(y,m.coords,o)}}else switch(n){case"rect":Object(s.c)(y,t,o,w,M);break;case"poly":Object(s.a)(y,t,o)}u&&u(e)}function H(){(y=x.current.getContext("2d")).clearRect(0,0,y.canvas.width,y.canvas.height)}return Object(n.useEffect)((function(){k=x.current,y=k.getContext("2d"),k.width=2*b,k.height=2*E,y.scale(2,2)}),[y]),o.a.createElement("div",{className:p?i.a.containerHome:i.a.containerOverlay},h?o.a.createElement("img",{src:h,useMap:"#"+m,style:{width:b,height:E},alt:m,className:i.a.imageMap}):o.a.createElement(o.a.Fragment,null),o.a.createElement("canvas",{ref:x,className:i.a.canvas,style:{width:b,height:E}}),o.a.createElement("map",{name:m},d.areas.map((function(e){for(var a=0;a<e.coords.length;a++)e.coords[a]*=E/c;return e.href?o.a.createElement(r.Link,{to:e.href},o.a.createElement("area",{alt:e.name,title:e.name,coords:e.coords,shape:e.shape,onMouseEnter:C.bind(t,e.name,e.coords,e.altCoords,e.shape,e.fillColor),onMouseLeave:H.bind(t)})):o.a.createElement("area",{alt:e.name,title:e.name,coords:e.coords,shape:e.shape,onMouseEnter:C.bind(t,e.name,e.coords,e.altCoords,e.shape,e.fillColor),onMouseLeave:H.bind(t)})}))))}},"t5R/":function(e,t,a){"use strict";function n(e,t,a,n,o){var r=t[0],c=t[1],i=t[2],s=t[3];e.fillStyle=a,e.lineWidth=n,e.strokeColor=o,e.strokeRect(r,c,i-r,s-c),e.fillRect(r,c,i-r,s-c)}function o(e,t,a){var n=t[0],o=t[1],r=t[2];e.fillStyle=a,e.beginPath(),e.arc(n,o,r,0,2*Math.PI),e.fill()}function r(e,t,a,n,o,r){var c=t[0],i=t[1];e.font=n,e.textAlign=o,e.fillStyle=r,e.fillText(a,c,i)}function c(e){var t=e[0],a=e[1],n=e[2],o=e[3],r=Math.sqrt(Math.pow(o-a,2)+Math.pow(n-t,2)),c=.3*r,i=.4*r,s=1.2*r,l=Math.sqrt(Math.pow(s/2,2)+Math.pow(i,2)),h=Math.sqrt(Math.pow(c/2,2)+Math.pow(i,2)),m=Math.atan2(o-a,n-t),d=Math.PI/4,u=Math.atan2(c/2,i),f=Math.PI/2,p=n-l*Math.cos(m-d),v=o-l*Math.sin(m-d),w=n-h*Math.cos(m-u),g=o-h*Math.sin(m-u),M=n-h*Math.cos(m+u),b=o-h*Math.sin(m+u),E=n-l*Math.cos(m+d),k=o-l*Math.sin(m+d);return[n,o,p,v,w,g,t-c*Math.cos(m-f),a-c*Math.sin(m-f),t-c*Math.cos(m+f),a-c*Math.sin(m+f),M,b,E,k]}function i(e,t,a){var n=t;4===t.length&&(n=c(t));var o=n,r=o[0],i=o[1],s=o[2],l=o[3],h=o[4],m=o[5],d=o[6],u=o[7],f=o[8],p=o[9],v=o[10],w=o[11],g=o[12],M=o[13];e.fillStyle=a,e.beginPath(),e.moveTo(r,i),e.lineTo(s,l),e.lineTo(h,m),e.lineTo(d,u),e.lineTo(f,p),e.lineTo(v,w),e.lineTo(g,M),e.closePath(),e.fill()}a.d(t,"c",(function(){return n})),a.d(t,"b",(function(){return o})),a.d(t,"d",(function(){return r})),a.d(t,"e",(function(){return c})),a.d(t,"a",(function(){return i}))},vGFT:function(e,t,a){e.exports={column:"index-module--column--30rVy",row:"index-module--row--iPaCs",listLinks:"index-module--listLinks--2LvKr",listLink:"index-module--listLink--1pFM8",source:"index-module--source--3cQc0"}}}]);
//# sourceMappingURL=component---src-pages-index-js-79b3722b851af26489f4.js.map