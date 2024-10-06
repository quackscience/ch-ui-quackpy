"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[924],{7097:(e,n,i)=>{i.r(n),i.d(n,{assets:()=>l,contentTitle:()=>c,default:()=>h,frontMatter:()=>r,metadata:()=>o,toc:()=>d});var t=i(4848),s=i(8453);const r={sidebar_position:2},c="Getting Started \ud83d\ude80",o={id:"getting-started",title:"Getting Started \ud83d\ude80",description:"Let's start with CH-UI in less than 5 minutes.",source:"@site/docs/getting-started.md",sourceDirName:".",slug:"/getting-started",permalink:"/docs/getting-started",draft:!1,unlisted:!1,editUrl:"https://github.com/caioricciuti/ch-ui/edit/main/docs/docs/getting-started.md",tags:[],version:"current",sidebarPosition:2,frontMatter:{sidebar_position:2},sidebar:"tutorialSidebar",previous:{title:"Introduction",permalink:"/docs/introduction"},next:{title:"CH-UI Core",permalink:"/docs/core_concepts"}},l={},d=[{value:"Prerequisites",id:"prerequisites",level:2},{value:"\ud83d\udc33 Docker",id:"-docker",level:2},{value:"\ud83d\udcbb Build from source",id:"-build-from-source",level:2},{value:"Project Structure",id:"project-structure",level:2},{value:"Next Steps",id:"next-steps",level:2},{value:"Contributing",id:"contributing",level:2}];function a(e){const n={a:"a",code:"code",h1:"h1",h2:"h2",header:"header",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,s.R)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.header,{children:(0,t.jsx)(n.h1,{id:"getting-started-",children:"Getting Started \ud83d\ude80"})}),"\n",(0,t.jsxs)(n.p,{children:["Let's start with ",(0,t.jsx)(n.strong,{children:"CH-UI in less than 5 minutes"}),"."]}),"\n",(0,t.jsx)(n.h2,{id:"prerequisites",children:"Prerequisites"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:["A running ClickHouse server instance ",(0,t.jsx)(n.a,{href:"https://clickhouse.com/docs/en/install#quick-install",children:"ClickHouse Official Installation Guide"})]}),"\n"]}),"\n",(0,t.jsx)(n.h2,{id:"-docker",children:"\ud83d\udc33 Docker"}),"\n",(0,t.jsx)(n.p,{children:"You can deploy CH-UI in a few minutes using Docker. Just run the following command:"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"docker run -p 5521:5521 ghcr.io/caioricciuti/ch-ui:latest\n"})}),"\n",(0,t.jsxs)(n.p,{children:["We also have a docker-compose file that you can use to deploy CH-UI. Just create a ",(0,t.jsx)(n.code,{children:"docker-compose.yml"})," file with the following content:"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-yaml",children:'services:\n  ch-ui:\n    image: ghcr.io/caioricciuti/ch-ui:latest\n    restart: always\n    ports:\n      - "${CH_UI_PORT:-5521}:5521"\n    environment:\n      VITE_CLICKHOUSE_URL: "http://your-clickhouse-server:8123"\n      VITE_CLICKHOUSE_USER: "your-username"\n      VITE_CLICKHOUSE_PASS: "your-password"\n'})}),"\n",(0,t.jsx)(n.p,{children:"And then run:"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"# use -d to run in detached mode\ndocker-compose up -d\n"})}),"\n",(0,t.jsx)(n.p,{children:"Environment variables:"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"VITE_CLICKHOUSE_URL"}),": ClickHouse server URL (optional)"]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"VITE_CLICKHOUSE_USER"}),": ClickHouse user (optional)"]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"VITE_CLICKHOUSE_PASS"}),": ClickHouse password (optional)"]}),"\n"]}),"\n",(0,t.jsx)(n.h2,{id:"-build-from-source",children:"\ud83d\udcbb Build from source"}),"\n",(0,t.jsx)(n.p,{children:"You can also build CH-UI from source."}),"\n",(0,t.jsx)(n.p,{children:"Clone the repository:"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"git clone https://github.com/caioricciuti/ch-ui.git\n"})}),"\n",(0,t.jsx)(n.p,{children:"Install the dependencies:"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"cd ch-ui\nnpm install\n"})}),"\n",(0,t.jsx)(n.p,{children:"Run the development server:"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"npm run dev\n"})}),"\n",(0,t.jsxs)(n.p,{children:["Open ",(0,t.jsx)(n.a,{href:"http://localhost:5521",children:"http://localhost:5521"})," in your browser."]}),"\n",(0,t.jsx)(n.h2,{id:"project-structure",children:"Project Structure"}),"\n",(0,t.jsx)(n.p,{children:"Here's an overview of the key directories and files in the project:"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"/src"}),": Main source directory","\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"/components"}),": Reusable React components"]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"/pages"}),": Main page components (Home, Metrics, Settings)"]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"/store"}),": State management with Zustand"]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"/lib"}),": Utility functions"]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"/types"}),": TypeScript type definitions"]}),"\n"]}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"App.tsx"}),": Main application component"]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"main.tsx"}),": Application entry point"]}),"\n"]}),"\n",(0,t.jsx)(n.h2,{id:"next-steps",children:"Next Steps"}),"\n",(0,t.jsx)(n.p,{children:"Once you have the application running, you can:"}),"\n",(0,t.jsxs)(n.ol,{children:["\n",(0,t.jsx)(n.li,{children:"Connect to your ClickHouse server through the Settings page"}),"\n",(0,t.jsx)(n.li,{children:"Explore your databases and tables using the Database Explorer"}),"\n",(0,t.jsx)(n.li,{children:"Write and execute SQL queries in the SQL Editor"}),"\n",(0,t.jsx)(n.li,{children:"Organize your work using the Workspace Tabs"}),"\n"]}),"\n",(0,t.jsx)(n.p,{children:"For more detailed information on each feature, please refer to the respective sections in this documentation."}),"\n",(0,t.jsx)(n.h2,{id:"contributing",children:"Contributing"}),"\n",(0,t.jsxs)(n.p,{children:["If you want to contribute to CH-UI, please read the ",(0,t.jsx)(n.a,{href:"/docs/contributing",children:"contributing guide"}),"."]})]})}function h(e={}){const{wrapper:n}={...(0,s.R)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(a,{...e})}):a(e)}},8453:(e,n,i)=>{i.d(n,{R:()=>c,x:()=>o});var t=i(6540);const s={},r=t.createContext(s);function c(e){const n=t.useContext(r);return t.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function o(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:c(e.components),t.createElement(r.Provider,{value:n},e.children)}}}]);