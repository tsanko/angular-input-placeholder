angularjs-placeholder
=====================

Directive to fix IE9 issue not honoring HTML5 placeholder attribute. 
It will inject and overlay a div so this solution will work with password field too.


### USAGE

    <div class="row" ng-placeholder >
      <input ng-model="username" type="text"
             placeholder="Username" />
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
    }
