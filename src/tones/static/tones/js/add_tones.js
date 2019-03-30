$(function() {
    $("#pedal-sortable").sortable({
        update: function () {
            var log = $(this).sortable("toArray");
            console.log(log);
        }
    }); 
    $("#pedal-sortable").disableSelection();
});