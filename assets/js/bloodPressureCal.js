
$('#bloodPressure').submit((e) => {
    e.preventDefault()

    $.ajax({
        type: 'post',
        url: '/bloodPressure',
        data: $('#bloodPressure').serialize(),
        success: function (data) {
            showInPage(data.BloodPressure);
        },
        error: function (err) {
            console.log(err);
        }
    })

    function showInPage(data) {
        $('#result-list').html(`<p>This is classified as ${data}.</p>`);
    }
})