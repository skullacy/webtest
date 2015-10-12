'use strict';

/**
 * @ngdocs Object
 * @name oImage
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
	.factory("oImage", function() {

		/**
		 * Constructor
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
		}

		/**
		 * Static methods
		 * 여기서 this키워드는 사용 불가능하다.
		 */
		oImage.build = function(data) {
			return new oImage(data);
		}

		/**
		 * oImage Constructor 리턴
		 */
		return oImage;
	});
