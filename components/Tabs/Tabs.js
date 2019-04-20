class Tabs {
  constructor(links) {
    this.tabLinks = Array.from(links).map(link => new TabLink(link));
    this.bindEventListeners();
  }

  bindEventListeners() {
    this.tabLinks.forEach(tabLink => {
      tabLink.element.addEventListener('click', () => {  
        this.currentTabNum  = tabLink.select();
        this.deselectRemainingTabs();
      });
    });
  }

  deselectRemainingTabs() {
    this.tabLinks.forEach(tabLink => {
      if(tabLink.data.tab !== this.currentTabNum) {
        tabLink.deselect();
      }
    });
  }
}

class TabLink {
  constructor(element) {
    // Assign this.element to the passed in DOM element
    this.element = element;
    
    // Get the custom data attribute on the Link
    this.data = this.element.dataset;
    
    // Using the custom data attribute get the associated Item element
    this.itemElement = document.querySelector(`.tabs-item[data-tab='${this.data.tab}']`);
    
    // Using the Item element, create a new instance of the TabItem class
    this.tabItem = new TabItem(this.itemElement);

    // Add a click event listener on this instance, calling the select method on click
    this.element.addEventListener('click', this.select.bind(this));

  };

  select() {
    // Add a class named "tabs-link-selected" to this link
    this.element.classList.add('tabs-link-selected');
    
    // Call the select method on the item associated with this link
    this.tabItem.select();

    return this.data.tab;
  }

  deselect() {
    // Add a class named "tabs-link-selected" to this link
    this.element.classList.remove('tabs-link-selected');
    
    // Call the select method on the item associated with this link
    this.tabItem.deselect();
  }
}

class TabItem {
  constructor(element) {
    // Assign this.element to the passed in element
    this.element = element;
  }

  select() {
    // Add a class named "tabs-item-selected" to this element
    this.element.classList.add('tabs-item-selected');
  }

  deselect() {
    this.element.classList.remove('tabs-item-selected');
  }
}

/* START HERE: 

- Select all classes named ".tabs-link" and assign that value to the links variable

- With your selection in place, now chain a .forEach() method onto the links variable to iterate over the DOM NodeList

- In your .forEach() method's callback function, return a new instance of TabLink and pass in each link as a parameter

*/

new Tabs(document.querySelectorAll('.tabs-link'));
