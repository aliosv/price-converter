(function() {
    var hide = function(content) {
        content.removeClass('dropdown__content-wrapper_visibility_visible');
    };

    $(function() {
        $('.dropdown').each(function() {
            var _this = this,
                $content = $(this).find('.dropdown__content-wrapper').eq(0);

            $(document.body).click(function() {
                hide($content);
            });

            $(this).click(function() {
                return false;
            }).on('click', '.dropdown__item', function() {
                    hide($content);

                    $(_this).trigger('select', [$(this).text()]);
                }).find('.dropdown__switcher').click(function() {
                    $content.toggleClass('dropdown__content-wrapper_visibility_visible');
                });
        });
    });
}());