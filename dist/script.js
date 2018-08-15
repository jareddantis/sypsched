"use strict";var app={start:function(){var e=this;window.setTimeout(function(){$("#loader").fadeOut(300),void 0,window.setTimeout(function(){e.showPage(0)},300)},700)},showPage:function(e){var s=function(){$("#content").removeClass("animIn animOut").promise().done(function(){$("#container").attr("class","page-"+(e+1)),$("#content").html(pages[e]),2==e&&schedGen.makeTable(),window.setTimeout(function(){$("#content").addClass("animIn").promise().done(routers[e])},100)})};0<e?($("#content").addClass("animOut"),window.setTimeout(s,501)):s()}},blocks={eleven:{A:[[0,26],[1,19],[1,19],[1,19],[2,28],[2,28],[0,26],[0,26],[3,22],[3,22],[3,22],[2,28]],B:[[1,19],[2,28],[2,28],[2,28],[3,22],[3,22],[1,19],[1,19],[0,26],[0,26],[0,26],[3,22]],C:[[2,28],[3,22],[3,22],[3,22],[0,26],[0,26],[2,28],[2,28],[1,19],[1,19],[1,19],[0,26]],D:[[3,22],[0,26],[0,26],[0,26],[1,19],[1,19],[3,22],[3,22],[2,28],[2,28],[2,28],[1,19]],E:[[0,26],[1,19],[1,19],[1,19],[2,28],[2,28],[0,26],[0,26],[3,22],[3,22],[3,22],[2,28]],F:[[1,19],[2,28],[2,28],[2,28],[3,22],[3,22],[1,19],[1,19],[0,26],[0,26],[0,26],[3,22]],G:[[2,28],[3,22],[3,22],[3,22],[0,26],[0,26],[2,28],[2,28],[1,19],[1,19],[1,19],[0,26]],H:[[3,22],[0,26],[0,26],[0,26],[1,19],[1,19],[3,22],[3,22],[2,28],[2,28],[2,28],[1,19]]},twelve:{A:[[0,27],[1,20],[1,20],[1,20],[2,29],[2,29],[0,27],[0,27],[3,23],[3,23],[3,23],[2,29]],B:[[1,20],[2,29],[2,29],[2,29],[3,23],[3,23],[1,20],[1,20],[0,27],[0,27],[0,27],[3,23]],C:[[2,29],[3,23],[3,23],[3,23],[0,27],[0,27],[2,29],[2,29],[1,20],[1,20],[1,20],[0,27]],D:[[3,23],[0,27],[0,27],[0,27],[1,20],[1,20],[3,23],[3,23],[2,29],[2,29],[2,29],[1,20]],E:[[0,27],[1,20],[1,20],[1,20],[2,29],[2,29],[0,27],[0,27],[3,23],[3,23],[3,23],[2,29]],F:[[1,20],[2,29],[2,29],[2,29],[3,23],[3,23],[1,20],[1,20],[0,27],[0,27],[0,27],[3,23]],G:[[2,29],[3,23],[3,23],[3,23],[0,27],[0,27],[2,29],[2,29],[1,20],[1,20],[1,20],[0,27]],H:[[3,23],[0,27],[0,27],[0,27],[1,20],[1,20],[3,23],[3,23],[2,29],[2,29],[2,29],[1,20]]},sci:{subjs:{chem31:[4,10],chem32:[5,10],phys31:[6,1],phys32:[7,1],bio3:[8,11],chem41:[9,9],chem42:[10,9],phys41:[11,2],phys42:[12,2],bio4:[13,3],tech:[14,21],cs:[15,5],agri:[16,{B:[12,18],Y:[3]}],engg:[17,{A:[15,18,14],X:[16,17],Y:[17,4],Z:[16,17]}],res2:[18,0,{A2:7,Z2:6},["A","A2","B","C"],["X","Y","Z","Z2"]],res3:[19,25,{C2:7,X2:13,Y:8},["A","B","C","C2"],["X","X2","Y","Z"]]},timeslots:{A:[[0,0],[0,2],[1,1],[2,1],[3,1]],B:[[0,3],[1,0],[1,2],[2,2],[3,2]],C:[[0,1],[2,0],[1,3],[2,3],[3,3]],X:[[6,0],[4,2],[5,1],[6,1],[7,1]],Y:[[7,0],[4,1],[5,3],[6,3],[7,3]],Z:[[8,0],[4,3],[5,2],[6,2],[7,2]],amRes:[[4,1],[4,2],[4,3]],pmRes:[[8,1],[8,2],[8,3]]}}},subjects=["SS","Math","English","Filipino","Chem 3.1","Chem 3.2","Phys 3.1","Phys 3.2","Bio 3","Chem 4.1","Chem 4.2","Phys 4.1","Phys 4.2","Bio 4","Tech ","CS 5","AgriAqua","Engg","Res 2","Res 3"],rooms=["ASTB 203","ASTB 302","ASTB 303","ASTB 304","Catalyst","Samsung","SHB 101","SHB 103A","SHB 103B","SHB 105","SHB 108","SHB 109","SHB 111","SHB 115","SHB 309","SHB 311","SHB 312","SHB 316","SHB 319","SHB 405","SHB 406","SHB 410","SHBEx 2A","SHBEx 2B","SHBEx 2C","SHBEx 2D","SHBEx 3A","SHBEx 3B","SHBEx 3C","SHBEx 3D"],response={level:0,blocks:{hums:-1,core:[null,null],elec:-1,res:-1}},arrow='<img src="dist/img/right.svg"/>',dummy='<option value="-1" disabled selected hidden>Select...</option>',pages=['\n        <h1 class="head">Welcome</h1>\n        <p class="head">Please select<br>your grade level</p>\n        <button id="f1-g11">Grade 11 '+arrow+'</button>\n        <button id="f1-g12">Grade 12 '+arrow+'</button>\n        <p class="footer">made with &hearts; by <a href="https://jared.gq">@jareddantis</a></p>\n    ','\n        <h1 class="head">Subjects</h1>\n\n        <h3>Humanities + Math</h3>\n        <select id="hums">\n            '+dummy+'\n            <option value="0">Block A</option>\n            <option value="1">Block B</option>\n            <option value="2">Block C</option>\n            <option value="3">Block D</option>\n            <option value="4">Block E</option>\n            <option value="5">Block F</option>\n            <option value="6">Block G</option>\n            <option value="7">Block H</option>\n        </select>\n        <h3>Core science</h3><select id="core" class="disabled">'+dummy+'</select>\n        <h3>Elective</h3><select id="elec" class="disabled">'+dummy+'</select>\n        <h3>Research</h3><select id="res" class="disabled">'+dummy+'</select>\n        <button id="f3-next" class="hidden">'+arrow+"</button>\n    ",'\n        <table id="sched"></table>\n        <button id="dl-jpg">Save as image '+arrow+'</button>\n        <button id="dl-xls">Save for Excel '+arrow+"</button>\n    "],routers=[function(){$("#f1-g11").click(function(){response.level="eleven",app.showPage(1)}),$("#f1-g12").click(function(){response.level="twelve",app.showPage(1)})},function(){$("#hums").change(function(){$("#f3-next").addClass("hidden"),$("#core").empty().append($(dummy)).val(-1),$("#elec").val(-1).addClass("disabled"),$("#res").val(-1).addClass("disabled"),response.blocks.hums=parseInt($("#hums").val()),schedMgr.populateCore(response,"#core")}),$("#core").change(function(){$("#f3-next").addClass("hidden"),$("#elec").empty().append($(dummy)).val(-1),$("#res").val(-1).addClass("disabled"),response.blocks.core=[$("#core").val(),$("#core").find(":selected").text()],schedMgr.populateElec(response,"#elec")}),$("#elec").change(function(){$("#f3-next").addClass("hidden"),$("#res").empty().append($(dummy)).val(-1),response.blocks.elec=[$("#elec").val(),$("#elec").find(":selected").text()],schedMgr.populateRes(response,"#res")}),$("#res").change(function(){$("#f3-next").removeClass("hidden"),response.blocks.res=[$("#res").val(),$("#res").find(":selected").text()],schedMgr.saveRes(response)}),$("#f3-next").click(function(){app.showPage(2)})},function(){var p="sched-",e=new Date;p+="eleven"==response.level?"11":"12",p+="ABCDEFGH".charAt(response.blocks.hums)+"-",p+=e.getFullYear(),e.getDate()<10&&(p+="0"),p+=e.getDate(),e.getMonth()+1<10&&(p+="0"),p+=e.getMonth()+1,$("#dl-jpg").click(function(){html2canvas(document.getElementById("sched"),{scale:2,onrendered:function(e){var s,t=e.getContext("2d",{alpha:!1});(s=t).imageSmoothingEnabled=!1,s.mozImageSmoothingEnabled=!1,s.oImageSmoothingEnabled=!1,s.webkitImageSmoothingEnabled=!1,s.msImageSmoothingEnabled=!1;var o,n,l,a=e.toDataURL("image/png"),c=!!new Blob;if(o=window.navigator.userAgent,n=!!o.match(/iPad/i)||!!o.match(/iPhone/i),l=!!o.match(/WebKit/i),n&&l&&!o.match(/CriOS/i)||!c)window.location.href=a;else{for(var i=atob(a.substring(22)),r=new Uint8Array(i.length),d=0;d<i.length;d++)r[d]=i.charCodeAt(d);var h=new Blob([r.buffer],{type:"image/png"});saveAs(h,p+".png")}}})}),$("#dl-xls").click(function(){void 0;var e=document.getElementById("sched").outerHTML.replace(/ /g,"%20"),s=document.createElement("a");s.href="data:application/vnd.ms-excel,"+e,s.download=p+".xls",s.click()})}],schedGen={sched:null,export:null,head:"\n        <thead>\n            <th>&nbsp;</th>\n            <th>Mon</th>\n            <th>Tue</th>\n            <th>Wed</th>\n            <th>Thu</th>\n            <th>Fri</th>\n        </thead>\n    ",times:["7:20&#8209;7:30","7:30&#8209;7:40","7:40&#8209;8:30","8:30&#8209;9:20","9:20&#8209;9:40","9:40&#8209;10:30","10:30&#8209;11:20","11:20&#8209;12:10","12:10&#8209;1:00","1:00&#8209;1:50","1:50&#8209;2:10","2:10&#8209;3:00","3:00&#8209;3:50"],makeTable:function(){void 0,$("#sched").append($(this.head));for(var e=$("<tbody>"),s=0,t=0;t<this.times.length;t++){var o=$("<tr>");switch($(o).append($('<td class="time">').html(this.times[t])),t){case 4:case 10:$(o).append($('<td class="break" colspan="4">Break</td>'));break;default:for(var n=0;n<4;n++){var l=$("<td>");if(0==n){if(0==t){$(o).append($('<td class="flag" rowspan="2">Flag C.</td>'));for(var a=0;a<3;a++)$(o).append($("<td>&nbsp;</td>"));$(o).append($('<td class="fri" rowspan="13">Fieldwork</td>'));continue}if(1==t)continue}else{if(0==t){void 0;continue}if(2==t)continue}var c=t-2;4<=t&&c--,10<=t&&c--,1==t&&0<n&&(c=0);var i=this.sched[c][n];if(!0===i){var r=$("<strong>").text("ASA");$(l).append(r)}else if(!1===i)if(0==n&&!1===this.sched[c][1])$(l).text("Lunch").addClass("break").attr("colspan","4"),s=c;else{if(c==s)continue;$(l).html("&nbsp;")}else{var d=$("<strong>").text(subjects[i[0]]),h=$("<em>").text("("+rooms[i[1]]+")");$(l).append(d).append($("<br>")).append(h),0<n&&0==c&&$(l).attr("rowspan","2")}$(o).append(l)}}$(e).append(o)}$("#sched").append(e)}},schedMgr={slots:null,morningHums:!1,populateCore:function(e,s){this.slots=function(){for(var e=[],s=0;s<9;s++){for(var t=[],o=0;o<4;o++)t.push(4==s&&0==o);e.push(t)}return e}();var t=e.level,o="ABCDEFGH".charAt(e.blocks.hums);if(this.morningHums=e.blocks.hums<4,this.morningHums)for(var n=0;n<3;n++)for(var l=0;l<4;l++){var a=4*n+l;void 0,this.slots[n][l]=blocks[t][o][a]}else for(var c=6;c<9;c++)for(var i=0;i<4;i++){var r=4*(c-6)+i;void 0,this.slots[c][i]=blocks[t][o][r]}void 0;for(var d="eleven"==e.level?9:14,h=4;h<d;h++){var p=void 0;switch(h){case 9:p=this.morningHums?["X"]:["C"];break;case 10:p=this.morningHums?["Y","Z"]:["A","B"];break;case 11:p=this.morningHums?["X","Y"]:["A","C"];break;case 12:p=this.morningHums?["Z"]:["B"];break;default:p=this.morningHums?["X","Y","Z"]:["A","B","C"]}for(var u=0;u<p.length;u++){var m=subjects[h].replace(/ |\./g,"").toLowerCase(),g=$('<option value="'+m+'"></option>');$(g).text(subjects[h]+p[u]),$(s).append(g)}}$(s).removeClass("disabled")},populateElec:function(e,s){for(var t=e.blocks.core[0],o=e.blocks.core[1],n=o[o.length-1],l=blocks.sci.timeslots[n],a=0;a<l.length;a++){var c=l[a][0],i=l[a][1];this.slots[c][i]=blocks.sci.subjs[t]}void 0;for(var r="eleven"==e.level?9:14,d=4;d<r;d++){var h=void 0;switch(d){case 9:h=this.morningHums?["X"]:["C"];break;case 10:h=this.morningHums?["Y","Z"]:["A","B"];break;case 11:h=this.morningHums?["X","Y"]:["A","C"];break;case 12:h=this.morningHums?["Z"]:["B"];break;default:h=this.morningHums?["X","Y","Z"]:["A","B","C"]}h.splice(h.indexOf(n),1);for(var p=0;p<h.length;p++){var u=subjects[d].replace(/ |\./g,"").toLowerCase(),m=$('<option value="'+u+'">');$(m).text(subjects[d]+h[p]),$(s).append(m)}}var g=this.morningHums?["X","Y","Z"]:["A","B","C"];g.splice(g.indexOf(n),1);for(var v=0;v<g.length;v++){var b=subjects[14]+g[v];$(s).append($('<option value="tech">').text(b))}var f='<option value="cs">',k='<option value="agri">',B='<option value="engg">';-1!=g.indexOf("A")&&($(s).append($(f).text(subjects[15]+"A")),$(s).append($(B).text(subjects[17]+" A"))),-1!=g.indexOf("B")&&$(s).append($(k).text(subjects[16]+" B")),-1!=g.indexOf("C")&&$(s).append($(f).text(subjects[15]+"C")),-1!=g.indexOf("X")&&$(s).append($(B).text(subjects[17]+" X")),-1!=g.indexOf("Y")&&($(s).append($(f).text(subjects[15]+"Y")),$(s).append($(k).text(subjects[16]+" Y")),$(s).append($(B).text(subjects[17]+" Y"))),-1!=g.indexOf("Z")&&$(s).append($(B).text(subjects[17]+" Z")),$(s).removeClass("disabled")},populateRes:function(e,s){var t=e.blocks.elec[0],o=e.blocks.elec[1],n=o[o.length-1],l=blocks.sci.timeslots[n],a=void 0;"agri"==t||"engg"==t?a=[blocks.sci.subjs[t][0],blocks.sci.subjs[t][1][n]]:a=blocks.sci.subjs[t];void 0;for(var c=0;c<l.length;c++){var i=l[c][0],r=l[c][1];this.slots[i][r]=a}void 0;var d=e.blocks.core[1],h=d[d.length-1],p="eleven"==e.level?"res2":"res3",u=this.morningHums?4:3,m=blocks.sci.subjs[p][u].slice();void 0,void 0,m.splice(m.indexOf(h),1),m.splice(m.indexOf(n),1),-1!=m.indexOf(h+"2")&&m.splice(m.indexOf(h+"2"),1),-1!=m.indexOf(n+"2")&&m.splice(m.indexOf(n+"2"),1),void 0;for(var g="eleven"==e.level?18:19,v=0;v<m.length;v++){var b=$('<option value="'+m[v]+'">');$(b).text(subjects[g]+m[v]),$(s).append(b)}$(s).removeClass("disabled"),1==m.length&&$(s).val(m[0]).trigger("change")},saveRes:function(e){var s=e.level,t=e.blocks.res[0],o=blocks.sci.timeslots[t.charAt(0)],n=o[4],l=[n[0]+1,n[1]];void 0,void 0,o.push(l),void 0;var a="eleven"==s?"res2":"res3",c=Object.keys(blocks.sci.subjs[a][2]),i=blocks.sci.subjs[a][1];-1!=c.indexOf(t)&&(i=blocks.sci.subjs[a][2][t]);for(var r=blocks.sci.subjs[a][0],d=0;d<o.length;d++){var h=o[d][0],p=o[d][1];this.slots[h][p]=[r,i]}var u=this.morningHums?"pmRes":"amRes",m=blocks.sci.timeslots[u].slice();void 0,m.splice(l[1]-1,1),void 0;for(var g=0;g<m.length;g++){var v=m[g][0],b=m[g][1];void 0,this.slots[v][b]=!1}schedGen.sched=this.slots,void 0}};