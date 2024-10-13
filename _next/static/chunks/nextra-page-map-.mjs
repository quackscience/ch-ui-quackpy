import meta from "../../../pages/_meta.ts";
import blog_meta from "../../../pages/blog/_meta.ts";
import blog_posts_meta from "../../../pages/blog/posts/_meta.ts";
import docs_meta from "../../../pages/docs/_meta.ts";
import legal_meta from "../../../pages/legal/_meta.ts";
export const pageMap = [{
  data: meta
}, {
  name: "404",
  route: "/404",
  frontMatter: {
    "sidebarTitle": "404"
  }
}, {
  name: "blog",
  route: "/blog",
  children: [{
    data: blog_meta
  }, {
    name: "index",
    route: "/blog",
    frontMatter: {
      "sidebarTitle": "Index"
    }
  }, {
    name: "posts",
    route: "/blog/posts",
    children: [{
      data: blog_posts_meta
    }, {
      name: "ch-ui-blog",
      route: "/blog/posts/ch-ui-blog",
      frontMatter: {
        "title": "CH-UI's Origin...",
        "description": "The story of how CH-UI came to be.",
        "author": {
          "name": "Caio Ricciuti",
          "github": "https://github.com/caioricciuti",
          "avatar": "https://avatars.githubusercontent.com/u/1025885?v=4"
        },
        "date": new Date(1728432000000),
        "readingTime": 5
      }
    }, {
      name: "index",
      route: "/blog/posts",
      frontMatter: {
        "sidebarTitle": "Index"
      }
    }, {
      name: "why-i-couldnt-lose-my-data",
      route: "/blog/posts/why-i-couldnt-lose-my-data",
      frontMatter: {
        "title": "Why I couldn't Lose My Data!",
        "description": "From this day on, I knew I can get all the answers I need from my data.",
        "author": {
          "name": "Caio Ricciuti",
          "github": "https://github.com/caioricciuti",
          "avatar": "https://avatars.githubusercontent.com/u/1025885?v=4"
        },
        "tags": ["ch-ui", "clickhouse", "data"],
        "date": new Date(1728432000000),
        "readingTime": 3
      }
    }]
  }]
}, {
  name: "docs",
  route: "/docs",
  children: [{
    data: docs_meta
  }, {
    name: "acknowledgments",
    route: "/docs/acknowledgments",
    frontMatter: {
      "title": "Acknowledgments"
    }
  }, {
    name: "contributing",
    route: "/docs/contributing",
    frontMatter: {
      "title": "Contributing"
    }
  }, {
    name: "core-concepts",
    route: "/docs/core-concepts",
    frontMatter: {
      "title": "Core Concepts"
    }
  }, {
    name: "getting-started",
    route: "/docs/getting-started",
    frontMatter: {
      "sidebarTitle": "Getting Started"
    }
  }, {
    name: "index",
    route: "/docs",
    frontMatter: {
      "sidebarTitle": "Index"
    }
  }, {
    name: "license",
    route: "/docs/license",
    frontMatter: {
      "sidebarTitle": "License"
    }
  }, {
    name: "security",
    route: "/docs/security",
    frontMatter: {
      "sidebarTitle": "Security"
    }
  }]
}, {
  name: "index",
  route: "/",
  frontMatter: {
    "title": "CH-UI | Data's better when we see it."
  }
}, {
  name: "legal",
  route: "/legal",
  children: [{
    data: legal_meta
  }, {
    name: "index",
    route: "/legal",
    frontMatter: {
      "sidebarTitle": "Index"
    }
  }, {
    name: "privacy-policy",
    route: "/legal/privacy-policy",
    frontMatter: {
      "sidebarTitle": "Privacy Policy"
    }
  }, {
    name: "terms-of-service",
    route: "/legal/terms-of-service",
    frontMatter: {
      "sidebarTitle": "Terms of Service"
    }
  }]
}];