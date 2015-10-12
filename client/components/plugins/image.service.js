'use strict';
/**
 * @ngdocs service
 * @name MdnImageBuilder
 * @requires CryptoJS
 * @requires MdnConfig
 * @description
 * {@link https://github.com/dcaramelo/ThumborUrlBuilder ThumborUrlBuilder}를
 * Clientside에서 작동하게끔 수정하고 (CryptoJS) *
 * angular.js내부에서 사용하기위한 서비스
 * * Reference: {@link http://thumbor.org/ Thumbor official}
 *
 * Builder Pattern을 따르므로 아래와 같이 사용.
 * <pre>
 *     var builder = MdnImageBuilder();
 *     builder.resize(100,100);
 *     builder.setImagePath('1251251/15123151');
 *     return builder.buildUrl();
 * </pre>
 */
angular.module('mydearnest')
  .service('MdnImageBuilder', ['CryptoJS', 'MdnConfig', function (CryptoJS, MdnConfig) {

		/**
		 * @constructor
		 */
        function MdnImageBuilder() {
            this.SECURITY_KEY = MdnConfig.IMAGE_SECRET_KEY;
            this.URL_SERVER = MdnConfig.IMAGE_URL;
            this.imagePath = '';
            this.width = 0;
            this.height = 0;
            this.smart = false;
            this.fitInFlag = false;
            this.withFlipHorizontally = false;
            this.withFlipVertically = false;
            this.halignValue = null;
            this.valignValue = null;
            this.cropValues = null;
            this.meta = false;
            this.filtersCalls = [];
        }

		MdnImageBuilder.prototype = {

            TOP: 'top',
            MIDDLE: 'middle',
            BOTTOM: 'bottom',

            RIGHT: 'right',
            CENTER: 'center',
            LEFT: 'left',

            /**
             * @ngdoc method
			 * @name setImagePath
			 * @methodOf MdnImageBuilder
             * @param {String} imagePath 이미지S3경로
			 * @description
			 * 각종 필터주소를 제외한 aws s3에 위치해있는 경로를 설정한다.
             */
            setImagePath: function(imagePath) {
                this.imagePath = (imagePath.charAt(0) === '/') ?
                    imagePath.substring(1, imagePath.length) : imagePath;
                return this;
            },

			/**
			 * @ngdoc method
			 * @methodOf MdnImageBuilder
			 * @name setS3ImagePath
			 * @param {number} image_id ImagePK
			 * @returns {MdnImageBuilder}
			 * @description
			 * AWS S3에 저장된 이미지를 쉽게 불러오기 위한 메소드.
			 * image_id -> image_id/image_id로 변경하여 세팅한다.
			 */
			setS3ImagePath: function(image_id) {
				return this.setImagePath(image_id + '/' + image_id)
			},

            /**
			 * @ngdoc method
			 * @name getOperationPath
			 * @methodOf MdnImageBuilder
             * @return {String}
			 * @description
			 * 각종 필터명령이 있는 Array를 String으로 전환해준다.
             */
            getOperationPath: function() {
                var parts = this.urlParts();

                if (0 === parts.length) {
                    return '';
                }

                return parts.join('/') + '/';
            },

            /**
			 * @ngdoc method
			 * @methodOf MdnImageBuilder
			 * @name urlParts
			 * @description
             * 필터명령 Array를 만든다.
             *
             * @TODO Should be refactored so that strings are generated in the
             * commands as opposed to in 1 massive function
             *
             * @return {Array}
             */
            urlParts: function() {
                if (!this.imagePath) {
                    throw new Error('The image url can\'t be null or empty.');
                }

                var parts = [];

                if (this.meta) {
                    parts.push('meta');
                }

                if (this.cropValues) {
                    parts.push(
                            this.cropValues.left +
                            'x' + this.cropValues.top +
                            ':' + this.cropValues.right +
                            'x' + this.cropValues.bottom
                    );
                }

                if (this.fitInFlag) {
                    parts.push('fit-in');
                }


                if (
                    this.width ||
                    this.height ||
                    this.withFlipHorizontally ||
                    this.withFlipVertically
                    ) {
                    var sizeString = '';

                    if (this.withFlipHorizontally) {
                        sizeString += '-';
                    }
                    sizeString += this.width;

                    sizeString += 'x';

                    if (this.withFlipVertically) {
                        sizeString += '-';
                    }
                    sizeString += this.height;

                    parts.push(sizeString);
                }

                if (this.halignValue) {
                    parts.push(this.halignValue);
                }

                if (this.valignValue) {
                    parts.push(this.valignValue);
                }

                if (this.smart) {
                    parts.push('smart');
                }

                if (this.filtersCalls.length) {
                    parts.push('filters:' + this.filtersCalls.join(':'));
                }

                return parts;
            },
            /**
			 * @ngdoc method
			 * @methodOf MdnImageBuilder
			 * @name resize
			 * @description
			 * 이미지 리사이징을 설정한다. 만약 이전에 `fitIn`, `resize` 메소드를 실행했다면 override된다.
             *
			 * 0을 넣을경우, 다른한쪽의 비율에 맞춘다.
			 *
             * @param  {number|String} width
             * @param  {number|String} height
             */
            resize: function(width, height) {
                this.width = width;
                this.height = height;
                return this;
            },

            /**
			 * @ngdoc method
			 * @methodOf MdnImageBuilder
			 * @name buildUrl
			 * @description
			 * 모든 설정을 조합한 후 이미지 url을 보낸다.
             * @return {String}
             */
            buildUrl: function() {
                var operation = this.getOperationPath();
                if (this.SECURITY_KEY) {

                    var hash = CryptoJS.HmacSHA1(operation + this.imagePath, this.SECURITY_KEY);
                    var key = hash.toString(CryptoJS.enc.Base64);
                    key = key.replace(/\+/g, '-').replace(/\//g, '_');

                    return this.URL_SERVER +
                        '/' + key +
                        '/' + operation +
                        this.imagePath;

                } else {
                    return this.URL_SERVER + '/unsafe/' + operation + this.imagePath;
                }
            }
        };

        return MdnImageBuilder;
  }]);
