'use strict';

describe('Model: oImage', function () {

	var $httpBackend;

	// 모듈 로드
	beforeEach(module('mydearnest'));

	// 디펜던시 로드
	beforeEach(inject(function(_$httpBackend_) {
		$httpBackend = _$httpBackend_;
	}));

	// TODO #1: 모델 정의확인
	it('oImage가 정의되어 있다.', inject(function (oImage) {
		expect(oImage).toBeDefined();
	}));

	// TODO #2: 각 필드별 Validation
	it('oImage는 img_id, width, height, resizeWidth, resizeHeight를 무조건 가져야한다.', inject(function(oImage) {
		var data = {
			img_id: 1234,
			width: 300,
			height: 400
		}

		var image = oImage.build(data);
		expect(image.img_id).toBe(data.img_id);
		expect(image.width).toBe(data.width);
		expect(image.height).toBe(data.height);
		expect(image.resizeWidth).toBe(0);
		expect(image.resizeHeight).toBe(0);
		expect(image.validate()).toBe(true);
	}));

	it('oImage.img_id가 없으면 object invalid error', inject(function(oImage) {
		var data = {
			//img_id: 1234,
			width: 300,
			height: 400
		}

		var image = oImage.build(data);
		expect(image.validate()).toBe(false);
	}));

	it('oImage.img_id가 문자열인 경우 object invalid error', inject(function(oImage) {
		var data = {
			img_id: 'asdf',
			width: 300,
			height: 400
		}

		var image = oImage.build(data);
		expect(image.validate()).toBe(false);
	}));

	it('oImage.width가 없으면 object invalid error', inject(function(oImage) {
		var data = {
			img_id: 1234,
			//width: 300,
			height: 400
		}

		var image = oImage.build(data);
		expect(image.validate()).toBe(false);
	}));

	it('oImage.width가 소수점인 경우, object invalid error', inject(function(oImage) {
		var data = {
			img_id: 1234,
			width: 300.5,
			height: 400
		}

		var image = oImage.build(data);
		expect(image.validate()).toBe(false);
	}));

	it('oImage.width가 문자열인 경우 object invalid error', inject(function(oImage) {
		var data = {
			img_id: 1234,
			width: 'asdf',
			height: 400
		}

		var image = oImage.build(data);
		expect(image.validate()).toBe(false);
	}));

	it('oImage.height가 없으면 object invalid error', inject(function(oImage) {
		var data = {
			img_id: 1234,
			width: 300,
			//height: 400
		}

		var image = oImage.build(data);
		expect(image.validate()).toBe(false);
	}));

	it('oImage.height가 소수점인 경우, object invalid error', inject(function(oImage) {
		var data = {
			img_id: 1234,
			width: 300,
			height: 400.5123
		}

		var image = oImage.build(data);
		expect(image.validate()).toBe(false);
	}));

	it('oImage.height가 문자열인 경우 object invalid error', inject(function(oImage) {
		var data = {
			img_id: 1234,
			width: 300,
			height: 'asdfas'
		}

		var image = oImage.build(data);
		expect(image.validate()).toBe(false);
	}));

	// TODO #3: 메소드 테스트
	it('setResizeWidth 메소드에 문자열이나 0이하의 자연수, 소수가 들어갈경우 내림', inject(function(oImage) {
		var data = {
			img_id: 1234,
			width: 300,
			height: 250
		}

		var image = oImage.build(data);

		image.setResizeWidth(120);
		expect(image.resizeWidth).toBe(120);

		image.setResizeWidth('hahaha');
		expect(image.resizeWidth).toBe(120);

		image.setResizeWidth(-1231);
		expect(image.resizeWidth).toBe(120);

		image.setResizeWidth(12.3456);
		expect(image.resizeWidth).toBe(12);
	}));

	it('setResizeHeight 메소드에 문자열이나 0이하의 자연수, 소수가 들어갈경우 내림', inject(function(oImage) {
		var data = {
			img_id: 1234,
			width: 300,
			height: 250
		}

		var image = oImage.build(data);

		image.setResizeHeight(120);
		expect(image.resizeHeight).toBe(120);

		image.setResizeHeight('hahaha');
		expect(image.resizeHeight).toBe(120);

		image.setResizeHeight(-1231);
		expect(image.resizeHeight).toBe(120);

		image.setResizeHeight(12.3456);
		expect(image.resizeHeight).toBe(12);
	}));
});
