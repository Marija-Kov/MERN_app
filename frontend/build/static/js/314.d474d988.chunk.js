"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[314],{314:function(e,t,r){r.r(t),r.d(t,{default:function(){return y}});var n=r(4165),a=r(5861),s=r(9439),o=r(2791),i=r(7200),l=r(4961),c=r(6849);var u=r(184),d=o.lazy((function(){return r.e(273).then(r.bind(r,6273))}));function p(e){var t=e.id,r=e.title,p=e.reps,h=e.load,f=e.createdAt,m=e.updatedAt,x=e.page,b=e.getItems,g=e.total,k=e.limit,v=e.spreadPages,j=o.useState(!1),w=(0,s.Z)(j,2),Z=w[0],y=w[1],N=function(){var e=o.useState(null),t=(0,s.Z)(e,2),r=t[0],i=t[1],u=(0,l.m)().dispatch,d=(0,c.E)().user,p=function(){var e=(0,a.Z)((0,n.Z)().mark((function e(t){var r,a;return(0,n.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(d){e.next=3;break}return i("You must be logged in to do that"),e.abrupt("return");case 3:return e.next=5,fetch("".concat("http://localhost:6060","/api/workouts/").concat(t),{method:"DELETE",headers:{Authorization:"Bearer ".concat(d.token)}});case 5:return r=e.sent,e.next=8,r.json();case 8:a=e.sent,r.ok&&(u({type:"DELETE_ONE",payload:a.workout}),i(null)),r.ok||i(a.error);case 11:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return{deleteWorkout:p,error:r}}(),S=N.deleteWorkout,C=N.error,E=function(){var e=(0,a.Z)((0,n.Z)().mark((function e(){return(0,n.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,S(t);case 2:return e.next=4,b("",x);case 4:v(g,k);case 5:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),A=function(){y((function(e){return!e}))},P=(0,i.Z)(new Date(f),{addSuffix:!0});return(0,u.jsxs)(u.Fragment,{children:[(0,u.jsxs)("div",{"aria-label":"details of workout ".concat(r," created ").concat(P),className:"workout-details",children:[(0,u.jsx)("h4",{children:r}),(0,u.jsxs)("p",{children:[(0,u.jsx)("strong",{children:"reps:"})," ",p]}),(0,u.jsxs)("p",{children:[(0,u.jsx)("strong",{children:"load:"})," ",h]}),(0,u.jsx)("p",{"aria-label":"date",className:"date",children:P}),(0,u.jsx)("button",{"aria-label":"delete workout ".concat(r," created ").concat(P),className:"material-symbols-outlined",onClick:E,children:"delete"}),(0,u.jsx)("button",{"aria-label":"open ".concat(r," edit form created ").concat(P),className:"material-symbols-outlined edit",onClick:A,children:"edit"}),C&&(0,u.jsx)("div",{role:"alert",className:"error",children:C})]}),Z&&(0,u.jsx)(o.Suspense,{children:(0,u.jsx)(d,{id:t,title:r,reps:p,load:h,createdAt:f,updatedAt:m,showEdit:function(){return A()}},t+"edit")})]})}var h=r(4942),f=r(1413),m=r(3433),x=function(){var e=(0,l.m)().dispatch,t=(0,c.E)().user,r=o.useState(null),i=(0,s.Z)(r,2),u=i[0],d=i[1],p=function(){var r=(0,a.Z)((0,n.Z)().mark((function r(a){var s,o;return(0,n.Z)().wrap((function(r){for(;;)switch(r.prev=r.next){case 0:if(t){r.next=3;break}return d("You must be logged in"),r.abrupt("return");case 3:return r.next=5,fetch("".concat("http://localhost:6060","/api/workouts"),{method:"POST",body:JSON.stringify(a),headers:{"Content-Type":"application/json",Authorization:"Bearer ".concat(t.token)}});case 5:return s=r.sent,r.next=8,s.json();case 8:if(o=r.sent,s.ok){r.next=12;break}return d("Please fill out the empty fields"),r.abrupt("return");case 12:s.ok&&(d(null),e({type:"CREATE_WORKOUT",payload:o}));case 13:case"end":return r.stop()}}),r)})));return function(e){return r.apply(this,arguments)}}();return{createWorkout:p,error:u}};function b(e){var t=e.hideForm,r=e.spreadPages,i=e.flipPage,l=e.total,c=e.limit,d=e.getItems,p=x(),b=p.createWorkout,g=p.error,k=o.useState({title:"",load:"",reps:""}),v=(0,s.Z)(k,2),j=v[0],w=v[1],Z=o.useState([]),y=(0,s.Z)(Z,2),N=y[0],S=y[1],C=function(){var e=(0,a.Z)((0,n.Z)().mark((function e(a){return(0,n.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a.preventDefault(),e.next=3,b(j);case 3:if(j.title||S((function(e){return["title"].concat((0,m.Z)(e))})),j.reps||S((function(e){return["reps"].concat((0,m.Z)(e))})),j.load||S((function(e){return["load"].concat((0,m.Z)(e))})),!(j.title&&j.reps&&j.load)){e.next=14;break}return t(),e.next=10,d("",0);case 10:r(l,c),i(1),S([]),w({title:"",load:"",reps:""});case 14:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),E=function(e){var t=e.target,r=t.name,n=t.value;w((function(e){return(0,f.Z)((0,f.Z)({},e),{},(0,h.Z)({},r,n))}))};return(0,u.jsx)("div",{className:"form--container",children:(0,u.jsxs)("form",{className:"workout--form","aria-label":"workout form",onSubmit:C,children:[(0,u.jsx)("button",{"aria-label":"close form",className:"close material-symbols-outlined",onClick:t,children:"close"}),(0,u.jsx)("h4",{children:"New workout"}),(0,u.jsx)("label",{children:"exercise title:"}),(0,u.jsx)("input",{type:"text",name:"title",id:"title",placeholder:"ex: bench press","aria-label":"workout title",onChange:E,value:j.title,className:N.includes("title")?"error":""}),(0,u.jsx)("label",{children:"number of reps:"}),(0,u.jsx)("input",{type:"number",name:"reps",id:"reps","aria-label":"number of reps",onChange:E,value:j.reps,className:N.includes("reps")?"error":""}),(0,u.jsx)("label",{children:"load (kg):"}),(0,u.jsx)("input",{type:"number",name:"load",id:"load","aria-label":"load in kg",onChange:E,value:j.load,className:N.includes("load")?"error":""}),(0,u.jsx)("button",{className:"workout--form--btn","aria-label":"submit workout button",children:"Add workout"}),g&&(0,u.jsx)("div",{role:"alert",className:"error",children:g})]})})}var g=r(6666),k=r.n(g);function v(e){var t=e.page,r=e.limit,n=e.flipPage,a=e.total,s=e.pageSpread;function o(e,t){if(e+1===t)return t-3>1&&s.length-t>1?"num--page current dots-left dots-right":s.length-t>1&&t>2?"num--page current dots-right":t-3>1?"num--page current dots-left":"num--page current";if(e+1!==t){if(t>3&&t!==s.length)return"invisible";if(t===s.length&&t<s.length-1)return"num--page dots-left";if(3===t&&s.length>4&&e+1<3)return"num--page dots-right";if(t<=3||t===s.length)return"num--page"}}return(0,u.jsxs)("div",{"aria-label":"pages",className:"page--btn--container",children:[(0,u.jsx)("button",{"aria-label":"previous page",type:"button",className:"prev--page",disabled:t<=0,onClick:function(){return n(-1)},children:(0,u.jsx)("span",{className:"material-symbols-outlined",children:"chevron_left"})}),s.map((function(e){return(0,u.jsx)("button",{"aria-label":"go to page ".concat(e),className:o(t,e),onClick:function(){return n(e)},children:e},k()())})),(0,u.jsx)("button",{"aria-label":"next page",type:"button",className:"next--page",disabled:(t+1)*r>=a,onClick:function(){return n([1])},children:(0,u.jsx)("span",{className:"material-symbols-outlined",children:"chevron_right"})})]})}var j=function(){var e=o.useState(null),t=(0,s.Z)(e,2),r=t[0],i=t[1],u=(0,c.E)().user,d=(0,l.m)().dispatch,p=o.useState(null),h=(0,s.Z)(p,2),f=h[0],m=h[1],x=o.useState(null),b=(0,s.Z)(x,2),g=b[0],k=b[1],v=o.useState(null),j=(0,s.Z)(v,2),w=j[0],Z=j[1],y=function(){var e=(0,a.Z)((0,n.Z)().mark((function e(t,r){var a,s;return(0,n.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(i(!0),u){e.next=5;break}return i(!1),Z("Not authorized"),e.abrupt("return");case 5:return e.next=7,fetch("".concat("http://localhost:6060","/api/workouts/?search=").concat(t,"&p=").concat(r),{headers:{Authorization:"Bearer ".concat(u.token)}});case 7:return a=e.sent,e.next=10,a.json();case 10:s=e.sent,a.ok&&(Z(null),i(!1),m(s.limit),k(s.allUserWorkoutsByQuery.length),d({type:"SET_WORKOUTS",payload:s.workoutsChunk})),a.ok||(i(!1),Z(s.error));case 13:case"end":return e.stop()}}),e)})));return function(t,r){return e.apply(this,arguments)}}();return{search:y,isLoading:r,limit:f,total:g,error:w}};function w(e){var t=e.handleSearch,r=e.query,n=e.isLoading,a=e.handleSearchChange;return(0,u.jsxs)("form",{"aria-label":"search bar",className:"search--bar",onSubmit:t,children:[(0,u.jsx)("input",{"aria-label":"search input",type:"search",placeholder:"search workouts...",value:r,onChange:a}),(0,u.jsx)("button",{"aria-label":"search button",disabled:n,children:(0,u.jsx)("span",{className:"material-symbols-outlined",children:"search"})})]})}var Z=r(7769);function y(){var e=o.useState(!1),t=(0,s.Z)(e,2),r=t[0],i=t[1],d=(0,l.m)().workouts,h=((0,c.E)().user,j()),f=h.search,m=h.total,x=h.limit,g=h.isLoading,k=o.useState(0),y=(0,s.Z)(k,2),N=y[0],S=y[1],C=o.useState([]),E=(0,s.Z)(C,2),A=E[0],P=E[1],T=o.useState(""),L=(0,s.Z)(T,2),O=L[0],W=L[1];o.useEffect((function(){_(O,N)}),[O,N]),o.useEffect((function(){B(m,x)}),[m,x]);var _=function(){var e=(0,a.Z)((0,n.Z)().mark((function e(t,r){return(0,n.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,f(t,r);case 2:case"end":return e.stop()}}),e)})));return function(t,r){return e.apply(this,arguments)}}(),B=function(e,t){for(var r=Math.ceil(e/t),n=[],a=1;a<=r;++a)n.push(a);P(n)},z=function(e){S((function(t){return-1===e?t+e:e[0]?t+e[0]:e-1}))},D=function(){var e=(0,a.Z)((0,n.Z)().mark((function e(t){return(0,n.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),e.next=3,_(O,N);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return(0,u.jsx)("div",{className:"home--container",onClick:Z.s,children:(0,u.jsxs)("div",{className:"home",children:[(0,u.jsx)(w,{handleSearchChange:function(e){W(e.target.value),S(0)},handleSearch:D,query:O,isLoading:g}),(0,u.jsx)("div",{"aria-label":"workouts",className:"workouts--container",children:d&&d.map((function(e){return(0,u.jsx)(p,{id:e._id,title:e.title,reps:e.reps,load:e.load,createdAt:e.createdAt,updatedAt:e.updatedAt,page:N,getItems:_,spreadPages:B,total:m,limit:x},e._id)}))}),!r&&(0,u.jsx)("button",{"aria-label":"buff it up",className:"add--workout",onClick:function(){return i(!0)},children:"+ Buff It Up"}),(0,u.jsx)(v,{page:N,pageSpread:A,total:m,limit:x,flipPage:z}),r&&(0,u.jsx)(b,{hideForm:function(){i(!1)},getItems:_,spreadPages:B,flipPage:z,total:m,limit:x}),(0,u.jsx)("div",{className:"space"}),(0,u.jsxs)("div",{className:"chart--container",children:[(0,u.jsx)("h3",{children:"Routine Balance"}),(0,u.jsx)("div",{className:"chart"}),(0,u.jsxs)("p",{className:"stats--upper-bod",children:[(0,u.jsx)("span",{})," Upper body - 36%"]}),(0,u.jsxs)("p",{className:"stats--lower-bod",children:[(0,u.jsx)("span",{})," Lower body - 64%"]})]})]})})}}}]);
//# sourceMappingURL=314.d474d988.chunk.js.map