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
if(a[b]!==s){A.hR(b)}a[b]=r}var q=a[b]
a[c]=function(){return q}
return q}}function makeConstList(a,b){if(b!=null)A.b(a,b)
a.$flags=7
return a}function convertToFastObject(a){function t(){}t.prototype=a
new t()
return a}function convertAllToFastObject(a){for(var s=0;s<a.length;++s){convertToFastObject(a[s])}}var y=0
function instanceTearOffGetter(a,b){var s=null
return a?function(c){if(s===null)s=A.dD(b)
return new s(c,this)}:function(){if(s===null)s=A.dD(b)
return new s(this,null)}}function staticTearOffGetter(a){var s=null
return function(){if(s===null)s=A.dD(a).prototype
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
f6(a,b){if(a>4294967295)throw A.a(A.aL(a,0,4294967295,"length",null))
return J.f8(new Array(a),b)},
f7(a,b){return A.b(new Array(a),b.i("i<0>"))},
f5(a,b){if(a<0)throw A.a(A.bQ("Length must be a non-negative integer: "+a))
return A.b(new Array(a),b.i("i<0>"))},
f8(a,b){var s=A.b(a,b.i("i<0>"))
s.$flags=1
return s},
f9(a,b){return J.dk(a,b)},
al(a){if(typeof a=="number"){if(Math.floor(a)==a)return J.ar.prototype
return J.aF.prototype}if(typeof a=="string")return J.a8.prototype
if(a==null)return J.aE.prototype
if(typeof a=="boolean")return J.bm.prototype
if(Array.isArray(a))return J.i.prototype
if(typeof a=="function")return J.aG.prototype
if(typeof a=="object"){if(a instanceof A.j){return a}else{return J.au.prototype}}if(!(a instanceof A.j))return J.Z.prototype
return a},
r(a){if(a==null)return a
if(Array.isArray(a))return J.i.prototype
if(!(a instanceof A.j))return J.Z.prototype
return a},
I(a){if(typeof a=="string")return J.a8.prototype
if(a==null)return a
if(Array.isArray(a))return J.i.prototype
if(!(a instanceof A.j))return J.Z.prototype
return a},
hD(a){if(typeof a=="number"){if(Math.floor(a)==a)return J.ar.prototype
return J.aF.prototype}if(a==null)return a
if(!(a instanceof A.j))return J.Z.prototype
return a},
hE(a){if(typeof a=="number")return J.as.prototype
if(typeof a=="string")return J.a8.prototype
if(a==null)return a
if(!(a instanceof A.j))return J.Z.prototype
return a},
G(a,b){if(a==null)return b==null
if(typeof a!="object")return b!=null&&a===b
return J.al(a).T(a,b)},
dJ(a,b){if(typeof b==="number")if(Array.isArray(a)||typeof a=="string")if(b>>>0===b&&b<a.length)return a[b]
return J.I(a).h(a,b)},
eN(a,b,c){if(typeof b==="number")if(Array.isArray(a)&&!(a.$flags&2)&&b>>>0===b&&b<a.length)return a[b]=c
return J.r(a).j(a,b,c)},
b7(a,b){return J.r(a).O(a,b)},
dj(a,b){return J.r(a).a0(a,b)},
dk(a,b){return J.hE(a).E(a,b)},
dK(a,b){return J.r(a).v(a,b)},
eO(a,b){return J.r(a).A(a,b)},
eP(a,b){return J.r(a).ae(a,b)},
eQ(a,b,c){return J.r(a).u(a,b,c)},
eR(a){return J.r(a).ga1(a)},
S(a){return J.al(a).gt(a)},
dL(a){return J.I(a).gq(a)},
eS(a){return J.r(a).gK(a)},
T(a){return J.r(a).gp(a)},
t(a){return J.I(a).gl(a)},
eT(a){return J.al(a).gL(a)},
eU(a){if(typeof a==="number")return a>0?1:a<0?-1:a
return J.hD(a).gal(a)},
eV(a,b,c){return J.r(a).a3(a,b,c)},
eW(a,b){return J.I(a).sl(a,b)},
dM(a,b){return J.r(a).M(a,b)},
ao(a){return J.al(a).n(a)},
bk:function bk(){},
bm:function bm(){},
aE:function aE(){},
au:function au(){},
a1:function a1(){},
c8:function c8(){},
Z:function Z(){},
aG:function aG(){},
i:function i(a){this.$ti=a},
bl:function bl(){},
bZ:function bZ(a){this.$ti=a},
ap:function ap(a,b,c){var _=this
_.a=a
_.b=b
_.c=0
_.d=null
_.$ti=c},
as:function as(){},
ar:function ar(){},
aF:function aF(){},
a8:function a8(){}},A={dm:function dm(){},
eZ(a,b,c){if(t.O.b(a))return new A.aV(a,b.i("@<0>").B(c).i("aV<1,2>"))
return new A.a6(a,b.i("@<0>").B(c).i("a6<1,2>"))},
a3(a,b){a=a+b&536870911
a=a+((a&524287)<<10)&536870911
return a^a>>>6},
dt(a){a=a+((a&67108863)<<3)&536870911
a^=a>>>11
return a+((a&16383)<<15)&536870911},
dF(a){var s,r
for(s=$.ai.length,r=0;r<s;++r)if(a===$.ai[r])return!0
return!1},
c6(a,b,c,d){if(t.O.b(a))return new A.aD(a,b,c.i("@<0>").B(d).i("aD<1,2>"))
return new A.ad(a,b,c.i("@<0>").B(d).i("ad<1,2>"))},
aq(){return new A.bA("No element")},
bz(a,b,c,d){if(c-b<=32)A.fh(a,b,c,d)
else A.fg(a,b,c,d)},
fh(a,b,c,d){var s,r,q,p,o,n,m,l
for(s=b+1,r=a.a,q=a.$ti,p=q.c,o=J.I(r),q=q.y[1];s<=c;++s){n=q.a(o.h(r,s))
m=s
for(;;){if(!(m>b&&d.$2(q.a(o.h(r,m-1)),n)>0))break
l=m-1
o.j(r,m,p.a(q.a(o.h(r,l))))
m=l}o.j(r,m,p.a(n))}},
fg(a6,a7,a8,a9){var s,r,q,p,o,n,m,l,k,j,i=B.b.C(a8-a7+1,6),h=a7+i,g=a8-i,f=B.b.C(a7+a8,2),e=f-i,d=f+i,c=a6.a,b=J.I(c),a=a6.$ti,a0=a.y[1],a1=a0.a(b.h(c,h)),a2=a0.a(b.h(c,e)),a3=a0.a(b.h(c,f)),a4=a0.a(b.h(c,d)),a5=a0.a(b.h(c,g))
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
b.j(c,h,a.a(a1))
b.j(c,f,a.a(a3))
b.j(c,g,a.a(a5))
b.j(c,e,a.a(a0.a(b.h(c,a7))))
b.j(c,d,a.a(a0.a(b.h(c,a8))))
r=a7+1
q=a8-1
p=J.G(a9.$2(a2,a4),0)
if(p)for(o=r;o<=q;++o){n=a0.a(b.h(c,o))
m=a9.$2(n,a2)
if(m===0)continue
if(m<0){if(o!==r){b.j(c,o,a.a(a0.a(b.h(c,r))))
b.j(c,r,a.a(n))}++r}else for(;;){m=a9.$2(a0.a(b.h(c,q)),a2)
if(m>0){--q
continue}else{l=q-1
if(m<0){b.j(c,o,a.a(a0.a(b.h(c,r))))
k=r+1
b.j(c,r,a.a(a0.a(b.h(c,q))))
b.j(c,q,a.a(n))
q=l
r=k
break}else{b.j(c,o,a.a(a0.a(b.h(c,q))))
b.j(c,q,a.a(n))
q=l
break}}}}else for(o=r;o<=q;++o){n=a0.a(b.h(c,o))
if(a9.$2(n,a2)<0){if(o!==r){b.j(c,o,a.a(a0.a(b.h(c,r))))
b.j(c,r,a.a(n))}++r}else if(a9.$2(n,a4)>0)for(;;)if(a9.$2(a0.a(b.h(c,q)),a4)>0){--q
if(q<o)break
continue}else{l=q-1
if(a9.$2(a0.a(b.h(c,q)),a2)<0){b.j(c,o,a.a(a0.a(b.h(c,r))))
k=r+1
b.j(c,r,a.a(a0.a(b.h(c,q))))
b.j(c,q,a.a(n))
r=k}else{b.j(c,o,a.a(a0.a(b.h(c,q))))
b.j(c,q,a.a(n))}q=l
break}}j=r-1
b.j(c,a7,a.a(a0.a(b.h(c,j))))
b.j(c,j,a.a(a2))
j=q+1
b.j(c,a8,a.a(a0.a(b.h(c,j))))
b.j(c,j,a.a(a4))
A.bz(a6,a7,r-2,a9)
A.bz(a6,q+2,a8,a9)
if(p)return
if(r<h&&q>g){while(J.G(a9.$2(a0.a(b.h(c,r)),a2),0))++r
while(J.G(a9.$2(a0.a(b.h(c,q)),a4),0))--q
for(o=r;o<=q;++o){n=a0.a(b.h(c,o))
if(a9.$2(n,a2)===0){if(o!==r){b.j(c,o,a.a(a0.a(b.h(c,r))))
b.j(c,r,a.a(n))}++r}else if(a9.$2(n,a4)===0)for(;;)if(a9.$2(a0.a(b.h(c,q)),a4)===0){--q
if(q<o)break
continue}else{l=q-1
if(a9.$2(a0.a(b.h(c,q)),a2)<0){b.j(c,o,a.a(a0.a(b.h(c,r))))
k=r+1
b.j(c,r,a.a(a0.a(b.h(c,q))))
b.j(c,q,a.a(n))
r=k}else{b.j(c,o,a.a(a0.a(b.h(c,q))))
b.j(c,q,a.a(n))}q=l
break}}A.bz(a6,r,q,a9)}else A.bz(a6,r,q,a9)},
a_:function a_(){},
bc:function bc(a,b){this.a=a
this.$ti=b},
a6:function a6(a,b){this.a=a
this.$ti=b},
aV:function aV(a,b){this.a=a
this.$ti=b},
aU:function aU(){},
ch:function ch(a,b){this.a=a
this.b=b},
U:function U(a,b){this.a=a
this.$ti=b},
bp:function bp(a){this.a=a},
cc:function cc(){},
m:function m(){},
R:function R(){},
a2:function a2(a,b,c){var _=this
_.a=a
_.b=b
_.c=0
_.d=null
_.$ti=c},
ad:function ad(a,b,c){this.a=a
this.b=b
this.$ti=c},
aD:function aD(a,b,c){this.a=a
this.b=b
this.$ti=c},
bt:function bt(a,b,c){var _=this
_.a=null
_.b=a
_.c=b
_.$ti=c},
B:function B(a,b,c){this.a=a
this.b=b
this.$ti=c},
aT:function aT(a,b,c){this.a=a
this.b=b
this.$ti=c},
bD:function bD(a,b){this.a=a
this.b=b},
b3:function b3(){},
ez(a){var s=A.ey(a)
if(s!=null)return s
return"minified:"+a},
k(a){var s
if(typeof a=="string")return a
if(typeof a=="number"){if(a!==0)return""+a}else if(!0===a)return"true"
else if(!1===a)return"false"
else if(a==null)return"null"
s=J.ao(a)
return s},
bu(a){var s,r=$.dW
if(r==null)r=$.dW=Symbol("identityHashCode")
s=a[r]
if(s==null){s=Math.random()*0x3fffffff|0
a[r]=s}return s},
bv(a){var s,r,q,p
if(a instanceof A.j)return A.K(A.bN(a),null)
s=J.al(a)
if(s===B.p||s===B.q||t.V.b(a)){r=B.l(a)
if(r!=="Object"&&r!=="")return r
q=a.constructor
if(typeof q=="function"){p=q.name
if(typeof p=="string"&&p!=="Object"&&p!=="")return p}}return A.K(A.bN(a),null)},
dX(a){var s,r,q
if(a==null||typeof a=="number"||A.dA(a))return J.ao(a)
if(typeof a=="string")return JSON.stringify(a)
if(a instanceof A.a7)return a.n(0)
if(a instanceof A.aX)return a.av(!0)
s=$.eM()
for(r=0;r<1;++r){q=s[r].b6(a)
if(q!=null)return q}return"Instance of '"+A.bv(a)+"'"},
D(a){var s
if(a<=65535)return String.fromCharCode(a)
if(a<=1114111){s=a-65536
return String.fromCharCode((B.b.au(s,10)|55296)>>>0,s&1023|56320)}throw A.a(A.aL(a,0,1114111,null,null))},
et(a,b){var s,r="index"
if(!A.ei(b))return new A.a0(!0,b,r,null)
s=J.t(a)
if(b<0||b>=s)return A.dT(b,s,a,r)
return new A.av(null,null,!0,b,r,"Value not in range")},
hu(a){return new A.a0(!0,a,null,null)},
a(a){return A.F(a,new Error())},
F(a,b){var s
if(a==null)a=new A.aR()
b.dartException=a
s=A.hS
if("defineProperty" in Object){Object.defineProperty(b,"message",{get:s})
b.name=""}else b.toString=s
return b},
hS(){return J.ao(this.dartException)},
dh(a,b){throw A.F(a,b==null?new Error():b)},
b6(a,b,c){var s
if(b==null)b=0
if(c==null)c=0
s=Error()
A.dh(A.fR(a,b,c),s)},
fR(a,b,c){var s,r,q,p,o,n,m,l,k
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
return new A.aS("'"+s+"': Cannot "+o+" "+l+k+n)},
l(a){throw A.a(A.p(a))},
Y(a){var s,r,q,p,o,n
a=A.hN(a.replace(String({}),"$receiver$"))
s=a.match(/\\\$[a-zA-Z]+\\\$/g)
if(s==null)s=A.b([],t.s)
r=s.indexOf("\\$arguments\\$")
q=s.indexOf("\\$argumentsExpr\\$")
p=s.indexOf("\\$expr\\$")
o=s.indexOf("\\$method\\$")
n=s.indexOf("\\$receiver\\$")
return new A.cf(a.replace(new RegExp("\\\\\\$arguments\\\\\\$","g"),"((?:x|[^x])*)").replace(new RegExp("\\\\\\$argumentsExpr\\\\\\$","g"),"((?:x|[^x])*)").replace(new RegExp("\\\\\\$expr\\\\\\$","g"),"((?:x|[^x])*)").replace(new RegExp("\\\\\\$method\\\\\\$","g"),"((?:x|[^x])*)").replace(new RegExp("\\\\\\$receiver\\\\\\$","g"),"((?:x|[^x])*)"),r,q,p,o,n)},
cg(a){return function($expr$){var $argumentsExpr$="$arguments$"
try{$expr$.$method$($argumentsExpr$)}catch(s){return s.message}}(a)},
e_(a){return function($expr$){try{$expr$.$method$}catch(s){return s.message}}(a)},
dn(a,b){var s=b==null,r=s?null:b.method
return new A.bn(a,r,s?null:b.receiver)},
dG(a){if(a==null)return new A.c7(a)
if(typeof a!=="object")return a
if("dartException" in a)return A.an(a,a.dartException)
return A.ho(a)},
an(a,b){if(t.C.b(b))if(b.$thrownJsError==null)b.$thrownJsError=a
return b},
ho(a){var s,r,q,p,o,n,m,l,k,j,i,h,g
if(!("message" in a))return a
s=a.message
if("number" in a&&typeof a.number=="number"){r=a.number
q=r&65535
if((B.b.au(r,16)&8191)===10)switch(q){case 438:return A.an(a,A.dn(A.k(s)+" (Error "+q+")",null))
case 445:case 5007:A.k(s)
return A.an(a,new A.aJ())}}if(a instanceof TypeError){p=$.eC()
o=$.eD()
n=$.eE()
m=$.eF()
l=$.eI()
k=$.eJ()
j=$.eH()
$.eG()
i=$.eL()
h=$.eK()
g=p.D(s)
if(g!=null)return A.an(a,A.dn(s,g))
else{g=o.D(s)
if(g!=null){g.method="call"
return A.an(a,A.dn(s,g))}else if(n.D(s)!=null||m.D(s)!=null||l.D(s)!=null||k.D(s)!=null||j.D(s)!=null||m.D(s)!=null||i.D(s)!=null||h.D(s)!=null)return A.an(a,new A.aJ())}return A.an(a,new A.bC(typeof s=="string"?s:""))}if(a instanceof RangeError){if(typeof s=="string"&&s.indexOf("call stack")!==-1)return new A.aO()
s=function(b){try{return String(b)}catch(f){}return null}(a)
return A.an(a,new A.a0(!1,null,null,typeof s=="string"?s.replace(/^RangeError:\s*/,""):s))}if(typeof InternalError=="function"&&a instanceof InternalError)if(typeof s=="string"&&s==="too much recursion")return new A.aO()
return a},
ew(a){if(a==null)return J.S(a)
if(typeof a=="object")return A.bu(a)
return J.S(a)},
hC(a,b){var s,r,q,p=a.length
for(s=0;s<p;s=q){r=s+1
q=r+1
b.j(0,a[s],a[r])}return b},
h2(a,b,c,d,e,f){switch(b){case 0:return a.$0()
case 1:return a.$1(c)
case 2:return a.$2(c,d)
case 3:return a.$3(c,d,e)
case 4:return a.$4(c,d,e,f)}throw A.a(new A.ci("Unsupported number of arguments for wrapped closure"))},
hx(a,b){var s=a.$identity
if(!!s)return s
s=A.hy(a,b)
a.$identity=s
return s},
hy(a,b){var s
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
return function(c,d,e){return function(f,g,h,i){return e(c,d,f,g,h,i)}}(a,b,A.h2)},
f3(a2){var s,r,q,p,o,n,m,l,k,j,i=a2.co,h=a2.iS,g=a2.iI,f=a2.nDA,e=a2.aI,d=a2.fs,c=a2.cs,b=d[0],a=c[0],a0=i[b],a1=a2.fT
a1.toString
s=h?Object.create(new A.cd().constructor.prototype):Object.create(new A.aA(null,null).constructor.prototype)
s.$initialize=s.constructor
r=h?function static_tear_off(){this.$initialize()}:function tear_off(a3,a4){this.$initialize(a3,a4)}
s.constructor=r
r.prototype=s
s.$_name=b
s.$_target=a0
q=!h
if(q)p=A.dR(b,a0,g,f)
else{s.$static_name=b
p=a0}s.$S=A.f_(a1,h,g)
s[a]=p
for(o=p,n=1;n<d.length;++n){m=d[n]
if(typeof m=="string"){l=i[m]
k=m
m=l}else k=""
j=c[n]
if(j!=null){if(q)m=A.dR(k,m,g,f)
s[j]=m}if(n===e)o=m}s.$C=o
s.$R=a2.rC
s.$D=a2.dV
return r},
f_(a,b,c){if(typeof a=="number")return a
if(typeof a=="string"){if(b)throw A.a("Cannot compute signature for static tearoff.")
return function(d,e){return function(){return e(this,d)}}(a,A.eX)}throw A.a("Error in functionType of tearoff")},
f0(a,b,c,d){var s=A.dQ
switch(b?-1:a){case 0:return function(e,f){return function(){return f(this)[e]()}}(c,s)
case 1:return function(e,f){return function(g){return f(this)[e](g)}}(c,s)
case 2:return function(e,f){return function(g,h){return f(this)[e](g,h)}}(c,s)
case 3:return function(e,f){return function(g,h,i){return f(this)[e](g,h,i)}}(c,s)
case 4:return function(e,f){return function(g,h,i,j){return f(this)[e](g,h,i,j)}}(c,s)
case 5:return function(e,f){return function(g,h,i,j,k){return f(this)[e](g,h,i,j,k)}}(c,s)
default:return function(e,f){return function(){return e.apply(f(this),arguments)}}(d,s)}},
dR(a,b,c,d){if(c)return A.f2(a,b,d)
return A.f0(b.length,d,a,b)},
f1(a,b,c,d){var s=A.dQ,r=A.eY
switch(b?-1:a){case 0:throw A.a(new A.by("Intercepted function with no arguments."))
case 1:return function(e,f,g){return function(){return f(this)[e](g(this))}}(c,r,s)
case 2:return function(e,f,g){return function(h){return f(this)[e](g(this),h)}}(c,r,s)
case 3:return function(e,f,g){return function(h,i){return f(this)[e](g(this),h,i)}}(c,r,s)
case 4:return function(e,f,g){return function(h,i,j){return f(this)[e](g(this),h,i,j)}}(c,r,s)
case 5:return function(e,f,g){return function(h,i,j,k){return f(this)[e](g(this),h,i,j,k)}}(c,r,s)
case 6:return function(e,f,g){return function(h,i,j,k,l){return f(this)[e](g(this),h,i,j,k,l)}}(c,r,s)
default:return function(e,f,g){return function(){var q=[g(this)]
Array.prototype.push.apply(q,arguments)
return e.apply(f(this),q)}}(d,r,s)}},
f2(a,b,c){var s,r
if($.dO==null)$.dO=A.dN("interceptor")
if($.dP==null)$.dP=A.dN("receiver")
s=b.length
r=A.f1(s,c,a,b)
return r},
dD(a){return A.f3(a)},
eX(a,b){return A.b2(v.typeUniverse,A.bN(a.a),b)},
dQ(a){return a.a},
eY(a){return a.b},
dN(a){var s,r,q,p=new A.aA("receiver","interceptor"),o=Object.getOwnPropertyNames(p)
o.$flags=1
s=o
for(o=s.length,r=0;r<o;++r){q=s[r]
if(p[q]===a)return q}throw A.a(A.bQ("Field name "+a+" not found."))},
ev(a){return v.getIsolateTag(a)},
hA(a,b){var s=b.length,r=v.rttc[""+s+";"+a]
if(r==null)return null
if(s===0)return r
if(s===r.length)return r.apply(null,b)
return r(b)},
hN(a){if(/[[\]{}()*+?.\\^$|]/.test(a))return a.replace(/[[\]{}()*+?.\\^$|]/g,"\\$&")
return a},
E:function E(a,b){this.a=a
this.b=b},
bL:function bL(a,b){this.a=a
this.b=b},
aB:function aB(){},
aC:function aC(a,b,c){this.a=a
this.b=b
this.$ti=c},
aM:function aM(){},
cf:function cf(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f},
aJ:function aJ(){},
bn:function bn(a,b,c){this.a=a
this.b=b
this.c=c},
bC:function bC(a){this.a=a},
c7:function c7(a){this.a=a},
a7:function a7(){},
bR:function bR(){},
bS:function bS(){},
ce:function ce(){},
cd:function cd(){},
aA:function aA(a,b){this.a=a
this.b=b},
by:function by(a){this.a=a},
a9:function a9(a){var _=this
_.a=0
_.f=_.e=_.d=_.c=_.b=null
_.r=0
_.$ti=a},
c_:function c_(a){this.a=a},
c3:function c3(a,b){this.a=a
this.b=b
this.c=null},
ab:function ab(a,b){this.a=a
this.$ti=b},
aa:function aa(a,b,c){var _=this
_.a=a
_.b=b
_.c=c
_.d=null},
v:function v(a,b){this.a=a
this.$ti=b},
br:function br(a,b,c){var _=this
_.a=a
_.b=b
_.c=c
_.d=null},
J:function J(a,b){this.a=a
this.$ti=b},
bq:function bq(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=null
_.$ti=d},
aX:function aX(){},
bK:function bK(){},
dr(a,b){var s=b.c
return s==null?b.c=A.b0(a,"dS",[b.x]):s},
dZ(a){var s=a.w
if(s===6||s===7)return A.dZ(a.x)
return s===11||s===12},
ff(a){return a.as},
ay(a){return A.cq(v.typeUniverse,a,!1)},
ag(a1,a2,a3,a4){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0=a2.w
switch(a0){case 5:case 1:case 2:case 3:case 4:return a2
case 6:s=a2.x
r=A.ag(a1,s,a3,a4)
if(r===s)return a2
return A.e7(a1,r,!0)
case 7:s=a2.x
r=A.ag(a1,s,a3,a4)
if(r===s)return a2
return A.e6(a1,r,!0)
case 8:q=a2.y
p=A.ax(a1,q,a3,a4)
if(p===q)return a2
return A.b0(a1,a2.x,p)
case 9:o=a2.x
n=A.ag(a1,o,a3,a4)
m=a2.y
l=A.ax(a1,m,a3,a4)
if(n===o&&l===m)return a2
return A.dv(a1,n,l)
case 10:k=a2.x
j=a2.y
i=A.ax(a1,j,a3,a4)
if(i===j)return a2
return A.e8(a1,k,i)
case 11:h=a2.x
g=A.ag(a1,h,a3,a4)
f=a2.y
e=A.hk(a1,f,a3,a4)
if(g===h&&e===f)return a2
return A.e5(a1,g,e)
case 12:d=a2.y
a4+=d.length
c=A.ax(a1,d,a3,a4)
o=a2.x
n=A.ag(a1,o,a3,a4)
if(c===d&&n===o)return a2
return A.dw(a1,n,c,!0)
case 13:b=a2.x
if(b<a4)return a2
a=a3[b-a4]
if(a==null)return a2
return a
default:throw A.a(A.bb("Attempted to substitute unexpected RTI kind "+a0))}},
ax(a,b,c,d){var s,r,q,p,o=b.length,n=A.cr(o)
for(s=!1,r=0;r<o;++r){q=b[r]
p=A.ag(a,q,c,d)
if(p!==q)s=!0
n[r]=p}return s?n:b},
hl(a,b,c,d){var s,r,q,p,o,n,m=b.length,l=A.cr(m)
for(s=!1,r=0;r<m;r+=3){q=b[r]
p=b[r+1]
o=b[r+2]
n=A.ag(a,o,c,d)
if(n!==o)s=!0
l.splice(r,3,q,p,n)}return s?l:b},
hk(a,b,c,d){var s,r=b.a,q=A.ax(a,r,c,d),p=b.b,o=A.ax(a,p,c,d),n=b.c,m=A.hl(a,n,c,d)
if(q===r&&o===p&&m===n)return b
s=new A.bF()
s.a=q
s.b=o
s.c=m
return s},
b(a,b){a[v.arrayRti]=b
return a},
es(a){var s=a.$S
if(s!=null){if(typeof s=="number")return A.hG(s)
return a.$S()}return null},
hI(a,b){var s
if(A.dZ(b))if(a instanceof A.a7){s=A.es(a)
if(s!=null)return s}return A.bN(a)},
bN(a){if(a instanceof A.j)return A.y(a)
if(Array.isArray(a))return A.Q(a)
return A.dz(J.al(a))},
Q(a){var s=a[v.arrayRti],r=t.b
if(s==null)return r
if(s.constructor!==r.constructor)return r
return s},
y(a){var s=a.$ti
return s!=null?s:A.dz(a)},
dz(a){var s=a.constructor,r=s.$ccache
if(r!=null)return r
return A.h0(a,s)},
h0(a,b){var s=a instanceof A.a7?Object.getPrototypeOf(Object.getPrototypeOf(a)).constructor:b,r=A.fz(v.typeUniverse,s.name)
b.$ccache=r
return r},
hG(a){var s,r=v.types,q=r[a]
if(typeof q=="string"){s=A.cq(v.typeUniverse,q,!1)
r[a]=s
return s}return q},
hF(a){return A.aj(A.y(a))},
dC(a){var s
if(a instanceof A.aX)return A.hB(a.$r,a.ap())
s=a instanceof A.a7?A.es(a):null
if(s!=null)return s
if(t.R.b(a))return J.eT(a).a
if(Array.isArray(a))return A.Q(a)
return A.bN(a)},
aj(a){var s=a.r
return s==null?a.r=new A.cp(a):s},
hB(a,b){var s,r,q=b,p=q.length
if(p===0)return t.F
s=A.b2(v.typeUniverse,A.dC(q[0]),"@<0>")
for(r=1;r<p;++r)s=A.ea(v.typeUniverse,s,A.dC(q[r]))
return A.b2(v.typeUniverse,s,a)},
hT(a){return A.aj(A.cq(v.typeUniverse,a,!1))},
h_(a){var s=this
s.b=A.hj(s)
return s.b(a)},
hj(a){var s,r,q,p
if(a===t.K)return A.h8
if(A.am(a))return A.hc
s=a.w
if(s===6)return A.fW
if(s===1)return A.ek
if(s===7)return A.h3
r=A.hi(a)
if(r!=null)return r
if(s===8){q=a.x
if(a.y.every(A.am)){a.f="$i"+q
if(q==="h")return A.h6
if(a===t.m)return A.h5
return A.hb}}else if(s===10){p=A.hA(a.x,a.y)
return p==null?A.ek:p}return A.fU},
hi(a){if(a.w===8){if(a===t.S)return A.ei
if(a===t.i||a===t.H)return A.h7
if(a===t.N)return A.ha
if(a===t.y)return A.dA}return null},
fZ(a){var s=this,r=A.fT
if(A.am(s))r=A.fM
else if(s===t.K)r=A.fK
else if(A.az(s)){r=A.fV
if(s===t.I)r=A.fH
else if(s===t.w)r=A.fL
else if(s===t.x)r=A.fD
else if(s===t.ae)r=A.cs
else if(s===t.dd)r=A.fF
else if(s===t.k)r=A.fJ}else if(s===t.S)r=A.fG
else if(s===t.N)r=A.dx
else if(s===t.y)r=A.fC
else if(s===t.H)r=A.b4
else if(s===t.i)r=A.fE
else if(s===t.m)r=A.fI
s.a=r
return s.a(a)},
fU(a){var s=this
if(a==null)return A.az(s)
return A.hJ(v.typeUniverse,A.hI(a,s),s)},
fW(a){if(a==null)return!0
return this.x.b(a)},
hb(a){var s,r=this
if(a==null)return A.az(r)
s=r.f
if(a instanceof A.j)return!!a[s]
return!!J.al(a)[s]},
h6(a){var s,r=this
if(a==null)return A.az(r)
if(typeof a!="object")return!1
if(Array.isArray(a))return!0
s=r.f
if(a instanceof A.j)return!!a[s]
return!!J.al(a)[s]},
h5(a){var s=this
if(a==null)return!1
if(typeof a=="object"){if(a instanceof A.j)return!!a[s.f]
return!0}if(typeof a=="function")return!0
return!1},
ej(a){if(typeof a=="object"){if(a instanceof A.j)return t.m.b(a)
return!0}if(typeof a=="function")return!0
return!1},
fT(a){var s=this
if(a==null){if(A.az(s))return a}else if(s.b(a))return a
throw A.F(A.ef(a,s),new Error())},
fV(a){var s=this
if(a==null||s.b(a))return a
throw A.F(A.ef(a,s),new Error())},
ef(a,b){return new A.aZ("TypeError: "+A.e1(a,A.K(b,null)))},
e1(a,b){return A.bh(a)+": type '"+A.K(A.dC(a),null)+"' is not a subtype of type '"+b+"'"},
N(a,b){return new A.aZ("TypeError: "+A.e1(a,b))},
h3(a){var s=this
return s.x.b(a)||A.dr(v.typeUniverse,s).b(a)},
h8(a){return a!=null},
fK(a){if(a!=null)return a
throw A.F(A.N(a,"Object"),new Error())},
hc(a){return!0},
fM(a){return a},
ek(a){return!1},
dA(a){return!0===a||!1===a},
fC(a){if(!0===a)return!0
if(!1===a)return!1
throw A.F(A.N(a,"bool"),new Error())},
fD(a){if(!0===a)return!0
if(!1===a)return!1
if(a==null)return a
throw A.F(A.N(a,"bool?"),new Error())},
fE(a){if(typeof a=="number")return a
throw A.F(A.N(a,"double"),new Error())},
fF(a){if(typeof a=="number")return a
if(a==null)return a
throw A.F(A.N(a,"double?"),new Error())},
ei(a){return typeof a=="number"&&Math.floor(a)===a},
fG(a){if(typeof a=="number"&&Math.floor(a)===a)return a
throw A.F(A.N(a,"int"),new Error())},
fH(a){if(typeof a=="number"&&Math.floor(a)===a)return a
if(a==null)return a
throw A.F(A.N(a,"int?"),new Error())},
h7(a){return typeof a=="number"},
b4(a){if(typeof a=="number")return a
throw A.F(A.N(a,"num"),new Error())},
cs(a){if(typeof a=="number")return a
if(a==null)return a
throw A.F(A.N(a,"num?"),new Error())},
ha(a){return typeof a=="string"},
dx(a){if(typeof a=="string")return a
throw A.F(A.N(a,"String"),new Error())},
fL(a){if(typeof a=="string")return a
if(a==null)return a
throw A.F(A.N(a,"String?"),new Error())},
fI(a){if(A.ej(a))return a
throw A.F(A.N(a,"JSObject"),new Error())},
fJ(a){if(a==null)return a
if(A.ej(a))return a
throw A.F(A.N(a,"JSObject?"),new Error())},
eo(a,b){var s,r,q
for(s="",r="",q=0;q<a.length;++q,r=", ")s+=r+A.K(a[q],b)
return s},
hg(a,b){var s,r,q,p,o,n,m=a.x,l=a.y
if(""===m)return"("+A.eo(l,b)+")"
s=l.length
r=m.split(",")
q=r.length-s
for(p="(",o="",n=0;n<s;++n,o=", "){p+=o
if(q===0)p+="{"
p+=A.K(l[n],b)
if(q>=0)p+=" "+r[q];++q}return p+"})"},
eg(a1,a2,a3){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a=", ",a0=null
if(a3!=null){s=a3.length
if(a2==null)a2=A.b([],t.s)
else a0=a2.length
r=a2.length
for(q=s;q>0;--q)a2.push("T"+(r+q))
for(p=t.X,o="<",n="",q=0;q<s;++q,n=a){o=o+n+a2[a2.length-1-q]
m=a3[q]
l=m.w
if(!(l===2||l===3||l===4||l===5||m===p))o+=" extends "+A.K(m,a2)}o+=">"}else o=""
p=a1.x
k=a1.y
j=k.a
i=j.length
h=k.b
g=h.length
f=k.c
e=f.length
d=A.K(p,a2)
for(c="",b="",q=0;q<i;++q,b=a)c+=b+A.K(j[q],a2)
if(g>0){c+=b+"["
for(b="",q=0;q<g;++q,b=a)c+=b+A.K(h[q],a2)
c+="]"}if(e>0){c+=b+"{"
for(b="",q=0;q<e;q+=3,b=a){c+=b
if(f[q+1])c+="required "
c+=A.K(f[q+2],a2)+" "+f[q]}c+="}"}if(a0!=null){a2.toString
a2.length=a0}return o+"("+c+") => "+d},
K(a,b){var s,r,q,p,o,n,m=a.w
if(m===5)return"erased"
if(m===2)return"dynamic"
if(m===3)return"void"
if(m===1)return"Never"
if(m===4)return"any"
if(m===6){s=a.x
r=A.K(s,b)
q=s.w
return(q===11||q===12?"("+r+")":r)+"?"}if(m===7)return"FutureOr<"+A.K(a.x,b)+">"
if(m===8){p=A.hn(a.x)
o=a.y
return o.length>0?p+("<"+A.eo(o,b)+">"):p}if(m===10)return A.hg(a,b)
if(m===11)return A.eg(a,b,null)
if(m===12)return A.eg(a.x,b,a.y)
if(m===13){n=a.x
return b[b.length-1-n]}return"?"},
hn(a){var s=A.ey(a)
if(s!=null)return s
return"minified:"+a},
fA(a,b){var s=a.tR[b]
while(typeof s=="string")s=a.tR[s]
return s},
fz(a,b){var s,r,q,p,o,n=a.eT,m=n[b]
if(m==null)return A.cq(a,b,!1)
else if(typeof m=="number"){s=m
r=A.b1(a,5,"#")
q=A.cr(s)
for(p=0;p<s;++p)q[p]=r
o=A.b0(a,b,q)
n[b]=o
return o}else return m},
fy(a,b){return A.eb(a.tR,b)},
fx(a,b){return A.eb(a.eT,b)},
cq(a,b,c){var s,r=a.eC,q=r.get(b)
if(q!=null)return q
s=A.e9(a,null,b,!1)
r.set(b,s)
return s},
b2(a,b,c){var s,r,q=b.z
if(q==null)q=b.z=new Map()
s=q.get(c)
if(s!=null)return s
r=A.e9(a,b,c,!0)
q.set(c,r)
return r},
ea(a,b,c){var s,r,q,p=b.Q
if(p==null)p=b.Q=new Map()
s=c.as
r=p.get(s)
if(r!=null)return r
q=A.dv(a,b,c.w===9?c.y:[c])
p.set(s,q)
return q},
e9(a,b,c,d){return A.fq(A.fk(a,b,c,d))},
a4(a,b){b.a=A.fZ
b.b=A.h_
return b},
b1(a,b,c){var s,r,q=a.eC.get(c)
if(q!=null)return q
s=new A.P(null,null)
s.w=b
s.as=c
r=A.a4(a,s)
a.eC.set(c,r)
return r},
e7(a,b,c){var s,r=b.as+"?",q=a.eC.get(r)
if(q!=null)return q
s=A.fv(a,b,r,c)
a.eC.set(r,s)
return s},
fv(a,b,c,d){var s,r,q
if(d){s=b.w
r=!0
if(!A.am(b))if(!(b===t.P||b===t.T))if(s!==6)r=s===7&&A.az(b.x)
if(r)return b
else if(s===1)return t.P}q=new A.P(null,null)
q.w=6
q.x=b
q.as=c
return A.a4(a,q)},
e6(a,b,c){var s,r=b.as+"/",q=a.eC.get(r)
if(q!=null)return q
s=A.ft(a,b,r,c)
a.eC.set(r,s)
return s},
ft(a,b,c,d){var s,r
if(d){s=b.w
if(A.am(b)||b===t.K)return b
else if(s===1)return A.b0(a,"dS",[b])
else if(b===t.P||b===t.T)return t.e}r=new A.P(null,null)
r.w=7
r.x=b
r.as=c
return A.a4(a,r)},
fw(a,b){var s,r,q=""+b+"^",p=a.eC.get(q)
if(p!=null)return p
s=new A.P(null,null)
s.w=13
s.x=b
s.as=q
r=A.a4(a,s)
a.eC.set(q,r)
return r},
b_(a){var s,r,q,p=a.length
for(s="",r="",q=0;q<p;++q,r=",")s+=r+a[q].as
return s},
fs(a){var s,r,q,p,o,n=a.length
for(s="",r="",q=0;q<n;q+=3,r=","){p=a[q]
o=a[q+1]?"!":":"
s+=r+p+o+a[q+2].as}return s},
b0(a,b,c){var s,r,q,p=b
if(c.length>0)p+="<"+A.b_(c)+">"
s=a.eC.get(p)
if(s!=null)return s
r=new A.P(null,null)
r.w=8
r.x=b
r.y=c
if(c.length>0)r.c=c[0]
r.as=p
q=A.a4(a,r)
a.eC.set(p,q)
return q},
dv(a,b,c){var s,r,q,p,o,n
if(b.w===9){s=b.x
r=b.y.concat(c)}else{r=c
s=b}q=s.as+(";<"+A.b_(r)+">")
p=a.eC.get(q)
if(p!=null)return p
o=new A.P(null,null)
o.w=9
o.x=s
o.y=r
o.as=q
n=A.a4(a,o)
a.eC.set(q,n)
return n},
e8(a,b,c){var s,r,q="+"+(b+"("+A.b_(c)+")"),p=a.eC.get(q)
if(p!=null)return p
s=new A.P(null,null)
s.w=10
s.x=b
s.y=c
s.as=q
r=A.a4(a,s)
a.eC.set(q,r)
return r},
e5(a,b,c){var s,r,q,p,o,n=b.as,m=c.a,l=m.length,k=c.b,j=k.length,i=c.c,h=i.length,g="("+A.b_(m)
if(j>0){s=l>0?",":""
g+=s+"["+A.b_(k)+"]"}if(h>0){s=l>0?",":""
g+=s+"{"+A.fs(i)+"}"}r=n+(g+")")
q=a.eC.get(r)
if(q!=null)return q
p=new A.P(null,null)
p.w=11
p.x=b
p.y=c
p.as=r
o=A.a4(a,p)
a.eC.set(r,o)
return o},
dw(a,b,c,d){var s,r=b.as+("<"+A.b_(c)+">"),q=a.eC.get(r)
if(q!=null)return q
s=A.fu(a,b,c,r,d)
a.eC.set(r,s)
return s},
fu(a,b,c,d,e){var s,r,q,p,o,n,m,l
if(e){s=c.length
r=A.cr(s)
for(q=0,p=0;p<s;++p){o=c[p]
if(o.w===1){r[p]=o;++q}}if(q>0){n=A.ag(a,b,r,0)
m=A.ax(a,c,r,0)
return A.dw(a,n,m,c!==m)}}l=new A.P(null,null)
l.w=12
l.x=b
l.y=c
l.as=d
return A.a4(a,l)},
fk(a,b,c,d){return{u:a,e:b,r:c,s:[],p:0,n:d}},
fq(a){var s,r,q,p,o,n,m,l=a.r,k=a.s
for(s=l.length,r=0;r<s;){q=l.charCodeAt(r)
if(q>=48&&q<=57)r=A.fm(r+1,q,l,k)
else if((((q|32)>>>0)-97&65535)<26||q===95||q===36||q===124)r=A.e3(a,r,l,k,!1)
else if(q===46)r=A.e3(a,r,l,k,!0)
else{++r
switch(q){case 44:break
case 58:k.push(!1)
break
case 33:k.push(!0)
break
case 59:k.push(A.af(a.u,a.e,k.pop()))
break
case 94:k.push(A.fw(a.u,k.pop()))
break
case 35:k.push(A.b1(a.u,5,"#"))
break
case 64:k.push(A.b1(a.u,2,"@"))
break
case 126:k.push(A.b1(a.u,3,"~"))
break
case 60:k.push(a.p)
a.p=k.length
break
case 62:A.fo(a,k)
break
case 38:A.fn(a,k)
break
case 63:p=a.u
k.push(A.e7(p,A.af(p,a.e,k.pop()),a.n))
break
case 47:p=a.u
k.push(A.e6(p,A.af(p,a.e,k.pop()),a.n))
break
case 40:k.push(-3)
k.push(a.p)
a.p=k.length
break
case 41:A.fl(a,k)
break
case 91:k.push(a.p)
a.p=k.length
break
case 93:o=k.splice(a.p)
A.e4(a.u,a.e,o)
a.p=k.pop()
k.push(o)
k.push(-1)
break
case 123:k.push(a.p)
a.p=k.length
break
case 125:o=k.splice(a.p)
A.fr(a.u,a.e,o)
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
return A.af(a.u,a.e,m)},
fm(a,b,c,d){var s,r,q=b-48
for(s=c.length;a<s;++a){r=c.charCodeAt(a)
if(!(r>=48&&r<=57))break
q=q*10+(r-48)}d.push(q)
return a},
e3(a,b,c,d,e){var s,r,q,p,o,n,m=b+1
for(s=c.length;m<s;++m){r=c.charCodeAt(m)
if(r===46){if(e)break
e=!0}else{if(!((((r|32)>>>0)-97&65535)<26||r===95||r===36||r===124))q=r>=48&&r<=57
else q=!0
if(!q)break}}p=c.substring(b,m)
if(e){s=a.u
o=a.e
if(o.w===9)o=o.x
n=A.fA(s,o.x)[p]
if(n==null)A.dh('No "'+p+'" in "'+A.ff(o)+'"')
d.push(A.b2(s,o,n))}else d.push(p)
return m},
fo(a,b){var s,r=a.u,q=A.e2(a,b),p=b.pop()
if(typeof p=="string")b.push(A.b0(r,p,q))
else{s=A.af(r,a.e,p)
switch(s.w){case 11:b.push(A.dw(r,s,q,a.n))
break
default:b.push(A.dv(r,s,q))
break}}},
fl(a,b){var s,r,q,p=a.u,o=b.pop(),n=null,m=null
if(typeof o=="number")switch(o){case-1:n=b.pop()
break
case-2:m=b.pop()
break
default:b.push(o)
break}else b.push(o)
s=A.e2(a,b)
o=b.pop()
switch(o){case-3:o=b.pop()
if(n==null)n=p.sEA
if(m==null)m=p.sEA
r=A.af(p,a.e,o)
q=new A.bF()
q.a=s
q.b=n
q.c=m
b.push(A.e5(p,r,q))
return
case-4:b.push(A.e8(p,b.pop(),s))
return
default:throw A.a(A.bb("Unexpected state under `()`: "+A.k(o)))}},
fn(a,b){var s=b.pop()
if(0===s){b.push(A.b1(a.u,1,"0&"))
return}if(1===s){b.push(A.b1(a.u,4,"1&"))
return}throw A.a(A.bb("Unexpected extended operation "+A.k(s)))},
e2(a,b){var s=b.splice(a.p)
A.e4(a.u,a.e,s)
a.p=b.pop()
return s},
af(a,b,c){if(typeof c=="string")return A.b0(a,c,a.sEA)
else if(typeof c=="number"){b.toString
return A.fp(a,b,c)}else return c},
e4(a,b,c){var s,r=c.length
for(s=0;s<r;++s)c[s]=A.af(a,b,c[s])},
fr(a,b,c){var s,r=c.length
for(s=2;s<r;s+=3)c[s]=A.af(a,b,c[s])},
fp(a,b,c){var s,r,q=b.w
if(q===9){if(c===0)return b.x
s=b.y
r=s.length
if(c<=r)return s[c-1]
c-=r
b=b.x
q=b.w}else if(c===0)return b
if(q!==8)throw A.a(A.bb("Indexed base must be an interface type"))
s=b.y
if(c<=s.length)return s[c-1]
throw A.a(A.bb("Bad index "+c+" for "+b.n(0)))},
hJ(a,b,c){var s,r=b.d
if(r==null)r=b.d=new Map()
s=r.get(c)
if(s==null){s=A.u(a,b,null,c,null)
r.set(c,s)}return s},
u(a,b,c,d,e){var s,r,q,p,o,n,m,l,k,j,i
if(b===d)return!0
if(A.am(d))return!0
s=b.w
if(s===4)return!0
if(A.am(b))return!1
if(b.w===1)return!0
r=s===13
if(r)if(A.u(a,c[b.x],c,d,e))return!0
q=d.w
p=t.P
if(b===p||b===t.T){if(q===7)return A.u(a,b,c,d.x,e)
return d===p||d===t.T||q===6}if(d===t.K){if(s===7)return A.u(a,b.x,c,d,e)
return s!==6}if(s===7){if(!A.u(a,b.x,c,d,e))return!1
return A.u(a,A.dr(a,b),c,d,e)}if(s===6)return A.u(a,p,c,d,e)&&A.u(a,b.x,c,d,e)
if(q===7){if(A.u(a,b,c,d.x,e))return!0
return A.u(a,b,c,A.dr(a,d),e)}if(q===6)return A.u(a,b,c,p,e)||A.u(a,b,c,d.x,e)
if(r)return!1
p=s!==11
if((!p||s===12)&&d===t.Z)return!0
o=s===10
if(o&&d===t.Q)return!0
if(q===12){if(b===t.g)return!0
if(s!==12)return!1
n=b.y
m=d.y
l=n.length
if(l!==m.length)return!1
c=c==null?n:n.concat(c)
e=e==null?m:m.concat(e)
for(k=0;k<l;++k){j=n[k]
i=m[k]
if(!A.u(a,j,c,i,e)||!A.u(a,i,e,j,c))return!1}return A.eh(a,b.x,c,d.x,e)}if(q===11){if(b===t.g)return!0
if(p)return!1
return A.eh(a,b,c,d,e)}if(s===8){if(q!==8)return!1
return A.h4(a,b,c,d,e)}if(o&&q===10)return A.h9(a,b,c,d,e)
return!1},
eh(a3,a4,a5,a6,a7){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2
if(!A.u(a3,a4.x,a5,a6.x,a7))return!1
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
if(!A.u(a3,p[h],a7,g,a5))return!1}for(h=0;h<m;++h){g=l[h]
if(!A.u(a3,p[o+h],a7,g,a5))return!1}for(h=0;h<i;++h){g=l[m+h]
if(!A.u(a3,k[h],a7,g,a5))return!1}f=s.c
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
if(!A.u(a3,e[a+2],a7,g,a5))return!1
break}}while(b<d){if(f[b+1])return!1
b+=3}return!0},
h4(a,b,c,d,e){var s,r,q,p,o,n=b.x,m=d.x
while(n!==m){s=a.tR[n]
if(s==null)return!1
if(typeof s=="string"){n=s
continue}r=s[m]
if(r==null)return!1
q=r.length
p=q>0?new Array(q):v.typeUniverse.sEA
for(o=0;o<q;++o)p[o]=A.b2(a,b,r[o])
return A.ec(a,p,null,c,d.y,e)}return A.ec(a,b.y,null,c,d.y,e)},
ec(a,b,c,d,e,f){var s,r=b.length
for(s=0;s<r;++s)if(!A.u(a,b[s],d,e[s],f))return!1
return!0},
h9(a,b,c,d,e){var s,r=b.y,q=d.y,p=r.length
if(p!==q.length)return!1
if(b.x!==d.x)return!1
for(s=0;s<p;++s)if(!A.u(a,r[s],c,q[s],e))return!1
return!0},
az(a){var s=a.w,r=!0
if(!(a===t.P||a===t.T))if(!A.am(a))if(s!==6)r=s===7&&A.az(a.x)
return r},
am(a){var s=a.w
return s===2||s===3||s===4||s===5||a===t.X},
eb(a,b){var s,r,q=Object.keys(b),p=q.length
for(s=0;s<p;++s){r=q[s]
a[r]=b[r]}},
cr(a){return a>0?new Array(a):v.typeUniverse.sEA},
P:function P(a,b){var _=this
_.a=a
_.b=b
_.r=_.f=_.d=_.c=null
_.w=0
_.as=_.Q=_.z=_.y=_.x=null},
bF:function bF(){this.c=this.b=this.a=null},
cp:function cp(a){this.a=a},
bE:function bE(){},
aZ:function aZ(a){this.a=a},
w(a,b,c){return A.hC(a,new A.a9(b.i("@<0>").B(c).i("a9<1,2>")))},
q(a,b){return new A.a9(a.i("@<0>").B(b).i("a9<1,2>"))},
dV(a){return new A.aW(a.i("aW<0>"))},
du(){var s=Object.create(null)
s["<non-identifier-key>"]=s
delete s["<non-identifier-key>"]
return s},
fa(a,b){var s=t.U
return J.dk(s.a(a),s.a(b))},
dq(a){var s,r
if(A.dF(a))return"{...}"
s=new A.aP("")
try{r={}
$.ai.push(a)
s.a+="{"
r.a=!0
a.J(0,new A.c5(r,s))
s.a+="}"}finally{$.ai.pop()}r=s.a
return r.charCodeAt(0)==0?r:r},
aW:function aW(a){var _=this
_.a=0
_.f=_.e=_.d=_.c=_.b=null
_.r=0
_.$ti=a},
cn:function cn(a){this.a=a
this.b=null},
bI:function bI(a,b,c){var _=this
_.a=a
_.b=b
_.d=_.c=null
_.$ti=c},
M:function M(){},
W:function W(){},
c5:function c5(a,b){this.a=a
this.b=b},
aw:function aw(){},
aY:function aY(){},
hf(a,b){var s,r,q,p=null
try{p=JSON.parse(a)}catch(r){s=A.dG(r)
q=String(s)
throw A.a(new A.bY(q))}q=A.ct(p)
return q},
ct(a){var s
if(a==null)return null
if(typeof a!="object")return a
if(!Array.isArray(a))return new A.bG(a,Object.create(null))
for(s=0;s<a.length;++s)a[s]=A.ct(a[s])
return a},
dU(a,b,c){return new A.aH(a,b)},
fQ(a){return a.ba()},
fi(a,b){return new A.ck(a,[],A.hz())},
fj(a,b,c){var s,r=new A.aP(""),q=A.fi(r,b)
q.a6(a)
s=r.a
return s.charCodeAt(0)==0?s:s},
bG:function bG(a,b){this.a=a
this.b=b
this.c=null},
bH:function bH(a){this.a=a},
bd:function bd(){},
bf:function bf(){},
aH:function aH(a,b){this.a=a
this.b=b},
bo:function bo(a,b){this.a=a
this.b=b},
c0:function c0(){},
c2:function c2(a){this.b=a},
c1:function c1(a){this.a=a},
cl:function cl(){},
cm:function cm(a,b){this.a=a
this.b=b},
ck:function ck(a,b,c){this.c=a
this.a=b
this.b=c},
c4(a,b,c,d){var s,r=c?J.f7(a,d):J.f6(a,d)
if(a!==0&&b!=null)for(s=0;s<r.length;++s)r[s]=b
return r},
fb(a,b,c){var s,r,q=A.b([],c.i("i<0>"))
for(s=a.length,r=0;r<a.length;a.length===s||(0,A.l)(a),++r)q.push(a[r])
q.$flags=1
return q},
dp(a,b){var s,r
if(Array.isArray(a))return A.b(a.slice(0),b.i("i<0>"))
s=A.b([],b.i("i<0>"))
for(r=J.T(a);r.k();)s.push(r.gm())
return s},
ds(a,b,c){var s=J.T(b)
if(!s.k())return a
if(c.length===0){do a+=A.k(s.gm())
while(s.k())}else{a+=A.k(s.gm())
while(s.k())a=a+c+A.k(s.gm())}return a},
bh(a){if(typeof a=="number"||A.dA(a)||a==null)return J.ao(a)
if(typeof a=="string")return JSON.stringify(a)
return A.dX(a)},
bb(a){return new A.ba(a)},
bQ(a){return new A.a0(!1,null,null,a)},
dY(a){var s=null
return new A.av(s,s,!1,s,s,a)},
aL(a,b,c,d,e){return new A.av(b,c,!0,a,d,"Invalid value")},
fe(a,b,c){if(0>a||a>c)throw A.a(A.aL(a,0,c,"start",null))
if(b!=null){if(a>b||b>c)throw A.a(A.aL(b,a,c,"end",null))
return b}return c},
fd(a,b){if(a<0)throw A.a(A.aL(a,0,null,b,null))
return a},
dT(a,b,c,d){return new A.bj(b,!0,a,d,"Index out of range")},
e0(a){return new A.aS(a)},
p(a){return new A.be(a)},
f4(a,b,c){var s,r
if(A.dF(a)){if(b==="("&&c===")")return"(...)"
return b+"..."+c}s=A.b([],t.s)
$.ai.push(a)
try{A.hd(a,s)}finally{$.ai.pop()}r=A.ds(b,s,", ")+c
return r.charCodeAt(0)==0?r:r},
dl(a,b,c){var s,r
if(A.dF(a))return b+"..."+c
s=new A.aP(b)
$.ai.push(a)
try{r=s
r.a=A.ds(r.a,a,", ")}finally{$.ai.pop()}s.a+=c
r=s.a
return r.charCodeAt(0)==0?r:r},
hd(a,b){var s,r,q,p,o,n,m,l=a.gp(a),k=0,j=0
for(;;){if(!(k<80||j<3))break
if(!l.k())return
s=A.k(l.gm())
b.push(s)
k+=s.length+2;++j}if(!l.k()){if(j<=5)return
r=b.pop()
q=b.pop()}else{p=l.gm();++j
if(!l.k()){if(j<=4){b.push(A.k(p))
return}r=A.k(p)
q=b.pop()
k+=r.length+2}else{o=l.gm();++j
for(;l.k();p=o,o=n){n=l.gm();++j
if(j>100){for(;;){if(!(k>75&&j>3))break
k-=b.pop().length+2;--j}b.push("...")
return}}q=A.k(p)
r=A.k(o)
k+=r.length+q.length+4}}if(j>b.length+2){k+=5
m="..."}else m=null
for(;;){if(!(k>80&&b.length>3))break
k-=b.pop().length+2
if(m==null){k+=5
m="..."}}if(m!=null)b.push(m)
b.push(q)
b.push(r)},
fc(a,b,c,d){var s
if(B.i===c){s=B.b.gt(a)
b=J.S(b)
return A.dt(A.a3(A.a3($.di(),s),b))}if(B.i===d){s=B.b.gt(a)
b=J.S(b)
c=J.S(c)
return A.dt(A.a3(A.a3(A.a3($.di(),s),b),c))}s=B.b.gt(a)
b=J.S(b)
c=J.S(c)
d=J.S(d)
d=A.dt(A.a3(A.a3(A.a3(A.a3($.di(),s),b),c),d))
return d},
o:function o(){},
ba:function ba(a){this.a=a},
aR:function aR(){},
a0:function a0(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
av:function av(a,b,c,d,e,f){var _=this
_.e=a
_.f=b
_.a=c
_.b=d
_.c=e
_.d=f},
bj:function bj(a,b,c,d,e){var _=this
_.f=a
_.a=b
_.b=c
_.c=d
_.d=e},
aS:function aS(a){this.a=a},
bA:function bA(a){this.a=a},
be:function be(a){this.a=a},
aO:function aO(){},
ci:function ci(a){this.a=a},
bY:function bY(a){this.a=a},
f:function f(){},
ac:function ac(a,b,c){this.a=a
this.b=b
this.$ti=c},
aI:function aI(){},
j:function j(){},
aP:function aP(a){this.a=a},
cj:function cj(){},
bJ:function bJ(){this.b=this.a=0},
z(a){return new A.b8(a)},
eq(a){var s,r,q,p,o,n,m,l,k,j=null,i=A.dy(a,new A.cB(),t.N),h=i.a,g=a.length
if(h<2)throw A.a(A.z("Need at least 2 treatments."))
if(g<=h)throw A.a(A.z("Need replication: more plots than treatments."))
s=A.Q(a).i("B<1,c>")
r=A.ah(new A.B(a,new A.cC(),s))/g
q=A.ah(new A.B(a,new A.cD(r),s))
s=A.y(i).i("v<2>")
p=A.ah(A.c6(new A.v(i,s),new A.cE(r),s.i("f.E"),t.i))
o=q-p
n=h-1
m=g-h
l=p/n
k=o/m
return new A.b9("CRD",A.b([A.d9("Treatment",n,p,l,l/k,m),new A.H("Error",m,o,k,j,j,j,j),new A.H("Total",g-1,q,j,j,j,j,j)],t.o),A.el(i),r,k,m)},
er(a3){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2=null
if(B.a.H(a3,new A.d_()))throw A.a(A.z("Every plot needs a block for RCBD."))
s=t.N
r=A.dy(a3,new A.d0(),s)
q=A.dy(a3,new A.d1(),t.S)
p=r.a
o=q.a
if(p<2)throw A.a(A.z("Need at least 2 treatments."))
if(o<2)throw A.a(A.z("Need at least 2 blocks."))
n=A.dV(s)
for(s=a3.length,m=0;l=a3.length,m<l;a3.length===s||(0,A.l)(a3),++m){k=a3[m]
l=k.c
j=A.k(k.d)
if(!n.O(0,l+"|"+j))throw A.a(A.z("Treatment "+l+" appears twice in block "+j+". Average sub-samples first."))}s=p*o
if(l!==s)throw A.a(A.z("Missing data: expected "+s+" plots, got "+l+". Fill or estimate missing plots first."))
s=A.Q(a3).i("B<1,c>")
i=A.ah(new A.B(a3,new A.d2(),s))/l
h=A.ah(new A.B(a3,new A.d3(i),s))
s=A.y(r).i("v<2>")
j=t.i
g=o*A.ah(A.c6(new A.v(r,s),new A.d4(i),s.i("f.E"),j))
s=A.y(q).i("v<2>")
f=p*A.ah(A.c6(new A.v(q,s),new A.d5(i),s.i("f.E"),j))
e=h-g-f
d=p-1
c=o-1
b=d*c
a=e/b
a0=g/d
a1=f/c
return new A.b9("RCBD",A.b([A.d9("Block",c,f,a1,a1/a,b),A.d9("Treatment",d,g,a0,a0/a,b),new A.H("Error",b,e,a,a2,a2,a2,a2),new A.H("Total",l-1,h,a2,a2,a2,a2,a2)],t.o),A.el(r),i,a,b)},
d9(a,b,c,d,e,f){return new A.H(a,b,c,d,e,A.eu(e,b,f),A.dE(0.05,b,f),A.dE(0.01,b,f))},
el(a){var s,r,q,p,o=A.b([],t.J)
for(s=new A.J(a,A.y(a).i("J<1,2>")).gp(0);s.k();){r=s.d
q=r.a
p=r.b
o.push(new A.x(q,A.cw(p),J.t(p)))}return o},
dy(a,b,c){var s,r,q,p,o,n,m=A.q(c,t.c)
for(s=a.length,r=t.Y,q=0;q<a.length;a.length===s||(0,A.l)(a),++q){p=a[q]
o=b.$1(p)
n=m.h(0,o)
if(n==null){n=A.b([],r)
m.j(0,o,n)
o=n}else o=n
J.b7(o,p)}return m},
ah(a){return a.u(0,0,new A.cy())},
cw(a){var s=J.r(a)
return A.ah(s.a3(a,new A.cx(),t.i))/s.gl(a)},
C:function C(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e},
H:function H(a,b,c,d,e,f,g,h){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g
_.w=h},
x:function x(a,b,c){this.a=a
this.b=b
this.c=c},
b9:function b9(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f},
bP:function bP(){},
bO:function bO(){},
b8:function b8(a){this.a=a},
cB:function cB(){},
cC:function cC(){},
cD:function cD(a){this.a=a},
cE:function cE(a){this.a=a},
d_:function d_(){},
d0:function d0(){},
d1:function d1(){},
d2:function d2(){},
d3:function d3(a){this.a=a},
d4:function d4(a){this.a=a},
d5:function d5(a){this.a=a},
cy:function cy(){},
cx:function cx(){},
hL(a){var s,r,q,p
if(a<=0)return-1/0
if(a>=1)return 1/0
if(a<0.02425){s=Math.sqrt(-2*Math.log(a))
r=(((((-0.007784894002430293*s+-0.3223964580411365)*s+-2.400758277161838)*s+-2.549732539343734)*s+4.374664141464968)*s+2.938163982698783)/((((0.007784695709041462*s+0.3224671290700398)*s+2.445134137142996)*s+3.754408661907416)*s+1)}else if(a<=0.97575){s=a-0.5
q=s*s
r=(((((-39.69683028665376*q+220.9460984245205)*q+-275.9285104469687)*q+138.357751867269)*q+-30.66479806614716)*q+2.506628277459239)*s/(((((-54.47609879822406*q+161.5858368580409)*q+-155.6989798598866)*q+66.80131188771972)*q+-13.28068155288572)*q+1)}else{s=Math.sqrt(-2*Math.log(1-a))
r=-(((((-0.007784894002430293*s+-0.3223964580411365)*s+-2.400758277161838)*s+-2.549732539343734)*s+4.374664141464968)*s+2.938163982698783)/((((0.007784695709041462*s+0.3224671290700398)*s+2.445134137142996)*s+3.754408661907416)*s+1)}p=(0.5*(1+A.bM(r/1.4142135623730951))-a)*Math.sqrt(6.283185307179586)*Math.exp(r*r/2)
return r-p/(1+r*p/2)},
hQ(a4){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3=a4.length
if(a3<3)return null
s=t.i
r=A.dp(a4,s)
B.a.aK(r)
q=B.a.X(r,new A.dd())/a3
p=B.a.u(r,0,new A.de(q))
if(p<=1e-12*(1+Math.abs(q)))return null
if(a3===3){o=Math.pow(0.7071067811865476*(r[2]-r[0]),2)/p
return new A.aN(o,B.d.aw(1.909859317102744*(Math.asin(Math.sqrt(o))-Math.asin(Math.sqrt(0.75))),0,1),a3)}n=A.b([],t.n)
for(m=a3+0.25,l=1;l<=a3;++l)n.push(A.hL((l-0.375)/m))
k=B.a.u(n,0,new A.df())
j=Math.sqrt(k)
i=1/Math.sqrt(a3)
h=new A.dg()
g=-n[0]/j+h.$2(B.x,i)
f=A.c4(a3,0,!1,s)
s=2*g*g
if(a3>5){e=-n[1]/j+h.$2(B.D,i)
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
if(a0<=0)return new A.aN(o,0,a3)
a1=(-Math.log(a0)-(0.544-0.39978*a3+0.025054*a3*a3-0.0006714*a3*a3*a3))/a}else{a2=Math.log(a3)
a=Math.exp(0.0030302*a2*a2-0.082676*a2-0.4803)
a1=(Math.log(s)-(0.0038915*a2*a2*a2-0.083751*a2*a2-0.31082*a2-1.5861))/a}return new A.aN(o,B.d.aw(1-0.5*(1+A.bM(a1/1.4142135623730951)),0,1),a3)},
hv(b1,b2,b3){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7=b2?A.er(b1):A.eq(b1),a8=t.N,a9=t.i,b0=A.q(a8,a9)
for(s=a7.c,r=s.length,q=0;p=s.length,q<p;s.length===r||(0,A.l)(s),++q){o=s[q]
b0.j(0,o.a,o.b)}n=b1.length
m=a7.d
s=t.S
l=A.q(s,a9)
if(b2){k=A.q(s,t.p)
for(r=t.n,q=0;q<b1.length;b1.length===n||(0,A.l)(b1),++q){j=b1[q]
i=j.d
i.toString
h=k.h(0,i)
if(h==null){h=A.b([],r)
k.j(0,i,h)
i=h}else i=h
J.b7(i,j.e)}a9=A.q(s,a9)
for(r=new A.J(k,k.$ti.i("J<1,2>")).gp(0);r.k();){g=r.d
i=g.a
h=g.b
f=J.r(h)
a9.j(0,i,f.X(h,new A.d6())/f.gl(h))}e=k.a
l=a9}else e=0
d=A.q(a8,s)
for(a8=b1.length,q=0;q<b1.length;b1.length===a8||(0,A.l)(b1),++q){a9=b1[q].c
s=d.h(0,a9)
d.j(0,a9,(s==null?0:s)+1)}c=a7.f
b=a7.e
a=A.b([],t.l)
a0=A.b([],t.n)
for(a8=b1.length,a9=c-1,s=c>1,r=!(b<=1e-12),a1=1/p+1/e-1/(p*e),q=0;q<b1.length;b1.length===a8||(0,A.l)(b1),++q){j=b1[q]
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
a4=!s||a6<=1e-9?J.eU(a5)*(1/0):a5*Math.sqrt(a9/a6)}a0.push(g)
p=b0.h(0,p)
p.toString
a.push(new A.bx(j,a2,g,a4,p))}return new A.bT(a,n>=3?A.hQ(a0):null,b3)},
aN:function aN(a,b,c){this.a=a
this.b=b
this.c=c},
dd:function dd(){},
de:function de(a){this.a=a},
df:function df(){},
dg:function dg(){},
bx:function bx(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e},
bT:function bT(a,b,c){this.a=a
this.b=b
this.c=c},
d6:function d6(){},
b5(a){var s,r,q
if(a<0.5)return Math.log(3.141592653589793/Math.sin(3.141592653589793*a))-A.b5(1-a);--a
s=a+7+0.5
for(r=0.9999999999998099,q=1;q<9;++q)r+=B.A[q]/(a+q)
return 0.5*Math.log(6.283185307179586)+(a+0.5)*Math.log(s)-s+Math.log(r)},
bM(a){var s
if(a===0)return 0
s=a<0?-1:1
a=Math.abs(a)
return s*A.hh(0.5,a*a)},
hh(a,b){var s,r,q,p,o,n,m,l,k,j,i
if(b<=0)return 0
s=A.b5(a)
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
hH(a,b,c){var s,r,q
if(a<=0)return 0
if(a>=1)return 1
s=b+c
r=1-a
q=Math.exp(A.b5(s)-A.b5(b)-A.b5(c)+b*Math.log(a)+c*Math.log(r))
if(a<(b+1)/(s+2))return q*A.ed(a,b,c)/b
return 1-q*A.ed(r,c,b)/c},
ed(a,b,c){var s,r,q,p,o,n,m,l,k,j=b+c,i=b+1,h=b-1,g=1-j*a/i
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
eu(a,b,c){if(isNaN(a)||a<=0)return 1
if(a==1/0||a==-1/0)return 0
return A.hH(c/(c+b*a),c/2,b/2)},
dE(a,b,c){return A.ee(new A.d8(b,c,a),0,1e4,!0)},
hM(a,b,c){var s,r,q,p,o,n,m,l,k,j,i,h,g,f
if(a<=0)return 0
if(c<2||b<2)return 0/0
if(c>25e3)return A.ep(a,1,b)
s=c*0.5
r=Math.log(c)
q=A.b5(s)
p=s-1
o=c*0.25
if(c<=100)n=1
else if(c<=800)n=0.5
else n=c<=5000?0.25:0.125
m=s*r-c*0.6931471805599453-q+Math.log(n)
for(l=0,k=1;k<=50;++k){j=(2*k-1)*n
for(i=0,h=1;h<=16;++h){r=8<h
if(r){g=h-8-1
f=m+p*Math.log(j+B.e[g]*n)-(B.e[g]*n+j)*o}else{g=h-1
f=m+p*Math.log(j-B.e[g]*n)+(B.e[g]*n-j)*o}if(f>=-30)i+=A.ep(r?a*Math.sqrt((B.e[g]*n+j)*0.5):a*Math.sqrt((-(B.e[g]*n)+j)*0.5),1,b)*B.z[g]*Math.exp(f)}if(k*n>=1&&i<=1e-14)break
l+=i}return Math.min(1,l)},
ep(a1,a2,a3){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0=a1*0.5
if(a0>=8)return 1
s=2*(0.5*(1+A.bM(a0/1.4142135623730951)))-1
s=s>=1?1:Math.pow(s,a3)
r=a1>3?2:3
q=(8-a0)/r
p=a0+q
o=a3-1
for(n=-30/o,m=a0,l=0,k=1;k<=r;++k,m=p,p=a){j=0.5*(p+m)
i=0.5*(p-m)
for(h=0,g=1;g<=12;++g){if(6<g){f=12-g+1
e=B.j[f-1]}else{e=-B.j[g-1]
f=g}d=j+i*e
c=d*d
if(c>60)break
b=2*(0.5*(1+A.bM(d/1.4142135623730951)))*0.5-2*(0.5*(1+A.bM((d-a1)/1.4142135623730951)))*0.5
if(b>=Math.exp(n))h+=B.C[f-1]*Math.exp(-(0.5*c))*Math.pow(b,o)}l+=h*(2*i*a3*0.3989422804014327)
a=p+q}s+=l
if(s<=Math.exp(-30/a2))return 0
s=Math.pow(s,a2)
return s>=1?1:s},
ex(a,b,c){return A.ee(new A.dc(b,c,a),0,100,!1)},
ee(a,b,c,d){var s,r,q
for(s=0;s<200;++s){r=0.5*(b+c)
q=a.$1(r)
if(d?q>0:q<0)b=r
else c=r
if(c-b<1e-10)break}return 0.5*(b+c)},
d8:function d8(a,b,c){this.a=a
this.b=b
this.c=c},
dc:function dc(a,b,c){this.a=a
this.b=b
this.c=c},
ak(a){return J.eV(a,new A.d7(),t.N).R(0,"x")},
hp(c0,c1,c2){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3,b4,b5,b6,b7,b8,b9=null
if(c0.length===0||B.a.H(c0,new A.cF()))throw A.a(A.z("Every plot needs its factor levels."))
s=J.t(B.a.ga2(c0).a.a)
if(s<2||s>3||B.a.H(c0,new A.cG(s)))throw A.a(A.z("Factorial analysis supports 2 or 3 factors."))
r=A.b([],t.E)
for(q=t.s,p=0;p<s;++p)r.push(A.b([],q))
for(q=c0.length,o=0;o<c0.length;c0.length===q||(0,A.l)(c0),++o)for(n=c0[o].a,p=0;p<s;++p){m=r[p]
l=n.a
k=J.I(l)
j=A.y(n).y[1]
if(!J.dK(m,j.a(k.h(l,p))))J.b7(r[p],j.a(k.h(l,p)))}for(q=c1!=null,p=0;p<s;++p){i=q&&p<c1.length?c1[p]:b9
J.dM(r[p],new A.cH(new A.cY(i)))
if(J.t(r[p])<2)throw A.a(A.z("Each factor needs at least 2 levels."))}h=B.a.u(r,1,new A.cL())
q=t.N
n=t.p
g=A.q(q,n)
for(m=c0.length,l=t.n,o=0;o<c0.length;c0.length===m||(0,A.l)(c0),++o){f=c0[o]
k=f.a.R(0,"|")
j=g.h(0,k)
if(j==null){j=A.b([],l)
g.j(0,k,j)
k=j}else k=j
J.b7(k,f.e)}m=g.a
if(m!==h)throw A.a(A.z("Missing combinations: expected "+h+", got "+m+"."))
m=g.$ti
k=m.i("v<2>")
e=J.t(new A.v(g,k).ga2(0))
if(new A.v(g,k).H(0,new A.cM(e)))throw A.a(A.z("Unbalanced data: every combination needs the same number of plots."))
if(e<2)throw A.a(A.z("Need replication: at least 2 plots per combination."))
d=new A.cW()
c=new A.cZ()
b=c0.length
a=d.$1(new A.B(c0,new A.cN(),A.Q(c0).i("B<1,c>")))
a0=B.a.u(c0,0,new A.cO(c,a))
k=t.i
j=A.q(q,k)
for(m=new A.J(g,m.i("J<1,2>")).gp(0);m.k();){a1=m.d
j.j(0,a1.a,d.$1(a1.b))}a2=new A.bi(c2?"RCBD":"CRD",B.B,r,j,e,a,0,0)
m=A.b([],t.q)
for(a3=B.b.ar(1,s),a4=t.t,a5=1;a5<a3;++a5){a6=A.b([],a4)
for(p=0;p<s;++p)if((a5&B.b.ar(1,p))>>>0!==0)a6.push(p)
m.push(a6)}B.a.M(m,new A.cP())
a3=A.q(q,k)
for(a4=m.length,o=0;a6=m.length,o<a6;m.length===a4||(0,A.l)(m),++o){a7=m[o]
a6=A.ak(a7)
a8=a2.a4(a7)
a9=a2.aj(a7)
a3.j(0,a6,a8*new A.v(a9,A.y(a9).i("v<2>")).u(0,0,new A.cQ(c,a)))}k=A.q(q,k)
for(a4=t.v,o=0;o<m.length;m.length===a6||(0,A.l)(m),++o){a7=m[o]
k.j(0,A.ak(a7),new A.aT(m,new A.cR(a7),a4).u(0,0,new A.cS(a7,a3)))}a3=a3.h(0,A.ak(B.a.gaD(m)))
a3.toString
if(c2){if(B.a.H(c0,new A.cI()))throw A.a(A.z("Every plot needs a block for RCBD."))
b0=A.q(t.S,n)
b1=A.dV(q)
for(q=c0.length,o=0;o<c0.length;c0.length===q||(0,A.l)(c0),++o){f=c0[o]
n=f.d
a4=A.k(n)
if(!b1.O(0,a4+"|"+f.a.R(0,"|")))throw A.a(A.z("A combination appears twice in block "+a4+". Average sub-samples first."))
n.toString
a4=b0.h(0,n)
if(a4==null){a4=A.b([],l)
b0.j(0,n,a4)
n=a4}else n=a4
n.push(f.e)}b2=b0.a
if(b2!==e||new A.v(b0,b0.$ti.i("v<2>")).H(0,new A.cJ(h)))throw A.a(A.z("Every block must contain every combination exactly once."))
b3=h*new A.v(b0,b0.$ti.i("v<2>")).u(0,0,new A.cK(c,d,a))}else{b3=0
b2=0}b4=a0-a3-b3
q=e-1
b5=c2?(h-1)*q:h*q
b6=b4/b5
b7=new A.cT(r)
b8=new A.cV(b6,b5)
q=c2?"RCBD":"CRD"
n=A.b([],t.o)
if(c2)n.push(b8.$3("Block",b2-1,b3))
for(l=m.length,o=0;o<m.length;m.length===l||(0,A.l)(m),++o){a7=m[o]
a3=A.ak(a7)
a4=b7.$1(a7)
a6=k.h(0,A.ak(a7))
a6.toString
n.push(b8.$3(a3,a4,a6))}n.push(new A.H("Error",b5,b4,b6,b9,b9,b9,b9))
n.push(new A.H("Total",b-1,a0,b9,b9,b9,b9,b9))
return new A.bi(q,n,r,j,e,a,b6,b5)},
d7:function d7(){},
aQ:function aQ(a,b,c,d,e,f,g,h){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g
_.w=h},
bi:function bi(a,b,c,d,e,f,g,h){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g
_.w=h},
bU:function bU(a){this.a=a},
bX:function bX(a,b){this.a=a
this.b=b},
bV:function bV(){},
bW:function bW(){},
cF:function cF(){},
cG:function cG(a){this.a=a},
cY:function cY(a){this.a=a},
cH:function cH(a){this.a=a},
cL:function cL(){},
cM:function cM(a){this.a=a},
cW:function cW(){},
cX:function cX(){},
cZ:function cZ(){},
cN:function cN(){},
cO:function cO(a,b){this.a=a
this.b=b},
cP:function cP(){},
cQ:function cQ(a,b){this.a=a
this.b=b},
cR:function cR(a){this.a=a},
cS:function cS(a,b){this.a=a
this.b=b},
cI:function cI(){},
cJ:function cJ(a){this.a=a},
cK:function cK(a,b,c){this.a=a
this.b=b
this.c=c},
cT:function cT(a){this.a=a},
cU:function cU(a){this.a=a},
cV:function cV(a,b){this.a=a
this.b=b},
fP(a,b){var s,r,q,p,o,n,m,l,k="abcdefghijklmnopqrstuvwxyz",j=a.length,i=A.b([],t.u)
for(s=0;s<j;++s){r=s
for(;;){q=r+1
if(!(q<j&&a[s]-a[q]<b[r-s]))break
r=q}if(i.length===0||r>B.a.gaD(i).b)i.push(new A.E(s,r))}p=A.c4(j,"",!1,t.N)
for(o=i.length,n=0;n<o;++n){m=n<26?k[n]:k[B.b.aI(n,26)]+B.b.C(n,26)
for(l=i[n],s=l.a;s<=l.b;++s)p[s]=p[s]+m}return p},
bw:function bw(a,b,c){this.a=a
this.b=b
this.c=c},
c9:function c9(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
ae:function ae(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
O:function O(){},
ca:function ca(){},
cb:function cb(){},
bg:function bg(){},
bB:function bB(){},
bs:function bs(){},
hO(a,b,c){var s,r,q,p,o,n,m,l=new A.bJ()
l.am(b)
s=A.b([],t.u)
for(r=1;r<=a;++r)for(q=0;q<c;++q)s.push(new A.E(q,r))
B.a.ak(s,l)
p=A.b([],t.A)
for(o=0;o<s.length;o=n){n=o+1
m=s[o]
p.push(new A.aK(n,m.a,m.b,null))}return p},
hP(a,b,c){var s,r,q,p,o,n,m,l,k,j,i=new A.bJ()
i.am(b)
s=A.b([],t.A)
for(r=t.t,q=c<0,p="Length must be a non-negative integer: "+c,o=1;o<=a;++o){if(q)A.dh(A.bQ(p))
n=A.b(new Array(c),r)
for(m=0;m<c;++m)n[m]=m
B.a.ak(n,i)
for(l=n.length,k=0;k<n.length;n.length===l||(0,A.l)(n),++k){j=n[k]
s.push(new A.aK(s.length+1,j,o,o))}}return s},
aK:function aK(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
eA(a,b){var s,r,q,p,o
try{s=b.length===0?A.q(t.N,t.z):B.c.aX(b,null)
p=$.dI().h(0,a)
p.toString
p=p.$1(t.a.a(s))
return p}catch(o){p=A.dG(o)
if(p instanceof A.b8){r=p
p=t.N
return B.c.F(A.w(["error","anova","message",r.a],p,p),null)}else{q=p
p=t.N
p=B.c.F(A.w(["error","invalid","message",J.ao(q)],p,p),null)
return p}}},
n(a){if(a==null)return null
if(isNaN(a))return null
if(a==1/0||a==-1/0)return a>0?1e9:-1e9
return a},
em(a){var s,r,q,p,o,n,m,l,k,j=A.b([],t.Y)
for(s=J.dj(t.j.a(a),t.a),r=s.$ti,s=new A.a2(s,s.gl(0),r.i("a2<M.E>")),q=t.N,p=t.L,r=r.i("M.E");s.k();){o=s.d
if(o==null)o=r.a(o)
n=o.h(0,"id")
m=A.dx(o.h(0,"trt"))
l=A.cs(o.h(0,"block"))
l=l==null?null:B.d.Y(l)
k=A.b4(o.h(0,"value"))
o=p.a(o.h(0,"levels"))
j.push(new A.C(o==null?null:J.dj(o,q),n,m,l,k))}return j},
hm(a){return B.a.az(B.h,new A.cz(a),new A.cA())},
dB(a){return A.w(["source",a.a,"df",a.b,"ss",A.n(a.c),"ms",A.n(a.d),"f",A.n(a.e),"p",A.n(a.f),"fCrit05",A.n(a.r),"fCrit01",A.n(a.w),"sig",a.gaJ()],t.N,t.X)},
en(a){var s,r,q,p,o,n,m,l=A.fX(a.a),k=A.b([],t.d)
for(s=a.c,r=s.length,q=t.N,p=t.X,o=0;o<s.length;s.length===r||(0,A.l)(s),++o){n=s[o]
k.push(A.w(["trt",n.a,"mean",A.n(n.b),"letters",n.c],q,p))}s=[]
for(r=a.d,m=r.length,o=0;o<r.length;r.length===m||(0,A.l)(r),++o)s.push(A.n(r[o]))
return A.w(["test",l,"alpha",a.b,"ranked",k,"criticalRanges",s],q,p)},
fX(a){return B.a.af(B.h,new A.cv(a)).gV()},
fY(a){var s,r,q,p=A.b([],t.r)
for(s=t.N,r=0;r<3;++r){q=B.h[r]
p.push(A.w(["id",q.gV(),"name",q.gW()],s,s))}return B.c.F(A.w(["freeActiveLimit",1,"tests",p],s,t.K),null)},
he(a){var s,r,q,p,o,n,m,l=B.d.Y(A.b4(a.h(0,"treatments"))),k=B.d.Y(A.b4(a.h(0,"reps"))),j=B.d.Y(A.b4(a.h(0,"seed")))
if(l<2||k<2)throw A.a(A.z("Need at least 2 treatments and 2 replications."))
s=J.G(a.h(0,"design"),"rcbd")?A.hP(k,j,l):A.hO(k,j,l)
r=A.b([],t.G)
for(q=s.length,p=t.N,o=t.I,n=0;n<s.length;s.length===q||(0,A.l)(s),++n){m=s[n]
r.push(A.w(["n",m.a,"t",m.b,"rep",m.c,"block",m.d],p,o))}return B.c.F(A.w(["plots",r],p,t.h),null)},
fB(a1){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0=A.em(a1.h(0,"data"))
if(a0.length===0)throw A.a(A.z("No data."))
s=J.G(a1.h(0,"rcbd"),!0)
r=A.hm(a1.h(0,"test"))
q=A.cs(a1.h(0,"alpha"))
p=q==null?null:q
if(p==null)p=0.05
if(J.G(a1.h(0,"factorial"),!0))return B.c.F(A.fS(a0,s,r,p,t.L.a(a1.h(0,"orders"))),null)
o=s?A.er(a0):A.eq(a0)
q=o.c
n=o.e
m=o.f
l=r.a5(new A.ae(q,n,m,o.gaA()),p)
k=t.d
j=A.b([],k)
for(i=o.b,h=i.length,g=0;g<i.length;i.length===h||(0,A.l)(i),++g)j.push(A.dB(i[g]))
i=o.d
h=A.n(i)
f=A.n(n)
i=A.n(Math.sqrt(n)/i*100)
n=A.n(o.gaA())
e=A.dB(o.gb5())
k=A.b([],k)
for(d=q.length,c=t.N,b=t.X,g=0;g<q.length;q.length===d||(0,A.l)(q),++g){a=q[g]
k.push(A.w(["trt",a.a,"mean",A.n(a.b),"n",a.c],c,b))}return B.c.F(A.w(["kind","single","design",o.a,"rows",j,"grandMean",h,"mse",f,"dfError",m,"cv",i,"harmonicReps",n,"treatment",e,"means",k,"postHoc",A.en(l)],c,b),null)},
fS(a3,a4,a5,a6,a7){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2
if(a7==null)s=null
else{s=A.b([],t.E)
for(r=J.T(a7),q=t.j,p=t.N;r.k();)s.push(J.dj(q.a(r.gm()),p))}o=A.hp(a3,s,a4)
n=new A.cu()
s=t.N
r=t.X
m=A.q(s,r)
for(q=o.gag(),p=q.length,l=t.d,k=o.c,j=t.K,i=0;i<q.length;q.length===p||(0,A.l)(q),++i){h=q[i]
if(h==="AxBxC"){g=A.b([],l)
for(f=J.T(k[2]);f.k();){e=f.gm()
d=A.q(s,r)
d.j(0,"slice",A.w(["factor",2,"level",e],s,j))
d.U(0,n.$1(o.aF(a5,0,1,a6,new A.E(2,e))))
g.push(d)}m.j(0,h,g)}else{g=B.E.h(0,h)
g.toString
f=A.q(s,r)
f.j(0,"slice",null)
f.U(0,n.$1(o.b4(a5,g[0],g[1],a6)))
m.j(0,h,A.b([f],l))}}q=A.b([],l)
for(p=o.b,j=p.length,i=0;i<p.length;p.length===j||(0,A.l)(p),++i)q.push(A.dB(p[i]))
p=o.f
j=A.n(p)
g=o.r
f=A.n(g)
e=o.w
p=A.n(g<=0?0:100*Math.sqrt(g)/p)
d=o.gag()
c=A.b([],t.s)
for(b=o.gag(),a=b.length,i=0;i<b.length;b.length===a||(0,A.l)(b),++i){a0=b[i]
a1=o.b3(a0).f
if((a1==null?1:a1)<a6)c.push(a0)}l=A.b([],l)
for(b=t.t,a2=0;a2<k.length;++a2){a=A.q(s,r)
a.j(0,"factor",a2)
a.U(0,A.en(a5.a5(new A.ae(o.b1(a2),g,e,o.a4(A.b([a2],b))),a6)))
l.push(a)}return A.w(["kind","factorial","design",o.a,"rows",q,"levels",k,"grandMean",j,"mse",f,"dfError",e,"cv",p,"reps",o.e,"interactionSources",d,"significant",c,"main",l,"tables",m],s,r)},
fO(a){var s,r,q,p,o,n,m,l=A.em(a.h(0,"data")),k=J.G(a.h(0,"rcbd"),!0),j=A.cs(a.h(0,"threshold"))
if(j==null)j=null
s=A.hv(l,k,j==null?3:j)
l=s.b
l=l==null?null:A.w(["w",A.n(l.a),"p",A.n(l.b),"n",l.c],t.N,t.X)
k=A.b([],t.d)
for(j=s.a,r=j.length,q=t.N,p=t.X,o=0;o<j.length;j.length===r||(0,A.l)(j),++o){n=j[o]
m=n.a
k.push(A.w(["id",m.b,"trt",m.c,"block",m.d,"value",A.n(m.e),"fitted",A.n(n.b),"residual",A.n(n.c),"studentized",A.n(n.d),"trtMean",A.n(n.e)],q,p))}j=[]
for(r=s.gb2(),m=r.length,o=0;o<r.length;r.length===m||(0,A.l)(r),++o)j.push(r[o].a.b)
return B.c.F(A.w(["threshold",s.c,"normality",l,"points",k,"outliers",j],q,p),null)},
da:function da(){},
cz:function cz(a){this.a=a},
cA:function cA(){},
cv:function cv(a){this.a=a},
cu:function cu(){},
hK(){var s,r,q,p,o,n={}
for(s=$.dI(),s=new A.aa(s,s.r,s.e),r=A.fN;s.k();){q=s.d
p=new A.db(q)
if(typeof p=="function")A.dh(A.bQ("Attempting to rewrap a JS function."))
o=function(a,b){return function(c){return a(b,c,arguments.length)}}(r,p)
o[$.dH()]=p
n[q]=o}v.G.RancobCore=n},
db:function db(a){this.a=a},
ey(a){return v.mangledGlobalNames[a]},
hR(a){throw A.F(new A.bp("Field '"+a+"' has been assigned during initialization."),new Error())},
fN(a,b,c){if(c>=1)return a.$1(b)
return a.$0()}},B={}
var w=[A,J,B]
var $={}
A.dm.prototype={}
J.bk.prototype={
T(a,b){return a===b},
gt(a){return A.bu(a)},
n(a){return"Instance of '"+A.bv(a)+"'"},
gL(a){return A.aj(A.dz(this))}}
J.bm.prototype={
n(a){return String(a)},
gt(a){return a?519018:218159},
gL(a){return A.aj(t.y)},
$iX:1}
J.aE.prototype={
T(a,b){return null==b},
n(a){return"null"},
gt(a){return 0},
$iX:1}
J.au.prototype={$iat:1}
J.a1.prototype={
gt(a){return 0},
n(a){return String(a)}}
J.c8.prototype={}
J.Z.prototype={}
J.aG.prototype={
n(a){var s=a[$.eB()]
if(s==null)s=a[$.dH()]
if(s==null)return this.aL(a)
return"JavaScript function for "+J.ao(s)}}
J.i.prototype={
a0(a,b){return new A.U(a,A.Q(a).i("@<1>").B(b).i("U<1,2>"))},
O(a,b){a.$flags&1&&A.b6(a,29)
a.push(b)},
U(a,b){var s
a.$flags&1&&A.b6(a,"addAll",2)
if(Array.isArray(b)){this.aN(a,b)
return}for(s=J.T(b);s.k();)a.push(s.gm())},
aN(a,b){var s,r=b.length
if(r===0)return
if(a===b)throw A.a(A.p(a))
for(s=0;s<r;++s)a.push(b[s])},
a3(a,b,c){return new A.B(a,b,A.Q(a).i("@<1>").B(c).i("B<1,2>"))},
R(a,b){var s,r=A.c4(a.length,"",!1,t.N)
for(s=0;s<a.length;++s)r[s]=A.k(a[s])
return r.join(b)},
X(a,b){var s,r,q=a.length
if(q===0)throw A.a(A.aq())
s=a[0]
for(r=1;r<q;++r){s=b.$2(s,a[r])
if(q!==a.length)throw A.a(A.p(a))}return s},
I(a,b,c){var s,r,q=a.length
for(s=b,r=0;r<q;++r){s=c.$2(s,a[r])
if(a.length!==q)throw A.a(A.p(a))}return s},
u(a,b,c){return this.I(a,b,c,t.z)},
az(a,b,c){var s,r,q=a.length
for(s=0;s<q;++s){r=a[s]
if(b.$1(r))return r
if(a.length!==q)throw A.a(A.p(a))}if(c!=null)return c.$0()
throw A.a(A.aq())},
af(a,b){return this.az(a,b,null)},
A(a,b){return a[b]},
ga2(a){if(a.length>0)return a[0]
throw A.a(A.aq())},
gaD(a){var s=a.length
if(s>0)return a[s-1]
throw A.a(A.aq())},
H(a,b){var s,r=a.length
for(s=0;s<r;++s){if(b.$1(a[s]))return!0
if(a.length!==r)throw A.a(A.p(a))}return!1},
ae(a,b){var s,r=a.length
for(s=0;s<r;++s){if(!b.$1(a[s]))return!1
if(a.length!==r)throw A.a(A.p(a))}return!0},
M(a,b){var s,r,q,p,o
a.$flags&2&&A.b6(a,"sort")
s=a.length
if(s<2)return
if(b==null)b=J.h1()
if(s===2){r=a[0]
q=a[1]
if(b.$2(r,q)>0){a[0]=q
a[1]=r}return}p=0
if(A.Q(a).c.b(null))for(o=0;o<a.length;++o)if(a[o]===void 0){a[o]=null;++p}a.sort(A.hx(b,2))
if(p>0)this.aU(a,p)},
aK(a){return this.M(a,null)},
aU(a,b){var s,r=a.length
for(;s=r-1,r>0;r=s)if(a[s]===null){a[s]=void 0;--b
if(b===0)break}},
ak(a,b){var s,r,q
a.$flags&2&&A.b6(a,"shuffle")
if(b==null)b=B.o
s=a.length
while(s>1){r=b.aE(s);--s
q=a[s]
a[s]=a[r]
a[r]=q}},
v(a,b){var s
for(s=0;s<a.length;++s)if(J.G(a[s],b))return!0
return!1},
gq(a){return a.length===0},
gK(a){return a.length!==0},
n(a){return A.dl(a,"[","]")},
gp(a){return new J.ap(a,a.length,A.Q(a).i("ap<1>"))},
gt(a){return A.bu(a)},
gl(a){return a.length},
sl(a,b){a.$flags&1&&A.b6(a,"set length","change the length of")
if(b<0)throw A.a(A.aL(b,0,null,"newLength",null))
if(b>a.length)A.Q(a).c.a(null)
a.length=b},
h(a,b){if(!(b>=0&&b<a.length))throw A.a(A.et(a,b))
return a[b]},
j(a,b,c){a.$flags&2&&A.b6(a)
if(!(b>=0&&b<a.length))throw A.a(A.et(a,b))
a[b]=c},
$im:1,
$if:1,
$ih:1}
J.bl.prototype={
b6(a){var s,r,q
if(!Array.isArray(a))return null
s=a.$flags|0
if((s&4)!==0)r="const, "
else if((s&2)!==0)r="unmodifiable, "
else r=(s&1)!==0?"fixed, ":""
q="Instance of '"+A.bv(a)+"'"
if(r==="")return q
return q+" ("+r+"length: "+a.length+")"}}
J.bZ.prototype={}
J.ap.prototype={
gm(){var s=this.d
return s==null?this.$ti.c.a(s):s},
k(){var s,r=this,q=r.a,p=q.length
if(r.b!==p)throw A.a(A.l(q))
s=r.c
if(s>=p){r.d=null
return!1}r.d=q[s]
r.c=s+1
return!0}}
J.as.prototype={
E(a,b){var s
if(a<b)return-1
else if(a>b)return 1
else if(a===b){if(a===0){s=this.gai(b)
if(this.gai(a)===s)return 0
if(this.gai(a))return-1
return 1}return 0}else if(isNaN(a)){if(isNaN(b))return 0
return 1}else return-1},
gai(a){return a===0?1/a<0:a<0},
gal(a){var s
if(a>0)s=1
else s=a<0?-1:a
return s},
Y(a){var s
if(a>=-2147483648&&a<=2147483647)return a|0
if(isFinite(a)){s=a<0?Math.ceil(a):Math.floor(a)
return s+0}throw A.a(A.e0(""+a+".toInt()"))},
aw(a,b,c){if(B.b.E(b,c)>0)throw A.a(A.hu(b))
if(this.E(a,b)<0)return b
if(this.E(a,c)>0)return c
return a},
n(a){if(a===0&&1/a<0)return"-0.0"
else return""+a},
gt(a){var s,r,q,p,o=a|0
if(a===o)return o&536870911
s=Math.abs(a)
r=Math.log(s)/0.6931471805599453|0
q=Math.pow(2,r)
p=s<1?s/q:q/s
return((p*9007199254740992|0)+(p*3542243181176521|0))*599197+r*1259&536870911},
aI(a,b){var s=a%b
if(s===0)return 0
if(s>0)return s
return s+b},
C(a,b){return(a|0)===a?a/b|0:this.aW(a,b)},
aW(a,b){var s=a/b
if(s>=-2147483648&&s<=2147483647)return s|0
if(s>0){if(s!==1/0)return Math.floor(s)}else if(s>-1/0)return Math.ceil(s)
throw A.a(A.e0("Result of truncating division is "+A.k(s)+": "+A.k(a)+" ~/ "+b))},
ar(a,b){return b>31?0:a<<b>>>0},
au(a,b){var s
if(a>0)s=this.aV(a,b)
else{s=b>31?31:b
s=a>>s>>>0}return s},
aV(a,b){return b>31?0:a>>>b},
gL(a){return A.aj(t.H)},
$iV:1,
$ic:1}
J.ar.prototype={
gal(a){var s
if(a>0)s=1
else s=a<0?-1:a
return s},
gL(a){return A.aj(t.S)},
$iX:1,
$ie:1}
J.aF.prototype={
gL(a){return A.aj(t.i)},
$iX:1}
J.a8.prototype={
Z(a,b,c){return a.substring(b,A.fe(b,c,a.length))},
E(a,b){var s
if(a===b)s=0
else s=a<b?-1:1
return s},
n(a){return a},
gt(a){var s,r,q
for(s=a.length,r=0,q=0;q<s;++q){r=r+a.charCodeAt(q)&536870911
r=r+((r&524287)<<10)&536870911
r^=r>>6}r=r+((r&67108863)<<3)&536870911
r^=r>>11
return r+((r&16383)<<15)&536870911},
gL(a){return A.aj(t.N)},
gl(a){return a.length},
$iX:1,
$iV:1,
$id:1}
A.a_.prototype={
gp(a){return new A.bc(J.T(this.gG()),A.y(this).i("bc<1,2>"))},
gl(a){return J.t(this.gG())},
gq(a){return J.dL(this.gG())},
gK(a){return J.eS(this.gG())},
v(a,b){return J.dK(this.gG(),b)},
n(a){return J.ao(this.gG())}}
A.bc.prototype={
k(){return this.a.k()},
gm(){return this.$ti.y[1].a(this.a.gm())}}
A.a6.prototype={
gG(){return this.a}}
A.aV.prototype={$im:1}
A.aU.prototype={
h(a,b){return this.$ti.y[1].a(J.dJ(this.a,b))},
j(a,b,c){J.eN(this.a,b,this.$ti.c.a(c))},
sl(a,b){J.eW(this.a,b)},
O(a,b){J.b7(this.a,this.$ti.c.a(b))},
M(a,b){var s=b==null?null:new A.ch(this,b)
J.dM(this.a,s)},
$im:1,
$ih:1}
A.ch.prototype={
$2(a,b){var s=this.a.$ti.y[1]
return this.b.$2(s.a(a),s.a(b))},
$S(){return this.a.$ti.i("e(1,1)")}}
A.U.prototype={
a0(a,b){return new A.U(this.a,this.$ti.i("@<1>").B(b).i("U<1,2>"))},
gG(){return this.a}}
A.bp.prototype={
n(a){return"LateInitializationError: "+this.a}}
A.cc.prototype={}
A.m.prototype={}
A.R.prototype={
gp(a){var s=this
return new A.a2(s,s.gl(s),A.y(s).i("a2<R.E>"))},
gq(a){return this.gl(this)===0},
v(a,b){var s,r=this,q=r.gl(r)
for(s=0;s<q;++s){if(J.G(r.A(0,s),b))return!0
if(q!==r.gl(r))throw A.a(A.p(r))}return!1},
R(a,b){var s,r,q,p=this,o=p.gl(p)
if(b.length!==0){if(o===0)return""
s=A.k(p.A(0,0))
if(o!==p.gl(p))throw A.a(A.p(p))
for(r=s,q=1;q<o;++q){r=r+b+A.k(p.A(0,q))
if(o!==p.gl(p))throw A.a(A.p(p))}return r.charCodeAt(0)==0?r:r}else{for(q=0,r="";q<o;++q){r+=A.k(p.A(0,q))
if(o!==p.gl(p))throw A.a(A.p(p))}return r.charCodeAt(0)==0?r:r}},
I(a,b,c){var s,r,q=this,p=q.gl(q)
for(s=b,r=0;r<p;++r){s=c.$2(s,q.A(0,r))
if(p!==q.gl(q))throw A.a(A.p(q))}return s},
u(a,b,c){return this.I(0,b,c,t.z)}}
A.a2.prototype={
gm(){var s=this.d
return s==null?this.$ti.c.a(s):s},
k(){var s,r=this,q=r.a,p=q.gl(q)
if(r.b!==p)throw A.a(A.p(q))
s=r.c
if(s>=p){r.d=null
return!1}r.d=q.A(0,s);++r.c
return!0}}
A.ad.prototype={
gp(a){return new A.bt(J.T(this.a),this.b,A.y(this).i("bt<1,2>"))},
gl(a){return J.t(this.a)},
gq(a){return J.dL(this.a)}}
A.aD.prototype={$im:1}
A.bt.prototype={
k(){var s=this,r=s.b
if(r.k()){s.a=s.c.$1(r.gm())
return!0}s.a=null
return!1},
gm(){var s=this.a
return s==null?this.$ti.y[1].a(s):s}}
A.B.prototype={
gl(a){return J.t(this.a)},
A(a,b){return this.b.$1(J.eO(this.a,b))}}
A.aT.prototype={
gp(a){return new A.bD(J.T(this.a),this.b)}}
A.bD.prototype={
k(){var s,r
for(s=this.a,r=this.b;s.k();)if(r.$1(s.gm()))return!0
return!1},
gm(){return this.a.gm()}}
A.b3.prototype={}
A.E.prototype={$r:"+(1,2)",$s:1}
A.bL.prototype={$r:"+lower,upper(1,2)",$s:2}
A.aB.prototype={
gq(a){return this.gl(this)===0},
n(a){return A.dq(this)},
$iA:1}
A.aC.prototype={
gl(a){return this.b.length},
gaS(){var s=this.$keys
if(s==null){s=Object.keys(this.a)
this.$keys=s}return s},
P(a){if(typeof a!="string")return!1
if("__proto__"===a)return!1
return this.a.hasOwnProperty(a)},
h(a,b){if(!this.P(b))return null
return this.b[this.a[b]]},
J(a,b){var s,r,q=this.gaS(),p=this.b
for(s=q.length,r=0;r<s;++r)b.$2(q[r],p[r])}}
A.aM.prototype={}
A.cf.prototype={
D(a){var s,r,q=this,p=new RegExp(q.a).exec(a)
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
A.aJ.prototype={
n(a){return"Null check operator used on a null value"}}
A.bn.prototype={
n(a){var s,r=this,q="NoSuchMethodError: method not found: '",p=r.b
if(p==null)return"NoSuchMethodError: "+r.a
s=r.c
if(s==null)return q+p+"' ("+r.a+")"
return q+p+"' on '"+s+"' ("+r.a+")"}}
A.bC.prototype={
n(a){var s=this.a
return s.length===0?"Error":"Error: "+s}}
A.c7.prototype={
n(a){return"Throw of null ('"+(this.a===null?"null":"undefined")+"' from JavaScript)"}}
A.a7.prototype={
n(a){var s=this.constructor,r=s==null?null:s.name
return"Closure '"+A.ez(r==null?"unknown":r)+"'"},
gb9(){return this},
$C:"$1",
$R:1,
$D:null}
A.bR.prototype={$C:"$0",$R:0}
A.bS.prototype={$C:"$2",$R:2}
A.ce.prototype={}
A.cd.prototype={
n(a){var s=this.$static_name
if(s==null)return"Closure of unknown static method"
return"Closure '"+A.ez(s)+"'"}}
A.aA.prototype={
T(a,b){if(b==null)return!1
if(this===b)return!0
if(!(b instanceof A.aA))return!1
return this.$_target===b.$_target&&this.a===b.a},
gt(a){return(A.ew(this.a)^A.bu(this.$_target))>>>0},
n(a){return"Closure '"+this.$_name+"' of "+("Instance of '"+A.bv(this.a)+"'")}}
A.by.prototype={
n(a){return"RuntimeError: "+this.a}}
A.a9.prototype={
gl(a){return this.a},
gq(a){return this.a===0},
gS(){return new A.ab(this,A.y(this).i("ab<1>"))},
P(a){var s=this.b
if(s==null)return!1
return s[a]!=null},
U(a,b){b.J(0,new A.c_(this))},
h(a,b){var s,r,q,p,o=null
if(typeof b=="string"){s=this.b
if(s==null)return o
r=s[b]
q=r==null?o:r.b
return q}else if(typeof b=="number"&&(b&0x3fffffff)===b){p=this.c
if(p==null)return o
r=p[b]
q=r==null?o:r.b
return q}else return this.b0(b)},
b0(a){var s,r,q=this.d
if(q==null)return null
s=this.aR(q,a)
r=this.aC(s,a)
if(r<0)return null
return s[r].b},
j(a,b,c){var s,r,q,p,o,n,m=this
if(typeof b=="string"){s=m.b
m.an(s==null?m.b=m.ab():s,b,c)}else if(typeof b=="number"&&(b&0x3fffffff)===b){r=m.c
m.an(r==null?m.c=m.ab():r,b,c)}else{q=m.d
if(q==null)q=m.d=m.ab()
p=m.aB(b)
o=q[p]
if(o==null)q[p]=[m.ac(b,c)]
else{n=m.aC(o,b)
if(n>=0)o[n].b=c
else o.push(m.ac(b,c))}}},
J(a,b){var s=this,r=s.e,q=s.r
while(r!=null){b.$2(r.a,r.b)
if(q!==s.r)throw A.a(A.p(s))
r=r.c}},
an(a,b,c){var s=a[b]
if(s==null)a[b]=this.ac(b,c)
else s.b=c},
ac(a,b){var s=this,r=new A.c3(a,b)
if(s.e==null)s.e=s.f=r
else s.f=s.f.c=r;++s.a
s.r=s.r+1&1073741823
return r},
aB(a){return J.S(a)&1073741823},
aR(a,b){return a[this.aB(b)]},
aC(a,b){var s,r
if(a==null)return-1
s=a.length
for(r=0;r<s;++r)if(J.G(a[r].a,b))return r
return-1},
n(a){return A.dq(this)},
ab(){var s=Object.create(null)
s["<non-identifier-key>"]=s
delete s["<non-identifier-key>"]
return s}}
A.c_.prototype={
$2(a,b){this.a.j(0,a,b)},
$S(){return A.y(this.a).i("~(1,2)")}}
A.c3.prototype={}
A.ab.prototype={
gl(a){return this.a.a},
gq(a){return this.a.a===0},
gp(a){var s=this.a
return new A.aa(s,s.r,s.e)},
v(a,b){return this.a.P(b)}}
A.aa.prototype={
gm(){return this.d},
k(){var s,r=this,q=r.a
if(r.b!==q.r)throw A.a(A.p(q))
s=r.c
if(s==null){r.d=null
return!1}else{r.d=s.a
r.c=s.c
return!0}}}
A.v.prototype={
gl(a){return this.a.a},
gq(a){return this.a.a===0},
gp(a){var s=this.a
return new A.br(s,s.r,s.e)}}
A.br.prototype={
gm(){return this.d},
k(){var s,r=this,q=r.a
if(r.b!==q.r)throw A.a(A.p(q))
s=r.c
if(s==null){r.d=null
return!1}else{r.d=s.b
r.c=s.c
return!0}}}
A.J.prototype={
gl(a){return this.a.a},
gq(a){return this.a.a===0},
gp(a){var s=this.a
return new A.bq(s,s.r,s.e,this.$ti.i("bq<1,2>"))}}
A.bq.prototype={
gm(){var s=this.d
s.toString
return s},
k(){var s,r=this,q=r.a
if(r.b!==q.r)throw A.a(A.p(q))
s=r.c
if(s==null){r.d=null
return!1}else{r.d=new A.ac(s.a,s.b,r.$ti.i("ac<1,2>"))
r.c=s.c
return!0}}}
A.aX.prototype={
n(a){return this.av(!1)},
av(a){var s,r,q,p,o,n=this.aP(),m=this.ap(),l=(a?"Record ":"")+"("
for(s=n.length,r="",q=0;q<s;++q,r=", "){l+=r
p=n[q]
if(typeof p=="string")l=l+p+": "
o=m[q]
l=a?l+A.dX(o):l+A.k(o)}l+=")"
return l.charCodeAt(0)==0?l:l},
aP(){var s,r=this.$s
while($.co.length<=r)$.co.push(null)
s=$.co[r]
if(s==null){s=this.aO()
$.co[r]=s}return s},
aO(){var s,r,q,p=this.$r,o=p.indexOf("("),n=p.substring(1,o),m=p.substring(o),l=m==="()"?0:m.replace(/[^,]/g,"").length+1,k=t.K,j=J.f5(l,k)
for(s=0;s<l;++s)j[s]=s
if(n!==""){r=n.split(",")
s=r.length
for(q=l;s>0;){--q;--s
j[q]=r[s]}}j=A.fb(j,!1,k)
j.$flags=3
return j}}
A.bK.prototype={
ap(){return[this.a,this.b]},
T(a,b){if(b==null)return!1
return b instanceof A.bK&&this.$s===b.$s&&J.G(this.a,b.a)&&J.G(this.b,b.b)},
gt(a){return A.fc(this.$s,this.a,this.b,B.i)}}
A.P.prototype={
i(a){return A.b2(v.typeUniverse,this,a)},
B(a){return A.ea(v.typeUniverse,this,a)}}
A.bF.prototype={}
A.cp.prototype={
n(a){return A.K(this.a,null)}}
A.bE.prototype={
n(a){return this.a}}
A.aZ.prototype={}
A.aW.prototype={
gp(a){var s=this,r=new A.bI(s,s.r,s.$ti.i("bI<1>"))
r.c=s.e
return r},
gl(a){return this.a},
gq(a){return this.a===0},
gK(a){return this.a!==0},
v(a,b){var s=this.b
if(s==null)return!1
return s[b]!=null},
O(a,b){var s,r,q=this
if(typeof b=="string"&&b!=="__proto__"){s=q.b
return q.ao(s==null?q.b=A.du():s,b)}else if(typeof b=="number"&&(b&1073741823)===b){r=q.c
return q.ao(r==null?q.c=A.du():r,b)}else return q.aM(b)},
aM(a){var s,r,q=this,p=q.d
if(p==null)p=q.d=A.du()
s=J.S(a)&1073741823
r=p[s]
if(r==null)p[s]=[q.a8(a)]
else{if(q.aQ(r,a)>=0)return!1
r.push(q.a8(a))}return!0},
ao(a,b){if(a[b]!=null)return!1
a[b]=this.a8(b)
return!0},
a8(a){var s=this,r=new A.cn(a)
if(s.e==null)s.e=s.f=r
else s.f=s.f.b=r;++s.a
s.r=s.r+1&1073741823
return r},
aQ(a,b){var s,r
if(a==null)return-1
s=a.length
for(r=0;r<s;++r)if(J.G(a[r].a,b))return r
return-1}}
A.cn.prototype={}
A.bI.prototype={
gm(){var s=this.d
return s==null?this.$ti.c.a(s):s},
k(){var s=this,r=s.c,q=s.a
if(s.b!==q.r)throw A.a(A.p(q))
else if(r==null){s.d=null
return!1}else{s.d=r.a
s.c=r.b
return!0}}}
A.M.prototype={
gp(a){return new A.a2(this,this.gl(0),this.$ti.i("a2<M.E>"))},
A(a,b){return this.$ti.y[1].a(J.dJ(this.a,b))},
gq(a){return J.t(this.a)===0},
gK(a){return J.t(this.a)!==0},
v(a,b){var s,r,q=this.a,p=J.I(q),o=p.gl(q)
for(s=this.$ti.y[1],r=0;r<o;++r){if(J.G(s.a(p.h(q,r)),b))return!0
if(o!==p.gl(q))throw A.a(A.p(this))}return!1},
ae(a,b){var s,r,q=this.a,p=J.I(q),o=p.gl(q)
for(s=this.$ti.y[1],r=0;r<o;++r){if(!b.$1(s.a(p.h(q,r))))return!1
if(o!==p.gl(q))throw A.a(A.p(this))}return!0},
R(a,b){var s
if(J.t(this.a)===0)return""
s=A.ds("",this,b)
return s.charCodeAt(0)==0?s:s},
a3(a,b,c){return new A.B(this,b,this.$ti.i("@<M.E>").B(c).i("B<1,2>"))},
X(a,b){var s,r,q,p=this.a,o=J.I(p),n=o.gl(p)
if(n===0)throw A.a(A.aq())
s=this.$ti.y[1]
r=s.a(o.h(p,0))
for(q=1;q<n;++q){r=b.$2(r,s.a(o.h(p,q)))
if(n!==o.gl(p))throw A.a(A.p(this))}return r},
I(a,b,c){var s,r,q,p=this.a,o=J.I(p),n=o.gl(p)
for(s=this.$ti.y[1],r=b,q=0;q<n;++q){r=c.$2(r,s.a(o.h(p,q)))
if(n!==o.gl(p))throw A.a(A.p(this))}return r},
u(a,b,c){return this.I(0,b,c,t.z)},
O(a,b){var s=this.a,r=J.I(s),q=r.gl(s)
r.sl(s,q+1)
r.j(s,q,this.$ti.c.a(b))},
a0(a,b){return new A.U(this,this.$ti.i("@<M.E>").B(b).i("U<1,2>"))},
M(a,b){var s=b==null?A.hw():b
A.bz(this,0,J.t(this.a)-1,s)},
b_(a,b){var s,r,q,p
for(s=this.a,r=J.I(s),q=this.$ti.y[1],p=0;p<r.gl(s);++p)if(J.G(q.a(r.h(s,p)),b))return p
return-1},
n(a){return A.dl(this,"[","]")}}
A.W.prototype={
J(a,b){var s,r,q,p
for(s=this.gS(),s=s.gp(s),r=A.y(this).i("W.V");s.k();){q=s.gm()
p=this.h(0,q)
b.$2(q,p==null?r.a(p):p)}},
gl(a){var s=this.gS()
return s.gl(s)},
gq(a){var s=this.gS()
return s.gq(s)},
n(a){return A.dq(this)},
$iA:1}
A.c5.prototype={
$2(a,b){var s,r=this.a
if(!r.a)this.b.a+=", "
r.a=!1
r=this.b
s=A.k(a)
r.a=(r.a+=s)+": "
s=A.k(b)
r.a+=s},
$S:9}
A.aw.prototype={
gq(a){return this.a===0},
gK(a){return this.a!==0},
n(a){return A.dl(this,"{","}")},
$im:1,
$if:1}
A.aY.prototype={}
A.bG.prototype={
h(a,b){var s,r=this.b
if(r==null)return this.c.h(0,b)
else if(typeof b!="string")return null
else{s=r[b]
return typeof s=="undefined"?this.aT(b):s}},
gl(a){return this.b==null?this.c.a:this.a_().length},
gq(a){return this.gl(0)===0},
gS(){if(this.b==null){var s=this.c
return new A.ab(s,A.y(s).i("ab<1>"))}return new A.bH(this)},
P(a){if(this.b==null)return this.c.P(a)
return Object.prototype.hasOwnProperty.call(this.a,a)},
J(a,b){var s,r,q,p,o=this
if(o.b==null)return o.c.J(0,b)
s=o.a_()
for(r=0;r<s.length;++r){q=s[r]
p=o.b[q]
if(typeof p=="undefined"){p=A.ct(o.a[q])
o.b[q]=p}b.$2(q,p)
if(s!==o.c)throw A.a(A.p(o))}},
a_(){var s=this.c
if(s==null)s=this.c=A.b(Object.keys(this.a),t.s)
return s},
aT(a){var s
if(!Object.prototype.hasOwnProperty.call(this.a,a))return null
s=A.ct(this.a[a])
return this.b[a]=s}}
A.bH.prototype={
gl(a){return this.a.gl(0)},
A(a,b){var s=this.a
return s.b==null?s.gS().A(0,b):s.a_()[b]},
gp(a){var s=this.a
if(s.b==null){s=s.gS()
s=s.gp(s)}else{s=s.a_()
s=new J.ap(s,s.length,A.Q(s).i("ap<1>"))}return s},
v(a,b){return this.a.P(b)}}
A.bd.prototype={}
A.bf.prototype={}
A.aH.prototype={
n(a){var s=A.bh(this.a)
return(this.b!=null?"Converting object to an encodable object failed:":"Converting object did not return an encodable object:")+" "+s}}
A.bo.prototype={
n(a){return"Cyclic error in JSON stringify"}}
A.c0.prototype={
aX(a,b){var s=A.hf(a,this.gaY().a)
return s},
F(a,b){var s=A.fj(a,this.gaZ().b,null)
return s},
gaZ(){return B.t},
gaY(){return B.r}}
A.c2.prototype={}
A.c1.prototype={}
A.cl.prototype={
aH(a){var s,r,q,p,o,n,m=a.length
for(s=this.c,r=0,q=0;q<m;++q){p=a.charCodeAt(q)
if(p>92){if(p>=55296){o=p&64512
if(o===55296){n=q+1
n=!(n<m&&(a.charCodeAt(n)&64512)===56320)}else n=!1
if(!n)if(o===56320){o=q-1
o=!(o>=0&&(a.charCodeAt(o)&64512)===55296)}else o=!1
else o=!0
if(o){if(q>r)s.a+=B.f.Z(a,r,q)
r=q+1
o=A.D(92)
s.a+=o
o=A.D(117)
s.a+=o
o=A.D(100)
s.a+=o
o=p>>>8&15
o=A.D(o<10?48+o:87+o)
s.a+=o
o=p>>>4&15
o=A.D(o<10?48+o:87+o)
s.a+=o
o=p&15
o=A.D(o<10?48+o:87+o)
s.a+=o}}continue}if(p<32){if(q>r)s.a+=B.f.Z(a,r,q)
r=q+1
o=A.D(92)
s.a+=o
switch(p){case 8:o=A.D(98)
s.a+=o
break
case 9:o=A.D(116)
s.a+=o
break
case 10:o=A.D(110)
s.a+=o
break
case 12:o=A.D(102)
s.a+=o
break
case 13:o=A.D(114)
s.a+=o
break
default:o=A.D(117)
s.a+=o
o=A.D(48)
s.a=(s.a+=o)+o
o=p>>>4&15
o=A.D(o<10?48+o:87+o)
s.a+=o
o=p&15
o=A.D(o<10?48+o:87+o)
s.a+=o
break}}else if(p===34||p===92){if(q>r)s.a+=B.f.Z(a,r,q)
r=q+1
o=A.D(92)
s.a+=o
o=A.D(p)
s.a+=o}}if(r===0)s.a+=a
else if(r<m)s.a+=B.f.Z(a,r,m)},
a7(a){var s,r,q,p
for(s=this.a,r=s.length,q=0;q<r;++q){p=s[q]
if(a==null?p==null:a===p)throw A.a(new A.bo(a,null))}s.push(a)},
a6(a){var s,r,q,p,o=this
if(o.aG(a))return
o.a7(a)
try{s=o.b.$1(a)
if(!o.aG(s)){q=A.dU(a,null,o.gaq())
throw A.a(q)}o.a.pop()}catch(p){r=A.dG(p)
q=A.dU(a,r,o.gaq())
throw A.a(q)}},
aG(a){var s,r,q=this
if(typeof a=="number"){if(!isFinite(a))return!1
q.c.a+=B.d.n(a)
return!0}else if(a===!0){q.c.a+="true"
return!0}else if(a===!1){q.c.a+="false"
return!0}else if(a==null){q.c.a+="null"
return!0}else if(typeof a=="string"){s=q.c
s.a+='"'
q.aH(a)
s.a+='"'
return!0}else if(t.j.b(a)){q.a7(a)
q.b7(a)
q.a.pop()
return!0}else if(t.f.b(a)){q.a7(a)
r=q.b8(a)
q.a.pop()
return r}else return!1},
b7(a){var s,r,q=this.c
q.a+="["
s=J.r(a)
if(s.gK(a)){this.a6(s.h(a,0))
for(r=1;r<s.gl(a);++r){q.a+=","
this.a6(s.h(a,r))}}q.a+="]"},
b8(a){var s,r,q,p,o,n=this,m={}
if(a.gq(a)){n.c.a+="{}"
return!0}s=a.gl(a)*2
r=A.c4(s,null,!1,t.X)
q=m.a=0
m.b=!0
a.J(0,new A.cm(m,r))
if(!m.b)return!1
p=n.c
p.a+="{"
for(o='"';q<s;q+=2,o=',"'){p.a+=o
n.aH(A.dx(r[q]))
p.a+='":'
n.a6(r[q+1])}p.a+="}"
return!0}}
A.cm.prototype={
$2(a,b){var s,r,q,p
if(typeof a!="string")this.a.b=!1
s=this.b
r=this.a
q=r.a
p=r.a=q+1
s[q]=a
r.a=p+1
s[p]=b},
$S:9}
A.ck.prototype={
gaq(){var s=this.c.a
return s.charCodeAt(0)==0?s:s}}
A.o.prototype={}
A.ba.prototype={
n(a){var s=this.a
if(s!=null)return"Assertion failed: "+A.bh(s)
return"Assertion failed"}}
A.aR.prototype={}
A.a0.prototype={
gaa(){return"Invalid argument"+(!this.a?"(s)":"")},
ga9(){return""},
n(a){var s=this,r=s.c,q=r==null?"":" ("+r+")",p=s.d,o=p==null?"":": "+p,n=s.gaa()+q+o
if(!s.a)return n
return n+s.ga9()+": "+A.bh(s.gah())},
gah(){return this.b}}
A.av.prototype={
gah(){return this.b},
gaa(){return"RangeError"},
ga9(){var s,r=this.e,q=this.f
if(r==null)s=q!=null?": Not less than or equal to "+A.k(q):""
else if(q==null)s=": Not greater than or equal to "+A.k(r)
else if(q>r)s=": Not in inclusive range "+A.k(r)+".."+A.k(q)
else s=q<r?": Valid value range is empty":": Only valid value is "+A.k(r)
return s}}
A.bj.prototype={
gah(){return this.b},
gaa(){return"RangeError"},
ga9(){if(this.b<0)return": index must not be negative"
var s=this.f
if(s===0)return": no indices are valid"
return": index should be less than "+s},
gl(a){return this.f}}
A.aS.prototype={
n(a){return"Unsupported operation: "+this.a}}
A.bA.prototype={
n(a){return"Bad state: "+this.a}}
A.be.prototype={
n(a){var s=this.a
if(s==null)return"Concurrent modification during iteration."
return"Concurrent modification during iteration: "+A.bh(s)+"."}}
A.aO.prototype={
n(a){return"Stack Overflow"},
$io:1}
A.ci.prototype={
n(a){return"Exception: "+this.a}}
A.bY.prototype={
n(a){var s=this.a,r=""!==s?"FormatException: "+s:"FormatException"
return r}}
A.f.prototype={
a0(a,b){return A.eZ(this,A.y(this).i("f.E"),b)},
a3(a,b,c){return A.c6(this,b,A.y(this).i("f.E"),c)},
v(a,b){var s
for(s=this.gp(this);s.k();)if(J.G(s.gm(),b))return!0
return!1},
X(a,b){var s,r=this.gp(this)
if(!r.k())throw A.a(A.aq())
s=r.gm()
while(r.k())s=b.$2(s,r.gm())
return s},
I(a,b,c){var s,r
for(s=this.gp(this),r=b;s.k();)r=c.$2(r,s.gm())
return r},
u(a,b,c){return this.I(0,b,c,t.z)},
ae(a,b){var s
for(s=this.gp(this);s.k();)if(!b.$1(s.gm()))return!1
return!0},
H(a,b){var s
for(s=this.gp(this);s.k();)if(b.$1(s.gm()))return!0
return!1},
gl(a){var s,r=this.gp(this)
for(s=0;r.k();)++s
return s},
gq(a){return!this.gp(this).k()},
gK(a){return!this.gq(this)},
ga2(a){var s=this.gp(this)
if(!s.k())throw A.a(A.aq())
return s.gm()},
A(a,b){var s,r
A.fd(b,"index")
s=this.gp(this)
for(r=b;s.k();){if(r===0)return s.gm();--r}throw A.a(A.dT(b,b-r,this,"index"))},
n(a){return A.f4(this,"(",")")}}
A.ac.prototype={
n(a){return"MapEntry("+A.k(this.a)+": "+A.k(this.b)+")"}}
A.aI.prototype={
gt(a){return A.j.prototype.gt.call(this,0)},
n(a){return"null"}}
A.j.prototype={$ij:1,
T(a,b){return this===b},
gt(a){return A.bu(this)},
n(a){return"Instance of '"+A.bv(this)+"'"},
gL(a){return A.hF(this)},
toString(){return this.n(this)}}
A.aP.prototype={
gl(a){return this.a.length},
n(a){var s=this.a
return s.charCodeAt(0)==0?s:s}}
A.cj.prototype={
aE(a){if(a<=0||a>4294967296)throw A.a(A.dY(u.c+a))
return Math.random()*a>>>0}}
A.bJ.prototype={
am(a){var s,r,q,p,o,n,m,l=this,k=4294967296,j=a<0?-1:0
do{s=a>>>0
a=B.b.C(a-s,k)
r=a>>>0
a=B.b.C(a-r,k)
q=(~s>>>0)+(s<<21>>>0)
p=q>>>0
r=(~r>>>0)+((r<<21|s>>>11)>>>0)+B.b.C(q-p,k)>>>0
q=((p^(p>>>24|r<<8))>>>0)*265
s=q>>>0
r=((r^r>>>24)>>>0)*265+B.b.C(q-s,k)>>>0
q=((s^(s>>>14|r<<18))>>>0)*21
s=q>>>0
r=((r^r>>>14)>>>0)*21+B.b.C(q-s,k)>>>0
s=(s^(s>>>28|r<<4))>>>0
r=(r^r>>>28)>>>0
q=(s<<31>>>0)+s
p=q>>>0
o=B.b.C(q-p,k)
q=l.a*1037
n=l.a=q>>>0
m=l.b*1037+B.b.C(q-n,k)>>>0
l.b=m
n=(n^p)>>>0
l.a=n
o=(m^r+((r<<31|s>>>1)>>>0)+o>>>0)>>>0
l.b=o}while(a!==j)
if(o===0&&n===0)l.a=23063
l.N()
l.N()
l.N()
l.N()},
N(){var s=this,r=s.a,q=4294901760*r,p=q>>>0,o=55905*r,n=o>>>0,m=n+p+s.b
r=m>>>0
s.a=r
s.b=B.b.C(o-n+(q-p)+(m-r),4294967296)>>>0},
aE(a){var s,r,q,p=this
if(a<=0||a>4294967296)throw A.a(A.dY(u.c+a))
s=a-1
if((a&s)>>>0===0){p.N()
return(p.a&s)>>>0}do{p.N()
r=p.a
q=r%a}while(r-q+a>=4294967296)
return q}}
A.C.prototype={}
A.H.prototype={
gaJ(){var s=this.f
if(s==null)return""
if(s<0.01)return"**"
if(s<0.05)return"*"
return"ns"}}
A.x.prototype={}
A.b9.prototype={
gb5(){return B.a.af(this.b,new A.bP())},
gaA(){var s=this.c
return s.length/B.a.u(s,0,new A.bO())}}
A.bP.prototype={
$1(a){return a.a==="Treatment"},
$S:7}
A.bO.prototype={
$2(a,b){return a+1/b.c},
$S:14}
A.b8.prototype={
n(a){return"AnovaException: "+this.a}}
A.cB.prototype={
$1(a){return a.c},
$S:8}
A.cC.prototype={
$1(a){return a.e},
$S:1}
A.cD.prototype={
$1(a){var s=a.e-this.a
return s*s},
$S:1}
A.cE.prototype={
$1(a){var s=J.t(a),r=A.cw(a)-this.a
return s*(r*r)},
$S:6}
A.d_.prototype={
$1(a){return a.d==null},
$S:4}
A.d0.prototype={
$1(a){return a.c},
$S:8}
A.d1.prototype={
$1(a){var s=a.d
s.toString
return s},
$S:15}
A.d2.prototype={
$1(a){return a.e},
$S:1}
A.d3.prototype={
$1(a){var s=a.e-this.a
return s*s},
$S:1}
A.d4.prototype={
$1(a){var s=A.cw(a)-this.a
return s*s},
$S:6}
A.d5.prototype={
$1(a){var s=A.cw(a)-this.a
return s*s},
$S:6}
A.cy.prototype={
$2(a,b){return a+b},
$S:0}
A.cx.prototype={
$1(a){return a.e},
$S:1}
A.aN.prototype={}
A.dd.prototype={
$2(a,b){return a+b},
$S:0}
A.de.prototype={
$2(a,b){var s=b-this.a
return a+s*s},
$S:0}
A.df.prototype={
$2(a,b){return a+b*b},
$S:0}
A.dg.prototype={
$2(a,b){var s,r
for(s=0,r=5;r>=0;--r)s=s*b+a[r]
return s},
$S:16}
A.bx.prototype={}
A.bT.prototype={
gb2(){var s,r,q,p,o,n=A.b([],t.l)
for(s=this.a,r=s.length,q=this.c,p=0;p<s.length;s.length===r||(0,A.l)(s),++p){o=s[p]
if(Math.abs(o.d)>q)n.push(o)}return n}}
A.d6.prototype={
$2(a,b){return a+b},
$S:0}
A.d8.prototype={
$1(a){return A.eu(a,this.a,this.b)-this.c},
$S:5}
A.dc.prototype={
$1(a){return A.hM(a,this.a,this.b)-this.c},
$S:5}
A.d7.prototype={
$1(a){return B.y[a]},
$S:17}
A.aQ.prototype={}
A.bi.prototype={
b3(a){return B.a.af(this.b,new A.bU(a))},
gag(){var s=t.s,r=A.b([],s),q=this.c
if(q.length===3)r.push("AxBxC")
r.push("AxB")
if(q.length===3)B.a.U(r,A.b(["AxC","BxC"],s))
return r},
a4(a){var s,r,q,p=this.e
for(s=this.c,r=J.r(a),q=0;q<s.length;++q)if(!r.v(a,q))p*=J.t(s[q])
return p},
aj(a){var s,r,q,p,o,n,m,l,k=t.N,j=t.i,i=A.q(k,j),h=A.q(k,t.S)
for(s=this.d,s=new A.J(s,A.y(s).i("J<1,2>")).gp(0),r=J.r(a),q=t.s;s.k();){p=s.d
o=p.a.split("|")
n=A.b([],q)
for(m=r.gp(a);m.k();)n.push(o[m.gm()])
l=B.a.R(n,"|")
n=i.h(0,l)
if(n==null)n=0
i.j(0,l,n+p.b)
n=h.h(0,l)
h.j(0,l,(n==null?0:n)+1)}k=A.q(k,j)
for(j=new A.aa(i,i.r,i.e);j.k();){s=j.d
r=i.h(0,s)
r.toString
q=h.h(0,s)
q.toString
k.j(0,s,r/q)}return k},
b1(a){var s,r,q,p=t.t,o=this.aj(A.b([a],p)),n=A.b([],t.J)
for(s=J.T(this.c[a]);s.k();){r=s.gm()
q=o.h(0,r)
q.toString
n.push(new A.x(r,q,this.a4(A.b([a],p))))}return n},
aF(a6,a7,a8,a9,b0){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1=this,a2={},a3=a1.c,a4=a3[a7],a5=a3[a8]
a3=t.W
s=A.q(a3,t.i)
a2.a=null
if(b0==null){r=t.t
q=a1.aj(A.b([a7,a8],r))
for(p=J.T(a4),o=J.r(a5);p.k();){n=p.gm()
for(m=o.gp(a5),l=n+"|";m.k();){k=m.gm()
j=q.h(0,l+k)
j.toString
s.j(0,new A.E(n,k),j)}}a2.a=a1.a4(A.b([a7,a8],r))}else{for(r=a1.d,r=new A.J(r,A.y(r).i("J<1,2>")).gp(0),p=b0.a,o=b0.b;r.k();){i=r.d
h=i.a.split("|")
if(h[p]===o)s.j(0,new A.E(h[a7],h[a8]),i.b)}a2.a=a1.e}g=new A.bX(a2,a1)
r=t.N
f=A.q(a3,r)
e=A.q(a3,r)
for(r=J.r(a5),p=r.gp(a5),o=J.r(a4),n=t.J;p.k();){m=p.gm()
l=A.b([],n)
for(k=o.gp(a4);k.k();){j=k.gm()
d=s.h(0,new A.E(j,m))
d.toString
l.push(new A.x(j,d,a2.a))}for(l=a6.a5(g.$1(l),a9).c,k=l.length,c=0;c<l.length;l.length===k||(0,A.l)(l),++c){b=l[c]
f.j(0,new A.E(b.a,m),b.c)}}for(p=o.gp(a4);p.k();){m=p.gm()
l=A.b([],n)
for(k=r.gp(a5);k.k();){j=k.gm()
d=s.h(0,new A.E(m,j))
d.toString
l.push(new A.x(j,d,a2.a))}for(l=a6.a5(g.$1(l),a9).c,k=l.length,c=0;c<l.length;l.length===k||(0,A.l)(l),++c){b=l[c]
e.j(0,new A.E(m,b.a),b.c.toUpperCase())}}a=new A.bV()
a3=A.q(a3,t.B)
for(p=new A.aa(s,s.r,s.e);p.k();){a0=p.d
n=f.h(0,a0)
n.toString
m=e.h(0,a0)
m.toString
a3.j(0,a0,new A.bL(n,m))}p=t.n
n=A.b([],p)
for(m=o.gp(a4);m.k();){l=m.gm()
k=A.b([],p)
for(j=r.gp(a5);j.k();){d=s.h(0,new A.E(l,j.gm()))
d.toString
k.push(d)}n.push(a.$1(k))}m=A.b([],p)
for(r=r.gp(a5);r.k();){l=r.gm()
k=A.b([],p)
for(j=o.gp(a4);j.k();){d=s.h(0,new A.E(j.gm(),l))
d.toString
k.push(d)}m.push(a.$1(k))}return new A.aQ(a7,a8,a4,a5,s,a3,n,m)},
b4(a,b,c,d){return this.aF(a,b,c,d,null)}}
A.bU.prototype={
$1(a){return a.a===this.a},
$S:7}
A.bX.prototype={
$1(a){var s=this.b
return new A.ae(a,s.r,s.w,this.a.a)},
$S:18}
A.bV.prototype={
$1(a){return B.a.X(a,new A.bW())/a.length},
$S:10}
A.bW.prototype={
$2(a,b){return a+b},
$S:0}
A.cF.prototype={
$1(a){return a.a==null},
$S:4}
A.cG.prototype={
$1(a){return J.t(a.a.a)!==this.a},
$S:4}
A.cY.prototype={
$1(a){var s=this.a,r=s==null?null:s.b_(0,a)
if(r==null)r=-1
return r<0?1048576:r},
$S:19}
A.cH.prototype={
$2(a,b){var s=this.a
return J.dk(s.$1(a),s.$1(b))},
$S:20}
A.cL.prototype={
$2(a,b){return a*J.t(b)},
$S:35}
A.cM.prototype={
$1(a){return J.t(a)!==this.a},
$S:11}
A.cW.prototype={
$1(a){var s=J.r(a)
return s.u(a,0,new A.cX())/s.gl(a)},
$S:10}
A.cX.prototype={
$2(a,b){return a+b},
$S:0}
A.cZ.prototype={
$1(a){return a*a},
$S:5}
A.cN.prototype={
$1(a){return a.e},
$S:1}
A.cO.prototype={
$2(a,b){return a+this.a.$1(b.e-this.b)},
$S:21}
A.cP.prototype={
$2(a,b){var s=J.I(a),r=J.I(b)
return s.gl(a)!==r.gl(b)?B.b.E(s.gl(a),r.gl(b)):B.f.E(A.ak(a),A.ak(b))},
$S:22}
A.cQ.prototype={
$2(a,b){return a+this.a.$1(b-this.b)},
$S:0}
A.cR.prototype={
$1(a){return J.eP(a,J.eR(this.a))},
$S:23}
A.cS.prototype={
$2(a,b){var s=(J.t(this.a)-J.t(b)&1)===0?1:-1,r=this.b.h(0,A.ak(b))
r.toString
return a+s*r},
$S:24}
A.cI.prototype={
$1(a){return a.d==null},
$S:4}
A.cJ.prototype={
$1(a){return J.t(a)!==this.a},
$S:11}
A.cK.prototype={
$2(a,b){return a+this.a.$1(this.b.$1(b)-this.c)},
$S:31}
A.cT.prototype={
$1(a){return J.eQ(a,1,new A.cU(this.a))},
$S:26}
A.cU.prototype={
$2(a,b){return a*(J.t(this.a[b])-1)},
$S:27}
A.cV.prototype={
$3(a,b,c){var s=c/b
return A.d9(a,b,c,s,s/this.a,this.b)},
$S:28}
A.bw.prototype={}
A.c9.prototype={}
A.ae.prototype={}
A.O.prototype={
a5(a,b){var s,r,q,p,o,n,m,l,k=A.dp(a.a,t._)
B.a.M(k,new A.ca())
s=k.length
r=A.b([],t.n)
for(q=2;q<=s;++q)r.push(this.ad(q,s,a,b))
p=A.Q(k).i("B<1,c>")
p=A.dp(new A.B(k,new A.cb(),p),p.i("R.E"))
o=A.fP(p,r)
p=this.gW()
n=A.b([],t.M)
for(m=0;m<s;++m){l=k[m]
n.push(new A.bw(l.a,l.b,o[m]))}return new A.c9(p,b,n,r)}}
A.ca.prototype={
$2(a,b){return B.d.E(b.b,a.b)},
$S:29}
A.cb.prototype={
$1(a){return a.b},
$S:30}
A.bg.prototype={
gV(){return"dmrt"},
gW(){return"Duncan's Multiple Range Test"},
ad(a,b,c,d){return A.ex(Math.pow(1-d,a-1),a,c.c)*Math.sqrt(c.b/c.d)}}
A.bB.prototype={
gV(){return"tukey"},
gW(){return"Tukey HSD"},
ad(a,b,c,d){return A.ex(1-d,b,c.c)*Math.sqrt(c.b/c.d)}}
A.bs.prototype={
gV(){return"lsd"},
gW(){return"Fisher LSD"},
ad(a,b,c,d){return Math.sqrt(A.dE(d,1,c.c))*Math.sqrt(2)*Math.sqrt(c.b/c.d)}}
A.aK.prototype={}
A.da.prototype={
$1(a){var s=J.G(a.h(0,"pro"),!0),r=B.d.Y(A.b4(a.h(0,"activeCount")))
return B.c.F(A.w(["ok",s||r<1],t.N,t.y),null)},
$S:2}
A.cz.prototype={
$1(a){return a.gV()===this.a},
$S:12}
A.cA.prototype={
$0(){return B.a.ga2(B.h)},
$S:32}
A.cv.prototype={
$1(a){return a.gW()===this.a},
$S:12}
A.cu.prototype={
$1(a){var s,r,q,p,o,n,m,l,k,j,i,h=a.c,g=a.d,f=A.b([],t.D)
for(s=J.r(h),r=s.gp(h),q=J.r(g),p=a.e;r.k();){o=r.gm()
n=[]
for(m=q.gp(g);m.k();)n.push(A.n(p.h(0,new A.E(o,m.gm()))))
f.push(n)}r=t.E
p=A.b([],r)
for(o=s.gp(h),n=a.f,m=t.s;o.k();){l=o.gm()
k=A.b([],m)
for(j=q.gp(g);j.k();)k.push(n.h(0,new A.E(l,j.gm())).a)
p.push(k)}r=A.b([],r)
for(s=s.gp(h);s.k();){o=s.gm()
l=A.b([],m)
for(k=q.gp(g);k.k();)l.push(n.h(0,new A.E(o,k.gm())).b)
r.push(l)}s=[]
for(q=a.r,o=q.length,i=0;i<q.length;q.length===o||(0,A.l)(q),++i)s.push(A.n(q[i]))
q=[]
for(o=a.w,n=o.length,i=0;i<o.length;o.length===n||(0,A.l)(o),++i)q.push(A.n(o[i]))
return A.w(["rowFactor",a.a,"colFactor",a.b,"rows",h,"cols",g,"means",f,"lower",p,"upper",r,"rowMeans",s,"colMeans",q],t.N,t.X)},
$S:33}
A.db.prototype={
$1(a){return A.eA(this.a,a)},
$S:34};(function aliases(){var s=J.a1.prototype
s.aL=s.n})();(function installTearOffs(){var s=hunkHelpers._static_2,r=hunkHelpers._instance_1i,q=hunkHelpers._static_1
s(J,"h1","f9",13)
r(J.i.prototype,"ga1","v",3)
r(A.a_.prototype,"ga1","v",3)
s(A,"hw","fa",13)
r(A.M.prototype,"ga1","v",3)
q(A,"hz","fQ",25)
r(A.f.prototype,"ga1","v",3)
q(A,"hs","fY",2)
q(A,"ht","he",2)
q(A,"hq","fB",2)
q(A,"hr","fO",2)})();(function inheritance(){var s=hunkHelpers.mixin,r=hunkHelpers.inherit,q=hunkHelpers.inheritMany
r(A.j,null)
q(A.j,[A.dm,J.bk,A.aM,J.ap,A.f,A.bc,A.a7,A.o,A.cc,A.a2,A.bt,A.bD,A.aX,A.aB,A.cf,A.c7,A.W,A.c3,A.aa,A.br,A.bq,A.P,A.bF,A.cp,A.aw,A.cn,A.bI,A.M,A.bd,A.bf,A.cl,A.aO,A.ci,A.bY,A.ac,A.aI,A.aP,A.cj,A.bJ,A.C,A.H,A.x,A.b9,A.b8,A.aN,A.bx,A.bT,A.aQ,A.bi,A.bw,A.c9,A.ae,A.O,A.aK])
q(J.bk,[J.bm,J.aE,J.au,J.as,J.a8])
q(J.au,[J.a1,J.i])
q(J.a1,[J.c8,J.Z,J.aG])
r(J.bl,A.aM)
r(J.bZ,J.i)
q(J.as,[J.ar,J.aF])
q(A.f,[A.a_,A.m,A.ad,A.aT])
q(A.a_,[A.a6,A.b3])
r(A.aV,A.a6)
r(A.aU,A.b3)
q(A.a7,[A.bS,A.bR,A.ce,A.bP,A.cB,A.cC,A.cD,A.cE,A.d_,A.d0,A.d1,A.d2,A.d3,A.d4,A.d5,A.cx,A.d8,A.dc,A.d7,A.bU,A.bX,A.bV,A.cF,A.cG,A.cY,A.cM,A.cW,A.cZ,A.cN,A.cR,A.cI,A.cJ,A.cT,A.cV,A.cb,A.da,A.cz,A.cv,A.cu,A.db])
q(A.bS,[A.ch,A.c_,A.c5,A.cm,A.bO,A.cy,A.dd,A.de,A.df,A.dg,A.d6,A.bW,A.cH,A.cL,A.cX,A.cO,A.cP,A.cQ,A.cS,A.cK,A.cU,A.ca])
r(A.U,A.aU)
q(A.o,[A.bp,A.aR,A.bn,A.bC,A.by,A.bE,A.aH,A.ba,A.a0,A.aS,A.bA,A.be])
q(A.m,[A.R,A.ab,A.v,A.J])
r(A.aD,A.ad)
q(A.R,[A.B,A.bH])
r(A.bK,A.aX)
q(A.bK,[A.E,A.bL])
r(A.aC,A.aB)
r(A.aJ,A.aR)
q(A.ce,[A.cd,A.aA])
q(A.W,[A.a9,A.bG])
r(A.aZ,A.bE)
r(A.aY,A.aw)
r(A.aW,A.aY)
r(A.bo,A.aH)
r(A.c0,A.bd)
q(A.bf,[A.c2,A.c1])
r(A.ck,A.cl)
q(A.a0,[A.av,A.bj])
q(A.O,[A.bg,A.bB,A.bs])
r(A.cA,A.bR)
s(A.b3,A.M)})()
var v={G:typeof self!="undefined"?self:globalThis,typeUniverse:{eC:new Map(),tR:{},eT:{},tPV:{},sEA:[]},mangledGlobalNames:{e:"int",c:"double",a5:"num",d:"String",L:"bool",aI:"Null",h:"List",j:"Object",A:"Map",at:"JSObject"},mangledNames:{},types:["c(c,c)","c(C)","d(A<d,@>)","L(j?)","L(C)","c(c)","c(h<C>)","L(H)","d(C)","~(j?,j?)","c(f<c>)","L(h<c>)","L(O)","e(@,@)","c(c,x)","e(C)","c(h<c>,c)","d(e)","ae(h<x>)","e(d)","e(d,d)","c(c,C)","e(h<e>,h<e>)","L(h<e>)","c(c,h<e>)","@(@)","e(h<e>)","e(e,e)","H(d,e,c)","e(x,x)","c(x)","c(c,h<c>)","O()","A<d,j?>(aQ)","d(d)","e(e,h<d>)"],arrayRti:Symbol("$ti"),rttc:{"2;":(a,b)=>c=>c instanceof A.E&&a.b(c.a)&&b.b(c.b),"2;lower,upper":(a,b)=>c=>c instanceof A.bL&&a.b(c.a)&&b.b(c.b)}}
A.fy(v.typeUniverse,JSON.parse('{"c8":"a1","Z":"a1","aG":"a1","bm":{"X":[]},"aE":{"X":[]},"au":{"at":[]},"a1":{"at":[]},"i":{"h":["1"],"m":["1"],"at":[],"f":["1"]},"bl":{"aM":[]},"bZ":{"i":["1"],"h":["1"],"m":["1"],"at":[],"f":["1"]},"as":{"c":[],"V":["a5"]},"ar":{"c":[],"e":[],"V":["a5"],"X":[]},"aF":{"c":[],"V":["a5"],"X":[]},"a8":{"d":[],"V":["d"],"X":[]},"a_":{"f":["2"]},"a6":{"a_":["1","2"],"f":["2"],"f.E":"2"},"aV":{"a6":["1","2"],"a_":["1","2"],"m":["2"],"f":["2"],"f.E":"2"},"aU":{"M":["2"],"h":["2"],"a_":["1","2"],"m":["2"],"f":["2"]},"U":{"aU":["1","2"],"M":["2"],"h":["2"],"a_":["1","2"],"m":["2"],"f":["2"],"f.E":"2","M.E":"2"},"bp":{"o":[]},"m":{"f":["1"]},"R":{"m":["1"],"f":["1"]},"ad":{"f":["2"],"f.E":"2"},"aD":{"ad":["1","2"],"m":["2"],"f":["2"],"f.E":"2"},"B":{"R":["2"],"m":["2"],"f":["2"],"R.E":"2","f.E":"2"},"aT":{"f":["1"],"f.E":"1"},"aB":{"A":["1","2"]},"aC":{"aB":["1","2"],"A":["1","2"]},"aJ":{"o":[]},"bn":{"o":[]},"bC":{"o":[]},"by":{"o":[]},"a9":{"W":["1","2"],"A":["1","2"],"W.V":"2"},"ab":{"m":["1"],"f":["1"],"f.E":"1"},"v":{"m":["1"],"f":["1"],"f.E":"1"},"J":{"m":["ac<1,2>"],"f":["ac<1,2>"],"f.E":"ac<1,2>"},"bE":{"o":[]},"aZ":{"o":[]},"aW":{"aw":["1"],"m":["1"],"f":["1"]},"W":{"A":["1","2"]},"aw":{"m":["1"],"f":["1"]},"aY":{"aw":["1"],"m":["1"],"f":["1"]},"bG":{"W":["d","@"],"A":["d","@"],"W.V":"@"},"bH":{"R":["d"],"m":["d"],"f":["d"],"R.E":"d","f.E":"d"},"aH":{"o":[]},"bo":{"o":[]},"c":{"V":["a5"]},"e":{"V":["a5"]},"h":{"m":["1"],"f":["1"]},"a5":{"V":["a5"]},"d":{"V":["d"]},"ba":{"o":[]},"aR":{"o":[]},"a0":{"o":[]},"av":{"o":[]},"bj":{"o":[]},"aS":{"o":[]},"bA":{"o":[]},"be":{"o":[]},"aO":{"o":[]},"bg":{"O":[]},"bB":{"O":[]},"bs":{"O":[]}}'))
A.fx(v.typeUniverse,JSON.parse('{"bD":1,"b3":2,"aa":1,"br":1,"aY":1,"bd":2,"bf":2}'))
var u={c:"max must be in range 0 < max \u2264 2^32, was "}
var t=(function rtii(){var s=A.ay
return{U:s("V<@>"),O:s("m<@>"),C:s("o"),Z:s("hW"),o:s("i<H>"),E:s("i<h<d>>"),q:s("i<h<e>>"),D:s("i<h<j?>>"),r:s("i<A<d,d>>"),d:s("i<A<d,j?>>"),G:s("i<A<d,e?>>"),A:s("i<aK>"),Y:s("i<C>"),M:s("i<bw>"),u:s("i<+(e,e)>"),l:s("i<bx>"),s:s("i<d>"),J:s("i<x>"),n:s("i<c>"),b:s("i<@>"),t:s("i<e>"),T:s("aE"),m:s("at"),g:s("aG"),h:s("h<A<d,e?>>"),c:s("h<C>"),p:s("h<c>"),j:s("h<@>"),a:s("A<d,@>"),f:s("A<@,@>"),P:s("aI"),K:s("j"),Q:s("hX"),F:s("+()"),W:s("+(d,d)"),B:s("+lower,upper(d,d)"),N:s("d"),_:s("x"),R:s("X"),V:s("Z"),v:s("aT<h<e>>"),y:s("L"),i:s("c"),z:s("@"),S:s("e"),e:s("dS<aI>?"),k:s("at?"),L:s("h<@>?"),X:s("j?"),w:s("d?"),x:s("L?"),dd:s("c?"),I:s("e?"),ae:s("a5?"),H:s("a5")}})();(function constants(){var s=hunkHelpers.makeConstList
B.p=J.bk.prototype
B.a=J.i.prototype
B.b=J.ar.prototype
B.d=J.as.prototype
B.f=J.a8.prototype
B.q=J.au.prototype
B.l=function getTagFallback(o) {
  var s = Object.prototype.toString.call(o);
  return s.substring(8, s.length - 1);
}
B.c=new A.c0()
B.i=new A.cc()
B.o=new A.cj()
B.r=new A.c1(null)
B.t=new A.c2(null)
B.x=s([0,0.221157,-0.147981,-2.07119,4.434685,-2.706056],t.n)
B.y=s(["A","B","C"],t.s)
B.k=new A.bg()
B.n=new A.bB()
B.m=new A.bs()
B.h=s([B.k,B.n,B.m],A.ay("i<O>"))
B.j=s([0.9815606342467192,0.9041172563704749,0.7699026741943047,0.5873179542866175,0.3678314989981802,0.1252334085114689],t.n)
B.z=s([0.027152459411754096,0.062253523938647894,0.09515851168249279,0.12462897125553388,0.14959598881657674,0.16915651939500254,0.18260341504492358,0.1894506104550685],t.n)
B.A=s([0.9999999999998099,676.5203681218851,-1259.1392167224028,771.3234287776531,-176.6150291621406,12.507343278686905,-0.13857109526572012,0.000009984369578019572,15056327351493116e-23],t.n)
B.B=s([],t.o)
B.C=s([0.04717533638651183,0.10693932599531843,0.16007832854334622,0.20316742672306592,0.2334925365383548,0.24914704581340277],t.n)
B.e=s([0.9894009349916499,0.9445750230732326,0.8656312023878318,0.755404408355003,0.6178762444026438,0.45801677765722737,0.2816035507792589,0.09501250983763744],t.n)
B.D=s([0,0.042981,-0.293762,-1.752461,5.682633,-3.582633],t.n)
B.F={AxB:0,AxC:1,BxC:2}
B.u=s([0,1],t.t)
B.v=s([0,2],t.t)
B.w=s([1,2],t.t)
B.E=new A.aC(B.F,[B.u,B.v,B.w],A.ay("aC<d,h<e>>"))
B.G=A.hT("j")})();(function staticFields(){$.ai=A.b([],A.ay("i<j>"))
$.dW=null
$.dP=null
$.dO=null
$.co=A.b([],A.ay("i<h<j>?>"))})();(function lazyInitializers(){var s=hunkHelpers.lazyFinal
s($,"hV","eB",()=>A.ev("_$dart_dartClosure"))
s($,"hU","dH",()=>A.ev("_$dart_dartClosure_dartJSInterop"))
s($,"i8","eM",()=>A.b([new J.bl()],A.ay("i<aM>")))
s($,"hY","eC",()=>A.Y(A.cg({
toString:function(){return"$receiver$"}})))
s($,"hZ","eD",()=>A.Y(A.cg({$method$:null,
toString:function(){return"$receiver$"}})))
s($,"i_","eE",()=>A.Y(A.cg(null)))
s($,"i0","eF",()=>A.Y(function(){var $argumentsExpr$="$arguments$"
try{null.$method$($argumentsExpr$)}catch(r){return r.message}}()))
s($,"i3","eI",()=>A.Y(A.cg(void 0)))
s($,"i4","eJ",()=>A.Y(function(){var $argumentsExpr$="$arguments$"
try{(void 0).$method$($argumentsExpr$)}catch(r){return r.message}}()))
s($,"i2","eH",()=>A.Y(A.e_(null)))
s($,"i1","eG",()=>A.Y(function(){try{null.$method$}catch(r){return r.message}}()))
s($,"i6","eL",()=>A.Y(A.e_(void 0)))
s($,"i5","eK",()=>A.Y(function(){try{(void 0).$method$}catch(r){return r.message}}()))
s($,"i7","di",()=>A.ew(B.G))
s($,"i9","dI",()=>A.w(["info",A.hs(),"layout",A.ht(),"analyze",A.hq(),"check",A.hr(),"canAddActive",new A.da()],t.N,A.ay("d(A<d,@>)")))})();(function nativeSupport(){!function(){var s=function(a){var m={}
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
Function.prototype.$3=function(a,b,c){return this(a,b,c)}
Function.prototype.$4=function(a,b,c,d){return this(a,b,c,d)}
Function.prototype.$1$1=function(a){return this(a)}
Function.prototype.$1$0=function(){return this()}
convertAllToFastObject(w)
convertToFastObject($);(function(a){if(typeof document==="undefined"){a(null)
return}if(typeof document.currentScript!="undefined"){a(document.currentScript)
return}var s=document.scripts
function onLoad(b){for(var q=0;q<s.length;++q){s[q].removeEventListener("load",onLoad,false)}a(b.target)}for(var r=0;r<s.length;++r){s[r].addEventListener("load",onLoad,false)}})(function(a){v.currentScript=a
var s=A.hK
if(typeof dartMainRunner==="function"){dartMainRunner(s,[])}else{s([])}})})()