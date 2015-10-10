'use strict';

/**
 * @description
 * Production 모드 개별설정
 * index.js 참조후, 개별설정이 필요한부분은 해당파일에서 추가설정한다.
 */
module.exports = {
	env: 'production',

	server: {
		api: 'api.ggumim.co.kr',
		image: 'image.ggumim.co.kr'
	}
};
