module Notes {

    interface ITestInterface {
        someMethod(parameter: number);
    }

    export class Test implements ITestInterface {
		public property = true;

        public someMethod(parameter: number) {
            return parameter;
        }

        public constructor(aProperty: boolean) {
            this.property = aProperty;
        }
	}

    var testInstance = new Test(true);

}
