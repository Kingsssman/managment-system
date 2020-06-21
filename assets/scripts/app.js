class ToolTip {}

class ProjectItem {
    constructor(id, switchProjectFunction) {
        this.id = id;
        this.switchProjectHandler = switchProjectFunction;
        this.connectMoreInfoButton();
        this.connectSwitchButton();
    }

    connectMoreInfoButton() {}

    connectSwitchButton() {
        const prjItemEl = document.getElementById(this.id);
        const switchBtn = prjItemEl.querySelector('button:last-child');
        switchBtn.addEventListener('click', this.switchProjectHandler.bind(null, this.id));
    }
}

class ProjectList {
    projects = [];

    constructor(type) {
        const prjItems = document.querySelectorAll(`#${type}-projects li`);
        for (const prjItem of prjItems) {
            this.projects.push(new ProjectItem(prjItem.id, this.switchProject.bind(this)));
        }
    }

    addProject(prjItem) {
        console.log(this);
        console.log(`Adding a new object`);
        console.log(PrjItem);
    }

    switchProject(prjId) {
        this.updateProjectsFunction(this.projects.find(p => p.id === prjId));
        this.projects = this.projects.filter(p => p.id !== prjId);
    }

    setUpdateProjectsFunction(updateProjectsFunction) {
        this.updateProjectsFunction = updateProjectsFunction;
    }
}

class App {
    static init() {
        const activeProjects = new ProjectList('active');
        const finishedProjects = new ProjectList('finished');
        activeProjects.setUpdateProjectsFunction(
            finishedProjects.addProject.bind(finishedProjects),
        );
        finishedProjects.setUpdateProjectsFunction(activeProjects.addProject.bind(activeProjects));
    }
}

App.init();
