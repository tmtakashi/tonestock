$(function () {
    // 初期化
    let allPedalInfo = {
        'pedal1': {}
    };
    let numPedals = $("#pedal-sortable").children('li').length;　

    let order = ["pedal1"];

    // ペダル追加
    $("#add-pedal").click(function () {
        let newPedalNum = numPedals + 1;
        let newPedal = $("#pedal-template").html().replace(/__pedal_number__/g, newPedalNum);
        $("#pedal-sortable").append(newPedal);
        order.push(`pedal${newPedalNum}`);
        allPedalInfo[`pedal${newPedalNum}`] = {};
        numPedals = newPedalNum;
    });

    // ペダル削除
    $(document).on('click', ".remove-pedal", function () {
        console.log("clicked");
        let newPedalNum = numPedals - 1;
        $(this)
            .parent()
            .parent()
            .parent()
            .remove();
    });

    for (let i = 1; i <= numPedals; i++) {
        $(`#pedal${i}-button`).on('click', function () {
            allPedalInfo[`pedal${i}`]['name'] = $(`#pedal${i}-name`).val();
            allPedalInfo[`pedal${i}`]['brand'] = $(`#pedal${i}-brand`).val();
        });
    }

    // 並び替え関連
    $("#pedal-sortable").sortable({
        update: function (event, ui) {
            order = $(this).sortable("toArray");
            order.forEach(function (pedal) {
                let pedalOrder = order.indexOf(pedal) + 1;
                allPedalInfo[pedal]['order'] = pedalOrder;
            });
        }
    }); 
    $("#pedal-sortable").disableSelection();
    
    // ajaxで送信
    $("#confirm").click(function () {
        $.ajax({
            url: $(this).attr("data-href"),
            data: {
                allPedalInfo: JSON.stringify(allPedalInfo),
            },
            })
            .then(
                // Success
                function (data) {
                    // console.log(data['success']);
                },
                // Error
                function () {
                    alert("ERROR");
                }
            );
    });
});