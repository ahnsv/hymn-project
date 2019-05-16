(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{106:function(e,t,a){},107:function(e,t,a){},210:function(e,t,a){},221:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),c=a(25),o=a.n(c),i=(a(95),a(5)),l=(a(96),a(97),a(83)),s=a.n(l),d=a(84),u=a.n(d),m=a(20),h=function(e){var t=e.title,a=e.left,n=e.right,c=e.linkProp;return r.a.createElement("div",{className:"hymn-header"},r.a.createElement("div",{className:"header--left"},a),r.a.createElement("div",{className:"header--title"},r.a.createElement(m.b,{to:"/"},t)),r.a.createElement("div",{className:"header--right"},r.a.createElement(m.b,{to:c},n)))};h.defaultProps={left:r.a.createElement("img",{src:s.a,alt:"hamburger"}),title:"HYMN",right:r.a.createElement("img",{src:u.a,alt:"calendar"}),linkProp:"/"};var f=h,v=(a(106),function(e){var t=e.theme,a=e.color,n=e.children;return r.a.createElement("div",{className:"hymn-new-layout"},r.a.createElement("div",{className:"background-clip ".concat(t),style:{backgroundColor:a}}),n)});v.defaultProps={color:"#00A3EE",theme:"full"};var E=v,y=a(13),p=(a(107),a(87)),g=a.n(p),b=a(88),k=a.n(b),O=function(e){var t=e.list;return r.a.createElement("div",{className:"hymn-todo-layout",style:e.style,ref:e.refProp},t.map(function(e,t){return r.a.createElement("div",{className:"hymn-todo-list",key:t},r.a.createElement("img",{src:g.a,alt:"star"}),r.a.createElement("div",{className:"todo-date"},"0512"),r.a.createElement("div",{className:"todo-content"},e),r.a.createElement("img",{src:k.a,alt:"move"}))}))};O.defaultProps={list:[1,2,3,4,5,6,7,8,9]};var N=O,j=a(2);a(76),a(77),a(210);var w=function(e){e.dateData,e.scheduleData;var t=[{title:"\ubc25\uba39\uae30",date:new Date(2019,4,16),important:!0,category:"military"},{title:"\ubc25\uba39\uae302",date:new Date(2019,4,16),important:!0,category:"goal"}],a={military:x.$militaryColor,goal:x.$goalsColor,break:x.$breaksColor,anniversary:x.$anniversariesColor};return r.a.createElement("div",{className:"day-schedule-notifiers"},t&&t.map(function(e,t){return r.a.createElement("svg",{height:"6",width:"6",key:t},r.a.createElement("circle",{cx:"3",cy:"3",r:"2",strokeWidth:"1",fill:a[e.category]}))}))},x={$goalsColor:"#F5D908",$militaryColor:"#00A3EE",$breaksColor:"#D80351",$anniversariesColor:"#88A80D"},S=function(e){var t=e.index,a=e.today,n=e.date,c=e.id,o=e.idx,i=e.handleClick,l=e.handleHover,s=e.isCurrent,d=(e.isPrev,e.isNext);return r.a.createElement("div",{className:"".concat(s?"current-mth-days":d?"next-mth-days":"prev-mth-days"," \n      ").concat(t===a?o===Object(j.getDate)(a)-1?"today":"":o===Object(j.getDate)(a)-1&&Object(j.getMonth)(n)===Object(j.getMonth)(a)?"today":""," scheduler-day"),id:c,key:o,style:{color:"".concat(0===Object(j.getDay)(n)?"#D80351":6===Object(j.getDay)(n)?"#00A3EE":"")},onClick:function(e){return i(e,n)},onMouseEnter:l},r.a.createElement("div",{className:"day-schedule-notifiers"},r.a.createElement(w,null)),Object(j.getDate)(n),r.a.createElement("div",{className:"day-schedule-notifiers-range"},r.a.createElement("svg",{height:"20",width:"100"},r.a.createElement("line",{x1:"10",y1:"3",x2:"40",y2:"3",stroke:x.$breaksColor,strokeWidth:"4",strokeLinecap:"round"}),r.a.createElement("line",{x1:"10",y1:"9",x2:"50",y2:"9",stroke:x.$goalsColor,strokeWidth:"4",strokeLinecap:"round"}))))},D=function(e){var t=e.index,a=e.handlePrev,c=e.handleNext,o=e.isShortVersion,l=Object(n.useState)("month"),s=Object(i.a)(l,2),d=s[0];s[1];return r.a.createElement("div",{className:"scheduler-month-nav ".concat(o?"short":"")},"month"===d&&r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:"scheduler-nav--prev",onClick:a},"<"),r.a.createElement("div",{className:"scheduler-indicator"},r.a.createElement("div",{className:"scheduler-month-year"},Object(j.getYear)(t)),r.a.createElement("div",{className:"scheduler-month-month"},Object(j.getMonth)(t)+1)),r.a.createElement("div",{className:"scheduler-nav--next",onClick:c},">")),"year"===d&&r.a.createElement(r.a.Fragment,null))},C=a(15),P=function(e){var t=e.today,a=e.indexDate,c=e.isShortVersion,o=(e.setSelectProp,Object(n.useState)(a||t)),l=Object(i.a)(o,2),s=l[0],d=l[1],u=Object(n.useState)(null),m=Object(i.a)(u,2),h=m[0],f=m[1],v=Object(n.useState)(null),E=Object(i.a)(v,2),p=E[0],g=E[1];function b(e,t){e.persist(),f(t),g(e.target)}Object(n.useEffect)(function(){return p&&p.classList.add("selected"),function(){document.querySelector(".selected")&&document.querySelector(".selected").classList.remove("selected")}},[h,p]);var k=Object(j.startOfMonth)(s),O=Object(j.endOfMonth)(s),N=Object(j.subDays)(k,1),w=Object(j.addDays)(O,1),x=Object(j.eachDay)(k,O).map(function(e,a){return r.a.createElement(S,{today:t,index:s,idx:a,key:a,id:"day-".concat(a+1),date:e,isCurrent:!0,handleClick:b})}),P=Object(j.eachDay)(Object(j.startOfWeek)(N),N).map(function(e,a){return r.a.createElement(S,{today:t,index:s,idx:"prev-day-".concat(a),key:"prev-".concat(a),date:e,isPrev:!0,handleClick:b})}),A=Object(j.eachDay)(w,Object(j.endOfWeek)(w)).map(function(e,a){return r.a.createElement(S,{today:t,index:s,idx:"next-day-".concat(a),key:"next-".concat(a),date:e,isNext:!0,handleClick:b})}),W=function(){d(function(e){return Object(j.subMonths)(e,1)})},$=function(){d(function(e){return Object(j.addMonths)(e,1)})};return r.a.createElement("div",{className:"hymn-scheduler-month"},r.a.createElement(D,{index:s,handleNext:$,handlePrev:W,isShortVersion:c}),r.a.createElement(C.TransitionGroup,{className:"months-transition"},r.a.createElement(C.CSSTransition,{timeout:500,key:s,classNames:"months",unmountOnExit:!0,mountOnEnter:!0},r.a.createElement(y.a,{onSwipedRight:W,onSwipedLeft:$,className:"scheduler-month-wrapper"},["SUN","MON","TUE","WED","THU","FRI","SAT"].map(function(e,t){return r.a.createElement("div",{key:t,className:"day-indexes",style:{color:"".concat(0===t?"#D80351":6===t?"#00A3EE":"inherit")}},r.a.createElement("div",null,e))}),P,x,A))),r.a.createElement("div",{className:"hymn-month-to-dos"},r.a.createElement("div",{className:"to-do-date"},Object(j.getDate)(h)),r.a.createElement("div",{className:"to-do-content"},"\uc77c\uc815\uc774 \uc5c6\uc2b5\ub2c8\ub2e4.")))};P.defaultProps={today:new Date,indexDate:new Date,isShortVersion:!1,setSelectProp:null};var A=P,W=function(e){var t=new Date;return r.a.createElement("div",{className:"hymn-scheduler"},r.a.createElement(A,{today:t}),r.a.createElement("button",{className:"add-schedule"},"+"))},$=a(89),M=a.n($),T=a(12),L=function(e){var t=r.a.createElement("img",{src:M.a,alt:"gauge"}),a=Object(n.useState)(!1),c=Object(i.a)(a,2),o=c[0],l=c[1],s=Object(n.useState)(null),d=Object(i.a)(s,2),u=d[0],h=d[1],v=document.querySelector(".todo-layout"),p=Object(n.useRef)(v),g=document.querySelector(".main-dock"),b=Object(n.useRef)(g);Object(n.useEffect)(function(){if(o)return setTimeout(function(){h({theme:"half",color:"#f5d908"}),p.current.style.opacity="1",p.current.style.transition="opacity 500ms linear",b.current.style.display="none"},300),function(){o&&h(null)}},[o]);var k=function(e){var t=e.linkProp;return r.a.createElement(E,u,r.a.createElement(f,{linkProp:t}),r.a.createElement(y.a,{onSwipedUp:function(){return l(!0)}},r.a.createElement("div",{className:"main-dock ".concat(o?"toggled":""),ref:b})),r.a.createElement(N,{refProp:p,style:{opacity:"0"}}))},O=function(){return r.a.createElement(E,{theme:"half"},r.a.createElement(f,{title:"CALENDAR",right:t}),r.a.createElement(W,null))};return r.a.createElement("div",{className:"App"},r.a.createElement(m.a,null,r.a.createElement(T.a,{render:function(e){var t=e.location;return r.a.createElement(C.TransitionGroup,null,r.a.createElement(C.CSSTransition,{classNames:"page",key:t.pathname,timeout:500},r.a.createElement(T.c,null,r.a.createElement(T.a,{exact:!0,path:"/",render:function(){return r.a.createElement(k,{linkProp:"/scheduler"})}}),r.a.createElement(T.a,{path:"/scheduler",component:O}))))}})))},R=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function U(e,t){navigator.serviceWorker.register(e).then(function(e){e.onupdatefound=function(){var a=e.installing;null!=a&&(a.onstatechange=function(){"installed"===a.state&&(navigator.serviceWorker.controller?(console.log("New content is available and will be used when all tabs for this page are closed. See https://bit.ly/CRA-PWA."),t&&t.onUpdate&&t.onUpdate(e)):(console.log("Content is cached for offline use."),t&&t.onSuccess&&t.onSuccess(e)))})}}).catch(function(e){console.error("Error during service worker registration:",e)})}a(218).config(),o.a.render(r.a.createElement(L,null),document.getElementById("root")),function(e){if("serviceWorker"in navigator){if(new URL("/hymn-project",window.location.href).origin!==window.location.origin)return;window.addEventListener("load",function(){var t="".concat("/hymn-project","/service-worker.js");R?(function(e,t){fetch(e).then(function(a){var n=a.headers.get("content-type");404===a.status||null!=n&&-1===n.indexOf("javascript")?navigator.serviceWorker.ready.then(function(e){e.unregister().then(function(){window.location.reload()})}):U(e,t)}).catch(function(){console.log("No internet connection found. App is running in offline mode.")})}(t,e),navigator.serviceWorker.ready.then(function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit https://bit.ly/CRA-PWA")})):U(t,e)})}}()},76:function(e,t,a){},77:function(e,t,a){},83:function(e,t,a){e.exports=a.p+"static/media/hamburger.d2029f73.svg"},84:function(e,t,a){e.exports=a.p+"static/media/calendar.17fe5d4d.svg"},87:function(e,t,a){e.exports=a.p+"static/media/star.1bff2af5.svg"},88:function(e,t,a){e.exports=a.p+"static/media/move.087dd08b.svg"},89:function(e,t,a){e.exports=a.p+"static/media/gauge.ec97192c.svg"},90:function(e,t,a){e.exports=a(221)},95:function(e,t,a){},96:function(e,t,a){},97:function(e,t,a){}},[[90,1,2]]]);
//# sourceMappingURL=main.28c443c7.chunk.js.map