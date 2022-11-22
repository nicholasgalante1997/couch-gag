# THE COUCH GAG website

> This is a typescript/nextjs/react application leveraging server-side rendering and react-query prefetching to serve **STORY MARKUP** to consumers via a browser/mobile browser.

## Couch Gag Abstract

Couch Gag is a collective of several microservices that compose a modern markup site. We, Couch Gag, believe in a domain driven architectural design. A service should be small. It should do one thing exceedingly well. If it begins to dilute its responsibilities, the complexity of maintenance of the service rises geometrically along with it. It becomes arduous to onboard onto for new developers. It becomes bad code.

Bad code is so difficult to maintain. Its not even funny. I am not laughing, do you see my face. Its the reason why entire teams of developers rewrite services after 2 years, while only marginally adding onto overall functionality. As a developer, I want the code I write to run a thousand years. It won't. But with that mentality it might run 5, well.

**Couch Gag is a collection of microservices** and the list of associated services can be found below.

- couch-gag-common-library
  - A Typescript package, isomorphic, that supplied common utils to `couch-gag-server` and `couch-gag-website`. 
  - These utils include loggers, theme primitives, and shared types.
  - It is a compile time dependency for `couch-gag-website` and `couch-gag-server`.
- couch-gag-metrics-hub
  - A Rust implemented web-server microservice.
  - `couch-gag-website` and `couch-gag-server` pump metrics via http requests to this server.
  - This server listens for incoming http requests, pulls metric values off the request, and maps it to a Metric type
- couch-gag-server
  - A Node/Typescript/Express http server implementation
  - Manages **STORY MARKUP** and serves **story collection data*, and *individual story data* to `couch-gag-website`
  - pumps metric data about stories to `couch-gag-metrics-hub` 
  - Stories are written in **MARKDOWN** and can be found in this package in `src/data/`
- couch-gag-website
  - A typescript/nextjs/react application that acts as the frontend to serve **STORY MARKUP** through.
  - Fetches **story data** from `couch-gag-server` to render to users in browser/mobile.
  - pumps metric data about user events to `couch-gag-metrics-hub`

## Developer Guide

### Tech Stack

- Nextjs 12.x : *react based framework for utilizing react in server runtime environments, optimizes SEO and initial paint render.*
- React 18.x, React-DOM 18.x : *rendering engine of choice, may scrap nextjs and leverage react-dom server runtime if benefits arise from utilizing a more barebones ssr setup*
- React-Query 3.x : *react based async state management library, assists asynchronous data fetching in a hook based implementation, offers optimizations for prefetching on server*
- Recoil 0.x : *react/hook-based lightweight orthagonal state store, similar to react context*
- Styled-Components 5.x, @nickgdev/hellerui 1.x, @mdx/react 12.x : *style engines used to serve markup*
- Eslint 8.x, Prettier 2.x : *everyone's favorite linters*

### Docker and THE COUCH GAG WEBSITE

plcaeholder text