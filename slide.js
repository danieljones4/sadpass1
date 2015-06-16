$(document).ready(function(){
    $(".boxes").mouseenter(function(){
        $(this).slideUp();
        alert("yahhh");
    });
    $(".boxes").mouseleave(function(){
        $(".foreground").slideDown();
        alert("yay");
    });

});