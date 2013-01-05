
// This uses require.js to structure javascript:
// http://requirejs.org/docs/api.html#define

define(function(require) {
    // Receipt verification (https://github.com/mozilla/receiptverifier)
    require('receiptverifier');

    // Installation button
    require('./install-button');

    // Write your app here.

    require('layouts/layouts');

    // Main list view

    var list = $('.list').get(0);
    list.titleField = "nickname";
    list.nextView = '.password-entry';

    $('button.add', list).click(function() {
        passwordEntry.reset();
        passwordEntry.open(null, 'slideLeft');
    });

    // Password Entry view

    var passwordEntry = $('.password-entry').get(0);
    passwordEntry.render = function(item) {
        $('.error', this).hide();
        if (item) {
            $('.checkPassword', this).hide();
            $('.password', this).val(item.get('password'));
            $('.nickname', this).val(item.get('nickname'));
            $('.nickname', this).attr('readonly', true);
        }
        else {
            this.reset();
        }
    };
    passwordEntry.reset = function () {
        $('.checkPassword', this).show();
        $('.checkPassword', this).val('');
        $('.password', this).val('');
        $('.nickname', this).val('');
        $('.nickname', this).removeAttr('readonly');
    };

    $('button.generate', passwordEntry).click(function() {
        var el = $(passwordEntry),
            nickname = el.find('.nickname').val(),
            password = el.find('.password').val(),
            checkPassword = el.find('.checkPassword').val(),
            model = passwordEntry.model,
            error = el.find('.error');

        if (!model && password != checkPassword) {
            error.show();
        }
        else {
            error.hide();
            if (!model) {
                list.add({ 'nickname': nickname });
                model = list.collection.last();
            }
            
            model.set({ 'password': oplop.accountPassword(nickname, password) });
            generated.open(model, 'slideLeft');
        }
    });
    var generated = $('.generated').get(0);
    generated.render = function(item) {
        $('.nickname-display').text(item.get('nickname'));
        $('.password-display').text(item.get('password'));
    };

    $('button.start-over', generated).click(function () {
        passwordEntry.reset();
        generated.close('slideRightOut');
        passwordEntry.close('slideRightOut');
    });
});
