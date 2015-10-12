'use strict';
/**
 * @ngdocs Object
 * @name oAuthor
 * @requires MdnImageBuilder
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
	.factory("oAuthor",['MdnImageBuilder', function(MdnImageBuilder) {

		/**
		 * @constructor
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
			 * @propertyOf oAuthor
			 * @description
			 * 작성자 닉네임
			 */
			this.nickname = data.nickname;

			/**
			 * @ngdoc property
			 * @name profile_img_id
			 * @type {long}
			 * @propertyOf oAuthor
			 * @description
			 * 프로필 이미지 일련번호
			 */
			this.profile_img_id = data.profile_img_id;

			/**
			 * @ngdoc property
			 * @name profile_img_link
			 * @type {string}
			 * @propertyOf oAuthor
			 * @description
			 * 소셜 (Kakao, Facebook etc)등을 통해 가입했을경우 `가입했을 당시`의 프로필이미지 링크주소.
			 */
			this.profile_img_link = data.profile_img_link;

		}

		/**
		 * Public method
		 * 프로토타입으로 선언
		 */

		/**
		 * @ngdoc method
		 * @methodOf oAuthor
		 * @name getImageURL
		 * @description
		 * 프로필 이미지의 http주소를 불러온다.
		 *
		 * 1. 서비스 내부에 업로드한 프로필이 있을경우 `최우선` 반환.
		 * 2. 소셜계정을 통해 가입하면서 가져온 프로필이 있고, 1번조건을 만족하지 않을경우만 반환.
		 *
		 * @returns {string}
		 */
		oAuthor.prototype.getImageURL = function() {
			var url = '';
			if(this.profile_img_id) {
				var builder = new MdnImageBuilder();
				builder.setS3ImagePath(this.profile_img_id);
				url = builder.buildUrl()
			} else if(this.profile_img_link) {
				url = this.profile_img_link;
			}
			return url;
		};

		/**
		 * @ngdoc method
		 * @methodOf oAuthor
		 * @name validate
		 * @description
		 * oAuthor 모델의 유효성 검증.
		 *
		 * * usr_id는 양의정수이며 `필수`.
		 * * nickname은 문자열이며 `필수`.
		 * * profile_img_id는 양의정수이며 `선택`.
		 * * profile_img_link는 문자열이며 `선택`.
		 *
		 * @returns {boolean}
		 */
		oAuthor.prototype.validate = function() {
			var usr_id_str = validator.toString(this.usr_id);
			if(!validator.isInt(usr_id_str, {min: 1})) return false;

			var nickname_str = validator.toString(this.nickname);
			if(validator.isNull(nickname_str)) return false;

			var profile_img_id_str = validator.toString(this.profile_img_id);
			if(!validator.isNull(profile_img_id_str) && !validator.isInt(profile_img_id_str, {min : 1})) return false;

			return true;
		}

		/**
		 * Static methods
		 * 여기서 this키워드는 사용 불가능하다.
		 */
		oAuthor.build = function(data) {
			return new oAuthor(data);
		};

		/**
		 * oAuthor Constructor 리턴
		 */
		return oAuthor;
	}]);
