import { deleteTrip } from '../src/client/js/deleteTrip'

describe("Testing delete trip", () => {
    test("Testing the deleteTrip() function", () => {
        expect(deleteTrip).toBeDefined();
    })
});