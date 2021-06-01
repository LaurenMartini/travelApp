import { downloadTrip } from '../src/client/js/downloadTrip'

describe("Testing the ability to print trip", () => {
    test("Testing the downloadTrip() function", () => {
        expect(downloadTrip).toBeDefined();
    })
});