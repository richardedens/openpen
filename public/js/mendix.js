/* global jsPlumb */
jsPlumb.bind("ready", function () {

    String.prototype.contains = function (word, start) {
        if (start == undefined) {
            start = 0;
        }
        return this.includes(word, start);
    }

    var Core = {
        init: function () {

        }
    }

    Core.init();

    $(".file-tree").filetree({
        collapsed: true,
    });

});