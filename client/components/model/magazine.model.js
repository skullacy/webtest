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
			//console.log('oMagazine Constructor');
			//console.log(data);

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

			/**
			 * @ngdoc property
			 * @name da
			 * @type {boolean}
			 * @propertyOf oMagazine
			 * @description
			 * DA여부 판별 flag
			 */
			this.da = data.da;

			/**
			 * @ngdoc property
			 * @name da_idx
			 * @type {number}
			 * @propertyOf oMagazine
			 * @description
			 * DA로 등록된 경우 index number.
			 */
			this.da_idx = data.da_idx;

			/**
			 * @ngdoc property
			 * @name ref
			 * @type {string}
			 * @propertyOf oMagazine
			 * @description
			 * 출처
			 */
			this.ref = data.ref;

			/**
			 * @ngdoc property
			 * @name dwellings
			 * @type {Array}
			 * @propertyOf oMagazine
			 * @description
			 * 주거형태
			 */
			// TODO : 매거진 주거형태 데이터모델 미구현.
			this.dwellings = data.dwellings;

			/**
			 * @ngdoc property
			 * @name areas
			 * @type {Array}
			 * @propertyOf oMagazine
			 * @description
			 * 평수
			 */
			// TODO : 매거진 평수형태 데이터모델 미구현
			this.areas = data.areas;

			/**
			 * @ngdoc property
			 * @name pages
			 * @type {Array}
			 * @propertyOf oMagazine
			 * @description
			 * 매거진 페이지데이터
			 */
			// TODO: 매거진 페이지데이터 모델링 미구현.
			this.pages = data.pages;

			/**
			 * @ngdoc property
			 * @name order
			 * @type {number}
			 * @propertyOf oMagazine
			 * @description
			 * 매거진 정렬순서
			 */
			this.order = data.order;

			/**
			 * @ngdoc property
			 * @name expose
			 * @type {number}
			 * @propertyOf oMagazine
			 * @description
			 * 매거진 공개 단계설정.
			 *
			 * * 0 : 미공개
			 * * 1 : 어드민만 공개
			 * * 2 : 전체공개
			 */
			// TODO: 매거진 공개 단계설정 값 문서화 필요함.
			this.expose = data.expose;

			/**
			 * @ngdoc property
			 * @name push
			 * @type {boolean}
			 * @propertyOf oMagazine
			 * @description
			 * 푸시 여부판별.
			 */
			this.push = data.push;

			/**
			 * @ngdoc property
			 * @name count
			 * @type {Object}
			 * @propertyOf oMagazine
			 * @description
			 * 카운트 관련 수치 오브젝트
			 */
			// TODO : 카운터 관련 모델링 미구현됨.
			this.count = data.count;

			/**
			 * @ngdoc property
			 * @name liked
			 * @type {boolean}
			 * @propertyOf oMagazine
			 * @description
			 * 이부분은 요청자의 {@link oUser 유저}모델에 따라 동적인 프로퍼티이다.
			 * 해당 요청자가 좋아요를 했는지에 대한 여부를 판별.
			 */
			this.liked = data.liked;

			/**
			 * @ngdoc property
			 * @name published
			 * @type {date}
			 * @propertyOf oMagazine
			 * @description
			 * 해당 매거진을 공개로 설정한 일시
			 */
			this.published = data.published;

			/**
			 * @ngdoc property
			 * @name registered
			 * @type {date}
			 * @propertyOf oMagazine
			 * @description
			 * 해당 매거진을 처음으로 작성한 일시
			 */
			this.registered = data.registered;

			/**
			 * @ngdoc property
			 * @name updated
			 * @type {date}
			 * @propertyOf oMagazine
			 * @description
			 * 해당 매거진을 가장 최근에 수정한 일시.
			 */
			this.updated = data.updated;

			/**
			 * @ngdoc property
			 * @name deleted
			 * @type {date}
			 * @propertyOf oMagazine
			 * @description
			 * 해당 매거진을 삭제한 일시
			 */
			this.deleted = data.deleted;
		}

		/**
		 * Public method
		 * 프로토타입으로 선언
		 */
		//oMagazine.prototype.testFunction = function() {
		//	return this.testObject;
		//};

		/**
		 * private property
		 */
		//var privateProps = ['a', 'b', 'c'];

		/**
		 * Private function
		 */
		//function checkPrivateProps() {
		//	return 'hahahahaha';
		//}

		/**
		 * Static property
		 * copy함수를 사용하여 private변수의 수정을 막음
		 */
		//oMagazine.privateProps = angular.copy(privateProps);

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
