/* jshint esversion: 6 */

const schedMgr = {
    slots: null,
    morningHums: false,

    populateCore: function (params, selector) {
        // Reinitialize slots as empty 2D array
        this.slots = (() => {
            let rows = [];
            for (let i = 0; i < 9; i++) {
                let cols = [];
                for (let j = 0; j < 4; j++) {
                    // ASA is on the same slot for all blocks
                    // of both Grades 11 and 12
                    cols.push(i == 4 && j == 0 ? true : false);
                }
                rows.push(cols);
            }
            return rows;
        })();

        // Store humanities + math first
        let level = params.level;
        let hBlock = 'ABCDEFGH'.charAt(params.blocks.hums);
        this.morningHums = params.blocks.hums < 4;
        if (this.morningHums) {
            // AM
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 4; j++) {
                    let idx = (i * 4) + j;
                    console.log('slot: ' + blocks[level][hBlock][idx]);
                    this.slots[i][j] = blocks[level][hBlock][idx];
                }
            }
        } else {
            // PM
            for (let i = 6; i < 9; i++) {
                for (let j = 0; j < 4; j++) {
                    let idx = ((i - 6) * 4) + j;
                    console.log('slot: ' + blocks[level][hBlock][idx]);
                    this.slots[i][j] = blocks[level][hBlock][idx];
                }
            }
        }
        console.log(this.slots);

        // Only available core subjects are subjects[4] to [13]
        // or to [8] if Grade 11
        let sBlock = this.morningHums ? ['X','Y','Z'] : ['A','B','C'];
        let iMax = params.level == 'eleven' ? 9 : 14;
        for (let i = 4; i < iMax; i++) {
            for (let j = 0; j < sBlock.length; j++) {
                let value = subjects[i].replace(/ |\./g, "").toLowerCase();
                let opt = $('<option value="' + value + '"></option>');
                $(opt).text(subjects[i] + sBlock[j]);
                $(selector).append(opt);
            }
        }

        // Enable dropdown
        $(selector).removeClass('disabled');
    },

    populateElec: function (params, selector) {
        // Store core science
        let core = params.blocks.core[0];
        let coreName = params.blocks.core[1];
        let coreBlock = coreName[coreName.length - 1];
        let coreSlots = blocks.sci.timeslots[coreBlock];
        for (let i = 0; i < coreSlots.length; i++) {
            let row = coreSlots[i][0],
                col = coreSlots[i][1];
            this.slots[row][col] = blocks.sci.subjs[core];
        }
        console.log(this.slots);

        // Remove core block from available slots
        let sBlock = this.morningHums ? ['X','Y','Z'] : ['A','B','C'];
        sBlock.splice(sBlock.indexOf(coreBlock), 1);

        // Populate electives dropdown with core-able subjects
        let iMax = params.level == 'eleven' ? 9 : 14;
        for (let i = 4; i < iMax; i++) {
            for (let j = 0; j < sBlock.length; j++) {
                let value = subjects[i].replace(/ |\./g, "").toLowerCase();
                let opt = $('<option value="' + value + '">');
                $(opt).text(subjects[i] + sBlock[j]);
                $(selector).append(opt);
            }
        }

        // Add Tech elective
        for (let j = 0; j < sBlock.length; j++) {
            let text = subjects[14] + sBlock[j];
            $(selector).append($('<option value="tech">').text(text));
        }

        // Elective-only subjects do not have slots
        // for all ABC or XYZ, except for Tech
        let CS = '<option value="cs">',
            AGRI = '<option value="agri">',
            ENGG = '<option value="engg">';
        if (sBlock.indexOf('A') != -1) {
            $(selector).append($(CS).text(subjects[15] + 'A'));
            $(selector).append($(ENGG).text(subjects[17] + ' A'));
        }
        if (sBlock.indexOf('B') != -1) {
            $(selector).append($(AGRI).text(subjects[16] + ' B'));
        }
        if (sBlock.indexOf('C') != -1) {
            $(selector).append($(CS).text(subjects[15] + 'C'));
        }
        if (sBlock.indexOf('X') != -1) {
            $(selector).append($(ENGG).text(subjects[17] + ' X'));
        }
        if (sBlock.indexOf('Y') != -1) {
            $(selector).append($(CS).text(subjects[15] + 'Y'));
            $(selector).append($(AGRI).text(subjects[16] + ' Y'));
            $(selector).append($(ENGG).text(subjects[17] + ' Y'));
        }
        if (sBlock.indexOf('Z') != -1) {
            $(selector).append($(ENGG).text(subjects[17] + ' Z'));
        }

        // Enable dropdown
        $(selector).removeClass('disabled');
    },

    populateRes: function (params, selector) {
        // Store elective
        let elec = params.blocks.elec[0];
        let elecName = params.blocks.elec[1];
        let elecBlock = elecName[elecName.length - 1];
        let elecSlots = blocks.sci.timeslots[elecBlock];
        let subject;
        if (elec == 'agri' || elec == 'engg') {
            let name = blocks.sci.subjs[elec][0],
                rooms = blocks.sci.subjs[elec][1][elecBlock];
            subject = [name, rooms];
        } else {
            subject = blocks.sci.subjs[elec];
        }
        console.log('Elective: ' + subject);
        for (let i = 0; i < elecSlots.length; i++) {
            let row = elecSlots[i][0],
                col = elecSlots[i][1];
            this.slots[row][col] = subject;
        }
        console.log(this.slots);

        // Remove core and elec blocks from available slots
        let coreName = params.blocks.core[1];
        let coreBlock = coreName[coreName.length - 1];
        let resLevel = params.level == 'eleven' ? 'res2' : 'res3';
        let resShift = this.morningHums ? 4 : 3;
        let rBlock = blocks.sci.subjs[resLevel][resShift].slice();
        console.log(rBlock);
        console.log('- ' + coreBlock + ', ' + elecBlock);
        rBlock.splice(rBlock.indexOf(coreBlock), 1);
        rBlock.splice(rBlock.indexOf(elecBlock), 1);

        // Also account for the double Res slots (e.g. X & X2)
        if (rBlock.indexOf(coreBlock + '2') != -1) {
            rBlock.splice(rBlock.indexOf(coreBlock + '2'), 1);
        }
        if (rBlock.indexOf(elecBlock + '2') != -1) {
            rBlock.splice(rBlock.indexOf(elecBlock + '2'), 1);
        }
        console.log('= ' + rBlock);

        // Populate research dropdown
        let resName = params.level == 'eleven' ? 18 : 19;
        for (let i = 0; i < rBlock.length; i++) {
            let opt = $('<option value="' + rBlock[i] + '">');
            $(opt).text(subjects[resName] + rBlock[i]);
            $(selector).append(opt);
        }

        // Enable dropdown
        $(selector).removeClass('disabled');

        // Auto-select if only single available slot
        if (rBlock.length == 1) {
            $(selector).val(rBlock[0]).trigger('change');
        }
    },

    saveRes: function (params) {
        // Add extra slot for research
        let level = params.level;
        let rBlock = params.blocks.res[0];
        let resSlots = blocks.sci.timeslots[rBlock.charAt(0)];
        let lastSlot = resSlots[4];
        let newSlot = [-1, -1];
        if (this.morningHums) {
            newSlot[0] = lastSlot[0] + 1;
            newSlot[1] = lastSlot[1];
        } else {
            newSlot[0] = lastSlot[0];
            newSlot[1] = lastSlot[1] + 1;
        }
        resSlots.push(newSlot);

        // Determine rooms
        let resLevel = level == 'eleven' ? 'res2' : 'res3';
        let specialBlocks = Object.keys(blocks.sci.subjs[resLevel][2]);
        let room = blocks.sci.subjs[resLevel][1];  // Default room
        if (specialBlocks.indexOf(rBlock) != -1) {
            room = blocks.sci.subjs[resLevel][2][rBlock];
        }

        // Save research sched
        let resName = blocks.sci.subjs[resLevel][0];
        for (let i = 0; i < resSlots.length; i++) {
            let row = resSlots[i][0],
                col = resSlots[i][1];
            this.slots[row][col] = [resName, room];
        }

        // Save sched object
        schedGen.sched = this.slots;
        console.log(this.slots);
    }
};
