app.directive('ngPlaceholder', function () {

    return {
        restrict: 'A',
        require: 'ngModel',
        // Don't isolate the scope as this directive modifies DOM outside the element's scope.
        //scope: {},
        compile: function (element, attrs) {
            
            // --Use this if regular placeholder is used (except for IE9)
			// var i = document.createElement('input');
			// if ('placeholder' in i) {
			//     // yay! placeholder is supported - set it!
			//     element.attr('placeholder', attrs.zbxPlaceholder);
			//     return {};
			// }
	
			element.parent().append('<label class="placeholder" ng-click="setFocusFor(\'' + attrs.ngModel + '\')">{{ placeholder' + attrs.ngModel + ' }}</label>');
	
	    	return function (scope) {
	
				scope.$apply(function () {
					scope['placeholder' + attrs.ngModel] = attrs.zbxPlaceholder;
				});
		
				var input = angular.element('input[ng-model=' + attrs.ngModel + ']'),
					label = input.closest('div').find('label.placeholder');
		
				scope.setFocusFor = function (model) {
					angular.element('input[ng-model=' + model + ']').focus();
				};
	
				input.on('keyup',function () {
					scope.$apply(function () {
						// --Use this if regular placeholder is used (except for IE9)
						// scope['placeholder' + attrs.ngModel] = (input.val() === '') ? attrs.zbxPlaceholder : scope['placeholder' + attrs.ngModel] = '';
						// --else
						if (input.val() === '') {
							label.removeClass('-selected');
	
							if (label.html() !== attrs.zbxPlaceholder) {
								label.html(attrs.zbxPlaceholder);
							}
	
						} else {
							label.addClass('-selected');
	
							if (label.html().length > 10) {
								label.html(label.html().substring(0, label.html().indexOf(' ')));
							}
	
							// divider was calculated empirically (YMMV) - TT :)
							var divider = 2;
	
							if (label.html().length <= 5) {
								divider = 1.7;
							}
	
							input.css('padding-right', label.html().length / divider + 'em');
						}
	
					});
	
				}).on('blur', function () {
					// --Use this if regular placeholder is used (except for IE9)
					// if (input.val() === '') {
					//	scope.$apply(function () {
					//		scope['placeholder' + attrs.ngModel] = attrs.zbxPlaceholder;
					//	});
					// }
					// --else
					if (input.val() === '') {
						label.removeClass('-selected');
	
						if (label.html() !== attrs.zbxPlaceholder) {
							label.html(attrs.zbxPlaceholder);
						}
					}
				});
	        };
        }
    };
});
