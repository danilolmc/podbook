(self.webpackChunkpodbook=self.webpackChunkpodbook||[]).push([[38],{38:(n,t,o)=>{"use strict";o.r(t),o.d(t,{SignInModule:()=>P});var e=o(8583),r=o(519),i=o(2729),a=o(5262),s=o(4911),c=o(7709),g=o(6782),m=o(639),u=o(2340),l=o(3342),p=o(1841),d=o(1088);let f=(()=>{class n{constructor(n,t){this.http=n,this.userService=t}signin(n){const{host:t,port:o,url:e}=u.N.apiRequest;return this.http.post(`${t}:${o}${e}/sign-in`,n,{observe:"response"}).pipe((0,l.b)(n=>{const t=n.headers.get("x-auth-token");this.userService.setToken(t)}))}}return n.\u0275fac=function(t){return new(t||n)(m.LFG(p.eN),m.LFG(d.K))},n.\u0275prov=m.Yz7({token:n,factory:n.\u0275fac,providedIn:"root"}),n})();var M=o(2232);const C=function(){return["/sign-up"]},_=[{path:"",component:(()=>{class n{constructor(n,t,o){this.signinService=n,this.activatedRoute=t,this.router=o,this.unsubscriber=new c.xQ,this.fromUrl="",this.authenticationErrorMessage="",this.fieldsValidators={email:[{validationName:"required",validationErrorMessage:"Campo obrigat\xf3rio"},{validationName:"email",validationErrorMessage:"Email inv\xe1lido"}],password:[{validationName:"required",validationErrorMessage:"Campo obrigat\xf3rio"}]}}ngOnInit(){this.activatedRoute.queryParams.subscribe(n=>this.fromUrl=n.fromUrl)}submit(n,t){if(n.preventDefault(),!this.validateSignInValues(t))return;const[o,e]=t.map(n=>n.value);this.signinService.signin({email:o,password:e}).pipe((0,g.R)(this.unsubscriber)).subscribe(n=>{n.body.authenticated&&this.router.navigate(["/podbooks"])},({error:n})=>this.authenticationErrorMessage=n.message)}validateSignInValues(n){return(0,s.O)(n)}ngOnDestroy(){this.unsubscriber.next(),this.unsubscriber.complete()}}return n.\u0275fac=function(t){return new(t||n)(m.Y36(f),m.Y36(r.gz),m.Y36(r.F0))},n.\u0275cmp=m.Xpm({type:n,selectors:[["pod-sign-in"]],decls:17,vars:5,consts:[[1,"signin"],[1,"form-container"],["src","assets/logo/logo.svg","alt",""],["labelText","Email","type","email",1,"email",3,"validations"],["email",""],["labelText","Password","type","password",1,"password",3,"validations"],["password",""],[1,"authentication-error"],[1,"submit",3,"click"],[1,"create-account",3,"routerLink"]],template:function(n,t){if(1&n){const n=m.EpF();m.TgZ(0,"div",0),m.TgZ(1,"div",1),m._UZ(2,"img",2),m.TgZ(3,"form"),m._UZ(4,"pod-form-field",3,4),m._UZ(6,"pod-form-field",5,6),m.TgZ(8,"span",7),m._uU(9),m.qZA(),m.TgZ(10,"button",8),m.NdJ("click",function(o){m.CHM(n);const e=m.MAs(5),r=m.MAs(7);return t.submit(o,[e,r])}),m._uU(11,"Login"),m.qZA(),m.qZA(),m.TgZ(12,"footer"),m.TgZ(13,"button",9),m._uU(14,"Create my "),m.TgZ(15,"span"),m._uU(16,"account"),m.qZA(),m.qZA(),m.qZA(),m.qZA(),m.qZA()}2&n&&(m.xp6(4),m.Q6J("validations",t.fieldsValidators.email),m.xp6(2),m.Q6J("validations",t.fieldsValidators.password),m.xp6(3),m.Oqu(t.authenticationErrorMessage),m.xp6(4),m.Q6J("routerLink",m.DdM(4,C)))},directives:[M.h,r.rH],styles:["@keyframes appearAnimation{to{opacity:1;transform:translateY(0)}}.signin[_ngcontent-%COMP%]{margin:20rem auto 25rem;opacity:0;transform:translateY(100px);animation:appearAnimation .5s ease-in-out forwards}.signin[_ngcontent-%COMP%]   .form-container[_ngcontent-%COMP%]{margin:0 auto;display:block;max-width:43rem}.signin[_ngcontent-%COMP%]   .form-container[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{display:block;margin:0 auto;width:7rem}.signin[_ngcontent-%COMP%]   .form-container[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{border:0;cursor:pointer;background:none;transition:.5s}.signin[_ngcontent-%COMP%]   .form-container[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:hover{opacity:.9}.signin[_ngcontent-%COMP%]   .form-container[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]{margin-top:12rem}.signin[_ngcontent-%COMP%]   .form-container[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   .email[_ngcontent-%COMP%], .signin[_ngcontent-%COMP%]   .form-container[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   .password[_ngcontent-%COMP%], .signin[_ngcontent-%COMP%]   .form-container[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   .submit[_ngcontent-%COMP%]{margin:3rem 0;display:block}.signin[_ngcontent-%COMP%]   .form-container[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   .forgot-password[_ngcontent-%COMP%]{display:block;margin:0}.signin[_ngcontent-%COMP%]   .form-container[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   .submit[_ngcontent-%COMP%]{border-radius:5px;width:100%;padding:1.4rem 2rem;margin-top:2rem;background-color:#8348ff;color:#fff}.signin[_ngcontent-%COMP%]   .form-container[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   .password[_ngcontent-%COMP%]{margin-bottom:0}.signin[_ngcontent-%COMP%]   .form-container[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   .authentication-error[_ngcontent-%COMP%]{color:#da5454;transition:.5s ease;display:block;margin-top:1.5rem;height:1.5rem}.signin[_ngcontent-%COMP%]   .form-container[_ngcontent-%COMP%]   .create-account[_ngcontent-%COMP%], .signin[_ngcontent-%COMP%]   .form-container[_ngcontent-%COMP%]   .forgot-password[_ngcontent-%COMP%]{color:#c4c4c4;font-weight:300}.signin[_ngcontent-%COMP%]   .form-container[_ngcontent-%COMP%]   .create-account[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{color:#8348ff}"]}),n})()}];let O=(()=>{class n{}return n.\u0275fac=function(t){return new(t||n)},n.\u0275mod=m.oAB({type:n}),n.\u0275inj=m.cJS({imports:[[r.Bz.forChild(_)],r.Bz]}),n})(),P=(()=>{class n{}return n.\u0275fac=function(t){return new(t||n)},n.\u0275mod=m.oAB({type:n}),n.\u0275inj=m.cJS({imports:[[e.ez,a.I,i.k,r.Bz,O]]}),n})()}}]);