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
