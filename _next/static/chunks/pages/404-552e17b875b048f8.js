(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[197],{1211:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/404",function(){return n(2053)}])},2053:function(e,t,n){"use strict";n.r(t),n.d(t,{useTOC:function(){return s}});var i=n(5893),r=n(7812),o=n(3839),a=n(8925),c=n(6545);function s(e){return[]}t.default=(0,r.c)(function(e){let t={h1:"h1",...(0,a.a)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(t.h1,{children:"404: Page Not Found"}),"\n",(0,i.jsx)(c.AO,{})]})},"/404",{filePath:"pages/404.mdx",timestamp:1728985022e3,pageMap:o.v,frontMatter:{},title:"404: Page Not Found"},"undefined"==typeof RemoteContent?s:RemoteContent.useTOC)},8925:function(e,t,n){"use strict";n.d(t,{a:function(){return s}});var i=n(1151),r=n(5675),o=n.n(r),a=n(7294);let c={img:e=>(0,a.createElement)("object"==typeof e.src?o():"img",e)},s=e=>(0,i.a)({...c,...e})},7812:function(e,t,n){"use strict";n.d(t,{c:function(){return l}});var i=n(5893),r=n(3665),o=n(8644);let a=(0,n(7294).createContext)({}),c=a.Provider;a.displayName="SSG";var s=n(8925);function l(e,t,n,i){let o=globalThis[r.ud];return o.route=t,o.pageMap=n.pageMap,o.context[t]={Content:e,pageOpts:n,useTOC:i},u}function u({__nextra_pageMap:e=[],__nextra_dynamic_opts:t,...n}){let a=globalThis[r.ud],{Layout:s,themeConfig:l}=a,{route:u,locale:g}=(0,o.t)(),p=a.context[u];if(!p)throw Error(`No content found for the "${u}" route. Please report it as a bug.`);let{pageOpts:m,useTOC:f,Content:h}=p;if(u.startsWith("/["))m.pageMap=e;else for(let{route:t,children:n}of e){let e=t.split("/").slice(g?2:1);(function e(t,[n,...i]){for(let r of t)if("children"in r&&n===r.name)return i.length?e(r.children,i):r})(m.pageMap,e).children=n}if(t){let{title:e,frontMatter:n}=t;m={...m,title:e,frontMatter:n}}return(0,i.jsx)(s,{themeConfig:l,pageOpts:m,pageProps:n,children:(0,i.jsx)(c,{value:n,children:(0,i.jsx)(d,{useTOC:f,children:(0,i.jsx)(h,{...n})})})})}function d({children:e,useTOC:t}){let{wrapper:n}=(0,s.a)();return(0,i.jsx)(g,{useTOC:t,wrapper:n,children:e})}function g({children:e,useTOC:t,wrapper:n,...r}){let o=t(r);return n?(0,i.jsx)(n,{toc:o,children:e}):e}},3839:function(e,t,n){"use strict";n.d(t,{v:function(){return i}});let i=[{data:{index:{type:"page",title:"CH-UI",display:"hidden",theme:{layout:"full",timestamp:!1}},docs:{type:"page",title:"Documentation"},blog:{type:"page",title:"Blog",theme:{typesetting:"article",breadcrumb:!0,footer:!0,sidebar:!1,toc:!0,pagination:!0}},support:{type:"page",title:"Support",href:"https://www.buymeacoffee.com/caioricciuti?utm_source=ch-ui-docs&utm_medium=header",newWindow:!0},legal:{type:"page",title:"Legal"},404:{type:"page",theme:{timestamp:!1,typesetting:"article"}}}},{name:"404",route:"/404",frontMatter:{sidebarTitle:"404"}},{name:"blog",route:"/blog",children:[{data:{index:{title:"Blog",type:"page"},posts:{title:"Posts",type:"hidden"},"*":{type:"page",theme:{typesetting:"article"}}}},{name:"index",route:"/blog",frontMatter:{sidebarTitle:"Index"}},{name:"posts",route:"/blog/posts",children:[{data:{index:{title:"Blog",type:"page"},"ch-ui-blog":"First CH-UI Blog Post","why-i-couldnt-lose-my-data":"Why I couldn't Lose My Data!"}},{name:"ch-ui-blog",route:"/blog/posts/ch-ui-blog",frontMatter:{title:"CH-UI's Origin...",description:"The story of how CH-UI came to be.",author:{name:"Caio Ricciuti",github:"https://github.com/caioricciuti",avatar:"https://avatars.githubusercontent.com/u/1025885?v=4"},date:new Date(1728432e6),readingTime:5}},{name:"index",route:"/blog/posts",frontMatter:{sidebarTitle:"Index"}},{name:"why-i-couldnt-lose-my-data",route:"/blog/posts/why-i-couldnt-lose-my-data",frontMatter:{title:"Why I couldn't Lose My Data!",description:"From this day on, I knew I can get all the answers I need from my data.",author:{name:"Caio Ricciuti",github:"https://github.com/caioricciuti",avatar:"https://avatars.githubusercontent.com/u/1025885?v=4"},tags:["ch-ui","clickhouse","data"],date:new Date(1728432e6),readingTime:3}}]}]},{name:"docs",route:"/docs",children:[{data:{index:"Start Here","getting-started":"Getting Started","core-concepts":"Core Concepts",contributing:"Contributing",acknowledgments:"Acknowledgments",license:"License",security:"Security"}},{name:"acknowledgments",route:"/docs/acknowledgments",frontMatter:{title:"Acknowledgments"}},{name:"contributing",route:"/docs/contributing",frontMatter:{title:"Contributing"}},{name:"core-concepts",route:"/docs/core-concepts",frontMatter:{title:"Core Concepts"}},{name:"getting-started",route:"/docs/getting-started",frontMatter:{sidebarTitle:"Getting Started"}},{name:"index",route:"/docs",frontMatter:{sidebarTitle:"Index"}},{name:"license",route:"/docs/license",frontMatter:{sidebarTitle:"License"}},{name:"security",route:"/docs/security",frontMatter:{sidebarTitle:"Security"}}]},{name:"index",route:"/",frontMatter:{title:"CH-UI | Data's better when we see it."}},{name:"legal",route:"/legal",children:[{data:{index:{title:"Legal",type:"page",description:"Legal information about CH-UI.",theme:{breadcrumb:!1},items:[{title:"Terms of Service",href:"/legal/terms-of-service"},{title:"Privacy Policy",href:"/legal/privacy-policy"}]}}},{name:"index",route:"/legal",frontMatter:{sidebarTitle:"Index"}},{name:"privacy-policy",route:"/legal/privacy-policy",frontMatter:{sidebarTitle:"Privacy Policy"}},{name:"terms-of-service",route:"/legal/terms-of-service",frontMatter:{sidebarTitle:"Terms of Service"}}]}]}},function(e){e.O(0,[888,774,179],function(){return e(e.s=1211)}),_N_E=e.O()}]);