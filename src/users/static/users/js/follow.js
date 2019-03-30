$(function () {
    // Follow
    $('.follow-btn').click(function () {
        $follow_btn = $(this);
        $.ajax({
            url: $(this).attr("data-href"),
        }).then(
            // Success
            function (data) {
                console.log(data.command);
                if (data.command == "follow") {
                    $follow_btn.
                    removeClass('btn-outline-primary follow-btn').
                    addClass('btn-outline-danger unfollow-btn').
                    text('Unfollow');
                } else {
                    $follow_btn.
                    removeClass('btn-outline-danger unfollow-btn').
                    addClass('btn-outline-primary follow-btn').
                    text('Follow');
                }
                console.log(data.message);
            },
            // Error
            function () {
                alert("ERROR");
            }
        )
    }
    )
});