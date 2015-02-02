;(function( $ ){

    //function learnPlugin = 

    var defaults = {
        "errorMsg": "wrong email format",
        "successMsg": "correct email"
    };

    var learnPlugin = function(element,options){
        this.config = $.extend({},defaults,options);
        this.element = element;

        this.on = this.config.on;
        this.success = this.config.success || (function(){});
        this.fail = this.config.fail || (function(){});
        //this.input = this;
        this.init();
    };

    learnPlugin.prototype.init = function() {
        var _ = this;    
        if(typeof _.on === "string"){
            _.element.bind(_.on,function(){
                _.applyUserCall($(this));
            });
            _.element.each(function(){
               _.applyUserCall($(this));
            });
        }
        this.checkEmail(this.element); 
    };
    learnPlugin.prototype.applyUserCall = function ($field){
        if (this.checkEmail($field)) {
            this.success.call($field.get(0));
            this.element.parent().find("span").text(this.config.successMsg);
        } else {
            this.fail.call($field.get(0));
            this.element.parent().find("span").text(this.config.errorMsg);
        }
    };

    learnPlugin.prototype.checkEmail = function($field){
        if($field.is("input,text")){
            var emailRegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
            return emailRegExp.test($field.val());
        }
        return false;
    };

    $.fn.learnPlugin = function(options) {
        new learnPlugin(this.first(),options);
        return this.first();
    };
}( jQuery ));