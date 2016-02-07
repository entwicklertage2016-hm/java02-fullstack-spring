///<reference path="categories.controller.ts" />
///<reference path="categories.service.ts" />

module Notes {

    angular.module("notes.categories", [])
            .controller("CategoriesController", CategoriesController)
            .service("categoriesService", CategoriesService);

}
