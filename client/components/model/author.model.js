'use strict';
/**
 * @ngdocs Object
 * @name oAuthor
 * @description
 * 프로필 모델.
 *
 * `게시글의 작성자`와 같은 json response의 `author`프로퍼티에 주로 날라오는 데이터이다.
 * {@link oUser 유저}모델과 다르게 해당모델은 프로필이미지를 불러오는 것이 주된 목적이다.
 *
 * * API Wiki: {@link https://github.com/Osquare/Mydearnest-API/wiki/v1.7-User#data_profile API 프로필모델 명세}
 */
angular.module('mydearnest')
	.run(['Restangular', 'oAuthor', function(RestangularProvider, oAuthor) {

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
	.factory("oAuthor", function() {

		/**
		 * Constructor
		 */
		function oAuthor(data) {

			/**
			 * @ngdoc property
			 * @name usr_id
			 * @type {long}
			 * @propertyOf oAuthor
			 * @description
			 * 유저 PK
			 *
			 * @restriction notnull
			 */
			this.usr_id = data.usr_id;

			/**
			 * @ngdoc property
			 * @name nickname
			 * @type {string}
			 * @propertyOf oMagazine
			 * @description
			 * 작성자 닉네임
			 */
			this.nickname = data.nickname;

			/**
			 * @ngdoc property
			 * @name profile_img_id
			 * @type {long}
			 * @propertyOf oMagazine
			 * @description
			 * 프로필 이미지 일련번호
			 */
			this.profile_img_id = data.profile_img_id;

			/**
			 * @ngdoc property
			 * @name profile_img_link
			 * @type {string}
			 * @propertyOf oMagazine
			 * @description
			 * 소셜 (Kakao, Facebook etc)등을 통해 가입했을경우 `가입했을 당시`의 프로필이미지 링크주소.
			 */
			this.profile_img_link = data.profile_img_link;

		}

		/**
		 * Public method
		 * 프로토타입으로 선언
		 */
		oAuthor.prototype.testFunction = function() {
			return this.testObject;
		};

		/**
		 * Static methods
		 * 여기서 this키워드는 사용 불가능하다.
		 */
		oAuthor.build = function(data) {
			return new oAuthor(data);
		}

		/**
		 * oAuthor Constructor 리턴
		 */
		return oAuthor;
	});
