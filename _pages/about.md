---
permalink: /
title: ""
excerpt: "About me"
author_profile: true
redirect_from: 
  - /about/
  - /about.html
---

Bio
=====

I am a Ph.D. student in Computer Science at Purdue University, fortunately advised by Prof. [Ming Yin](http://mingyin.org/). 

Prior to Purdue, I received my Bachelor's degree in Computer Science and Statistics from the University of Illinois at Urbana-Champaign in 2019, advised by Prof. [Roxana Girju](https://linguistics.illinois.edu/directory/profile/girju) and Prof. [Richard Sowers](http://publish.illinois.edu/r-sowers/).

My research currently lies in the intersection of human-computer interaction and machine learning, mainly focusing on human-AI interaction and human-centered AI.

I am also broadly interested in computational social science, crowdsourcing, and behavioral science.

## Interactive Scatter Plot

```html
<!DOCTYPE html>
<html>
<head>
    <title></title>
    <style>
        body {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
        }
        .chart {
            width: 800px;
            height: 600px;
        }

        .dot {
            opacity: 0.7;
        }

        .dot:hover {
            opacity: 1;
        }

        .tooltip {
            position: absolute;
            padding: 8px;
            background-color: #f2f2f2;
            border: 1px solid #ccc;
            border-radius: 4px;
            pointer-events: none;
            font-size: 16px;
        }

        .x-axis text,
        .y-axis text {
            font-size: 14px;
        }
    </style>
</head>
<body>


<div class="container" style="align-content: center;alignment: center;align-items: center">
    <h1 style="alignment: center">Interactive Scatter Plot</h1>

    <svg class="chart"></svg>
    <div class="tooltip"></div>
</div>

<script src="https://d3js.org/d3.v7.min.js"></script>
<script>
    // Sample data
    const data = [
        { x: 0.8, y: 0.9, name: "CHI21",image:"./images/agreement.jpeg"},
        { x: 1.8, y: 1.1, name: "WWW22" ,image:"./images/predictTrust.png"},
        { x: 2.2, y: 0.9, name: "AAAI23",image:"./images/trustModel.png" },
        { x: 3, y: 2, name: "TRAIT@CHI23" ,image:"./images/secondOpinion.png"},
        { x: 1, y: 1.9, name: "CHI23",image:"./images/groupAI.png" },
        { x: 1, y: 2.2, name: "CSCW22",image:"./images/fakeNews.png" },

        // { x: 2, y: 1.0, name: "Element 2" },
        { x: 3.9, y: 1.0, name: "IJCAI23" ,image:"./images/attack.png"},
        { x: 4.2, y: 1.0, name: "AI&HCI@ICML23" ,image:"./images/weightAI.png"},

    ];

    // const width = 600 - margin.left - margin.right;
    // const height = 400 - margin.top - margin.bottom;
    //
    // const svg = d3.select(".chart")
    //     .attr("width", width + margin.left + margin.right)
    //     .attr("height", height + margin.top + margin.bottom);

    // Set up dimensions
    const width = 400;
    const height = 300;
    const margin = { top: 40, right: 40, bottom: 40, left: 40 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    // Create SVG element
    const svg = d3.select(".chart")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // Custom tick names with line breaks
    const customXTickNames = [
        "Empirical\nExamination",
        "Computational\nModeling",
        "Design\nApproaches",
        "Intelligent\nDesign",
    ];

    const customYTickNames = [
        "Internal\nSignals",
        "External\nSignals",
    ];

    // Create scales
    const xScale = d3.scaleLinear()
            .domain([0, 4])
            .range([0, innerWidth]);

    const yScale = d3.scaleLinear()
            .domain([0, 2])
            .range([innerHeight, 0]);

    // Color scale
    const colorScale = d3.scaleOrdinal(d3.schemeCategory10);

    // Create axes
    const xAxis = d3.axisBottom(xScale)
            .tickValues([0, 1, 2, 3, 4]) // Specify the tick values
            .tickFormat((d, i) => "") // Remove the default tick labels
            .tickSizeOuter(0); // Remove the outer tick lines

    const yAxis = d3.axisLeft(yScale)
            .tickValues([0, 1,2]) // Specify the tick values
            .tickFormat((d, i) => "") // Remove the default tick labels
            .tickSizeOuter(0); // Remove the outer tick lines

    // Append axes to SVG
    const xAxisGroup = svg.append("g")
            .attr("class", "x-axis")
            // .attr("width", innerWidth)
            .attr("transform", `translate(${margin.left}, ${height - margin.bottom})`)
            .call(xAxis);

    const yAxisGroup = svg.append("g")
            .attr("class", "y-axis")
            .attr("transform", `translate(${margin.left}, ${margin.top})`)
            .call(yAxis);

    // Create foreignObject elements for custom X-axis tick labels
    const xAxisTicks = xAxisGroup.selectAll(".tick");

    xAxisTicks.each(function(d, i) {
        const tick = d3.select(this);
        const tickName = customXTickNames[i-1];

        tick.select("text").remove();

        tick.append("foreignObject")
                .attr("width", 40)
                .attr("height", 40)
                .attr("x", -20)
                .attr("y", 10)
                .append("xhtml:div")
                .style("text-align", "center")
                .style("font-size", "10px")
                .style("font-weight", "bold")
                .html(tickName);
    });

    // Create foreignObject elements for custom Y-axis tick labels
    const yAxisTicks = yAxisGroup.selectAll(".tick");

    yAxisTicks.each(function(d, i) {
        const tick = d3.select(this);
        const tickName = customYTickNames[i-1];

        tick.select("text").remove();

        tick.append("foreignObject")
                .attr("width", 60)
                .attr("height", 60)
                .attr("x", -50)
                .attr("y", -20)
                .append("xhtml:div")
                .style("text-align", "center")
                .style("font-size", "10px")
                .style("font-weight", "bold")
                .html(tickName);
    });

    // Create robot icons


    svg.selectAll(".dot")
            .data(data)
            .enter()
            .append("image")
            .attr("class", "dot")
            .attr("x", d => xScale(d.x) - 8 + margin.left) // Adjust the x position for the icon
            .attr("y", d => yScale(d.y) - 8 + margin.top) // Adjust the y position for the icon
            .attr("width", 50) // Specify the width of the icon
            .attr("height", 50) // Specify the height of the icon
            .attr("xlink:href", (d,i)=>(d.image)) // Replace "robot-icon.svg" with the path to your robot icon file
            .style("opacity", 0.7)
            .on("mouseover", handleMouseOver)
            .on("mouseout", handleMouseOut);



    // Create tooltip
    const tooltip = d3.select(".tooltip");

    // Mouseover event handler
    function handleMouseOver(event, d) {

        var xPos = +d3.select(this).attr("x")
        var wid = +d3.select(this).attr("width");

        d3.select(this)
                .style("opacity", 1)
                .attr("x", xPos - 30).attr("width", wid + 30).attr("height",wid+30)
        // .attr("transform", "scale(2.0,2.0)");
        // .style("scale", 2);

        tooltip.style("opacity", 1)
                .style("left", `${event.pageX}px`)
                .style("top", `${event.pageY}px`)
                .html(`<strong>${d.name}</strong><br>`);
    }

    // Mouseout event handler
    function handleMouseOut(event, d) {
        var xPos = +d3.select(this).attr("x")
        var wid = +d3.select(this).attr("width");
        d3.select(this)
                .style("opacity", 0.7)
                .attr("x", xPos + 30).attr("width", wid -30 ).attr("height",-30);
        // .attr("transform", "scale(0.5,0.5)");

        // .style("scale",1.2);

        tooltip.style("opacity", 0);
    }
</script>
</body>
</html>

```

Replace the CSS styles and JavaScript code within the respective sections to customize the appearance and behavior of your scatter plot. You can also include any additional HTML elements or JavaScript code as needed.

To view the interactive scatter plot, you will need to render the Markdown file using a Markdown viewer or converter that supports rendering HTML and JavaScript.



Publications
====== 
(* indicates equal contribution)<br>

<strong>Give Weight to Human Reactions: Optimizing Complementary AI in Practical Human-AI Teams</strong><br>
Syed Hasan Amin Mahmood, **Zhuoran Lu**, and Ming Yin.<br>
The ICML Workshop on Artificial Intelligence & Human Computer Interaction (AI HCI), Hawaii, July 2023

<strong>Strategic Adversarial Attacks in AI-assisted Decision Making to Reduce Human Trust and Reliance</strong><br>
**Zhuoran Lu**\*, Zhuoyan Li\*, Chun-Wei Chiang, and Ming Yin.<br>
The 32nd International Joint Conference on Artificial Intelligence (IJCAI), Macao, August 2023

<strong>Does More Advice Help? The Effects of Second Opinions from Peers in AI-Assisted Decision Making</strong><br>
**Zhuoran Lu**, Dakuo Wang, and Ming Yin.<br>
The CHI Workshop on Trust and Reliance in AI-Assisted Tasks (TRAIT), Hamburg, May 2023

<strong>Are Two Heads Better Than One in AI-Assisted Decision Making? Comparing the Behavior and Performance of Groups and Individuals in Human-AI Collaborative Recidivism Risk Assessment</strong><br>
Chun-Wei Chiang, **Zhuoran Lu**, Zhuoyan Li, and Ming Yin.<br>
The 41st ACM Conference on Human Factors in Computing Systems (CHI), Hamburg, May 2023.

<strong>Modeling Human Trust and Reliance in AI-assisted Decision Making: A Markovian Approach</strong><span style="color:red"> [Oral]</span><br>
**Zhuoran Lu**\*, Zhuoyan Li\*, and Ming Yin.<br>
The 37th Conference on Artificial Intelligence (AAAI), Washington, D.C., February 2023.

<strong>The Effects of AI-based Credibility Indicators on the Detection and Spread of Misinformation under Social Influence</strong><span style="color:red"> [Best Paper Award]</span><br>
**Zhuoran Lu**, Patrick Li, Weilong Wang, and Ming Yin.<br>
The 25th ACM Conference on Computer-Supported Cooperative Work and Social Computing (CSCW), Online, November 2022<br>

<strong>Towards Better Detection of Biased Language with Scarce, Noisy, and Biased Annotations</strong> <br>
**Zhuoran Lu**\*, Zhuoyan Li\*, and Ming Yin.<br>
The 5th AAAI/ACM Conference on Artificial Intelligence, Ethics, and Society (AIES), Online, August 2022<br>

<strong>Will You Accept the AI Recommendation? Predicting Human Behavior in AI-Assisted Decision Making</strong> <br>
**Zhuoran Lu**\*, Xinru Wang\*, and Ming Yin <br>
The Web Conference (WWW), Online, April 2022.<br>

<strong>Human Reliance on Machine Learning Models When Performance Feedback is Limited: Heuristics and Risks</strong><br>
**Zhuoran Lu** and Ming Yin.<br>
The 39th ACM Conference on Human Factors in Computing Systems (CHI), Online, May 2021.

Teaching
====== 

CS373, Data Mining & Machine Learning<br>
Teaching Assistant, Fall 2021, Spring 2022, Purdue University<br>
Guest Lecturer, Spring 2022, Purdue University<br>

Experience
====== 

**Microsoft**, Redmond, WA<br>
Research Intern, Office of Applied Research<br>
May 2023 - August 2023<br>

**Honda Research Institute**, San Jose, CA<br>
Research Intern, Human-centered Intelligence Group<br>
January 2023 - April 2023<br>

Service
====== 
**Reviewer:**<br>
2024: ICWSM <br>
2023: ICWSM, CHI, IUI, IDC, MobileHCI, CogSci, CSCW, DIS, ISS, CUI, CHI PLAY, FAccT, UIST<br>
2022: DIS, CHI PLAY, NordiCHI, MobileHCI, Ubicomp, ISWC, ICMI, SUI, HAI<br>

**PC member**<br>
2023: Ubicomp/ISWC demos and posters<br>

Contact
=====

Office: Room 2149, 305 N. University St., Purdue University, West Lafayette, IN 47907

Email: lu800 [AT] purdue.edu

