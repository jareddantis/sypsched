/* jshint esversion: 6 */

// Form responses
let response = {
    level: 0,
    blocks: {
        hums: -1,
        core: [null, null],
        elec: -1,
        res: -1
    }
};

// Form pages
const arrow = '<img src="dist/img/right.svg"/>';
const dummy = '<option value="-1" disabled selected hidden>Select...</option>';
const pages = [
    // Page 1: Welcome
    `
        <h1 class="head">Welcome</h1>
        <p class="head">Please select<br>your grade level</p>
        <button id="f1-g11">Grade 11 ${arrow}</button>
        <button id="f1-g12">Grade 12 ${arrow}</button>
        <p class="footer">made with &hearts; by <a href="https://jared.gq">@jareddantis</a></p>
    `,

    // Page 2: Subjects (AM hums)
    `
        <h1 class="head">Subjects</h1>

        <h3>Humanities + Math</h3>
        <select id="hums">
            ${dummy}
            <option value="0">Block A</option>
            <option value="1">Block B</option>
            <option value="2">Block C</option>
            <option value="3">Block D</option>
            <option value="4">Block E</option>
            <option value="5">Block F</option>
            <option value="6">Block G</option>
            <option value="7">Block H</option>
        </select>
        <h3>Core science</h3><select id="core" class="disabled">${dummy}</select>
        <h3>Elective</h3><select id="elec" class="disabled">${dummy}</select>
        <h3>Research</h3><select id="res" class="disabled">${dummy}</select>
        <button id="f3-next" class="hidden">${arrow}</button>
    `,

    // Page 3: Generated schedule
    `
        <table id="sched"></table>
        <button id="dl-jpg">Save as image ${arrow}</button>
        <button id="dl-xls">Save for Excel ${arrow}</button>
    `
];

// Form routing
const routers = [
    // Page 1
    () => {
        $('#f1-g11').click(() => {
            response.level = 'eleven';
            app.showPage(1);
        });
        $('#f1-g12').click(() => {
            response.level = 'twelve';
            app.showPage(1);
        });
    },

    // Page 2
    () => {
        $('#hums').change(() => {
            // Reset next dropdowns
            $('#f3-next').addClass('hidden');
            $('#core').empty().append($(dummy)).val(-1);
            $('#elec').val(-1).addClass('disabled');
            $('#res').val(-1).addClass('disabled');

            // Populate and enable Math dropdown
            response.blocks.hums = parseInt($('#hums').val());
            schedMgr.populateCore(response, '#core');
        });
        $('#core').change(() => {
            // Reset next dropdowns
            $('#f3-next').addClass('hidden');
            $('#elec').empty().append($(dummy)).val(-1);
            $('#res').val(-1).addClass('disabled');

            // Populate and enable elective dropdown
            response.blocks.core = [
                $('#core').val(),
                $('#core').find(':selected').text()
            ];
            schedMgr.populateElec(response, '#elec');
        });
        $('#elec').change(() => {
            // Reset next dropdowns
            $('#f3-next').addClass('hidden');
            $('#res').empty().append($(dummy)).val(-1);

            // Populate and enable research dropdown
            response.blocks.elec = [
                $('#elec').val(),
                $('#elec').find(':selected').text()
            ];
            schedMgr.populateRes(response, '#res');
        });
        $('#res').change(() => {
            // Show next button
            $('#f3-next').removeClass('hidden');

            // Save research block
            response.blocks.res = [
                $('#res').val(),
                $('#res').find(':selected').text()
            ];
            schedMgr.saveRes(response);
        });
        $('#f3-next').click(() => {
            // Show last page
            app.showPage(2);
        });
    },

    // Page 3
    () => {
        // Save as image
        $("#dl-jpg").click(() => {
            html2canvas(document.getElementById('sched'), {
                scale: 2,
                onrendered: function (c) {
                    let isAppleMobile = function() {
                        // https://stackoverflow.com/a/29696509
                        var ua = window.navigator.userAgent;
                        var iOS = !!ua.match(/iPad/i) || !!ua.match(/iPhone/i);
                        var webkit = !!ua.match(/WebKit/i);
                        var iOSSafari = iOS && webkit && !ua.match(/CriOS/i);
                        return iOSSafari;
                    };
                    let setPixelated = function(ctx) {
                        ctx.imageSmoothingEnabled = false;
                        ctx.mozImageSmoothingEnabled = false;
                        ctx.oImageSmoothingEnabled = false;
                        ctx.webkitImageSmoothingEnabled = false;
                        ctx.msImageSmoothingEnabled = false;
                    };

                    let context = c.getContext('2d', {alpha:false});
                    setPixelated(context);
                    let dataUrl = c.toDataURL("image/png"),
                        isFileSaverSupported = !!new Blob;

                    if (isAppleMobile() || !isFileSaverSupported)
                        window.location.href = dataUrl;
                    else {
                        let data = atob(dataUrl.substring(22)),
                            dataArr = new Uint8Array(data.length);

                        for (let i = 0; i < data.length; i++)
                            dataArr[i] = data.charCodeAt(i);

                        let dataBlob = new Blob([dataArr.buffer], {
                            "type": "image/png"
                        });
                        saveAs(dataBlob, "sched.png");
                    }
                }
            });
        });

        // Save as Excel
        $('#dl-xls').click(() => {
            console.log('clicked xls');
            // Build filename: sched-block-date
            let filename = 'sched-', date = new Date();
            filename += response.level == 'eleven' ? '11' : '12';
            filename += 'ABCDEFGH'.charAt(response.blocks.hums) + '-';
            filename += date.getFullYear();
            if (date.getDate() < 10) { filename += '0'; }
            filename += date.getDate();
            if (date.getMonth() + 1 < 10) { filename += '0'; }
            filename += (date.getMonth() + 1);

            // Save as .xlsx
            let exportData = schedGen.export.getExportData();
            let data = exportData.schedExport.xlsx;
            console.log(exportData);
            schedGen.export.export2file(data.data, data.mimeType, filename, data.fileExtension);
        });
    }
];
