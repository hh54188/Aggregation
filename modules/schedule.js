exports.Schedule = function() {

    var tasks = Array.prototype.slice.call(arguments);

    (function run() {

        task = tasks.pop();
        task();

        if (tasks.length) {
            setTimeout(function() {
                run();
            }, 1000 * 60);
        }

    })();
}