import { cancelEditOrCreate } from '../src/client/js/cancelTrip'

describe("Testing edit or create cancel button", () => {
    test("Testing the cancelEditOrCreate() function", () => {
        expect(cancelEditOrCreate).toBeDefined();
    })
});