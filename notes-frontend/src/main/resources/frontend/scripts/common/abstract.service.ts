module Notes {

    export abstract class AbstractService {
        protected getSelfLink(entity: any) : string{
            return entity._links.self.href;
        }
    }

}
