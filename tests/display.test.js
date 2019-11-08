const assert = require("chai").assert;


describe("Display", function() {
    it("isOk", function() {
        assert.isOk(true);
    });

    it("isAbove", function() {
        assert.isAbove(1, 0);
    });
});
