module Notes {

    class Category {
        public title: String = "";
    }

    class CategoriesController {
        public categories : Category[] = [];
        public newCategoryName = "";
        public isCreatingNewCategory = false;
        public selectedCategory: Category;

        public constructor() {
            let category = new Category();
            category.title = "Standardkategorie";
            this.categories.push(category);
            this.selectedCategory = this.categories[0];
        }

        public select(category: Category) {
            this.selectedCategory = category;
        }

        public delete(category: Category) {
            let index = this.categories.indexOf(category);
            this.categories.splice(index, 1);
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
            this.categories.push(category);
            this.cancel();
        }

    }

    angular.module("notes", [])
            .controller("CategoriesController", CategoriesController);



}
