"use strict";(self.webpackChunkchat=self.webpackChunkchat||[]).push([[89],{3309:function(e,n,t){t.d(n,{Fl:function(){return m},Iy:function(){return v},au:function(){return c},ZP:function(){return i}});var r=t(1413),o=t(1134),a=t(184);function i(e){var n=e.children,t=e.onSubmit,i=e.methods;return(0,a.jsx)(o.RV,(0,r.Z)((0,r.Z)({},i),{},{children:(0,a.jsx)("form",{onSubmit:t,children:n})}))}var l=t(5987),s=t(5533),u=["name","helperText"];function c(e){var n=e.name,t=e.helperText,i=(0,l.Z)(e,u),c=(0,o.Gc)().control;return(0,a.jsx)(o.Qr,{name:n,control:c,render:function(e){var n=e.field,o=e.fieldState.error;return(0,a.jsx)(s.Z,(0,r.Z)((0,r.Z)({},n),{},{fullWidth:!0,value:"number"===typeof n.value&&0===n.value?"":n.value,error:!!o,helperText:o?null===o||void 0===o?void 0:o.message:t},i))}})}var d=t(2262),h=["name","label","helperText"];function m(e){var n=e.name,t=e.label,i=e.helperText,u=(0,l.Z)(e,h),c=(0,o.Gc)(),m=c.control,k=c.setValue,f=function(e,t){k(n,t,{shouldValidate:!0})};return(0,a.jsx)(o.Qr,{name:n,control:m,render:function(e){var n=e.field,o=e.fieldState.error;return(0,a.jsx)(d.Z,(0,r.Z)((0,r.Z)((0,r.Z)({},n),{},{fullWidth:!0,value:"number"===typeof n.value&&0===n.value?"":n.value,onChange:f},u),{},{renderInput:function(e){return(0,a.jsx)(s.Z,(0,r.Z)({label:t,error:!!o,helperText:o?null===o||void 0===o?void 0:o.message:i},e))}}))}})}var k=t(4162),f=t(2791),p=["keyName","inputs"],v=function(e){var n=e.keyName,t=void 0===n?"":n,i=e.inputs,u=void 0===i?[]:i,c=(0,l.Z)(e,p),d=(0,f.useRef)(null),h=(0,o.Gc)().control;return(0,a.jsx)(k.Z,{direction:"row",spacing:2,justifyContent:"center",ref:d,children:u.map((function(e,n){return(0,a.jsx)(o.Qr,{name:"".concat(t).concat(n+1),control:h,render:function(e){var o=e.field,i=e.fieldState.error;return(0,a.jsx)(s.Z,(0,r.Z)((0,r.Z)({},o),{},{error:!!i,autoFocus:0===n,placeholder:"-",onChange:function(e){!function(e,n){var r=e.target,o=r.maxLength,a=r.value,i=r.name,l=Number(i.replace(t,"")),s=document.querySelector("input[name=".concat(t).concat(l+1,"]"));a.length>o&&(e.target.value=a[0]),a.length>=o&&l<6&&null!==s&&s.focus(),n(e)}(e,o.onChange)},onFocus:function(e){return e.currentTarget.select()},InputProps:{sx:{width:{xs:36,sm:56},height:{xs:36,sm:56},"& input":{p:0,textAlign:"center"}}},inputProps:{maxLength:1,type:"number"}},c))}},e)}))})}},5393:function(e,n,t){var r=t(2791),o=t(9434),a=t(2140),i=t(7689);n.Z=function(e){var n=(0,o.I0)(),t=(0,i.s0)();return[(0,r.useCallback)((function(r){n(e(r)).unwrap().then((function(e){n((0,a.jW)({message:e.message,severity:"success"})),"OTP Sent Successfully!"===(null===e||void 0===e?void 0:e.message)&&t("/auth/verify-otp"),null!==e&&void 0!==e&&e.user&&(window.localStorage.setItem("userId",e.user._id),n((0,a.av)(null===e||void 0===e?void 0:e.user)))})).catch((function(e){n((0,a.jW)({message:e.message,severity:"error"})),console.log(e)}))}),[n,e])]}},948:function(e,n,t){t.d(n,{Z:function(){return x}});var r=t(2791),o=t(6015),a=t(1872),i=t(4162),l=t(3811),s=t(2602),u=t(7120),c=new Map;c.set("bold",(function(e){return r.createElement(r.Fragment,null,r.createElement("path",{d:"M128,128h88a88.1,88.1,0,1,1-25.8-62.2",fill:"none",stroke:e,strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"24"}))})),c.set("duotone",(function(e){return r.createElement(r.Fragment,null,r.createElement("path",{d:"M128,128h88a88.1,88.1,0,1,1-25.8-62.2",fill:"none",stroke:e,strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"16"}))})),c.set("fill",(function(){return r.createElement(r.Fragment,null,r.createElement("path",{d:"M128,24A104,104,0,1,0,232,128,104.2,104.2,0,0,0,128,24Zm0,184A80,80,0,1,1,184.6,71.4a8,8,0,0,1,0,11.3,7.9,7.9,0,0,1-11.3,0A64.1,64.1,0,1,0,191.5,136H128a8,8,0,0,1,0-16h72a8,8,0,0,1,8,8A80.1,80.1,0,0,1,128,208Z"}))})),c.set("light",(function(e){return r.createElement(r.Fragment,null,r.createElement("path",{d:"M128,128h88a88.1,88.1,0,1,1-25.8-62.2",fill:"none",stroke:e,strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"12"}))})),c.set("thin",(function(e){return r.createElement(r.Fragment,null,r.createElement("path",{d:"M128,128h88a88.1,88.1,0,1,1-25.8-62.2",fill:"none",stroke:e,strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"8"}))})),c.set("regular",(function(e){return r.createElement(r.Fragment,null,r.createElement("path",{d:"M128,128h88a88.1,88.1,0,1,1-25.8-62.2",fill:"none",stroke:e,strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"16"}))}));var d=function(e,n){return(0,s._)(e,n,c)},h=(0,r.forwardRef)((function(e,n){return r.createElement(u.Z,Object.assign({ref:n},e,{renderPath:d}))}));h.displayName="GoogleLogo";var m=h,k=new Map;k.set("bold",(function(e){return r.createElement(r.Fragment,null,r.createElement("path",{d:"M84,240a23.9,23.9,0,0,0,24-24V168",fill:"none",stroke:e,strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"24"}),r.createElement("path",{d:"M172,240a23.9,23.9,0,0,1-24-24V168",fill:"none",stroke:e,strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"24"}),r.createElement("path",{d:"M152,168h16a23.9,23.9,0,0,1,24,24v8a23.9,23.9,0,0,0,24,24",fill:"none",stroke:e,strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"24"}),r.createElement("path",{d:"M104,168H88a23.9,23.9,0,0,0-24,24v8a23.9,23.9,0,0,1-24,24",fill:"none",stroke:e,strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"24"}),r.createElement("path",{d:"M111.8,64A52,52,0,0,0,68,40a52,52,0,0,0-3.5,44.7A49.3,49.3,0,0,0,56,112v8a48,48,0,0,0,48,48h48a48,48,0,0,0,48-48v-8a49.3,49.3,0,0,0-8.5-27.3A52,52,0,0,0,188,40a52,52,0,0,0-43.8,24Z",fill:"none",stroke:e,strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"24"}))})),k.set("duotone",(function(e){return r.createElement(r.Fragment,null,r.createElement("path",{d:"M111.8,64A52,52,0,0,0,68,40a52,52,0,0,0-3.5,44.7A49.3,49.3,0,0,0,56,112v8a48,48,0,0,0,48,48h48a48,48,0,0,0,48-48v-8a49.3,49.3,0,0,0-8.5-27.3A52,52,0,0,0,188,40a52,52,0,0,0-43.8,24Z",opacity:"0.2"}),r.createElement("path",{d:"M84,240a23.9,23.9,0,0,0,24-24V168",fill:"none",stroke:e,strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"16"}),r.createElement("path",{d:"M172,240a23.9,23.9,0,0,1-24-24V168",fill:"none",stroke:e,strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"16"}),r.createElement("path",{d:"M152,168h16a23.9,23.9,0,0,1,24,24v8a23.9,23.9,0,0,0,24,24",fill:"none",stroke:e,strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"16"}),r.createElement("path",{d:"M104,168H88a23.9,23.9,0,0,0-24,24v8a23.9,23.9,0,0,1-24,24",fill:"none",stroke:e,strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"16"}),r.createElement("path",{d:"M111.8,64A52,52,0,0,0,68,40a52,52,0,0,0-3.5,44.7A49.3,49.3,0,0,0,56,112v8a48,48,0,0,0,48,48h48a48,48,0,0,0,48-48v-8a49.3,49.3,0,0,0-8.5-27.3A52,52,0,0,0,188,40a52,52,0,0,0-43.8,24Z",fill:"none",stroke:e,strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"16"}))})),k.set("fill",(function(){return r.createElement(r.Fragment,null,r.createElement("path",{d:"M224,224a8,8,0,0,1-8,8,32.1,32.1,0,0,1-32-32v-8a16,16,0,0,0-16-16H156v40a16,16,0,0,0,16,16,8,8,0,0,1,0,16,32.1,32.1,0,0,1-32-32V176H116v40a32.1,32.1,0,0,1-32,32,8,8,0,0,1,0-16,16,16,0,0,0,16-16V176H88a16,16,0,0,0-16,16v8a32.1,32.1,0,0,1-32,32,8,8,0,0,1,0-16,16,16,0,0,0,16-16v-8a32.1,32.1,0,0,1,14.8-27A55.8,55.8,0,0,1,48,120v-8a58,58,0,0,1,7.7-28.3A59.9,59.9,0,0,1,61.1,36,7.8,7.8,0,0,1,68,32a59.7,59.7,0,0,1,48,24h24a59.7,59.7,0,0,1,48-24,7.8,7.8,0,0,1,6.9,4,59.9,59.9,0,0,1,5.4,47.7A58,58,0,0,1,208,112v8a55.8,55.8,0,0,1-22.8,45A32.1,32.1,0,0,1,200,192v8a16,16,0,0,0,16,16A8,8,0,0,1,224,224Z"}))})),k.set("light",(function(e){return r.createElement(r.Fragment,null,r.createElement("path",{d:"M84,240a23.9,23.9,0,0,0,24-24V168",fill:"none",stroke:e,strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"12"}),r.createElement("path",{d:"M172,240a23.9,23.9,0,0,1-24-24V168",fill:"none",stroke:e,strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"12"}),r.createElement("path",{d:"M152,168h16a23.9,23.9,0,0,1,24,24v8a23.9,23.9,0,0,0,24,24",fill:"none",stroke:e,strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"12"}),r.createElement("path",{d:"M104,168H88a23.9,23.9,0,0,0-24,24v8a23.9,23.9,0,0,1-24,24",fill:"none",stroke:e,strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"12"}),r.createElement("path",{d:"M111.8,64A52,52,0,0,0,68,40a52,52,0,0,0-3.5,44.7A49.3,49.3,0,0,0,56,112v8a48,48,0,0,0,48,48h48a48,48,0,0,0,48-48v-8a49.3,49.3,0,0,0-8.5-27.3A52,52,0,0,0,188,40a52,52,0,0,0-43.8,24Z",fill:"none",stroke:e,strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"12"}))})),k.set("thin",(function(e){return r.createElement(r.Fragment,null,r.createElement("path",{d:"M84,240a23.9,23.9,0,0,0,24-24V168",fill:"none",stroke:e,strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"8"}),r.createElement("path",{d:"M172,240a23.9,23.9,0,0,1-24-24V168",fill:"none",stroke:e,strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"8"}),r.createElement("path",{d:"M152,168h16a23.9,23.9,0,0,1,24,24v8a23.9,23.9,0,0,0,24,24",fill:"none",stroke:e,strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"8"}),r.createElement("path",{d:"M104,168H88a23.9,23.9,0,0,0-24,24v8a23.9,23.9,0,0,1-24,24",fill:"none",stroke:e,strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"8"}),r.createElement("path",{d:"M111.8,64A52,52,0,0,0,68,40a52,52,0,0,0-3.5,44.7A49.3,49.3,0,0,0,56,112v8a48,48,0,0,0,48,48h48a48,48,0,0,0,48-48v-8a49.3,49.3,0,0,0-8.5-27.3A52,52,0,0,0,188,40a52,52,0,0,0-43.8,24Z",fill:"none",stroke:e,strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"8"}))})),k.set("regular",(function(e){return r.createElement(r.Fragment,null,r.createElement("path",{d:"M84,240a23.9,23.9,0,0,0,24-24V168",fill:"none",stroke:e,strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"16"}),r.createElement("path",{d:"M172,240a23.9,23.9,0,0,1-24-24V168",fill:"none",stroke:e,strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"16"}),r.createElement("path",{d:"M152,168h16a23.9,23.9,0,0,1,24,24v8a23.9,23.9,0,0,0,24,24",fill:"none",stroke:e,strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"16"}),r.createElement("path",{d:"M104,168H88a23.9,23.9,0,0,0-24,24v8a23.9,23.9,0,0,1-24,24",fill:"none",stroke:e,strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"16"}),r.createElement("path",{d:"M111.8,64A52,52,0,0,0,68,40a52,52,0,0,0-3.5,44.7A49.3,49.3,0,0,0,56,112v8a48,48,0,0,0,48,48h48a48,48,0,0,0,48-48v-8a49.3,49.3,0,0,0-8.5-27.3A52,52,0,0,0,188,40a52,52,0,0,0-43.8,24Z",fill:"none",stroke:e,strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"16"}))}));var f=function(e,n){return(0,s._)(e,n,k)},p=(0,r.forwardRef)((function(e,n){return r.createElement(u.Z,Object.assign({ref:n},e,{renderPath:f}))}));p.displayName="GithubLogo";var v=p,L=new Map;L.set("bold",(function(e){return r.createElement(r.Fragment,null,r.createElement("path",{d:"M128,88c0-22,18.5-40.3,40.5-40a40,40,0,0,1,36.2,24H240l-32.3,32.3A127.9,127.9,0,0,1,80,224c-32,0-40-12-40-12s32-12,48-36c0,0-64-32-48-120,0,0,40,40,88,48Z",fill:"none",stroke:e,strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"24"}))})),L.set("duotone",(function(e){return r.createElement(r.Fragment,null,r.createElement("path",{d:"M128,88c0-22,18.5-40.3,40.5-40a40,40,0,0,1,36.2,24H240l-32.3,32.3A127.9,127.9,0,0,1,80,224c-32,0-40-12-40-12s32-12,48-36c0,0-64-32-48-120,0,0,40,40,88,48Z",opacity:"0.2"}),r.createElement("path",{d:"M128,88c0-22,18.5-40.3,40.5-40a40,40,0,0,1,36.2,24H240l-32.3,32.3A127.9,127.9,0,0,1,80,224c-32,0-40-12-40-12s32-12,48-36c0,0-64-32-48-120,0,0,40,40,88,48Z",fill:"none",stroke:e,strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"16"}))})),L.set("fill",(function(){return r.createElement(r.Fragment,null,r.createElement("path",{d:"M245.7,77.7l-30.2,30.1C209.5,177.7,150.5,232,80,232c-14.5,0-26.5-2.3-35.6-6.8-7.3-3.7-10.3-7.6-11.1-8.8a8,8,0,0,1,3.9-11.9c.2-.1,23.8-9.1,39.1-26.4a108.6,108.6,0,0,1-24.7-24.4c-13.7-18.6-28.2-50.9-19.5-99.1a8.1,8.1,0,0,1,5.5-6.2,8,8,0,0,1,8.1,1.9c.3.4,33.6,33.2,74.3,43.8V88a48.3,48.3,0,0,1,48.6-48,48.2,48.2,0,0,1,41,24H240a8,8,0,0,1,7.4,4.9A8.4,8.4,0,0,1,245.7,77.7Z"}))})),L.set("light",(function(e){return r.createElement(r.Fragment,null,r.createElement("path",{d:"M128,88c0-22,18.5-40.3,40.5-40a40,40,0,0,1,36.2,24H240l-32.3,32.3A127.9,127.9,0,0,1,80,224c-32,0-40-12-40-12s32-12,48-36c0,0-64-32-48-120,0,0,40,40,88,48Z",fill:"none",stroke:e,strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"12"}))})),L.set("thin",(function(e){return r.createElement(r.Fragment,null,r.createElement("path",{d:"M128,88c0-22,18.5-40.3,40.5-40a40,40,0,0,1,36.2,24H240l-32.3,32.3A127.9,127.9,0,0,1,80,224c-32,0-40-12-40-12s32-12,48-36c0,0-64-32-48-120,0,0,40,40,88,48Z",fill:"none",stroke:e,strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"8"}))})),L.set("regular",(function(e){return r.createElement(r.Fragment,null,r.createElement("path",{d:"M128,88c0-22,18.5-40.3,40.5-40a40,40,0,0,1,36.2,24H240l-32.3,32.3A127.9,127.9,0,0,1,80,224c-32,0-40-12-40-12s32-12,48-36c0,0-64-32-48-120,0,0,40,40,88,48Z",fill:"none",stroke:e,strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"16"}))}));var j=function(e,n){return(0,s._)(e,n,L)},g=(0,r.forwardRef)((function(e,n){return r.createElement(u.Z,Object.assign({ref:n},e,{renderPath:j}))}));g.displayName="TwitterLogo";var E=g,Z=t(184),x=function(){return(0,Z.jsxs)(o.Z,{children:[(0,Z.jsx)(a.Z,{sx:{my:2.5,typography:"overline",color:"text.disabled","&::before, ::after":{borderTopStyle:"dashed"}},children:"OR"}),(0,Z.jsxs)(i.Z,{direction:"row",justifyContent:"center",spacing:2,children:[(0,Z.jsx)(l.Z,{children:(0,Z.jsx)(m,{color:"#DF3E30"})}),(0,Z.jsx)(l.Z,{color:"inherit",children:(0,Z.jsx)(v,{})}),(0,Z.jsx)(l.Z,{children:(0,Z.jsx)(E,{color:"#1C9CEA"})})]})]})}},9534:function(e,n,t){t.d(n,{f:function(){return x}});var r=t(885),o=t(2791),a=t(1134),i=t(8007),l=t(4695),s=t(3309),u=t(4162),c=t(8771),d=t(8254),h=t(3811),m=t(6283),k=t(7205),f=t(6580),p=t(1087),v=t(3735),L=t(697),j=t(2140),g=t(9434),E=t(5393),Z=t(184),x={bgcolor:"text.primary",color:function(e){return"light"===e.palette.mode?"common.white":"grey.800"},"&:hover":{bgcolor:"text.primary",color:function(e){return"light"===e.palette.mode?"common.white":"grey.800"}}};n.Z=function(){var e=(0,o.useState)(!1),n=(0,r.Z)(e,2),t=n[0],M=n[1],W=(0,g.v9)((function(e){return e.auth})).isLoading,A=(0,E.Z)(j.x4),b=(0,r.Z)(A,1)[0],y=i.Ry().shape({email:i.Z_().required("Email is required").email("Email must be a valid email address"),password:i.Z_().required("Password is required")}),w=(0,a.cI)({resolver:(0,l.X)(y),defaultValues:{email:"demo@gochat.com",password:"demo123"}}),F=w.handleSubmit,V=w.formState.errors;return(0,Z.jsxs)(s.ZP,{methods:w,onSubmit:F((function(e){b(e)})),children:[(0,Z.jsxs)(u.Z,{spacing:3,children:[!!V.afterSubmit&&(0,Z.jsx)(c.Z,{severity:"error",children:V.afterSubmit.message}),(0,Z.jsx)(s.au,{name:"email",label:"Email address"}),(0,Z.jsx)(s.au,{name:"password",label:"Password",type:t?"text":"password",InputProps:{endAdornment:(0,Z.jsx)(d.Z,{position:"end",children:(0,Z.jsx)(h.Z,{onClick:function(){return M(!t)},children:t?(0,Z.jsx)(v.Z,{}):(0,Z.jsx)(L.Z,{})})})}})]}),(0,Z.jsx)(u.Z,{alignItems:"flex-end",sx:{my:2},children:(0,Z.jsx)(m.Z,{component:p.rU,to:"/auth/reset-password",variant:"body2",color:"inherit",underline:"always",children:"Forgot Password?"})}),(0,Z.jsx)(k.Z,{fullWidth:!0,color:"inherit",size:"large",type:"submit",variant:"contained",sx:x,children:W?(0,Z.jsx)(f.Z,{color:"inherit"}):"Login"})]})}}}]);
//# sourceMappingURL=89.2081e266.chunk.js.map