let filename = 'data/total.csv';

d3.csv(filename).then(function(data) {
  // Declare the chart dimensions and margins.
  const width = 800;
  const height = 800;
  const innerRadius = 160;
  const radius = Math.min(width, height) / 2;

  const x = d3.scaleBand()
   .domain(data.map(d => d.arts))
   .range([0, 2 * Math.PI])
   .padding(0.1);

  const y = d3.scaleLinear()
   .domain([0, 50])
   .range([innerRadius, radius]);

  // Create an arc generator
  const arc = d3.arc()
      .innerRadius(innerRadius)
      .outerRadius((d) => y(d.percentage))
      .startAngle((d) => x(d.arts))
      .endAngle((d) => x(d.arts) + x.bandwidth());

  // Create the SVG container.
  const svg = d3.create("svg")
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [-width / 2, -height / 2, width, height])
      .attr("style", "max-width: 100%; max-height: 100%;");

  const title = svg.append("text")
    .text("CREATIVE") 
    .attr("text-anchor", "middle")
    .attr("dy", "0em") 
    .attr("id", "title-text");

  const subtitle = svg.append("text")
    .text("Pastimes & Professions") 
    .attr("text-anchor", "middle")
    .attr("dy", "1em") 
    .attr("id", "subtitle-text");

  const customTip = svg.append("text")
    .attr("id","custom-tip")
    .attr("text-anchor", "middle")
    .style("display", "none")
    .attr("dy", "3em") 
    .attr("style", "max-width: 50%; height: auto;")
    .attr("class", "subtitle-text");


  const labelPositions = {
    "Literary": 50,
    "Performing": 180,
    "Visual": 320,
  };

  svg.append("g")
    .attr("text-anchor", "middle")
    .call(g => g.selectAll("g")
      .data(Object.entries(labelPositions))
      .enter().append("g")
        .attr("transform", ([label, position]) => `
          rotate(${position})
          translate(${innerRadius},0)
        `)
        .call(g => g.append("text")
          .attr("class",([label])=>`small-text ${label.toLowerCase()}`)
          .attr("transform", "rotate(90)")
          .attr("dy", "1.5em")
          .text(([label]) => label)
        )
    );

    const tooltip = $('#tooltip');

  // Add an arc for each data point.
  svg.selectAll("path")
      .data(data)
      .join("path")
      .attr("d", arc)
      .attr("fill", "steelblue")
      .attr("data-x", (d) => d.arts)
      .attr("data-y", (d) => d.percentage)
      .attr("class", (d) => `${d.type}`)
      .on("mouseover", (event, d) => {
        timeout = setTimeout(() => {
          const tooltipContent = `${d.percentage}% ${d.arts}`;
          tooltip.html(tooltipContent);
          var x = event.pageX + 10;
          var y = event.pageY - 10;
          tooltip.css({top: y, left: x}).show();

          const titleContent = 'PASTIME';
          title.html(titleContent);
          const subtitleContent = `Percentage of Participation`;
          subtitle.html(subtitleContent);
          //const customTipContent = `${d.percentage}% ${d.arts}`;
          //customTip.html(customTipContent).style("display", "inline-block");
        }, 200);
      })
      .on("mouseout", (event) => {
          clearTimeout(timeout);
          tooltip.hide();
          customTip.style("display", "none");
          const titleContent = 'CREATIVE';
          title.html(titleContent);
          const subtitleContent = 'Pastimes & Professions';
          subtitle.html(subtitleContent);
      });

  
  document.getElementById('chart5').append(svg.node());


});