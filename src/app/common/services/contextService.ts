module meshAdminUi {

    /**
     * The contextService allows app-wide communication of the current project & tag which is
     * being viewed by the user. The purpose is to facilitate context-aware searching and creation of objects.
     */
    export class ContextService {
        private currentProject = {name: '', id: ''};
        private currentNode = {name: '', id: ''};
        private contextChangeCallbacks = [];
        private queueCallback = false;
        
        /**
         * Allows components to register a callback when the context changes
         * @param {function()} callback
         */
        public registerContextChangeHandler(callback) {
            this.contextChangeCallbacks.push(callback);
        }

        /**
         * Set the current project and invoke any registered handlers
         * @param {string} name
         * @param {string} id
         */
        public setProject(name, id) {
            this.currentProject.name = name;
            this.currentProject.id = id;
            this.runContextChangeHandlers();
        }

        /**
         * Get the current project object.
         * @returns {{name: string, id: string}}
         */
        public getProject() {
            return this.currentProject;
        }

        public setParentNode(name, id) {
            this.currentNode.name = name;
            this.currentNode.id = id;
            this.runContextChangeHandlers();
        }

        public getParentNode() {
            return this.currentNode;
        }

        /**
         * Invoke any registered context change handlers and pass each one the
         * current project and tag objects.
         *
         * A timeout is used to ensure that the callbacks are only invoked once per
         * event loop. Thus, even if this runContextChangeHandlers() public is called
         * several times during the event loop, all those calls will only result in the
         * registered callbacks being invoked exactly once.
         */
        private runContextChangeHandlers() {
            if (!this.queueCallback) {
                this.queueCallback = true;

                setTimeout(() => {
                    this.contextChangeCallbacks.forEach(fn => fn.call(null, this.currentProject, this.currentNode));
                    this.queueCallback = false;
                }, 0);
            }
        }
    }
    
    angular.module('meshAdminUi.common')
            .service('contextService', ContextService);

}