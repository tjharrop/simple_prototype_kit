(function ( $ ) {
	$.fn.storeForm = function( options ) {
		var settings = $.extend({
		}, options );

		function on_change(event) {
			var input = $(event.target);
			var key = input.parents('form:first').attr('name');
			var data = JSON.parse(localStorage[key]);

			if(input.attr('type') == 'radio' || input.attr('type') == 'checkbox') {
				data[input.attr('name')] = input.attr("data-storage");
			}else if(input.attr('type') == 'file') {
				var value = input.val();
				//alert(value);
				var arr = value.split('\\').pop();
				data[input.attr('name')] = arr;
			}else {
				data[input.attr('name')] = input.val();
			}

			localStorage[key] = JSON.stringify(data);
		}

		return this.each(function() {
			var element = $(this);

			if(typeof(Storage)!=="undefined"){
				var key = element.attr('name');

				var data = false;
				if(localStorage[key]) {
					data = JSON.parse(localStorage[key]);
				}

				if(!data) {
					localStorage[key] = JSON.stringify({});
					data = JSON.parse(localStorage[key]);
				}
				element.find('input, select, textarea').change(on_change);

				element.find('input, select').each(function(){
					if($(this).attr('type') != 'submit') {
						var input = $(this);
						var inputid = $(this).attr('id');
						var value = data[input.attr('name')];
						if(input.attr('type') == 'radio' || input.attr('type') == 'checkbox') {
							if(value==input.attr('data-storage')) {
								$('#'+inputid).attr('checked', input.is(':checked')).attr('class',  'radio-checked');
								$('#'+inputid).attr('checked', true);
								console.log('check #' + inputid);
							} else {
								input.removeAttr('checked');
								console.log('uncheck #' + inputid);
							}
						} else if(input.attr('type') == 'file') {
							//you cant set a file field value
						} else {
							input.val(value);
						}
					}
				});

				element.find('.playback-cell').each(function(){
					var input = $(this);
					var value = data[input.attr('data-playback')];
					input.html(value);
				});

			}
			else {
				alert('local storage is not available');
			}
		});
	};


	$.fn.getForm = function( options ) {
		var settings = $.extend({
		}, options );

		return this.each(function() {
			var element = $(this);

			if(typeof(Storage)!=="undefined"){
				var key = element.attr('name');

				var data = false;
				if(localStorage[key]) {
					data = JSON.parse(localStorage[key]);
				}

				if(!data) {
					localStorage[key] = JSON.stringify({});
					data = JSON.parse(localStorage[key]);
				}

				element.find('.playback-cell').each(function(){
					var input = $(this);
					var value = data[input.attr('data-playback')];
					input.html(value);
				});

			}
			else {
				alert('local storage is not available');
			}
		});
	};
}( jQuery ))
