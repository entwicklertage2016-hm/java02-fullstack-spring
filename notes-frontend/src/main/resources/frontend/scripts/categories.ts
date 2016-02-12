module Notes {

    export class Category {
        public title: String = "";
        public _links: any;
    }

    class CategoriesController {
        public categories : Category[] = [];
        public newCategoryName = "";
        public isCreatingNewCategory = false;
        public selectedCategory: Category;
        private $http: ng.IHttpService;
        private $rootScope;

        public constructor($http: ng.IHttpService, $rootScope: ng.IScope) {
            this.$rootScope = $rootScope;
            this.$http = $http;
            $http.get("/api/categories").then((response: ng.IHttpPromiseCallbackArg<any>) => {
                this.categories = response.data._embedded.categories;
                this.select(this.categories[0]);
            });
        }

        public select(category: Category) {
            this.selectedCategory = category;
            this.$rootScope.$broadcast("categories.selected", category);
        }

        public delete(category: Category) {
            this.$http.delete(category._links.self.href).then(() => {
                let index = this.categories.indexOf(category);
                this.categories.splice(index, 1);
            });
        }

        public cancel() {
            this.newCategoryName = "";
            this.isCreatingNewCategory = false;
        }

        public createNewCategory() {
            this.isCreatingNewCategory = true;
        }

        public saveNewCategory() {
            let category = new Category();
            category.title = this.newCategoryName;
            this.$http.post("/api/categories", category)
                    .then((response: ng.IHttpPromiseCallbackArg<any>) => {
                this.categories.push(response.data);
                this.cancel();
            });
        }

    }

    angular.module("notes.categories", [])
            .controller("CategoriesController", CategoriesController);



}
