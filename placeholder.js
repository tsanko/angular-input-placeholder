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
			// --Use this if regular placeholder is used (except for IE9)
	                // var i = document.createElement('input');
	                // if ('placeholder' in i) {
	                //     // yay! placeholder is supported - set it!
	                //     element.attr('placeholder', attrs.ngPlaceholder);
	                //     return {};
	                // }

			element.parent().append('<label class="my-placeholder" ng-click="setFocusFor(\'' + attrs.id + '\')"></label>');

            		return function (scope) {

    			function safeApply(scope, fn) {
    				return (scope.$$phase || scope.$root.$$phase) ? fn() : scope.$apply(fn);
    			}
    
    			var input = element,
    			    label = input.closest('div').find('label.my-placeholder');

			scope.setFocusFor = function (id) {
				angular.element(document.querySelector('#' + id)).focus();
			};

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

			input
				.on('focus keyup change', function (evt) {
					adjustInput(evt);
				})
				.on('blur', function () {
					// --Use this if regular placeholder is used (except for IE9)
					// if (input.val() === '') {
					//	scope.$apply(function () {
					//		scope['placeholder' + attrs.ngModel] = attrs.ngPlaceholder;
					//	});
					// }
					// --else
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
