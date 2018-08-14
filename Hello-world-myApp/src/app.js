import { PLATFORM } from 'aurelia-framework';
import { Router } from 'aurelia-router';


export class App {

  constructor() {
    this.message = 'Hello World!';
  }

  configureRouter(config, router){
  	this.router = router;
  	config.title = 'My App';
  	config.map([
      { route: ["", "home"], name: "home", moduleId: PLATFORM.moduleName("page-home", "home"), nav: true, title: "Homepage" },
      /*{ route: "products", name: "products", moduleId: PLATFORM.moduleName("products", "products"), nav: true, title: "Products" },
      { route: "product/:product_id", name: "product", moduleId: PLATFORM.moduleName("product", "product"), nav: true, title: "Single Product" },*/
      { route: "contact", name: "contact", moduleId: PLATFORM.moduleName("page-contact", "contact"), nav: true, title: "Contact Us" }
    ]);

  	
  }
}
