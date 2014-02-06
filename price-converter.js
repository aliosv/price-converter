(function() {
    var getCurrencyRequest = $.ajax({
            url: 'https://openexchangerates.org/api/latest.json?app_id=4443ba04d0534ababc0e91ae34f0b430',
            method: 'get',
            type: 'jsonp'
        }),
        rates = {
            USD: 1,
            RUB: 32.9,
            UAH: 8.5
        },
        isSupportLocalStorage = 'localStorage' in window && window['localStorage'] !== null,
        defaultCurrency = (isSupportLocalStorage && localStorage.getItem('price-converter__currency')) || 'USD';

    getCurrencyRequest
        .done(function(data) {
            rates = data.rates;
        });

    $('.price-converter').each(function() {
        var $this = $(this),
            $toggle = $('.price-converter__toggle').eq(0),
            $currency = $('.price-converter__currency').eq(0),
            $value = $('.price-converter__value').eq(0),
            price = parseFloat($value.data('price'));

        getCurrencyRequest
            .done(function() {
                $this.trigger('updateValue');
            })
            .always(function() {
                $toggle.trigger('select', [defaultCurrency]);
            });

        $('.price-converter')
            .bind('updateValue', function() {
                $value.text((price * rates[defaultCurrency]).toFixed(0));
            })

        $toggle
            .bind('select', function(e, currency) {
                defaultCurrency = currency;
                isSupportLocalStorage && localStorage.setItem('price-converter__currency', currency);

                $currency.text(currency);

                $this.trigger('updateValue');
            });
    });
}());