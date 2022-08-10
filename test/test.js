// Copyright (c) 2016 Kazumasa Kohtaka <kkohtaka@gmail.com>, All right reserved.

(function () {
  var assert = require('chai').assert;
  describe('Array', function () {
    describe('#indexOf()', function () {
      it('should return -1 when the value is not present', function () {
        assert.equal(-1, [1, 2, 3].indexOf(0));
      });
    });
  });
}());
