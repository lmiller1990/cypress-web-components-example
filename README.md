See `mount.js` for a simple mount adapter for Web Components and `src/exmaple.cy.js` for the usage. 

When using a non first party framework, `cypress.config.js` looks like this:

```js
import { defineConfig } from "cypress";

export default defineConfig({
  component: {
    devServer: {
      bundler: "vite",
    },
  },
});
```

You just omit the `framework` key. You still need to specify your bundler.

Adatper:

```js
import { getContainerEl, setupHooks } from "@cypress/mount-utils";

function cleanup() {
  // runs after each test
}

export function mount(template, options = {}) {
  for (const [tag, comp] of Object.entries(options.components ?? {})) {
    customElements.define(tag, comp);
  }

  // get the root element to mount the component
  const root = getContainerEl();
  root.innerHTML = template;

  // adds output to the command log
  return cy.wait(0, { log: false }).then(() => {
    Cypress.log({
      name: "mount",
      message: "Mounted component",
    });
  });
}

setupHooks(cleanup);
```

Usage: 

```js
import { mount } from "@lmiller1990/cypress-web-component-example";
// import { mount } from "../mount";

class MyBox extends HTMLElement {
  constructor() {
    super();
    this.innerText = this.getAttribute('content')
  }
}

it("works", () => {
  mount(`<my-box content="Hello world!"></my-box>`, {
    components: {
      'my-box': MyBox
    }
  });
});
```

