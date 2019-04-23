$(function () {
    // Follow
    $('.follow-btn').click(function () {
        $follow_btn = $(this);
        $num_follower = $(this).siblings('.num_follower');
        $.ajax({
            url: $(this).attr("data-href"),
        }).then(
            // Success
            function (data) {
                if (data.command == "follow") {
                    $follow_btn.
                        removeClass('btn-outline-primary follow-btn').
                        addClass('btn-outline-danger unfollow-btn').
                        text('フォロー解除');
                } else {
                    $follow_btn.
                        removeClass('btn-outline-danger unfollow-btn').
                        addClass('btn-outline-primary follow-btn').
                        text('フォロー');
                }
                $num_follower.text(data.num_follower);
            },
            // Error
            function () {
                alert("ERROR");
            }
        );
    }
    )
});