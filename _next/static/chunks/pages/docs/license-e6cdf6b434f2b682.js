(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[747],{8911:function(e,t,i){(window.__NEXT_P=window.__NEXT_P||[]).push(["/docs/license",function(){return i(7353)}])},7353:function(e,t,i){"use strict";i.r(t),i.d(t,{useTOC:function(){return s}});var n=i(5893),o=i(7812),r=i(3839),a=i(8925);function s(e){return[]}t.default=(0,o.c)(function(e){let t={h1:"h1",p:"p",...(0,a.a)(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(t.h1,{children:"MIT License"}),"\n",(0,n.jsx)(t.p,{children:"Copyright (c) 2024 CH-UI/Caio Ricciuti/Ibero Data"}),"\n",(0,n.jsx)(t.p,{children:"Permission is hereby granted, free of charge, to any person obtaining a copy\nof this software and associated documentation files (the “Software”), to deal\nin the Software without restriction, including without limitation the rights\nto use, copy, modify, merge, publish, distribute, sublicense, and/or sell\ncopies of the Software, and to permit persons to whom the Software is\nfurnished to do so, subject to the following conditions:"}),"\n",(0,n.jsx)(t.p,{children:"The above copyright notice and this permission notice shall be included in all\ncopies or substantial portions of the Software."}),"\n",(0,n.jsx)(t.p,{children:"THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\nIMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\nFITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\nAUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\nLIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\nOUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE\nSOFTWARE."})]})},"/docs/license",{filePath:"pages/docs/license.mdx",timestamp:17300971e5,pageMap:r.v,frontMatter:{},title:"MIT License"},"undefined"==typeof RemoteContent?s:RemoteContent.useTOC)},8925:function(e,t,i){"use strict";i.d(t,{a:function(){return c}});var n=i(1151),o=i(5675),r=i.n(o),a=i(7294);let s={img:e=>(0,a.createElement)("object"==typeof e.src?r():"img",e)},c=e=>(0,n.a)({...s,...e})},7812:function(e,t,i){"use strict";i.d(t,{c:function(){return l}});var n=i(5893),o=i(3665),r=i(8644);let a=(0,i(7294).createContext)({}),s=a.Provider;a.displayName="SSG";var c=i(8925);function l(e,t,i,n){let r=globalThis[o.ud];return r.route=t,r.pageMap=i.pageMap,r.context[t]={Content:e,pageOpts:i,useTOC:n},u}function u({__nextra_pageMap:e=[],__nextra_dynamic_opts:t,...i}){let a=globalThis[o.ud],{Layout:c,themeConfig:l}=a,{route:u,locale:p}=(0,r.t)(),g=a.context[u];if(!g)throw Error(`No content found for the "${u}" route. Please report it as a bug.`);let{pageOpts:h,useTOC:m,Content:f}=g;if(u.startsWith("/["))h.pageMap=e;else for(let{route:t,children:i}of e){let e=t.split("/").slice(p?2:1);(function e(t,[i,...n]){for(let o of t)if("children"in o&&i===o.name)return n.length?e(o.children,n):o})(h.pageMap,e).children=i}if(t){let{title:e,frontMatter:i}=t;h={...h,title:e,frontMatter:i}}return(0,n.jsx)(c,{themeConfig:l,pageOpts:h,pageProps:i,children:(0,n.jsx)(s,{value:i,children:(0,n.jsx)(d,{useTOC:m,children:(0,n.jsx)(f,{...i})})})})}function d({children:e,useTOC:t}){let{wrapper:i}=(0,c.a)();return(0,n.jsx)(p,{useTOC:t,wrapper:i,children:e})}function p({children:e,useTOC:t,wrapper:i,...o}){let r=t(o);return i?(0,n.jsx)(i,{toc:r,children:e}):e}},3839:function(e,t,i){"use strict";i.d(t,{v:function(){return n}});let n=[{data:{index:{type:"page",title:"CH-UI",display:"hidden",theme:{layout:"full",timestamp:!1}},docs:{type:"page",title:"Documentation"},blog:{type:"page",title:"Blog",theme:{typesetting:"article",breadcrumb:!0,footer:!0,sidebar:!1,toc:!0,pagination:!0}},support:{type:"page",title:"Support",href:"https://www.buymeacoffee.com/caioricciuti?utm_source=ch-ui-docs&utm_medium=header",newWindow:!0},legal:{type:"page",title:"Legal"},404:{type:"page",theme:{timestamp:!1,typesetting:"article"}}}},{name:"404",route:"/404",frontMatter:{sidebarTitle:"404"}},{name:"blog",route:"/blog",children:[{data:{index:{title:"Blog",type:"page"},posts:{title:"Posts",type:"hidden"},"*":{type:"page",theme:{typesetting:"article"}}}},{name:"index",route:"/blog",frontMatter:{sidebarTitle:"Index"}},{name:"posts",route:"/blog/posts",children:[{data:{index:{title:"Blog",type:"page"},"ch-ui-blog":"First CH-UI Blog Post","why-i-couldnt-lose-my-data":"Why I couldn't Lose My Data!"}},{name:"ch-ui-blog",route:"/blog/posts/ch-ui-blog",frontMatter:{title:"CH-UI's Origin...",description:"The story of how CH-UI came to be.",author:{name:"Caio Ricciuti",github:"https://github.com/caioricciuti",avatar:"https://avatars.githubusercontent.com/u/1025885?v=4"},date:new Date(1728432e6),readingTime:5}},{name:"index",route:"/blog/posts",frontMatter:{sidebarTitle:"Index"}},{name:"why-i-couldnt-lose-my-data",route:"/blog/posts/why-i-couldnt-lose-my-data",frontMatter:{title:"Why I couldn't Lose My Data!",description:"From this day on, I knew I can get all the answers I need from my data.",author:{name:"Caio Ricciuti",github:"https://github.com/caioricciuti",avatar:"https://avatars.githubusercontent.com/u/1025885?v=4"},tags:["ch-ui","clickhouse","data"],date:new Date(1728432e6),readingTime:3}}]}]},{name:"docs",route:"/docs",children:[{data:{index:"Start Here","getting-started":"Getting Started","core-concepts":"Core Concepts",contributing:"Contributing",acknowledgments:"Acknowledgments",license:"License",security:"Security"}},{name:"acknowledgments",route:"/docs/acknowledgments",frontMatter:{title:"Acknowledgments"}},{name:"contributing",route:"/docs/contributing",frontMatter:{title:"Contributing"}},{name:"core-concepts",route:"/docs/core-concepts",frontMatter:{title:"Core Concepts"}},{name:"getting-started",route:"/docs/getting-started",frontMatter:{sidebarTitle:"Getting Started"}},{name:"index",route:"/docs",frontMatter:{sidebarTitle:"Index"}},{name:"license",route:"/docs/license",frontMatter:{sidebarTitle:"License"}},{name:"security",route:"/docs/security",frontMatter:{sidebarTitle:"Security"}}]},{name:"index",route:"/",frontMatter:{title:"CH-UI | Data's better when we see it."}},{name:"legal",route:"/legal",children:[{data:{index:{title:"Legal",type:"page",description:"Legal information about CH-UI.",theme:{breadcrumb:!1},items:[{title:"Terms of Service",href:"/legal/terms-of-service"},{title:"Privacy Policy",href:"/legal/privacy-policy"}]}}},{name:"index",route:"/legal",frontMatter:{sidebarTitle:"Index"}},{name:"privacy-policy",route:"/legal/privacy-policy",frontMatter:{sidebarTitle:"Privacy Policy"}},{name:"terms-of-service",route:"/legal/terms-of-service",frontMatter:{sidebarTitle:"Terms of Service"}}]}]}},function(e){e.O(0,[888,774,179],function(){return e(e.s=8911)}),_N_E=e.O()}]);