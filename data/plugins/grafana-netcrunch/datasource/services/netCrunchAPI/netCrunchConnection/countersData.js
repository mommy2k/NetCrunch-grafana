'use strict';System.register(['../adrem/module','./sessionCache'],function(_export,_context){'use strict';var NetCrunchCounters,NETCRUNCH_COUNTER_CONST,NetCrunchSessionCache;/**
 * @license
 * Copyright AdRem Software. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0 that can be
 * found in the LICENSE file.
 *//* eslint-disable no-shadow, no-param-reassign, object-shorthand, func-names */function NetCrunchCountersData(a,b){function c(v,w){m.addToCache(i,v,w)}function d(v){return m.getFromCache(i,v)}function e(v,w){m.addToCache(j,v,w)}function f(v){return m.getFromCache(j,v)}function g(v){m.addToCache(k,k,v)}function h(){return m.getFromCache(k,k)}var i='counters',j='countersPath',k='monitors',l=new NetCrunchCounters(a,b),m=new NetCrunchSessionCache,n=null,o=void 0,p=void 0,q=new Promise(function(v,w){o=v,p=w}),r=null,s=void 0,t=void 0,u=new Promise(function(v,w){s=v,t=w});return m.addSection(i),m.addSection(j),m.addSection(k),{prepareCountersForMonitors:function prepareCountersForMonitors(v){function x(E,F){return C.convertCounterPathToDisplay(E[1],F).then(function(G){// eslint-disable-line
return{name:E[1],displayName:G}})}function y(E,F){return E.displayName<F.displayName?-1:E.displayName>F.displayName?1:E.displayName===F.displayName?0:0}function z(E){return Object.keys(E).forEach(function(F){E[F].counters.sort(y)}),E}function A(E,F){return C.getMonitors(F).then(function(G){return Object.keys(E).forEach(function(H){null!=G[H]&&(E[H].name=G[H].counterGroup)}),E})}var w=1<arguments.length&&void 0!==arguments[1]?arguments[1]:!0,B=[],C=this,D=Object.create(null);return v.forEach(function(E){null==D[E[0]]&&(D[E[0]]=Object.create(null),D[E[0]].counters=[]),D[E[0]].counters.push(x(E,w))}),Object.keys(D).forEach(function(E){B.push(Promise.all(D[E].counters).then(function(F){D[E].counters=F}))}),Promise.all(B).then(function(){return D=z(D),A(D,w)})},getCounters:function getCounters(v){var w=1<arguments.length&&void 0!==arguments[1]?arguments[1]:!0,x=w?d(v):null;return null==x&&(null==n&&(n=new a.NetCrunch.TrendDB('ncSrv','',function(y){!0===y?o():p()},b)),x=q.then(function(){return new Promise(function(y){n.getCounters({machineId:v},function(z){z=z.map(function(A){return A.split('=')}),y(z)})})}),c(v,x)),x},convertCounterPathToDisplay:function convertCounterPathToDisplay(v){var w=1<arguments.length&&void 0!==arguments[1]?arguments[1]:!0,x=l.parseCounterPath(v),y=void 0,z=void 0;return z=w?f(v):null,null==z&&(!0===l.isMIBCnt(x.obj,x.cnt)?(y=l.counterPathObject(v,NETCRUNCH_COUNTER_CONST.CNT_TYPE.cstMIB),z=l.counterPathToDisplayStr(y,!0,!0)):z=l.counterPathToDisplayStr(v,!0,!0),e(v,z)),z},getMonitors:function getMonitors(){var v=0<arguments.length&&void 0!==arguments[0]?arguments[0]:!0,w=v?h():null;return null==w&&(null==r&&(r=new a.NetCrunch.MonitorMgrIntf('ncSrv',function(x){!0===x?s():t()},b)),w=u.then(function(){return new Promise(function(x){r.getMonitorsInfo({},function(y){var z=Object.create(null);y.forEach(function(A){z[A.monitorId]=A}),x(z)})})}),g(w)),w},getCountersForMonitors:function getCountersForMonitors(v,w){var _this=this;function x(y){var z=[];return Object.keys(y).forEach(function(A){0<A&&(z=z.concat(y[A].counters))}),z}return this.getCounters(v,w).then(function(y){return _this.prepareCountersForMonitors(y,w)}).then(function(y){return y.table=x(y),y})},findCounterByName:function findCounterByName(v,w){var x=null;return v.table.some(function(y){return y.name===w&&(x=y,!0)}),x}}}return{setters:[function(_adremModule){NetCrunchCounters=_adremModule.NetCrunchCounters;NETCRUNCH_COUNTER_CONST=_adremModule.NETCRUNCH_COUNTER_CONST},function(_sessionCache){NetCrunchSessionCache=_sessionCache.NetCrunchSessionCache}],execute:function(){_export('NetCrunchCountersData',NetCrunchCountersData)}}});
//# sourceMappingURL=countersData.js.map