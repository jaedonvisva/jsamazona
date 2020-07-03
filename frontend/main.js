!function(n){var t={};function e(r){if(t[r])return t[r].exports;var i=t[r]={i:r,l:!1,exports:{}};return n[r].call(i.exports,i,i.exports,e),i.l=!0,i.exports}e.m=n,e.c=t,e.d=function(n,t,r){e.o(n,t)||Object.defineProperty(n,t,{enumerable:!0,get:r})},e.r=function(n){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(n,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(n,"__esModule",{value:!0})},e.t=function(n,t){if(1&t&&(n=e(n)),8&t)return n;if(4&t&&"object"==typeof n&&n&&n.__esModule)return n;var r=Object.create(null);if(e.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:n}),2&t&&"string"!=typeof n)for(var i in n)e.d(r,i,function(t){return n[t]}.bind(null,i));return r},e.n=function(n){var t=n&&n.__esModule?function(){return n.default}:function(){return n};return e.d(t,"a",t),t},e.o=function(n,t){return Object.prototype.hasOwnProperty.call(n,t)},e.p="",e(e.s=1)}([function(n,t,e){n.exports=function(){"use strict";var n="millisecond",t="second",e="minute",r="hour",i="day",a="week",s="month",o="quarter",d="year",c=/^(\d{4})-?(\d{1,2})-?(\d{0,2})[^0-9]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?.?(\d{1,3})?$/,u=/\[([^\]]+)]|Y{2,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,l=function(n,t,e){var r=String(n);return!r||r.length>=t?n:""+Array(t+1-r.length).join(e)+n},f={s:l,z:function(n){var t=-n.utcOffset(),e=Math.abs(t),r=Math.floor(e/60),i=e%60;return(t<=0?"+":"-")+l(r,2,"0")+":"+l(i,2,"0")},m:function(n,t){var e=12*(t.year()-n.year())+(t.month()-n.month()),r=n.clone().add(e,s),i=t-r<0,a=n.clone().add(e+(i?-1:1),s);return Number(-(e+(t-r)/(i?r-a:a-r))||0)},a:function(n){return n<0?Math.ceil(n)||0:Math.floor(n)},p:function(c){return{M:s,y:d,w:a,d:i,D:"date",h:r,m:e,s:t,ms:n,Q:o}[c]||String(c||"").toLowerCase().replace(/s$/,"")},u:function(n){return void 0===n}},h={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_")},m="en",v={};v[m]=h;var p=function(n){return n instanceof w},$=function(n,t,e){var r;if(!n)return m;if("string"==typeof n)v[n]&&(r=n),t&&(v[n]=t,r=n);else{var i=n.name;v[i]=n,r=i}return!e&&r&&(m=r),r||!e&&m},g=function(n,t){if(p(n))return n.clone();var e="object"==typeof t?t:{};return e.date=n,e.args=arguments,new w(e)},y=f;y.l=$,y.i=p,y.w=function(n,t){return g(n,{locale:t.$L,utc:t.$u,$offset:t.$offset})};var w=function(){function l(n){this.$L=this.$L||$(n.locale,null,!0),this.parse(n)}var f=l.prototype;return f.parse=function(n){this.$d=function(n){var t=n.date,e=n.utc;if(null===t)return new Date(NaN);if(y.u(t))return new Date;if(t instanceof Date)return new Date(t);if("string"==typeof t&&!/Z$/i.test(t)){var r=t.match(c);if(r)return e?new Date(Date.UTC(r[1],r[2]-1,r[3]||1,r[4]||0,r[5]||0,r[6]||0,r[7]||0)):new Date(r[1],r[2]-1,r[3]||1,r[4]||0,r[5]||0,r[6]||0,r[7]||0)}return new Date(t)}(n),this.init()},f.init=function(){var n=this.$d;this.$y=n.getFullYear(),this.$M=n.getMonth(),this.$D=n.getDate(),this.$W=n.getDay(),this.$H=n.getHours(),this.$m=n.getMinutes(),this.$s=n.getSeconds(),this.$ms=n.getMilliseconds()},f.$utils=function(){return y},f.isValid=function(){return!("Invalid Date"===this.$d.toString())},f.isSame=function(n,t){var e=g(n);return this.startOf(t)<=e&&e<=this.endOf(t)},f.isAfter=function(n,t){return g(n)<this.startOf(t)},f.isBefore=function(n,t){return this.endOf(t)<g(n)},f.$g=function(n,t,e){return y.u(n)?this[t]:this.set(e,n)},f.year=function(n){return this.$g(n,"$y",d)},f.month=function(n){return this.$g(n,"$M",s)},f.day=function(n){return this.$g(n,"$W",i)},f.date=function(n){return this.$g(n,"$D","date")},f.hour=function(n){return this.$g(n,"$H",r)},f.minute=function(n){return this.$g(n,"$m",e)},f.second=function(n){return this.$g(n,"$s",t)},f.millisecond=function(t){return this.$g(t,"$ms",n)},f.unix=function(){return Math.floor(this.valueOf()/1e3)},f.valueOf=function(){return this.$d.getTime()},f.startOf=function(n,o){var c=this,u=!!y.u(o)||o,l=y.p(n),f=function(n,t){var e=y.w(c.$u?Date.UTC(c.$y,t,n):new Date(c.$y,t,n),c);return u?e:e.endOf(i)},h=function(n,t){return y.w(c.toDate()[n].apply(c.toDate("s"),(u?[0,0,0,0]:[23,59,59,999]).slice(t)),c)},m=this.$W,v=this.$M,p=this.$D,$="set"+(this.$u?"UTC":"");switch(l){case d:return u?f(1,0):f(31,11);case s:return u?f(1,v):f(0,v+1);case a:var g=this.$locale().weekStart||0,w=(m<g?m+7:m)-g;return f(u?p-w:p+(6-w),v);case i:case"date":return h($+"Hours",0);case r:return h($+"Minutes",1);case e:return h($+"Seconds",2);case t:return h($+"Milliseconds",3);default:return this.clone()}},f.endOf=function(n){return this.startOf(n,!1)},f.$set=function(a,o){var c,u=y.p(a),l="set"+(this.$u?"UTC":""),f=(c={},c.day=l+"Date",c.date=l+"Date",c[s]=l+"Month",c[d]=l+"FullYear",c[r]=l+"Hours",c[e]=l+"Minutes",c[t]=l+"Seconds",c[n]=l+"Milliseconds",c)[u],h=u===i?this.$D+(o-this.$W):o;if(u===s||u===d){var m=this.clone().set("date",1);m.$d[f](h),m.init(),this.$d=m.set("date",Math.min(this.$D,m.daysInMonth())).toDate()}else f&&this.$d[f](h);return this.init(),this},f.set=function(n,t){return this.clone().$set(n,t)},f.get=function(n){return this[y.p(n)]()},f.add=function(n,o){var c,u=this;n=Number(n);var l=y.p(o),f=function(t){var e=g(u);return y.w(e.date(e.date()+Math.round(t*n)),u)};if(l===s)return this.set(s,this.$M+n);if(l===d)return this.set(d,this.$y+n);if(l===i)return f(1);if(l===a)return f(7);var h=(c={},c[e]=6e4,c[r]=36e5,c[t]=1e3,c)[l]||1,m=this.$d.getTime()+n*h;return y.w(m,this)},f.subtract=function(n,t){return this.add(-1*n,t)},f.format=function(n){var t=this;if(!this.isValid())return"Invalid Date";var e=n||"YYYY-MM-DDTHH:mm:ssZ",r=y.z(this),i=this.$locale(),a=this.$H,s=this.$m,o=this.$M,d=i.weekdays,c=i.months,l=function(n,r,i,a){return n&&(n[r]||n(t,e))||i[r].substr(0,a)},f=function(n){return y.s(a%12||12,n,"0")},h=i.meridiem||function(n,t,e){var r=n<12?"AM":"PM";return e?r.toLowerCase():r},m={YY:String(this.$y).slice(-2),YYYY:this.$y,M:o+1,MM:y.s(o+1,2,"0"),MMM:l(i.monthsShort,o,c,3),MMMM:l(c,o),D:this.$D,DD:y.s(this.$D,2,"0"),d:String(this.$W),dd:l(i.weekdaysMin,this.$W,d,2),ddd:l(i.weekdaysShort,this.$W,d,3),dddd:d[this.$W],H:String(a),HH:y.s(a,2,"0"),h:f(1),hh:f(2),a:h(a,s,!0),A:h(a,s,!1),m:String(s),mm:y.s(s,2,"0"),s:String(this.$s),ss:y.s(this.$s,2,"0"),SSS:y.s(this.$ms,3,"0"),Z:r};return e.replace(u,(function(n,t){return t||m[n]||r.replace(":","")}))},f.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},f.diff=function(n,i,c){var u,l=y.p(i),f=g(n),h=6e4*(f.utcOffset()-this.utcOffset()),m=this-f,v=y.m(this,f);return v=(u={},u[d]=v/12,u[s]=v,u[o]=v/3,u[a]=(m-h)/6048e5,u.day=(m-h)/864e5,u[r]=m/36e5,u[e]=m/6e4,u[t]=m/1e3,u)[l]||m,c?v:y.a(v)},f.daysInMonth=function(){return this.endOf(s).$D},f.$locale=function(){return v[this.$L]},f.locale=function(n,t){if(!n)return this.$L;var e=this.clone(),r=$(n,t,!0);return r&&(e.$L=r),e},f.clone=function(){return y.w(this.$d,this)},f.toDate=function(){return new Date(this.valueOf())},f.toJSON=function(){return this.isValid()?this.toISOString():null},f.toISOString=function(){return this.$d.toISOString()},f.toString=function(){return this.$d.toUTCString()},l}();return g.prototype=w.prototype,g.extend=function(n,t){return n(t,w,g),g},g.locale=$,g.isDayjs=p,g.unix=function(n){return g(1e3*n)},g.en=v[m],g.Ls=v,g}()},function(n,t,e){"use strict";e.r(t);var r=e(0),i=e.n(r);var a={render:()=>`<div>\n    <button class="ham-menu" id="aside-open-button">\n      &#9776;\n    </button>\n    <a class="brand" href="/#">amazona</a>\n  </div>\n  <div>\n  <a href="#">\n    Today : ${i()().format("YYYY-MM-DD")}\n    </a>\n  </div>\n  <div>\n          <ul>\n            <li>\n              <a href="/#/cart">Cart</a>\n            </li>\n            <li>\n              <a href="/#/signin">Sign-In</a>\x3c!-- need to change link --\x3e\n            </li>\n          </ul>\n        </div>`,after_render:()=>{document.getElementById("aside-open-button").addEventListener("click",()=>{document.getElementById("aside-container").classList.add("open")})}};var s={render:()=>'<div class="aside-header">\n    <div>SHOP BY CATEGORY</div>\n    <button id="aside-close">x</button>\n  </div>\n  <div class="aside-body">\n    <ul class="categories">\n      <li>\n        <a href="/category/shirts"\n          >Shirts<span><i class="fa fa-chevron-right"></i></span\n        ></a>\n      </li>\n      <li>\n        <a href="/category/pants"\n          >Pants<span><i class="fa fa-chevron-right"></i></span\n        ></a>\n      </li>\n      <li>\n        <a href="/category/t-shirts"\n          >T-Shirts<span><i class="fa fa-chevron-right"></i></span\n        ></a>\n      </li>\n      <li>\n        <a href="/category/shoes"\n          >Shoes<span><i class="fa fa-chevron-right"></i></span\n        ></a>\n      </li>\n    </ul>\n  </div>',after_render:()=>{document.getElementById("aside-close").addEventListener("click",()=>{document.getElementById("aside-container").classList.remove("open")})}};var o={render:()=>"<div>All right is reserved. @2020</div>",after_render:()=>{}};var d={render:n=>n.value?`<div class='rating'>\n    <span>\n    <i class="${n.value>1?"fa fa-star":"fa fa-star-o"}"></i>\n    </span>\n    <span\n    class = "${n.value>=2?"fa fa-star":n.value>=1.5?"fa fa-star-half-o":"fa fa-star-o"}">\n    </span>\n    <span\n    class = "${n.value>=3?"fa fa-star":n.value>=2.5?"fa fa-star-half-o":"fa fa-star-o"}">\n    </span>\n    <span\n    class = "${n.value>=4?"fa fa-star":n.value>=3.5?"fa fa-star-half-o":"fa fa-star-o"}">\n    </span>\n    <span\n    class = "${n.value>=5?"fa fa-star":n.value>=4.5?"fa fa-star-half-o":"fa fa-star-o"}">\n    </span>\n    <span>\n    ${n.text?n.text:""}\n    </span>\n    </div>`:"<div></div>"};const c=()=>localStorage.getItem("cartItems")?JSON.parse(localStorage.getItem("cartItems")):[],u=n=>{localStorage.setItem("cartItems",JSON.stringify(n))},l=()=>{const n=(document.location.hash.slice(1).toLowerCase()||"/").split("/");return{resource:n[1],id:n[2],verb:n[3]}},f=async(n,t="main")=>{document.getElementById(t+"-container").innerHTML=await n.render(),await n.after_render()},h="http://localhost:5000",m=async n=>{try{const t=await fetch(`${h}/api/products/${n}`,{headers:{"Content-Type":"application/json"}}),e=await t.json();if(200!==t.status)throw new Error(e.message);return e}catch(n){return console.log("Error in getProduct",n),{error:n.message}}},v=(n,t=!1)=>{let e=c();const r=e.find(t=>t.product===n.product);r?t&&(e=e.map(t=>t.product===r.product?n:t)):e=[...e,n],u(e),t&&f(p)},p={after_render:()=>{const n=document.getElementsByClassName("qty-select");Array.from(n).forEach(n=>{n.addEventListener("change",t=>{const e=c().find(t=>t.product===n.id);v({...e,qty:Number(t.target.value)},!0)})});const t=document.getElementsByClassName("delete-button");Array.from(t).forEach(n=>{n.addEventListener("click",()=>{var t;t=n.id,u(c().filter(n=>n.product!==t)),t===l().id?document.location.hash="/cart":f(p)})}),document.getElementById("checkout-button").addEventListener("click",()=>{document.location.hash="/signin"})},render:async()=>{const n=l();if(n.id){console.log("add it to cart",n.id);const t=await m(n.id);v({product:t._id,name:t.name,image:t.image,price:t.price,countInStock:t.countInStock,qty:1})}const t=c();return`\n    <div class="cart">\n      <ul class="cart-list">\n        <li>\n          <h3>Shopping Cart</h3>\n          <div>\n            Price\n          </div>\n        </li>\n        ${t.length?t.map(n=>`\n            <li>\n              <div class="cart-image">\n                <img src="${n.image}" alt="${n.name}"/>\n              </div>\n              <div class="cart-name">\n                  <div>\n                    <a href="/#/product/${n.product}">${n.name}</a>\n                  </div>\n                  <div>\n                    Qty:\n                    <select class="qty-select" value="${n.qty}" id="${n.product}">\n                      ${[...Array(n.countInStock).keys()].map(t=>n.qty===t+1?`<option value="${t+1}" selected>${t+1}</option>`:`<option value="${t+1}">${t+1}</option>`).join("\n")}\n                    </select>\n                    <button type="button" class="delete-button"\n                      id="${n.product}">\n                      Delete\n                    </button>\n                  </div>\n              </div>\n              <div class="cart-price">$${n.price}</div>\n            </li>`).join("\n"):'<li><div>Cart is empty. <a href="/#/">Go Shopping</a></div></li>'}\n      </ul>\n      <div class="cart-action">\n        <h3>\n          Subtotal (${t.reduce((n,t)=>n+t.qty,0)} items): $${t.reduce((n,t)=>t.price*t.qty+n,0)}\n        </h3>\n        <button id="checkout-button" class="primary fw">\n          Proceed to Checkout\n        </button>\n      </div>\n    </div>`}};var $={render:()=>"<div>Page Not Found</div>",after_render:()=>{}};const g={"/":{render:async()=>{const n=await fetch("http://localhost:5000/api/products");return`<div>\n    <ul class='products'>\n    ${(await n.json()).map(n=>`\n        <li> \n        <div class="product">\n        <a href="/#/product/${n._id}">\n        <img\n          class="product-image"\n          src="${n.image}"\n          alt="${n.name}"\n        />\n        <div class="product-name">\n          <a href="/#/product/${n._id}">\n            ${n.name}\n          </a>\n        </div>\n        <div class="product-brand">${n.brand}</div>\n        <div class="product-price"><span>$</span>${n.price}</div>\n        <div class="product-rating">\n          ${d.render({value:n.rating,text:n.numReviews+" Reviews"})}\n        </div>\n      </div>\n      </li>`).join("\n")}\n    </ul>\n    </div>`},after_render:()=>{}},"/product/:id":{after_render:()=>{const n=l();document.getElementById("add-button").addEventListener("click",()=>{document.location.hash="/cart/"+n.id})},render:async()=>{const n=l(),t=await m(n.id);return`\n    <div>\n      <div class="back-to-result">\n        <a href="/#/">Back to result</a>\n      </div>\n      <div class="details">\n          <div class="details-image">\n            <img src="${t.image}" alt="${t.name}" />\n          </div>\n          <div class="details-info">\n            <ul>\n              <li>\n                <h1>${t.name}</h1>\n              </li>\n              <li>\n                ${d.render({value:t.rating,text:t.numReviews+" reviews"})}\n              </li>\n              <li>\n                Price: <strong>$${t.price}</strong>\n              </li>\n              <li>\n                Description:\n                <div>\n                  ${t.description}\n                </div>\n              </li>\n            </ul>\n          </div>\n          <div class="details-action">\n                <ul>\n                  <li>\n                    Price: $${t.price}\n                  </li>\n                  <li>\n                    Status: \n                    ${t.countInStock>0?'<span class="success">In Stock</span>':'<span class="error">Unavailable</span>'}\n                  </li>\n                  <li>\n                    <button id="add-button" class="primary fw">Add to Cart</button>\n                  </li>\n                </ul>\n          </div>          \n      </div>\n      <div>\n            <h2>Reviews</h2>\n            ${t.reviews.length?"":"<div>There is no review.</div>"}\n            <ul class="reviews">\n              ${t.reviews.map(n=>`\n                <li>\n                  <div><b>${n.name}</b></div>\n                  <div>${d.render({value:n.rating})}</div>\n                  <div>${n.createdAt}</div>\n                  <div>${n.comment}</div>\n                </li>\n                `).join("\n")}\n              \n            </ul>\n          </div>\n    </div>\n        `}},"/cart":p,"/cart/:id":p,"/signin":{after_render:()=>{document.getElementById("signin-form").addEventListener("submit",async n=>{n.preventDefault();const t=await(async({email:n,password:t})=>{try{const e=await fetch(h+"/api/users/signin",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:n,password:t})}),r=await e.json();if(!e.ok)throw new Error(r.message);return r}catch(n){return{error:n}}})({email:document.getElementById("email").value,password:document.getElementById("password").value});t.error?alert(t.error):document.location.hash="/"})},render:()=>'\n    <div class="form-container">\n      <form id="signin-form">\n        <ul class="form">\n          <li>\n            <h1>Sign-In</h1>\n          </li>\n          <li>\n            <label for="email"> Email</label>\n            <input type="email" name="email" id="email" />\n          </li>\n          <li>\n            <label for="password">Password</label>\n            <input type="password" id="password" name="password" />\n          </li>\n          <li>\n            <button type="submit" class="primary">Signin</button>\n          </li>\n          <li>\n            <div>\n              New User? <a href="/#/register">Create your account </a>\n            </div>\n          </li>       \n        </ul>\n      </form>\n    </div>\n\n    '},"/register":{after_render:()=>{},render:()=>'\n      <div class="form-container">\n        <form id="signin-form">\n          <ul class="form">\n            <li>\n              <h1>Register</h1>\n            </li>\n            <li>\n              <label for="name">Name</label>\n              <input type="text" name="name" id="name" />\n            </li>\n            <li>\n              <label for="email"> Email</label>\n              <input type="email" name="email" id="email" />\n            </li>\n            <li>\n              <label for="password">Password</label>\n              <input type="password" id="password" name="password" />\n            </li>\n            <li>\n              <label for="password">Confirm Password</label>\n              <input type="password" id="password" name="password" />\n            </li>\n            <li>\n              <button type="submit" class="primary">Register</button>\n            </li>\n            <li>\n              <div>\n                Already have an account? <a href="/#/signin">Sign In</a>\n              </div>\n            </li>\n          </ul>\n        </form>\n      </div>\n  \n      '}},y=async()=>{const n=document.getElementById("header-container"),t=document.getElementById("aside-container"),e=document.getElementById("main-container"),r=document.getElementById("footer-container");n.innerHTML=a.render(),a.after_render(),t.innerHTML=s.render(),s.after_render(),r.innerHTML=o.render(),o.after_render();const i=l(),d=(i.resource?"/"+i.resource:"/")+(i.id?"/:id":"")+(i.verb?"/"+i.verb:""),c=g[d]||$;e.innerHTML=await c.render(),c.after_render()};window.addEventListener("hashchange",y),window.addEventListener("load",y)}]);