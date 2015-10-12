'use strict';

/**
 * @ngdocs Object
 * @name oImage
 * @requires MdnConfig
 * @requires MdnImageBuilder
 * @description
 * 이미지 모델.
 *
 * * API Wiki: {@link https://github.com/Osquare/Mydearnest-API/wiki/v1.7-Image#data_size API 이미지모델 명세}
 */
angular.module('mydearnest')
	.run(['Restangular', 'oImage', function(RestangularProvider, oImage) {

		/**
		 * Response ElementTransformer 설정.
		 */
		//RestangularProvider.addElementTransformer('magazines', false, function(element) {
		//});
	}])
	.factory("oImage",['MdnConfig', 'MdnImageBuilder', function(MdnConfig, MdnImageBuilder) {

		/**
		 * @constructor
		 */
		function oImage(data) {

			/**
			 * @ngdoc property
			 * @name img_id
			 * @type {Number}
			 * @propertyOf oImage
			 * @description
			 * 이미지 PK.
			 *
			 * @restriction not null
			 */
			this.img_id = data.img_id;

			/**
			 * @ngdoc property
			 * @name width
			 * @type {Number}
			 * @propertyOf oImage
			 * @description
			 * 이미지 Width
			 *
			 * @restriction not null, not 0
			 */
			this.width = data.width;

			/**
			 * @ngdoc property
			 * @name height
			 * @type {Number}
			 * @propertyOf oImage
			 * @description
			 * 이미지 Width
			 *
			 * @restriction not null, not 0
			 */
			this.height = data.height;

			/**
			 * @ngdoc property
			 * @name resizeWidth
			 * @type {number}
			 * @propertyOf oImage
			 * @description
			 * `API명세에 없는 property`
			 * 리사이즈 이미지 width
			 *
			 * getImageURL()을 통하여 이미지 url을 받을때 리사이즈 속성이 세팅된 값이 반영된다.
			 * `Default : 0`
			 */
			this.resizeWidth = 0;

			/**
			 * @ngdoc property
			 * @name resizeHeight
			 * @type {number}
			 * @propertyOf oImage
			 * @description
			 * `API명세에 없는 property`
			 * 리사이즈 이미지 height
			 *
			 * getImageURL()을 통하여 이미지 url을 받을때 리사이즈 속성이 세팅된 값이 반영된다.
			 * `Default : 0`
			 */
			this.resizeHeight = 0;
		}

		/**
		 * Public method
		 * 프로토타입으로 선언
		 */

		/**
		 * @ngdoc method
		 * @name getImageURL
		 * @methodOf oImage
		 * @returns {string} 이미지 URL (프로토콜 제외)
		 * @description
		 * 해당 이미지를 불러오기위한 url을 호출.
		 * {@link MdnImageBuilder MdnImageBuilder}를 이용하여 이미지 URL생성.
		 */
		oImage.prototype.getImageURL = function() {
			var builder = new MdnImageBuilder();
			if(this.resizeWidth > 0 || this.resizeHeight > 0) {
				builder.resize(this.resizeWidth, this.resizeHeight);
			}
			builder.setImagePath(this.img_id + '/' + this.img_id)
			return builder.buildUrl();
		};

		/**
		 * @ngdoc method
		 * @name setResizeWidth
		 * @methodOf oImage
		 * @param {number} width 이미지 가로
		 * @returns {oImage}
		 * @description
		 * getImageURL() 호출전 해당 메소드를 이용하여 리사이징될 이미지를 세팅할 수 있다.
		 *
		 * 자기자신을 리턴하므로 체인으로 연결하여 사용하면 편함
		 * <pre>
		 * image.setResizeWidth(100).getImageURL();
		 * image.setResizeWidth(150).setResizeHeight(150).getImageURL();
		 * </pre>
		 */
		oImage.prototype.setResizeWidth = function(width) {
			if(width >= 0) this.resizeWidth = Math.floor(width);
			return this;
		};

		/**
		 * @ngdoc method
		 * @name setResizeHeight
		 * @methodOf oImage
		 * @param {number} height 이미지 세로
		 * @returns {oImage}
		 * @description
		 * getImageURL() 호출전 해당 메소드를 이용하여 리사이징될 이미지를 세팅할 수 있다.
		 *
		 * 자기자신을 리턴하므로 체인으로 연결하여 사용하면 편함
		 * <pre>
		 * image.setResizeWidth(100).getImageURL();
		 * image.setResizeWidth(150).setResizeHeight(150).getImageURL();
		 * </pre>
		 */
		oImage.prototype.setResizeHeight = function(height) {
			if(height >= 0) this.resizeHeight = Math.floor(height);
			return this;
		};

		/**
		 * @ngdoc method
		 * @name validate
		 * @methodOf oImage
		 * @returns {boolean} validation결과
		 *
		 * @description
		 * 유효성 검증.
		 *
		 * * img_id는 무조건 존재해야하며, positive number(Integer) type이어야 한다.
		 * * width, height는 무조건 존재해야하며, number(Integer) type이어야 한다.
		 */
		oImage.prototype.validate = function() {
			//img_id validation
			if(Number.isInteger(this.img_id) === false) return false;
			if(this.img_id <= 0) return false;

			//width validation
			if(Number.isInteger(this.width) === false) return false;
			if(this.width <= 0) return false;

			//height validation
			if(Number.isInteger(this.height) === false) return false;
			if(this.height <= 0) return false;

			return true;
		};


		/**
		 * Static methods
		 * 여기서 this키워드는 사용 불가능하다.
		 */
		oImage.build = function(data) {
			return new oImage(data);
		};

		/**
		 * oImage Constructor 리턴
		 */
		return oImage;
	}]);
