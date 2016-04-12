var linkLength = 70;
var linkLengthLong = 140;
var linkLengthShort = 15;
var links = [{
    source: "Languages",
    target: "JavaScript",
    type: "suit",
    color: "red",
    distance: linkLength
}, {
    source: "JavaScript",
    target: "Object Oriented JavaScript",
    type: "suit",
    color: "red",
    distance: linkLengthShort
}, {
    source: "Languages",
    target: "Java",
    type: "suit",
    color: "red",
    distance: linkLength
}, {
    source: "Languages",
    target: "SQL",
    type: "suit",
    color: "red",
    distance: linkLength
}, {
    source: "Web technologies",
    target: "HTML5",
    type: "resolved",
    color: "red",
    distance: linkLength
}, {
    source: "Web technologies",
    target: "XML",
    type: "resolved",
    color: "red",
    distance: linkLength
}, {
    source: "Web technologies",
    target: "DOM",
    type: "resolved",
    color: "red",
    distance: linkLength
}, {
    source: "Web technologies",
    target: "CSS3",
    type: "resolved",
    color: "red",
    distance: linkLength
}, {
    source: "Web technologies",
    target: "AJAX",
    type: "resolved",
    color: "red",
    distance: linkLength
}, {
    source: "Web technologies",
    target: "JSON",
    type: "resolved",
    color: "red",
    distance: linkLength
}, {
    source: "Web technologies",
    target: "HTTP",
    type: "resolved",
    color: "red",
    distance: linkLength
}, {
    source: "Web technologies",
    target: "MVC/MVP",
    type: "resolved",
    color: "red",
    distance: linkLength
}, {
    source: "JavaScript libraries",
    target: "AngularJS",
    type: "suit",
    color: "red",
    distance: linkLength
}, {
    source: "JavaScript libraries",
    target: "jQuery",
    type: "suit",
    color: "red",
    distance: linkLength
}, {
    source: "JavaScript libraries",
    target: "KnockoutJS",
    type: "suit",
    color: "red",
    distance: linkLength
}, {
    source: "JavaScript libraries",
    target: "Backbone.js",
    type: "suit",
    color: "red",
    distance: linkLength
}, {
    source: "JavaScript libraries",
    target: "Jasmine",
    type: "suit",
    color: "red",
    distance: linkLength
}, {
    source: "JavaScript libraries",
    target: "D3.js",
    type: "suit",
    color: "red",
    distance: linkLength
}, {
    source: "Java frameworks",
    target: "Hibernate",
    type: "suit",
    color: "red",
    distance: linkLength
}, {
    source: "Java frameworks",
    target: "Spring",
    type: "suit",
    color: "red",
    distance: linkLength
}, {
    source: "Java frameworks",
    target: "Guice",
    type: "suit",
    color: "red",
    distance: linkLength
}, {
    source: "Java frameworks",
    target: "Guava",
    type: "suit",
    color: "red",
    distance: linkLength
}, {
    source: "Java frameworks",
    target: "JAX-RS",
    type: "suit",
    color: "red",
    distance: linkLength
}, {
    source: "Java frameworks",
    target: "WebDriver",
    type: "suit",
    color: "red",
    distance: linkLength
}, {
    source: "Java frameworks",
    target: "JUnit",
    type: "suit",
    color: "red",
    distance: linkLength
}, {
    source: "",
    target: "Java frameworks",
    type: "suit",
    color: "red",
    distance: linkLengthLong
}, {
    source: "",
    target: "JavaScript libraries",
    type: "suit",
    color: "red",
    distance: linkLengthLong
}, {
    source: "",
    target: "Web technologies",
    type: "suit",
    color: "red",
    distance: linkLengthLong
}, {
    source: "",
    target: "Languages",
    type: "suit",
    color: "red",
    distance: linkLengthLong
}];

function createGraph(links, id) {
    var nodes = {};
    var color = d3.scale.category10();

    // Compute the distinct nodes from the links.
    links.forEach(function(link) {
        link.source = nodes[link.source] || (nodes[link.source] = {
            name: link.source
        });
        link.target = nodes[link.target] || (nodes[link.target] = {
            name: link.target
        });
    });

    var width = 700,
        height = 600;

    var force = d3.layout.force()
        .nodes(d3.values(nodes))
        .links(links)
        .size([width, height])
        .linkDistance(function(d) {
            return d.distance
        })
        .charge(-500)
        .on("tick", tick)
        .start();

    var svg = d3.select(id).append("svg")
        .attr("viewBox", "0, 0, 900, 600")
        .attr("preserveAspectRatio", "xMidYMid meet");

    var link = svg.selectAll(".link")
        .data(force.links())
        .enter().append("line")
        .attr("class", "link");

    var node = svg.selectAll(".node")
        .data(force.nodes())
        .enter().append("g")
        .attr("class", "node")
        .on("mouseover", mouseover)
        .on("mouseout", mouseout)
        .call(force.drag);

    //create round image
    var defs = svg.append("defs").attr("id", "imgdefs");

    var roundImagePattern = defs.append("pattern")
        .attr("id", "roundImagePattern")
        .attr("height", 1)
        .attr("width", 1)
        .attr("x", "0")
        .attr("y", "0");

    roundImagePattern.append("image")
        .attr("xlink:href", "images/me.png")
        .attr("x", function(d) {
            return 0;
        })
        .attr("y", function(d) {
            return 0;
        })
        .attr("height", 60)
        .attr("width", 60);

    node.append("circle")
        .attr("r", function(d) {
            if (d.name === "") {
                return 30;
            } else {
                return 9;
            }
        })
        .attr("fill", function(d) {
            if (d.name === "") {
                return "url(#roundImagePattern)";
            } else {
                return color(d.name);
            }
        });

    node.append("text")
        .attr("x", 12)
        .attr("dy", ".35em")
        .text(function(d) {
            return d.name;
        });

    function tick() {
        link
            .attr("x1", function(d) {
                return d.source.x;
            })
            .attr("y1", function(d) {
                return d.source.y;
            })
            .attr("x2", function(d) {
                return d.target.x;
            })
            .attr("y2", function(d) {
                return d.target.y;
            });

        node
            .attr("transform", function(d) {
                return "translate(" + d.x + "," + d.y + ")";
            });
    }

}
createGraph(links, "#graph");

function mouseover() {
    d3.select(this).select("circle").transition()
        .duration(750)
        .attr("r", function(d) {
            if (d.name !== "") {
                return 16;
            } else {
                return 30;
            }
        });
}

function mouseout() {
    d3.select(this).select("circle").transition()
        .duration(750)
        .attr("r", function(d) {
            if (d.name !== "") {
                return 8;
            } else {
                return 30;
            }
        });
}