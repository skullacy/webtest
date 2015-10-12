'use strict';

/**
 * @ngdocs Object
 * @name oMagazine
 * @requires oAuthor
 * @requires oImage
 * @description
 * 매거진 모델.
 *
 * * API Wiki: {@link https://github.com/Osquare/Mydearnest-API/wiki/v1.7-Magazine#data API 매거진모델 명세}
 */
angular.module('mydearnest')
	.run(['Restangular', 'oMagazine', function(RestangularProvider, oMagazine) {

		/**
		 * Response ElementTransformer 설정.
		 */
		RestangularProvider.addElementTransformer('magazines', false, function(element) {
			return oMagazine.build(element);
		});
	}])
	.factory("oMagazine", function(oAuthor, oImage) {

		/**
		 * Constructor
		 */
		function oMagazine(data) {
			console.log('oMagazine Constructor');
			console.log(data);

			/**
			 * @ngdoc property
			 * @name mag_id
			 * @propertyOf oMagazine
			 * @description
			 * 매거진 PK
			 *
			 * @restriction notnull
			 */
			this.mag_id = data.mag_id;

			/**
			 * @ngdoc property
			 * @name author
			 * @type oAuthor
			 * @propertyOf oMagazine
			 * @description
			 * 작성자 정보
			 */
			this.author = oAuthor.build(data.author);

			/**
			 * @ngdoc property
			 * @name title
			 * @type {String}
			 * @propertyOf oMagazine
			 * @description
			 * 매거진 제목
			 */
			this.title = data.title;

			/**
			 * @ngdoc property
			 * @name title_img
			 * @type oImage
			 * @propertyOf oMagazine
			 * @description
			 * 매거진 제목 이미지 Object
			 */
			this.title_img = oImage.build(data.title_img);

			this.da = data.da;
			this.da_idx = data.da_idx;
			this.ref = data.ref;

			this.dwellings = data.dwellings;
			this.areas = data.areas;

			this.pages = data.pages;
			this.order = data.order;
			this.expose = data.expose;

			this.push = data.push;

			this.count = data.count;

			this.liked = data.liked;
			this.published = data.published;

			this.registered = data.registered;
			this.updated = data.updated;

			this.deleted = data.deleted;
		}

		/**
		 * Public method
		 * 프로토타입으로 선언
		 */
		oMagazine.prototype.testFunction = function() {
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
		oMagazine.privateProps = angular.copy(privateProps);

		/**
		 * Static methods
		 * 여기서 this키워드는 사용 불가능하다.
		 */
		oMagazine.build = function(data) {
			return new oMagazine(data);
		}

		/**
		 * oMagazine Constructor 리턴
		 */
		return oMagazine;
	});
