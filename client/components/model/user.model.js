'use strict';
/**
 * @ngdocs Object
 * @name oUser
 * @description
 * 유저 모델.
 */
angular.module('mydearnest')
	.run(['Restangular', 'oUser', function(RestangularProvider, oUser) {

		/**
		 * Response ElementTransformer 설정.
		 *
		 */
		//RestangularProvider.addElementTransformer('magazines', false, function(element) {
        //
		//	//console.log(element);
		//	return oMagazine.build(element);
		//	//return element;
		//});
	}])
	.factory("oUser", function() {

		/**
		 * Constructor
		 */
		function oUser() {
			this.testObject = 'i am user';
		}

		/**
		 * Public method
		 * 프로토타입으로 선언
		 */
		oUser.prototype.testFunction = function() {
			return this.testObject;
		};

		/**
		 * private property
		 */
		var privateProps = ['a', 'b', 'c'];

		/**
		 * Private function
		 */
		function checkPrivateProps() {
			return 'hahahahaha';
		}

		/**
		 * Static property
		 * copy함수를 사용하여 private변수의 수정을 막음
		 */
		oUser.privateProps = angular.copy(privateProps);

		/**
		 * Static methods
		 * 여기서 this키워드는 사용 불가능하다.
		 */
		oUser.build = function(data) {
			return new oUser();
		}

		/**
		 * oMagazine Constructor 리턴
		 */
		return oUser;
	});
