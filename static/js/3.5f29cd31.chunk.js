(this.webpackJsonpdicey=this.webpackJsonpdicey||[]).push([[3],{328:function(e,t,n){"use strict";n.r(t),n.d(t,"initialize",(function(){return fe})),n.d(t,"addTrackers",(function(){return se})),n.d(t,"ga",(function(){return pe})),n.d(t,"set",(function(){return ge})),n.d(t,"send",(function(){return be})),n.d(t,"pageview",(function(){return de})),n.d(t,"modalview",(function(){return ye})),n.d(t,"timing",(function(){return ve})),n.d(t,"event",(function(){return me})),n.d(t,"exception",(function(){return he})),n.d(t,"plugin",(function(){return Oe})),n.d(t,"outboundLink",(function(){return we})),n.d(t,"testModeAPI",(function(){return je})),n.d(t,"OutboundLink",(function(){return ke}));var r={};n.r(r),n.d(r,"addTrackers",(function(){return U})),n.d(r,"initialize",(function(){return Z})),n.d(r,"ga",(function(){return H})),n.d(r,"set",(function(){return Q})),n.d(r,"send",(function(){return W})),n.d(r,"pageview",(function(){return X})),n.d(r,"modalview",(function(){return Y})),n.d(r,"timing",(function(){return ee})),n.d(r,"event",(function(){return te})),n.d(r,"exception",(function(){return ne})),n.d(r,"plugin",(function(){return re})),n.d(r,"outboundLink",(function(){return oe})),n.d(r,"testModeAPI",(function(){return ie})),n.d(r,"default",(function(){return ae}));var o=n(0),i=n.n(o),a=n(6),c=n.n(a);function u(e){console.warn("[react-ga]",e)}function l(e){return l="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"===typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},l(e)}function f(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?f(Object(n),!0).forEach((function(t){O(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):f(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function p(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}function g(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function b(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function d(e,t){return d=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e},d(e,t)}function y(e){var t=function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,r=h(e);if(t){var o=h(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return v(this,n)}}function v(e,t){return!t||"object"!==l(t)&&"function"!==typeof t?m(e):t}function m(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function h(e){return h=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},h(e)}function O(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var w="_blank",j=function(e){!function(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&d(e,t)}(a,e);var t,n,r,o=y(a);function a(){var e;g(this,a);for(var t=arguments.length,n=new Array(t),r=0;r<t;r++)n[r]=arguments[r];return O(m(e=o.call.apply(o,[this].concat(n))),"handleClick",(function(t){var n=e.props,r=n.target,o=n.eventLabel,i=n.to,c=n.onClick,u=n.trackerNames,l={label:o},f=r!==w,s=!(t.ctrlKey||t.shiftKey||t.metaKey||1===t.button);f&&s?(t.preventDefault(),a.trackLink(l,(function(){window.location.href=i}),u)):a.trackLink(l,(function(){}),u),c&&c(t)})),e}return t=a,(n=[{key:"render",value:function(){var e=this.props,t=e.to,n=e.target,r=s(s({},p(e,["to","target"])),{},{target:n,href:t,onClick:this.handleClick});return n===w&&(r.rel="".concat(r.rel?r.rel:""," noopener noreferrer").trim()),delete r.eventLabel,delete r.trackerNames,i.a.createElement("a",r)}}])&&b(t.prototype,n),r&&b(t,r),a}(o.Component);O(j,"trackLink",(function(){u("ga tracking not enabled")})),j.propTypes={eventLabel:c.a.string.isRequired,target:c.a.string,to:c.a.string,onClick:c.a.func,trackerNames:c.a.arrayOf(c.a.string)},j.defaultProps={target:null,to:null,onClick:null,trackerNames:null};function k(e){return"string"===typeof(t=e)&&-1!==t.indexOf("@")?(u("This arg looks like an email address, redacting."),"REDACTED (Potential Email Address)"):e;var t}function P(e){return e&&e.toString().replace(/^\s+|\s+$/g,"")}var A=/^(a|an|and|as|at|but|by|en|for|if|in|nor|of|on|or|per|the|to|vs?\.?|via)$/i;function S(e){return P(e).replace(/[A-Za-z0-9\u00C0-\u00FF]+[^\s-]*/g,(function(e,t,n){return t>0&&t+e.length!==n.length&&e.search(A)>-1&&":"!==n.charAt(t-2)&&("-"!==n.charAt(t+e.length)||"-"===n.charAt(t-1))&&n.charAt(t-1).search(/[^\s-]/)<0?e.toLowerCase():e.substr(1).search(/[A-Z]|\../)>-1?e:e.charAt(0).toUpperCase()+e.substr(1)}))}var E=!1;function D(e){console.info("[react-ga]",e)}var x=[],T={calls:x,ga:function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];x.push([].concat(t))},resetCalls:function(){x.length=0}};function C(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}function N(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function q(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function L(e){return L="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"===typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},L(e)}function I(e){return function(e){if(Array.isArray(e))return _(e)}(e)||function(e){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}(e)||function(e,t){if(!e)return;if("string"===typeof e)return _(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return _(e,t)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function _(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var J="undefined"===typeof window||"undefined"===typeof document,R=!1,z=!0,M=!1,G=!0,F=!0,K=function(){var e;return M?T.ga.apply(T,arguments):!J&&(window.ga?(e=window).ga.apply(e,arguments):u("ReactGA.initialize must be called first or GoogleAnalytics should be loaded manually"))};function V(e){return function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",t=!(arguments.length>2&&void 0!==arguments[2])||arguments[2],n=e||"";return(arguments.length>1?arguments[1]:void 0)&&(n=S(e)),t&&(n=k(n)),n}(e,z,F)}function $(e){for(var t=arguments.length,n=new Array(t>1?t-1:0),r=1;r<t;r++)n[r-1]=arguments[r];var o=n[0];"string"===typeof o?(!G&&Array.isArray(e)||K.apply(void 0,n),Array.isArray(e)&&e.forEach((function(e){K.apply(void 0,I(["".concat(e,".").concat(o)].concat(n.slice(1))))}))):u("ga command must be a string")}function B(e,t){e?t&&(t.debug&&!0===t.debug&&(R=!0),!1===t.titleCase&&(z=!1),!1===t.redactEmail&&(F=!1),t.useExistingGa)||(t&&t.gaOptions?K("create",e,t.gaOptions):K("create",e,"auto")):u("gaTrackingID is required in initialize()")}function U(e,t){return Array.isArray(e)?e.forEach((function(e){"object"===L(e)?B(e.trackingId,e):u("All configs must be an object")})):B(e,t),!0}function Z(e,t){if(t&&!0===t.testMode)M=!0;else{if(J)return;t&&!0===t.standardImplementation||function(e){if(!E){E=!0;var t="https://www.google-analytics.com/analytics.js";e&&e.gaAddress?t=e.gaAddress:e&&e.debug&&(t="https://www.google-analytics.com/analytics_debug.js");var n,r,o,i,a,c,u,l=e&&e.onerror;n=window,r=document,o="script",i=t,a="ga",n.GoogleAnalyticsObject=a,n.ga=n.ga||function(){(n.ga.q=n.ga.q||[]).push(arguments)},n.ga.l=1*new Date,c=r.createElement(o),u=r.getElementsByTagName(o)[0],c.async=1,c.src=i,c.onerror=l,u.parentNode.insertBefore(c,u)}}(t)}G=!t||"boolean"!==typeof t.alwaysSendToDefaultTracker||t.alwaysSendToDefaultTracker,U(e,t)}function H(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return t.length>0&&(K.apply(void 0,t),R&&(D("called ga('arguments');"),D("with arguments: ".concat(JSON.stringify(t))))),window.ga}function Q(e,t){e?"object"===L(e)?(0===Object.keys(e).length&&u("empty `fieldsObject` given to .set()"),$(t,"set",e),R&&(D("called ga('set', fieldsObject);"),D("with fieldsObject: ".concat(JSON.stringify(e))))):u("Expected `fieldsObject` arg to be an Object"):u("`fieldsObject` is required in .set()")}function W(e,t){$(t,"send",e),R&&(D("called ga('send', fieldObject);"),D("with fieldObject: ".concat(JSON.stringify(e))),D("with trackers: ".concat(JSON.stringify(t))))}function X(e,t,n){if(e){var r=P(e);if(""!==r){var o={};if(n&&(o.title=n),$(t,"send",function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?N(Object(n),!0).forEach((function(t){q(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):N(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}({hitType:"pageview",page:r},o)),R){D("called ga('send', 'pageview', path);");var i="";n&&(i=" and title: ".concat(n)),D("with path: ".concat(r).concat(i))}}else u("path cannot be an empty string in .pageview()")}else u("path is required in .pageview()")}function Y(e,t){if(e){var n,r="/"===(n=P(e)).substring(0,1)?n.substring(1):n;if(""!==r){var o="/modal/".concat(r);$(t,"send","pageview",o),R&&(D("called ga('send', 'pageview', path);"),D("with path: ".concat(o)))}else u("modalName cannot be an empty string or a single / in .modalview()")}else u("modalName is required in .modalview(modalName)")}function ee(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.category,n=e.variable,r=e.value,o=e.label,i=arguments.length>1?arguments[1]:void 0;if(t&&n&&"number"===typeof r){var a={hitType:"timing",timingCategory:V(t),timingVar:V(n),timingValue:r};o&&(a.timingLabel=V(o)),W(a,i)}else u("args.category, args.variable AND args.value are required in timing() AND args.value has to be a number")}function te(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.category,n=e.action,r=e.label,o=e.value,i=e.nonInteraction,a=e.transport,c=C(e,["category","action","label","value","nonInteraction","transport"]),l=arguments.length>1?arguments[1]:void 0;if(t&&n){var f={hitType:"event",eventCategory:V(t),eventAction:V(n)};r&&(f.eventLabel=V(r)),"undefined"!==typeof o&&("number"!==typeof o?u("Expected `args.value` arg to be a Number."):f.eventValue=o),"undefined"!==typeof i&&("boolean"!==typeof i?u("`args.nonInteraction` must be a boolean."):f.nonInteraction=i),"undefined"!==typeof a&&("string"!==typeof a?u("`args.transport` must be a string."):(-1===["beacon","xhr","image"].indexOf(a)&&u("`args.transport` must be either one of these values: `beacon`, `xhr` or `image`"),f.transport=a)),Object.keys(c).filter((function(e){return"dimension"===e.substr(0,"dimension".length)})).forEach((function(e){f[e]=c[e]})),Object.keys(c).filter((function(e){return"metric"===e.substr(0,"metric".length)})).forEach((function(e){f[e]=c[e]})),W(f,l)}else u("args.category AND args.action are required in event()")}function ne(e,t){var n=e.description,r=e.fatal,o={hitType:"exception"};n&&(o.exDescription=V(n)),"undefined"!==typeof r&&("boolean"!==typeof r?u("`args.fatal` must be a boolean."):o.exFatal=r),W(o,t)}var re={require:function(e,t,n){if(e){var r=P(e);if(""!==r){var o=n?"".concat(n,".require"):"require";if(t){if("object"!==L(t))return void u("Expected `options` arg to be an Object");0===Object.keys(t).length&&u("Empty `options` given to .require()"),H(o,r,t),R&&D("called ga('require', '".concat(r,"', ").concat(JSON.stringify(t)))}else H(o,r),R&&D("called ga('require', '".concat(r,"');"))}else u("`name` cannot be an empty string in .require()")}else u("`name` is required in .require()")},execute:function(e,t){for(var n,r,o=arguments.length,i=new Array(o>2?o-2:0),a=2;a<o;a++)i[a-2]=arguments[a];if(1===i.length?n=i[0]:(r=i[0],n=i[1]),"string"!==typeof e)u("Expected `pluginName` arg to be a String.");else if("string"!==typeof t)u("Expected `action` arg to be a String.");else{var c="".concat(e,":").concat(t);n=n||null,r&&n?(H(c,r,n),R&&(D("called ga('".concat(c,"');")),D('actionType: "'.concat(r,'" with payload: ').concat(JSON.stringify(n))))):n?(H(c,n),R&&(D("called ga('".concat(c,"');")),D("with payload: ".concat(JSON.stringify(n))))):(H(c),R&&D("called ga('".concat(c,"');")))}}};function oe(e,t,n){if("function"===typeof t)if(e&&e.label){var r={hitType:"event",eventCategory:"Outbound",eventAction:"Click",eventLabel:V(e.label)},o=!1,i=setTimeout((function(){o=!0,t()}),250);r.hitCallback=function(){clearTimeout(i),o||t()},W(r,n)}else u("args.label is required in outboundLink()");else u("hitCallback function is required")}var ie=T,ae={initialize:Z,ga:H,set:Q,send:W,pageview:X,modalview:Y,timing:ee,event:te,exception:ne,plugin:re,outboundLink:oe,testModeAPI:T};function ce(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function ue(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?ce(Object(n),!0).forEach((function(t){le(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):ce(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function le(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var fe=Z,se=U,pe=H,ge=Q,be=W,de=X,ye=Y,ve=ee,me=te,he=ne,Oe=re,we=oe,je=ie;j.origTrackLink=j.trackLink,j.trackLink=oe;var ke=j;t.default=ue(ue({},r),{},{OutboundLink:ke})}}]);
//# sourceMappingURL=3.5f29cd31.chunk.js.map