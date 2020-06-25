class DOMHelper {
    static moveElement(elementId, destinationSelector) {
        const element = document.getElementById(elementId);
        const destinationElement = document.querySelector(destinationSelector);
        destinationElement.append(element);
    }
}

class ToolTip {}

class ProjectItem {
    constructor(id, switchProjectFunction, type) {
        this.id = id;
        this.switchProjectHandler = switchProjectFunction;
        this.connectMoreInfoButton();
        this.connectSwitchButton(type);
    }

    connectMoreInfoButton() {}

    connectSwitchButton(type) {
        const prjItemEl = document.getElementById(this.id);
        const switchBtn = prjItemEl.querySelector('button:last-child');
        switchBtn.textContent = type === 'active' ? 'Finished' : 'Active';
        switchBtn.addEventListener('click', this.switchProjectHandler.bind(null, this.id));
    }

    update(switchProjectFunction, type) {
        this.switchProjectHandler = switchProjectFunction;
        this.connectSwitchButton(type);
    }
}

class ProjectList {
    projects = [];

    constructor(type) {
        this.type = type;
        const prjItems = document.querySelectorAll(`#${type}-projects li`);
        for (const prjItem of prjItems) {
            this.projects.push(
                new ProjectItem(prjItem.id, this.switchProject.bind(this), this.type),
            );
        }
    }

    addProject(project) {
        this.projects.push(project);
        DOMHelper.moveElement(project.id, `#${this.type}-projects ul`);
        project.update(this.switchProject.bind(this), this.type);
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
