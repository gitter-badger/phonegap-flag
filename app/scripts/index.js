'use strict';
/*global window, $ */

window.app = {
    initialize: function () {
        if ( !(window.localStorage.getItem('list-of-todos')) ) {
            console.debug('Creating a list for the very first time!');
            window.localStorage.setItem('list-of-todos', '{ "list": [] }');
        }
        this.loadItems();
        this.bindEvents();
    },
    loadItems: function () {
        var aux = window.localStorage.getItem('list-of-todos');
        if (aux) {
            console.debug('Great we have a list of todos in cache');

            for (var i = 0; i < $.parseJSON(aux).list.length; i++ ) {
                this.createItem($.parseJSON(aux ).list[i]);
            }
        }
    },
    bindEvents: function () {
        /*jslist browser: true*/
        // Bind events to create new elements
        var self = this;
        $('#new-item').keyup(function (event) {
            if (event.keyCode === 13) {// listem only to the enter key
                self.createItem($('#new-item').val());
            }
        }).blur(function (event) {
            if (event.keyCode === 13) {// listem only to the enter key
                self.createItem($('#new-item').val());
            }
        });
    },
    createItem: function (value) {
        var fragmentStart = '<li class="item active">',
            fragmentEnd = '</li>';

            $('#list').prepend(fragmentStart + value + fragmentEnd);

            $('#new-item').val('');

            this.storeItem(value);
    },
    storeItem: function (value) {
        if ( !(window.localStorage.getItem('list-of-todos').indexOf(value) >= 0 ) ) {
            var newList = $.parseJSON(window.localStorage.getItem('list-of-todos')).list;
            newList.push(value);

            window.localStorage.setItem('list-of-todos', JSON.stringify({"list": newList}));
        }

    }
};
window.app.initialize();
