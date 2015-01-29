/**
 *
 *
 */
(function( $ ){
    $.fn.learnPlugin = function(options) {
        options = options || {};
        var on = options.on;
        var success = options.success || (function(){});
        var fail = options.fail || (function(){});
        var $input = this;

        function checkEmail($field){
            if($field.is("input,text")){
                var emailRegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
                return emailRegExp.test($field.val());
            }
            return false;
        }

        function applyUserCall($field) {
            if (checkEmail($field)) {
                success.call($field.get(0));
            } else {
                fail.call($field.get(0));
            }
        }
        if(typeof on === "string"){
            $input.bind(on,function(){
                applyUserCall($(this));
            });
            $input.each(function(){
               applyUserCall($(this));
            });
        }
        return checkEmail($input);
    }
})( jQuery );