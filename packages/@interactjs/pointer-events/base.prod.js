import{Interaction as t}from"../core/Interaction.prod.js";import{Scope as e}from"../core/scope.prod.js";import*as n from"../utils/domUtils.prod.js";import o from"../utils/extend.prod.js";import r from"../utils/getOriginXY.prod.js";import{PointerEvent as i}from"./PointerEvent.prod.js";const a={id:"pointer-events/base",before:["inertia","modifiers","auto-start","actions"],install(t){t.pointerEvents=a,t.defaults.actions.pointerEvents=a.defaults,o(t.actions.phaselessTypes,a.types)},listeners:{"interactions:new"({interaction:t}){t.prevTap=null,t.tapTime=0},"interactions:update-pointer"({down:t,pointerInfo:e}){!t&&e.hold||(e.hold={duration:1/0,timeout:null})},"interactions:move"(t,e){const{interaction:n,pointer:o,event:r,eventTarget:i,duplicate:a}=t;a||n.pointerIsDown&&!n.pointerWasMoved||(n.pointerIsDown&&l(t),p({interaction:n,pointer:o,event:r,eventTarget:i,type:"move"},e))},"interactions:down"(t,e){(({interaction:t,pointer:e,event:o,eventTarget:r,pointerIndex:i},a)=>{const s=t.pointers[i].hold,l=n.getPath(r),c={interaction:t,pointer:e,event:o,eventTarget:r,type:"hold",targets:[],path:l,node:null};for(const t of l)c.node=t,a.fire("pointerEvents:collect-targets",c);if(!c.targets.length)return;let d=1/0;for(const t of c.targets){const e=t.eventable.options.holdDuration;e<d&&(d=e)}s.duration=d,s.timeout=setTimeout(()=>{p({interaction:t,eventTarget:r,pointer:e,event:o,type:"hold"},a)},d)})(t,e),p(t,e)},"interactions:up"(t,e){l(t),p(t,e),(({interaction:t,pointer:e,event:n,eventTarget:o},r)=>{t.pointerWasMoved||p({interaction:t,eventTarget:o,pointer:e,event:n,type:"tap"},r)})(t,e)},"interactions:cancel"(t,e){l(t),p(t,e)}},PointerEvent:i,fire:p,collectEventTargets:s,defaults:{holdDuration:600,ignoreFrom:null,allowFrom:null,origin:{x:0,y:0}},types:{down:!0,move:!0,up:!0,cancel:!0,tap:!0,doubletap:!0,hold:!0}};function p(t,e){const{interaction:n,pointer:o,event:a,eventTarget:l,type:c,targets:d=s(t,e)}=t,v=new i(c,o,a,l,n,e.now());e.fire("pointerEvents:new",{pointerEvent:v});const u={interaction:n,pointer:o,event:a,eventTarget:l,targets:d,type:c,pointerEvent:v};for(let t=0;t<d.length;t++){const e=d[t];for(const t in e.props||{})v[t]=e.props[t];const n=r(e.eventable,e.node);if(v._subtractOrigin(n),v.eventable=e.eventable,v.currentTarget=e.node,e.eventable.fire(v),v._addOrigin(n),v.immediatePropagationStopped||v.propagationStopped&&t+1<d.length&&d[t+1].node!==v.currentTarget)break}if(e.fire("pointerEvents:fired",u),"tap"===c){const t=v.double?p({interaction:n,pointer:o,event:a,eventTarget:l,type:"doubletap"},e):v;n.prevTap=t,n.tapTime=t.timeStamp}return v}function s({interaction:t,pointer:e,event:o,eventTarget:r,type:i},a){const p=t.getPointerIndex(e),s=t.pointers[p];if("tap"===i&&(t.pointerWasMoved||!s||s.downTarget!==r))return[];const l=n.getPath(r),c={interaction:t,pointer:e,event:o,eventTarget:r,type:i,path:l,targets:[],node:null};for(const t of l)c.node=t,a.fire("pointerEvents:collect-targets",c);return"hold"===i&&(c.targets=c.targets.filter(e=>e.eventable.options.holdDuration===t.pointers[p].hold.duration)),c.targets}function l({interaction:t,pointerIndex:e}){const n=t.pointers[e].hold;n&&n.timeout&&(clearTimeout(n.timeout),n.timeout=null)}export default a;
//# sourceMappingURL=base.prod.js.map