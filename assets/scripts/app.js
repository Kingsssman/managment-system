class ToolTip {}

class ProjectItem {
    constructor(id) {
        this.id = id;
        this.connectMoreInfoButton();
        this.connectSwitchButton();
    }

    connectMoreInfoButton() {}

    connectSwitchButton() {
        const prjItemEl = document.getElementById(this.id);
        const switchBtn = prjItemEl.querySelector('button:last-child');
        switchBtn.addEventListener(
            'click',
            /**
             * ! function
             */
        );
    }
}

class ProjectList {
    projects = [];

    constructor(type) {
        const prjItems = document.querySelectorAll(`#${type}-projects li`);
        for (const prjItem of prjItems) {
            this.projects.push(new ProjectItem(prjItem.id));
        }
    }

    addProject() {}

    switchProject() {}
}

class App {
    static init() {
        const activeProjects = new ProjectList('active');
        const finishedProjects = new ProjectList('finished');
    }
}

App.init();
