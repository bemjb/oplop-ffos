
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
    list.add({ nickname: "facebook.com" });

    $('button.add', list).click(function() {
        passwordEntry.open(null, 'slideLeft');
    });
    
    // Password Entry view

    var passwordEntry = $('.password-entry').get(0);
    passwordEntry.render = function(item) {
        if (item) {
            $('.checkPassword', this).hide();
            $('.password', this).val(item.get('password'));
            $('.nickname', this).val(item.get('nickname'));
            $('.nickname', this).attr('readonly', true);
        }
        else {
            $('.checkPassword', this).show();
            $('.checkPassword', this).val('');
            $('.password', this).val('');
            $('.nickname', this).val('');
            $('.nickname', this).removeAttr('readonly');
        }
    };
});
