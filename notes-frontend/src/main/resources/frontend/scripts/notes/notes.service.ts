/// <reference path="../entities/note.ts" />
/// <reference path="../common/abstract.service.ts" />

module Notes {

    export class NotesService extends AbstractService {

        private $http: ng.IHttpService

        public constructor($http: ng.IHttpService) {
            super();
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

        public findNotesByCategory(category: Category) {
            return this.$http.get("/api/notes/search/findByCategory?category=" + this.getSelfLink(category))
                                .then((response: ng.IHttpPromiseCallbackArg<any[]>) => {
                                    console.log(response);
                                    return response.data;
                                });
        }
    }

}
