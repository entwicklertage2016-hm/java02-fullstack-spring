module Notes {

    export class CategoriesController {

        private categoriesService: CategoriesService;
        private $scope: ng.IScope;
        public categories: Category[] = [];
        public selectedCategory: Category;

        public newCategory = new Category();
        public isCreatingNewCategory = false;

        public constructor(categoriesService: CategoriesService, $scope: ng.IScope) {
            this.$scope = $scope;
            this.categoriesService = categoriesService;

            categoriesService.get().then((categories: Category[]) => {
                this.categories = categories;
                this.select(categories[0]);
            });
        }

        public select(category: Category) {
            this.selectedCategory = category;
            this.$scope.$emit("categories.selected", category);
        }

        public createNew() {
            this.isCreatingNewCategory = true;
        }

        public saveNew() {
            this.categoriesService.post(this.newCategory).then((category: Category) => {
                this.categories.push(category);
                this.resetNew();
                this.select(category);
            });
        }

        public resetNew() {
            this.isCreatingNewCategory = false;
            this.newCategory = new Category();
        }

        public delete(categoryToDelete: Category) {
            this.categoriesService.delete(categoryToDelete).then(() => {
                this.categories = this.categories.filter((category) => category !== categoryToDelete);
                this.select(this.categories[0]);
            });
        }

    }

}
