angularjs-placeholder
=====================

AngularJS directive to make placeholder more flexible (will also fix IE9 not honoring HTML5 placeholder attribute). 
It will inject and overlay a label so this solution will work with password field too.

Extra functionality: Current revision is pushing the palceholder text to the right size of the field without hidding it.


### USAGE

    <div class="row" >
      <input ng-model="username" type="text"
             ng-placeholder="Username" />
    </div>

### CSS

    .row {
        position: relative;
        ...
    }
    
    .placeholder {
		position: absolute;
		color: #aaa; /* HTML5 placeholder color */
		top: XXpx;   /* depends on input height */
		left: XXpx;  /* depends on input padding */
		line-height: XXpx; /* depends on input's font size */
		cursor: text;
		/* set font size */
    }
    
    .placeholder.-selected {
		/* add transition */
		right: 10px;
		text-align: right;
		/* adjust font size */
	}
