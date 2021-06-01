import { saveTrip, editTrip } from '../src/client/js/saveAndEditTrip'

describe("Testing the ability to save or edit a trip", () => {
    test("Testing the saveTrip() function", () => {
        expect(saveTrip).toBeDefined();
    }),
    test("Testing the editTrip() function", () => {
        expect(editTrip).toBeDefined();
    })
});