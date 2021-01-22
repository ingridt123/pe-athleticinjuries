(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{RU2G:function(e,a,t){e.exports={container:"image-mapper-module--container--2ZShX",imageMap:"image-mapper-module--imageMap--29wKU",canvas:"image-mapper-module--canvas--2uH4N"}},RXBc:function(e,a,t){"use strict";t.r(a),t.d(a,"default",(function(){return g}));var r=t("q1tI"),n=t.n(r),o=t("Bl7J"),c=t("Wbzz"),i=t("vrFN"),s=t("RU2G"),l=t.n(s);function m(e){var a=this,t=e.orgWidth,o=e.orgHeight;e.height&&(t=e.orgWidth*(e.height/e.orgHeight),o=e.height),t>window.width&&(t=window.width,o=e.orgHeight*(window.width/e.orgWidth));var c,i=Object(r.useRef)(null);function s(a){c=i.current.getContext("2d");var t=e.fillColor||"rgba(255, 255, 255, 0.5)",r=e.lineWidth||1,n=e.strokeColor||"rgba(0, 0, 0, 0.5)",o=a[0],s=a[1],l=a[2],m=a[3];c.fillStyle=t,c.lineWidth=r,c.strokeColor=n,c.strokeRect(o,s,l-o,m-s),c.fillRect(o,s,l-o,m-s)}function m(){(c=i.current.getContext("2d")).clearRect(0,0,c.canvas.width,c.canvas.height)}return n.a.createElement("div",{className:l.a.container},n.a.createElement("img",{src:e.src,useMap:"#"+e.name,style:{width:t,height:o},alt:e.name,className:l.a.imageMap}),n.a.createElement("canvas",{ref:i,width:t,height:o,className:l.a.canvas}),n.a.createElement("map",{name:e.name},e.map.areas.map((function(t,r){for(var c=0;c<t.coords.length;c++)t.coords[c]*=o/e.orgHeight;return n.a.createElement("area",{alt:t.name,title:t.name,href:t.href,key:r,coords:t.coords,shape:t.shape,onMouseEnter:s.bind(a,t.coords),onMouseLeave:m.bind(a)})}))))}var h=t("vGFT"),d=t.n(h),u=t("aSCi"),p=t.n(u),f=function(e){return n.a.createElement("li",{className:d.a.listLink},n.a.createElement(c.Link,{to:e.to},e.children))};function g(e){var a=e.data;return n.a.createElement(o.a,null,n.a.createElement(i.a,{title:"Home",description:a.site.siteMetadata.description}),n.a.createElement("h1",null,"Home"),n.a.createElement("div",{className:d.a.row},n.a.createElement("div",{className:d.a.column},n.a.createElement("p",null,"Welcome to ",a.site.siteMetadata.title,". Click the links below or different body parts on the anatomical diagram to learn more!"),n.a.createElement("ul",{className:d.a.listLinks},n.a.createElement(f,{to:"/terminology"},"Terminology"),n.a.createElement(f,{to:"/stretches"},"Stretches"),n.a.createElement(f,{to:"/activation"},"Activation"),n.a.createElement(f,{to:"/warm-up"},"Warm Up"),n.a.createElement(f,{to:"/cool-down"},"Cool Down")),n.a.createElement("p",null,"Credit to CMS athletic trainers.")),n.a.createElement("div",{className:d.a.column},n.a.createElement(m,{src:p.a,map:{name:"anatomy-map",areas:[{name:"Ankle",shape:"rect",coords:[119,628,278,677],href:"/4-ankle"},{name:"Knee",shape:"rect",coords:[115,469,284,560],href:"/5.1-knee"},{name:"Hip",shape:"rect",coords:[121,292,266,428],href:"/5.2-hip"},{name:"Spine",shape:"rect",coords:[209,214,172,132],href:"/6-spine"},{name:"Core",shape:"rect",coords:[132,217,251,290],href:"/7-core"},{name:"Shoulder",shape:"rect",coords:[94,132,161,202],href:"/8-shoulder"},{name:"Shoulder",shape:"rect",coords:[220,198,284,131],href:"/8-shoulder"},{name:"Elbow",shape:"rect",coords:[75,228,128,289],href:"/9-elbow"},{name:"Elbow",shape:"rect",coords:[255,283,300,226],href:"/9-elbow"},{name:"Wrist",shape:"rect",coords:[46,310,106,345],href:"/10.1-wrist"},{name:"Wrist",shape:"rect",coords:[279,310,339,345],href:"/10.1-wrist"},{name:"Hand",shape:"rect",coords:[28,355,99,412],href:"/10.2-hand"},{name:"Hand",shape:"rect",coords:[351,355,281,407],href:"/10.2-hand"},{name:"Head and Neck",shape:"rect",coords:[136,20,244,127],href:"/11-head-and-neck"}]},name:"anatomy-map",orgWidth:382,orgHeight:737,height:400}),n.a.createElement("a",{href:"https://www.kenhub.com/en/library/anatomy/the-musculoskeletal-system",className:d.a.source},"Source: KenHub"))))}},aSCi:function(e,a,t){e.exports=t.p+"static/musculoskeletal-d985b5c7be7f3f5cdae030fbf0b1b709.png"},vGFT:function(e,a,t){e.exports={column:"index-module--column--30rVy",row:"index-module--row--iPaCs",listLinks:"index-module--listLinks--2LvKr",listLink:"index-module--listLink--1pFM8",source:"index-module--source--3cQc0"}}}]);
//# sourceMappingURL=component---src-pages-index-js-ee24fcea17a6a2e24ff7.js.map