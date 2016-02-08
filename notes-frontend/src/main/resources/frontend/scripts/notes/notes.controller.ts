module Notes {

    export class NotesController {

        private notesService: NotesService;
        private $scope: ng.IScope;
        private selectedCategory: Category = null;
        public notes: Note[] = [];
        public currentNote: Note;
        private saveCurrentItemTimeout: ng.IPromise<any>;
        private $interval: ng.IIntervalService;

        public constructor(notesService: NotesService, $interval: ng.IIntervalService, $scope: ng.IScope) {
            this.notesService = notesService;
            this.$interval = $interval;
            this.$scope = $scope;

            $scope.$on("categories.selected", (event: ng.IAngularEvent, category: Category) => this.displayNotes(category));
            notesService.get().then((notes: Note[]) => {
                this.notes = notes;
            });

            this.saveCurrentItemTimeout = $interval(() => this.onSaveInterval(), 5000);
            $scope.$on('delete', () => this.onDelete());
        }

        public displayNotes(category: Category) {
            console.log("displayNotes", category)
            this.selectedCategory = category;
            this.notesService.findNotesByCategory(category).then((notes: Note[]) => {
                this.notes = notes;
            });
        }

        private onSaveInterval() {
            if (this.currentNote) {
                this.notesService.put(this.currentNote);
            }
        }

        private onDelete() {
            this.$interval.cancel(this.saveCurrentItemTimeout);
        }

        public selectNote(note: Note) {
            this.currentNote = note;
        }

        public delete(noteToDelete: Note) {
            this.notesService.delete(noteToDelete).then(() => {
                this.notes = this.notes.filter((note) => {
                    return note !== noteToDelete;
                });
                this.currentNote = this.notes[0];
            });
        }

        public create() {
            let newNote = new Note();
            newNote.category = this.notesService.getSelfLink(this.selectedCategory)
            this.notesService.post(newNote).then((note: Note) => {
                this.notes.push(note);
                this.currentNote = note;
            });
        }

    }

}
