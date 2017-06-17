(function () {
    'strict mode';

    function loadTraceData(timeRange) {
        $.ajax({
            url: 'trace',
            method: 'GET',
            data: { start: timeRange[0], end: timeRange[1] },
            dataType: "json"
        }).done(function (data) {
            preprocess(data);
            console.log(data);
            visualize(data, timeRange[0], timeRange[1]);
        });
    }

    function preprocess(data) {
        for (let i = 0; i < data.length; i++) {
            let inst = data[i];
            inst.startTime = inst.events[0].time;
            inst.endTime = inst.events[inst.events.length - 1].time;
            for (let j = 0; j < inst.events.length; j++) {
                let event = inst.events[j];
                event.instCount = i;
                event.inst = inst;
                if (j != inst.events.length - 1) {
                    let nextEvent = inst.events[j + 1];
                    event.endTime = nextEvent.time;
                } else {
                    event.endTime = event.time;
                }
            }
        }
    }

    let stageColor = d3.scaleOrdinal()
        .domain([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12])
        .range([
            'black', // unknown
            '#67001f', // fetch start
            'white', // fetch done
            '#b2182b',  // issue
            '#d6604d', // decode start
            'white', // decode done
            '#f4a582', // read start
            'white', // read done
            '#fddbc7', // exec start
            'white', // exec done
            '#92c5de', // write start
            'white', // write done
            '#4394c3', // complete
            '#2166ac', '#053061']);
    let stageName = d3.scaleOrdinal()
        .domain([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12])
        .range([
            'unknown',
            'fetch',
            'wait issue',
            'issue',
            'decode',
            'wait',
            'read',
            'wait',
            'exec',
            'wait',
            'write',
            'wait',
            'complete'
        ]);

    function visualize(data, startTime, endTime) {
        let tooltip = $('#tooltip');
        
        let width = window.innerWidth;
        let height = window.innerHeight - 200;

        let svg = d3.select('#pipeline-figure').selectAll('svg');
        let mainArea = svg.select('.main-area');

        let xScale = d3.scaleLinear()
            .domain([startTime, endTime])
            .range([0, width]);
        let widthScale = d3.scaleLinear()
            .domain([0, endTime - startTime])
            .range([0, width]);
        let instHeight = height / data.length;
        let xAxis = d3.axisBottom(xScale)
            .tickSize(height - 20)
            .tickFormat(function(d) {
                return d.toString();
            });
        svg.selectAll('.x-axis')
            // .attr("transform", "translate(0, 200)")
            .call(xAxis);


        let instBars = mainArea.selectAll('g')
            .data(data);

        instBars.exit().remove();

        let instBarsEnter = instBars.enter()
            .append('g');

        let instStage = instBars.merge(instBarsEnter).selectAll('rect')
            .data(function (d) { return d.events; });

        instStage.exit().remove();

        let instStageEnter = instStage.enter()
            .append('rect');
        
        instStage.merge(instStageEnter)
            .attr('x', function (d) {
                return xScale(d.time);
            })
            .attr('y', function (d) { return d.instCount * instHeight; })
            .attr('width', function (d) {
                return widthScale(d.endTime - d.time);
            })
            .attr('height', instHeight * 0.7)
            .style('fill', function (d) {
                if (d.time == 0) {
                    return null;
                }
                return stageColor(d.stage);
            })
            .style('stroke', function (d) {
                if (d.time == 0) {
                    return null;
                }
                switch (d.stage) {
                    case 2: case 5: case 7: case 9: case 11:
                        return '#888888';
                }
                return null;
            })
            .on("mouseover", function (d) {
                let content =
                    "wg: " + (d.inst.workgroup_id ? d.inst.workgroup_id : 0) +
                    ", wf: " + (d.inst.wavefront_id ? d.inst.wavefront_id : 0) +
                    ", simd: " + (d.inst.simd_id ? d.inst.simd_id : 0) +
                    "<br/>inst: " + d.inst.asm +
                    "<br/>stage: " + stageName(d.stage);
                tooltip.show()
                    .css({ left: d3.event.pageX, top: d3.event.pageY })
                    .html(content);
            })
            .on("mouseout", function (d) {
                tooltip.hide();
            })
            .on("click", function (d) {
                console.log(d);
            });

    }

    $(document).ready(function () {
        resize();
        $(window).resize(debouncer(function () {
            resize();
        }));

        // loadTraceData(0, 100);
        loadMinimapData();
    });

    var minimapData;

    function loadMinimapData() {
        $.ajax({
            url: 'minimap',
            method: 'GET',
            data: { num_samples: Math.floor(window.innerWidth / 2) },
            dataType: "json"
        }).done(function (data) {
            console.log(data);
            minimapData = data;
            renderMinimap(data);
        });
    }

    var minimapX;
    function renderMinimap() {
        let data = minimapData;
        let width = window.innerWidth;
        let height = 200;

        let svg = d3.select('#minimap').selectAll('svg')
            .attr('height', height)
            .attr('width', width);

        let startTime = data[0].start_time;
        let endTime = data[data.length - 1].end_time;
        minimapX = d3.scaleLinear()
            .domain([startTime, endTime])
            .range([0, width]);
        let widthScale = d3.scaleLinear()
            .domain([0, endTime - startTime])
            .range([0, width]);
        let xAxis = d3.axisTop(minimapX);

        let highestCount = 0;
        for (let i = 0; i < data.length; i++) {
            if (highestCount < data[i].count) {
                highestCount = data[i].count;
            }
        }
        let verticalScale = d3.scaleLinear()
            .domain([0, highestCount])
            .range([height, 0]);
        let yAxis = d3.axisRight(verticalScale);


        let minimapBars = svg.select('.main-area')
            .selectAll('rect')
            .data(data);

        let minimapBarsEnter = minimapBars.enter()
            .append('rect')
            .style('fill', '#ffd385');

        minimapBars.merge(minimapBarsEnter)
            .transition()
            .attr('x', function(d) {
                return minimapX(d.start_time);
            })
            .attr('y', function(d) {
                return verticalScale(d.count);
            })
            .attr('width', function(d) {
                return widthScale(d.end_time - d.start_time);
            })
            .attr('height', function(d) {
                return height - verticalScale(d.count);
            });

        
        let brush = d3.brushX()
            .extent([[0, 0], [width, height]])
            .on('end', brushed);
        svg.select('.brush')
            .call(brush)
            .call(brush.move, [width/10, width/5]);


        svg.selectAll('.x-axis')
            .attr("transform", "translate(0, 200)")
            .call(xAxis);
        svg.selectAll('.y-axis')
            .call(yAxis);
    }

    function brushed() {
        let s = d3.event.selection;
        let timeRange = s.map(minimapX.invert, minimapX);

        console.log(timeRange);

        loadTraceData(timeRange);
    }

    function debouncer( func , timeout ) {
        var timeoutID , timeout = timeout || 200;
        return function () {
            var scope = this , args = arguments;
            clearTimeout( timeoutID );
            timeoutID = setTimeout( function () {
                func.apply( scope , Array.prototype.slice.call( args ) );
            } , timeout );
        };
    }

    function resize() {
        let windowHeight = $(window).height();
        let windowWidth = $(window).width();

        $('#full-screen')
            .height(windowHeight)
            .width(windowWidth);

        $('#minimap')
            .height(200)
            .width(windowWidth);

        $('#pipeline-figure')
            .height(windowHeight - 200)
            .width(windowWidth);

        redrawMinimap();
    }

    function redrawMinimap() {
        // if (minimapData !== undefined) {
            // renderMinimap();
        loadMinimapData();
        // }
    }
})();