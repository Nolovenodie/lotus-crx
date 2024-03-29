function selectWait(selector, func, times, interval) {
	var _times = times || -1, //100次
		_interval = interval || 20, //20毫秒每次
		_jquery = null,
		_iIntervalID;

	_iIntervalID = setInterval(() => {
		if (!_times) {
			clearInterval(_iIntervalID);
		}
		_times <= 0 || _times--;
		_jquery = $(selector);
		if (_jquery.length) {
			func && func.call(func);
			clearInterval(_iIntervalID);
		}
	}, _interval);
	return this;
}

function copyText(value, cb) {
	const textarea = document.createElement("textarea");
	textarea.readOnly = "readonly";
	textarea.style.position = "absolute";
	textarea.style.left = "-9999px";
	textarea.value = value;
	document.body.appendChild(textarea);
	textarea.select();
	textarea.setSelectionRange(0, textarea.value.length);
	document.execCommand("Copy");
	document.body.removeChild(textarea);
	if (cb && Object.prototype.toString.call(cb) === "[object Function]") {
		cb();
	}
}

function otherSellerJson(productId, itemId, selectedId, callback) {
	$.ajax({
		type: "GET",
		url: "https://www.coupang.com/vp/products/" + productId + "/other-seller-json?itemId=" + itemId + "&selectedId=" + selectedId,
		async: true,
		headers: { "content-type": "application/json;charset=UTF-8" },
		success: (data) => {
			if (data != "") {
				callback(true, data);
			} else {
				callback(false);
			}
		},
	});
}

function vendorItems(productId, vendoritemsId, callback) {
	$.ajax({
		type: "GET",
		url: "https://www.coupang.com/vp/products/" + productId + "/vendoritems/	" + vendoritemsId,
		async: true,
		headers: { "content-type": "application/json;charset=UTF-8" },
		success: (data) => {
			if (data != "") {
				callback(true, data);
			} else {
				callback(false);
			}
		},
	});
}

function getOrderInfo(orderId, callback) {
	try {
		$.ajax({
			type: "GET",
			url: "http://lotus.ssky.me/erp/order?id=" + orderId,
			async: true,
			success: (data) => {
				if (data != "") {
					data = jsonp(data);
					if (data.success) {
						callback(true, data);
						return;
					}
				}
				callback(false);
			},
			error: () => {
				callback(false);
			},
		});
	} catch (error) {
		callback(false);
	}
}

function setOrderInfo(orderId, data, callback) {
	try {
		$.ajax({
			type: "POST",
			url: "http://lotus.ssky.me/erp/order?id=" + orderId,
			data: data,
			async: true,
			success: (data) => {
				if (data != "") {
					data = jsonp(data);
					if (data.success) {
						callback(true, data);
						return;
					}
				}
				callback(false);
			},
			error: () => {
				callback(false);
			},
		});
	} catch (error) {
		callback(false);
	}
}

function jsonp(data) {
	data = data.replace("callback(", "");
	data = data.substr(0, data.length - 1);
	return JSON.parse(data);
}
