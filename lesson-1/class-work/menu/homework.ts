interface IMenu {
  menu: IMyMenuItem[];
  generateMenu(list: IMyMenuItem[]): string;
  renderMenu(selector: string): void;
}
interface IMyMenuItem {
  title: string;
  items?: IMyMenuItem[];
}

const myMenuList: IMyMenuItem[] = [
  {
    items: [
      {
        items: [
          {
            items: [
              { title: "Большие" },
              { title: "Средние" },
              { title: "Маленькие" },
            ],
            title: "Коровы" },
          { title: "Ослы" },
          {
            items: [
              { title: "Злые" },
              { title: "Добрые" },
            ],
            title: "Собаки",
          },
          { title: "Тигры" },
        ],
        title: "Млекопитающие",
      },
      {
        items: [
          { title: "Змеи" },
          { title: "Птицы" },
          { title: "Ящерицы" },
        ],
        title: "Другие",
      },
    ],
    title: "Животные",
  },
  {
    items: [
      {
        items: [
          { title: "Гуппи" },
          { title: "Скалярии" },
        ],
        title: "Аквариумные",
      },
      {
        items: [
          { title: "Морская форель" },
        ],
        title: "Форель",
      },
    ],
    title: "Рыбы",
  },
];

class Menu implements IMenu {
  public menu: IMyMenuItem[];
  constructor(menu: IMyMenuItem[]) {
    this.menu = menu;
  }
  public generateMenu(list: IMyMenuItem[]): string {
    let content: string = `<ul>`;

    for (const item of list) {
      if (item.items) {
        content += `<li><a class='title'>${item.title}</a>`;
        content += this.generateMenu(item.items);
      } else {
        content += `<li><a>${item.title}</a>`;
      }
      content += `</li>`;
    }
    content += `</ul>`;

    return content;
  }
  public renderMenu(selector: string) {
    const navMyMenuList: HTMLDivElement | null = document.querySelector(selector);
    if (!navMyMenuList) {
      return;
    }

    navMyMenuList.innerHTML = this.generateMenu(this.menu);
    navMyMenuList.onclick = (event: MouseEvent) => {
      const el: HTMLAnchorElement = event.target as HTMLAnchorElement;
      const { classList } = el;
      if (!classList.contains("title")) {
        return;
      }
      const parentLi = el.parentNode as HTMLLIElement;
      parentLi.classList.toggle("menu-open");
    };
  }
}

const MyMenu = new Menu(myMenuList);

MyMenu.renderMenu(".menu.hw");
