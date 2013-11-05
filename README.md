angularjs-placeholder
=====================

Directive to fix IE9 issue not honoring HTML5 placeholder attribute. 
It will inject and overlay a div so this solution will work with password field too.

In addition extra functionality is desired the placeholder can be mimic 
(current revision is pushing the palceholder text to the right size of the field)


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
            /* set font size */
    }
    
    .placeholder.-selected {
		/* add transition */
		right: 10px;
		text-align: right;
		/* adjust font size */
	}
