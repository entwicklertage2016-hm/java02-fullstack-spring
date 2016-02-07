///<reference path="notes.controller.ts" />
///<reference path="notes.service.ts" />

module Notes {

    angular.module("notes.categories", [])
            .controller("CategoriesController", CategoriesController)
            .service("categoriesService", CategoriesService);

}
