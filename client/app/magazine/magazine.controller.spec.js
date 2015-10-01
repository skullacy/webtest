'use strict';

describe('Controller: MagazineCtrl', function () {

  // load the controller's module
  beforeEach(module('mydearnest'));

  var MagazineCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MagazineCtrl = $controller('MagazineCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
