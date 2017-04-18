'use strict';System.register([],function(_export,_context){'use strict';var C_PERSEC,CNT_SEPARATOR,CNT_SRC_SEPARATOR,MIB_CNT_SRC_ID,XML_CNT_SRC_ID,OVERALL_TOTAL,OVERALL_MAXIMUM,OVERALL_MINIMUM,OVERALL_AVERAGE,OVERALL_COUNT,knownMSCounters,NETCRUNCH_COUNTER_CONST,NETCRUNCH_COUNTER_TYPES;function NetCrunchCounters(a,b){var _this=this;function d(N){return 0<=N.indexOf(C_PERSEC)&&(N=N.replace(C_PERSEC,'')),null!=N.match(/^((([0-9]+)\.)+[0-9]+)$/)}function e(N){return N===MIB_CNT_SRC_ID?M.CNT_TYPE.cstMIB:M.CNT_TYPE.cstXML}function f(N){var O=M.CNT_TYPE.cstSimple;return 0<N.indexOf(CNT_SRC_SEPARATOR)&&(O=e(N.split(CNT_SRC_SEPARATOR)[0])),O}function g(N){var O=N;return 0<N.indexOf(CNT_SRC_SEPARATOR)&&(O=N.split(CNT_SRC_SEPARATOR)[1]),O}function h(N){var O=void 0,P=void 0,Q=void 0;return 0>N.indexOf(CNT_SRC_SEPARATOR)?(O=M.CNT_TYPE.cstXML,P=N):(Q=N.split(CNT_SRC_SEPARATOR),O=e(Q[0]),P=Q[1]),{type:O,value:P}}function j(N){var O={},P=M.SNMP_FUNC.scfUnknown;return O[OVERALL_TOTAL]=M.SNMP_FUNC.scfSum,O[OVERALL_AVERAGE]=M.SNMP_FUNC.scfAvg,O[OVERALL_MAXIMUM]=M.SNMP_FUNC.scfMax,O[OVERALL_MINIMUM]=M.SNMP_FUNC.scfMin,O[OVERALL_COUNT]=M.SNMP_FUNC.scfCount,null!=O[N]&&(P=O[N]),P}function k(N){// eslint-disable-next-line
return u(N)}function l(N){var O=k(N),P=O.obj,Q=O.cnt,R=O.inst,S=void 0,T=0<=Q.indexOf(C_PERSEC),//eslint-disable-line
U=void 0;return!0==T&&(Q=Q.replace(C_PERSEC,'')),''===R||'-'===R?(U=Q.match(/(.*)\.([0-9]+)$/),1<U.length&&(Q=U[1],R=U[2]),S='0'===R?M.SNMP_INSTANCE_TYPE.sitNone:M.SNMP_INSTANCE_TYPE.sitByIndex):'#'===R.charAt(0)?(R=R.substr(1),S=M.SNMP_INSTANCE_TYPE.sitByIndex):'_'===R.charAt(0)&&j(R)!==M.SNMP_FUNC.scfUnknown?S=M.SNMP_INSTANCE_TYPE.sitComputable:S=M.SNMP_INSTANCE_TYPE.sitByLookup,{objOID:Q,instOID:P,inst:R,isPerSec:T,type:S}}function n(N,O){var P=k(N),Q=P.inst,R=void 0;return!0===O&&(R=M.SNMP_INSTANCE_TYPE.sitByLookup,''===Q?''===Q||'-'===Q?R=M.SNMP_INSTANCE_TYPE.sitNone:R=M.SNMP_INSTANCE_TYPE.sitByLookup:'#'===Q.charAt(0)?(Q=Q.substr(1),R=M.SNMP_INSTANCE_TYPE.sitByIndex):'_'===Q.charAt(0)&&(R=M.SNMP_INSTANCE_TYPE.sitComputable),P.inst=Q,P.type=R),P}function o(N,O,P){var Q=!1;return new Promise(function(R){null==O[N]?(O[N]=N,Q=!0):O[N]===N&&(Q=!0),!0==Q?P({oid:N},function(S){O[N]=S,R(S)}):R(O[N])})}function q(){null==H&&(H=new a.NetCrunch.SnmpMibData('ncSrv',function(){},b))}function r(N){return q(),o(N,I,H.getShortOidPath)}function t(N){return q(),o(N,J,H.getFullOidPath)}function u(N){var O=N.split(CNT_SEPARATOR),P={};return P.obj=O[0],P.cnt=1<O.length?O[1]:'',P.inst=3===O.length?O[2]:3<O.length?O.slice(2).join(CNT_SEPARATOR):'',P}function w(N,O){var P=N.obj,Q=void 0;return O=null==O||O,''!==N.inst&&null!=N.inst&&(P=N.obj+'('+N.inst+')'),''!==N.cnt&&null!=N.cnt&&(!O&&N.perSec?(Q=N.cnt.indexOf(C_PERSEC),P=P+'\\'+N.cnt.substr(0,Q)):P=P+'\\'+N.cnt),P}function x(N){var O=u(N);return w(O,!0)}function y(N,O,P){return''===P?N+CNT_SEPARATOR+O:N+CNT_SEPARATOR+O+CNT_SEPARATOR+P}function z(N,O,P){var Q=h(N),R=void 0,S=Promise.resolve(null);if(Q.type===M.CNT_TYPE.cstXML)S=Promise.resolve(x(Q.value));else if(Q.type===M.CNT_TYPE.cstMIB)return R=l(N),S=!0===O?r(R.objOID):t(R.objOID),S.then(function(T){return(null==T||''===T)&&(T=R.objOID),'0'===R.inst&&(R.inst=''),T=x(y(T,'',R.inst)),!0===P&&!0===R.isPerSec&&(T+=C_PERSEC),T});return S}function A(N){return 0<=knownMSCounters.indexOf(N.toLowerCase())}/**
   * isMillisecondsCounter(
   * @param counter
   * @returns {boolean}
   */function B(N){var O=u(N);return'Round Trip Time'===O.cnt||'Check Time'===O.cnt||0<=O.cnt.toUpperCase().indexOf('MILLISECOND')||A(O.cnt)}function C(N,O){return 0<=N.indexOf(O)}/**
   * isBytesCounter
   * @param displayName
   * @returns {null|''|'M'|'K'}
   */function D(N){var O=N.toLowerCase(),P='';return C(O,K.metrics.bytes)||C(O,K.metrics.memory)||C(O,'octet')?(C(O,K.metrics.mbytes)||C(O,'mega')?P='M':(C(O,K.metrics.kbytes)||C(O,'kilo'))&&(P='K'),P):null}function E(N,O,P){var Q=3<arguments.length&&void 0!==arguments[3]?arguments[3]:['K','M','G'],R='';return N>=1*O&&N<O*P?(N/=O,R=Q[0]):N>=O*P&&N<O*P*P?(N=N/O/P,R=Q[1]):N>=O*P*P&&(N=N/O/P/P,R=Q[2]),{value:N,units:R}}function F(N,O){return E(N,O,O)}function G(N){return E(N,1e3,60,['sec','min','hrs'])}var H=null,I=Object.create(null),J=Object.create(null),K=Object.create(null),L=NETCRUNCH_COUNTER_TYPES,M=NETCRUNCH_COUNTER_CONST;return{unitsToMetric:function unitsToMetric(N,O,P){if('bytestobps'===N)return'bps';return'percentage'===N?'%':'bytesps'===N?'Bps':'bytes'===N?'bytes':_this.getMetric(O,P)},/**
     * Get Metric for Counter
     * @param counterPath
     * @param displayName
     * @returns {*}
     */getMetric:function getMetric(N,O){var P=void 0;if(C(O,'%'))return L.percentage;return B(N)?L.milliseconds:(P=D(O),null===P?'':(''!==P&&(P='\'#'+P),C(O,C_PERSEC)||C(O,'per sec.')?L.bytesBitsPS+P:L.bytes+P))},getDisplayValue:function getDisplayValue(N,O){var P=O.split('#'),Q=P[0],R=1<P.length?P[1]:'',S=Q===L.bytesBitsPS,T=Q===L.bytes||S||Q===L.bytesBps,U=Q===L.milliseconds,V=void 0;return null==N||isNaN(N)?{value:N,units:''}:(S&&(N*=8),''!==R)?{value:Math.round(100*N)/100,units:R+(T?'B':'')}:(T?(V=F(N,1024),V.units+=Q===L.bytes?'B':Q):''===Q?V=F(N,1e3):U?(V=G(N),''===V.units&&(V.units=L.milliseconds)):V={value:N,units:Q},{value:V.value,units:V.units})},isOid:d,isMIBCnt:function isMIBCnt(O,P){return!0===d(O)&&(''===P||!0===d(P))||''===O&&!0===d(P)},counterPathObject:function counterPathObject(O,P){if(P!==M.CNT_TYPE.cstSimple){if(P===M.CNT_TYPE.cstXML)return XML_CNT_SRC_ID+CNT_SRC_SEPARATOR+O;if(P===M.CNT_TYPE.cstMIB)return MIB_CNT_SRC_ID+CNT_SRC_SEPARATOR+O}return O},stringToCntType:e,getCounterPathType:f,removeCounterPathType:g,removePerSecond:function removePerSecond(O){return O.replace(C_PERSEC,'')},parseSNMPPath:h,parseOIDPath:l,parseXMLPath:n,parseCounterPath:function parseCounterPath(O){var P=f(O),Q=void 0;return P===M.CNT_TYPE.cstXML?Q=n(O,!0):P===M.CNT_TYPE.cstMIB?(Q=l(g(O)),Q.obj=Q.objOID,Q.cnt='',''===Q.inst&&(Q.inst=Q.instOID)):P===M.CNT_TYPE.cstSimple&&(Q=k(O)),Q},getShortOidPath:r,getFullOidPath:t,decodePath:u,encodePath:function encodePath(O){var P=[O.obj,O.cnt];return''!==O.inst&&P.push(O.inst),P.join(CNT_SEPARATOR)},addInstance:function addInstance(N,O){return''===O?N:N+CNT_SEPARATOR+O},decodeDisplayPath:function decodeDisplayPath(O){var P={obj:'',cnt:'',inst:''},Q=O.indexOf(C_PERSEC),R=0<=Q,S=void 0;return R&&(O=O.substr(0,Q)),[{fmt:/(.+)\((.+)\)\\(.+)/,parts:['obj','inst','cnt']},// obj(inst)\cnt
{fmt:/(.+)\((.+)\)/,parts:['obj','inst']},// obj(inst)
{fmt:/(.+)\\(.+)/,parts:['obj','cnt']}// obj\cnt
].some(function(T){//eslint-disable-line
var U=O.match(T.fmt);return null!=U&&(T.parts.forEach(function(V,W){P[V]=U[W+1]}),!0)})||(P.obj=O),''===P.cnt&&''!==P.obj&&(P.obj.match('^[0-9\\.]+(\\.[0-9]+)$')?(P.cnt='',''!==P.inst&&(P.obj=P.obj+'.'+P.inst,P.inst='')):0<=P.obj.indexOf('.')?(S=P.obj.split('.'),P.cnt=S[1],P.obj=S[0]):(P.cnt=P.obj,P.obj='')),P.perSec=R,R&&(P.cnt+=C_PERSEC),P},encodeDisplayPath:w,removePerSec:function removePerSec(O){var P=O.indexOf(C_PERSEC);// todo: check if ix == displayName.length - C_PERSEC.length
return O.substr(0,P)},getSNMPDisplayPath:z,counterPathToDisplayStr:function counterPathToDisplayStr(O,P,Q){var R=f(O);return R===M.CNT_TYPE.cstXML||R===M.CNT_TYPE.cstMIB?z(O,P,Q):Promise.resolve(x(O))}}}return{setters:[],execute:function(){C_PERSEC='/sec';CNT_SEPARATOR='|';CNT_SRC_SEPARATOR='&';MIB_CNT_SRC_ID='MIB';XML_CNT_SRC_ID='XML';OVERALL_TOTAL='_Total';OVERALL_MAXIMUM='_Maximum';OVERALL_MINIMUM='_Minimum';OVERALL_AVERAGE='_Average';OVERALL_COUNT='_Count';knownMSCounters=['load time','check time','round trip time'];_export('NETCRUNCH_COUNTER_CONST',NETCRUNCH_COUNTER_CONST={CNT_TYPE:{cstXML:1,cstMIB:2,cstSimple:3},SNMP_INSTANCE_TYPE:{sitValue:1,sitNone:2,sitByIndex:3,sitByLookup:4,sitComputable:5},SNMP_FUNC:{scfUnknown:1,scfSum:2,scfMin:3,scfMax:4,scfAvg:5,scfCount:6}});_export('NETCRUNCH_COUNTER_TYPES',NETCRUNCH_COUNTER_TYPES={percentage:'%',milliseconds:'ms',bytesBitsPS:'bps',bytesBps:'Bps',bytes:'bytes'});_export('NETCRUNCH_COUNTER_CONST',NETCRUNCH_COUNTER_CONST);_export('NETCRUNCH_COUNTER_TYPES',NETCRUNCH_COUNTER_TYPES);_export('NetCrunchCounters',NetCrunchCounters)}}});
//# sourceMappingURL=counters.js.map