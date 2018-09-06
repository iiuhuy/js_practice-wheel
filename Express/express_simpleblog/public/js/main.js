$(document).ready(function() {
    $('.delete-article').on('click', function(e) {
        // 随便定义一个变量
        var $target = $(e.target);
        // console.log($target.attr('data-id'));   // 这样就能取出这个 id 了, 
        var id = $target.attr('data-id');

        $.ajax({
            type: 'DELETE',
            url: '/articles/' + id,
            success: function() {
                alert('Deleting Article');
                window.location.href = "/";
            },
            error: function(err) {
                console.log(err);
            }
        })
    })
})