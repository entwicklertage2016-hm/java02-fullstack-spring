module Notes {

    export class CategoriesService extends AbstractService {

        private $http: ng.IHttpService

        public constructor($http: ng.IHttpService) {
            super();
            this.$http = $http;
        }

        public get(): ng.IPromise<Category[]> {
            return this.$http.get("/api/categories").then((response: ng.IHttpPromiseCallbackArg<any>) => {
                return response.data._embedded.categories;
            })
        }

        public post(category: Category) {
            return this.$http.post("/api/categories", category).then((response: ng.IHttpPromiseCallbackArg<any>) => {
                return response.data;
            })
        }

        public delete(category: Category) {
            return this.$http.delete(this.getSelfLink(category));
        }

    }

}
