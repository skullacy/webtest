'use strict';

describe('Model: oAuthor', function () {

	var $httpBackend;

	// 모듈 로드
	beforeEach(module('mydearnest'));

	// 디펜던시 로드
	beforeEach(inject(function(_$httpBackend_) {
		$httpBackend = _$httpBackend_;
	}));

	// TODO #1: 모델 정의확인
	it('정의되어 있다.', inject(function (oAuthor) {
		expect(oAuthor).toBeDefined();
	}));

	// TODO #2: 각 필드별 Validation
	it('usr_id, nickname을 무조건 가져야한다.', inject(function(oAuthor) {
		var author = oAuthor.build({
			usr_id: 151231,
			nickname: 'skullacy'
		});
		expect(author.validate()).toBe(true);

		var author1 = oAuthor.build({
			usr_id: 151231
		});
		expect(author1.validate()).toBe(false);

		var author2 = oAuthor.build({
			nickname: 'skullacy'
		});
		expect(author2.validate()).toBe(false);
	}));

	it('usr_id는 0보다 큰 정수여야만 한다.', inject(function(oAuthor) {
		var author1 = oAuthor.build({
			usr_id: 'asdfgqfsadf',
			nickname: 'skullacy'
		});
		expect(author1.validate()).toBe(false);

		var author2 = oAuthor.build({
			usr_id: -12741982,
			nickname: 'skullacy'
		});
		expect(author2.validate()).toBe(false);

		var author3 = oAuthor.build({
			usr_id: -2313.234,
			nickname: 'skullacy'
		});
		expect(author3.validate()).toBe(false);

		var author4 = oAuthor.build({
			usr_id: 0,
			nickname: 'skullacy'
		});
		expect(author4.validate()).toBe(false);
	}));

	// TODO : 닉네임 정책이 없기때문에, 닉네임 관련 테스트코드 들어가지 않음.
	//it('oAuthor에서 nickname은 65자 이하여야 한다.', inject(function(oImage) {
	//	var data = {
	//		img_id: 'asdf',
	//		width: 300,
	//		height: 400
	//	}
    //
	//	var image = oImage.build(data);
	//	expect(image.validate()).toBe(false);
	//}));

	it('profile_image_id는 비어있어도 되지만, 있을경우는 0보다 큰 정수여야만 한다.', inject(function(oAuthor) {
		var author1 = oAuthor.build({
			usr_id: 13151231,
			nickname: 'hahahahaha',
		});
		expect(author1.validate()).toBe(true);

		var author2 = oAuthor.build({
			usr_id: 13151231,
			nickname: 'hahahahaha',
			profile_img_id: 'safjsfsd'
		});
		expect(author2.validate()).toBe(false);

		var author3 = oAuthor.build({
			usr_id: 13151231,
			nickname: 'hahahahaha',
			profile_img_id: -12481
		});
		expect(author3.validate()).toBe(false);

		var author4 = oAuthor.build({
			usr_id: 13151231,
			nickname: 'hahahahaha',
			profile_img_id: 1.2
		});
		expect(author4.validate()).toBe(false);

		var author5 = oAuthor.build({
			usr_id: 13151231,
			nickname: 'hahahahaha',
			profile_img_id: 0
		});
		expect(author5.validate()).toBe(false);

	}));

	it('profile_image_id가 있을경우, 무조건 최우선적으로 imageserver주소를 리턴한다.', inject(function(oAuthor, MdnConfig) {
		var author1 = oAuthor.build({
			usr_id: 1251215611,
			nickname: 'aslgjasfasdfa',
			profile_img_id: 2311313
		});
		expect(author1.getImageURL()).toBe(MdnConfig.IMAGE_URL + '/unsafe/2311313/2311313');

		var author2 = oAuthor.build({
			usr_id: 1251215611,
			nickname: 'aslgjasfasdfa',
			profile_img_id: 2311313,
			profile_img_link: 'http://www.naver.com'
		});
		expect(author2.getImageURL()).toBe(MdnConfig.IMAGE_URL + '/unsafe/2311313/2311313');

		var author3 = oAuthor.build({
			usr_id: 1251215611,
			nickname: 'aslgjasfasdfa',
			profile_img_link: 'http://www.naver.com'
		});
		expect(author3.getImageURL()).toBe('http://www.naver.com');

	}));
});
