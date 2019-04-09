var dataP = d3.json("practice.json")

dataP.then(function(d) {
  printOut(d);
  createButtons(d.subjects);
  drawHistogram();
},
function(err) {
  console.log(err);
});

var printOut = function(dataset) {
  // 1.
  console.log("all colors:");
  console.log(dataset.colors);

  //2.
  console.log("first color:");
  console.log(dataset.colors[0]);

  //3.
  console.log("fred's age:", dataset.subjects[1].age);

  //4.
  var heaviest = d3.max(dataset.subjects, function(d) {
      return d.weight;
  });
  console.log("heaviest:", heaviest);

  //6.
  var mean_weights = d3.mean(dataset.subjects, function(d) {
    return d.weight;
  });
  console.log("mean of weights:", mean_weights);

  //7.
  var mapped = dataset.subjects.map(function(d) {
    return d.weight;
  });
  console.log("mapped array:", mapped);

  var sorted = dataset.subjects.sort(function(a, b) {
    return (a.weight - b.weight);
  });
  console.log("sort method:", sorted[sorted.length - 1].name);

}

var createButtons = function(d) {
  d3.select("body")
    .selectAll("button")
    .data(d)
    .enter()
    .append("button")
    .text(function(d) {
      return d.name;
    })
    .on("click", function(d) {
      alert("weight: " + d.weight)
    })

}

var drawHistogram = function() {
  var data = [15,18,18,20,10,3,11,1,8,11]

  var xScale = d3.scaleLinear()
                .domain([1,21])
                .range([0,300]);
  var yScale = d3.scaleLinear()
                 .domain([0,data.length])
                 .range([0,300]);


  var binMaker = d3.histogram()
                  .domain(xScale.domain())
                  .thresholds(xScale.ticks(4));


  var bins = binMaker(data);
  console.log("hi", bins);


  var colors = d3.scaleOrdinal(d3.schemeSet2);

  var svg = d3.select("svg")
  var barArea = svg.append("g")
    .selectAll("rect")
    .data(bins)
    .enter()
    .append("rect")
    .attr("x",function(d,i){
      //console.log("hi");
      return xScale(d.x0);
    })
    .attr("y",function(d){
      console.log(yScale(d.length));
    return yScale(d.length);})
    .attr("width",100/4)
    .attr("height",function(d){
      return  300 - yScale(d.length);})
    .attr("fill",function(d){
      return colors(d.length);
    });
}
