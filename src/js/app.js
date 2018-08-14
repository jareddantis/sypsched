/* jshint esversion: 6 */

let app = {
    start: function () {
        window.setTimeout(() => {
            $('#loader').fadeOut(300);
            console.log("Started");
            window.setTimeout(() => {
                this.showPage(0);
            }, 300);
        }, 700);
    },
    showPage: function (page) {
        let show = () => {
            $('#content').removeClass('animIn animOut')
                .promise().done(() => {
                    $('#container').attr('class', 'page-' + (page + 1));
                    $('#content').html(pages[page]);

                    // Generate sched table before showing page 3
                    if (page == 2) {
                        schedGen.makeTable();
                    }

                    // Show page and activate listeners (routers)
                    window.setTimeout(() => {
                        $('#content').addClass('animIn').promise()
                            .done(routers[page]);
                    }, 100);
                });
        };

        if (page > 0) {
            // Animate out
            $('#content').addClass('animOut');
            // Show page after animation (+500ms)
            window.setTimeout(show, 501);
        } else {
            show();
        }
    }
};
