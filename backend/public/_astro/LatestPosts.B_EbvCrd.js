function L(){}function it(t){return t()}function Q(){return Object.create(null)}function R(t){t.forEach(it)}function lt(t){return typeof t=="function"}function at(t,e){return t!=t?e==e:t!==e||t&&typeof t=="object"||typeof t=="function"}let D;function X(t,e){return t===e?!0:(D||(D=document.createElement("a")),D.href=e,t===D.href)}function ht(t){return Object.keys(t).length===0}let q=!1;function dt(){q=!0}function mt(){q=!1}function pt(t,e,n,r){for(;t<e;){const a=t+(e-t>>1);n(a)<=r?t=a+1:e=a}return t}function gt(t){if(t.hydrate_init)return;t.hydrate_init=!0;let e=t.childNodes;if(t.nodeName==="HEAD"){const u=[];for(let i=0;i<e.length;i++){const o=e[i];o.claim_order!==void 0&&u.push(o)}e=u}const n=new Int32Array(e.length+1),r=new Int32Array(e.length);n[0]=-1;let a=0;for(let u=0;u<e.length;u++){const i=e[u].claim_order,o=(a>0&&e[n[a]].claim_order<=i?a+1:pt(1,a,d=>e[n[d]].claim_order,i))-1;r[u]=n[o]+1;const f=o+1;n[f]=u,a=Math.max(f,a)}const c=[],s=[];let l=e.length-1;for(let u=n[a]+1;u!=0;u=r[u-1]){for(c.push(e[u-1]);l>=u;l--)s.push(e[l]);l--}for(;l>=0;l--)s.push(e[l]);c.reverse(),s.sort((u,i)=>u.claim_order-i.claim_order);for(let u=0,i=0;u<s.length;u++){for(;i<c.length&&s[u].claim_order>=c[i].claim_order;)i++;const o=i<c.length?c[i]:null;t.insertBefore(s[u],o)}}function _(t,e){if(q){for(gt(t),(t.actual_end_child===void 0||t.actual_end_child!==null&&t.actual_end_child.parentNode!==t)&&(t.actual_end_child=t.firstChild);t.actual_end_child!==null&&t.actual_end_child.claim_order===void 0;)t.actual_end_child=t.actual_end_child.nextSibling;e!==t.actual_end_child?(e.claim_order!==void 0||e.parentNode!==t)&&t.insertBefore(e,t.actual_end_child):t.actual_end_child=e.nextSibling}else(e.parentNode!==t||e.nextSibling!==null)&&t.appendChild(e)}function O(t,e,n){q&&!n?_(t,e):(e.parentNode!==t||e.nextSibling!=n)&&t.insertBefore(e,n||null)}function g(t){t.parentNode&&t.parentNode.removeChild(t)}function vt(t,e){for(let n=0;n<t.length;n+=1)t[n]&&t[n].d(e)}function w(t){return document.createElement(t)}function b(t){return document.createTextNode(t)}function k(){return b(" ")}function Y(){return b("")}function p(t,e,n){n==null?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function yt(t){return t.dataset.svelteH}function N(t){return Array.from(t.childNodes)}function wt(t){t.claim_info===void 0&&(t.claim_info={last_index:0,total_claimed:0})}function st(t,e,n,r,a=!1){wt(t);const c=(()=>{for(let s=t.claim_info.last_index;s<t.length;s++){const l=t[s];if(e(l)){const u=n(l);return u===void 0?t.splice(s,1):t[s]=u,a||(t.claim_info.last_index=s),l}}for(let s=t.claim_info.last_index-1;s>=0;s--){const l=t[s];if(e(l)){const u=n(l);return u===void 0?t.splice(s,1):t[s]=u,a?u===void 0&&t.claim_info.last_index--:t.claim_info.last_index=s,l}}return r()})();return c.claim_order=t.claim_info.total_claimed,t.claim_info.total_claimed+=1,c}function $t(t,e,n,r){return st(t,a=>a.nodeName===e,a=>{const c=[];for(let s=0;s<a.attributes.length;s++){const l=a.attributes[s];n[l.name]||c.push(l.name)}c.forEach(s=>a.removeAttribute(s))},()=>r(e))}function $(t,e,n){return $t(t,e,n,w)}function C(t,e){return st(t,n=>n.nodeType===3,n=>{const r=""+e;if(n.data.startsWith(r)){if(n.data.length!==r.length)return n.splitText(r.length)}else n.data=r},()=>b(e),!0)}function H(t){return C(t," ")}function V(t,e){e=""+e,t.data!==e&&(t.data=e)}let F;function P(t){F=t}const A=[],Z=[];let S=[];const tt=[],bt=Promise.resolve();let G=!1;function xt(){G||(G=!0,bt.then(ct))}function U(t){S.push(t)}const W=new Set;let j=0;function ct(){if(j!==0)return;const t=F;do{try{for(;j<A.length;){const e=A[j];j++,P(e),Et(e.$$)}}catch(e){throw A.length=0,j=0,e}for(P(null),A.length=0,j=0;Z.length;)Z.pop()();for(let e=0;e<S.length;e+=1){const n=S[e];W.has(n)||(W.add(n),n())}S.length=0}while(A.length);for(;tt.length;)tt.pop()();G=!1,W.clear(),P(t)}function Et(t){if(t.fragment!==null){t.update(),R(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(U)}}function jt(t){const e=[],n=[];S.forEach(r=>t.indexOf(r)===-1?e.push(r):n.push(r)),n.forEach(r=>r()),S=e}const T=new Set;let x;function Nt(){x={r:0,c:[],p:x}}function At(){x.r||R(x.c),x=x.p}function I(t,e){t&&t.i&&(T.delete(t),t.i(e))}function z(t,e,n,r){if(t&&t.o){if(T.has(t))return;T.add(t),x.c.push(()=>{T.delete(t),r&&(n&&t.d(1),r())}),t.o(e)}else r&&r()}function et(t){return t?.length!==void 0?t:Array.from(t)}function St(t){t&&t.c()}function Ct(t,e){t&&t.l(e)}function ut(t,e,n){const{fragment:r,after_update:a}=t.$$;r&&r.m(e,n),U(()=>{const c=t.$$.on_mount.map(it).filter(lt);t.$$.on_destroy?t.$$.on_destroy.push(...c):R(c),t.$$.on_mount=[]}),a.forEach(U)}function ot(t,e){const n=t.$$;n.fragment!==null&&(jt(n.after_update),R(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function Pt(t,e){t.$$.dirty[0]===-1&&(A.push(t),xt(),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function ft(t,e,n,r,a,c,s=null,l=[-1]){const u=F;P(t);const i=t.$$={fragment:null,ctx:[],props:c,update:L,not_equal:a,bound:Q(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(e.context||(u?u.$$.context:[])),callbacks:Q(),dirty:l,skip_bound:!1,root:e.target||u.$$.root};s&&s(i.root);let o=!1;if(i.ctx=n?n(t,e.props||{},(f,d,...v)=>{const y=v.length?v[0]:d;return i.ctx&&a(i.ctx[f],i.ctx[f]=y)&&(!i.skip_bound&&i.bound[f]&&i.bound[f](y),o&&Pt(t,f)),d}):[],i.update(),o=!0,R(i.before_update),i.fragment=r?r(i.ctx):!1,e.target){if(e.hydrate){dt();const f=N(e.target);i.fragment&&i.fragment.l(f),f.forEach(g)}else i.fragment&&i.fragment.c();e.intro&&I(t.$$.fragment),ut(t,e.target,e.anchor),mt(),ct()}P(u)}class _t{$$=void 0;$$set=void 0;$destroy(){ot(this,1),this.$destroy=L}$on(e,n){if(!lt(n))return L;const r=this.$$.callbacks[e]||(this.$$.callbacks[e]=[]);return r.push(n),()=>{const a=r.indexOf(n);a!==-1&&r.splice(a,1)}}$set(e){this.$$set&&!ht(e)&&(this.$$.skip_bound=!0,this.$$set(e),this.$$.skip_bound=!1)}}const It="4";typeof window<"u"&&(window.__svelte||(window.__svelte={v:new Set})).v.add(It);function Lt(t){let e,n,r,a,c,s,l,u,i,o,f,d,v,y=new Date(t[2]*1e3).toLocaleString()+"",B;return{c(){e=w("article"),n=w("img"),a=k(),c=w("div"),s=w("h1"),l=b(t[0]),u=k(),i=w("p"),o=b("by "),f=b(t[1]),d=k(),v=w("p"),B=b(y),this.h()},l(m){e=$(m,"ARTICLE",{class:!0});var h=N(e);n=$(h,"IMG",{class:!0,src:!0,alt:!0}),a=H(h),c=$(h,"DIV",{class:!0});var E=N(c);s=$(E,"H1",{class:!0});var J=N(s);l=C(J,t[0]),J.forEach(g),u=H(E),i=$(E,"P",{class:!0});var M=N(i);o=C(M,"by "),f=C(M,t[1]),M.forEach(g),d=H(E),v=$(E,"P",{class:!0});var K=N(v);B=C(K,y),K.forEach(g),E.forEach(g),h.forEach(g),this.h()},h(){p(n,"class","avatar svelte-1dfjcl0"),X(n.src,r=t[3])||p(n,"src",r),p(n,"alt",t[1]),p(s,"class","post-title svelte-1dfjcl0"),p(i,"class","post-author svelte-1dfjcl0"),p(v,"class","post-timestamp svelte-1dfjcl0"),p(c,"class","side-thing svelte-1dfjcl0"),p(e,"class","post svelte-1dfjcl0")},m(m,h){O(m,e,h),_(e,n),_(e,a),_(e,c),_(c,s),_(s,l),_(c,u),_(c,i),_(i,o),_(i,f),_(c,d),_(c,v),_(v,B)},p(m,[h]){h&8&&!X(n.src,r=m[3])&&p(n,"src",r),h&2&&p(n,"alt",m[1]),h&1&&V(l,m[0]),h&2&&V(f,m[1]),h&4&&y!==(y=new Date(m[2]*1e3).toLocaleString()+"")&&V(B,y)},i:L,o:L,d(m){m&&g(e)}}}function Rt(t,e,n){let{title:r}=e,{author:a}=e,{timestamp:c}=e,{author_avatar_url:s}=e;return t.$$set=l=>{"title"in l&&n(0,r=l.title),"author"in l&&n(1,a=l.author),"timestamp"in l&&n(2,c=l.timestamp),"author_avatar_url"in l&&n(3,s=l.author_avatar_url)},[r,a,c,s]}class Bt extends _t{constructor(e){super(),ft(this,e,Rt,Lt,at,{title:0,author:1,timestamp:2,author_avatar_url:3})}}function nt(t,e,n){const r=t.slice();return r[2]=e[n],r}function rt(t){let e,n;return e=new Bt({props:{title:t[2].title,author:t[2].author.username,author_avatar_url:t[2].author.avatar_url,timestamp:t[2].timestamp}}),{c(){St(e.$$.fragment)},l(r){Ct(e.$$.fragment,r)},m(r,a){ut(e,r,a),n=!0},p(r,a){const c={};a&1&&(c.title=r[2].title),a&1&&(c.author=r[2].author.username),a&1&&(c.author_avatar_url=r[2].author.avatar_url),a&1&&(c.timestamp=r[2].timestamp),e.$set(c)},i(r){n||(I(e.$$.fragment,r),n=!0)},o(r){z(e.$$.fragment,r),n=!1},d(r){ot(e,r)}}}function Dt(t){let e,n="Latest Posts:",r,a,c,s=et(t[0]),l=[];for(let i=0;i<s.length;i+=1)l[i]=rt(nt(t,s,i));const u=i=>z(l[i],1,1,()=>{l[i]=null});return{c(){e=w("h1"),e.textContent=n,r=k();for(let i=0;i<l.length;i+=1)l[i].c();a=Y()},l(i){e=$(i,"H1",{"data-svelte-h":!0}),yt(e)!=="svelte-1e9pte8"&&(e.textContent=n),r=H(i);for(let o=0;o<l.length;o+=1)l[o].l(i);a=Y()},m(i,o){O(i,e,o),O(i,r,o);for(let f=0;f<l.length;f+=1)l[f]&&l[f].m(i,o);O(i,a,o),c=!0},p(i,[o]){if(o&1){s=et(i[0]);let f;for(f=0;f<s.length;f+=1){const d=nt(i,s,f);l[f]?(l[f].p(d,o),I(l[f],1)):(l[f]=rt(d),l[f].c(),I(l[f],1),l[f].m(a.parentNode,a))}for(Nt(),f=s.length;f<l.length;f+=1)u(f);At()}},i(i){if(!c){for(let o=0;o<s.length;o+=1)I(l[o]);c=!0}},o(i){l=l.filter(Boolean);for(let o=0;o<l.length;o+=1)z(l[o]);c=!1},d(i){i&&(g(e),g(r),g(a)),vt(l,i)}}}function Ot(t,e,n){let r=[];async function a(){try{const s=await(await fetch("/api/posts")).json(),l=await Promise.all(s.map(async u=>{const o=await(await fetch(`/api/users/get/${u.author_id}`)).json();return{id:u.id,type:u.type,title:u.title,author:{id:o.id,username:o.username,avatar_url:o.avatar_url},timestamp:u.timestamp}}));n(0,r=l)}catch(c){console.error("Error fetching posts or author data:",c),n(0,r=[])}}return a(),[r]}class kt extends _t{constructor(e){super(),ft(this,e,Ot,Dt,at,{})}}export{kt as default};
