
$(window).on('load resize', function() {
	$('.skinTb-wrapper').on('scroll', function () {
		$(this).addClass('scroll');
	});
	$('.skinTb.width640').parent().addClass('width640');
	$('.skinTb.width768').parent().addClass('width768');
	$('.skinTb.width1000').parent().addClass('width1000');
});

function setPopup(popupList) {
	for (var i = 0; i < popupList.length; i++) {
		if (!$.cookie('popup_deny_'+popupList[i].popItemSeq)) {
			var title		= popupList[i].title;
			var top			= popupList[i].positiony;
			var left		= popupList[i].positionx;
			var width		= popupList[i].width;
			var height		= popupList[i].height;
			var type		= popupList[i].type;
			var url			= popupList[i].url;
			var popWindowType = popupList[i].popWindowType;

			if (top == 0 && left == 0) {
				top	= (screen.height - height) / 2;
				left = (screen.width	- width)	/ 2;
			}
			height = height + 36;
			
			// 윈도우 팝업
			if (popWindowType == 'Y') {
				window.open('/egf/bp/popup/article/view.do?popItemSeq=' + popupList[i].popItemSeq, title, 'width=' + width + ',height=' + height + ',top='	+ top + ',left=' + left);
			}
			// 레이어 팝업
			else if (popWindowType == 'N') {
				var style = 'position: absolute; top: ' + top + 'px; left : ' + left + 'px; z-index: 99999; width : ' + width + 'px; height : ' + height + 'px; background-color: white;';
				var popup = $('<iframe src="/egf/bp/popup/article/view.do?popItemSeq=' + popupList[i].popItemSeq +'" style="' + style + '" id="popup_frame_' + popupList[i].popItemSeq + '" title="' + title + '"></iframe>');
				$('body').append(popup);
			}
		}
	}
}

function popup(aTag) {
	var $aTag 	= $(aTag);
	var url		= $aTag.attr('href');
	var seq		= $aTag.data('seq');
	if (!url) {
		return;
	} else {
		url = '/egf/bp/popup-zone/article/view.do?popupZoneSeq=' + seq;
	}
	var top			= $aTag.data('top');
	var left		= $aTag.data('left');
	var width		= $aTag.data('width');
	var height		= $aTag.data('height');
	var target		= $aTag.attr('target');
	var condition 	= '';
	
	if (width > 0 && height > 0) {
		if (top == 0 && left == 0) {
			top	= (screen.height - height) / 2;
			left = (screen.width - width) / 2;
		}
		condition = 'width=' + width + ',height=' + height + ',top=' + top + ',left=' + left;
	}
	
	if (!condition) {
		window.open(url, target);
	} else {
		window.open(url, target, condition);
	}
}

try {
	$(document).ready(function() {
		$('.onlyNum').css('ime-mode', 'disabled');
		$('.onlyNum').on('keydown', function(evt) {
			var charCode = (evt.which) ? evt.which : evt.keyCode;
			if (charCode != 46 && charCode > 31
			 && (charCode < 48 || charCode > 57)
			 && (charCode < 96 || charCode > 105))
				return false;
			return true;
		});
	});
} catch (e) {
	alert("keydown event exception");
}

function checkPrivatePopup(){
	if (!$('#Private').is(':checked')) {
		alert('개인정보 수집 및 이용목적에 동의 해주세요.')
		return;
	}
	$('.Ftr').css({zIndex: 20});
	$('.contsArea').css({zIndex: 10});
	$('.bgCover').hide();
	$('.privateConfirm').hide();
}

function getStrWithoutTag(str) {
	if (str == null) {
		return str
	}

	return str.replace(/<[^>]*>/ig, "");
}

function onlyNumber(obj) {
    $(obj).keyup(function(){
         $(this).val($(this).val().replace(/[^0-9]/g,""));
    });
}

// csrf token - add by YJ.SON :: 2021-05-16
// var csrf_token = $("meta[name='_csrf']").attr("content");
// var csrf_token_header = $("meta[name='_csrf_header']").attr("content");

$(document).ready(function() {
	// page hit
	var pageUrl  = '<c:out value="${siteMenu.menuPath}"/>';
	var pageTitle = '<c:out value="${siteMenu.title}"/>';
	if ('<c:out value="${siteMenu.menuPath}" />') {
		$.ajax({
			type : 'POST'
			, url  : '/egf/insertPageHit'
			, data :{
				'pageUrl'  : pageUrl
				, 'pageTitle' : pageTitle
			}
			, dataType:'json'
			// , beforeSend : function (xhr) {
			//     // add csrf token - add by YJ.SON :: 2021-05-16
			//     xhr.setRequestHeader(csrf_token_header, csrf_token);
			// }
		});
	}
});

var initBody;
function beforePrint() {
	initBody = document.body.innerHTML;
	document.body.innerHTML = document.getElementById('content').outerHTML;
}

function afterPrint() {
	document.body.innerHTML = initBody;
}

// print
function fnPrint() {
	alert("크롬, 오페라 브라우저 사용 시 배경이 안나오는 경우, 인쇄창 컬러 항목 아래 +설정 더보기 > 배경 그래픽에 체크 후 다시 시도해주세요.");

	var inbody = document.body.innerHTML; // 이전 body 영역 저장

	window.onbeforeprint = beforePrint;
	window.onafterprint = afterPrint;
	window.print();
}

// sns 공유 (기능) - 2021-08-20 jylee
function fnShareSNS(sns){
	// 공유하는 페이지 <title> 태그 가져오기
	var strTitle = document.title;
	var strURL = window.location.href;

	var snsArray = new Array();
	// encodeURIComponent() : HTML 특수개체 문자 처리방식
	snsArray['twitter'] = "https://twitter.com/intent/tweet?text=" + encodeURIComponent(strTitle) + "&url=" + encodeURIComponent(strURL);
	snsArray['facebook'] = "http://www.facebook.com/share.php?u=" + encodeURIComponent(strURL);
	snsArray['kakao'] = "http://story.kakao.com/share?url=" + encodeURIComponent(strURL);
	snsArray['naver'] = "http://share.naver.com/web/shareView.nhn?url=" + encodeURIComponent(strURL) + "&title=" + encodeURIComponent(strTitle);
	// 새 창으로 snsArray 링크 열기
	window.open(snsArray[sns], "SNS 공유하기 새창", "width=800, height=700, toolbar=no, menubar=no, scrollbars=no, resizable=yes");
}

// start loading bar - add by YJ.SON :: 2021-07-08
function fnStartLoading() {
	$("body").append('<div class="loader-back"><div class="loader" id="div-main-loader"></div></div>');
}

// end loading bar - add by YJ.SON :: 2021-07-08
function fnEndLoading() {
	$(".loader-back").remove();
}

// form validate with document element id
function fnFormValidate(_id) {
	var error = false;
	var forms = document.querySelectorAll("#" + _id);
	$.each(forms[0], function(i, e) {
		if($(this).attr("required") !== undefined && $(this).attr("placeholder") !== undefined) {
			var value = $.trim($(this).val());
			var placeholder = $(this).attr("placeholder");

			// check field value
			if(value == "") {
				fnMessagePopup(placeholder);
				$(this).focus();
				error = true;
				return false;
			}

			// check for number
			if(value != "" && placeholder.indexOf("숫자") > 0) {
				if(!$.isNumeric($(this).val())) {
					fnMessagePopup("숫자만 가능합니다.");
					$(this).val("");
					$(this).focus();
					error = true;
					return false;
				}
			}
		}
	});

	return error;
}

function fnMessagePopup(message) {
	alert(message);
}
