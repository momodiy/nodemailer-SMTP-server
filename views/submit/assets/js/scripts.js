jQuery(document).ready(() => {
    let isReSub = false;
    $.backstretch("assets/img/backgrounds/1.jpg");

    $('#top-navbar-1').on('shown.bs.collapse', () => {
        $.backstretch("resize");
    });
    $('#top-navbar-1').on('hidden.bs.collapse', () => {
        $.backstretch("resize");
    });

    $('.contact-form form input[type="text"], .contact-form form textarea').on('focus', () => {
        $('.contact-form form input[type="text"], .contact-form form textarea').removeClass('input-error');
    });

    $('.contact-form form').submit(e => {
        e.preventDefault();
        if (isReSub) return;
        isReSub = true;
        $('.contact-form form input[type="text"], .contact-form form textarea').removeClass('input-error');
        let formData = $('.contact-form form').serialize();
        $.ajax({
            type: 'POST',
            url: 'send',
            data: formData,
            dataType: 'json',
            // beforeSend: sectTips.beforeSend(cssName),
            complete: () => {
                isReSub = false;
            },
            success: (res, err) => {
                console.log(err);
                if (res.type === 'success' && res.state === 200 && res.msg !== '') {
                    $('.form-top-right>.fa-envelope').css({'color': '#5b9e11'});
                    $('.contact-form form').fadeOut('fast', () => {
                        $('.form-top-left>h3').html(`<p>Congratulations</p>`);
                        $('.form-top-left>p').html(`邮件发送成功`);
                        $('.contact-form').append(`<p>${res.msg}请在您的邮箱中查看<br>5秒后将自动跳转到首页...</p>`);
                        setInterval(() => location.reload(), 5000);
                    });
                } else {
                    errorHandle(res);
                }
            }, error: err => errorHandle(err)
        })

    });

    const errorHandle = err => {
        console.log(err);
        $('.contact-form>div').remove();
        $('.contact-form').append('<div><h3 style="color: #fe0001;">错误信息</h3><p>抱歉💔，邮件发送出错了，请在控制台查看详细信息。</p></div>');
    }

});
