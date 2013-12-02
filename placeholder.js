app.directive('ngPlaceholder', function () {
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
                //     element.attr('placeholder', attrs.zbxPlaceholder);
                //     return {};
                // }

				element.parent().append('<label class="placeholder" ng-click="setFocusFor(\'' + attrs.ngModel + '\')">{{ placeholder' + attrs.ngModel + ' }}</label>');

                return function (scope) {

					function safeApply(scope, fn) {
						return (scope.$$phase || scope.$root.$$phase) ? fn() : scope.$apply(fn);
					}

					var input = angular.element('input[ng-model=' + attrs.ngModel + ']'),
						label = input.closest('div').find('label.placeholder');

					scope.setFocusFor = function (model) {
						angular.element('input[ng-model=' + model + ']').focus();
					};

					function adjustInput() {
						safeApply(scope, function () {
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
									if (attrs.zbxPlaceholderShort && attrs.zbxPlaceholderShort.length > 0) {
										label.html(attrs.zbxPlaceholderShort);
									} else {
										label.html(label.html().substring(0, label.html().indexOf(' ')));
									}
								}

								// divider was calculated empirically (YMMV) - TT :)
								var divider = 2;

								if (label.html().length <= 5) {
									divider = 1.7;
								}

								input.css('padding-right', label.html().length / divider + 'em');
							}

						});
					}

					safeApply(scope, function () {
						scope['placeholder' + attrs.ngModel] = attrs.zbxPlaceholder;
					});

					// In case the input have some default value
					scope.$watch('attrs.ngModel', function () {
						adjustInput();
					});

					input
						.on('keyup', function () {
							adjustInput();
						})
						.on('blur', function () {
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
