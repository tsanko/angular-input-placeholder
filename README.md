angularjs-placeholder
=====================

Directive to fix IE9 issue not honoring HTML5 placeholder attribute. It will inject 


USAGE:
<div class="row" >
  <input ng-model="username" type="text"
         placeholder="Username" 
         ng-placeholder 
         required />
</div>

CSS:
.row {
    position: relative;
    ...
}

.placeholder {
        position: absolute;
        top: XXpx;  /* depends on input height */
        left: XXpx; /* depends on input padding */
}
