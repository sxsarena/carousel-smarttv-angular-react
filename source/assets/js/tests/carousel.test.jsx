"use strict";

var ReactTestUtils;

describe("Carousel",function(){
  beforeEach(function() {
    ReactTestUtils = React.addons.ReactTestUtils;
  });

  it("renders", function () {
    var carousel = <Carousel />;
    var element = ReactTestUtils.renderIntoDocument(carousel);
    expect(element).toBeTruthy();
  });
});
