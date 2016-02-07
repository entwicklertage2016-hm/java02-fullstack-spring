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

            //this.$scope.$on("categories.selected", (event: ng.IAngularEvent, category: Category) => this.displayNotes(category));
            this.notesService.get().then((notes: Note[]) => {
                this.notes = notes;
            });

            this.saveCurrentItemTimeout = $interval(() => this.onSaveInterval(), 5000);
            $scope.$on('delete', () => this.onDelete());
        }

        public displayNotes(category: Category) {
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
            this.notesService.post(new Note()).then((note: Note) => {
                this.notes.push(note);
                this.currentNote = note;
            });
        }

    }

}
