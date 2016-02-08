module Notes {

    export abstract class AbstractService {
        public getSelfLink(entity: any) : string{
            return entity._links.self.href;
        }
    }

}
