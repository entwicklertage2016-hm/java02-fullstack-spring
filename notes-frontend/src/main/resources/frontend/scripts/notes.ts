/// <reference path="categories.ts" />

module Notes {

    class Note {
        public title: String;
        public content: String;
        public _links: any;
    }

    class NotesController {

        public selectedCategory: Category;
        public selectedNote: Note;
        public notes: Note[] = [];
        public $http: ng.IHttpService;

        public constructor($http: ng.IHttpService, $interval: ng.IIntervalService) {
            this.$http = $http;
            $http.get("/api/notes").then((response: ng.IHttpPromiseCallbackArg<any>) => {
                this.notes = response.data._embedded.notes;
                this.selectedNote = this.notes[0];
            });

            $interval(() => this.save(), 1000);
        }

        public create() {
            let note = new Note();
            this.$http.post("/api/notes", note).then((response: ng.IHttpPromiseCallbackArg<any>) => {
                console.log(response.data);
                this.notes.push(response.data);
            });
        }

        public select(note: Note) {
            this.selectedNote = note;
        }

        public delete(note: Note) {
            let index = this.notes.indexOf(note);
            this.notes.splice(index, 1);
        }

        public save() {
            this.$http.put(this.selectedNote._links.self.href, this.selectedNote);
        }

    }

    angular.module("notes.notes", [])
            .controller("NotesController", NotesController);

}
