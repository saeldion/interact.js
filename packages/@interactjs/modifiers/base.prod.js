import t from"./Modification.prod.js";export function makeModifier(t,i){const{defaults:e}=t,n={start:t.start,set:t.set,beforeEnd:t.beforeEnd,stop:t.stop},o=t=>{const o=t||{};o.enabled=!1!==o.enabled;for(const t in e)t in o||(o[t]=e[t]);const a={options:o,methods:n,name:i,enable:()=>(o.enabled=!0,a),disable:()=>(o.enabled=!1,a)};return a};return i&&"string"==typeof i&&(o._defaults=e,o._methods=n),o}export function addEventModifiers({iEvent:t,interaction:{modification:{result:i}}}){i&&(t.modifiers=i.eventProps)}const i={id:"modifiers/base",before:["actions"],install(t){t.defaults.perAction.modifiers=[]},listeners:{"interactions:new"({interaction:i}){i.modification=new t(i)},"interactions:before-action-start"(t){const{modification:i}=t.interaction;i.start(t,t.interaction.coords.start.page),t.interaction.edges=i.edges,i.applyToInteraction(t)},"interactions:before-action-move":t=>t.interaction.modification.setAndApply(t),"interactions:before-action-end":t=>t.interaction.modification.beforeEnd(t),"interactions:action-start":addEventModifiers,"interactions:action-move":addEventModifiers,"interactions:action-end":addEventModifiers,"interactions:after-action-start":t=>t.interaction.modification.restoreInteractionCoords(t),"interactions:after-action-move":t=>t.interaction.modification.restoreInteractionCoords(t),"interactions:stop":t=>t.interaction.modification.stop(t)}};export default i;
//# sourceMappingURL=base.prod.js.map