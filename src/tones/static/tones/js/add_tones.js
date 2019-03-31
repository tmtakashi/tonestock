$(function () {
    let allPedalInfo = {};
    let order = ["pedal1", "pedal2"]


    // これはページ読み込み時に定義されてしまうので、ペダル追加後には更新する必要あり
    let numPedals = $("#pedal-sortable").children('li').length;　

    // ペダル追加
    $("#add-pedal").click(function () {
        let newPedalNum = numPedals + 1;
        let newPedal = $("#pedal-template").html().replace(/__pedal_number__/g, newPedalNum);
        $("#pedal-sortable").append(newPedal);
        numPedals = newPedalNum;
    });


    for (let i = 1; i <= numPedals; i++) {
        allPedalInfo[`pedal${i}`] = {}
        allPedalInfo[`pedal${i}`]['order'] = order.indexOf(`pedal${i}`) + 1;

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
                allPedalInfo[pedal]['order'] = pedalOrder
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