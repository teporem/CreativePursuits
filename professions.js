$(document).ready(function () {
    /*const data = {
        "Actors": {count: 78100, percentage: 0.05},
        "Dancers": {count: 78100, percentage: 0.01},
        "Musicians": {count: 173500, percentage: 0.11},
        "Writers": {count: 151200, percentage: 0.09},
        "Photographers": {count: 148900, percentage: 0.09},
        "Artists": {count: 40600, percentage: 0.03},
    }*/

    function calculateWidth(scale) {
        return `${Math.sqrt(scale)*100}%`;
    }

    function changeTitle(profession) {
        const title = $('#title-text');
        const subtitle = $('#subtitle-text');
        if (profession) {
            const titleContent = 'PROFESSION';
            title.html(titleContent);
            const subtitleContent = `Number of Employments`;
            subtitle.html(subtitleContent);
        } else {
            const titleContent = 'CREATIVE';
            title.html(titleContent);
            const subtitleContent = `Pastimes & Professions`;
            subtitle.html(subtitleContent);
        }
    }

    function showDetail(keywords, name, number, percent) {

        $("#left-container, #right-container").hide();
        $("#detail").show();
        const h3Element = $("#detail h3");
        const pElement = $("#detail p");
        h3Element.text(name);
        pElement.text(`${number} employed (${percent}% of US Employments)`);

        d3.csv("/data/total.csv").then(function(data) {
            data.sort((a, b) => b.percentage - a.percentage);
            const filteredData = data.filter(item => keywords.some(keyword => item.arts.includes(keyword)));
            const detailList = $("#detail-list");
            detailList.empty(); 

            $.each(filteredData, function (index, item) {
                const listItem = $("<li>").addClass("list-item");
                const total = $("<div>").css("width","100%");
                const rectangle = $("<div>")
                    .addClass("rectangle")
                    .css("width", `${item.percentage}%`);

                total.append(rectangle);

                const text = $("<p>").text(`${item.percentage}% of people ${item.arts.toLowerCase()}`);
                listItem.append(total, text);
                detailList.append(listItem);
            });
        });
        
    }
    function hideDetail() {
        $("#left-container, #right-container").show();
        $("#detail").hide(); 
    }
    $("#close-detail").on('click', function () {
        hideDetail();
    });

    function showInfo() {
        $("#info-popup").show();
        $("#overlay").show();
    }
    function hideInfo() {
        $("#info-popup").hide();
        $("#overlay").hide();
    }

    $("#info").on('click', function () {
        showInfo();
    })
    $("#close-info").on('click', function () {
        hideInfo();
    })

    // 1: ACTOR
    var object1 = $('#cloud1');
    object1.css('width', calculateWidth(.5));
    object1.on('load', function() {
        var svg = object1.contents().find('svg');
        
        const tooltip = $('#tooltip');
        var path = svg.find('path');
        path.attr('fill', 'rgb(255 199 102)');
        path.css('cursor','pointer');

        path.on("mouseover", (event) => {
            timeout = setTimeout(() => {
                changeTitle(true);
                const tooltipContent = '78,100 Actors';
                tooltip.html(tooltipContent);
                var offset = $(this).parent().offset(); 
                var x = event.pageX + offset.left;
                var y = event.pageY + offset.top;
                tooltip.css({top: y, left: x}).show();
              }, 200);
          });
        path.on('mouseout', function () {
            clearTimeout(timeout);
            changeTitle(false);
            tooltip.hide();
        });

        path.on('click', function () {
            showDetail(["acting", "acts", "stage"], "ACTORS", "78,100", 0.05);
        });
    });

    // 2: DANCER
    var object2 = $('#cloud2');
    object2.css('width', calculateWidth(.1));
    object2.on('load', function() {
        var svg = object2.contents().find('svg');
        
        const tooltip = $('#tooltip');
        var path = svg.find('path');
        path.attr('fill', 'rgb(255 199 102)');
        path.css('cursor','pointer');

        path.on("mouseover", (event) => {
            timeout = setTimeout(() => {
                changeTitle(true);
                const tooltipContent = '18,400 Dancers & Choreographers';
                tooltip.html(tooltipContent);
                var offset = $(this).parent().offset(); 
                var x = event.pageX + offset.left;
                var y = event.pageY + offset.top;
                tooltip.css({top: y, left: x}).show();
              }, 200);
          });
        path.on('mouseout', function () {
            clearTimeout(timeout);
            changeTitle(false);
            tooltip.hide();
        });

        path.on('click', function () {
            showDetail(["dance", "danc", "ballet"], "DANCERS & CHOREOGRAPHERS", "18,400", 0.01);
        });
    });

    // 3: MUSICIAN
    var object3 = $('#cloud3');
    object3.css('width', calculateWidth(1.1));
    object3.on('load', function() {
        var svg = object3.contents().find('svg');
        
        const tooltip = $('#tooltip');
        var path = svg.find('path');
        path.attr('fill', 'rgb(255 199 102)');
        path.css('cursor','pointer');

        path.on("mouseover", (event) => {
            timeout = setTimeout(() => {
                changeTitle(true);
                const tooltipContent = '173,500 Musicians & Singers';
                tooltip.html(tooltipContent);
                var offset = $(this).parent().offset(); 
                var x = event.pageX + offset.left;
                var y = event.pageY + offset.top;
                tooltip.css({top: y, left: x}).show();
              }, 200);
          });
        path.on('mouseout', function () {
            clearTimeout(timeout);
            changeTitle(false);
            tooltip.hide();
        });

        path.on('click', function () {
            showDetail([" music", "sing", "Sing", "opera"], "MUSICIANS & SINGERS", "173,500", 0.11);
        });
    });

    // 5: ART
    var object4 = $('#cloud5');
    object4.css('width', calculateWidth(0.3));
    object4.on('load', function() {
        var svg = object4.contents().find('svg');
        
        const tooltip = $('#tooltip');
        var path = svg.find('path');
        path.attr('fill', 'rgb(242 154 78)');
        path.css('cursor','pointer');

        path.on("mouseover", (event) => {
            timeout = setTimeout(() => {
                changeTitle(true);
                const tooltipContent = '40,600 Craft & Fine Artists';
                tooltip.html(tooltipContent);
                var offset = $(this).parent().offset(); 
                var x = event.pageX + offset.left;
                var y = event.pageY + offset.top;
                tooltip.css({top: y, left: x}).show();
              }, 200);
          });
        path.on('mouseout', function () {
            clearTimeout(timeout);
            changeTitle(false);
            tooltip.hide();
        });

        path.on('click', function () {
            showDetail(["art ", "Create", "weaving"], "CRAFT & FINE ARTISTS", "40,600", 0.03);
        });
    });

    // 4: PHOTO
    var object5 = $('#cloud4');
    object5.css('width', calculateWidth(.9));
    object5.on('load', function() {
        var svg = object5.contents().find('svg');
        
        const tooltip = $('#tooltip');
        var path = svg.find('path');
        path.attr('fill', 'rgb(242 154 78)');
        path.css('cursor','pointer');

        path.on("mouseover", (event) => {
            timeout = setTimeout(() => {
                changeTitle(true);
                const tooltipContent = '148,900 Photographers';
                tooltip.html(tooltipContent);
                var offset = $(this).parent().offset(); 
                var x = event.pageX + offset.left;
                var y = event.pageY + offset.top;
                tooltip.css({top: y, left: x}).show();
              }, 200);
          });
        path.on('mouseout', function () {
            clearTimeout(timeout);
            changeTitle(false);
            tooltip.hide();
        });

        path.on('click', function () {
            showDetail(["photo","film"], "PHOTOGRAPHERS", "148,900", 0.09);
        });
    });

    // 6: WRITER
    var object6 = $('#cloud6');
    object6.css('width', calculateWidth(0.9));
    object6.on('load', function() {
        var svg = object6.contents().find('svg');
        
        const tooltip = $('#tooltip');
        var path = svg.find('path');
        path.attr('fill', '#ed7c7c');
        path.css('cursor','pointer');

        svg.on("mouseover", (event) => {
            timeout = setTimeout(() => {
                changeTitle(true);
                const tooltipContent = '151,200 Writers & Authors';
                tooltip.html(tooltipContent);
                var offset = $(this).parent().offset(); 
                var x = event.pageX + offset.left;
                var y = event.pageY + offset.top;
                tooltip.css({top: y, left: x}).show();
              }, 200);
          });
        svg.on('mouseout', function () {
            clearTimeout(timeout);
            changeTitle(false);
            tooltip.hide();
        });

        path.on('click', function () {
            showDetail(["write","writing", "Read", "read", "book"], "WRITERS & AUTHORS", "151,200", 0.09);
        });
    });
});