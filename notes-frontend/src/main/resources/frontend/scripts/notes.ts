/// <reference path="categories.ts" />

module Notes {

    class Note {
        public title: String;
        public content: String;
        public category: String;
        public _links: any;
    }

    class NotesController {

        public selectedCategory: Category;
        public selectedNote: Note;
        public notes: Note[] = [];
        public $http: ng.IHttpService;

        public constructor($http: ng.IHttpService, $interval: ng.IIntervalService,
                            $rootScope: ng.IScope) {

            $rootScope.$on("categories.selected", (event, category: Category) => {
                this.selectedCategory = category;
                this.reloadNotes();
            })
            this.$http = $http;

            $interval(() => this.save(), 1000);
        }

        public reloadNotes() {
            var config = {
                params: {
                    category: this.selectedCategory._links.self.href
                }
            };
            this.$http.get("/api/notes/search/findByCategory", config)
                    .then((response: ng.IHttpPromiseCallbackArg<any>) => {
                this.notes = response.data._embedded.notes;
                this.selectedNote = this.notes[0];
            });
        }

        public create() {
            let note = new Note();
            note.category = this.selectedCategory._links.self.href;
            this.$http.post("/api/notes", note).then((response: ng.IHttpPromiseCallbackArg<any>) => {
                console.log(response.data);
                this.notes.push(response.data);
            });
        }

        public select(note: Note) {
            this.selectedNote = note;
        }

        public delete(note: Note) {
            this.$http.delete(note._links.self.href).then(() => {
                let index = this.notes.indexOf(note);
                this.notes.splice(index, 1);
                this.selectedNote = this.notes[0];
            });
        }

        public save() {
            if (this.selectedNote) {
                this.$http.put(this.selectedNote._links.self.href, this.selectedNote);
            }
        }

    }

    angular.module("notes.notes", [])
            .controller("NotesController", NotesController);

}
