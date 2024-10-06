"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[408],{2668:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>l,contentTitle:()=>r,default:()=>d,frontMatter:()=>o,metadata:()=>s,toc:()=>c});var a=t(4848),i=t(8453);const o={slug:"why-i-couldnt-lose-my-data",title:"Why I couldn't Lose My Data!",authors:["caioricciuti"],tags:["CH-UI","Click House","Data Analysis"]},r="Why I couldn't Lose My Data!",s={permalink:"/blog/why-i-couldnt-lose-my-data",editUrl:"https://github.com/caioricciuti/ch-ui/edit/main/blog/2024-10-04-NYC-questions-aswered.md",source:"@site/blog/2024-10-04-NYC-questions-aswered.md",title:"Why I couldn't Lose My Data!",description:"Ever wondered how often Brooklynites make a break for the airport? Well, we've crunched the numbers, and the results are in!",date:"2024-10-04T00:00:00.000Z",tags:[{inline:!0,label:"CH-UI",permalink:"/blog/tags/ch-ui"},{inline:!0,label:"Click House",permalink:"/blog/tags/click-house"},{inline:!0,label:"Data Analysis",permalink:"/blog/tags/data-analysis"}],readingTime:2.5,hasTruncateMarker:!1,authors:[{name:"Caio Ricciuti",title:"Data Engineer & Analytics Enthusiast",url:"https://github.com/caioricciuti",page:{permalink:"/blog/authors/caioricciuti"},skills:["Data Engineering","Big Data Analytics","Machine Learning","Data Visualization"],socials:{github:"https://github.com/caioricciuti",linkedin:"https://www.linkedin.com/in/caioricciuti/"},interests:["Open Source Contributions","Data Science Education","Data Engineering Best Practices","Data Visualization"],languages:["Python","SQL","NodeJS"],imageURL:"https://github.com/caioricciuti.png",key:"caioricciuti"}],frontMatter:{slug:"why-i-couldnt-lose-my-data",title:"Why I couldn't Lose My Data!",authors:["caioricciuti"],tags:["CH-UI","Click House","Data Analysis"]},unlisted:!1,nextItem:{title:"A short introduction...",permalink:"/blog/introduction"}},l={authorsImageUrls:[void 0]},c=[{value:"The Brooklyn Escape Statistics",id:"the-brooklyn-escape-statistics",level:2},{value:"The Great Escape: Theories and Speculations",id:"the-great-escape-theories-and-speculations",level:2},{value:"The Brooklyn Airport Dash: A Modern Urban Legend",id:"the-brooklyn-airport-dash-a-modern-urban-legend",level:2},{value:"What&#39;s behind all this madness?",id:"whats-behind-all-this-madness",level:2}];function h(e){const n={a:"a",admonition:"admonition",blockquote:"blockquote",code:"code",h2:"h2",p:"p",pre:"pre",strong:"strong",...(0,i.R)(),...e.components},{Details:t}=n;return t||function(e,n){throw new Error("Expected "+(n?"component":"object")+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}("Details",!0),(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(n.p,{children:"Ever wondered how often Brooklynites make a break for the airport? Well, we've crunched the numbers, and the results are in!"}),"\n",(0,a.jsx)(n.h2,{id:"the-brooklyn-escape-statistics",children:"The Brooklyn Escape Statistics"}),"\n",(0,a.jsxs)(n.p,{children:["From July 1, 2015 to September 30, 2015, we tracked a whopping ",(0,a.jsx)(n.strong,{children:"52,075"})," taxi rides originating from the hipster havens and brownstone-lined streets of Brooklyn. But here's the kicker: ",(0,a.jsx)(n.strong,{children:"989"})," of these rides were headed straight for the airport!"]}),"\n",(0,a.jsx)(n.admonition,{title:"Fun Fact",type:"tip",children:(0,a.jsxs)(n.p,{children:["A full ",(0,a.jsx)(n.strong,{children:"1.9%"})," of Brooklyn taxi riders were airport-bound. That's nearly 1 in 50 rides!"]})}),"\n",(0,a.jsx)(n.h2,{id:"the-great-escape-theories-and-speculations",children:"The Great Escape: Theories and Speculations"}),"\n",(0,a.jsx)(n.p,{children:"Are they fleeing the artisanal coffee shops? Escaping the never-ending brunch lines? Or just jetting off on another Instagram-worthy adventure?"}),"\n",(0,a.jsx)(n.p,{children:"We may never know the true reason behind this mass exodus, but one thing's for sure: Brooklyn might be trendy, but apparently, the trendiest destination of all is... anywhere else!"}),"\n",(0,a.jsx)(n.h2,{id:"the-brooklyn-airport-dash-a-modern-urban-legend",children:"The Brooklyn Airport Dash: A Modern Urban Legend"}),"\n",(0,a.jsx)(n.p,{children:"So the next time you're stuck in Brooklyn traffic, remember: there's a 1.9% chance the car next to you is making a desperate dash for JFK. Maybe they forgot to pack their artisanal beard oil, or perhaps they're just late for their shift as a professional avocado toast influencer in LA."}),"\n",(0,a.jsx)(n.admonition,{title:"The Real Miracle of Brooklyn",type:"note",children:(0,a.jsx)(n.p,{children:"For many Brooklynites, the real 'Miracle of Brooklyn' is successfully hailing a cab to the airport!"})}),"\n",(0,a.jsx)(n.h2,{id:"whats-behind-all-this-madness",children:"What's behind all this madness?"}),"\n",(0,a.jsxs)(n.blockquote,{children:["\n",(0,a.jsx)(n.p,{children:'"How am I going to cary on with my lide without answers for all my questions about taxi rides in NYC!? I CAN\'T LOSE MY DATA!!! I NEED to know how many rides it happened from brooking to the airport!"'}),"\n"]}),"\n",(0,a.jsx)(n.p,{children:"I couldn't bear not knowing..."}),"\n",(0,a.jsx)(n.p,{children:"So, here's the raw data for all you number-crunching enthusiasts:"}),"\n",(0,a.jsxs)(t,{children:[(0,a.jsx)("summary",{children:"Query & Results"}),(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-sql",children:"SELECT\n  MIN(pickup_datetime) AS earliest_date,\n  MAX(pickup_datetime) AS latest_date,\n  COUNT(*) AS total_brooklyn_rides,\n  SUM(\n    CASE\n      WHEN dropoff_ntaname = 'Airport' THEN 1\n      ELSE 0\n    END\n  ) AS brooklyn_to_airport_rides,\n  ROUND(\n    SUM(\n      CASE\n        WHEN dropoff_ntaname = 'Airport' THEN 1\n        ELSE 0\n      END\n    ) * 100.0 / COUNT(*),\n    2\n  ) AS brooklyn_to_airport_percentage\nFROM\n  trips\nWHERE\n  pickup_ntaname IN (\n    'Park Slope-Gowanus',\n    'DUMBO-Vinegar Hill-Downtown Brooklyn-Boerum Hill',\n    'Williamsburg',\n    'Bedford',\n    'North Side-South Side',\n    'Brooklyn Heights-Cobble Hill',\n    'Prospect Heights',\n    'Clinton Hill',\n    'Carroll Gardens-Columbia Street-Red Hook',\n    'Bushwick South',\n    'Fort Greene',\n    'Crown Heights North',\n    'Sunset Park West',\n    'Bushwick North',\n    'Greenpoint',\n    'East Williamsburg',\n    'Ocean Hill',\n    'Stuyvesant Heights',\n    'Kensington-Ocean Parkway',\n    'Flatlands',\n    'Bay Ridge',\n    'Erasmus',\n    'Crown Heights South',\n    'Windsor Terrace',\n    'Flatbush',\n    'Dyker Heights',\n    'Sunset Park East',\n    'Canarsie',\n    'East New York',\n    'East Flatbush-Farragut',\n    'Borough Park',\n    'Prospect Lefferts Gardens-Wingate',\n    'Seagate-Coney Island',\n    'Starrett City',\n    'Homecrest',\n    'Midwood',\n    'Cypress Hills-City Line',\n    'Bath Beach',\n    'Bensonhurst West',\n    'Rugby-Remsen Village',\n    'Ocean Parkway South',\n    'East New York (Pennsylvania Ave)',\n    'Madison',\n    'Gravesend',\n    'Bensonhurst East',\n    'Sheepshead Bay-Gerritsen Beach-Manhattan Beach',\n    'Georgetown-Marine Park-Bergen Beach-Mill Basin',\n    'Brownsville',\n    'Brighton Beach'\n  )\n"})}),(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-json",children:'[\n  {\n    "earliest_date": "2015-07-01 00:05:52",\n    "latest_date": "2015-09-30 23:51:59",\n    "total_brooklyn_rides": "52075",\n    "brooklyn_to_airport_rides": "989",\n    "brooklyn_to_airport_percentage": 1.9\n  }\n]\n'})})]}),"\n",(0,a.jsxs)(n.admonition,{type:"note",children:[(0,a.jsxs)(n.p,{children:[(0,a.jsx)(n.strong,{children:"TRY IT:"})," Run the query yourself in your ClickHouse database to see the results!"]}),(0,a.jsxs)(n.p,{children:["Want to do it your self? Follow the steps ",(0,a.jsx)(n.a,{href:"https://clickhouse.com/docs/en/getting-started/example-datasets/nyc-taxi",children:"From ClickHouse official website"})," guide."]})]})]})}function d(e={}){const{wrapper:n}={...(0,i.R)(),...e.components};return n?(0,a.jsx)(n,{...e,children:(0,a.jsx)(h,{...e})}):h(e)}},8453:(e,n,t)=>{t.d(n,{R:()=>r,x:()=>s});var a=t(6540);const i={},o=a.createContext(i);function r(e){const n=a.useContext(o);return a.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function s(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:r(e.components),a.createElement(o.Provider,{value:n},e.children)}}}]);