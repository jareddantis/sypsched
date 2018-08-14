/* jshint esversion: 6 */

const schedGen = {
    sched: null,
    export: null,

    head: `
        <thead>
            <th>&nbsp;</th>
            <th>Mon</th>
            <th>Tue</th>
            <th>Wed</th>
            <th>Thu</th>
            <th>Fri</th>
        </thead>
    `,

    times: [
        "7:20&#8209;7:30", // Flag ceremony [0]
        "7:30&#8209;7:40", // 1
        "7:40&#8209;8:30", // 2
        "8:30&#8209;9:20", // 3
        "9:20&#8209;9:40", // AM Break [4]
        "9:40&#8209;10:30", // 5
        "10:30&#8209;11:20", // 6
        "11:20&#8209;12:10", // 7
        "12:10&#8209;1:00", // 8
        "1:00&#8209;1:50", // 9
        "1:50&#8209;2:10", // PM Break [10]
        "2:10&#8209;3:00", // 11
        "3:00&#8209;3:50" // 12
    ],

    makeTable: function () {
        console.log(this.sched);

        // Populate table headings
        $('#sched').append($(this.head));

        // Get to work!
        let body = $('<tbody>');
        let lunchRow = 0;
        for (let i = 0; i < this.times.length; i++) {
            let row = $('<tr>');
            $(row).append($('<td class="time">').html(this.times[i]));

            switch (i) {
                case 4:
                case 10:
                    $(row).append($('<td class="break" colspan="4">Break</td>'));
                    break;
                default:
                    for (let j = 0; j < 4; j++) {
                        // i = row/slot, j = col/day
                        let cell = $('<td>');

                        if (j == 0) {
                            // Monday
                            if (i == 0) {
                                // Flag ceremony
                                $(row).append($('<td class="flag" rowspan="2">Flag C.</td>'));
                                for (let k = 0; k < 3; k++) {
                                    $(row).append($('<td>&nbsp;</td>'));
                                }

                                // Add fieldwork day cell
                                $(row).append($('<td class="fri" rowspan="13">Fieldwork</td>'));
                                continue;
                            } else if (i == 1) {
                                // Already covered by rowspan
                                continue;
                            }
                        } else {
                            if (i == 0) {
                                // Tue-Thu: No subjects before 7:30am
                                console.log('Skipping row ' + i + ' col ' + j);
                                continue;
                            } else if (i == 2) {
                                // Already covered by rowspan
                                continue;
                            }
                        }

                        // Do not count breaks
                        let r = i - 2;
                        if (i >= 4) { r--; }
                        if (i >= 10) { r--; }
                        if (i == 1 && j > 0) { r = 0; }

                        //console.log('now at row ' + i + ' col ' + j + '; r=' + r);
                        let subject = this.sched[r][j];
                        //console.log('    => subject: ' + subject);
                        if (subject === true) {
                            // true = ASA period
                            let name = $('<strong>').text('ASA');
                            $(cell).append(name);
                        } else if (subject === false) {
                            // false = empty slot
                            if (j == 0 && this.sched[r][1] === false) {
                                // lunch hour!!
                                // only add cell on first column
                                // so we can use colspan
                                $(cell).text('Lunch').addClass('break').attr('colspan', '4');

                                // skip to next row
                                lunchRow = r;
                            } else if (r == lunchRow) {
                                // already covered by colspan
                                continue;
                            } else {
                                // probably no class or early dismissal
                                $(cell).html('&nbsp;');
                            }
                        } else {
                            // something else: an actual subject
                            let name = $('<strong>').text(subjects[subject[0]]);
                            let room = $('<em>').text('(' + rooms[subject[1]] + ')');
                            $(cell).append(name)
                                .append($('<br>'))
                                .append(room);

                            // Tue-Thu first subject is 1 hour long
                            if (j > 0 && r == 0) {
                                $(cell).attr('rowspan', '2');
                            }
                        }

                        $(row).append(cell);
                    }
            }

            $(body).append(row);
        }

        $('#sched').append(body);
    }
};
