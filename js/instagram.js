$(function () {
	var num_obj = '3';
	if (window.innerWidth < 400) {
		num_obj = '3';
    } else if (window.innerWidth > 400 && window.innerWidth < 600) {
		num_obj = '4'
    } else {
		num_obj = '5'
	}
	$.ajax({
		type: 'GET',
		url: 'https://graph.facebook.com/v6.0/17841460157634512?fields=name%2Cmedia.limit('+num_obj+')%7Bcaption%2Clike_count%2Cmedia_url%2Cpermalink%2Ctimestamp%2Cthumbnail_url%2Cmedia_type%2Cusername%7D&access_token=EACE2zPZAQ7lIBAJy7BynTi4Axv4dNAFcBlHBcHE1WCBvAxf9K3F2pqYUZBaLeJQJ9q5cysiXZBxSljD5O3HZCmZAq0Foxd5rj29IaMyQZCBUsaZAb8XNYyJQM5fuA7lMDNC6g6bSuVrfoAgI6m50SgzZCYZCl3jixMGSyz18PJjMW0sFWxO5NhaBZB9acOqJbZAUuIZD',
		dataType: 'json',
		success: function (json) {

			var html = '';
			var insta = json.media.data;
			for (var i = 0; i < insta.length; i++) {
				var media_type = insta[i].media_type;
				var options = { year: 'numeric', month: 'long', day: 'numeric' };
				var date = new Date(insta[i].timestamp);
				var dateString = new Intl.DateTimeFormat('ja-JP', options).format(date);
				if (insta[i].media_type == "IMAGE" || insta[i].media_type == "CAROUSEL_ALBUM") {
					html += '<li><a href="' + insta[i].permalink + '" target="_blank" rel="noopener noreferrer"><span class="square-content"><img src="' + insta[i].media_url + '"><dt>' + dateString + '</dt></span></a></li>';
				} else if (media_type == "VIDEO") {
					html += '<li><a href="' + insta[i].permalink + '" target="_blank" rel="noopener noreferrer"><span class="square-content"><img src="' + insta[i].thumbnail_url + '"><dt>' + dateString + '</dt></span></a></li>';
					var media_type = '';
				}
			}
			$(".insta_list").append(html);
		},
		error: function () {

			//エラー時の処理
		}
	});
});