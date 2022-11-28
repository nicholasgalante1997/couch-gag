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

### File Structure

#### .storybook

- directory to house storybook.js related configuration files

#### src

##### src/components

- housing for components utilized in the application that are *smaller* than a page.
- ideally when creating a new component, the dir will have the following file structure.
  - index.ts *used to export all exposable modules from dir*
  - component.tsx *implementation for component logic*
  - styles.tsx *view layer of component, used in component.tsx*
  - types.ts *component prop types*
  - component.stories.tsx *storybook file for mocking up component states*
  - component.test.tsx *snapshot and unit tests*

##### src/contexts

- stateful providers are housed in this directory
- this application makes *liberal* use of the react context api, we fucking love it.
- Context provides (so far)
  - theme to all components in tree
  - breakpoint data to all components in tree

##### src/exceptions

- custom exceptions that could be thrown in the service of our application.

##### src/hooks

- custom hooks built over the react-* apis, for ease of use for common behavior in components
  
##### src/pages

- the view layer of the application
- nextjs apps allow use a filebased routing system, matching pathnames after host `/` to filenames in `/pages`
- nextjs allows you to subnest the pages folder to `src/pages` as a declarative choice to keep all source code files in `src`
- the path determines the application file used to render the view, in our case we have a route `s/one` which maps to `https://${hosting_url}/s/one`
- pages in nextjs have access to some really cool things, like MVC on ketamine, where you can leverage functions that run on the server environment before the page is rendered to the client. These functions have access to the request, response, and server context, and can pass props directly to the page level component. We take *strong* advantage of these utilities in our application, and have established a react-query prefetching pattern to load asynchronous data thats external to the application on the server and dehydrate the response of such queries into a ReactQuery context that's then hydrated on the client with the data necessary for the application to run, reducing the number of network calls occurring after 
  
### Docker and THE COUCH GAG WEBSITE

plcaeholder text

### Addendum and Related Material, Common Resources

- color palette generator <https://colors.muz.li/palette/92B4A7/667e79/b492af/7e667a/b4ac92>
- github repo <https://github.com/nicholasgalante1997/couch-gag>
