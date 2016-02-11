/// <reference path="../main/resources/frontend/scripts/file1.ts"/>

declare var it;
declare var describe;
declare var expect;

module Notes {

    it('should test property', () => {
        let a = new Test(true);
        expect(a.property).toBe(true);
    });

    it('should test someMethod with 3', () => {
        let a = new Test(true);
        expect(a.someMethod(3)).toBe(3);
    });

}
