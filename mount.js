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
