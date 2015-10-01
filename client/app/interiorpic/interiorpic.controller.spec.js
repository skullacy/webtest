'use strict';

describe('Controller: InteriorpicCtrl', function () {

  // load the controller's module
  beforeEach(module('mydearnest'));

  var InteriorpicCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    InteriorpicCtrl = $controller('InteriorpicCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
