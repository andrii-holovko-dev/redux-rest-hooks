(this["webpackJsonpredux-rest-hooks-example"]=this["webpackJsonpredux-rest-hooks-example"]||[]).push([[0],{23:function(e,t,a){e.exports=a(36)},36:function(e,t,a){"use strict";a.r(t);var n={};a.r(n),a.d(n,"get",(function(){return Z})),a.d(n,"getList",(function(){return ee})),a.d(n,"create",(function(){return te})),a.d(n,"put",(function(){return ae})),a.d(n,"patch",(function(){return ne})),a.d(n,"remove",(function(){return re}));var r=a(1),c=a.n(r),o=a(10),i=a.n(o),s=a(12),u=a(6),l=a.n(u),d=a(4),p=a(7),b=a(5);function m(e,t){return e===t}function f(e,t,a){if(null===t||null===a||t.length!==a.length)return!1;for(var n=t.length,r=0;r<n;r++)if(!e(t[r],a[r]))return!1;return!0}function y(e){var t=Array.isArray(e[0])?e[0]:e;if(!t.every((function(e){return"function"===typeof e}))){var a=t.map((function(e){return typeof e})).join(", ");throw new Error("Selector creators expect all input-selectors to be functions, instead received the following types: ["+a+"]")}return t}var O=function(e){for(var t=arguments.length,a=Array(t>1?t-1:0),n=1;n<t;n++)a[n-1]=arguments[n];return function(){for(var t=arguments.length,n=Array(t),r=0;r<t;r++)n[r]=arguments[r];var c=0,o=n.pop(),i=y(n),s=e.apply(void 0,[function(){return c++,o.apply(null,arguments)}].concat(a)),u=e((function(){for(var e=[],t=i.length,a=0;a<t;a++)e.push(i[a].apply(null,arguments));return s.apply(null,e)}));return u.resultFunc=o,u.dependencies=i,u.recomputations=function(){return c},u.resetRecomputations=function(){return c=0},u}}((function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:m,a=null,n=null;return function(){return f(t,a,arguments)||(n=e.apply(null,arguments)),a=arguments,n}}));const j=(e,t)=>O(a=>Object(b.get)(a.data[e],"data[".concat(t,"]")),e=>e),g=(e,t,a)=>({type:"@RRH_INIT_".concat(e,"_").concat(t).toUpperCase(),meta:{operation:e,entityType:t,queryParams:a}}),h=(e,t={},a=!0)=>{const n=Object(p.b)(),c=t.id?t:Object(d.a)({},t,{id:"@RRH_SINGLE"}),o=Object(r.useMemo)(()=>j(e,c.id),[e,c.id]),i=Object(p.c)(o);return Object(r.useEffect)(()=>{!i&&a&&n(g("get",e,c))},[i,a,n]),Object(d.a)({},i,{refetch:()=>n(g("get",e,c)),patch:()=>n(g("patch",e,c)),put:()=>n(g("put",e,c)),remove:()=>n(g("remove",e,c))})},v=(e,t={},a=!0)=>{const n=Object(p.b)(),c=Object(r.useMemo)(()=>((e,t=0,a=0)=>O(t=>t.data[e],e=>{const n=Object(b.get)(e,"list",new Array(t+a).fill(void 0)),r=n.length>=t+a&&n.slice(t,t+a).every(e=>void 0!==e),c=Object(b.get)(e,"isInfiniteLoaded",{})[t];return{data:Object(b.get)(e,"list",[]).slice(t,a?t+a:void 0).map(t=>Object(b.get)(e,"data[".concat(t,"].data"))).filter(e=>e),isListLoaded:a?r:c,isLoadingList:Object(b.get)(e,"isLoadingList"),listResponse:Object(b.get)(e,"listResponse")}}))(e,t.index,t.size),[e,t.index,t.size]),o=Object(p.c)(c);return Object(r.useEffect)(()=>{!o.isListLoaded&&a&&n(g("getList",e,t))},[o.isListLoaded,a,n]),{data:o.data,listResponse:o.listResponse,isLoadingList:o.isLoadingList,refetch:()=>n(g("getList",e,t))}},L=e=>{const t=Object(p.b)();return{get:Object(r.useCallback)((a={})=>t(g("get",e,a)),[t,e]),getList:Object(r.useCallback)((a={})=>t(g("getList",e,a)),[t,e]),create:Object(r.useCallback)((a={})=>t(g("create",e,a)),[t,e]),put:Object(r.useCallback)((a={})=>t(g("put",e,a)),[t,e]),patch:Object(r.useCallback)((a={})=>t(g("patch",e,a)),[t,e]),remove:Object(r.useCallback)((a={})=>t(g("remove",e,a)),[t,e])}};function E(e){if(e.status>=200&&e.status<300)return e;throw{status:e.status,statusText:e.statusText}}function _(e){return e.json()}const x=(...e)=>fetch(...e).then(E).then(_);var T=function(e){return"@@redux-saga/"+e},w=T("IO"),k=T("MULTICAST"),C=T("SELF_CANCELLATION"),P=function(e){return null!==e&&void 0!==e},R=function(e){return"function"===typeof e},S=function(e){return"string"===typeof e},A=Array.isArray,q=function e(t){return t&&(S(t)||N(t)||R(t)||A(t)&&t.every(e))},I=function(e){return e&&R(e.take)&&R(e.close)},N=function(e){return Boolean(e)&&"function"===typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype};var z=function(e,t){var a;return(a={})[w]=!0,a.combinator=!1,a.type=e,a.payload=t,a};function M(e,t){return void 0===e&&(e="*"),q(e)?z("TAKE",{pattern:e}):I(a=e)&&a[k]&&P(t)&&q(t)?z("TAKE",{channel:e,pattern:t}):I(e)?z("TAKE",{channel:e}):void 0;var a}function U(e,t){var a;return(null===(a=t)||void 0===a)&&(t=e,e=void 0),z("PUT",{channel:e,action:t})}function F(e,t){var a,n=null;return R(e)?a=e:(A(e)?(n=e[0],a=e[1]):(n=e.context,a=e.fn),n&&S(a)&&R(n[a])&&(a=n[a])),{context:n,fn:a,args:t}}function H(e){for(var t=arguments.length,a=new Array(t>1?t-1:0),n=1;n<t;n++)a[n-1]=arguments[n];return z("CALL",F(e,a))}function J(e){for(var t=arguments.length,a=new Array(t>1?t-1:0),n=1;n<t;n++)a[n-1]=arguments[n];return z("FORK",F(e,a))}const D={isLoading:!1,isPutting:!1,isPatching:!1,isRemoving:!1,isCreating:!1,getError:null,putError:null,patchError:null,removeError:null,createError:null},K=e=>e.replace("_failure","").replace("_success",""),B=e=>({get:"isLoading",create:"isCreating",put:"isPutting",patch:"isPatching",remove:"isRemoving"}[K(e)]),W=e=>"".concat(K(e),"Error");c.a.memo(()=>{const e=v("comment",{size:50}),t=L("comment").getList;return c.a.createElement(c.a.Fragment,null,c.a.createElement("div",null,JSON.stringify(e.data)),c.a.createElement("button",{onClick:()=>t({index:20,size:10})},"test"))});const X=c.a.memo(({id:e})=>{const t=v("album"),a=(t.refetch,t.data),n=((e,t={})=>{const a=Object(p.b)(),n=Object(r.useMemo)(()=>"@RRH_CREATION_ID_".concat((new Date).getTime()),[e]),c=Object(d.a)({},t,{id:n}),o=Object(r.useMemo)(()=>j(e,c.id),[e,c.id]),i=Object(p.c)(o);return Object(d.a)({},i,{create:()=>a(g("create",e,c))})})("album"),o=(n.refetch,n.data,n.create);return c.a.createElement("div",null,c.a.createElement("button",{onClick:o},"create"),JSON.stringify(a))});c.a.memo(({id:e})=>{const t=h("user",{id:e});t.data,t.isLoading;return c.a.createElement("div",null,JSON.stringify(test.data))}),c.a.memo(()=>{const e=Object(r.useState)(0),t=Object(s.a)(e,2),a=t[0],n=t[1],o=v("album",{index:a,size:2,test:a}).data;return c.a.createElement(c.a.Fragment,null,c.a.createElement("div",null,JSON.stringify(o)),c.a.createElement("button",{onClick:()=>n(a-2)},"Prev"),c.a.createElement("button",{onClick:()=>n(a+2)},"Next"))});var G=function(){const e=Object(r.useState)(),t=Object(s.a)(e,2),a=(t[0],t[1],Object(r.useState)("album")),n=Object(s.a)(a,2),o=(n[0],n[1],L("comment"));return o.create,o.fetchList,c.a.createElement(c.a.Fragment,null,c.a.createElement(X,{id:1}),c.a.createElement(X,{id:2}))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var V=a(8),$=a(22),Q=Object(V.c)({data:(e={},{payload:t,meta:a={}})=>{const n=Object(b.get)(e,a.entityType,{}),r=Object(b.get)(n,"data",{}),c=r[Object(b.get)(a,"queryParams.id")]||{};switch(a.operation){case"create_success":return Object(d.a)({},e,{[a.entityType]:Object(d.a)({},n,{data:Object(d.a)({},Object(b.get)(e[a.entityType],"data",{}),{[t.id]:Object(d.a)({},D,{data:t}),[a.queryParams.id]:Object(d.a)({},D,{data:t})})})});case"get":case"put":case"patch":case"remove":case"create":return Object(d.a)({},e,{[a.entityType]:Object(d.a)({},n,{data:Object(d.a)({},r,{[a.queryParams.id]:Object(d.a)({},c,{[B(a.operation)]:!0,[W(a.operation)]:null})})})});case"get_failure":case"put_failure":case"patch_failure":case"remove_failure":case"create_failure":return Object(d.a)({},e,{[a.entityType]:Object(d.a)({},n,{data:Object(d.a)({},r,{[a.queryParams.id]:Object(d.a)({},c,{[B(a.operation)]:!1,[W(a.operation)]:t})})})});case"get_success":case"put_success":case"patch_success":return Object(d.a)({},e,{[a.entityType]:Object(d.a)({},n,{data:Object(d.a)({},r,{[a.queryParams.id]:Object(d.a)({},c,{[B(a.operation)]:!1,[W(a.operation)]:null,data:t})})})});case"remove_success":return Object(d.a)({},e,{[a.entityType]:Object(d.a)({},n,{data:Object(b.omit)(Object(b.get)(e[a.entityType],"data",{}),a.queryParams.id)})});case"getList":return Object(d.a)({},e,{[a.entityType]:Object(d.a)({},n,{isLoadingList:!0,getListError:null})});case"getList_failure":return Object(d.a)({},e,{[a.entityType]:Object(d.a)({},n,{isLoadingList:!1,getListError:t})});case"getList_success":const o=t.data,i=a.queryParams.index||0,s=a.queryParams.size||o.length,u=Object(b.get)(e[a.entityType],"list",[]),l=Object(b.get)(e[a.entityType],"isInfiniteLoaded",{});return Object(d.a)({},e,{[a.entityType]:Object(d.a)({},n,{isLoadingList:!1,getListError:null,listResponse:Object(b.omit)(t,"data"),isInfiniteLoaded:a.queryParams.size?l:Object(d.a)({},l,{[i]:!0}),list:new Array(Math.max(i+s,u.length)).fill(null).map((e,t)=>t<i||t>i+s?u[t]:(o[t-i]||{id:null}).id),data:Object(d.a)({},Object(b.get)(e[a.entityType],"data",{}),{},o.map(e=>Object(d.a)({},D,{data:e})).reduce((e,t)=>(e[t.data.id]=t,e),{}))})});default:return e}}}),Y=a(13);const Z=l.a.mark((function e({id:t}){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(Y.b)(5e3);case 2:return e.abrupt("return",{demo:123,id:t});case 3:case"end":return e.stop()}}),e)})),ee=l.a.mark((function e({id:t}){var a;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(Y.a)(x,"https://jsonplaceholder.typicode.com/albums/");case 2:return a=e.sent,e.abrupt("return",{data:a,size:1e3});case 4:case"end":return e.stop()}}),e)})),te=l.a.mark((function e(t){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(Y.a)(x,"https://jsonplaceholder.typicode.com/albums/",{method:"POST",body:t});case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})),ae=({id:e})=>x("https://jsonplaceholder.typicode.com/albums/".concat(e)),ne=({id:e})=>x("https://jsonplaceholder.typicode.com/albums/".concat(e)),re=({id:e})=>x("https://jsonplaceholder.typicode.com/albums/".concat(e)),ce=window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__||V.d,oe=Object($.a)();i.a.render(c.a.createElement(c.a.StrictMode,null,c.a.createElement(p.a,{store:function(){const e=Object(V.e)(Q,ce(Object(V.a)(oe)));var t;return oe.run((t={album:n,comment:n,user:n},l.a.mark((function e(){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,J(l.a.mark((function e(){var a,n,r;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:a={};case 1:return e.next=4,M(e=>e.type.startsWith("@RRH_INIT_"));case 4:if(n=e.sent,o=n.meta,r="".concat(o.operation,"_").concat(o.entityType,"_").concat(o.queryParams.id,"_").concat(o.queryParams.index,"_").concat(o.queryParams.size),!a[r]){e.next=9;break}return e.next=9,void 0===(c=a[r])&&(c=C),z("CANCEL",c);case 9:return e.next=11,J(l.a.mark((function e({meta:{entityType:a,operation:n,queryParams:r}}){var c;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,H(t[a][n],r);case 3:return c=e.sent,e.next=6,U({type:"@RRH_".concat(n,"_").concat(a,"_SUCCESS").toUpperCase(),payload:c,meta:{operation:"".concat(n,"_success"),entityType:a,queryParams:r}});case 6:e.next=12;break;case 8:return e.prev=8,e.t0=e.catch(0),e.next=12,U({type:"@RRH_".concat(n,"_").concat(a,"_FAILURE").toUpperCase(),payload:e.t0,meta:{operation:"".concat(n,"_failure"),entityType:a,queryParams:r}});case 12:case"end":return e.stop()}}),e,null,[[0,8]])})),n);case 11:a[r]=e.sent,e.next=1;break;case 14:case"end":return e.stop()}var c,o}),e)})));case 2:case"end":return e.stop()}}),e)})))),e}()},c.a.createElement(G,null))),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(e=>{e.unregister()}).catch(e=>{console.error(e.message)})}},[[23,1,2]]]);
//# sourceMappingURL=main.8f0a9ba4.chunk.js.map