(function dartProgram(){function copyProperties(a,b){var s=Object.keys(a)
for(var r=0;r<s.length;r++){var q=s[r]
b[q]=a[q]}}function mixinPropertiesHard(a,b){var s=Object.keys(a)
for(var r=0;r<s.length;r++){var q=s[r]
if(!b.hasOwnProperty(q)){b[q]=a[q]}}}function mixinPropertiesEasy(a,b){Object.assign(b,a)}var z=function(){var s=function(){}
s.prototype={p:{}}
var r=new s()
if(!(Object.getPrototypeOf(r)&&Object.getPrototypeOf(r).p===s.prototype.p))return false
try{if(typeof navigator!="undefined"&&typeof navigator.userAgent=="string"&&navigator.userAgent.indexOf("Chrome/")>=0)return true
if(typeof version=="function"&&version.length==0){var q=version()
if(/^\d+\.\d+\.\d+\.\d+$/.test(q))return true}}catch(p){}return false}()
function inherit(a,b){a.prototype.constructor=a
a.prototype["$i"+a.name]=a
if(b!=null){if(z){Object.setPrototypeOf(a.prototype,b.prototype)
return}var s=Object.create(b.prototype)
copyProperties(a.prototype,s)
a.prototype=s}}function inheritMany(a,b){for(var s=0;s<b.length;s++){inherit(b[s],a)}}function mixinEasy(a,b){mixinPropertiesEasy(b.prototype,a.prototype)
a.prototype.constructor=a}function mixinHard(a,b){mixinPropertiesHard(b.prototype,a.prototype)
a.prototype.constructor=a}function lazy(a,b,c,d){var s=a
a[b]=s
a[c]=function(){if(a[b]===s){a[b]=d()}a[c]=function(){return this[b]}
return a[b]}}function lazyFinal(a,b,c,d){var s=a
a[b]=s
a[c]=function(){if(a[b]===s){var r=d()
if(a[b]!==s){A.iX(b)}a[b]=r}var q=a[b]
a[c]=function(){return q}
return q}}function makeConstList(a,b){if(b!=null)A.a(a,b)
a.$flags=7
return a}function convertToFastObject(a){function t(){}t.prototype=a
new t()
return a}function convertAllToFastObject(a){for(var s=0;s<a.length;++s){convertToFastObject(a[s])}}var y=0
function instanceTearOffGetter(a,b){var s=null
return a?function(c){if(s===null)s=A.ek(b)
return new s(c,this)}:function(){if(s===null)s=A.ek(b)
return new s(this,null)}}function staticTearOffGetter(a){var s=null
return function(){if(s===null)s=A.ek(a).prototype
return s}}var x=0
function tearOffParameters(a,b,c,d,e,f,g,h,i,j){if(typeof h=="number"){h+=x}return{co:a,iS:b,iI:c,rC:d,dV:e,cs:f,fs:g,fT:h,aI:i||0,nDA:j}}function installStaticTearOff(a,b,c,d,e,f,g,h){var s=tearOffParameters(a,true,false,c,d,e,f,g,h,false)
var r=staticTearOffGetter(s)
a[b]=r}function installInstanceTearOff(a,b,c,d,e,f,g,h,i,j){c=!!c
var s=tearOffParameters(a,false,c,d,e,f,g,h,i,!!j)
var r=instanceTearOffGetter(c,s)
a[b]=r}function setOrUpdateInterceptorsByTag(a){var s=v.interceptorsByTag
if(!s){v.interceptorsByTag=a
return}copyProperties(a,s)}function setOrUpdateLeafTags(a){var s=v.leafTags
if(!s){v.leafTags=a
return}copyProperties(a,s)}function updateTypes(a){var s=v.types
var r=s.length
s.push.apply(s,a)
return r}function updateHolder(a,b){copyProperties(b,a)
return a}var hunkHelpers=function(){var s=function(a,b,c,d,e){return function(f,g,h,i){return installInstanceTearOff(f,g,a,b,c,d,[h],i,e,false)}},r=function(a,b,c,d){return function(e,f,g,h){return installStaticTearOff(e,f,a,b,c,[g],h,d)}}
return{inherit:inherit,inheritMany:inheritMany,mixin:mixinEasy,mixinHard:mixinHard,installStaticTearOff:installStaticTearOff,installInstanceTearOff:installInstanceTearOff,_instance_0u:s(0,0,null,["$0"],0),_instance_1u:s(0,1,null,["$1"],0),_instance_2u:s(0,2,null,["$2"],0),_instance_0i:s(1,0,null,["$0"],0),_instance_1i:s(1,1,null,["$1"],0),_instance_2i:s(1,2,null,["$2"],0),_static_0:r(0,null,["$0"],0),_static_1:r(1,null,["$1"],0),_static_2:r(2,null,["$2"],0),makeConstList:makeConstList,lazy:lazy,lazyFinal:lazyFinal,updateHolder:updateHolder,convertToFastObject:convertToFastObject,updateTypes:updateTypes,setOrUpdateInterceptorsByTag:setOrUpdateInterceptorsByTag,setOrUpdateLeafTags:setOrUpdateLeafTags}}()
function initializeDeferredHunk(a){x=v.types.length
a(hunkHelpers,v,w,$)}var J={
fZ(a,b){if(a<0||a>4294967295)throw A.c(A.aX(a,0,4294967295,"length",null))
return J.h0(new Array(a),b)},
h_(a,b){if(a<0)throw A.c(A.bo("Length must be a non-negative integer: "+a))
return A.a(new Array(a),b.i("h<0>"))},
eF(a,b){if(a<0)throw A.c(A.bo("Length must be a non-negative integer: "+a))
return A.a(new Array(a),b.i("h<0>"))},
h0(a,b){var s=A.a(a,b.i("h<0>"))
s.$flags=1
return s},
h1(a,b){return J.bm(a,b)},
eG(a){if(a<256)switch(a){case 9:case 10:case 11:case 12:case 13:case 32:case 133:case 160:return!0
default:return!1}switch(a){case 5760:case 8192:case 8193:case 8194:case 8195:case 8196:case 8197:case 8198:case 8199:case 8200:case 8201:case 8202:case 8232:case 8233:case 8239:case 8287:case 12288:case 65279:return!0
default:return!1}},
h2(a,b){var s,r
for(s=a.length;b<s;){r=a.charCodeAt(b)
if(r!==32&&r!==13&&!J.eG(r))break;++b}return b},
h3(a,b){var s,r
for(;b>0;b=s){s=b-1
r=a.charCodeAt(s)
if(r!==32&&r!==13&&!J.eG(r))break}return b},
as(a){if(typeof a=="number"){if(Math.floor(a)==a)return J.az.prototype
return J.aQ.prototype}if(typeof a=="string")return J.aj.prototype
if(a==null)return J.aP.prototype
if(typeof a=="boolean")return J.bC.prototype
if(Array.isArray(a))return J.h.prototype
if(typeof a=="function")return J.aR.prototype
if(typeof a=="object"){if(a instanceof A.l){return a}else{return J.aC.prototype}}if(!(a instanceof A.l))return J.a7.prototype
return a},
w(a){if(a==null)return a
if(Array.isArray(a))return J.h.prototype
if(!(a instanceof A.l))return J.a7.prototype
return a},
L(a){if(typeof a=="string")return J.aj.prototype
if(a==null)return a
if(Array.isArray(a))return J.h.prototype
if(!(a instanceof A.l))return J.a7.prototype
return a},
iF(a){if(typeof a=="number"){if(Math.floor(a)==a)return J.az.prototype
return J.aQ.prototype}if(a==null)return a
if(!(a instanceof A.l))return J.a7.prototype
return a},
iG(a){if(typeof a=="number")return J.aA.prototype
if(typeof a=="string")return J.aj.prototype
if(a==null)return a
if(!(a instanceof A.l))return J.a7.prototype
return a},
y(a,b){if(a==null)return b==null
if(typeof a!="object")return b!=null&&a===b
return J.as(a).K(a,b)},
er(a,b){if(typeof b==="number")if(Array.isArray(a)||typeof a=="string")if(b>>>0===b&&b<a.length)return a[b]
return J.L(a).h(a,b)},
fI(a,b,c){if(typeof b==="number")if(Array.isArray(a)&&!(a.$flags&2)&&b>>>0===b&&b<a.length)return a[b]=c
return J.w(a).k(a,b,c)},
av(a,b){return J.w(a).I(a,b)},
cc(a,b){return J.w(a).a5(a,b)},
bm(a,b){return J.iG(a).B(a,b)},
es(a,b){return J.w(a).u(a,b)},
fJ(a,b){return J.w(a).E(a,b)},
fK(a,b){return J.w(a).am(a,b)},
fL(a,b,c){return J.w(a).A(a,b,c)},
fM(a){return J.w(a).ga6(a)},
O(a){return J.as(a).gv(a)},
et(a){return J.L(a).gq(a)},
eu(a){return J.w(a).gN(a)},
P(a){return J.w(a).gn(a)},
u(a){return J.L(a).gl(a)},
fN(a){return J.as(a).gU(a)},
fO(a){if(typeof a==="number")return a>0?1:a<0?-1:a
return J.iF(a).gaz(a)},
fP(a,b,c){return J.w(a).T(a,b,c)},
fQ(a,b){return J.L(a).sl(a,b)},
ev(a,b){return J.w(a).H(a,b)},
aw(a){return J.as(a).p(a)},
bA:function bA(){},
bC:function bC(){},
aP:function aP(){},
aC:function aC(){},
ab:function ab(){},
cD:function cD(){},
a7:function a7(){},
aR:function aR(){},
h:function h(a){this.$ti=a},
bB:function bB(){},
cq:function cq(a){this.$ti=a},
ay:function ay(a,b,c){var _=this
_.a=a
_.b=b
_.c=0
_.d=null
_.$ti=c},
aA:function aA(){},
az:function az(){},
aQ:function aQ(){},
aj:function aj(){}},A={e3:function e3(){},
eA(a,b,c){if(t.O.b(a))return new A.b7(a,b.i("@<0>").t(c).i("b7<1,2>"))
return new A.af(a,b.i("@<0>").t(c).i("af<1,2>"))},
a4(a,b){a=a+b&536870911
a=a+((a&524287)<<10)&536870911
return a^a>>>6},
cJ(a){a=a+((a&67108863)<<3)&536870911
a^=a>>>11
return a+((a&16383)<<15)&536870911},
eo(a){var s,r
for(s=$.aq.length,r=0;r<s;++r)if(a===$.aq[r])return!0
return!1},
cA(a,b,c,d){if(t.O.b(a))return new A.aN(a,b,c.i("@<0>").t(d).i("aN<1,2>"))
return new A.al(a,b,c.i("@<0>").t(d).i("al<1,2>"))},
ai(){return new A.b0("No element")},
bR(a,b,c,d){if(c-b<=32)A.hd(a,b,c,d)
else A.hc(a,b,c,d)},
hd(a,b,c,d){var s,r,q,p,o,n,m,l
for(s=b+1,r=a.a,q=a.$ti,p=q.c,o=J.L(r),q=q.y[1];s<=c;++s){n=q.a(o.h(r,s))
m=s
for(;;){if(!(m>b&&d.$2(q.a(o.h(r,m-1)),n)>0))break
l=m-1
o.k(r,m,p.a(q.a(o.h(r,l))))
m=l}o.k(r,m,p.a(n))}},
hc(a6,a7,a8,a9){var s,r,q,p,o,n,m,l,k,j,i=B.b.D(a8-a7+1,6),h=a7+i,g=a8-i,f=B.b.D(a7+a8,2),e=f-i,d=f+i,c=a6.a,b=J.L(c),a=a6.$ti,a0=a.y[1],a1=a0.a(b.h(c,h)),a2=a0.a(b.h(c,e)),a3=a0.a(b.h(c,f)),a4=a0.a(b.h(c,d)),a5=a0.a(b.h(c,g))
if(a9.$2(a1,a2)>0){s=a2
a2=a1
a1=s}if(a9.$2(a4,a5)>0){s=a5
a5=a4
a4=s}if(a9.$2(a1,a3)>0){s=a3
a3=a1
a1=s}if(a9.$2(a2,a3)>0){s=a3
a3=a2
a2=s}if(a9.$2(a1,a4)>0){s=a4
a4=a1
a1=s}if(a9.$2(a3,a4)>0){s=a4
a4=a3
a3=s}if(a9.$2(a2,a5)>0){s=a5
a5=a2
a2=s}if(a9.$2(a2,a3)>0){s=a3
a3=a2
a2=s}if(a9.$2(a4,a5)>0){s=a5
a5=a4
a4=s}a=a.c
b.k(c,h,a.a(a1))
b.k(c,f,a.a(a3))
b.k(c,g,a.a(a5))
b.k(c,e,a.a(a0.a(b.h(c,a7))))
b.k(c,d,a.a(a0.a(b.h(c,a8))))
r=a7+1
q=a8-1
p=J.y(a9.$2(a2,a4),0)
if(p)for(o=r;o<=q;++o){n=a0.a(b.h(c,o))
m=a9.$2(n,a2)
if(m===0)continue
if(m<0){if(o!==r){b.k(c,o,a.a(a0.a(b.h(c,r))))
b.k(c,r,a.a(n))}++r}else for(;;){m=a9.$2(a0.a(b.h(c,q)),a2)
if(m>0){--q
continue}else{l=q-1
if(m<0){b.k(c,o,a.a(a0.a(b.h(c,r))))
k=r+1
b.k(c,r,a.a(a0.a(b.h(c,q))))
b.k(c,q,a.a(n))
q=l
r=k
break}else{b.k(c,o,a.a(a0.a(b.h(c,q))))
b.k(c,q,a.a(n))
q=l
break}}}}else for(o=r;o<=q;++o){n=a0.a(b.h(c,o))
if(a9.$2(n,a2)<0){if(o!==r){b.k(c,o,a.a(a0.a(b.h(c,r))))
b.k(c,r,a.a(n))}++r}else if(a9.$2(n,a4)>0)for(;;)if(a9.$2(a0.a(b.h(c,q)),a4)>0){--q
if(q<o)break
continue}else{l=q-1
if(a9.$2(a0.a(b.h(c,q)),a2)<0){b.k(c,o,a.a(a0.a(b.h(c,r))))
k=r+1
b.k(c,r,a.a(a0.a(b.h(c,q))))
b.k(c,q,a.a(n))
r=k}else{b.k(c,o,a.a(a0.a(b.h(c,q))))
b.k(c,q,a.a(n))}q=l
break}}j=r-1
b.k(c,a7,a.a(a0.a(b.h(c,j))))
b.k(c,j,a.a(a2))
j=q+1
b.k(c,a8,a.a(a0.a(b.h(c,j))))
b.k(c,j,a.a(a4))
A.bR(a6,a7,r-2,a9)
A.bR(a6,q+2,a8,a9)
if(p)return
if(r<h&&q>g){while(J.y(a9.$2(a0.a(b.h(c,r)),a2),0))++r
while(J.y(a9.$2(a0.a(b.h(c,q)),a4),0))--q
for(o=r;o<=q;++o){n=a0.a(b.h(c,o))
if(a9.$2(n,a2)===0){if(o!==r){b.k(c,o,a.a(a0.a(b.h(c,r))))
b.k(c,r,a.a(n))}++r}else if(a9.$2(n,a4)===0)for(;;)if(a9.$2(a0.a(b.h(c,q)),a4)===0){--q
if(q<o)break
continue}else{l=q-1
if(a9.$2(a0.a(b.h(c,q)),a2)<0){b.k(c,o,a.a(a0.a(b.h(c,r))))
k=r+1
b.k(c,r,a.a(a0.a(b.h(c,q))))
b.k(c,q,a.a(n))
r=k}else{b.k(c,o,a.a(a0.a(b.h(c,q))))
b.k(c,q,a.a(n))}q=l
break}}A.bR(a6,r,q,a9)}else A.bR(a6,r,q,a9)},
a8:function a8(){},
br:function br(a,b){this.a=a
this.$ti=b},
af:function af(a,b){this.a=a
this.$ti=b},
b7:function b7(a,b){this.a=a
this.$ti=b},
b6:function b6(){},
cN:function cN(a,b){this.a=a
this.b=b},
a_:function a_(a,b){this.a=a
this.$ti=b},
ag:function ag(a,b){this.a=a
this.$ti=b},
cg:function cg(a,b){this.a=a
this.b=b},
cf:function cf(a){this.a=a},
bG:function bG(a){this.a=a},
cH:function cH(){},
p:function p(){},
T:function T(){},
X:function X(a,b,c){var _=this
_.a=a
_.b=b
_.c=0
_.d=null
_.$ti=c},
al:function al(a,b,c){this.a=a
this.b=b
this.$ti=c},
aN:function aN(a,b,c){this.a=a
this.b=b
this.$ti=c},
bK:function bK(a,b,c){var _=this
_.a=null
_.b=a
_.c=b
_.$ti=c},
D:function D(a,b,c){this.a=a
this.b=b
this.$ti=c},
b5:function b5(a,b,c){this.a=a
this.b=b
this.$ti=c},
bW:function bW(a,b){this.a=a
this.b=b},
bg:function bg(){},
fu(a){var s=A.ft(a)
if(s!=null)return s
return"minified:"+a},
o(a){var s
if(typeof a=="string")return a
if(typeof a=="number"){if(a!==0)return""+a}else if(!0===a)return"true"
else if(!1===a)return"false"
else if(a==null)return"null"
s=J.aw(a)
return s},
bL(a){var s,r=$.eK
if(r==null)r=$.eK=Symbol("identityHashCode")
s=a[r]
if(s==null){s=Math.random()*0x3fffffff|0
a[r]=s}return s},
h8(a,b){var s,r=/^\s*[+-]?((0x[a-f0-9]+)|(\d+)|([a-z0-9]+))\s*$/i.exec(a)
if(r==null)return null
s=r[3]
if(s!=null)return parseInt(a,10)
if(r[2]!=null)return parseInt(a,16)
return null},
bM(a){var s,r,q,p
if(a instanceof A.l)return A.Q(A.bj(a),null)
s=J.as(a)
if(s===B.B||s===B.C||t.cr.b(a)){r=B.x(a)
if(r!=="Object"&&r!=="")return r
q=a.constructor
if(typeof q=="function"){p=q.name
if(typeof p=="string"&&p!=="Object"&&p!=="")return p}}return A.Q(A.bj(a),null)},
eL(a){var s,r,q
if(a==null||typeof a=="number"||A.eg(a))return J.aw(a)
if(typeof a=="string")return JSON.stringify(a)
if(a instanceof A.ah)return a.p(0)
if(a instanceof A.b9)return a.aH(!0)
s=$.fH()
for(r=0;r<1;++r){q=s[r].bo(a)
if(q!=null)return q}return"Instance of '"+A.bM(a)+"'"},
I(a){var s
if(a<=65535)return String.fromCharCode(a)
if(a<=1114111){s=a-65536
return String.fromCharCode((B.b.aG(s,10)|55296)>>>0,s&1023|56320)}throw A.c(A.aX(a,0,1114111,null,null))},
fj(a,b){var s,r="index"
if(!A.f7(b))return new A.aa(!0,b,r,null)
s=J.u(a)
if(b<0||b>=s)return A.eE(b,s,a,r)
return new A.aE(null,null,!0,b,r,"Value not in range")},
fh(a){return new A.aa(!0,a,null,null)},
c(a){return A.K(a,new Error())},
K(a,b){var s
if(a==null)a=new A.b3()
b.dartException=a
s=A.iY
if("defineProperty" in Object){Object.defineProperty(b,"message",{get:s})
b.name=""}else b.toString=s
return b},
iY(){return J.aw(this.dartException)},
e1(a,b){throw A.K(a,b==null?new Error():b)},
bl(a,b,c){var s
if(b==null)b=0
if(c==null)c=0
s=Error()
A.e1(A.hO(a,b,c),s)},
hO(a,b,c){var s,r,q,p,o,n,m,l,k
if(typeof b=="string")s=b
else{r="[]=;add;removeWhere;retainWhere;removeRange;setRange;setInt8;setInt16;setInt32;setUint8;setUint16;setUint32;setFloat32;setFloat64".split(";")
q=r.length
p=b
if(p>q){c=p/q|0
p%=q}s=r[p]}o=typeof c=="string"?c:"modify;remove from;add to".split(";")[c]
n=t.j.b(a)?"list":"ByteData"
m=a.$flags|0
l="a "
if((m&4)!==0)k="constant "
else if((m&2)!==0){k="unmodifiable "
l="an "}else k=(m&1)!==0?"fixed-length ":""
return new A.b4("'"+s+"': Cannot "+o+" "+l+k+n)},
i(a){throw A.c(A.v(a))},
a6(a){var s,r,q,p,o,n
a=A.iS(a.replace(String({}),"$receiver$"))
s=a.match(/\\\$[a-zA-Z]+\\\$/g)
if(s==null)s=A.a([],t.s)
r=s.indexOf("\\$arguments\\$")
q=s.indexOf("\\$argumentsExpr\\$")
p=s.indexOf("\\$expr\\$")
o=s.indexOf("\\$method\\$")
n=s.indexOf("\\$receiver\\$")
return new A.cL(a.replace(new RegExp("\\\\\\$arguments\\\\\\$","g"),"((?:x|[^x])*)").replace(new RegExp("\\\\\\$argumentsExpr\\\\\\$","g"),"((?:x|[^x])*)").replace(new RegExp("\\\\\\$expr\\\\\\$","g"),"((?:x|[^x])*)").replace(new RegExp("\\\\\\$method\\\\\\$","g"),"((?:x|[^x])*)").replace(new RegExp("\\\\\\$receiver\\\\\\$","g"),"((?:x|[^x])*)"),r,q,p,o,n)},
cM(a){return function($expr$){var $argumentsExpr$="$arguments$"
try{$expr$.$method$($argumentsExpr$)}catch(s){return s.message}}(a)},
eO(a){return function($expr$){try{$expr$.$method$}catch(s){return s.message}}(a)},
e4(a,b){var s=b==null,r=s?null:b.method
return new A.bD(a,r,s?null:b.receiver)},
ca(a){if(a==null)return new A.cB(a)
if(typeof a!=="object")return a
if("dartException" in a)return A.au(a,a.dartException)
return A.io(a)},
au(a,b){if(t.C.b(b))if(b.$thrownJsError==null)b.$thrownJsError=a
return b},
io(a){var s,r,q,p,o,n,m,l,k,j,i,h,g
if(!("message" in a))return a
s=a.message
if("number" in a&&typeof a.number=="number"){r=a.number
q=r&65535
if((B.b.aG(r,16)&8191)===10)switch(q){case 438:return A.au(a,A.e4(A.o(s)+" (Error "+q+")",null))
case 445:case 5007:A.o(s)
return A.au(a,new A.aV())}}if(a instanceof TypeError){p=$.fx()
o=$.fy()
n=$.fz()
m=$.fA()
l=$.fD()
k=$.fE()
j=$.fC()
$.fB()
i=$.fG()
h=$.fF()
g=p.J(s)
if(g!=null)return A.au(a,A.e4(s,g))
else{g=o.J(s)
if(g!=null){g.method="call"
return A.au(a,A.e4(s,g))}else if(n.J(s)!=null||m.J(s)!=null||l.J(s)!=null||k.J(s)!=null||j.J(s)!=null||m.J(s)!=null||i.J(s)!=null||h.J(s)!=null)return A.au(a,new A.aV())}return A.au(a,new A.bV(typeof s=="string"?s:""))}if(a instanceof RangeError){if(typeof s=="string"&&s.indexOf("call stack")!==-1)return new A.b_()
s=function(b){try{return String(b)}catch(f){}return null}(a)
return A.au(a,new A.aa(!1,null,null,typeof s=="string"?s.replace(/^RangeError:\s*/,""):s))}if(typeof InternalError=="function"&&a instanceof InternalError)if(typeof s=="string"&&s==="too much recursion")return new A.b_()
return a},
fq(a){if(a==null)return J.O(a)
if(typeof a=="object")return A.bL(a)
return J.O(a)},
iE(a,b){var s,r,q,p=a.length
for(s=0;s<p;s=q){r=s+1
q=r+1
b.k(0,a[s],a[r])}return b},
i_(a,b,c,d,e,f){switch(b){case 0:return a.$0()
case 1:return a.$1(c)
case 2:return a.$2(c,d)
case 3:return a.$3(c,d,e)
case 4:return a.$4(c,d,e,f)}throw A.c(new A.cP("Unsupported number of arguments for wrapped closure"))},
iz(a,b){var s=a.$identity
if(!!s)return s
s=A.iA(a,b)
a.$identity=s
return s},
iA(a,b){var s
switch(b){case 0:s=a.$0
break
case 1:s=a.$1
break
case 2:s=a.$2
break
case 3:s=a.$3
break
case 4:s=a.$4
break
default:s=null}if(s!=null)return s.bind(a)
return function(c,d,e){return function(f,g,h,i){return e(c,d,f,g,h,i)}}(a,b,A.i_)},
fX(a2){var s,r,q,p,o,n,m,l,k,j,i=a2.co,h=a2.iS,g=a2.iI,f=a2.nDA,e=a2.aI,d=a2.fs,c=a2.cs,b=d[0],a=c[0],a0=i[b],a1=a2.fT
a1.toString
s=h?Object.create(new A.cI().constructor.prototype):Object.create(new A.aK(null,null).constructor.prototype)
s.$initialize=s.constructor
r=h?function static_tear_off(){this.$initialize()}:function tear_off(a3,a4){this.$initialize(a3,a4)}
s.constructor=r
r.prototype=s
s.$_name=b
s.$_target=a0
q=!h
if(q)p=A.eB(b,a0,g,f)
else{s.$static_name=b
p=a0}s.$S=A.fT(a1,h,g)
s[a]=p
for(o=p,n=1;n<d.length;++n){m=d[n]
if(typeof m=="string"){l=i[m]
k=m
m=l}else k=""
j=c[n]
if(j!=null){if(q)m=A.eB(k,m,g,f)
s[j]=m}if(n===e)o=m}s.$C=o
s.$R=a2.rC
s.$D=a2.dV
return r},
fT(a,b,c){if(typeof a=="number")return a
if(typeof a=="string"){if(b)throw A.c("Cannot compute signature for static tearoff.")
return function(d,e){return function(){return e(this,d)}}(a,A.fR)}throw A.c("Error in functionType of tearoff")},
fU(a,b,c,d){var s=A.ez
switch(b?-1:a){case 0:return function(e,f){return function(){return f(this)[e]()}}(c,s)
case 1:return function(e,f){return function(g){return f(this)[e](g)}}(c,s)
case 2:return function(e,f){return function(g,h){return f(this)[e](g,h)}}(c,s)
case 3:return function(e,f){return function(g,h,i){return f(this)[e](g,h,i)}}(c,s)
case 4:return function(e,f){return function(g,h,i,j){return f(this)[e](g,h,i,j)}}(c,s)
case 5:return function(e,f){return function(g,h,i,j,k){return f(this)[e](g,h,i,j,k)}}(c,s)
default:return function(e,f){return function(){return e.apply(f(this),arguments)}}(d,s)}},
eB(a,b,c,d){if(c)return A.fW(a,b,d)
return A.fU(b.length,d,a,b)},
fV(a,b,c,d){var s=A.ez,r=A.fS
switch(b?-1:a){case 0:throw A.c(new A.bP("Intercepted function with no arguments."))
case 1:return function(e,f,g){return function(){return f(this)[e](g(this))}}(c,r,s)
case 2:return function(e,f,g){return function(h){return f(this)[e](g(this),h)}}(c,r,s)
case 3:return function(e,f,g){return function(h,i){return f(this)[e](g(this),h,i)}}(c,r,s)
case 4:return function(e,f,g){return function(h,i,j){return f(this)[e](g(this),h,i,j)}}(c,r,s)
case 5:return function(e,f,g){return function(h,i,j,k){return f(this)[e](g(this),h,i,j,k)}}(c,r,s)
case 6:return function(e,f,g){return function(h,i,j,k,l){return f(this)[e](g(this),h,i,j,k,l)}}(c,r,s)
default:return function(e,f,g){return function(){var q=[g(this)]
Array.prototype.push.apply(q,arguments)
return e.apply(f(this),q)}}(d,r,s)}},
fW(a,b,c){var s,r
if($.ex==null)$.ex=A.ew("interceptor")
if($.ey==null)$.ey=A.ew("receiver")
s=b.length
r=A.fV(s,c,a,b)
return r},
ek(a){return A.fX(a)},
fR(a,b){return A.bf(v.typeUniverse,A.bj(a.a),b)},
ez(a){return a.a},
fS(a){return a.b},
ew(a){var s,r,q,p=new A.aK("receiver","interceptor"),o=Object.getOwnPropertyNames(p)
o.$flags=1
s=o
for(o=s.length,r=0;r<o;++r){q=s[r]
if(p[q]===a)return q}throw A.c(A.bo("Field name "+a+" not found."))},
fk(a){return v.getIsolateTag(a)},
hp(a,b){var s
for(s=0;s<a.length;++s)if(!J.y(a[s],b[s]))return!1
return!0},
iC(a,b){var s=b.length,r=v.rttc[""+s+";"+a]
if(r==null)return null
if(s===0)return r
if(s===r.length)return r.apply(null,b)
return r(b)},
iS(a){if(/[[\]{}()*+?.\\^$|]/.test(a))return a.replace(/[[\]{}()*+?.\\^$|]/g,"\\$&")
return a},
J:function J(a,b){this.a=a
this.b=b},
c5:function c5(a,b){this.a=a
this.b=b},
c6:function c6(a,b,c){this.a=a
this.b=b
this.c=c},
c7:function c7(a){this.a=a},
c8:function c8(a){this.a=a},
aL:function aL(){},
aM:function aM(a,b,c){this.a=a
this.b=b
this.$ti=c},
b8:function b8(a,b){this.a=a
this.$ti=b},
c0:function c0(a,b,c){var _=this
_.a=a
_.b=b
_.c=0
_.d=null
_.$ti=c},
cp:function cp(){},
a1:function a1(a,b){this.a=a
this.$ti=b},
aY:function aY(){},
cL:function cL(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f},
aV:function aV(){},
bD:function bD(a,b,c){this.a=a
this.b=b
this.c=c},
bV:function bV(a){this.a=a},
cB:function cB(a){this.a=a},
ah:function ah(){},
ch:function ch(){},
ci:function ci(){},
cK:function cK(){},
cI:function cI(){},
aK:function aK(a,b){this.a=a
this.b=b},
bP:function bP(a){this.a=a},
a2:function a2(a){var _=this
_.a=0
_.f=_.e=_.d=_.c=_.b=null
_.r=0
_.$ti=a},
cr:function cr(a){this.a=a},
cw:function cw(a,b){this.a=a
this.b=b
this.c=null},
ak:function ak(a,b){this.a=a
this.$ti=b},
a3:function a3(a,b,c){var _=this
_.a=a
_.b=b
_.c=c
_.d=null},
E:function E(a,b){this.a=a
this.$ti=b},
aT:function aT(a,b,c){var _=this
_.a=a
_.b=b
_.c=c
_.d=null},
x:function x(a,b){this.a=a
this.$ti=b},
bH:function bH(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=null
_.$ti=d},
b9:function b9(){},
c2:function c2(){},
c3:function c3(){},
c4:function c4(){},
e6(a,b){var s=b.c
return s==null?b.c=A.bd(a,"eD",[b.x]):s},
eN(a){var s=a.w
if(s===6||s===7)return A.eN(a.x)
return s===11||s===12},
hb(a){return a.as},
fr(a,b){var s,r=b.length
for(s=0;s<r;++s)if(!a[s].b(b[s]))return!1
return!0},
aI(a){return A.cX(v.typeUniverse,a,!1)},
iL(a,b){var s,r,q,p,o
if(a==null)return null
s=b.y
r=a.Q
if(r==null)r=a.Q=new Map()
q=b.as
p=r.get(q)
if(p!=null)return p
o=A.ae(v.typeUniverse,a.x,s,0)
r.set(q,o)
return o},
ae(a1,a2,a3,a4){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0=a2.w
switch(a0){case 5:case 1:case 2:case 3:case 4:return a2
case 6:s=a2.x
r=A.ae(a1,s,a3,a4)
if(r===s)return a2
return A.eX(a1,r,!0)
case 7:s=a2.x
r=A.ae(a1,s,a3,a4)
if(r===s)return a2
return A.eW(a1,r,!0)
case 8:q=a2.y
p=A.aH(a1,q,a3,a4)
if(p===q)return a2
return A.bd(a1,a2.x,p)
case 9:o=a2.x
n=A.ae(a1,o,a3,a4)
m=a2.y
l=A.aH(a1,m,a3,a4)
if(n===o&&l===m)return a2
return A.ea(a1,n,l)
case 10:k=a2.x
j=a2.y
i=A.aH(a1,j,a3,a4)
if(i===j)return a2
return A.eY(a1,k,i)
case 11:h=a2.x
g=A.ae(a1,h,a3,a4)
f=a2.y
e=A.ii(a1,f,a3,a4)
if(g===h&&e===f)return a2
return A.eV(a1,g,e)
case 12:d=a2.y
a4+=d.length
c=A.aH(a1,d,a3,a4)
o=a2.x
n=A.ae(a1,o,a3,a4)
if(c===d&&n===o)return a2
return A.eb(a1,n,c,!0)
case 13:b=a2.x
if(b<a4)return a2
a=a3[b-a4]
if(a==null)return a2
return a
default:throw A.c(A.bq("Attempted to substitute unexpected RTI kind "+a0))}},
aH(a,b,c,d){var s,r,q,p,o=b.length,n=A.cY(o)
for(s=!1,r=0;r<o;++r){q=b[r]
p=A.ae(a,q,c,d)
if(p!==q)s=!0
n[r]=p}return s?n:b},
ij(a,b,c,d){var s,r,q,p,o,n,m=b.length,l=A.cY(m)
for(s=!1,r=0;r<m;r+=3){q=b[r]
p=b[r+1]
o=b[r+2]
n=A.ae(a,o,c,d)
if(n!==o)s=!0
l.splice(r,3,q,p,n)}return s?l:b},
ii(a,b,c,d){var s,r=b.a,q=A.aH(a,r,c,d),p=b.b,o=A.aH(a,p,c,d),n=b.c,m=A.ij(a,n,c,d)
if(q===r&&o===p&&m===n)return b
s=new A.bY()
s.a=q
s.b=o
s.c=m
return s},
a(a,b){a[v.arrayRti]=b
return a},
dM(a){var s=a.$S
if(s!=null){if(typeof s=="number")return A.iI(s)
return a.$S()}return null},
iK(a,b){var s
if(A.eN(b))if(a instanceof A.ah){s=A.dM(a)
if(s!=null)return s}return A.bj(a)},
bj(a){if(a instanceof A.l)return A.m(a)
if(Array.isArray(a))return A.W(a)
return A.ef(J.as(a))},
W(a){var s=a[v.arrayRti],r=t.ce
if(s==null)return r
if(s.constructor!==r.constructor)return r
return s},
m(a){var s=a.$ti
return s!=null?s:A.ef(a)},
ef(a){var s=a.constructor,r=s.$ccache
if(r!=null)return r
return A.hY(a,s)},
hY(a,b){var s=a instanceof A.ah?Object.getPrototypeOf(Object.getPrototypeOf(a)).constructor:b,r=A.hx(v.typeUniverse,s.name)
b.$ccache=r
return r},
iI(a){var s,r=v.types,q=r[a]
if(typeof q=="string"){s=A.cX(v.typeUniverse,q,!1)
r[a]=s
return s}return q},
iH(a){return A.a9(A.m(a))},
en(a){var s=A.dM(a)
return A.a9(s==null?A.bj(a):s)},
ej(a){var s
if(a instanceof A.b9)return A.iD(a.$r,a.a4())
s=a instanceof A.ah?A.dM(a):null
if(s!=null)return s
if(t.R.b(a))return J.fN(a).a
if(Array.isArray(a))return A.W(a)
return A.bj(a)},
a9(a){var s=a.r
return s==null?a.r=new A.cW(a):s},
iD(a,b){var s,r,q=b,p=q.length
if(p===0)return t.F
s=A.bf(v.typeUniverse,A.ej(q[0]),"@<0>")
for(r=1;r<p;++r)s=A.f_(v.typeUniverse,s,A.ej(q[r]))
return A.bf(v.typeUniverse,s,a)},
j_(a){return A.a9(A.cX(v.typeUniverse,a,!1))},
hX(a){var s=this
s.b=A.ih(s)
return s.b(a)},
ih(a){var s,r,q,p
if(a===t.K)return A.i5
if(A.at(a))return A.i9
s=a.w
if(s===6)return A.hT
if(s===1)return A.f9
if(s===7)return A.i0
r=A.ig(a)
if(r!=null)return r
if(s===8){q=a.x
if(a.y.every(A.at)){a.f="$i"+q
if(q==="k")return A.i3
if(a===t.m)return A.i2
return A.i8}}else if(s===10){p=A.iC(a.x,a.y)
return p==null?A.f9:p}return A.hR},
ig(a){if(a.w===8){if(a===t.S)return A.f7
if(a===t.i||a===t.H)return A.i4
if(a===t.N)return A.i7
if(a===t.y)return A.eg}return null},
hW(a){var s=this,r=A.hQ
if(A.at(s))r=A.hJ
else if(s===t.K)r=A.hI
else if(A.aJ(s)){r=A.hS
if(s===t.I)r=A.hF
else if(s===t.aD)r=A.ed
else if(s===t.cG)r=A.hB
else if(s===t.ae)r=A.d0
else if(s===t.dd)r=A.hD
else if(s===t.aQ)r=A.hH}else if(s===t.S)r=A.hE
else if(s===t.N)r=A.ec
else if(s===t.y)r=A.hA
else if(s===t.H)r=A.bh
else if(s===t.i)r=A.hC
else if(s===t.m)r=A.hG
s.a=r
return s.a(a)},
hR(a){var s=this
if(a==null)return A.aJ(s)
return A.iN(v.typeUniverse,A.iK(a,s),s)},
hT(a){if(a==null)return!0
return this.x.b(a)},
i8(a){var s,r=this
if(a==null)return A.aJ(r)
s=r.f
if(a instanceof A.l)return!!a[s]
return!!J.as(a)[s]},
i3(a){var s,r=this
if(a==null)return A.aJ(r)
if(typeof a!="object")return!1
if(Array.isArray(a))return!0
s=r.f
if(a instanceof A.l)return!!a[s]
return!!J.as(a)[s]},
i2(a){var s=this
if(a==null)return!1
if(typeof a=="object"){if(a instanceof A.l)return!!a[s.f]
return!0}if(typeof a=="function")return!0
return!1},
f8(a){if(typeof a=="object"){if(a instanceof A.l)return t.m.b(a)
return!0}if(typeof a=="function")return!0
return!1},
hQ(a){var s=this
if(a==null){if(A.aJ(s))return a}else if(s.b(a))return a
throw A.K(A.f4(a,s),new Error())},
hS(a){var s=this
if(a==null||s.b(a))return a
throw A.K(A.f4(a,s),new Error())},
f4(a,b){return new A.bb("TypeError: "+A.eQ(a,A.Q(b,null)))},
eQ(a,b){return A.bx(a)+": type '"+A.Q(A.ej(a),null)+"' is not a subtype of type '"+b+"'"},
S(a,b){return new A.bb("TypeError: "+A.eQ(a,b))},
i0(a){var s=this
return s.x.b(a)||A.e6(v.typeUniverse,s).b(a)},
i5(a){return a!=null},
hI(a){if(a!=null)return a
throw A.K(A.S(a,"Object"),new Error())},
i9(a){return!0},
hJ(a){return a},
f9(a){return!1},
eg(a){return!0===a||!1===a},
hA(a){if(!0===a)return!0
if(!1===a)return!1
throw A.K(A.S(a,"bool"),new Error())},
hB(a){if(!0===a)return!0
if(!1===a)return!1
if(a==null)return a
throw A.K(A.S(a,"bool?"),new Error())},
hC(a){if(typeof a=="number")return a
throw A.K(A.S(a,"double"),new Error())},
hD(a){if(typeof a=="number")return a
if(a==null)return a
throw A.K(A.S(a,"double?"),new Error())},
f7(a){return typeof a=="number"&&Math.floor(a)===a},
hE(a){if(typeof a=="number"&&Math.floor(a)===a)return a
throw A.K(A.S(a,"int"),new Error())},
hF(a){if(typeof a=="number"&&Math.floor(a)===a)return a
if(a==null)return a
throw A.K(A.S(a,"int?"),new Error())},
i4(a){return typeof a=="number"},
bh(a){if(typeof a=="number")return a
throw A.K(A.S(a,"num"),new Error())},
d0(a){if(typeof a=="number")return a
if(a==null)return a
throw A.K(A.S(a,"num?"),new Error())},
i7(a){return typeof a=="string"},
ec(a){if(typeof a=="string")return a
throw A.K(A.S(a,"String"),new Error())},
ed(a){if(typeof a=="string")return a
if(a==null)return a
throw A.K(A.S(a,"String?"),new Error())},
hG(a){if(A.f8(a))return a
throw A.K(A.S(a,"JSObject"),new Error())},
hH(a){if(a==null)return a
if(A.f8(a))return a
throw A.K(A.S(a,"JSObject?"),new Error())},
fd(a,b){var s,r,q
for(s="",r="",q=0;q<a.length;++q,r=", ")s+=r+A.Q(a[q],b)
return s},
ie(a,b){var s,r,q,p,o,n,m=a.x,l=a.y
if(""===m)return"("+A.fd(l,b)+")"
s=l.length
r=m.split(",")
q=r.length-s
for(p="(",o="",n=0;n<s;++n,o=", "){p+=o
if(q===0)p+="{"
p+=A.Q(l[n],b)
if(q>=0)p+=" "+r[q];++q}return p+"})"},
f5(a1,a2,a3){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a=", ",a0=null
if(a3!=null){s=a3.length
if(a2==null)a2=A.a([],t.s)
else a0=a2.length
r=a2.length
for(q=s;q>0;--q)a2.push("T"+(r+q))
for(p=t.X,o="<",n="",q=0;q<s;++q,n=a){o=o+n+a2[a2.length-1-q]
m=a3[q]
l=m.w
if(!(l===2||l===3||l===4||l===5||m===p))o+=" extends "+A.Q(m,a2)}o+=">"}else o=""
p=a1.x
k=a1.y
j=k.a
i=j.length
h=k.b
g=h.length
f=k.c
e=f.length
d=A.Q(p,a2)
for(c="",b="",q=0;q<i;++q,b=a)c+=b+A.Q(j[q],a2)
if(g>0){c+=b+"["
for(b="",q=0;q<g;++q,b=a)c+=b+A.Q(h[q],a2)
c+="]"}if(e>0){c+=b+"{"
for(b="",q=0;q<e;q+=3,b=a){c+=b
if(f[q+1])c+="required "
c+=A.Q(f[q+2],a2)+" "+f[q]}c+="}"}if(a0!=null){a2.toString
a2.length=a0}return o+"("+c+") => "+d},
Q(a,b){var s,r,q,p,o,n,m=a.w
if(m===5)return"erased"
if(m===2)return"dynamic"
if(m===3)return"void"
if(m===1)return"Never"
if(m===4)return"any"
if(m===6){s=a.x
r=A.Q(s,b)
q=s.w
return(q===11||q===12?"("+r+")":r)+"?"}if(m===7)return"FutureOr<"+A.Q(a.x,b)+">"
if(m===8){p=A.im(a.x)
o=a.y
return o.length>0?p+("<"+A.fd(o,b)+">"):p}if(m===10)return A.ie(a,b)
if(m===11)return A.f5(a,b,null)
if(m===12)return A.f5(a.x,b,a.y)
if(m===13){n=a.x
return b[b.length-1-n]}return"?"},
im(a){var s=A.ft(a)
if(s!=null)return s
return"minified:"+a},
hy(a,b){var s=a.tR[b]
while(typeof s=="string")s=a.tR[s]
return s},
hx(a,b){var s,r,q,p,o,n=a.eT,m=n[b]
if(m==null)return A.cX(a,b,!1)
else if(typeof m=="number"){s=m
r=A.be(a,5,"#")
q=A.cY(s)
for(p=0;p<s;++p)q[p]=r
o=A.bd(a,b,q)
n[b]=o
return o}else return m},
hw(a,b){return A.f0(a.tR,b)},
hv(a,b){return A.f0(a.eT,b)},
cX(a,b,c){var s,r=a.eC,q=r.get(b)
if(q!=null)return q
s=A.eZ(a,null,b,!1)
r.set(b,s)
return s},
bf(a,b,c){var s,r,q=b.z
if(q==null)q=b.z=new Map()
s=q.get(c)
if(s!=null)return s
r=A.eZ(a,b,c,!0)
q.set(c,r)
return r},
f_(a,b,c){var s,r,q,p=b.Q
if(p==null)p=b.Q=new Map()
s=c.as
r=p.get(s)
if(r!=null)return r
q=A.ea(a,b,c.w===9?c.y:[c])
p.set(s,q)
return q},
eZ(a,b,c,d){return A.hn(A.hh(a,b,c,d))},
ad(a,b){b.a=A.hW
b.b=A.hX
return b},
be(a,b,c){var s,r,q=a.eC.get(c)
if(q!=null)return q
s=new A.V(null,null)
s.w=b
s.as=c
r=A.ad(a,s)
a.eC.set(c,r)
return r},
eX(a,b,c){var s,r=b.as+"?",q=a.eC.get(r)
if(q!=null)return q
s=A.ht(a,b,r,c)
a.eC.set(r,s)
return s},
ht(a,b,c,d){var s,r,q
if(d){s=b.w
r=!0
if(!A.at(b))if(!(b===t.P||b===t.T))if(s!==6)r=s===7&&A.aJ(b.x)
if(r)return b
else if(s===1)return t.P}q=new A.V(null,null)
q.w=6
q.x=b
q.as=c
return A.ad(a,q)},
eW(a,b,c){var s,r=b.as+"/",q=a.eC.get(r)
if(q!=null)return q
s=A.hr(a,b,r,c)
a.eC.set(r,s)
return s},
hr(a,b,c,d){var s,r
if(d){s=b.w
if(A.at(b)||b===t.K)return b
else if(s===1)return A.bd(a,"eD",[b])
else if(b===t.P||b===t.T)return t.bc}r=new A.V(null,null)
r.w=7
r.x=b
r.as=c
return A.ad(a,r)},
hu(a,b){var s,r,q=""+b+"^",p=a.eC.get(q)
if(p!=null)return p
s=new A.V(null,null)
s.w=13
s.x=b
s.as=q
r=A.ad(a,s)
a.eC.set(q,r)
return r},
bc(a){var s,r,q,p=a.length
for(s="",r="",q=0;q<p;++q,r=",")s+=r+a[q].as
return s},
hq(a){var s,r,q,p,o,n=a.length
for(s="",r="",q=0;q<n;q+=3,r=","){p=a[q]
o=a[q+1]?"!":":"
s+=r+p+o+a[q+2].as}return s},
bd(a,b,c){var s,r,q,p=b
if(c.length>0)p+="<"+A.bc(c)+">"
s=a.eC.get(p)
if(s!=null)return s
r=new A.V(null,null)
r.w=8
r.x=b
r.y=c
if(c.length>0)r.c=c[0]
r.as=p
q=A.ad(a,r)
a.eC.set(p,q)
return q},
ea(a,b,c){var s,r,q,p,o,n
if(b.w===9){s=b.x
r=b.y.concat(c)}else{r=c
s=b}q=s.as+(";<"+A.bc(r)+">")
p=a.eC.get(q)
if(p!=null)return p
o=new A.V(null,null)
o.w=9
o.x=s
o.y=r
o.as=q
n=A.ad(a,o)
a.eC.set(q,n)
return n},
eY(a,b,c){var s,r,q="+"+(b+"("+A.bc(c)+")"),p=a.eC.get(q)
if(p!=null)return p
s=new A.V(null,null)
s.w=10
s.x=b
s.y=c
s.as=q
r=A.ad(a,s)
a.eC.set(q,r)
return r},
eV(a,b,c){var s,r,q,p,o,n=b.as,m=c.a,l=m.length,k=c.b,j=k.length,i=c.c,h=i.length,g="("+A.bc(m)
if(j>0){s=l>0?",":""
g+=s+"["+A.bc(k)+"]"}if(h>0){s=l>0?",":""
g+=s+"{"+A.hq(i)+"}"}r=n+(g+")")
q=a.eC.get(r)
if(q!=null)return q
p=new A.V(null,null)
p.w=11
p.x=b
p.y=c
p.as=r
o=A.ad(a,p)
a.eC.set(r,o)
return o},
eb(a,b,c,d){var s,r=b.as+("<"+A.bc(c)+">"),q=a.eC.get(r)
if(q!=null)return q
s=A.hs(a,b,c,r,d)
a.eC.set(r,s)
return s},
hs(a,b,c,d,e){var s,r,q,p,o,n,m,l
if(e){s=c.length
r=A.cY(s)
for(q=0,p=0;p<s;++p){o=c[p]
if(o.w===1){r[p]=o;++q}}if(q>0){n=A.ae(a,b,r,0)
m=A.aH(a,c,r,0)
return A.eb(a,n,m,c!==m)}}l=new A.V(null,null)
l.w=12
l.x=b
l.y=c
l.as=d
return A.ad(a,l)},
hh(a,b,c,d){return{u:a,e:b,r:c,s:[],p:0,n:d}},
hn(a){var s,r,q,p,o,n,m,l=a.r,k=a.s
for(s=l.length,r=0;r<s;){q=l.charCodeAt(r)
if(q>=48&&q<=57)r=A.hj(r+1,q,l,k)
else if((((q|32)>>>0)-97&65535)<26||q===95||q===36||q===124)r=A.eS(a,r,l,k,!1)
else if(q===46)r=A.eS(a,r,l,k,!0)
else{++r
switch(q){case 44:break
case 58:k.push(!1)
break
case 33:k.push(!0)
break
case 59:k.push(A.ao(a.u,a.e,k.pop()))
break
case 94:k.push(A.hu(a.u,k.pop()))
break
case 35:k.push(A.be(a.u,5,"#"))
break
case 64:k.push(A.be(a.u,2,"@"))
break
case 126:k.push(A.be(a.u,3,"~"))
break
case 60:k.push(a.p)
a.p=k.length
break
case 62:A.hl(a,k)
break
case 38:A.hk(a,k)
break
case 63:p=a.u
k.push(A.eX(p,A.ao(p,a.e,k.pop()),a.n))
break
case 47:p=a.u
k.push(A.eW(p,A.ao(p,a.e,k.pop()),a.n))
break
case 40:k.push(-3)
k.push(a.p)
a.p=k.length
break
case 41:A.hi(a,k)
break
case 91:k.push(a.p)
a.p=k.length
break
case 93:o=k.splice(a.p)
A.eT(a.u,a.e,o)
a.p=k.pop()
k.push(o)
k.push(-1)
break
case 123:k.push(a.p)
a.p=k.length
break
case 125:o=k.splice(a.p)
A.ho(a.u,a.e,o)
a.p=k.pop()
k.push(o)
k.push(-2)
break
case 43:n=l.indexOf("(",r)
k.push(l.substring(r,n))
k.push(-4)
k.push(a.p)
a.p=k.length
r=n+1
break
default:throw"Bad character "+q}}}m=k.pop()
return A.ao(a.u,a.e,m)},
hj(a,b,c,d){var s,r,q=b-48
for(s=c.length;a<s;++a){r=c.charCodeAt(a)
if(!(r>=48&&r<=57))break
q=q*10+(r-48)}d.push(q)
return a},
eS(a,b,c,d,e){var s,r,q,p,o,n,m=b+1
for(s=c.length;m<s;++m){r=c.charCodeAt(m)
if(r===46){if(e)break
e=!0}else{if(!((((r|32)>>>0)-97&65535)<26||r===95||r===36||r===124))q=r>=48&&r<=57
else q=!0
if(!q)break}}p=c.substring(b,m)
if(e){s=a.u
o=a.e
if(o.w===9)o=o.x
n=A.hy(s,o.x)[p]
if(n==null)A.e1('No "'+p+'" in "'+A.hb(o)+'"')
d.push(A.bf(s,o,n))}else d.push(p)
return m},
hl(a,b){var s,r=a.u,q=A.eR(a,b),p=b.pop()
if(typeof p=="string")b.push(A.bd(r,p,q))
else{s=A.ao(r,a.e,p)
switch(s.w){case 11:b.push(A.eb(r,s,q,a.n))
break
default:b.push(A.ea(r,s,q))
break}}},
hi(a,b){var s,r,q,p=a.u,o=b.pop(),n=null,m=null
if(typeof o=="number")switch(o){case-1:n=b.pop()
break
case-2:m=b.pop()
break
default:b.push(o)
break}else b.push(o)
s=A.eR(a,b)
o=b.pop()
switch(o){case-3:o=b.pop()
if(n==null)n=p.sEA
if(m==null)m=p.sEA
r=A.ao(p,a.e,o)
q=new A.bY()
q.a=s
q.b=n
q.c=m
b.push(A.eV(p,r,q))
return
case-4:b.push(A.eY(p,b.pop(),s))
return
default:throw A.c(A.bq("Unexpected state under `()`: "+A.o(o)))}},
hk(a,b){var s=b.pop()
if(0===s){b.push(A.be(a.u,1,"0&"))
return}if(1===s){b.push(A.be(a.u,4,"1&"))
return}throw A.c(A.bq("Unexpected extended operation "+A.o(s)))},
eR(a,b){var s=b.splice(a.p)
A.eT(a.u,a.e,s)
a.p=b.pop()
return s},
ao(a,b,c){if(typeof c=="string")return A.bd(a,c,a.sEA)
else if(typeof c=="number"){b.toString
return A.hm(a,b,c)}else return c},
eT(a,b,c){var s,r=c.length
for(s=0;s<r;++s)c[s]=A.ao(a,b,c[s])},
ho(a,b,c){var s,r=c.length
for(s=2;s<r;s+=3)c[s]=A.ao(a,b,c[s])},
hm(a,b,c){var s,r,q=b.w
if(q===9){if(c===0)return b.x
s=b.y
r=s.length
if(c<=r)return s[c-1]
c-=r
b=b.x
q=b.w}else if(c===0)return b
if(q!==8)throw A.c(A.bq("Indexed base must be an interface type"))
s=b.y
if(c<=s.length)return s[c-1]
throw A.c(A.bq("Bad index "+c+" for "+b.p(0)))},
iN(a,b,c){var s,r=b.d
if(r==null)r=b.d=new Map()
s=r.get(c)
if(s==null){s=A.z(a,b,null,c,null)
r.set(c,s)}return s},
z(a,b,c,d,e){var s,r,q,p,o,n,m,l,k,j,i
if(b===d)return!0
if(A.at(d))return!0
s=b.w
if(s===4)return!0
if(A.at(b))return!1
if(b.w===1)return!0
r=s===13
if(r)if(A.z(a,c[b.x],c,d,e))return!0
q=d.w
p=t.P
if(b===p||b===t.T){if(q===7)return A.z(a,b,c,d.x,e)
return d===p||d===t.T||q===6}if(d===t.K){if(s===7)return A.z(a,b.x,c,d,e)
return s!==6}if(s===7){if(!A.z(a,b.x,c,d,e))return!1
return A.z(a,A.e6(a,b),c,d,e)}if(s===6)return A.z(a,p,c,d,e)&&A.z(a,b.x,c,d,e)
if(q===7){if(A.z(a,b,c,d.x,e))return!0
return A.z(a,b,c,A.e6(a,d),e)}if(q===6)return A.z(a,b,c,p,e)||A.z(a,b,c,d.x,e)
if(r)return!1
p=s!==11
if((!p||s===12)&&d===t.Z)return!0
o=s===10
if(o&&d===t.cY)return!0
if(q===12){if(b===t.L)return!0
if(s!==12)return!1
n=b.y
m=d.y
l=n.length
if(l!==m.length)return!1
c=c==null?n:n.concat(c)
e=e==null?m:m.concat(e)
for(k=0;k<l;++k){j=n[k]
i=m[k]
if(!A.z(a,j,c,i,e)||!A.z(a,i,e,j,c))return!1}return A.f6(a,b.x,c,d.x,e)}if(q===11){if(b===t.L)return!0
if(p)return!1
return A.f6(a,b,c,d,e)}if(s===8){if(q!==8)return!1
return A.i1(a,b,c,d,e)}if(o&&q===10)return A.i6(a,b,c,d,e)
return!1},
f6(a3,a4,a5,a6,a7){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2
if(!A.z(a3,a4.x,a5,a6.x,a7))return!1
s=a4.y
r=a6.y
q=s.a
p=r.a
o=q.length
n=p.length
if(o>n)return!1
m=n-o
l=s.b
k=r.b
j=l.length
i=k.length
if(o+j<n+i)return!1
for(h=0;h<o;++h){g=q[h]
if(!A.z(a3,p[h],a7,g,a5))return!1}for(h=0;h<m;++h){g=l[h]
if(!A.z(a3,p[o+h],a7,g,a5))return!1}for(h=0;h<i;++h){g=l[m+h]
if(!A.z(a3,k[h],a7,g,a5))return!1}f=s.c
e=r.c
d=f.length
c=e.length
for(b=0,a=0;a<c;a+=3){a0=e[a]
for(;;){if(b>=d)return!1
a1=f[b]
b+=3
if(a0<a1)return!1
a2=f[b-2]
if(a1<a0){if(a2)return!1
continue}g=e[a+1]
if(a2&&!g)return!1
g=f[b-1]
if(!A.z(a3,e[a+2],a7,g,a5))return!1
break}}while(b<d){if(f[b+1])return!1
b+=3}return!0},
i1(a,b,c,d,e){var s,r,q,p,o,n=b.x,m=d.x
while(n!==m){s=a.tR[n]
if(s==null)return!1
if(typeof s=="string"){n=s
continue}r=s[m]
if(r==null)return!1
q=r.length
p=q>0?new Array(q):v.typeUniverse.sEA
for(o=0;o<q;++o)p[o]=A.bf(a,b,r[o])
return A.f1(a,p,null,c,d.y,e)}return A.f1(a,b.y,null,c,d.y,e)},
f1(a,b,c,d,e,f){var s,r=b.length
for(s=0;s<r;++s)if(!A.z(a,b[s],d,e[s],f))return!1
return!0},
i6(a,b,c,d,e){var s,r=b.y,q=d.y,p=r.length
if(p!==q.length)return!1
if(b.x!==d.x)return!1
for(s=0;s<p;++s)if(!A.z(a,r[s],c,q[s],e))return!1
return!0},
aJ(a){var s=a.w,r=!0
if(!(a===t.P||a===t.T))if(!A.at(a))if(s!==6)r=s===7&&A.aJ(a.x)
return r},
at(a){var s=a.w
return s===2||s===3||s===4||s===5||a===t.X},
f0(a,b){var s,r,q=Object.keys(b),p=q.length
for(s=0;s<p;++s){r=q[s]
a[r]=b[r]}},
cY(a){return a>0?new Array(a):v.typeUniverse.sEA},
V:function V(a,b){var _=this
_.a=a
_.b=b
_.r=_.f=_.d=_.c=null
_.w=0
_.as=_.Q=_.z=_.y=_.x=null},
bY:function bY(){this.c=this.b=this.a=null},
cW:function cW(a){this.a=a},
bX:function bX(){},
bb:function bb(a){this.a=a},
eU(a,b,c){return 0},
c9:function c9(a){var _=this
_.a=a
_.e=_.d=_.c=_.b=null},
aG:function aG(a,b){this.a=a
this.$ti=b},
h4(a,b){return new A.a2(a.i("@<0>").t(b).i("a2<1,2>"))},
q(a,b,c){return A.iE(a,new A.a2(b.i("@<0>").t(c).i("a2<1,2>")))},
n(a,b){return new A.a2(a.i("@<0>").t(b).i("a2<1,2>"))},
eI(a){return new A.an(a.i("an<0>"))},
cx(a){return new A.an(a.i("an<0>"))},
e9(){var s=Object.create(null)
s["<non-identifier-key>"]=s
delete s["<non-identifier-key>"]
return s},
e8(a,b,c){var s=new A.ac(a,b,c.i("ac<0>"))
s.c=a.e
return s},
h5(a,b){var s=t.U
return J.bm(s.a(a),s.a(b))},
e5(a){var s,r
if(A.eo(a))return"{...}"
s=new A.b1("")
try{r={}
$.aq.push(a)
s.a+="{"
r.a=!0
a.M(0,new A.cz(r,s))
s.a+="}"}finally{$.aq.pop()}r=s.a
return r.charCodeAt(0)==0?r:r},
an:function an(a){var _=this
_.a=0
_.f=_.e=_.d=_.c=_.b=null
_.r=0
_.$ti=a},
cU:function cU(a){this.a=a
this.c=this.b=null},
ac:function ac(a,b,c){var _=this
_.a=a
_.b=b
_.d=_.c=null
_.$ti=c},
N:function N(){},
r:function r(){},
cy:function cy(a){this.a=a},
cz:function cz(a,b){this.a=a
this.b=b},
aF:function aF(){},
ba:function ba(){},
ic(a,b){var s,r,q,p=null
try{p=JSON.parse(a)}catch(r){s=A.ca(r)
q=A.eC(String(s))
throw A.c(q)}q=A.d1(p)
return q},
d1(a){var s
if(a==null)return null
if(typeof a!="object")return a
if(!Array.isArray(a))return new A.bZ(a,Object.create(null))
for(s=0;s<a.length;++s)a[s]=A.d1(a[s])
return a},
eH(a,b,c){return new A.aS(a,b)},
hN(a){return a.bt()},
hf(a,b){return new A.cR(a,[],A.iB())},
hg(a,b,c){var s,r=new A.b1(""),q=A.hf(r,b)
q.aa(a)
s=r.a
return s.charCodeAt(0)==0?s:s},
bZ:function bZ(a,b){this.a=a
this.b=b
this.c=null},
c_:function c_(a){this.a=a},
bs:function bs(){},
bu:function bu(){},
aS:function aS(a,b){this.a=a
this.b=b},
bE:function bE(a,b){this.a=a
this.b=b},
cs:function cs(){},
cu:function cu(a){this.b=a},
ct:function ct(a){this.a=a},
cS:function cS(){},
cT:function cT(a,b){this.a=a
this.b=b},
cR:function cR(a,b,c){this.c=a
this.a=b
this.b=c},
iM(a){var s=A.h8(a,null)
if(s!=null)return s
throw A.c(A.eC(a))},
aD(a,b,c,d){var s,r=c?J.h_(a,d):J.fZ(a,d)
if(a!==0&&b!=null)for(s=0;s<r.length;++s)r[s]=b
return r},
h6(a,b,c){var s,r,q=A.a([],c.i("h<0>"))
for(s=a.length,r=0;r<a.length;a.length===s||(0,A.i)(a),++r)q.push(a[r])
q.$flags=1
return q},
bI(a,b){var s,r
if(Array.isArray(a))return A.a(a.slice(0),b.i("h<0>"))
s=A.a([],b.i("h<0>"))
for(r=J.P(a);r.j();)s.push(r.gm())
return s},
e7(a,b,c){var s=J.P(b)
if(!s.j())return a
if(c.length===0){do a+=A.o(s.gm())
while(s.j())}else{a+=A.o(s.gm())
while(s.j())a=a+c+A.o(s.gm())}return a},
bx(a){if(typeof a=="number"||A.eg(a)||a==null)return J.aw(a)
if(typeof a=="string")return JSON.stringify(a)
return A.eL(a)},
bq(a){return new A.bp(a)},
bo(a){return new A.aa(!1,null,null,a)},
eM(a){var s=null
return new A.aE(s,s,!1,s,s,a)},
aX(a,b,c,d,e){return new A.aE(b,c,!0,a,d,"Invalid value")},
ha(a,b,c){if(0>a||a>c)throw A.c(A.aX(a,0,c,"start",null))
if(b!=null){if(a>b||b>c)throw A.c(A.aX(b,a,c,"end",null))
return b}return c},
h9(a,b){if(a<0)throw A.c(A.aX(a,0,null,b,null))
return a},
eE(a,b,c,d){return new A.bz(b,!0,a,d,"Index out of range")},
eP(a){return new A.b4(a)},
he(a){return new A.b0(a)},
v(a){return new A.bt(a)},
eC(a){return new A.co(a)},
fY(a,b,c){var s,r
if(A.eo(a)){if(b==="("&&c===")")return"(...)"
return b+"..."+c}s=A.a([],t.s)
$.aq.push(a)
try{A.ia(a,s)}finally{$.aq.pop()}r=A.e7(b,s,", ")+c
return r.charCodeAt(0)==0?r:r},
e2(a,b,c){var s,r
if(A.eo(a))return b+"..."+c
s=new A.b1(b)
$.aq.push(a)
try{r=s
r.a=A.e7(r.a,a,", ")}finally{$.aq.pop()}s.a+=c
r=s.a
return r.charCodeAt(0)==0?r:r},
ia(a,b){var s,r,q,p,o,n,m,l=a.gn(a),k=0,j=0
for(;;){if(!(k<80||j<3))break
if(!l.j())return
s=A.o(l.gm())
b.push(s)
k+=s.length+2;++j}if(!l.j()){if(j<=5)return
r=b.pop()
q=b.pop()}else{p=l.gm();++j
if(!l.j()){if(j<=4){b.push(A.o(p))
return}r=A.o(p)
q=b.pop()
k+=r.length+2}else{o=l.gm();++j
for(;l.j();p=o,o=n){n=l.gm();++j
if(j>100){for(;;){if(!(k>75&&j>3))break
k-=b.pop().length+2;--j}b.push("...")
return}}q=A.o(p)
r=A.o(o)
k+=r.length+q.length+4}}if(j>b.length+2){k+=5
m="..."}else m=null
for(;;){if(!(k>80&&b.length>3))break
k-=b.pop().length+2
if(m==null){k+=5
m="..."}}if(m!=null)b.push(m)
b.push(q)
b.push(r)},
eJ(a,b,c,d,e){return new A.ag(a,b.i("@<0>").t(c).t(d).t(e).i("ag<1,2,3,4>"))},
cC(a,b,c,d){var s
if(B.e===c){s=J.O(a)
b=J.O(b)
return A.cJ(A.a4(A.a4($.cb(),s),b))}if(B.e===d){s=J.O(a)
b=J.O(b)
c=J.O(c)
return A.cJ(A.a4(A.a4(A.a4($.cb(),s),b),c))}s=J.O(a)
b=J.O(b)
c=J.O(c)
d=J.O(d)
d=A.cJ(A.a4(A.a4(A.a4(A.a4($.cb(),s),b),c),d))
return d},
h7(a){var s,r,q=$.cb()
for(s=a.length,r=0;r<a.length;a.length===s||(0,A.i)(a),++r)q=A.a4(q,J.O(a[r]))
return A.cJ(q)},
cO:function cO(){},
t:function t(){},
bp:function bp(a){this.a=a},
b3:function b3(){},
aa:function aa(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
aE:function aE(a,b,c,d,e,f){var _=this
_.e=a
_.f=b
_.a=c
_.b=d
_.c=e
_.d=f},
bz:function bz(a,b,c,d,e){var _=this
_.f=a
_.a=b
_.b=c
_.c=d
_.d=e},
b4:function b4(a){this.a=a},
b0:function b0(a){this.a=a},
bt:function bt(a){this.a=a},
b_:function b_(){},
cP:function cP(a){this.a=a},
co:function co(a){this.a=a},
f:function f(){},
C:function C(a,b,c){this.a=a
this.b=b
this.$ti=c},
aU:function aU(){},
l:function l(){},
b1:function b1(a){this.a=a},
fp(a,b){return Math.min(a,b)},
fo(a,b){return Math.max(a,b)},
cQ:function cQ(){},
c1:function c1(){this.b=this.a=0},
A(a){return new A.ax(a)},
ff(a){var s,r,q,p,o,n,m,l,k,j=null,i=A.ee(a,new A.dd(),t.N),h=i.a,g=a.length
if(h<2)throw A.c(A.A("Need at least 2 treatments."))
if(g<=h)throw A.c(A.A("Need replication: more plots than treatments."))
s=A.W(a).i("D<1,b>")
r=A.ap(new A.D(a,new A.de(),s))/g
q=A.ap(new A.D(a,new A.df(r),s))
s=A.m(i).i("E<2>")
p=A.ap(A.cA(new A.E(i,s),new A.dg(r),s.i("f.E"),t.i))
o=q-p
n=h-1
m=g-h
l=p/n
k=o/m
return new A.bn("CRD",A.a([A.dP("Treatment",n,p,l,l/k,m),new A.M("Error",m,o,k,j,j,j,j),new A.M("Total",g-1,q,j,j,j,j,j)],t.o),A.fa(i),r,k,m)},
fg(a3){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2=null
if(B.a.P(a3,new A.dD()))throw A.c(A.A("Every plot needs a block for RCBD."))
s=t.N
r=A.ee(a3,new A.dE(),s)
q=A.ee(a3,new A.dF(),t.S)
p=r.a
o=q.a
if(p<2)throw A.c(A.A("Need at least 2 treatments."))
if(o<2)throw A.c(A.A("Need at least 2 blocks."))
n=A.cx(s)
for(s=a3.length,m=0;l=a3.length,m<l;a3.length===s||(0,A.i)(a3),++m){k=a3[m]
l=k.c
j=A.o(k.d)
if(!n.I(0,l+"|"+j))throw A.c(A.A("Treatment "+l+" appears twice in block "+j+". Average sub-samples first."))}s=p*o
if(l!==s)throw A.c(A.A("Missing data: expected "+s+" plots, got "+l+". Fill or estimate missing plots first."))
s=A.W(a3).i("D<1,b>")
i=A.ap(new A.D(a3,new A.dG(),s))/l
h=A.ap(new A.D(a3,new A.dH(i),s))
s=A.m(r).i("E<2>")
j=t.i
g=o*A.ap(A.cA(new A.E(r,s),new A.dI(i),s.i("f.E"),j))
s=A.m(q).i("E<2>")
f=p*A.ap(A.cA(new A.E(q,s),new A.dJ(i),s.i("f.E"),j))
e=h-g-f
d=p-1
c=o-1
b=d*c
a=e/b
a0=g/d
a1=f/c
return new A.bn("RCBD",A.a([A.dP("Block",c,f,a1,a1/a,b),A.dP("Treatment",d,g,a0,a0/a,b),new A.M("Error",b,e,a,a2,a2,a2,a2),new A.M("Total",l-1,h,a2,a2,a2,a2,a2)],t.o),A.fa(r),i,a,b)},
dP(a,b,c,d,e,f){return new A.M(a,b,c,d,e,A.em(e,b,f),A.el(0.05,b,f),A.el(0.01,b,f))},
fa(a){var s,r,q,p,o=A.a([],t.J)
for(s=new A.x(a,A.m(a).i("x<1,2>")).gn(0);s.j();){r=s.d
q=r.a
p=r.b
o.push(new A.G(q,A.d4(p),J.u(p)))}return o},
ee(a,b,c){var s,r,q,p,o,n,m=A.n(c,t.a)
for(s=a.length,r=t.Y,q=0;q<a.length;a.length===s||(0,A.i)(a),++q){p=a[q]
o=b.$1(p)
n=m.h(0,o)
if(n==null){n=A.a([],r)
m.k(0,o,n)
o=n}else o=n
J.av(o,p)}return m},
ap(a){return a.A(0,0,new A.da())},
d4(a){var s=J.w(a)
return A.ap(s.T(a,new A.d5(),t.i))/s.gl(a)},
F:function F(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e},
M:function M(a,b,c,d,e,f,g,h){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g
_.w=h},
G:function G(a,b,c){this.a=a
this.b=b
this.c=c},
bn:function bn(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f},
ce:function ce(){},
cd:function cd(){},
ax:function ax(a){this.a=a},
dd:function dd(){},
de:function de(){},
df:function df(a){this.a=a},
dg:function dg(a){this.a=a},
dD:function dD(){},
dE:function dE(){},
dF:function dF(){},
dG:function dG(){},
dH:function dH(a){this.a=a},
dI:function dI(a){this.a=a},
dJ:function dJ(a){this.a=a},
da:function da(){},
d5:function d5(){},
iQ(a){var s,r,q,p
if(a<=0)return-1/0
if(a>=1)return 1/0
if(a<0.02425){s=Math.sqrt(-2*Math.log(a))
r=(((((-0.007784894002430293*s+-0.3223964580411365)*s+-2.400758277161838)*s+-2.549732539343734)*s+4.374664141464968)*s+2.938163982698783)/((((0.007784695709041462*s+0.3224671290700398)*s+2.445134137142996)*s+3.754408661907416)*s+1)}else if(a<=0.97575){s=a-0.5
q=s*s
r=(((((-39.69683028665376*q+220.9460984245205)*q+-275.9285104469687)*q+138.357751867269)*q+-30.66479806614716)*q+2.506628277459239)*s/(((((-54.47609879822406*q+161.5858368580409)*q+-155.6989798598866)*q+66.80131188771972)*q+-13.28068155288572)*q+1)}else{s=Math.sqrt(-2*Math.log(1-a))
r=-(((((-0.007784894002430293*s+-0.3223964580411365)*s+-2.400758277161838)*s+-2.549732539343734)*s+4.374664141464968)*s+2.938163982698783)/((((0.007784695709041462*s+0.3224671290700398)*s+2.445134137142996)*s+3.754408661907416)*s+1)}p=(0.5*(1+A.bi(r/1.4142135623730951))-a)*Math.sqrt(6.283185307179586)*Math.exp(r*r/2)
return r-p/(1+r*p/2)},
iV(a4){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3=a4.length
if(a3<3)return null
s=t.i
r=A.bI(a4,s)
B.a.a1(r)
q=B.a.C(r,new A.dY())/a3
p=B.a.A(r,0,new A.dZ(q))
if(p<=1e-12*(1+Math.abs(q)))return null
if(a3===3){o=Math.pow(0.7071067811865476*(r[2]-r[0]),2)/p
return new A.aZ(o,B.c.W(1.909859317102744*(Math.asin(Math.sqrt(o))-Math.asin(Math.sqrt(0.75))),0,1),a3)}n=A.a([],t.n)
for(m=a3+0.25,l=1;l<=a3;++l)n.push(A.iQ((l-0.375)/m))
k=B.a.A(n,0,new A.e_())
j=Math.sqrt(k)
i=1/Math.sqrt(a3)
h=new A.e0()
g=-n[0]/j+h.$2(B.I,i)
f=A.aD(a3,0,!1,s)
s=2*g*g
if(a3>5){e=-n[1]/j+h.$2(B.Q,i)
m=n[0]
d=n[1]
c=Math.sqrt((k-2*m*m-2*d*d)/(1-s-2*e*e))
for(s=a3-2,l=2;l<s;++l)f[l]=n[l]/c
f[0]=-g
f[1]=-e
f[a3-1]=g
f[s]=e}else{m=n[0]
c=Math.sqrt((k-2*m*m)/(1-s))
for(s=a3-1,l=1;l<s;++l)f[l]=n[l]/c
f[0]=-g
f[s]=g}for(b=0,l=0;l<a3;++l)b+=f[l]*r[l]
o=Math.min(1,b*b/p)
s=1-o
if(a3<=11){a=Math.exp(1.3822-0.77857*a3+0.062767*a3*a3-0.0020322*a3*a3*a3)
a0=0.459*a3-2.273-Math.log(s)
if(a0<=0)return new A.aZ(o,0,a3)
a1=(-Math.log(a0)-(0.544-0.39978*a3+0.025054*a3*a3-0.0006714*a3*a3*a3))/a}else{a2=Math.log(a3)
a=Math.exp(0.0030302*a2*a2-0.082676*a2-0.4803)
a1=(Math.log(s)-(0.0038915*a2*a2*a2-0.083751*a2*a2-0.31082*a2-1.5861))/a}return new A.aZ(o,B.c.W(1-0.5*(1+A.bi(a1/1.4142135623730951)),0,1),a3)},
fl(a5){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4=A.n(t.N,t.p)
for(s=a5.length,r=t.n,q=0;p=a5.length,q<p;a5.length===s||(0,A.i)(a5),++q){o=a5[q]
p=o.c
n=a4.h(0,p)
if(n==null){n=A.a([],r)
a4.k(0,p,n)
p=n}else p=n
p.push(o.e)}m=a4.a
l=m-1
k=p-m
if(m<2||k<1)return null
j=A.a([],t.r)
for(s=new A.aT(a4,a4.r,a4.e),n=t.i,i=0;s.j();){h=s.d
g=A.bI(h,n)
B.a.a1(g)
f=g.length
e=f/2|0
d=(f&1)===1?g[e]:(g[e-1]+g[e])/2
g=A.a([],r)
for(h=J.P(h);h.j();)g.push(Math.abs(h.gm()-d))
for(h=g.length,q=0;q<h;++q)i+=g[q]
j.push(g)}c=i/p
for(s=j.length,b=0,a=0,q=0;q<j.length;j.length===s||(0,A.i)(j),++q){a0=j[q]
r=B.a.C(a0,new A.dV())
p=a0.length
a1=r/p
a2=a1-c
b+=p*a2*a2
for(r=B.a.gn(a0);r.j();){o=r.gm()-a1
a+=o*o}}s=a<=1e-12
if(s&&b<=1e-12)return new A.aO(0,1,l,k)
if(s)return new A.aO(1/0,0,l,k)
a3=b/l/(a/k)
return new A.aO(a3,B.c.W(A.em(a3,l,k),0,1),l,k)},
fi(b1,b2,b3){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7=b2?A.fg(b1):A.ff(b1),a8=t.N,a9=t.i,b0=A.n(a8,a9)
for(s=a7.c,r=s.length,q=0;p=s.length,q<p;s.length===r||(0,A.i)(s),++q){o=s[q]
b0.k(0,o.a,o.b)}n=b1.length
m=a7.d
s=t.S
l=A.n(s,a9)
if(b2){k=A.n(s,t.p)
for(r=t.n,q=0;q<b1.length;b1.length===n||(0,A.i)(b1),++q){j=b1[q]
i=j.d
i.toString
h=k.h(0,i)
if(h==null){h=A.a([],r)
k.k(0,i,h)
i=h}else i=h
J.av(i,j.e)}a9=A.n(s,a9)
for(r=new A.x(k,k.$ti.i("x<1,2>")).gn(0);r.j();){g=r.d
i=g.a
h=g.b
f=J.w(h)
a9.k(0,i,f.C(h,new A.dL())/f.gl(h))}e=k.a
l=a9}else e=0
d=A.n(a8,s)
for(a8=b1.length,q=0;q<b1.length;b1.length===a8||(0,A.i)(b1),++q){a9=b1[q].c
s=d.h(0,a9)
d.k(0,a9,(s==null?0:s)+1)}c=a7.f
b=a7.e
a=A.a([],t.l)
a0=A.a([],t.n)
for(a8=b1.length,a9=c-1,s=c>1,r=!(b<=1e-12),a1=1/p+1/e-1/(p*e),q=0;q<b1.length;b1.length===a8||(0,A.i)(b1),++q){j=b1[q]
p=j.c
if(b2){i=b0.h(0,p)
i.toString
h=l.h(0,j.d)
h.toString
a2=i+h-m}else{i=b0.h(0,p)
i.toString
a2=i}g=j.e-a2
if(b2)a3=a1
else{i=d.h(0,p)
i.toString
a3=1/i}if(!r||a3>=1)a4=0
else{a5=g/Math.sqrt(b*(1-a3))
a6=c-a5*a5
a4=!s||a6<=1e-9?J.fO(a5)*(1/0):a5*Math.sqrt(a9/a6)}a0.push(g)
p=b0.h(0,p)
p.toString
a.push(new A.bO(j,a2,g,a4,p))}a8=n>=3?A.iV(a0):null
return new A.cj(a,a8,A.fl(b1),b3)},
aZ:function aZ(a,b,c){this.a=a
this.b=b
this.c=c},
dY:function dY(){},
dZ:function dZ(a){this.a=a},
e_:function e_(){},
e0:function e0(){},
bO:function bO(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e},
aO:function aO(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
dV:function dV(){},
cj:function cj(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
dL:function dL(){},
bk(a){var s,r,q
if(a<0.5)return Math.log(3.141592653589793/Math.sin(3.141592653589793*a))-A.bk(1-a);--a
s=a+7+0.5
for(r=0.9999999999998099,q=1;q<9;++q)r+=B.L[q]/(a+q)
return 0.5*Math.log(6.283185307179586)+(a+0.5)*Math.log(s)-s+Math.log(r)},
bi(a){var s
if(a===0)return 0
s=a<0?-1:1
a=Math.abs(a)
return s*A.fc(0.5,a*a)},
fc(a,b){var s,r,q,p,o,n,m,l,k,j,i
if(b<=0)return 0
s=A.bk(a)
if(b<a+1){r=1/a
for(q=r,p=a,o=0;o<500;++o){++p
q*=b/p
r+=q
if(Math.abs(q)<Math.abs(r)*1e-16)break}return r*Math.exp(-b+a*Math.log(b)-s)}n=b+1-a
m=1/n
for(l=m,k=9999999999999999e284,j=1;j<500;++j){i=-j*(j-a)
n+=2
m=i*m+n
if(Math.abs(m)<1e-300)m=1e-300
k=n+i/k
if(Math.abs(k)<1e-300)k=1e-300
m=1/m
q=m*k
l*=q
if(Math.abs(q-1)<1e-16)break}return 1-Math.exp(-b+a*Math.log(b)-s)*l},
ix(a,b){if(b<=0)return 1
if(a<=0)return 1
return B.c.W(1-A.fc(b/2,a/2),0,1)},
iJ(a,b,c){var s,r,q
if(a<=0)return 0
if(a>=1)return 1
s=b+c
r=1-a
q=Math.exp(A.bk(s)-A.bk(b)-A.bk(c)+b*Math.log(a)+c*Math.log(r))
if(a<(b+1)/(s+2))return q*A.f2(a,b,c)/b
return 1-q*A.f2(r,c,b)/c},
f2(a,b,c){var s,r,q,p,o,n,m,l,k,j=b+c,i=b+1,h=b-1,g=1-j*a/i
g=1/(Math.abs(g)<1e-300?1e-300:g)
for(s=g,r=1,q=1;q<=1000;++q,g=m,r=l){p=2*q
o=b+p
n=q*(c-q)*a/((h+p)*o)
g=1+n*g
if(Math.abs(g)<1e-300)g=1e-300
r=1+n/r
if(Math.abs(r)<1e-300)r=1e-300
g=1/g
n=-(b+q)*(j+q)*a/(o*(i+p))
m=1+n*g
if(Math.abs(m)<1e-300)m=1e-300
l=1+n/r
if(Math.abs(l)<1e-300)l=1e-300
m=1/m
k=m*l
s=s*(g*r)*k
if(Math.abs(k-1)<1e-15)break}return s},
em(a,b,c){if(isNaN(a)||a<=0)return 1
if(a==1/0||a==-1/0)return 0
return A.iJ(c/(c+b*a),c/2,b/2)},
el(a,b,c){return A.f3(new A.dO(b,c,a),0,1e4,!0)},
iR(a,b,c){var s,r,q,p,o,n,m,l,k,j,i,h,g,f
if(a<=0)return 0
if(c<2||b<2)return 0/0
if(c>25e3)return A.fe(a,1,b)
s=c*0.5
r=Math.log(c)
q=A.bk(s)
p=s-1
o=c*0.25
if(c<=100)n=1
else if(c<=800)n=0.5
else n=c<=5000?0.25:0.125
m=s*r-c*0.6931471805599453-q+Math.log(n)
for(l=0,k=1;k<=50;++k){j=(2*k-1)*n
for(i=0,h=1;h<=16;++h){r=8<h
if(r){g=h-8-1
f=m+p*Math.log(j+B.h[g]*n)-(B.h[g]*n+j)*o}else{g=h-1
f=m+p*Math.log(j-B.h[g]*n)+(B.h[g]*n-j)*o}if(f>=-30)i+=A.fe(r?a*Math.sqrt((B.h[g]*n+j)*0.5):a*Math.sqrt((-(B.h[g]*n)+j)*0.5),1,b)*B.K[g]*Math.exp(f)}if(k*n>=1&&i<=1e-14)break
l+=i}return Math.min(1,l)},
fe(a1,a2,a3){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0=a1*0.5
if(a0>=8)return 1
s=2*(0.5*(1+A.bi(a0/1.4142135623730951)))-1
s=s>=1?1:Math.pow(s,a3)
r=a1>3?2:3
q=(8-a0)/r
p=a0+q
o=a3-1
for(n=-30/o,m=a0,l=0,k=1;k<=r;++k,m=p,p=a){j=0.5*(p+m)
i=0.5*(p-m)
for(h=0,g=1;g<=12;++g){if(6<g){f=12-g+1
e=B.p[f-1]}else{e=-B.p[g-1]
f=g}d=j+i*e
c=d*d
if(c>60)break
b=2*(0.5*(1+A.bi(d/1.4142135623730951)))*0.5-2*(0.5*(1+A.bi((d-a1)/1.4142135623730951)))*0.5
if(b>=Math.exp(n))h+=B.P[f-1]*Math.exp(-(0.5*c))*Math.pow(b,o)}l+=h*(2*i*a3*0.3989422804014327)
a=p+q}s+=l
if(s<=Math.exp(-30/a2))return 0
s=Math.pow(s,a2)
return s>=1?1:s},
fs(a,b,c){return A.f3(new A.dX(b,c,a),0,100,!1)},
f3(a,b,c,d){var s,r,q
for(s=0;s<200;++s){r=0.5*(b+c)
q=a.$1(r)
if(d?q>0:q<0)b=r
else c=r
if(c-b<1e-10)break}return 0.5*(b+c)},
dO:function dO(a,b,c){this.a=a
this.b=b
this.c=c},
dX:function dX(a,b,c){this.a=a
this.b=b
this.c=c},
ar(a){return J.fP(a,new A.dN(),t.N).S(0,"x")},
ip(c0,c1,c2){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3,b4,b5,b6,b7,b8,b9=null
if(c0.length===0||B.a.P(c0,new A.dh()))throw A.c(A.A("Every plot needs its factor levels."))
s=J.u(B.a.ga7(c0).a.a)
if(s<2||s>3||B.a.P(c0,new A.di(s)))throw A.c(A.A("Factorial analysis supports 2 or 3 factors."))
r=A.a([],t.E)
for(q=t.s,p=0;p<s;++p)r.push(A.a([],q))
for(q=c0.length,o=0;o<c0.length;c0.length===q||(0,A.i)(c0),++o)for(n=c0[o].a,p=0;p<s;++p){m=r[p]
l=n.a
k=J.L(l)
j=A.m(n).y[1]
if(!J.es(m,j.a(k.h(l,p))))J.av(r[p],j.a(k.h(l,p)))}for(q=c1!=null,p=0;p<s;++p){i=q&&p<c1.length?c1[p]:b9
J.ev(r[p],new A.dj(new A.dB(i)))
if(J.u(r[p])<2)throw A.c(A.A("Each factor needs at least 2 levels."))}h=B.a.A(r,1,new A.dn())
q=t.N
n=t.p
g=A.n(q,n)
for(m=c0.length,l=t.n,o=0;o<c0.length;c0.length===m||(0,A.i)(c0),++o){f=c0[o]
k=f.a.S(0,"|")
j=g.h(0,k)
if(j==null){j=A.a([],l)
g.k(0,k,j)
k=j}else k=j
J.av(k,f.e)}m=g.a
if(m!==h)throw A.c(A.A("Missing combinations: expected "+h+", got "+m+"."))
m=g.$ti
k=m.i("E<2>")
e=J.u(new A.E(g,k).ga7(0))
if(new A.E(g,k).P(0,new A.dp(e)))throw A.c(A.A("Unbalanced data: every combination needs the same number of plots."))
if(e<2)throw A.c(A.A("Need replication: at least 2 plots per combination."))
d=new A.dz()
c=new A.dC()
b=c0.length
a=d.$1(new A.D(c0,new A.dq(),A.W(c0).i("D<1,b>")))
a0=B.a.A(c0,0,new A.dr(c,a))
k=t.i
j=A.n(q,k)
for(m=new A.x(g,m.i("x<1,2>")).gn(0);m.j();){a1=m.d
j.k(0,a1.a,d.$1(a1.b))}a2=new A.by(c2?"RCBD":"CRD",B.M,r,j,e,a,0,0)
m=A.a([],t.M)
for(a3=B.b.aT(1,s),a4=t.t,a5=1;a5<a3;++a5){a6=A.a([],a4)
for(p=0;p<s;++p)if((a5&B.b.b7(1,p))>>>0!==0)a6.push(p)
m.push(a6)}B.a.H(m,new A.ds())
a3=A.n(q,k)
for(a4=m.length,o=0;a6=m.length,o<a6;m.length===a4||(0,A.i)(m),++o){a7=m[o]
a6=A.ar(a7)
a8=a2.a8(a7)
a9=a2.au(a7)
a3.k(0,a6,a8*new A.E(a9,A.m(a9).i("E<2>")).A(0,0,new A.dt(c,a)))}k=A.n(q,k)
for(a4=t.cn,o=0;o<m.length;m.length===a6||(0,A.i)(m),++o){a7=m[o]
k.k(0,A.ar(a7),new A.b5(m,new A.du(a7),a4).A(0,0,new A.dv(a7,a3)))}a3=a3.h(0,A.ar(B.a.gaN(m)))
a3.toString
if(c2){if(B.a.P(c0,new A.dk()))throw A.c(A.A("Every plot needs a block for RCBD."))
b0=A.n(t.S,n)
b1=A.cx(q)
for(q=c0.length,o=0;o<c0.length;c0.length===q||(0,A.i)(c0),++o){f=c0[o]
n=f.d
a4=A.o(n)
if(!b1.I(0,a4+"|"+f.a.S(0,"|")))throw A.c(A.A("A combination appears twice in block "+a4+". Average sub-samples first."))
n.toString
a4=b0.h(0,n)
if(a4==null){a4=A.a([],l)
b0.k(0,n,a4)
n=a4}else n=a4
n.push(f.e)}b2=b0.a
if(b2!==e||new A.E(b0,b0.$ti.i("E<2>")).P(0,new A.dl(h)))throw A.c(A.A("Every block must contain every combination exactly once."))
b3=h*new A.E(b0,b0.$ti.i("E<2>")).A(0,0,new A.dm(c,d,a))}else{b3=0
b2=0}b4=a0-a3-b3
q=e-1
b5=c2?(h-1)*q:h*q
b6=b4/b5
b7=new A.dw(r)
b8=new A.dy(b6,b5)
q=c2?"RCBD":"CRD"
n=A.a([],t.o)
if(c2)n.push(b8.$3("Block",b2-1,b3))
for(l=m.length,o=0;o<m.length;m.length===l||(0,A.i)(m),++o){a7=m[o]
a3=A.ar(a7)
a4=b7.$1(a7)
a6=k.h(0,A.ar(a7))
a6.toString
n.push(b8.$3(a3,a4,a6))}n.push(new A.M("Error",b5,b4,b6,b9,b9,b9,b9))
n.push(new A.M("Total",b-1,a0,b9,b9,b9,b9,b9))
return new A.by(q,n,r,j,e,a,b6,b5)},
dN:function dN(){},
b2:function b2(a,b,c,d,e,f,g,h){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g
_.w=h},
by:function by(a,b,c,d,e,f,g,h){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g
_.w=h},
ck:function ck(a){this.a=a},
cn:function cn(a,b){this.a=a
this.b=b},
cl:function cl(){},
cm:function cm(){},
dh:function dh(){},
di:function di(a){this.a=a},
dB:function dB(a){this.a=a},
dj:function dj(a){this.a=a},
dn:function dn(){},
dp:function dp(a){this.a=a},
dz:function dz(){},
dA:function dA(){},
dC:function dC(){},
dq:function dq(){},
dr:function dr(a,b){this.a=a
this.b=b},
ds:function ds(){},
dt:function dt(a,b){this.a=a
this.b=b},
du:function du(a){this.a=a},
dv:function dv(a,b){this.a=a
this.b=b},
dk:function dk(){},
dl:function dl(a){this.a=a},
dm:function dm(a,b,c){this.a=a
this.b=b
this.c=c},
dw:function dw(a){this.a=a},
dx:function dx(a){this.a=a},
dy:function dy(a,b){this.a=a
this.b=b},
iO(c9,d0){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3,b4,b5,b6,b7,b8,b9,c0,c1,c2,c3,c4,c5,c6,c7,c8=c9.length
if(c8<2)throw A.c(A.A("Need at least 2 observations"))
s=t.N
r=A.n(s,t.p)
for(q=t.n,p=0;o=c9.length,p<o;c9.length===c8||(0,A.i)(c9),++p){n=c9[p]
o=n.c
m=r.h(0,o)
if(m==null){m=A.a([],q)
r.k(0,o,m)
o=m}else o=m
J.av(o,n.e)}l=r.a
if(l<2)throw A.c(A.A("Need at least 2 treatments"))
c8=A.a([],t.x)
for(k=0;k<o;++k){q=c9[k]
c8.push(new A.c6(k,q.c,q.e))}B.a.H(c8,new A.dR())
q=t.i
s=A.n(s,q)
for(m=new A.a3(r,r.r,r.e);m.j();)s.k(0,m.d,0)
for(j=0,k=0;k<o;k=h){i=k
for(;;){h=i+1
if(!(h<o&&c8[h].c===c8[k].c))break
i=h}g=i-k+1
f=(k+1+i+1)/2
for(e=k;e<=i;++e){m=c8[e].b
d=s.h(0,m)
d.toString
s.k(0,m,d+f)}if(g>1)j+=g*g*g-g}c=o*o*o-o
b=c<=0?1:1-j/c
a=l-1
if(b<=1e-12){a0=0
a1=1}else{for(c8=new A.x(r,r.$ti.i("x<1,2>")).gn(0),a2=0;c8.j();){a3=c8.d
m=s.h(0,a3.a)
m.toString
a2+=m*m/J.u(a3.b)}c8=o+1
a0=Math.max(0,(12/(o*c8)*a2-3*c8)/b)
a1=A.ix(a0,a)}c8=A.a([],t.q)
for(m=new A.x(r,r.$ti.i("x<1,2>")).gn(0);m.j();){a3=m.d
d=a3.a
a4=a3.b
a5=J.L(a4)
a6=a5.gl(a4)
a7=A.bI(a4,q)
B.a.a1(a7)
a8=a7.length
a9=a8/2|0
a7=(a8&1)===1?a7[a9]:(a7[a9-1]+a7[a9])/2
a8=a5.C(a4,new A.dS())
b0=a5.gl(a4)
b1=s.h(0,d)
b1.toString
c8.push(new A.c8([a8/b0,b1/a5.gl(a4),a7,a6,d]))}B.a.H(c8,new A.dT())
b2=o<=1?0:o*(o+1)/12-j/(12*(o-1))
b3=A.a([],t.cv)
for(b4=0;b4<l;b4=b5)for(b5=b4+1,b6=b5;b6<l;++b6){s=c8[b4].a
o=s[1]
m=c8[b6].a
d=m[1]
b7=Math.sqrt(Math.max(0,b2*(1/s[3]+1/m[3])))
s=b7<=1e-12
b8=s?0:Math.abs(o-d)/b7
b3.push(new A.c7([b4,b6,s?1:B.c.W(2*(1-0.5*(1+A.bi(b8/1.4142135623730951))),0,1),b8]))}e=b3.length
s=A.a([],t.t)
for(b9=0;b9<e;++b9)s.push(b9)
B.a.H(s,new A.dU(b3))
c0=A.aD(e,1,!1,q)
for(c1=0,c2=0;c2<e;++c2){b9=s[c2]
c1=Math.max(c1,Math.min(1,b3[b9].a[2]*(e-c2)))
c0[b9]=c1}c3=J.eF(l,t.b9)
for(s=t.y,c4=0;c4<l;++c4)c3[c4]=A.aD(l,!1,!1,s)
c5=A.a([],t.D)
for(b9=0;b9<e;++b9){c6=b3[b9]
if(c0[b9]<d0){s=c6.a
q=s[0]
o=c3[q]
s=s[1]
o[s]=!0
c3[s][q]=!0}c5.push(new A.bw())}c7=A.id(l,c3)
s=A.a([],t._)
for(b9=0;b9<l;++b9){q=c8[b9].a
s.push(new A.bF(q[4],q[3],q[2],q[0],q[1],c7[b9]))}return new A.cv(a0,a,a1,d0,s)},
id(a1,a2){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a=t.S,a0=A.cx(a)
for(s=0;s<a1;++s)a0.I(0,s)
r=t.bp
q=A.a([a0],r)
for(s=0;s<a1;s=p)for(p=s+1,o=p;o<a1;++o){if(!a2[s][o])continue
n=A.a([],r)
for(a0=q.length,m=0;m<q.length;q.length===a0||(0,A.i)(q),++m){l=q[m]
if(l.u(0,s)&&l.u(0,o)){k=A.eI(a)
k.F(0,l)
k.aP(0,o)
n.push(k)
k=A.eI(a)
k.F(0,l)
k.aP(0,s)
n.push(k)}else n.push(l)}q=A.a([],r)
for(j=0;j<n.length;++j){h=0
for(;;){i=!0
if(!(h<n.length)){i=!1
break}A:{if(j===h)break A
g=n[j]
f=n[h]
if(g.a<f.a&&f.aJ(g))break
if(g.a===f.a&&h<j&&f.aJ(g))break}++h}if(!i)q.push(n[j])}}B.a.H(q,new A.d6(new A.d9(),new A.d8()))
e=new A.d7()
d=A.aD(a1,"",!1,t.N)
for(c=0;c<q.length;++c){b=e.$1(c)
for(a=q[c],a0=A.m(a),r=new A.ac(a,a.r,a0.i("ac<1>")),r.c=a.e,a0=a0.c;r.j();){a=r.d
if(a==null)a=a0.a(a)
d[a]=d[a]+b}}return d},
bF:function bF(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f},
bw:function bw(){},
cv:function cv(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.e=d
_.r=e},
dR:function dR(){},
dS:function dS(){},
dT:function dT(){},
dU:function dU(a){this.a=a},
d9:function d9(){},
d8:function d8(){},
d6:function d6(a,b){this.a=a
this.b=b},
d7:function d7(){},
hM(a,b){var s,r,q,p,o,n,m,l,k="abcdefghijklmnopqrstuvwxyz",j=a.length,i=A.a([],t.w)
for(s=0;s<j;++s){r=s
for(;;){q=r+1
if(!(q<j&&a[s]-a[q]<b[r-s]))break
r=q}if(i.length===0||r>B.a.gaN(i).b)i.push(new A.J(s,r))}p=A.aD(j,"",!1,t.N)
for(o=i.length,n=0;n<o;++n){m=n<26?k[n]:k[B.b.av(n,26)]+B.b.D(n,26)
for(l=i[n],s=l.a;s<=l.b;++s)p[s]=p[s]+m}return p},
bN:function bN(a,b,c){this.a=a
this.b=b
this.c=c},
cE:function cE(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
am:function am(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
U:function U(){},
cF:function cF(){},
cG:function cG(){},
bv:function bv(){},
bU:function bU(){},
bJ:function bJ(){},
iT(a,b,c){var s,r,q,p,o,n,m,l=new A.c1()
l.aA(b)
s=A.a([],t.w)
for(r=1;r<=a;++r)for(q=0;q<c;++q)s.push(new A.J(q,r))
B.a.aw(s,l)
p=A.a([],t.B)
for(o=0;o<s.length;o=n){n=o+1
m=s[o]
p.push(new A.aW(n,m.a,m.b,null))}return p},
iU(a,b,c){var s,r,q,p,o,n,m,l,k,j,i=new A.c1()
i.aA(b)
s=A.a([],t.B)
for(r=t.t,q=c<0,p="Length must be a non-negative integer: "+c,o=1;o<=a;++o){if(q)A.e1(A.bo(p))
n=A.a(new Array(c),r)
for(m=0;m<c;++m)n[m]=m
B.a.aw(n,i)
for(l=n.length,k=0;k<n.length;n.length===l||(0,A.i)(n),++k){j=n[k]
s.push(new A.aW(s.length+1,j,o,o))}}return s},
aW:function aW(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
iw(b1,b2){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0=A.a([],t.t)
for(s=new A.x(b1,A.m(b1).i("x<1,2>")).gn(0);s.j();){r=s.d
if(J.eu(r.b))b0.push(r.a)}B.a.a1(b0)
if(b0.length===0)return B.q
q=A.cx(t.N)
p=A.a([],t.s)
if(b2!=null)for(s=b2.$ti,o=new A.X(b2,b2.gl(0),s.i("X<N.E>")),s=s.i("N.E");o.j();){n=o.d
if(n==null)n=s.a(n)
if(q.I(0,n))p.push(n)}for(s=b0.length,m=0;m<b0.length;b0.length===s||(0,A.i)(b0),++m){o=b1.h(0,b0[m])
o.toString
o=J.P(o)
while(o.j()){n=o.gm().c
if(q.I(0,n))p.push(n)}}l=A.a([],t.V)
for(s=p.length,o=t.n,n=t.Q,k=1/0,j=-1/0,i=1/0,h=-1/0,m=0;m<p.length;p.length===s||(0,A.i)(p),++m){g=p[m]
f=A.a([],n)
for(e=b0.length,d=0;d<b0.length;b0.length===e||(0,A.i)(b0),++d){c=b0[d]
b=A.a([],o)
a=b1.h(0,c)
a.toString
a=J.P(a)
while(a.j()){a0=a.gm()
if(a0.c===g&&isFinite(a0.e))b.push(a0.e)}a=b.length
if(a===0)continue
a1=B.a.C(b,new A.dK())/a
a0=a>1
if(a0){for(a2=b.length,a3=0,a4=0;a4<a2;++a4){a5=b[a4]-a1
a3+=a5*a5}a6=Math.sqrt(a3/(a-1))}else a6=0
a7=a0?a6/Math.sqrt(a):0
if(a1<k)k=a1
if(a1>j)j=a1
a8=a1-a7
if(a8<i)i=a8
a9=a1+a7
if(a9>h)h=a9
f.push(new A.bQ(c,a1,a6,a7,a))}if(f.length!==0)l.push(new A.bT(g,f))}if(l.length===0)return B.q
return new A.bS(b0,l,k,j,i,h)},
bQ:function bQ(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e},
bT:function bT(a,b){this.a=a
this.b=b},
bS:function bS(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f},
dK:function dK(){},
iv(a){var s,r,q,p=A.a([],t.n)
for(s=a.length,r=0;r<a.length;a.length===s||(0,A.i)(a),++r)p.push(a[r].e)
s=A.a([],t.A)
for(r=0;r<5;++r){q=B.o[r]
if(q.aj(p))s.push(q)}return s},
iZ(a,b){var s,r,q,p
if(b===B.j)return a
s=A.a([],t.Y)
for(r=a.length,q=0;q<a.length;a.length===r||(0,A.i)(a),++q){p=a[q]
s.push(new A.F(p.a,p.b,p.c,p.d,b.ba(p.e)))}return s},
iW(a,b){var s,r,q
if(a.length===0)return null
if(b&&B.l.aj(a))return B.l
s=B.a.C(a,B.u)
r=B.a.C(a,B.v)
if(s>=0){if(r>=10)q=s===0||r/s>=10
else q=!1
if(q)return B.i
if(s===0||r<=10)return B.n
return B.m}if(B.i.aj(a))return B.i
return null},
R:function R(a,b,c){this.c=a
this.a=b
this.b=c},
fv(a,b){var s,r,q,p,o
try{s=b.length===0?A.n(t.N,t.z):B.d.bb(b,null)
p=$.eq().h(0,a)
p.toString
p=p.$1(t.b.a(s))
return p}catch(o){p=A.ca(o)
if(p instanceof A.ax){r=p
p=t.N
return B.d.L(A.q(["error","anova","message",r.a],p,p),null)}else{q=p
p=t.N
p=B.d.L(A.q(["error","invalid","message",J.aw(q)],p,p),null)
return p}}},
j(a){if(a==null)return null
if(isNaN(a))return null
if(a==1/0||a==-1/0)return a>0?1e9:-1e9
return a},
eh(a){var s,r,q,p,o,n,m,l,k,j=A.a([],t.Y)
for(s=J.cc(t.j.a(a),t.b),r=s.$ti,s=new A.X(s,s.gl(0),r.i("X<N.E>")),q=t.N,p=t.g,r=r.i("N.E");s.j();){o=s.d
if(o==null)o=r.a(o)
n=o.h(0,"id")
m=A.ec(o.h(0,"trt"))
l=A.d0(o.h(0,"block"))
l=l==null?null:B.c.a0(l)
k=A.bh(o.h(0,"value"))
o=p.a(o.h(0,"levels"))
j.push(new A.F(o==null?null:J.cc(o,q),n,m,l,k))}return j},
ik(a){return B.a.ao(B.k,new A.db(a),new A.dc())},
ei(a){return A.q(["source",a.a,"df",a.b,"ss",A.j(a.c),"ms",A.j(a.d),"f",A.j(a.e),"p",A.j(a.f),"fCrit05",A.j(a.r),"fCrit01",A.j(a.w),"sig",a.gaU()],t.N,t.X)},
fb(a){var s,r,q,p,o,n,m,l=A.hU(a.a),k=A.a([],t.d)
for(s=a.c,r=s.length,q=t.N,p=t.X,o=0;o<s.length;s.length===r||(0,A.i)(s),++o){n=s[o]
k.push(A.q(["trt",n.a,"mean",A.j(n.b),"letters",n.c],q,p))}s=[]
for(r=a.d,m=r.length,o=0;o<r.length;r.length===m||(0,A.i)(r),++o)s.push(A.j(r[o]))
return A.q(["test",l,"alpha",a.b,"ranked",k,"criticalRanges",s],q,p)},
hU(a){return B.a.an(B.k,new A.d3(a)).gZ()},
hV(a){var s,r,q,p=A.a([],t.e)
for(s=t.N,r=0;r<3;++r){q=B.k[r]
p.push(A.q(["id",q.gZ(),"name",q.ga_()],s,s))}return B.d.L(A.q(["freeActiveLimit",1,"tests",p],s,t.K),null)},
ib(a){var s,r,q,p,o,n,m,l=B.c.a0(A.bh(a.h(0,"treatments"))),k=B.c.a0(A.bh(a.h(0,"reps"))),j=B.c.a0(A.bh(a.h(0,"seed")))
if(l<2||k<2)throw A.c(A.A("Need at least 2 treatments and 2 replications."))
s=J.y(a.h(0,"design"),"rcbd")?A.iU(k,j,l):A.iT(k,j,l)
r=A.a([],t.G)
for(q=s.length,p=t.N,o=t.I,n=0;n<s.length;s.length===q||(0,A.i)(s),++n){m=s[n]
r.push(A.q(["n",m.a,"t",m.b,"rep",m.c,"block",m.d],p,o))}return B.d.L(A.q(["plots",r],p,t.h),null)},
hz(c0){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3,b4,b5,b6,b7,b8=null,b9=A.eh(c0.h(0,"data"))
if(J.u(b9)===0)throw A.c(A.A("No data."))
s=J.y(c0.h(0,"rcbd"),!0)
i=A.ik(c0.h(0,"test"))
h=A.d0(c0.h(0,"alpha"))
g=h==null?b8:h
r=g==null?0.05:g
f=A.ed(c0.h(0,"unit"))
if(f==null)f=""
h=t.N
e=A.n(h,t.i)
d=A.n(h,t.S)
for(c=b9,b=c.length,a=0;a<c.length;c.length===b||(0,A.i)(c),++a){a0=c[a]
a1=a0.c
a2=e.h(0,a1)
if(a2==null)a2=0
e.k(0,a1,a2+a0.e)
a2=d.h(0,a1)
d.k(0,a1,(a2==null?0:a2)+1)}c=t.X
b=A.n(h,c)
for(a1=new A.a3(e,e.r,e.e);a1.j();){a2=a1.d
a3=e.h(0,a2)
a3.toString
a4=d.h(0,a2)
a4.toString
b.k(0,a2,A.j(a3/a4))}a5=A.iv(b9)
a6=A.ed(c0.h(0,"transform"))
a7=B.a.ao(B.o,new A.cZ(a6==null?"none":a6),new A.d_())
a8=B.a.u(a5,a7)?a7:B.j
q=A.iZ(b9,a8)
a1=A.a([],t.n)
for(a2=b9,a3=a2.length,a=0;a<a2.length;a2.length===a3||(0,A.i)(a2),++a)a1.push(a2[a].e)
a9=A.iW(a1,B.f.bn(f)==="%")
p=null
o=null
try{n=A.fi(q,s,3)
p=n.b
o=n.c}catch(b0){if(A.ca(b0) instanceof A.ax)o=A.fl(q)
else throw b0}m=null
try{l=A.iO(b9,r)
a1=A.j(l.a)
a2=l.b
a3=A.j(l.c)
a4=l.c
if(a4<0.01)a4="**"
else a4=a4<0.05?"*":"ns"
b1=l.e
k=A.a([],t.d)
for(b2=l.r,b3=b2.length,a=0;a<b2.length;b2.length===b3||(0,A.i)(b2),++a){j=b2[a]
J.av(k,A.q(["trt",j.a,"n",j.b,"median",A.j(j.c),"mean",A.j(j.d),"meanRank",A.j(j.e),"letters",j.f],h,c))}m=A.q(["h",a1,"df",a2,"p",a3,"sig",a4,"alpha",b1,"groups",k],h,c)}catch(b0){if(A.ca(b0) instanceof A.ax)m=null
else throw b0}k=A.a([],t.s)
for(a1=a5.length,a=0;a<a5.length;a5.length===a1||(0,A.i)(a5),++a)k.push(a5[a].c)
a1=a9==null?b8:a9.c
a2=p==null?b8:A.q(["w",A.j(p.a),"p",A.j(p.b),"n",p.c],h,c)
a3=o==null?b8:A.q(["f",A.j(o.a),"p",A.j(o.b),"df1",o.c,"df2",o.d],h,c)
b4=A.q(["transform",a8.c,"availableTransforms",k,"suggestedTransform",a1,"originalMeans",b,"normality",a2,"homogeneity",a3,"kruskal",m],h,c)
if(J.y(c0.h(0,"factorial"),!0)){k=A.hP(q,s,i,r,t.g.a(c0.h(0,"orders")))
c=A.h4(h,c)
c.F(0,k)
c.F(0,b4)
return B.d.L(c,b8)}b5=s?A.fg(q):A.ff(q)
k=b5.c
b=b5.e
a1=b5.f
b6=i.a9(new A.am(k,b,a1,b5.gaK()),r)
a2=A.n(h,c)
a2.k(0,"kind","single")
a2.k(0,"design",b5.a)
a3=t.d
a4=A.a([],a3)
for(b1=b5.b,b2=b1.length,a=0;a<b1.length;b1.length===b2||(0,A.i)(b1),++a)a4.push(A.ei(b1[a]))
a2.k(0,"rows",a4)
a4=b5.d
a2.k(0,"grandMean",A.j(a4))
a2.k(0,"mse",A.j(b))
a2.k(0,"dfError",a1)
a2.k(0,"cv",A.j(Math.sqrt(b)/a4*100))
a2.k(0,"harmonicReps",A.j(b5.gaK()))
a2.k(0,"treatment",A.ei(b5.gbm()))
a3=A.a([],a3)
for(b=k.length,a=0;a<k.length;k.length===b||(0,A.i)(k),++a){b7=k[a]
a3.push(A.q(["trt",b7.a,"mean",A.j(b7.b),"n",b7.c],h,c))}a2.k(0,"means",a3)
a2.k(0,"postHoc",A.fb(b6))
a2.F(0,b4)
return B.d.L(a2,b8)},
hP(a3,a4,a5,a6,a7){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2
if(a7==null)s=null
else{s=A.a([],t.E)
for(r=J.P(a7),q=t.j,p=t.N;r.j();)s.push(J.cc(q.a(r.gm()),p))}o=A.ip(a3,s,a4)
n=new A.d2()
s=t.N
r=t.X
m=A.n(s,r)
for(q=o.gap(),p=q.length,l=t.d,k=o.c,j=t.K,i=0;i<q.length;q.length===p||(0,A.i)(q),++i){h=q[i]
if(h==="AxBxC"){g=A.a([],l)
for(f=J.P(k[2]);f.j();){e=f.gm()
d=A.n(s,r)
d.k(0,"slice",A.q(["factor",2,"level",e],s,j))
d.F(0,n.$1(o.aQ(a5,0,1,a6,new A.J(2,e))))
g.push(d)}m.k(0,h,g)}else{g=B.R.h(0,h)
g.toString
f=A.n(s,r)
f.k(0,"slice",null)
f.F(0,n.$1(o.bl(a5,g[0],g[1],a6)))
m.k(0,h,A.a([f],l))}}q=A.a([],l)
for(p=o.b,j=p.length,i=0;i<p.length;p.length===j||(0,A.i)(p),++i)q.push(A.ei(p[i]))
p=o.f
j=A.j(p)
g=o.r
f=A.j(g)
e=o.w
p=A.j(g<=0?0:100*Math.sqrt(g)/p)
d=o.gap()
c=A.a([],t.s)
for(b=o.gap(),a=b.length,i=0;i<b.length;b.length===a||(0,A.i)(b),++i){a0=b[i]
a1=o.bk(a0).f
if((a1==null?1:a1)<a6)c.push(a0)}l=A.a([],l)
for(b=t.t,a2=0;a2<k.length;++a2){a=A.n(s,r)
a.k(0,"factor",a2)
a.F(0,A.fb(a5.a9(new A.am(o.bi(a2),g,e,o.a8(A.a([a2],b))),a6)))
l.push(a)}return A.q(["kind","factorial","design",o.a,"rows",q,"levels",k,"grandMean",j,"mse",f,"dfError",e,"cv",p,"reps",o.e,"interactionSources",d,"significant",c,"main",l,"tables",m],s,r)},
hL(a){var s,r,q,p,o,n,m,l,k=null,j=A.eh(a.h(0,"data")),i=J.y(a.h(0,"rcbd"),!0),h=A.d0(a.h(0,"threshold"))
if(h==null)h=k
s=A.fi(j,i,h==null?3:h)
j=s.b
j=j==null?k:A.q(["w",A.j(j.a),"p",A.j(j.b),"n",j.c],t.N,t.X)
i=s.c
i=i==null?k:A.q(["f",A.j(i.a),"p",A.j(i.b),"df1",i.c,"df2",i.d],t.N,t.X)
h=A.a([],t.d)
for(r=s.a,q=r.length,p=t.N,o=t.X,n=0;n<r.length;r.length===q||(0,A.i)(r),++n){m=r[n]
l=m.a
h.push(A.q(["id",l.b,"trt",l.c,"block",l.d,"value",A.j(l.e),"fitted",A.j(m.b),"residual",A.j(m.c),"studentized",A.j(m.d),"trtMean",A.j(m.e)],p,o))}r=[]
for(q=s.gbj(),l=q.length,n=0;n<q.length;q.length===l||(0,A.i)(q),++n)r.push(q[n].a.b)
return B.d.L(A.q(["threshold",s.d,"normality",j,"homogeneity",i,"points",h,"outliers",r],p,o),k)},
il(a2){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0=t.N,a1=A.n(t.S,t.a)
for(s=t.f.a(a2.h(0,"byDay")).ak(0,a0,t.z).gY(),s=s.gn(s);s.j();){r=s.gm()
a1.k(0,A.iM(r.a),A.eh(r.b))}s=t.g.a(a2.h(0,"treatmentOrder"))
q=A.iw(a1,s==null?null:J.cc(s,a0))
a1=q.a
s=a1.length>=2&&q.b.length!==0
r=A.j(q.c)
p=A.j(q.d)
o=A.j(q.e)
n=A.j(q.f)
m=A.a([],t.c)
for(l=q.b,k=l.length,j=t.K,i=t.X,h=t.d,g=0;g<l.length;l.length===k||(0,A.i)(l),++g){f=l[g]
e=A.a([],h)
for(d=f.b,c=d.length,b=0;b<d.length;d.length===c||(0,A.i)(d),++b){a=d[b]
e.push(A.q(["day",a.a,"mean",A.j(a.b),"sd",A.j(a.c),"se",A.j(a.d),"n",a.e],a0,i))}m.push(A.q(["trt",f.a,"points",e],a0,j))}return B.d.L(A.q(["days",a1,"hasTrend",s,"minY",r,"maxY",p,"minYWithSe",o,"maxYWithSe",n,"series",m],a0,i),null)},
dQ:function dQ(){},
db:function db(a){this.a=a},
dc:function dc(){},
d3:function d3(a){this.a=a},
cZ:function cZ(a){this.a=a},
d_:function d_(){},
d2:function d2(){},
iP(){var s,r,q,p,o,n={}
for(s=$.eq(),s=new A.a3(s,s.r,s.e),r=A.hK;s.j();){q=s.d
p=new A.dW(q)
if(typeof p=="function")A.e1(A.bo("Attempting to rewrap a JS function."))
o=function(a,b){return function(c){return a(b,c,arguments.length)}}(r,p)
o[$.ep()]=p
n[q]=o}v.G.RancobCore=n},
dW:function dW(a){this.a=a},
ft(a){return v.mangledGlobalNames[a]},
iX(a){throw A.K(new A.bG("Field '"+a+"' has been assigned during initialization."),new Error())},
hK(a,b,c){if(c>=1)return a.$1(b)
return a.$0()}},B={}
var w=[A,J,B]
var $={}
A.e3.prototype={}
J.bA.prototype={
K(a,b){return a===b},
gv(a){return A.bL(a)},
p(a){return"Instance of '"+A.bM(a)+"'"},
gU(a){return A.a9(A.ef(this))}}
J.bC.prototype={
p(a){return String(a)},
gv(a){return a?519018:218159},
gU(a){return A.a9(t.y)},
$ia5:1,
$iH:1}
J.aP.prototype={
K(a,b){return null==b},
p(a){return"null"},
gv(a){return 0},
$ia5:1}
J.aC.prototype={$iaB:1}
J.ab.prototype={
gv(a){return 0},
p(a){return String(a)}}
J.cD.prototype={}
J.a7.prototype={}
J.aR.prototype={
p(a){var s=a[$.fw()]
if(s==null)s=a[$.ep()]
if(s==null)return this.aV(a)
return"JavaScript function for "+J.aw(s)}}
J.h.prototype={
a5(a,b){return new A.a_(a,A.W(a).i("@<1>").t(b).i("a_<1,2>"))},
I(a,b){a.$flags&1&&A.bl(a,29)
a.push(b)},
F(a,b){var s
a.$flags&1&&A.bl(a,"addAll",2)
if(Array.isArray(b)){this.aX(a,b)
return}for(s=J.P(b);s.j();)a.push(s.gm())},
aX(a,b){var s,r=b.length
if(r===0)return
if(a===b)throw A.c(A.v(a))
for(s=0;s<r;++s)a.push(b[s])},
T(a,b,c){return new A.D(a,b,A.W(a).i("@<1>").t(c).i("D<1,2>"))},
S(a,b){var s,r=A.aD(a.length,"",!1,t.N)
for(s=0;s<a.length;++s)r[s]=A.o(a[s])
return r.join(b)},
C(a,b){var s,r,q=a.length
if(q===0)throw A.c(A.ai())
s=a[0]
for(r=1;r<q;++r){s=b.$2(s,a[r])
if(q!==a.length)throw A.c(A.v(a))}return s},
R(a,b,c){var s,r,q=a.length
for(s=b,r=0;r<q;++r){s=c.$2(s,a[r])
if(a.length!==q)throw A.c(A.v(a))}return s},
A(a,b,c){return this.R(a,b,c,t.z)},
ao(a,b,c){var s,r,q=a.length
for(s=0;s<q;++s){r=a[s]
if(b.$1(r))return r
if(a.length!==q)throw A.c(A.v(a))}if(c!=null)return c.$0()
throw A.c(A.ai())},
an(a,b){return this.ao(a,b,null)},
E(a,b){return a[b]},
ga7(a){if(a.length>0)return a[0]
throw A.c(A.ai())},
gaN(a){var s=a.length
if(s>0)return a[s-1]
throw A.c(A.ai())},
P(a,b){var s,r=a.length
for(s=0;s<r;++s){if(b.$1(a[s]))return!0
if(a.length!==r)throw A.c(A.v(a))}return!1},
am(a,b){var s,r=a.length
for(s=0;s<r;++s){if(!b.$1(a[s]))return!1
if(a.length!==r)throw A.c(A.v(a))}return!0},
H(a,b){var s,r,q,p,o
a.$flags&2&&A.bl(a,"sort")
s=a.length
if(s<2)return
if(b==null)b=J.hZ()
if(s===2){r=a[0]
q=a[1]
if(b.$2(r,q)>0){a[0]=q
a[1]=r}return}p=0
if(A.W(a).c.b(null))for(o=0;o<a.length;++o)if(a[o]===void 0){a[o]=null;++p}a.sort(A.iz(b,2))
if(p>0)this.b5(a,p)},
a1(a){return this.H(a,null)},
b5(a,b){var s,r=a.length
for(;s=r-1,r>0;r=s)if(a[s]===null){a[s]=void 0;--b
if(b===0)break}},
aw(a,b){var s,r,q
a.$flags&2&&A.bl(a,"shuffle")
if(b==null)b=B.A
s=a.length
while(s>1){r=b.aO(s);--s
q=a[s]
a[s]=a[r]
a[r]=q}},
u(a,b){var s
for(s=0;s<a.length;++s)if(J.y(a[s],b))return!0
return!1},
gq(a){return a.length===0},
gN(a){return a.length!==0},
p(a){return A.e2(a,"[","]")},
gn(a){return new J.ay(a,a.length,A.W(a).i("ay<1>"))},
gv(a){return A.bL(a)},
gl(a){return a.length},
sl(a,b){a.$flags&1&&A.bl(a,"set length","change the length of")
if(b<0)throw A.c(A.aX(b,0,null,"newLength",null))
if(b>a.length)A.W(a).c.a(null)
a.length=b},
h(a,b){if(!(b>=0&&b<a.length))throw A.c(A.fj(a,b))
return a[b]},
k(a,b,c){a.$flags&2&&A.bl(a)
if(!(b>=0&&b<a.length))throw A.c(A.fj(a,b))
a[b]=c},
$ip:1,
$if:1,
$ik:1}
J.bB.prototype={
bo(a){var s,r,q
if(!Array.isArray(a))return null
s=a.$flags|0
if((s&4)!==0)r="const, "
else if((s&2)!==0)r="unmodifiable, "
else r=(s&1)!==0?"fixed, ":""
q="Instance of '"+A.bM(a)+"'"
if(r==="")return q
return q+" ("+r+"length: "+a.length+")"}}
J.cq.prototype={}
J.ay.prototype={
gm(){var s=this.d
return s==null?this.$ti.c.a(s):s},
j(){var s,r=this,q=r.a,p=q.length
if(r.b!==p)throw A.c(A.i(q))
s=r.c
if(s>=p){r.d=null
return!1}r.d=q[s]
r.c=s+1
return!0}}
J.aA.prototype={
B(a,b){var s
if(a<b)return-1
else if(a>b)return 1
else if(a===b){if(a===0){s=this.gar(b)
if(this.gar(a)===s)return 0
if(this.gar(a))return-1
return 1}return 0}else if(isNaN(a)){if(isNaN(b))return 0
return 1}else return-1},
gar(a){return a===0?1/a<0:a<0},
gaz(a){var s
if(a>0)s=1
else s=a<0?-1:a
return s},
a0(a){var s
if(a>=-2147483648&&a<=2147483647)return a|0
if(isFinite(a)){s=a<0?Math.ceil(a):Math.floor(a)
return s+0}throw A.c(A.eP(""+a+".toInt()"))},
W(a,b,c){if(B.b.B(b,c)>0)throw A.c(A.fh(b))
if(this.B(a,b)<0)return b
if(this.B(a,c)>0)return c
return a},
p(a){if(a===0&&1/a<0)return"-0.0"
else return""+a},
gv(a){var s,r,q,p,o=a|0
if(a===o)return o&536870911
s=Math.abs(a)
r=Math.log(s)/0.6931471805599453|0
q=Math.pow(2,r)
p=s<1?s/q:q/s
return((p*9007199254740992|0)+(p*3542243181176521|0))*599197+r*1259&536870911},
av(a,b){var s=a%b
if(s===0)return 0
if(s>0)return s
return s+b},
D(a,b){return(a|0)===a?a/b|0:this.b9(a,b)},
b9(a,b){var s=a/b
if(s>=-2147483648&&s<=2147483647)return s|0
if(s>0){if(s!==1/0)return Math.floor(s)}else if(s>-1/0)return Math.ceil(s)
throw A.c(A.eP("Result of truncating division is "+A.o(s)+": "+A.o(a)+" ~/ "+b))},
aT(a,b){if(b<0)throw A.c(A.fh(b))
return b>31?0:a<<b>>>0},
b7(a,b){return b>31?0:a<<b>>>0},
aG(a,b){var s
if(a>0)s=this.b8(a,b)
else{s=b>31?31:b
s=a>>s>>>0}return s},
b8(a,b){return b>31?0:a>>>b},
gU(a){return A.a9(t.H)},
$ia0:1,
$ib:1}
J.az.prototype={
gaz(a){var s
if(a>0)s=1
else s=a<0?-1:a
return s},
gU(a){return A.a9(t.S)},
$ia5:1,
$id:1}
J.aQ.prototype={
gU(a){return A.a9(t.i)},
$ia5:1}
J.aj.prototype={
a2(a,b,c){return a.substring(b,A.ha(b,c,a.length))},
bn(a){var s,r,q,p=a.trim(),o=p.length
if(o===0)return p
if(p.charCodeAt(0)===133){s=J.h2(p,1)
if(s===o)return""}else s=0
r=o-1
q=p.charCodeAt(r)===133?J.h3(p,r):o
if(s===0&&q===o)return p
return p.substring(s,q)},
B(a,b){var s
if(a===b)s=0
else s=a<b?-1:1
return s},
p(a){return a},
gv(a){var s,r,q
for(s=a.length,r=0,q=0;q<s;++q){r=r+a.charCodeAt(q)&536870911
r=r+((r&524287)<<10)&536870911
r^=r>>6}r=r+((r&67108863)<<3)&536870911
r^=r>>11
return r+((r&16383)<<15)&536870911},
gU(a){return A.a9(t.N)},
gl(a){return a.length},
$ia5:1,
$ia0:1,
$ie:1}
A.a8.prototype={
gn(a){return new A.br(J.P(this.gO()),A.m(this).i("br<1,2>"))},
gl(a){return J.u(this.gO())},
gq(a){return J.et(this.gO())},
gN(a){return J.eu(this.gO())},
u(a,b){return J.es(this.gO(),b)},
p(a){return J.aw(this.gO())}}
A.br.prototype={
j(){return this.a.j()},
gm(){return this.$ti.y[1].a(this.a.gm())}}
A.af.prototype={
gO(){return this.a}}
A.b7.prototype={$ip:1}
A.b6.prototype={
h(a,b){return this.$ti.y[1].a(J.er(this.a,b))},
k(a,b,c){J.fI(this.a,b,this.$ti.c.a(c))},
sl(a,b){J.fQ(this.a,b)},
I(a,b){J.av(this.a,this.$ti.c.a(b))},
H(a,b){var s=b==null?null:new A.cN(this,b)
J.ev(this.a,s)},
$ip:1,
$ik:1}
A.cN.prototype={
$2(a,b){var s=this.a.$ti.y[1]
return this.b.$2(s.a(a),s.a(b))},
$S(){return this.a.$ti.i("d(1,1)")}}
A.a_.prototype={
a5(a,b){return new A.a_(this.a,this.$ti.i("@<1>").t(b).i("a_<1,2>"))},
gO(){return this.a}}
A.ag.prototype={
ak(a,b,c){return new A.ag(this.a,this.$ti.i("@<1,2>").t(b).t(c).i("ag<1,2,3,4>"))},
h(a,b){return this.$ti.i("4?").a(this.a.h(0,b))},
M(a,b){this.a.M(0,new A.cg(this,b))},
gG(){var s=this.$ti
return A.eA(this.a.gG(),s.c,s.y[2])},
gl(a){var s=this.a
return s.gl(s)},
gq(a){var s=this.a
return s.gq(s)},
gY(){return this.a.gY().T(0,new A.cf(this),this.$ti.i("C<3,4>"))}}
A.cg.prototype={
$2(a,b){var s=this.a.$ti
this.b.$2(s.y[2].a(a),s.y[3].a(b))},
$S(){return this.a.$ti.i("~(1,2)")}}
A.cf.prototype={
$1(a){var s=this.a.$ti
return new A.C(s.y[2].a(a.a),s.y[3].a(a.b),s.i("C<3,4>"))},
$S(){return this.a.$ti.i("C<3,4>(C<1,2>)")}}
A.bG.prototype={
p(a){return"LateInitializationError: "+this.a}}
A.cH.prototype={}
A.p.prototype={}
A.T.prototype={
gn(a){var s=this
return new A.X(s,s.gl(s),A.m(s).i("X<T.E>"))},
gq(a){return this.gl(this)===0},
u(a,b){var s,r=this,q=r.gl(r)
for(s=0;s<q;++s){if(J.y(r.E(0,s),b))return!0
if(q!==r.gl(r))throw A.c(A.v(r))}return!1},
S(a,b){var s,r,q,p=this,o=p.gl(p)
if(b.length!==0){if(o===0)return""
s=A.o(p.E(0,0))
if(o!==p.gl(p))throw A.c(A.v(p))
for(r=s,q=1;q<o;++q){r=r+b+A.o(p.E(0,q))
if(o!==p.gl(p))throw A.c(A.v(p))}return r.charCodeAt(0)==0?r:r}else{for(q=0,r="";q<o;++q){r+=A.o(p.E(0,q))
if(o!==p.gl(p))throw A.c(A.v(p))}return r.charCodeAt(0)==0?r:r}},
T(a,b,c){return new A.D(this,b,A.m(this).i("@<T.E>").t(c).i("D<1,2>"))},
R(a,b,c){var s,r,q=this,p=q.gl(q)
for(s=b,r=0;r<p;++r){s=c.$2(s,q.E(0,r))
if(p!==q.gl(q))throw A.c(A.v(q))}return s},
A(a,b,c){return this.R(0,b,c,t.z)}}
A.X.prototype={
gm(){var s=this.d
return s==null?this.$ti.c.a(s):s},
j(){var s,r=this,q=r.a,p=q.gl(q)
if(r.b!==p)throw A.c(A.v(q))
s=r.c
if(s>=p){r.d=null
return!1}r.d=q.E(0,s);++r.c
return!0}}
A.al.prototype={
gn(a){return new A.bK(J.P(this.a),this.b,A.m(this).i("bK<1,2>"))},
gl(a){return J.u(this.a)},
gq(a){return J.et(this.a)}}
A.aN.prototype={$ip:1}
A.bK.prototype={
j(){var s=this,r=s.b
if(r.j()){s.a=s.c.$1(r.gm())
return!0}s.a=null
return!1},
gm(){var s=this.a
return s==null?this.$ti.y[1].a(s):s}}
A.D.prototype={
gl(a){return J.u(this.a)},
E(a,b){return this.b.$1(J.fJ(this.a,b))}}
A.b5.prototype={
gn(a){return new A.bW(J.P(this.a),this.b)}}
A.bW.prototype={
j(){var s,r
for(s=this.a,r=this.b;s.j();)if(r.$1(s.gm()))return!0
return!1},
gm(){return this.a.gm()}}
A.bg.prototype={}
A.J.prototype={$r:"+(1,2)",$s:1}
A.c5.prototype={$r:"+lower,upper(1,2)",$s:2}
A.c6.prototype={$r:"+idx,trt,val(1,2,3)",$s:3}
A.c7.prototype={$r:"+i,j,pRaw,z(1,2,3,4)",$s:4}
A.c8.prototype={$r:"+mean,meanRank,median,n,trt(1,2,3,4,5)",$s:5}
A.aL.prototype={
ak(a,b,c){var s=A.m(this)
return A.eJ(this,s.c,s.y[1],b,c)},
gq(a){return this.gl(this)===0},
p(a){return A.e5(this)},
gY(){return new A.aG(this.be(),A.m(this).i("aG<C<1,2>>"))},
be(){var s=this
return function(){var r=0,q=1,p=[],o,n,m
return function $async$gY(a,b,c){if(b===1){p.push(c)
r=q}for(;;)switch(r){case 0:o=s.gG(),o=o.gn(o),n=A.m(s).i("C<1,2>")
case 2:if(!o.j()){r=3
break}m=o.gm()
r=4
return a.b=new A.C(m,s.h(0,m),n),1
case 4:r=2
break
case 3:return 0
case 1:return a.c=p.at(-1),3}}}},
$iB:1}
A.aM.prototype={
gl(a){return this.b.length},
gaD(){var s=this.$keys
if(s==null){s=Object.keys(this.a)
this.$keys=s}return s},
X(a){if(typeof a!="string")return!1
if("__proto__"===a)return!1
return this.a.hasOwnProperty(a)},
h(a,b){if(!this.X(b))return null
return this.b[this.a[b]]},
M(a,b){var s,r,q=this.gaD(),p=this.b
for(s=q.length,r=0;r<s;++r)b.$2(q[r],p[r])},
gG(){return new A.b8(this.gaD(),this.$ti.i("b8<1>"))}}
A.b8.prototype={
gl(a){return this.a.length},
gq(a){return 0===this.a.length},
gN(a){return 0!==this.a.length},
gn(a){var s=this.a
return new A.c0(s,s.length,this.$ti.i("c0<1>"))}}
A.c0.prototype={
gm(){var s=this.d
return s==null?this.$ti.c.a(s):s},
j(){var s=this,r=s.c
if(r>=s.b){s.d=null
return!1}s.d=s.a[r]
s.c=r+1
return!0}}
A.cp.prototype={
K(a,b){if(b==null)return!1
return b instanceof A.a1&&this.a.K(0,b.a)&&A.en(this)===A.en(b)},
gv(a){return A.cC(this.a,A.en(this),B.e,B.e)},
p(a){var s=B.a.S([A.a9(this.$ti.c)],", ")
return this.a.p(0)+" with "+("<"+s+">")}}
A.a1.prototype={
$2(a,b){return this.a.$1$2(a,b,this.$ti.y[0])},
$S(){return A.iL(A.dM(this.a),this.$ti)}}
A.aY.prototype={}
A.cL.prototype={
J(a){var s,r,q=this,p=new RegExp(q.a).exec(a)
if(p==null)return null
s=Object.create(null)
r=q.b
if(r!==-1)s.arguments=p[r+1]
r=q.c
if(r!==-1)s.argumentsExpr=p[r+1]
r=q.d
if(r!==-1)s.expr=p[r+1]
r=q.e
if(r!==-1)s.method=p[r+1]
r=q.f
if(r!==-1)s.receiver=p[r+1]
return s}}
A.aV.prototype={
p(a){return"Null check operator used on a null value"}}
A.bD.prototype={
p(a){var s,r=this,q="NoSuchMethodError: method not found: '",p=r.b
if(p==null)return"NoSuchMethodError: "+r.a
s=r.c
if(s==null)return q+p+"' ("+r.a+")"
return q+p+"' on '"+s+"' ("+r.a+")"}}
A.bV.prototype={
p(a){var s=this.a
return s.length===0?"Error":"Error: "+s}}
A.cB.prototype={
p(a){return"Throw of null ('"+(this.a===null?"null":"undefined")+"' from JavaScript)"}}
A.ah.prototype={
p(a){var s=this.constructor,r=s==null?null:s.name
return"Closure '"+A.fu(r==null?"unknown":r)+"'"},
gbr(){return this},
$C:"$1",
$R:1,
$D:null}
A.ch.prototype={$C:"$0",$R:0}
A.ci.prototype={$C:"$2",$R:2}
A.cK.prototype={}
A.cI.prototype={
p(a){var s=this.$static_name
if(s==null)return"Closure of unknown static method"
return"Closure '"+A.fu(s)+"'"}}
A.aK.prototype={
K(a,b){if(b==null)return!1
if(this===b)return!0
if(!(b instanceof A.aK))return!1
return this.$_target===b.$_target&&this.a===b.a},
gv(a){return(A.fq(this.a)^A.bL(this.$_target))>>>0},
p(a){return"Closure '"+this.$_name+"' of "+("Instance of '"+A.bM(this.a)+"'")}}
A.bP.prototype={
p(a){return"RuntimeError: "+this.a}}
A.a2.prototype={
gl(a){return this.a},
gq(a){return this.a===0},
gG(){return new A.ak(this,A.m(this).i("ak<1>"))},
gY(){return new A.x(this,A.m(this).i("x<1,2>"))},
X(a){var s=this.b
if(s==null)return!1
return s[a]!=null},
F(a,b){b.M(0,new A.cr(this))},
h(a,b){var s,r,q,p,o=null
if(typeof b=="string"){s=this.b
if(s==null)return o
r=s[b]
q=r==null?o:r.b
return q}else if(typeof b=="number"&&(b&0x3fffffff)===b){p=this.c
if(p==null)return o
r=p[b]
q=r==null?o:r.b
return q}else return this.bg(b)},
bg(a){var s,r,q=this.d
if(q==null)return null
s=this.b1(q,a)
r=this.aM(s,a)
if(r<0)return null
return s[r].b},
k(a,b,c){var s,r,q=this
if(typeof b=="string"){s=q.b
q.aB(s==null?q.b=q.ah():s,b,c)}else if(typeof b=="number"&&(b&0x3fffffff)===b){r=q.c
q.aB(r==null?q.c=q.ah():r,b,c)}else q.bh(b,c)},
bh(a,b){var s,r,q,p=this,o=p.d
if(o==null)o=p.d=p.ah()
s=p.aL(a)
r=o[s]
if(r==null)o[s]=[p.ai(a,b)]
else{q=p.aM(r,a)
if(q>=0)r[q].b=b
else r.push(p.ai(a,b))}},
M(a,b){var s=this,r=s.e,q=s.r
while(r!=null){b.$2(r.a,r.b)
if(q!==s.r)throw A.c(A.v(s))
r=r.c}},
aB(a,b,c){var s=a[b]
if(s==null)a[b]=this.ai(b,c)
else s.b=c},
ai(a,b){var s=this,r=new A.cw(a,b)
if(s.e==null)s.e=s.f=r
else s.f=s.f.c=r;++s.a
s.r=s.r+1&1073741823
return r},
aL(a){return J.O(a)&1073741823},
b1(a,b){return a[this.aL(b)]},
aM(a,b){var s,r
if(a==null)return-1
s=a.length
for(r=0;r<s;++r)if(J.y(a[r].a,b))return r
return-1},
p(a){return A.e5(this)},
ah(){var s=Object.create(null)
s["<non-identifier-key>"]=s
delete s["<non-identifier-key>"]
return s}}
A.cr.prototype={
$2(a,b){this.a.k(0,a,b)},
$S(){return A.m(this.a).i("~(1,2)")}}
A.cw.prototype={}
A.ak.prototype={
gl(a){return this.a.a},
gq(a){return this.a.a===0},
gn(a){var s=this.a
return new A.a3(s,s.r,s.e)},
u(a,b){return this.a.X(b)}}
A.a3.prototype={
gm(){return this.d},
j(){var s,r=this,q=r.a
if(r.b!==q.r)throw A.c(A.v(q))
s=r.c
if(s==null){r.d=null
return!1}else{r.d=s.a
r.c=s.c
return!0}}}
A.E.prototype={
gl(a){return this.a.a},
gq(a){return this.a.a===0},
gn(a){var s=this.a
return new A.aT(s,s.r,s.e)}}
A.aT.prototype={
gm(){return this.d},
j(){var s,r=this,q=r.a
if(r.b!==q.r)throw A.c(A.v(q))
s=r.c
if(s==null){r.d=null
return!1}else{r.d=s.b
r.c=s.c
return!0}}}
A.x.prototype={
gl(a){return this.a.a},
gq(a){return this.a.a===0},
gn(a){var s=this.a
return new A.bH(s,s.r,s.e,this.$ti.i("bH<1,2>"))}}
A.bH.prototype={
gm(){var s=this.d
s.toString
return s},
j(){var s,r=this,q=r.a
if(r.b!==q.r)throw A.c(A.v(q))
s=r.c
if(s==null){r.d=null
return!1}else{r.d=new A.C(s.a,s.b,r.$ti.i("C<1,2>"))
r.c=s.c
return!0}}}
A.b9.prototype={
p(a){return this.aH(!1)},
aH(a){var s,r,q,p,o,n=this.b0(),m=this.a4(),l=(a?"Record ":"")+"("
for(s=n.length,r="",q=0;q<s;++q,r=", "){l+=r
p=n[q]
if(typeof p=="string")l=l+p+": "
o=m[q]
l=a?l+A.eL(o):l+A.o(o)}l+=")"
return l.charCodeAt(0)==0?l:l},
b0(){var s,r=this.$s
while($.cV.length<=r)$.cV.push(null)
s=$.cV[r]
if(s==null){s=this.aY()
$.cV[r]=s}return s},
aY(){var s,r,q,p=this.$r,o=p.indexOf("("),n=p.substring(1,o),m=p.substring(o),l=m==="()"?0:m.replace(/[^,]/g,"").length+1,k=t.K,j=J.eF(l,k)
for(s=0;s<l;++s)j[s]=s
if(n!==""){r=n.split(",")
s=r.length
for(q=l;s>0;){--q;--s
j[q]=r[s]}}j=A.h6(j,!1,k)
j.$flags=3
return j}}
A.c2.prototype={
a4(){return[this.a,this.b]},
K(a,b){if(b==null)return!1
return b instanceof A.c2&&this.$s===b.$s&&J.y(this.a,b.a)&&J.y(this.b,b.b)},
gv(a){return A.cC(this.$s,this.a,this.b,B.e)}}
A.c3.prototype={
a4(){return[this.a,this.b,this.c]},
K(a,b){var s=this
if(b==null)return!1
return b instanceof A.c3&&s.$s===b.$s&&J.y(s.a,b.a)&&J.y(s.b,b.b)&&J.y(s.c,b.c)},
gv(a){var s=this
return A.cC(s.$s,s.a,s.b,s.c)}}
A.c4.prototype={
a4(){return this.a},
K(a,b){if(b==null)return!1
return b instanceof A.c4&&this.$s===b.$s&&A.hp(this.a,b.a)},
gv(a){return A.cC(this.$s,A.h7(this.a),B.e,B.e)}}
A.V.prototype={
i(a){return A.bf(v.typeUniverse,this,a)},
t(a){return A.f_(v.typeUniverse,this,a)}}
A.bY.prototype={}
A.cW.prototype={
p(a){return A.Q(this.a,null)}}
A.bX.prototype={
p(a){return this.a}}
A.bb.prototype={}
A.c9.prototype={
gm(){return this.b},
b6(a,b){var s,r,q
a=a
b=b
s=this.a
for(;;)try{r=s(this,a,b)
return r}catch(q){b=q
a=1}},
j(){var s,r,q,p,o=this,n=null,m=0
for(;;){s=o.d
if(s!=null)try{if(s.j()){o.b=s.gm()
return!0}else o.d=null}catch(r){n=r
m=1
o.d=null}q=o.b6(m,n)
if(1===q)return!0
if(0===q){o.b=null
p=o.e
if(p==null||p.length===0){o.a=A.eU
return!1}o.a=p.pop()
m=0
n=null
continue}if(2===q){m=0
n=null
continue}if(3===q){n=o.c
o.c=null
p=o.e
if(p==null||p.length===0){o.b=null
o.a=A.eU
throw n
return!1}o.a=p.pop()
m=1
continue}throw A.c(A.he("sync*"))}return!1},
bs(a){var s,r,q=this
if(a instanceof A.aG){s=a.a()
r=q.e
if(r==null)r=q.e=[]
r.push(q.a)
q.a=s
return 2}else{q.d=J.P(a)
return 2}}}
A.aG.prototype={
gn(a){return new A.c9(this.a())}}
A.an.prototype={
gn(a){var s=this,r=new A.ac(s,s.r,A.m(s).i("ac<1>"))
r.c=s.e
return r},
gl(a){return this.a},
gq(a){return this.a===0},
gN(a){return this.a!==0},
u(a,b){var s,r
if(typeof b=="string"&&b!=="__proto__"){s=this.b
if(s==null)return!1
return s[b]!=null}else if(typeof b=="number"&&(b&1073741823)===b){r=this.c
if(r==null)return!1
return r[b]!=null}else return this.aZ(b)},
aZ(a){var s=this.d
if(s==null)return!1
return this.ag(s[this.ad(a)],a)>=0},
I(a,b){var s,r,q=this
if(typeof b=="string"&&b!=="__proto__"){s=q.b
return q.aC(s==null?q.b=A.e9():s,b)}else if(typeof b=="number"&&(b&1073741823)===b){r=q.c
return q.aC(r==null?q.c=A.e9():r,b)}else return q.aW(b)},
aW(a){var s,r,q=this,p=q.d
if(p==null)p=q.d=A.e9()
s=q.ad(a)
r=p[s]
if(r==null)p[s]=[q.ac(a)]
else{if(q.ag(r,a)>=0)return!1
r.push(q.ac(a))}return!0},
aP(a,b){if((b&1073741823)===b)return this.b4(this.c,b)
else return this.b3(b)},
b3(a){var s,r,q,p,o=this,n=o.d
if(n==null)return!1
s=o.ad(a)
r=n[s]
q=o.ag(r,a)
if(q<0)return!1
p=r.splice(q,1)[0]
if(0===r.length)delete n[s]
o.aI(p)
return!0},
aC(a,b){if(a[b]!=null)return!1
a[b]=this.ac(b)
return!0},
b4(a,b){var s
if(a==null)return!1
s=a[b]
if(s==null)return!1
this.aI(s)
delete a[b]
return!0},
aE(){this.r=this.r+1&1073741823},
ac(a){var s,r=this,q=new A.cU(a)
if(r.e==null)r.e=r.f=q
else{s=r.f
s.toString
q.c=s
r.f=s.b=q}++r.a
r.aE()
return q},
aI(a){var s=this,r=a.c,q=a.b
if(r==null)s.e=q
else r.b=q
if(q==null)s.f=r
else q.c=r;--s.a
s.aE()},
ad(a){return J.O(a)&1073741823},
ag(a,b){var s,r
if(a==null)return-1
s=a.length
for(r=0;r<s;++r)if(J.y(a[r].a,b))return r
return-1}}
A.cU.prototype={}
A.ac.prototype={
gm(){var s=this.d
return s==null?this.$ti.c.a(s):s},
j(){var s=this,r=s.c,q=s.a
if(s.b!==q.r)throw A.c(A.v(q))
else if(r==null){s.d=null
return!1}else{s.d=r.a
s.c=r.b
return!0}}}
A.N.prototype={
gn(a){return new A.X(this,this.gl(0),this.$ti.i("X<N.E>"))},
E(a,b){return this.$ti.y[1].a(J.er(this.a,b))},
gq(a){return J.u(this.a)===0},
gN(a){return J.u(this.a)!==0},
u(a,b){var s,r,q=this.a,p=J.L(q),o=p.gl(q)
for(s=this.$ti.y[1],r=0;r<o;++r){if(J.y(s.a(p.h(q,r)),b))return!0
if(o!==p.gl(q))throw A.c(A.v(this))}return!1},
am(a,b){var s,r,q=this.a,p=J.L(q),o=p.gl(q)
for(s=this.$ti.y[1],r=0;r<o;++r){if(!b.$1(s.a(p.h(q,r))))return!1
if(o!==p.gl(q))throw A.c(A.v(this))}return!0},
S(a,b){var s
if(J.u(this.a)===0)return""
s=A.e7("",this,b)
return s.charCodeAt(0)==0?s:s},
T(a,b,c){return new A.D(this,b,this.$ti.i("@<N.E>").t(c).i("D<1,2>"))},
C(a,b){var s,r,q,p=this.a,o=J.L(p),n=o.gl(p)
if(n===0)throw A.c(A.ai())
s=this.$ti.y[1]
r=s.a(o.h(p,0))
for(q=1;q<n;++q){r=b.$2(r,s.a(o.h(p,q)))
if(n!==o.gl(p))throw A.c(A.v(this))}return r},
R(a,b,c){var s,r,q,p=this.a,o=J.L(p),n=o.gl(p)
for(s=this.$ti.y[1],r=b,q=0;q<n;++q){r=c.$2(r,s.a(o.h(p,q)))
if(n!==o.gl(p))throw A.c(A.v(this))}return r},
A(a,b,c){return this.R(0,b,c,t.z)},
I(a,b){var s=this.a,r=J.L(s),q=r.gl(s)
r.sl(s,q+1)
r.k(s,q,this.$ti.c.a(b))},
a5(a,b){return new A.a_(this,this.$ti.i("@<N.E>").t(b).i("a_<1,2>"))},
H(a,b){var s=b==null?A.iy():b
A.bR(this,0,J.u(this.a)-1,s)},
bf(a,b){var s,r,q,p
for(s=this.a,r=J.L(s),q=this.$ti.y[1],p=0;p<r.gl(s);++p)if(J.y(q.a(r.h(s,p)),b))return p
return-1},
p(a){return A.e2(this,"[","]")}}
A.r.prototype={
ak(a,b,c){var s=A.m(this)
return A.eJ(this,s.i("r.K"),s.i("r.V"),b,c)},
M(a,b){var s,r,q,p
for(s=this.gG(),s=s.gn(s),r=A.m(this).i("r.V");s.j();){q=s.gm()
p=this.h(0,q)
b.$2(q,p==null?r.a(p):p)}},
gY(){return this.gG().T(0,new A.cy(this),A.m(this).i("C<r.K,r.V>"))},
gl(a){var s=this.gG()
return s.gl(s)},
gq(a){var s=this.gG()
return s.gq(s)},
p(a){return A.e5(this)},
$iB:1}
A.cy.prototype={
$1(a){var s=this.a,r=s.h(0,a)
if(r==null)r=A.m(s).i("r.V").a(r)
return new A.C(a,r,A.m(s).i("C<r.K,r.V>"))},
$S(){return A.m(this.a).i("C<r.K,r.V>(r.K)")}}
A.cz.prototype={
$2(a,b){var s,r=this.a
if(!r.a)this.b.a+=", "
r.a=!1
r=this.b
s=A.o(a)
r.a=(r.a+=s)+": "
s=A.o(b)
r.a+=s},
$S:10}
A.aF.prototype={
gq(a){return this.a===0},
gN(a){return this.a!==0},
F(a,b){var s,r,q
for(s=A.e8(b,b.r,A.m(b).c),r=s.$ti.c;s.j();){q=s.d
this.I(0,q==null?r.a(q):q)}},
aJ(a){var s,r,q
for(s=A.e8(a,a.r,A.m(a).c),r=s.$ti.c;s.j();){q=s.d
if(!this.u(0,q==null?r.a(q):q))return!1}return!0},
p(a){return A.e2(this,"{","}")},
C(a,b){var s,r,q,p=A.e8(this,this.r,A.m(this).c)
if(!p.j())throw A.c(A.ai())
s=p.d
if(s==null)s=p.$ti.c.a(s)
for(r=p.$ti.c;p.j();){q=p.d
s=b.$2(s,q==null?r.a(q):q)}return s},
$ip:1,
$if:1,
$iY:1}
A.ba.prototype={}
A.bZ.prototype={
h(a,b){var s,r=this.b
if(r==null)return this.c.h(0,b)
else if(typeof b!="string")return null
else{s=r[b]
return typeof s=="undefined"?this.b2(b):s}},
gl(a){return this.b==null?this.c.a:this.a3().length},
gq(a){return this.gl(0)===0},
gG(){if(this.b==null){var s=this.c
return new A.ak(s,A.m(s).i("ak<1>"))}return new A.c_(this)},
X(a){if(this.b==null)return this.c.X(a)
return Object.prototype.hasOwnProperty.call(this.a,a)},
M(a,b){var s,r,q,p,o=this
if(o.b==null)return o.c.M(0,b)
s=o.a3()
for(r=0;r<s.length;++r){q=s[r]
p=o.b[q]
if(typeof p=="undefined"){p=A.d1(o.a[q])
o.b[q]=p}b.$2(q,p)
if(s!==o.c)throw A.c(A.v(o))}},
a3(){var s=this.c
if(s==null)s=this.c=A.a(Object.keys(this.a),t.s)
return s},
b2(a){var s
if(!Object.prototype.hasOwnProperty.call(this.a,a))return null
s=A.d1(this.a[a])
return this.b[a]=s}}
A.c_.prototype={
gl(a){return this.a.gl(0)},
E(a,b){var s=this.a
return s.b==null?s.gG().E(0,b):s.a3()[b]},
gn(a){var s=this.a
if(s.b==null){s=s.gG()
s=s.gn(s)}else{s=s.a3()
s=new J.ay(s,s.length,A.W(s).i("ay<1>"))}return s},
u(a,b){return this.a.X(b)}}
A.bs.prototype={}
A.bu.prototype={}
A.aS.prototype={
p(a){var s=A.bx(this.a)
return(this.b!=null?"Converting object to an encodable object failed:":"Converting object did not return an encodable object:")+" "+s}}
A.bE.prototype={
p(a){return"Cyclic error in JSON stringify"}}
A.cs.prototype={
bb(a,b){var s=A.ic(a,this.gbc().a)
return s},
L(a,b){var s=A.hg(a,this.gbd().b,null)
return s},
gbd(){return B.E},
gbc(){return B.D}}
A.cu.prototype={}
A.ct.prototype={}
A.cS.prototype={
aS(a){var s,r,q,p,o,n,m=a.length
for(s=this.c,r=0,q=0;q<m;++q){p=a.charCodeAt(q)
if(p>92){if(p>=55296){o=p&64512
if(o===55296){n=q+1
n=!(n<m&&(a.charCodeAt(n)&64512)===56320)}else n=!1
if(!n)if(o===56320){o=q-1
o=!(o>=0&&(a.charCodeAt(o)&64512)===55296)}else o=!1
else o=!0
if(o){if(q>r)s.a+=B.f.a2(a,r,q)
r=q+1
o=A.I(92)
s.a+=o
o=A.I(117)
s.a+=o
o=A.I(100)
s.a+=o
o=p>>>8&15
o=A.I(o<10?48+o:87+o)
s.a+=o
o=p>>>4&15
o=A.I(o<10?48+o:87+o)
s.a+=o
o=p&15
o=A.I(o<10?48+o:87+o)
s.a+=o}}continue}if(p<32){if(q>r)s.a+=B.f.a2(a,r,q)
r=q+1
o=A.I(92)
s.a+=o
switch(p){case 8:o=A.I(98)
s.a+=o
break
case 9:o=A.I(116)
s.a+=o
break
case 10:o=A.I(110)
s.a+=o
break
case 12:o=A.I(102)
s.a+=o
break
case 13:o=A.I(114)
s.a+=o
break
default:o=A.I(117)
s.a+=o
o=A.I(48)
s.a=(s.a+=o)+o
o=p>>>4&15
o=A.I(o<10?48+o:87+o)
s.a+=o
o=p&15
o=A.I(o<10?48+o:87+o)
s.a+=o
break}}else if(p===34||p===92){if(q>r)s.a+=B.f.a2(a,r,q)
r=q+1
o=A.I(92)
s.a+=o
o=A.I(p)
s.a+=o}}if(r===0)s.a+=a
else if(r<m)s.a+=B.f.a2(a,r,m)},
ab(a){var s,r,q,p
for(s=this.a,r=s.length,q=0;q<r;++q){p=s[q]
if(a==null?p==null:a===p)throw A.c(new A.bE(a,null))}s.push(a)},
aa(a){var s,r,q,p,o=this
if(o.aR(a))return
o.ab(a)
try{s=o.b.$1(a)
if(!o.aR(s)){q=A.eH(a,null,o.gaF())
throw A.c(q)}o.a.pop()}catch(p){r=A.ca(p)
q=A.eH(a,r,o.gaF())
throw A.c(q)}},
aR(a){var s,r,q=this
if(typeof a=="number"){if(!isFinite(a))return!1
q.c.a+=B.c.p(a)
return!0}else if(a===!0){q.c.a+="true"
return!0}else if(a===!1){q.c.a+="false"
return!0}else if(a==null){q.c.a+="null"
return!0}else if(typeof a=="string"){s=q.c
s.a+='"'
q.aS(a)
s.a+='"'
return!0}else if(t.j.b(a)){q.ab(a)
q.bp(a)
q.a.pop()
return!0}else if(t.f.b(a)){q.ab(a)
r=q.bq(a)
q.a.pop()
return r}else return!1},
bp(a){var s,r,q=this.c
q.a+="["
s=J.w(a)
if(s.gN(a)){this.aa(s.h(a,0))
for(r=1;r<s.gl(a);++r){q.a+=","
this.aa(s.h(a,r))}}q.a+="]"},
bq(a){var s,r,q,p,o,n=this,m={}
if(a.gq(a)){n.c.a+="{}"
return!0}s=a.gl(a)*2
r=A.aD(s,null,!1,t.X)
q=m.a=0
m.b=!0
a.M(0,new A.cT(m,r))
if(!m.b)return!1
p=n.c
p.a+="{"
for(o='"';q<s;q+=2,o=',"'){p.a+=o
n.aS(A.ec(r[q]))
p.a+='":'
n.aa(r[q+1])}p.a+="}"
return!0}}
A.cT.prototype={
$2(a,b){var s,r,q,p
if(typeof a!="string")this.a.b=!1
s=this.b
r=this.a
q=r.a
p=r.a=q+1
s[q]=a
r.a=p+1
s[p]=b},
$S:10}
A.cR.prototype={
gaF(){var s=this.c.a
return s.charCodeAt(0)==0?s:s}}
A.cO.prototype={
p(a){return this.b_()}}
A.t.prototype={}
A.bp.prototype={
p(a){var s=this.a
if(s!=null)return"Assertion failed: "+A.bx(s)
return"Assertion failed"}}
A.b3.prototype={}
A.aa.prototype={
gaf(){return"Invalid argument"+(!this.a?"(s)":"")},
gae(){return""},
p(a){var s=this,r=s.c,q=r==null?"":" ("+r+")",p=s.d,o=p==null?"":": "+p,n=s.gaf()+q+o
if(!s.a)return n
return n+s.gae()+": "+A.bx(s.gaq())},
gaq(){return this.b}}
A.aE.prototype={
gaq(){return this.b},
gaf(){return"RangeError"},
gae(){var s,r=this.e,q=this.f
if(r==null)s=q!=null?": Not less than or equal to "+A.o(q):""
else if(q==null)s=": Not greater than or equal to "+A.o(r)
else if(q>r)s=": Not in inclusive range "+A.o(r)+".."+A.o(q)
else s=q<r?": Valid value range is empty":": Only valid value is "+A.o(r)
return s}}
A.bz.prototype={
gaq(){return this.b},
gaf(){return"RangeError"},
gae(){if(this.b<0)return": index must not be negative"
var s=this.f
if(s===0)return": no indices are valid"
return": index should be less than "+s},
gl(a){return this.f}}
A.b4.prototype={
p(a){return"Unsupported operation: "+this.a}}
A.b0.prototype={
p(a){return"Bad state: "+this.a}}
A.bt.prototype={
p(a){var s=this.a
if(s==null)return"Concurrent modification during iteration."
return"Concurrent modification during iteration: "+A.bx(s)+"."}}
A.b_.prototype={
p(a){return"Stack Overflow"},
$it:1}
A.cP.prototype={
p(a){return"Exception: "+this.a}}
A.co.prototype={
p(a){var s=this.a,r=""!==s?"FormatException: "+s:"FormatException"
return r}}
A.f.prototype={
a5(a,b){return A.eA(this,A.m(this).i("f.E"),b)},
T(a,b,c){return A.cA(this,b,A.m(this).i("f.E"),c)},
u(a,b){var s
for(s=this.gn(this);s.j();)if(J.y(s.gm(),b))return!0
return!1},
C(a,b){var s,r=this.gn(this)
if(!r.j())throw A.c(A.ai())
s=r.gm()
while(r.j())s=b.$2(s,r.gm())
return s},
R(a,b,c){var s,r
for(s=this.gn(this),r=b;s.j();)r=c.$2(r,s.gm())
return r},
A(a,b,c){return this.R(0,b,c,t.z)},
am(a,b){var s
for(s=this.gn(this);s.j();)if(!b.$1(s.gm()))return!1
return!0},
P(a,b){var s
for(s=this.gn(this);s.j();)if(b.$1(s.gm()))return!0
return!1},
gl(a){var s,r=this.gn(this)
for(s=0;r.j();)++s
return s},
gq(a){return!this.gn(this).j()},
gN(a){return!this.gq(this)},
ga7(a){var s=this.gn(this)
if(!s.j())throw A.c(A.ai())
return s.gm()},
E(a,b){var s,r
A.h9(b,"index")
s=this.gn(this)
for(r=b;s.j();){if(r===0)return s.gm();--r}throw A.c(A.eE(b,b-r,this,"index"))},
p(a){return A.fY(this,"(",")")}}
A.C.prototype={
p(a){return"MapEntry("+A.o(this.a)+": "+A.o(this.b)+")"}}
A.aU.prototype={
gv(a){return A.l.prototype.gv.call(this,0)},
p(a){return"null"}}
A.l.prototype={$il:1,
K(a,b){return this===b},
gv(a){return A.bL(this)},
p(a){return"Instance of '"+A.bM(this)+"'"},
gU(a){return A.iH(this)},
toString(){return this.p(this)}}
A.b1.prototype={
gl(a){return this.a.length},
p(a){var s=this.a
return s.charCodeAt(0)==0?s:s}}
A.cQ.prototype={
aO(a){if(a<=0||a>4294967296)throw A.c(A.eM(u.c+a))
return Math.random()*a>>>0}}
A.c1.prototype={
aA(a){var s,r,q,p,o,n,m,l=this,k=4294967296,j=a<0?-1:0
do{s=a>>>0
a=B.b.D(a-s,k)
r=a>>>0
a=B.b.D(a-r,k)
q=(~s>>>0)+(s<<21>>>0)
p=q>>>0
r=(~r>>>0)+((r<<21|s>>>11)>>>0)+B.b.D(q-p,k)>>>0
q=((p^(p>>>24|r<<8))>>>0)*265
s=q>>>0
r=((r^r>>>24)>>>0)*265+B.b.D(q-s,k)>>>0
q=((s^(s>>>14|r<<18))>>>0)*21
s=q>>>0
r=((r^r>>>14)>>>0)*21+B.b.D(q-s,k)>>>0
s=(s^(s>>>28|r<<4))>>>0
r=(r^r>>>28)>>>0
q=(s<<31>>>0)+s
p=q>>>0
o=B.b.D(q-p,k)
q=l.a*1037
n=l.a=q>>>0
m=l.b*1037+B.b.D(q-n,k)>>>0
l.b=m
n=(n^p)>>>0
l.a=n
o=(m^r+((r<<31|s>>>1)>>>0)+o>>>0)>>>0
l.b=o}while(a!==j)
if(o===0&&n===0)l.a=23063
l.V()
l.V()
l.V()
l.V()},
V(){var s=this,r=s.a,q=4294901760*r,p=q>>>0,o=55905*r,n=o>>>0,m=n+p+s.b
r=m>>>0
s.a=r
s.b=B.b.D(o-n+(q-p)+(m-r),4294967296)>>>0},
aO(a){var s,r,q,p=this
if(a<=0||a>4294967296)throw A.c(A.eM(u.c+a))
s=a-1
if((a&s)>>>0===0){p.V()
return(p.a&s)>>>0}do{p.V()
r=p.a
q=r%a}while(r-q+a>=4294967296)
return q}}
A.F.prototype={}
A.M.prototype={
gaU(){var s=this.f
if(s==null)return""
if(s<0.01)return"**"
if(s<0.05)return"*"
return"ns"}}
A.G.prototype={}
A.bn.prototype={
gbm(){return B.a.an(this.b,new A.ce())},
gaK(){var s=this.c
return s.length/B.a.A(s,0,new A.cd())}}
A.ce.prototype={
$1(a){return a.a==="Treatment"},
$S:13}
A.cd.prototype={
$2(a,b){return a+1/b.c},
$S:33}
A.ax.prototype={
p(a){return"AnovaException: "+this.a}}
A.dd.prototype={
$1(a){return a.c},
$S:9}
A.de.prototype={
$1(a){return a.e},
$S:2}
A.df.prototype={
$1(a){var s=a.e-this.a
return s*s},
$S:2}
A.dg.prototype={
$1(a){var s=J.u(a),r=A.d4(a)-this.a
return s*(r*r)},
$S:5}
A.dD.prototype={
$1(a){return a.d==null},
$S:3}
A.dE.prototype={
$1(a){return a.c},
$S:9}
A.dF.prototype={
$1(a){var s=a.d
s.toString
return s},
$S:19}
A.dG.prototype={
$1(a){return a.e},
$S:2}
A.dH.prototype={
$1(a){var s=a.e-this.a
return s*s},
$S:2}
A.dI.prototype={
$1(a){var s=A.d4(a)-this.a
return s*s},
$S:5}
A.dJ.prototype={
$1(a){var s=A.d4(a)-this.a
return s*s},
$S:5}
A.da.prototype={
$2(a,b){return a+b},
$S:0}
A.d5.prototype={
$1(a){return a.e},
$S:2}
A.aZ.prototype={}
A.dY.prototype={
$2(a,b){return a+b},
$S:0}
A.dZ.prototype={
$2(a,b){var s=b-this.a
return a+s*s},
$S:0}
A.e_.prototype={
$2(a,b){return a+b*b},
$S:0}
A.e0.prototype={
$2(a,b){var s,r
for(s=0,r=5;r>=0;--r)s=s*b+a[r]
return s},
$S:40}
A.bO.prototype={}
A.aO.prototype={}
A.dV.prototype={
$2(a,b){return a+b},
$S:0}
A.cj.prototype={
gbj(){var s,r,q,p,o,n=A.a([],t.l)
for(s=this.a,r=s.length,q=this.d,p=0;p<s.length;s.length===r||(0,A.i)(s),++p){o=s[p]
if(Math.abs(o.d)>q)n.push(o)}return n}}
A.dL.prototype={
$2(a,b){return a+b},
$S:0}
A.dO.prototype={
$1(a){return A.em(a,this.a,this.b)-this.c},
$S:6}
A.dX.prototype={
$1(a){return A.iR(a,this.a,this.b)-this.c},
$S:6}
A.dN.prototype={
$1(a){return B.J[a]},
$S:11}
A.b2.prototype={}
A.by.prototype={
bk(a){return B.a.an(this.b,new A.ck(a))},
gap(){var s=t.s,r=A.a([],s),q=this.c
if(q.length===3)r.push("AxBxC")
r.push("AxB")
if(q.length===3)B.a.F(r,A.a(["AxC","BxC"],s))
return r},
a8(a){var s,r,q,p=this.e
for(s=this.c,r=J.w(a),q=0;q<s.length;++q)if(!r.u(a,q))p*=J.u(s[q])
return p},
au(a){var s,r,q,p,o,n,m,l,k=t.N,j=t.i,i=A.n(k,j),h=A.n(k,t.S)
for(s=this.d,s=new A.x(s,A.m(s).i("x<1,2>")).gn(0),r=J.w(a),q=t.s;s.j();){p=s.d
o=p.a.split("|")
n=A.a([],q)
for(m=r.gn(a);m.j();)n.push(o[m.gm()])
l=B.a.S(n,"|")
n=i.h(0,l)
if(n==null)n=0
i.k(0,l,n+p.b)
n=h.h(0,l)
h.k(0,l,(n==null?0:n)+1)}k=A.n(k,j)
for(j=new A.a3(i,i.r,i.e);j.j();){s=j.d
r=i.h(0,s)
r.toString
q=h.h(0,s)
q.toString
k.k(0,s,r/q)}return k},
bi(a){var s,r,q,p=t.t,o=this.au(A.a([a],p)),n=A.a([],t.J)
for(s=J.P(this.c[a]);s.j();){r=s.gm()
q=o.h(0,r)
q.toString
n.push(new A.G(r,q,this.a8(A.a([a],p))))}return n},
aQ(a6,a7,a8,a9,b0){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1=this,a2={},a3=a1.c,a4=a3[a7],a5=a3[a8]
a3=t.aY
s=A.n(a3,t.i)
a2.a=null
if(b0==null){r=t.t
q=a1.au(A.a([a7,a8],r))
for(p=J.P(a4),o=J.w(a5);p.j();){n=p.gm()
for(m=o.gn(a5),l=n+"|";m.j();){k=m.gm()
j=q.h(0,l+k)
j.toString
s.k(0,new A.J(n,k),j)}}a2.a=a1.a8(A.a([a7,a8],r))}else{for(r=a1.d,r=new A.x(r,A.m(r).i("x<1,2>")).gn(0),p=b0.a,o=b0.b;r.j();){i=r.d
h=i.a.split("|")
if(h[p]===o)s.k(0,new A.J(h[a7],h[a8]),i.b)}a2.a=a1.e}g=new A.cn(a2,a1)
r=t.N
f=A.n(a3,r)
e=A.n(a3,r)
for(r=J.w(a5),p=r.gn(a5),o=J.w(a4),n=t.J;p.j();){m=p.gm()
l=A.a([],n)
for(k=o.gn(a4);k.j();){j=k.gm()
d=s.h(0,new A.J(j,m))
d.toString
l.push(new A.G(j,d,a2.a))}for(l=a6.a9(g.$1(l),a9).c,k=l.length,c=0;c<l.length;l.length===k||(0,A.i)(l),++c){b=l[c]
f.k(0,new A.J(b.a,m),b.c)}}for(p=o.gn(a4);p.j();){m=p.gm()
l=A.a([],n)
for(k=r.gn(a5);k.j();){j=k.gm()
d=s.h(0,new A.J(m,j))
d.toString
l.push(new A.G(j,d,a2.a))}for(l=a6.a9(g.$1(l),a9).c,k=l.length,c=0;c<l.length;l.length===k||(0,A.i)(l),++c){b=l[c]
e.k(0,new A.J(m,b.a),b.c.toUpperCase())}}a=new A.cl()
a3=A.n(a3,t.bD)
for(p=new A.a3(s,s.r,s.e);p.j();){a0=p.d
n=f.h(0,a0)
n.toString
m=e.h(0,a0)
m.toString
a3.k(0,a0,new A.c5(n,m))}p=t.n
n=A.a([],p)
for(m=o.gn(a4);m.j();){l=m.gm()
k=A.a([],p)
for(j=r.gn(a5);j.j();){d=s.h(0,new A.J(l,j.gm()))
d.toString
k.push(d)}n.push(a.$1(k))}m=A.a([],p)
for(r=r.gn(a5);r.j();){l=r.gm()
k=A.a([],p)
for(j=o.gn(a4);j.j();){d=s.h(0,new A.J(j.gm(),l))
d.toString
k.push(d)}m.push(a.$1(k))}return new A.b2(a7,a8,a4,a5,s,a3,n,m)},
bl(a,b,c,d){return this.aQ(a,b,c,d,null)}}
A.ck.prototype={
$1(a){return a.a===this.a},
$S:13}
A.cn.prototype={
$1(a){var s=this.b
return new A.am(a,s.r,s.w,this.a.a)},
$S:41}
A.cl.prototype={
$1(a){return B.a.C(a,new A.cm())/a.length},
$S:7}
A.cm.prototype={
$2(a,b){return a+b},
$S:0}
A.dh.prototype={
$1(a){return a.a==null},
$S:3}
A.di.prototype={
$1(a){return J.u(a.a.a)!==this.a},
$S:3}
A.dB.prototype={
$1(a){var s=this.a,r=s==null?null:s.bf(0,a)
if(r==null)r=-1
return r<0?1048576:r},
$S:25}
A.dj.prototype={
$2(a,b){var s=this.a
return J.bm(s.$1(a),s.$1(b))},
$S:28}
A.dn.prototype={
$2(a,b){return a*J.u(b)},
$S:34}
A.dp.prototype={
$1(a){return J.u(a)!==this.a},
$S:14}
A.dz.prototype={
$1(a){var s=J.w(a)
return s.A(a,0,new A.dA())/s.gl(a)},
$S:7}
A.dA.prototype={
$2(a,b){return a+b},
$S:0}
A.dC.prototype={
$1(a){return a*a},
$S:6}
A.dq.prototype={
$1(a){return a.e},
$S:2}
A.dr.prototype={
$2(a,b){return a+this.a.$1(b.e-this.b)},
$S:18}
A.ds.prototype={
$2(a,b){var s=J.L(a),r=J.L(b)
return s.gl(a)!==r.gl(b)?B.b.B(s.gl(a),r.gl(b)):B.f.B(A.ar(a),A.ar(b))},
$S:20}
A.dt.prototype={
$2(a,b){return a+this.a.$1(b-this.b)},
$S:0}
A.du.prototype={
$1(a){return J.fK(a,J.fM(this.a))},
$S:21}
A.dv.prototype={
$2(a,b){var s=(J.u(this.a)-J.u(b)&1)===0?1:-1,r=this.b.h(0,A.ar(b))
r.toString
return a+s*r},
$S:22}
A.dk.prototype={
$1(a){return a.d==null},
$S:3}
A.dl.prototype={
$1(a){return J.u(a)!==this.a},
$S:14}
A.dm.prototype={
$2(a,b){return a+this.a.$1(this.b.$1(b)-this.c)},
$S:23}
A.dw.prototype={
$1(a){return J.fL(a,1,new A.dx(this.a))},
$S:24}
A.dx.prototype={
$2(a,b){return a*(J.u(this.a[b])-1)},
$S:15}
A.dy.prototype={
$3(a,b,c){var s=c/b
return A.dP(a,b,c,s,s/this.a,this.b)},
$S:26}
A.bF.prototype={}
A.bw.prototype={}
A.cv.prototype={}
A.dR.prototype={
$2(a,b){return B.c.B(a.c,b.c)},
$S:27}
A.dS.prototype={
$2(a,b){return a+b},
$S:0}
A.dT.prototype={
$2(a,b){var s,r=b.a,q=a.a,p=B.c.B(r[1],q[1])
if(p!==0)return p
s=B.c.B(r[2],q[2])
return s!==0?s:B.f.B(q[4],r[4])},
$S:42}
A.dU.prototype={
$2(a,b){var s=this.a
return B.c.B(s[a].a[2],s[b].a[2])},
$S:15}
A.d9.prototype={
$1(a){return a.C(0,B.t)},
$S:12}
A.d8.prototype={
$1(a){return a.C(0,B.r)},
$S:12}
A.d6.prototype={
$2(a,b){var s=this.a,r=J.bm(s.$1(a),s.$1(b))
if(r!==0)s=r
else{s=this.b
s=J.bm(s.$1(a),s.$1(b))}return s},
$S:30}
A.d7.prototype={
$1(a){var s="abcdefghijklmnopqrstuvwxyz"
return a<26?s[a]:s[B.b.av(a,26)]+B.b.D(a,26)},
$S:11}
A.bN.prototype={}
A.cE.prototype={}
A.am.prototype={}
A.U.prototype={
a9(a,b){var s,r,q,p,o,n,m,l,k=A.bI(a.a,t.cg)
B.a.H(k,new A.cF())
s=k.length
r=A.a([],t.n)
for(q=2;q<=s;++q)r.push(this.al(q,s,a,b))
p=A.W(k).i("D<1,b>")
p=A.bI(new A.D(k,new A.cG(),p),p.i("T.E"))
o=A.hM(p,r)
p=this.ga_()
n=A.a([],t.k)
for(m=0;m<s;++m){l=k[m]
n.push(new A.bN(l.a,l.b,o[m]))}return new A.cE(p,b,n,r)}}
A.cF.prototype={
$2(a,b){return B.c.B(b.b,a.b)},
$S:31}
A.cG.prototype={
$1(a){return a.b},
$S:32}
A.bv.prototype={
gZ(){return"dmrt"},
ga_(){return"Duncan's Multiple Range Test"},
al(a,b,c,d){return A.fs(Math.pow(1-d,a-1),a,c.c)*Math.sqrt(c.b/c.d)}}
A.bU.prototype={
gZ(){return"tukey"},
ga_(){return"Tukey HSD"},
al(a,b,c,d){return A.fs(1-d,b,c.c)*Math.sqrt(c.b/c.d)}}
A.bJ.prototype={
gZ(){return"lsd"},
ga_(){return"Fisher LSD"},
al(a,b,c,d){return Math.sqrt(A.el(d,1,c.c))*Math.sqrt(2)*Math.sqrt(c.b/c.d)}}
A.aW.prototype={}
A.bQ.prototype={}
A.bT.prototype={}
A.bS.prototype={}
A.dK.prototype={
$2(a,b){return a+b},
$S:0}
A.R.prototype={
b_(){return"DataTransform."+this.b},
aj(a){var s,r,q,p,o
for(s=a.length,r=this.a,q=0;q<s;++q){p=a[q]
if(!isFinite(p))return!1
switch(r){case 0:o=!0
break
case 1:o=p>=0
break
case 2:o=p>=-0.5
break
case 3:o=p>-1
break
case 4:o=p>=0&&p<=100
break
default:o=null}if(!o)return!1}return!0},
ba(a){var s
switch(this.a){case 0:s=a
break
case 1:s=Math.sqrt(a)
break
case 2:s=Math.sqrt(a+0.5)
break
case 3:s=Math.log(a+1)/2.302585092994046
break
case 4:s=Math.asin(Math.sqrt(B.c.W(a/100,0,1)))*57.29577951308232
break
default:s=null}return s}}
A.dQ.prototype={
$1(a){var s=J.y(a.h(0,"pro"),!0),r=B.c.a0(A.bh(a.h(0,"activeCount")))
return B.d.L(A.q(["ok",s||r<1],t.N,t.y),null)},
$S:1}
A.db.prototype={
$1(a){return a.gZ()===this.a},
$S:17}
A.dc.prototype={
$0(){return B.a.ga7(B.k)},
$S:35}
A.d3.prototype={
$1(a){return a.ga_()===this.a},
$S:17}
A.cZ.prototype={
$1(a){return a.c===this.a},
$S:36}
A.d_.prototype={
$0(){return B.j},
$S:37}
A.d2.prototype={
$1(a){var s,r,q,p,o,n,m,l,k,j,i,h=a.c,g=a.d,f=A.a([],t.W)
for(s=J.w(h),r=s.gn(h),q=J.w(g),p=a.e;r.j();){o=r.gm()
n=[]
for(m=q.gn(g);m.j();)n.push(A.j(p.h(0,new A.J(o,m.gm()))))
f.push(n)}r=t.E
p=A.a([],r)
for(o=s.gn(h),n=a.f,m=t.s;o.j();){l=o.gm()
k=A.a([],m)
for(j=q.gn(g);j.j();)k.push(n.h(0,new A.J(l,j.gm())).a)
p.push(k)}r=A.a([],r)
for(s=s.gn(h);s.j();){o=s.gm()
l=A.a([],m)
for(k=q.gn(g);k.j();)l.push(n.h(0,new A.J(o,k.gm())).b)
r.push(l)}s=[]
for(q=a.r,o=q.length,i=0;i<q.length;q.length===o||(0,A.i)(q),++i)s.push(A.j(q[i]))
q=[]
for(o=a.w,n=o.length,i=0;i<o.length;o.length===n||(0,A.i)(o),++i)q.push(A.j(o[i]))
return A.q(["rowFactor",a.a,"colFactor",a.b,"rows",h,"cols",g,"means",f,"lower",p,"upper",r,"rowMeans",s,"colMeans",q],t.N,t.X)},
$S:38}
A.dW.prototype={
$1(a){return A.fv(this.a,a)},
$S:39};(function aliases(){var s=J.ab.prototype
s.aV=s.p})();(function installTearOffs(){var s=hunkHelpers._static_2,r=hunkHelpers._instance_1i,q=hunkHelpers._static_1,p=hunkHelpers.installStaticTearOff
s(J,"hZ","h1",8)
r(J.h.prototype,"ga6","u",4)
r(A.a8.prototype,"ga6","u",4)
s(A,"iy","h5",8)
r(A.N.prototype,"ga6","u",4)
q(A,"iB","hN",29)
r(A.f.prototype,"ga6","u",4)
p(A,"fn",2,null,["$1$2","$2"],["fp",function(a,b){return A.fp(a,b,t.H)}],16,0)
p(A,"fm",2,null,["$1$2","$2"],["fo",function(a,b){return A.fo(a,b,t.H)}],16,0)
q(A,"is","hV",1)
q(A,"it","ib",1)
q(A,"iq","hz",1)
q(A,"ir","hL",1)
q(A,"iu","il",1)})();(function inheritance(){var s=hunkHelpers.mixin,r=hunkHelpers.inherit,q=hunkHelpers.inheritMany
r(A.l,null)
q(A.l,[A.e3,J.bA,A.aY,J.ay,A.f,A.br,A.ah,A.r,A.t,A.cH,A.X,A.bK,A.bW,A.b9,A.aL,A.c0,A.cL,A.cB,A.cw,A.a3,A.aT,A.bH,A.V,A.bY,A.cW,A.c9,A.aF,A.cU,A.ac,A.N,A.bs,A.bu,A.cS,A.cO,A.b_,A.cP,A.co,A.C,A.aU,A.b1,A.cQ,A.c1,A.F,A.M,A.G,A.bn,A.ax,A.aZ,A.bO,A.aO,A.cj,A.b2,A.by,A.bF,A.bw,A.cv,A.bN,A.cE,A.am,A.U,A.aW,A.bQ,A.bT,A.bS])
q(J.bA,[J.bC,J.aP,J.aC,J.aA,J.aj])
q(J.aC,[J.ab,J.h])
q(J.ab,[J.cD,J.a7,J.aR])
r(J.bB,A.aY)
r(J.cq,J.h)
q(J.aA,[J.az,J.aQ])
q(A.f,[A.a8,A.p,A.al,A.b5,A.b8,A.aG])
q(A.a8,[A.af,A.bg])
r(A.b7,A.af)
r(A.b6,A.bg)
q(A.ah,[A.ci,A.cf,A.cp,A.ch,A.cK,A.cy,A.ce,A.dd,A.de,A.df,A.dg,A.dD,A.dE,A.dF,A.dG,A.dH,A.dI,A.dJ,A.d5,A.dO,A.dX,A.dN,A.ck,A.cn,A.cl,A.dh,A.di,A.dB,A.dp,A.dz,A.dC,A.dq,A.du,A.dk,A.dl,A.dw,A.dy,A.d9,A.d8,A.d7,A.cG,A.dQ,A.db,A.d3,A.cZ,A.d2,A.dW])
q(A.ci,[A.cN,A.cg,A.cr,A.cz,A.cT,A.cd,A.da,A.dY,A.dZ,A.e_,A.e0,A.dV,A.dL,A.cm,A.dj,A.dn,A.dA,A.dr,A.ds,A.dt,A.dv,A.dm,A.dx,A.dR,A.dS,A.dT,A.dU,A.d6,A.cF,A.dK])
r(A.a_,A.b6)
q(A.r,[A.ag,A.a2,A.bZ])
q(A.t,[A.bG,A.b3,A.bD,A.bV,A.bP,A.bX,A.aS,A.bp,A.aa,A.b4,A.b0,A.bt])
q(A.p,[A.T,A.ak,A.E,A.x])
r(A.aN,A.al)
q(A.T,[A.D,A.c_])
q(A.b9,[A.c2,A.c3,A.c4])
q(A.c2,[A.J,A.c5])
r(A.c6,A.c3)
q(A.c4,[A.c7,A.c8])
r(A.aM,A.aL)
r(A.a1,A.cp)
r(A.aV,A.b3)
q(A.cK,[A.cI,A.aK])
r(A.bb,A.bX)
r(A.ba,A.aF)
r(A.an,A.ba)
r(A.bE,A.aS)
r(A.cs,A.bs)
q(A.bu,[A.cu,A.ct])
r(A.cR,A.cS)
q(A.aa,[A.aE,A.bz])
q(A.U,[A.bv,A.bU,A.bJ])
r(A.R,A.cO)
q(A.ch,[A.dc,A.d_])
s(A.bg,A.N)})()
var v={G:typeof self!="undefined"?self:globalThis,typeUniverse:{eC:new Map(),tR:{},eT:{},tPV:{},sEA:[]},mangledGlobalNames:{d:"int",b:"double",Z:"num",e:"String",H:"bool",aU:"Null",k:"List",l:"Object",B:"Map",aB:"JSObject"},mangledNames:{},types:["b(b,b)","e(B<e,@>)","b(F)","H(F)","H(l?)","b(k<F>)","b(b)","b(f<b>)","d(@,@)","e(F)","~(l?,l?)","e(d)","d(Y<d>)","H(M)","H(k<b>)","d(d,d)","0^(0^,0^)<Z>","H(U)","b(b,F)","d(F)","d(k<d>,k<d>)","H(k<d>)","b(b,k<d>)","b(b,k<b>)","d(k<d>)","d(e)","M(e,d,b)","d(+idx,trt,val(d,e,b),+idx,trt,val(d,e,b))","d(e,e)","@(@)","d(Y<d>,Y<d>)","d(G,G)","b(G)","b(b,G)","d(d,k<e>)","U()","H(R)","R()","B<e,l?>(b2)","e(e)","b(k<b>,b)","am(k<G>)","d(+mean,meanRank,median,n,trt(b,b,b,d,e),+mean,meanRank,median,n,trt(b,b,b,d,e))"],arrayRti:Symbol("$ti"),rttc:{"2;":(a,b)=>c=>c instanceof A.J&&a.b(c.a)&&b.b(c.b),"2;lower,upper":(a,b)=>c=>c instanceof A.c5&&a.b(c.a)&&b.b(c.b),"3;idx,trt,val":(a,b,c)=>d=>d instanceof A.c6&&a.b(d.a)&&b.b(d.b)&&c.b(d.c),"4;i,j,pRaw,z":a=>b=>b instanceof A.c7&&A.fr(a,b.a),"5;mean,meanRank,median,n,trt":a=>b=>b instanceof A.c8&&A.fr(a,b.a)}}
A.hw(v.typeUniverse,JSON.parse('{"cD":"ab","a7":"ab","aR":"ab","bC":{"H":[],"a5":[]},"aP":{"a5":[]},"aC":{"aB":[]},"ab":{"aB":[]},"h":{"k":["1"],"p":["1"],"aB":[],"f":["1"]},"bB":{"aY":[]},"cq":{"h":["1"],"k":["1"],"p":["1"],"aB":[],"f":["1"]},"aA":{"b":[],"a0":["Z"]},"az":{"b":[],"d":[],"a0":["Z"],"a5":[]},"aQ":{"b":[],"a0":["Z"],"a5":[]},"aj":{"e":[],"a0":["e"],"a5":[]},"a8":{"f":["2"]},"af":{"a8":["1","2"],"f":["2"],"f.E":"2"},"b7":{"af":["1","2"],"a8":["1","2"],"p":["2"],"f":["2"],"f.E":"2"},"b6":{"N":["2"],"k":["2"],"a8":["1","2"],"p":["2"],"f":["2"]},"a_":{"b6":["1","2"],"N":["2"],"k":["2"],"a8":["1","2"],"p":["2"],"f":["2"],"f.E":"2","N.E":"2"},"ag":{"r":["3","4"],"B":["3","4"],"r.V":"4","r.K":"3"},"bG":{"t":[]},"p":{"f":["1"]},"T":{"p":["1"],"f":["1"]},"al":{"f":["2"],"f.E":"2"},"aN":{"al":["1","2"],"p":["2"],"f":["2"],"f.E":"2"},"D":{"T":["2"],"p":["2"],"f":["2"],"T.E":"2","f.E":"2"},"b5":{"f":["1"],"f.E":"1"},"aL":{"B":["1","2"]},"aM":{"aL":["1","2"],"B":["1","2"]},"b8":{"f":["1"],"f.E":"1"},"aV":{"t":[]},"bD":{"t":[]},"bV":{"t":[]},"bP":{"t":[]},"a2":{"r":["1","2"],"B":["1","2"],"r.V":"2","r.K":"1"},"ak":{"p":["1"],"f":["1"],"f.E":"1"},"E":{"p":["1"],"f":["1"],"f.E":"1"},"x":{"p":["C<1,2>"],"f":["C<1,2>"],"f.E":"C<1,2>"},"bX":{"t":[]},"bb":{"t":[]},"aG":{"f":["1"],"f.E":"1"},"an":{"aF":["1"],"Y":["1"],"p":["1"],"f":["1"]},"r":{"B":["1","2"]},"aF":{"Y":["1"],"p":["1"],"f":["1"]},"ba":{"aF":["1"],"Y":["1"],"p":["1"],"f":["1"]},"bZ":{"r":["e","@"],"B":["e","@"],"r.V":"@","r.K":"e"},"c_":{"T":["e"],"p":["e"],"f":["e"],"T.E":"e","f.E":"e"},"aS":{"t":[]},"bE":{"t":[]},"b":{"a0":["Z"]},"d":{"a0":["Z"]},"k":{"p":["1"],"f":["1"]},"Z":{"a0":["Z"]},"Y":{"p":["1"],"f":["1"]},"e":{"a0":["e"]},"bp":{"t":[]},"b3":{"t":[]},"aa":{"t":[]},"aE":{"t":[]},"bz":{"t":[]},"b4":{"t":[]},"b0":{"t":[]},"bt":{"t":[]},"b_":{"t":[]},"bv":{"U":[]},"bU":{"U":[]},"bJ":{"U":[]}}'))
A.hv(v.typeUniverse,JSON.parse('{"bW":1,"bg":2,"a3":1,"aT":1,"c9":1,"ba":1,"bs":2,"bu":2}'))
var u={c:"max must be in range 0 < max \u2264 2^32, was "}
var t=(function rtii(){var s=A.aI
return{U:s("a0<@>"),O:s("p<@>"),C:s("t"),Z:s("j2"),u:s("a1<b>"),v:s("a1<d>"),o:s("h<M>"),A:s("h<R>"),D:s("h<bw>"),_:s("h<bF>"),E:s("h<k<e>>"),r:s("h<k<b>>"),M:s("h<k<d>>"),W:s("h<k<l?>>"),c:s("h<B<e,l>>"),e:s("h<B<e,e>>"),d:s("h<B<e,l?>>"),G:s("h<B<e,d?>>"),B:s("h<aW>"),Y:s("h<F>"),k:s("h<bN>"),w:s("h<+(d,d)>"),x:s("h<+idx,trt,val(d,e,b)>"),cv:s("h<+i,j,pRaw,z(d,d,b,b)>"),q:s("h<+mean,meanRank,median,n,trt(b,b,b,d,e)>"),l:s("h<bO>"),Q:s("h<bQ>"),bp:s("h<Y<d>>"),s:s("h<e>"),J:s("h<G>"),V:s("h<bT>"),n:s("h<b>"),ce:s("h<@>"),t:s("h<d>"),T:s("aP"),m:s("aB"),L:s("aR"),h:s("k<B<e,d?>>"),a:s("k<F>"),b9:s("k<H>"),p:s("k<b>"),j:s("k<@>"),b:s("B<e,@>"),f:s("B<@,@>"),P:s("aU"),K:s("l"),cY:s("j3"),F:s("+()"),aY:s("+(e,e)"),bD:s("+lower,upper(e,e)"),N:s("e"),cg:s("G"),R:s("a5"),cr:s("a7"),cn:s("b5<k<d>>"),y:s("H"),i:s("b"),z:s("@"),S:s("d"),bc:s("eD<aU>?"),aQ:s("aB?"),g:s("k<@>?"),X:s("l?"),aD:s("e?"),cG:s("H?"),dd:s("b?"),I:s("d?"),ae:s("Z?"),H:s("Z")}})();(function constants(){var s=hunkHelpers.makeConstList
B.B=J.bA.prototype
B.a=J.h.prototype
B.b=J.az.prototype
B.c=J.aA.prototype
B.f=J.aj.prototype
B.C=J.aC.prototype
B.v=new A.a1(A.fm(),t.u)
B.r=new A.a1(A.fm(),t.v)
B.u=new A.a1(A.fn(),t.u)
B.t=new A.a1(A.fn(),t.v)
B.x=function getTagFallback(o) {
  var s = Object.prototype.toString.call(o);
  return s.substring(8, s.length - 1);
}
B.d=new A.cs()
B.e=new A.cH()
B.A=new A.cQ()
B.l=new A.R("arcsin_pct",4,"arcsinSqrtPercent")
B.i=new A.R("log10_1",3,"log10PlusOne")
B.j=new A.R("none",0,"none")
B.m=new A.R("sqrt",1,"sqrt")
B.n=new A.R("sqrt_half",2,"sqrtPlusHalf")
B.D=new A.ct(null)
B.E=new A.cu(null)
B.I=s([0,0.221157,-0.147981,-2.07119,4.434685,-2.706056],t.n)
B.o=s([B.j,B.m,B.n,B.i,B.l],t.A)
B.J=s(["A","B","C"],t.s)
B.w=new A.bv()
B.z=new A.bU()
B.y=new A.bJ()
B.k=s([B.w,B.z,B.y],A.aI("h<U>"))
B.p=s([0.9815606342467192,0.9041172563704749,0.7699026741943047,0.5873179542866175,0.3678314989981802,0.1252334085114689],t.n)
B.K=s([0.027152459411754096,0.062253523938647894,0.09515851168249279,0.12462897125553388,0.14959598881657674,0.16915651939500254,0.18260341504492358,0.1894506104550685],t.n)
B.L=s([0.9999999999998099,676.5203681218851,-1259.1392167224028,771.3234287776531,-176.6150291621406,12.507343278686905,-0.13857109526572012,0.000009984369578019572,15056327351493116e-23],t.n)
B.M=s([],t.o)
B.P=s([0.04717533638651183,0.10693932599531843,0.16007832854334622,0.20316742672306592,0.2334925365383548,0.24914704581340277],t.n)
B.h=s([0.9894009349916499,0.9445750230732326,0.8656312023878318,0.755404408355003,0.6178762444026438,0.45801677765722737,0.2816035507792589,0.09501250983763744],t.n)
B.Q=s([0,0.042981,-0.293762,-1.752461,5.682633,-3.582633],t.n)
B.S={AxB:0,AxC:1,BxC:2}
B.F=s([0,1],t.t)
B.G=s([0,2],t.t)
B.H=s([1,2],t.t)
B.R=new A.aM(B.S,[B.F,B.G,B.H],A.aI("aM<e,k<d>>"))
B.N=s([],t.t)
B.O=s([],t.V)
B.q=new A.bS(B.N,B.O,0,0,0,0)
B.T=A.j_("l")})();(function staticFields(){$.aq=A.a([],A.aI("h<l>"))
$.eK=null
$.ey=null
$.ex=null
$.cV=A.a([],A.aI("h<k<l>?>"))})();(function lazyInitializers(){var s=hunkHelpers.lazyFinal
s($,"j1","fw",()=>A.fk("_$dart_dartClosure"))
s($,"j0","ep",()=>A.fk("_$dart_dartClosure_dartJSInterop"))
s($,"jf","fH",()=>A.a([new J.bB()],A.aI("h<aY>")))
s($,"j4","fx",()=>A.a6(A.cM({
toString:function(){return"$receiver$"}})))
s($,"j5","fy",()=>A.a6(A.cM({$method$:null,
toString:function(){return"$receiver$"}})))
s($,"j6","fz",()=>A.a6(A.cM(null)))
s($,"j7","fA",()=>A.a6(function(){var $argumentsExpr$="$arguments$"
try{null.$method$($argumentsExpr$)}catch(r){return r.message}}()))
s($,"ja","fD",()=>A.a6(A.cM(void 0)))
s($,"jb","fE",()=>A.a6(function(){var $argumentsExpr$="$arguments$"
try{(void 0).$method$($argumentsExpr$)}catch(r){return r.message}}()))
s($,"j9","fC",()=>A.a6(A.eO(null)))
s($,"j8","fB",()=>A.a6(function(){try{null.$method$}catch(r){return r.message}}()))
s($,"jd","fG",()=>A.a6(A.eO(void 0)))
s($,"jc","fF",()=>A.a6(function(){try{(void 0).$method$}catch(r){return r.message}}()))
s($,"je","cb",()=>A.fq(B.T))
s($,"jg","eq",()=>A.q(["info",A.is(),"layout",A.it(),"analyze",A.iq(),"check",A.ir(),"timeSeries",A.iu(),"canAddActive",new A.dQ()],t.N,A.aI("e(B<e,@>)")))})();(function nativeSupport(){!function(){var s=function(a){var m={}
m[a]=1
return Object.keys(hunkHelpers.convertToFastObject(m))[0]}
v.getIsolateTag=function(a){return s("___dart_"+a+v.isolateTag)}
var r="___dart_isolate_tags_"
var q=Object[r]||(Object[r]=Object.create(null))
var p="_ZxYxX"
for(var o=0;;o++){var n=s(p+"_"+o+"_")
if(!(n in q)){q[n]=1
v.isolateTag=n
break}}}()
hunkHelpers.setOrUpdateInterceptorsByTag({})
hunkHelpers.setOrUpdateLeafTags({})})()
Function.prototype.$0=function(){return this()}
Function.prototype.$1=function(a){return this(a)}
Function.prototype.$2=function(a,b){return this(a,b)}
Function.prototype.$2$0=function(){return this()}
Function.prototype.$1$0=function(){return this()}
Function.prototype.$3=function(a,b,c){return this(a,b,c)}
Function.prototype.$4=function(a,b,c,d){return this(a,b,c,d)}
Function.prototype.$1$1=function(a){return this(a)}
convertAllToFastObject(w)
convertToFastObject($);(function(a){if(typeof document==="undefined"){a(null)
return}if(typeof document.currentScript!="undefined"){a(document.currentScript)
return}var s=document.scripts
function onLoad(b){for(var q=0;q<s.length;++q){s[q].removeEventListener("load",onLoad,false)}a(b.target)}for(var r=0;r<s.length;++r){s[r].addEventListener("load",onLoad,false)}})(function(a){v.currentScript=a
var s=A.iP
if(typeof dartMainRunner==="function"){dartMainRunner(s,[])}else{s([])}})})()