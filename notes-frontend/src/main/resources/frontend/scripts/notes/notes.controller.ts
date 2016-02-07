module Notes {

    export class NotesController {

        private notesService: NotesService;
        public notes: Note[] = [];
        public currentNote: Note;
        private saveCurrentItemTimeout: ng.IPromise<any>;
        private $interval: ng.IIntervalService;

        public constructor(notesService: NotesService, $interval: ng.IIntervalService, $scope: ng.IScope) {
            this.notesService = notesService;
            this.$interval = $interval;

            notesService.get().then((notes) => {
                this.notes = notes;
                this.currentNote = notes[0];
            })

            this.saveCurrentItemTimeout = $interval(() => this.onSaveInterval(), 500);
            $scope.$on('delete', () => this.onDelete());
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
