$(function () {
    // Favorite
    $('.favorite-btn').click(function () {
        $fav_btn = $(this);
        $num_favs = $(this).siblings('.num_favs');
        $.ajax({
            url: $(this).attr("data-href"),
        }).then(
            // Success
            function (data) {
                console.log(data.command);
                if (data.command == "fav") {
                    $fav_btn.
                        removeClass('far').
                        addClass('fas')
                } else {
                    $fav_btn.
                        removeClass('fas').
                        addClass('far')
                }
                $num_favs.text(data.num_fav);
            },
            // Error
            function () {
                alert("ERROR");
            }
        );
    }
    )
});