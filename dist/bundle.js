/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/components/base-components.ts":
/*!*******************************************!*\
  !*** ./src/components/base-components.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Component": () => (/* binding */ Component)
/* harmony export */ });
//Component Base Class
class Component {
    constructor(templateId, hostElementId, insertAtStart, newElementId) {
        this.templateElement = document.getElementById(templateId);
        this.hostElement = document.getElementById(hostElementId);
        const importedNode = document.importNode(this.templateElement.content, true);
        this.element = importedNode.firstElementChild;
        if (newElementId) {
            this.element.id = newElementId;
        }
        this.attach(insertAtStart);
    }
    attach(insertAtBeginning) {
        this.hostElement.insertAdjacentElement(insertAtBeginning ? "afterbegin" : "beforeend", this.element);
    }
}


/***/ }),

/***/ "./src/components/project-input.ts":
/*!*****************************************!*\
  !*** ./src/components/project-input.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ProjectInput": () => (/* binding */ ProjectInput)
/* harmony export */ });
/* harmony import */ var _base_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base-components */ "./src/components/base-components.ts");
/* harmony import */ var _util_validation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util/validation */ "./src/util/validation.ts");
/* harmony import */ var _decorators_autobind_decoration__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../decorators/autobind-decoration */ "./src/decorators/autobind-decoration.ts");
/* harmony import */ var _state_project_state__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../state/project-state */ "./src/state/project-state.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




//ProjectInput Class
class ProjectInput extends _base_components__WEBPACK_IMPORTED_MODULE_0__.Component {
    constructor() {
        super("project-input", "app", true, "user-input");
        this.titleInputElement = this.element.querySelector("#title");
        this.descriptionInputElement = this.element.querySelector("#description");
        this.peopleInputElement = this.element.querySelector("#people");
        this.configure();
    }
    configure() {
        this.element.addEventListener("submit", this.submitHandler.bind(this));
    }
    renderContent() { }
    ;
    gatherUserInput() {
        const enteredTitle = this.titleInputElement.value;
        const enteredDescription = this.descriptionInputElement.value;
        const enteredPeople = this.peopleInputElement.value;
        const titleValidatable = {
            value: enteredTitle,
            required: true
        };
        const descriptionValidatable = {
            value: enteredDescription,
            required: true,
            minLength: 5
        };
        const peopleValidatable = {
            value: enteredPeople,
            required: true,
            min: 1,
            max: 5
        };
        if (!(0,_util_validation__WEBPACK_IMPORTED_MODULE_1__.validate)(titleValidatable) ||
            !(0,_util_validation__WEBPACK_IMPORTED_MODULE_1__.validate)(descriptionValidatable) ||
            !(0,_util_validation__WEBPACK_IMPORTED_MODULE_1__.validate)(peopleValidatable)) {
            alert("Invalid input, please try again!");
            return;
        }
        else {
            return [enteredTitle, enteredDescription, +enteredPeople];
        }
    }
    clearInputs() {
        this.titleInputElement.value = "";
        this.descriptionInputElement.value = "";
        this.peopleInputElement.value = "";
    }
    submitHandler(event) {
        event.preventDefault();
        const userInput = this.gatherUserInput();
        if (Array.isArray(userInput)) {
            const [title, desc, people] = userInput;
            _state_project_state__WEBPACK_IMPORTED_MODULE_3__.projectState.addProject(title, desc, people);
            this.clearInputs();
        }
    }
}
__decorate([
    _decorators_autobind_decoration__WEBPACK_IMPORTED_MODULE_2__.autobind
], ProjectInput.prototype, "submitHandler", null);


/***/ }),

/***/ "./src/components/project-item.ts":
/*!****************************************!*\
  !*** ./src/components/project-item.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ProjectItem": () => (/* binding */ ProjectItem)
/* harmony export */ });
/* harmony import */ var _base_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base-components */ "./src/components/base-components.ts");
/* harmony import */ var _decorators_autobind_decoration__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../decorators/autobind-decoration */ "./src/decorators/autobind-decoration.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


//ProjectItem Class
class ProjectItem extends _base_components__WEBPACK_IMPORTED_MODULE_0__.Component {
    constructor(hostId, project) {
        super("single-project", hostId, false, project.id);
        this.project = project;
        this.configure();
        this.renderContent();
    }
    get persons() {
        if (this.project.people === 1) {
            return "1 person";
        }
        else {
            return `${this.project.people} persons`;
        }
    }
    dragStartHandler(event) {
        event.dataTransfer.setData("text/plain", this.project.id);
        event.dataTransfer.effectAllowed = "move";
    }
    dragEndHandler(_) {
        console.log("DragEnd");
    }
    configure() {
        this.element.addEventListener("dragstart", this.dragStartHandler);
        this.element.addEventListener("dragend", this.dragEndHandler);
    }
    renderContent() {
        this.element.querySelector("h2").textContent = this.project.title;
        this.element.querySelector("h3").textContent = this.persons + " assigned";
        this.element.querySelector("p").textContent = this.project.description;
    }
}
__decorate([
    _decorators_autobind_decoration__WEBPACK_IMPORTED_MODULE_1__.autobind
], ProjectItem.prototype, "dragStartHandler", null);


/***/ }),

/***/ "./src/components/project-list.ts":
/*!****************************************!*\
  !*** ./src/components/project-list.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ProjectList": () => (/* binding */ ProjectList)
/* harmony export */ });
/* harmony import */ var _models_project_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../models/project-model */ "./src/models/project-model.ts");
/* harmony import */ var _base_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./base-components */ "./src/components/base-components.ts");
/* harmony import */ var _decorators_autobind_decoration__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../decorators/autobind-decoration */ "./src/decorators/autobind-decoration.ts");
/* harmony import */ var _state_project_state__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../state/project-state */ "./src/state/project-state.ts");
/* harmony import */ var _project_item__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./project-item */ "./src/components/project-item.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





//ProjectList Class
class ProjectList extends _base_components__WEBPACK_IMPORTED_MODULE_1__.Component {
    constructor(type) {
        super("project-list", "app", false, `${type}-projects`);
        this.type = type;
        this.assignedProjects = [];
        this.configure();
        this.renderContent();
    }
    dragOverHandler(event) {
        if (event.dataTransfer && event.dataTransfer.types[0] === "text/plain") {
            event.preventDefault();
            const listEl = this.element.querySelector("ul");
            listEl.classList.add("droppable");
        }
    }
    dropHandler(event) {
        const prjId = event.dataTransfer.getData("text/plain");
        _state_project_state__WEBPACK_IMPORTED_MODULE_3__.projectState.moveProject(prjId, this.type === "active" ? _models_project_model__WEBPACK_IMPORTED_MODULE_0__.ProjectStatus.Active : _models_project_model__WEBPACK_IMPORTED_MODULE_0__.ProjectStatus.Finished);
    }
    dragLeaveHandler(_) {
        const listEl = this.element.querySelector("ul");
        listEl.classList.remove("droppable");
    }
    renderProjects() {
        const listEl = document.getElementById(`${this.type}-projects-list`);
        listEl.innerHTML = "";
        for (const prjItem of this.assignedProjects) {
            new _project_item__WEBPACK_IMPORTED_MODULE_4__.ProjectItem(this.element.querySelector("ul").id, prjItem);
        }
    }
    configure() {
        this.element.addEventListener("dragover", this.dragOverHandler);
        this.element.addEventListener("dragleave", this.dragLeaveHandler);
        this.element.addEventListener("drop", this.dropHandler);
        _state_project_state__WEBPACK_IMPORTED_MODULE_3__.projectState.addlistener((projects) => {
            const relevantProjects = projects.filter(prj => {
                if (this.type === "active") {
                    return prj.status === _models_project_model__WEBPACK_IMPORTED_MODULE_0__.ProjectStatus.Active;
                }
                return prj.status === _models_project_model__WEBPACK_IMPORTED_MODULE_0__.ProjectStatus.Finished;
            });
            this.assignedProjects = relevantProjects;
            this.renderProjects();
        });
    }
    ;
    renderContent() {
        const listId = `${this.type}-projects-list`;
        this.element.querySelector("ul").id = listId;
        this.element.querySelector("h2").textContent = this.type.toUpperCase() + " PROJECTS";
    }
}
__decorate([
    _decorators_autobind_decoration__WEBPACK_IMPORTED_MODULE_2__.autobind
], ProjectList.prototype, "dragOverHandler", null);
__decorate([
    _decorators_autobind_decoration__WEBPACK_IMPORTED_MODULE_2__.autobind
], ProjectList.prototype, "dropHandler", null);
__decorate([
    _decorators_autobind_decoration__WEBPACK_IMPORTED_MODULE_2__.autobind
], ProjectList.prototype, "dragLeaveHandler", null);


/***/ }),

/***/ "./src/decorators/autobind-decoration.ts":
/*!***********************************************!*\
  !*** ./src/decorators/autobind-decoration.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "autobind": () => (/* binding */ autobind)
/* harmony export */ });
//autobind decorator
function autobind(_, _2, descriptor) {
    const originalMethod = descriptor.value;
    const adjDescriptor = {
        configurable: true,
        get() {
            const boundFn = originalMethod.bind(this);
            return boundFn;
        }
    };
    return adjDescriptor;
}


/***/ }),

/***/ "./src/models/project-model.ts":
/*!*************************************!*\
  !*** ./src/models/project-model.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Project": () => (/* binding */ Project),
/* harmony export */   "ProjectStatus": () => (/* binding */ ProjectStatus)
/* harmony export */ });
//Project Type
var ProjectStatus;
(function (ProjectStatus) {
    ProjectStatus[ProjectStatus["Active"] = 0] = "Active";
    ProjectStatus[ProjectStatus["Finished"] = 1] = "Finished";
})(ProjectStatus || (ProjectStatus = {}));
class Project {
    constructor(id, title, description, people, status) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.people = people;
        this.status = status;
    }
}


/***/ }),

/***/ "./src/state/project-state.ts":
/*!************************************!*\
  !*** ./src/state/project-state.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ProjectState": () => (/* binding */ ProjectState),
/* harmony export */   "projectState": () => (/* binding */ projectState)
/* harmony export */ });
/* harmony import */ var _models_project_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../models/project-model */ "./src/models/project-model.ts");

class State {
    constructor() {
        this.listeners = [];
    }
    addlistener(listenerFn) {
        this.listeners.push(listenerFn);
    }
}
class ProjectState extends State {
    constructor() {
        super();
        this.projects = [];
    }
    static getInstance() {
        if (this.instance) {
            return this.instance;
        }
        this.instance = new ProjectState();
        return this.instance;
    }
    addProject(title, description, numOfPeople) {
        const newProject = new _models_project_model__WEBPACK_IMPORTED_MODULE_0__.Project(Math.random().toString(), title, description, numOfPeople, _models_project_model__WEBPACK_IMPORTED_MODULE_0__.ProjectStatus.Active);
        this.projects.push(newProject);
        this.updateListeners();
    }
    moveProject(projectId, newStatus) {
        const project = this.projects.find(prj => prj.id === projectId);
        if (project && project.status !== newStatus) {
            project.status = newStatus;
            this.updateListeners();
        }
    }
    updateListeners() {
        for (const listenerFn of this.listeners) {
            listenerFn(this.projects.slice());
        }
    }
}
const projectState = ProjectState.getInstance();


/***/ }),

/***/ "./src/util/validation.ts":
/*!********************************!*\
  !*** ./src/util/validation.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "validate": () => (/* binding */ validate)
/* harmony export */ });
function validate(validatableInput) {
    let isValid = true;
    if (validatableInput.required) {
        isValid = isValid && validatableInput.value.toString().trim().length !== 0;
    }
    if (validatableInput.minLength != null && typeof validatableInput.value === "string") {
        isValid = isValid && validatableInput.value.length >= validatableInput.minLength;
    }
    if (validatableInput.maxLength != null && typeof validatableInput.value === "string") {
        isValid = isValid && validatableInput.value.length <= validatableInput.maxLength;
    }
    if (validatableInput.min != null && typeof validatableInput.value === "number") {
        isValid = isValid && validatableInput.value >= validatableInput.min;
    }
    if (validatableInput.max != null && typeof validatableInput.value === "number") {
        isValid = isValid && validatableInput.value >= validatableInput.max;
    }
    return isValid;
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!********************!*\
  !*** ./src/app.ts ***!
  \********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_project_input__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/project-input */ "./src/components/project-input.ts");
/* harmony import */ var _components_project_list__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/project-list */ "./src/components/project-list.ts");


new _components_project_input__WEBPACK_IMPORTED_MODULE_0__.ProjectInput();
new _components_project_list__WEBPACK_IMPORTED_MODULE_1__.ProjectList("active");
new _components_project_list__WEBPACK_IMPORTED_MODULE_1__.ProjectList("finished");

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QVEsRUFBQztRQUN6RSxPQUFPLEdBQUMsT0FBTyxJQUFJLGdCQUFnQixDQUFDLEtBQUssSUFBRSxnQkFBZ0IsQ0FBQyxHQUFHLENBQUM7S0FDakU7SUFDRCxJQUFHLGdCQUFnQixDQUFDLEdBQUcsSUFBRyxJQUFJLElBQUksT0FBTyxnQkFBZ0IsQ0FBQyxLQUFLLEtBQUcsUUFBUSxFQUFDO1FBQ3pFLE9BQU8sR0FBQyxPQUFPLElBQUksZ0JBQWdCLENBQUMsS0FBSyxJQUFFLGdCQUFnQixDQUFDLEdBQUcsQ0FBQztLQUNqRTtJQUNELE9BQU8sT0FBTyxDQUFDO0FBQ2pCLENBQUM7Ozs7Ozs7VUM1QlA7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7QUNOeUQ7QUFDSDtBQUVwRCxJQUFJLG1FQUFZLEVBQUUsQ0FBQztBQUNuQixJQUFJLGlFQUFXLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDMUIsSUFBSSxpRUFBVyxDQUFDLFVBQVUsQ0FBQyxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vY3Vyc28tdHlwZXNjcmlwdC8uL3NyYy9jb21wb25lbnRzL2Jhc2UtY29tcG9uZW50cy50cyIsIndlYnBhY2s6Ly9jdXJzby10eXBlc2NyaXB0Ly4vc3JjL2NvbXBvbmVudHMvcHJvamVjdC1pbnB1dC50cyIsIndlYnBhY2s6Ly9jdXJzby10eXBlc2NyaXB0Ly4vc3JjL2NvbXBvbmVudHMvcHJvamVjdC1pdGVtLnRzIiwid2VicGFjazovL2N1cnNvLXR5cGVzY3JpcHQvLi9zcmMvY29tcG9uZW50cy9wcm9qZWN0LWxpc3QudHMiLCJ3ZWJwYWNrOi8vY3Vyc28tdHlwZXNjcmlwdC8uL3NyYy9kZWNvcmF0b3JzL2F1dG9iaW5kLWRlY29yYXRpb24udHMiLCJ3ZWJwYWNrOi8vY3Vyc28tdHlwZXNjcmlwdC8uL3NyYy9tb2RlbHMvcHJvamVjdC1tb2RlbC50cyIsIndlYnBhY2s6Ly9jdXJzby10eXBlc2NyaXB0Ly4vc3JjL3N0YXRlL3Byb2plY3Qtc3RhdGUudHMiLCJ3ZWJwYWNrOi8vY3Vyc28tdHlwZXNjcmlwdC8uL3NyYy91dGlsL3ZhbGlkYXRpb24udHMiLCJ3ZWJwYWNrOi8vY3Vyc28tdHlwZXNjcmlwdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9jdXJzby10eXBlc2NyaXB0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9jdXJzby10eXBlc2NyaXB0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vY3Vyc28tdHlwZXNjcmlwdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2N1cnNvLXR5cGVzY3JpcHQvLi9zcmMvYXBwLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vQ29tcG9uZW50IEJhc2UgQ2xhc3NcblxuICAgIGV4cG9ydCBhYnN0cmFjdCBjbGFzcyBDb21wb25lbnQ8VCBleHRlbmRzIEhUTUxFbGVtZW50LCBVIGV4dGVuZHMgSFRNTEVsZW1lbnQ+e1xuICAgICAgICB0ZW1wbGF0ZUVsZW1lbnQ6SFRNTFRlbXBsYXRlRWxlbWVudDtcbiAgICAgICAgaG9zdEVsZW1lbnQ6IFQ7XG4gICAgICAgIGVsZW1lbnQ6IFU7XG4gICAgICBcbiAgICAgICAgY29uc3RydWN0b3IodGVtcGxhdGVJZDogc3RyaW5nLCBob3N0RWxlbWVudElkOnN0cmluZyxpbnNlcnRBdFN0YXJ0OmJvb2xlYW4sIG5ld0VsZW1lbnRJZD86c3RyaW5nKXtcbiAgICAgICAgICB0aGlzLnRlbXBsYXRlRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFxuICAgICAgICAgICAgdGVtcGxhdGVJZFxuICAgICAgICAgICkhIGFzIEhUTUxUZW1wbGF0ZUVsZW1lbnQ7XG4gICAgICAgICAgdGhpcy5ob3N0RWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGhvc3RFbGVtZW50SWQpISBhcyBUO1xuICAgICAgXG4gICAgICAgICAgY29uc3QgaW1wb3J0ZWROb2RlID0gZG9jdW1lbnQuaW1wb3J0Tm9kZShcbiAgICAgICAgICAgIHRoaXMudGVtcGxhdGVFbGVtZW50LmNvbnRlbnQsXG4gICAgICAgICAgICB0cnVlXG4gICAgICAgICAgKTtcbiAgICAgICAgICB0aGlzLmVsZW1lbnQgPSBpbXBvcnRlZE5vZGUuZmlyc3RFbGVtZW50Q2hpbGQgYXMgVTtcbiAgICAgICAgICBpZihuZXdFbGVtZW50SWQpe1xuICAgICAgICAgICAgdGhpcy5lbGVtZW50LmlkPW5ld0VsZW1lbnRJZDtcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5hdHRhY2goaW5zZXJ0QXRTdGFydCk7XG4gICAgICAgIH1cbiAgICAgIFxuICAgICAgICBwcml2YXRlIGF0dGFjaChpbnNlcnRBdEJlZ2lubmluZzpib29sZWFuKXtcbiAgICAgICAgICB0aGlzLmhvc3RFbGVtZW50Lmluc2VydEFkamFjZW50RWxlbWVudChpbnNlcnRBdEJlZ2lubmluZyA/IFwiYWZ0ZXJiZWdpblwiIDogXCJiZWZvcmVlbmRcIiwgdGhpcy5lbGVtZW50KTtcbiAgICAgICAgfVxuICAgICAgXG4gICAgICAgIGFic3RyYWN0IGNvbmZpZ3VyZSgpOnZvaWQ7XG4gICAgICAgIGFic3RyYWN0IHJlbmRlckNvbnRlbnQoKTp2b2lkO1xuICAgICAgfVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSBcIi4vYmFzZS1jb21wb25lbnRzXCI7XG5pbXBvcnQge1ZhbGlkYXRhYmxlLCB2YWxpZGF0ZX0gZnJvbSBcIi4uL3V0aWwvdmFsaWRhdGlvblwiO1xuaW1wb3J0IHsgYXV0b2JpbmQgfSBmcm9tIFwiLi4vZGVjb3JhdG9ycy9hdXRvYmluZC1kZWNvcmF0aW9uXCI7XG5pbXBvcnQgeyBwcm9qZWN0U3RhdGUgfSBmcm9tIFwiLi4vc3RhdGUvcHJvamVjdC1zdGF0ZVwiO1xuXG4gICAgLy9Qcm9qZWN0SW5wdXQgQ2xhc3NcbiAgZXhwb3J0IGNsYXNzIFByb2plY3RJbnB1dCBleHRlbmRzIENvbXBvbmVudDxIVE1MRGl2RWxlbWVudCwgSFRNTEVsZW1lbnQ+e1xuICAgIHRpdGxlSW5wdXRFbGVtZW50OkhUTUxJbnB1dEVsZW1lbnQ7XG4gICAgZGVzY3JpcHRpb25JbnB1dEVsZW1lbnQ6SFRNTElucHV0RWxlbWVudDtcbiAgICBwZW9wbGVJbnB1dEVsZW1lbnQ6SFRNTElucHV0RWxlbWVudDtcbiAgICBcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgIHN1cGVyKFwicHJvamVjdC1pbnB1dFwiLCBcImFwcFwiLCB0cnVlLCBcInVzZXItaW5wdXRcIik7XG4gICAgICBcbiAgICAgIHRoaXMudGl0bGVJbnB1dEVsZW1lbnQ9dGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdGl0bGVcIikgYXMgSFRNTElucHV0RWxlbWVudDtcbiAgICAgIHRoaXMuZGVzY3JpcHRpb25JbnB1dEVsZW1lbnQ9dGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZGVzY3JpcHRpb25cIikgYXMgSFRNTElucHV0RWxlbWVudDtcbiAgICAgIHRoaXMucGVvcGxlSW5wdXRFbGVtZW50PXRoaXMuZWxlbWVudC5xdWVyeVNlbGVjdG9yKFwiI3Blb3BsZVwiKSBhcyBIVE1MSW5wdXRFbGVtZW50O1xuICAgICAgXG4gICAgICB0aGlzLmNvbmZpZ3VyZSgpO1xuICAgIH1cbiAgICBcbiAgICBjb25maWd1cmUoKXtcbiAgICAgIHRoaXMuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwic3VibWl0XCIsdGhpcy5zdWJtaXRIYW5kbGVyLmJpbmQodGhpcykpO1xuICAgIH1cbiAgXG4gICAgcmVuZGVyQ29udGVudCgpe307XG4gIFxuICAgIHByaXZhdGUgZ2F0aGVyVXNlcklucHV0KCk6W3N0cmluZyxzdHJpbmcsbnVtYmVyXXx2b2lke1xuICAgICAgY29uc3QgZW50ZXJlZFRpdGxlPXRoaXMudGl0bGVJbnB1dEVsZW1lbnQudmFsdWU7XG4gICAgICBjb25zdCBlbnRlcmVkRGVzY3JpcHRpb249dGhpcy5kZXNjcmlwdGlvbklucHV0RWxlbWVudC52YWx1ZTtcbiAgICAgIGNvbnN0IGVudGVyZWRQZW9wbGU9dGhpcy5wZW9wbGVJbnB1dEVsZW1lbnQudmFsdWU7XG4gIFxuICAgICAgY29uc3QgdGl0bGVWYWxpZGF0YWJsZTpWYWxpZGF0YWJsZT17XG4gICAgICAgIHZhbHVlOmVudGVyZWRUaXRsZSxcbiAgICAgICAgcmVxdWlyZWQ6dHJ1ZVxuICAgICAgfTtcbiAgICAgIGNvbnN0IGRlc2NyaXB0aW9uVmFsaWRhdGFibGU6VmFsaWRhdGFibGU9e1xuICAgICAgICB2YWx1ZTplbnRlcmVkRGVzY3JpcHRpb24sXG4gICAgICAgIHJlcXVpcmVkOnRydWUsXG4gICAgICAgIG1pbkxlbmd0aDo1XG4gICAgICB9O1xuICAgICAgY29uc3QgcGVvcGxlVmFsaWRhdGFibGU6VmFsaWRhdGFibGU9e1xuICAgICAgICB2YWx1ZTplbnRlcmVkUGVvcGxlLFxuICAgICAgICByZXF1aXJlZDp0cnVlLFxuICAgICAgICBtaW46MSxcbiAgICAgICAgbWF4OjVcbiAgICAgIH07XG4gIFxuICAgICAgaWYoXG4gICAgICAgICF2YWxpZGF0ZSh0aXRsZVZhbGlkYXRhYmxlKXx8XG4gICAgICAgICF2YWxpZGF0ZShkZXNjcmlwdGlvblZhbGlkYXRhYmxlKXx8XG4gICAgICAgICF2YWxpZGF0ZShwZW9wbGVWYWxpZGF0YWJsZSlcbiAgICAgICAgKXtcbiAgICAgICAgYWxlcnQoXCJJbnZhbGlkIGlucHV0LCBwbGVhc2UgdHJ5IGFnYWluIVwiKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfWVsc2V7XG4gICAgICAgIHJldHVybiBbZW50ZXJlZFRpdGxlLGVudGVyZWREZXNjcmlwdGlvbiwgK2VudGVyZWRQZW9wbGVdO1xuICAgICAgfVxuICAgIH1cbiAgXG4gIHByaXZhdGUgY2xlYXJJbnB1dHMoKXtcbiAgICB0aGlzLnRpdGxlSW5wdXRFbGVtZW50LnZhbHVlPVwiXCI7XG4gICAgdGhpcy5kZXNjcmlwdGlvbklucHV0RWxlbWVudC52YWx1ZT1cIlwiO1xuICAgIHRoaXMucGVvcGxlSW5wdXRFbGVtZW50LnZhbHVlPVwiXCI7XG4gIH1cbiAgXG4gICAgQGF1dG9iaW5kXG4gICAgcHJpdmF0ZSBzdWJtaXRIYW5kbGVyKGV2ZW50OkV2ZW50KXtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBjb25zdCB1c2VySW5wdXQ9dGhpcy5nYXRoZXJVc2VySW5wdXQoKTtcbiAgICAgIGlmIChBcnJheS5pc0FycmF5KHVzZXJJbnB1dCkpIHtcbiAgICAgICAgY29uc3RbdGl0bGUsZGVzYyxwZW9wbGVdPXVzZXJJbnB1dDtcbiAgICAgICAgcHJvamVjdFN0YXRlLmFkZFByb2plY3QodGl0bGUsZGVzYyxwZW9wbGUpO1xuICAgICAgICB0aGlzLmNsZWFySW5wdXRzKCk7XG4gICAgICB9XG4gICAgfVxuICBcbiAgXG4gIH1cbiIsImltcG9ydCB7IERyYWdnYWJsZSB9IGZyb20gXCIuLi9tb2RlbHMvZHJhZy1kcm9wLWludGVyZmFjZXNcIjtcbmltcG9ydCB7IFByb2plY3QgfSBmcm9tIFwiLi4vbW9kZWxzL3Byb2plY3QtbW9kZWxcIjtcbmltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gXCIuL2Jhc2UtY29tcG9uZW50c1wiO1xuaW1wb3J0IHsgYXV0b2JpbmQgfSBmcm9tIFwiLi4vZGVjb3JhdG9ycy9hdXRvYmluZC1kZWNvcmF0aW9uXCI7ICBcblxuICAvL1Byb2plY3RJdGVtIENsYXNzXG4gIFxuICBleHBvcnQgY2xhc3MgUHJvamVjdEl0ZW0gZXh0ZW5kcyBDb21wb25lbnQ8SFRNTFVMaXN0RWxlbWVudCxIVE1MTElFbGVtZW50PmltcGxlbWVudHMgRHJhZ2dhYmxle1xuICAgIHByaXZhdGUgcHJvamVjdDpQcm9qZWN0O1xuICBcbiAgICBnZXQgcGVyc29ucygpe1xuICAgICAgaWYgKHRoaXMucHJvamVjdC5wZW9wbGU9PT0xKSB7XG4gICAgICAgIHJldHVybiBcIjEgcGVyc29uXCI7XG4gICAgICB9XG4gICAgICBlbHNle1xuICAgICAgICByZXR1cm4gYCR7dGhpcy5wcm9qZWN0LnBlb3BsZX0gcGVyc29uc2A7XG4gICAgICB9XG4gICAgfVxuICAgIFxuICAgIGNvbnN0cnVjdG9yKGhvc3RJZDpzdHJpbmcsIHByb2plY3Q6UHJvamVjdCApe1xuICAgICAgc3VwZXIoXCJzaW5nbGUtcHJvamVjdFwiLGhvc3RJZCxmYWxzZSxwcm9qZWN0LmlkKTtcbiAgICAgIHRoaXMucHJvamVjdD1wcm9qZWN0O1xuICBcbiAgICAgIHRoaXMuY29uZmlndXJlKCk7XG4gICAgICB0aGlzLnJlbmRlckNvbnRlbnQoKTtcbiAgICB9XG4gIFxuICAgIEBhdXRvYmluZFxuICAgIGRyYWdTdGFydEhhbmRsZXIoZXZlbnQ6IERyYWdFdmVudCl7XG4gICAgICBldmVudC5kYXRhVHJhbnNmZXIhLnNldERhdGEoXCJ0ZXh0L3BsYWluXCIsdGhpcy5wcm9qZWN0LmlkKTtcbiAgICAgIGV2ZW50LmRhdGFUcmFuc2ZlciEuZWZmZWN0QWxsb3dlZD1cIm1vdmVcIjtcbiAgICB9XG4gIFxuICAgIGRyYWdFbmRIYW5kbGVyKF86IERyYWdFdmVudCk6IHZvaWQge1xuICAgICAgY29uc29sZS5sb2coXCJEcmFnRW5kXCIpO1xuICAgIH1cbiAgXG4gICAgY29uZmlndXJlKCl7XG4gICAgICB0aGlzLmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImRyYWdzdGFydFwiLHRoaXMuZHJhZ1N0YXJ0SGFuZGxlcik7XG4gICAgICB0aGlzLmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImRyYWdlbmRcIix0aGlzLmRyYWdFbmRIYW5kbGVyKTtcbiAgICB9XG4gIFxuICAgIHJlbmRlckNvbnRlbnQoKSB7XG4gICAgICB0aGlzLmVsZW1lbnQucXVlcnlTZWxlY3RvcihcImgyXCIpIS50ZXh0Q29udGVudD10aGlzLnByb2plY3QudGl0bGU7XG4gICAgICB0aGlzLmVsZW1lbnQucXVlcnlTZWxlY3RvcihcImgzXCIpIS50ZXh0Q29udGVudD10aGlzLnBlcnNvbnMrXCIgYXNzaWduZWRcIjtcbiAgICAgIHRoaXMuZWxlbWVudC5xdWVyeVNlbGVjdG9yKFwicFwiKSEudGV4dENvbnRlbnQ9dGhpcy5wcm9qZWN0LmRlc2NyaXB0aW9uO1xuICAgIH1cbiAgfVxuIiwiaW1wb3J0IHsgRHJhZ1RhcmdldCB9IGZyb20gXCIuLi9tb2RlbHMvZHJhZy1kcm9wLWludGVyZmFjZXNcIjtcbmltcG9ydCB7IFByb2plY3QsIFByb2plY3RTdGF0dXMgfSBmcm9tIFwiLi4vbW9kZWxzL3Byb2plY3QtbW9kZWxcIjtcbmltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gXCIuL2Jhc2UtY29tcG9uZW50c1wiO1xuaW1wb3J0IHsgYXV0b2JpbmQgfSBmcm9tIFwiLi4vZGVjb3JhdG9ycy9hdXRvYmluZC1kZWNvcmF0aW9uXCI7XG5pbXBvcnQgeyBwcm9qZWN0U3RhdGUgfSBmcm9tIFwiLi4vc3RhdGUvcHJvamVjdC1zdGF0ZVwiO1xuaW1wb3J0IHsgUHJvamVjdEl0ZW0gfSBmcm9tIFwiLi9wcm9qZWN0LWl0ZW1cIjtcblxuICAgIC8vUHJvamVjdExpc3QgQ2xhc3NcbiAgZXhwb3J0IGNsYXNzIFByb2plY3RMaXN0IGV4dGVuZHMgQ29tcG9uZW50PEhUTUxEaXZFbGVtZW50LCBIVE1MRWxlbWVudD4gaW1wbGVtZW50cyBEcmFnVGFyZ2V0e1xuICAgIGFzc2lnbmVkUHJvamVjdHM6IFByb2plY3RbXTtcbiAgXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSB0eXBlOiBcImFjdGl2ZVwifFwiZmluaXNoZWRcIil7XG4gICAgICBzdXBlcihcInByb2plY3QtbGlzdFwiLFwiYXBwXCIsIGZhbHNlLCBgJHt0eXBlfS1wcm9qZWN0c2ApO1xuICAgICAgdGhpcy5hc3NpZ25lZFByb2plY3RzPVtdO1xuICAgICAgXG4gICAgICBcbiAgICAgIHRoaXMuY29uZmlndXJlKCk7XG4gICAgICB0aGlzLnJlbmRlckNvbnRlbnQoKTtcbiAgICB9XG4gIFxuICAgIEBhdXRvYmluZFxuICAgIGRyYWdPdmVySGFuZGxlcihldmVudDogRHJhZ0V2ZW50KTogdm9pZCB7XG4gICAgICBpZihldmVudC5kYXRhVHJhbnNmZXImJiBldmVudC5kYXRhVHJhbnNmZXIudHlwZXNbMF09PT1cInRleHQvcGxhaW5cIil7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGNvbnN0IGxpc3RFbD10aGlzLmVsZW1lbnQucXVlcnlTZWxlY3RvcihcInVsXCIpITtcbiAgICAgICAgbGlzdEVsLmNsYXNzTGlzdC5hZGQoXCJkcm9wcGFibGVcIik7XG4gICAgICB9XG4gICAgfVxuICBcbiAgICAgIEBhdXRvYmluZFxuICAgIGRyb3BIYW5kbGVyKGV2ZW50OiBEcmFnRXZlbnQpOiB2b2lkIHtcbiAgICAgIGNvbnN0IHByaklkPWV2ZW50LmRhdGFUcmFuc2ZlciEuZ2V0RGF0YShcInRleHQvcGxhaW5cIik7XG4gICAgICBwcm9qZWN0U3RhdGUubW92ZVByb2plY3QocHJqSWQsdGhpcy50eXBlPT09XCJhY3RpdmVcIj8gUHJvamVjdFN0YXR1cy5BY3RpdmUgOiBQcm9qZWN0U3RhdHVzLkZpbmlzaGVkKTtcbiAgICB9XG4gIFxuICAgIEBhdXRvYmluZFxuICAgIGRyYWdMZWF2ZUhhbmRsZXIoXzogRHJhZ0V2ZW50KTogdm9pZCB7XG4gICAgICBjb25zdCBsaXN0RWw9dGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCJ1bFwiKSE7XG4gICAgICBsaXN0RWwuY2xhc3NMaXN0LnJlbW92ZShcImRyb3BwYWJsZVwiKTtcbiAgICB9XG4gIFxuICAgIHByaXZhdGUgcmVuZGVyUHJvamVjdHMoKXtcbiAgICAgIGNvbnN0IGxpc3RFbD1kb2N1bWVudC5nZXRFbGVtZW50QnlJZChgJHt0aGlzLnR5cGV9LXByb2plY3RzLWxpc3RgKSEgYXMgSFRNTFVMaXN0RWxlbWVudDtcbiAgICAgIGxpc3RFbC5pbm5lckhUTUw9XCJcIjtcbiAgICAgIGZvciAoY29uc3QgcHJqSXRlbSBvZiB0aGlzLmFzc2lnbmVkUHJvamVjdHMpIHtcbiAgICAgICAgbmV3IFByb2plY3RJdGVtKHRoaXMuZWxlbWVudC5xdWVyeVNlbGVjdG9yKFwidWxcIikhLmlkLHByakl0ZW0pO1xuICAgICAgfVxuICAgIH1cbiAgXG4gICAgY29uZmlndXJlKCl7XG4gICAgICB0aGlzLmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImRyYWdvdmVyXCIsdGhpcy5kcmFnT3ZlckhhbmRsZXIpO1xuICAgICAgdGhpcy5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJkcmFnbGVhdmVcIix0aGlzLmRyYWdMZWF2ZUhhbmRsZXIpO1xuICAgICAgdGhpcy5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJkcm9wXCIsdGhpcy5kcm9wSGFuZGxlcik7XG4gIFxuICAgICAgcHJvamVjdFN0YXRlLmFkZGxpc3RlbmVyKChwcm9qZWN0czpQcm9qZWN0W10pPT57XG4gICAgICAgIGNvbnN0IHJlbGV2YW50UHJvamVjdHM9IHByb2plY3RzLmZpbHRlcihwcmo9PntcbiAgICAgICAgICBpZiAodGhpcy50eXBlPT09XCJhY3RpdmVcIikge1xuICAgICAgICAgICAgcmV0dXJuIHByai5zdGF0dXM9PT1Qcm9qZWN0U3RhdHVzLkFjdGl2ZTtcbiAgICAgICAgICB9IFxuICAgICAgICAgIHJldHVybiBwcmouc3RhdHVzPT09UHJvamVjdFN0YXR1cy5GaW5pc2hlZDtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuYXNzaWduZWRQcm9qZWN0cz1yZWxldmFudFByb2plY3RzO1xuICAgICAgICB0aGlzLnJlbmRlclByb2plY3RzKCk7XG4gICAgICB9KTtcbiAgICB9O1xuICAgIFxuICAgIHJlbmRlckNvbnRlbnQoKXtcbiAgICAgIGNvbnN0IGxpc3RJZD1gJHt0aGlzLnR5cGV9LXByb2plY3RzLWxpc3RgO1xuICAgICAgdGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCJ1bFwiKSEuaWQ9bGlzdElkO1xuICAgICAgdGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCJoMlwiKSEudGV4dENvbnRlbnQ9dGhpcy50eXBlLnRvVXBwZXJDYXNlKCkrXCIgUFJPSkVDVFNcIjtcbiAgXG4gICAgfVxuICB9XG4iLCIvL2F1dG9iaW5kIGRlY29yYXRvclxuXG4gICAgZXhwb3J0IGZ1bmN0aW9uIGF1dG9iaW5kKF86YW55LF8yOnN0cmluZyxkZXNjcmlwdG9yOlByb3BlcnR5RGVzY3JpcHRvcil7XG4gICAgICAgIGNvbnN0IG9yaWdpbmFsTWV0aG9kPWRlc2NyaXB0b3IudmFsdWU7XG4gICAgICAgIGNvbnN0IGFkakRlc2NyaXB0b3I6IFByb3BlcnR5RGVzY3JpcHRvcj17XG4gICAgICAgICAgY29uZmlndXJhYmxlOnRydWUsXG4gICAgICAgICAgZ2V0KCl7XG4gICAgICAgICAgICBjb25zdCBib3VuZEZuPW9yaWdpbmFsTWV0aG9kLmJpbmQodGhpcyk7XG4gICAgICAgICAgICByZXR1cm4gYm91bmRGbjtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBhZGpEZXNjcmlwdG9yO1xuICAgICAgfVxuIiwiLy9Qcm9qZWN0IFR5cGVcbiAgICBleHBvcnQgZW51bSBQcm9qZWN0U3RhdHVze0FjdGl2ZSxGaW5pc2hlZH1cbiAgICAgIFxuICAgIGV4cG9ydCBjbGFzcyBQcm9qZWN0e1xuICAgICAgY29uc3RydWN0b3IoXG4gICAgICAgIHB1YmxpYyBpZDpzdHJpbmcsXG4gICAgICAgIHB1YmxpYyB0aXRsZTpzdHJpbmcsIFxuICAgICAgICBwdWJsaWMgZGVzY3JpcHRpb246c3RyaW5nLCBcbiAgICAgICAgcHVibGljIHBlb3BsZTpudW1iZXIsXG4gICAgICAgIHB1YmxpYyBzdGF0dXM6UHJvamVjdFN0YXR1c1xuICAgICAgICApe31cbiAgICB9XG4iLCJpbXBvcnQge1Byb2plY3QsIFByb2plY3RTdGF0dXN9IGZyb20gXCIuLi9tb2RlbHMvcHJvamVjdC1tb2RlbFwiO1xuXG4vL1Byb2plY3QgU3RhdGUgTWFuYWdlbWVudFxuICAgIHR5cGUgTGlzdGVuZXIgPFQ+PSAoaXRlbXM6VFtdKT0+dm9pZDtcbiAgICAgIFxuICAgIGNsYXNzIFN0YXRlPFQ+e1xuICAgICAgcHJvdGVjdGVkIGxpc3RlbmVyczpMaXN0ZW5lcjxUPltdPVtdO1xuICAgICAgXG4gICAgICBhZGRsaXN0ZW5lcihsaXN0ZW5lckZuOkxpc3RlbmVyPFQ+KXtcbiAgICAgICAgdGhpcy5saXN0ZW5lcnMucHVzaChsaXN0ZW5lckZuKTtcbiAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgZXhwb3J0IGNsYXNzIFByb2plY3RTdGF0ZSBleHRlbmRzIFN0YXRlPFByb2plY3Q+e1xuICAgICAgcHJpdmF0ZSBwcm9qZWN0czpQcm9qZWN0W109W107XG4gICAgICBwcml2YXRlIHN0YXRpYyBpbnN0YW5jZTpQcm9qZWN0U3RhdGU7XG4gICAgXG4gICAgICBwcml2YXRlIGNvbnN0cnVjdG9yKCl7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICB9XG4gICAgXG4gICAgICBzdGF0aWMgZ2V0SW5zdGFuY2UoKXtcbiAgICAgICAgaWYgKHRoaXMuaW5zdGFuY2UpIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5pbnN0YW5jZTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmluc3RhbmNlPW5ldyBQcm9qZWN0U3RhdGUoKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuaW5zdGFuY2U7XG4gICAgICB9XG4gICAgXG4gICAgXG4gICAgICBhZGRQcm9qZWN0KHRpdGxlOnN0cmluZyxkZXNjcmlwdGlvbjpzdHJpbmcsbnVtT2ZQZW9wbGU6bnVtYmVyKXtcbiAgICAgICAgY29uc3QgbmV3UHJvamVjdD1uZXcgUHJvamVjdChNYXRoLnJhbmRvbSgpLnRvU3RyaW5nKCksdGl0bGUsZGVzY3JpcHRpb24sbnVtT2ZQZW9wbGUsUHJvamVjdFN0YXR1cy5BY3RpdmUpO1xuICAgICAgICB0aGlzLnByb2plY3RzLnB1c2gobmV3UHJvamVjdCk7XG4gICAgICAgIHRoaXMudXBkYXRlTGlzdGVuZXJzKCk7XG4gICAgICB9XG4gICAgXG4gICAgICBtb3ZlUHJvamVjdChwcm9qZWN0SWQ6c3RyaW5nLCBuZXdTdGF0dXM6UHJvamVjdFN0YXR1cyl7XG4gICAgICAgIGNvbnN0IHByb2plY3QgPSB0aGlzLnByb2plY3RzLmZpbmQocHJqPT4gcHJqLmlkPT09cHJvamVjdElkKTtcbiAgICAgICAgaWYgKHByb2plY3QgJiYgcHJvamVjdC5zdGF0dXMhPT1uZXdTdGF0dXMpIHtcbiAgICAgICAgICBwcm9qZWN0LnN0YXR1cz1uZXdTdGF0dXM7XG4gICAgICAgICAgdGhpcy51cGRhdGVMaXN0ZW5lcnMoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIFxuICAgICAgcHJpdmF0ZSB1cGRhdGVMaXN0ZW5lcnMoKXtcbiAgICAgICAgZm9yIChjb25zdCBsaXN0ZW5lckZuIG9mIHRoaXMubGlzdGVuZXJzKSB7XG4gICAgICAgICAgbGlzdGVuZXJGbih0aGlzLnByb2plY3RzLnNsaWNlKCkpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIFxuICAgIGV4cG9ydCBjb25zdCBwcm9qZWN0U3RhdGU9IFByb2plY3RTdGF0ZS5nZXRJbnN0YW5jZSgpO1xuXG4iLCIvL1ZhbGlkYXRpb25zXG4gICAgZXhwb3J0IGludGVyZmFjZSBWYWxpZGF0YWJsZXtcbiAgICAgICAgdmFsdWU6c3RyaW5nfG51bWJlcjtcbiAgICAgICAgcmVxdWlyZWQ/OmJvb2xlYW47XG4gICAgICAgIG1pbkxlbmd0aD86bnVtYmVyO1xuICAgICAgICBtYXhMZW5ndGg/Om51bWJlcjtcbiAgICAgICAgbWluPzpudW1iZXI7XG4gICAgICAgIG1heD86bnVtYmVyO1xuICAgICAgfVxuICAgICAgXG4gICAgZXhwb3J0IGZ1bmN0aW9uIHZhbGlkYXRlKHZhbGlkYXRhYmxlSW5wdXQ6VmFsaWRhdGFibGUpe1xuICAgICAgICBsZXQgaXNWYWxpZD10cnVlO1xuICAgICAgICBpZiAodmFsaWRhdGFibGVJbnB1dC5yZXF1aXJlZCkge1xuICAgICAgICAgIGlzVmFsaWQgPSBpc1ZhbGlkICYmIHZhbGlkYXRhYmxlSW5wdXQudmFsdWUudG9TdHJpbmcoKS50cmltKCkubGVuZ3RoICE9PTA7ICAgXG4gICAgICAgIH1cbiAgICAgICAgaWYgKHZhbGlkYXRhYmxlSW5wdXQubWluTGVuZ3RoICE9IG51bGwgJiYgdHlwZW9mIHZhbGlkYXRhYmxlSW5wdXQudmFsdWUgPT09XCJzdHJpbmdcIikge1xuICAgICAgICAgIGlzVmFsaWQ9aXNWYWxpZCAmJiB2YWxpZGF0YWJsZUlucHV0LnZhbHVlLmxlbmd0aD49IHZhbGlkYXRhYmxlSW5wdXQubWluTGVuZ3RoO1xuICAgICAgICB9XG4gICAgICAgIGlmICh2YWxpZGF0YWJsZUlucHV0Lm1heExlbmd0aCAhPSBudWxsICYmIHR5cGVvZiB2YWxpZGF0YWJsZUlucHV0LnZhbHVlID09PVwic3RyaW5nXCIpIHtcbiAgICAgICAgICBpc1ZhbGlkPWlzVmFsaWQgJiYgdmFsaWRhdGFibGVJbnB1dC52YWx1ZS5sZW5ndGg8PSB2YWxpZGF0YWJsZUlucHV0Lm1heExlbmd0aDtcbiAgICAgICAgfVxuICAgICAgICBpZih2YWxpZGF0YWJsZUlucHV0Lm1pbiE9IG51bGwgJiYgdHlwZW9mIHZhbGlkYXRhYmxlSW5wdXQudmFsdWU9PT1cIm51bWJlclwiKXtcbiAgICAgICAgICBpc1ZhbGlkPWlzVmFsaWQgJiYgdmFsaWRhdGFibGVJbnB1dC52YWx1ZT49dmFsaWRhdGFibGVJbnB1dC5taW47XG4gICAgICAgIH1cbiAgICAgICAgaWYodmFsaWRhdGFibGVJbnB1dC5tYXghPSBudWxsICYmIHR5cGVvZiB2YWxpZGF0YWJsZUlucHV0LnZhbHVlPT09XCJudW1iZXJcIil7XG4gICAgICAgICAgaXNWYWxpZD1pc1ZhbGlkICYmIHZhbGlkYXRhYmxlSW5wdXQudmFsdWU+PXZhbGlkYXRhYmxlSW5wdXQubWF4O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBpc1ZhbGlkO1xuICAgICAgfVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBQcm9qZWN0SW5wdXR9IGZyb20gXCIuL2NvbXBvbmVudHMvcHJvamVjdC1pbnB1dFwiO1xuaW1wb3J0IHtQcm9qZWN0TGlzdH0gZnJvbSBcIi4vY29tcG9uZW50cy9wcm9qZWN0LWxpc3RcIjtcblxuICBuZXcgUHJvamVjdElucHV0KCk7XG4gIG5ldyBQcm9qZWN0TGlzdChcImFjdGl2ZVwiKTtcbiAgbmV3IFByb2plY3RMaXN0KFwiZmluaXNoZWRcIik7XG5cbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==