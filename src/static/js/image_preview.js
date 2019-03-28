$(function () {
    $('#profile-image').change(function (e) {
        let file = e.target.files[0];
        let reader = new FileReader();

        reader.onload = (function (file) {
            return function (e) {
                $('#preview').attr("src", e.target.result);
                $('#preview').attr("title", file.name);
            };
        })(file);
        reader.readAsDataURL(file);
    });
});