app.directive('myPlaceholder', ['$timeout', function ($timeout) {
	'use strict';

        return {
		restrict: 'A',
		require: 'ngModel',
		// If using isolated scope when a sibling directive is used events will be fired into orphaned scope
		// (i.e. they will not propagate properly).
		// The real problem here is that this directive modifies DOM outside it's scope.
		//scope: {},
		compile: function (element, attrs) {
			
			element.parent().append('<label class="my-placeholder"></label>');

            		return function (scope) {

	    			function safeApply(scope, fn) {
	    				return (scope.$$phase || scope.$root.$$phase) ? fn() : scope.$apply(fn);
	    			}
	    
	    			var input = element,
	    			    label = input.closest('div').find('label.my-placeholder');
	
				function adjustInput() {
					safeApply(scope, function () {
						// --Use this if regular placeholder is used (except for IE9)
						// scope['placeholder' + attrs.ngModel] = (input.val() === '') ? attrs.ngPlaceholder : scope['placeholder' + attrs.ngModel] = '';
						// --else
						if (evt === undefined && input.val() === '') {
							label.removeClass('-selected');
	
							if (label.html() !== attrs.myPlaceholder) {
								label.html(attrs.myPlaceholder);
							}
	
						} else {
							if (!label.hasClass('-selected')) {
								label.addClass('-selected');
							}
	
							if (attrs.vnPlaceholderShort && attrs.vnPlaceholderShort.length > 0) {
								label.html(attrs.vnPlaceholderShort);
							}
	
							// --This is needed in case placeholder will slide to right side of the input ***** 
							// divider was calculated empirically (YMMV) - TT :)
							//var divider = 2;
	
							//if (label.html().length <= 5) {
							//	divider = 1.7;
							//}
	
							//input.css('padding-right', label.html().length / divider + 'em');
							// ********************************************************************************
						}
	
					});
				}
	
				safeApply(scope, function () {
					$timeout(function () {
						label.html(attrs.vnPlaceholder);
					}, 0);
				});
	
				// In case the input have some default value
				scope.$watch('attrs.ngModel', function () {
					adjustInput();
				});
				
				label
					.on('click', function () {
						input.focus();
					});
	
				input
					.on('focus keyup change', function (evt) {
						adjustInput(evt);
					})
					.on('blur', function () {
						if (input.val() === '') {
							label.removeClass('-selected');
	
							if (label.html() !== attrs.myPlaceholder) {
								label.html(attrs.myPlaceholder);
							}
						}
					});
	            	};
        	}
    	};
}]);
