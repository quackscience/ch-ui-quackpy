import meta from "../../../pages/_meta.ts";
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