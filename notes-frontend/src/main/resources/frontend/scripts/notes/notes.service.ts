/// <reference path="../entities/note.ts" />

module Notes {

    export class NotesService {

        private $http: ng.IHttpService

        public constructor($http: ng.IHttpService) {
            this.$http = $http;
        }

        public get(): ng.IPromise<Note[]> {
            return this.$http.get("/api/notes").then((response: ng.IHttpPromiseCallbackArg<any>) => {
                return response.data._embedded.notes;
            })
        }

        public post(note: Note): ng.IPromise<Note> {
            return this.$http.post("/api/notes", note).then((response: ng.IHttpPromiseCallbackArg<any>) => {
                return angular.extend(new Note(), response.data);
            });
        }

        public put(note: Note): ng.IPromise<Note> {
            return this.$http.put(this.getSelfLink(note), note);
        }

        public delete(note: Note): ng.IPromise<any> {
            return this.$http.delete(this.getSelfLink(note));
        }

        private getSelfLink(note: Note) : string{
            return note._links.self.href;
        }
    }

}
