///<reference path="notes.controller.ts" />
///<reference path="notes.service.ts" />

module Notes {

    angular.module("notes.notes", [])
            .controller("NotesController", NotesController)
            .service("notesService", NotesService);

}
