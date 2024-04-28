import React, { useRef, useEffect } from "react";
import * as d3 from "d3";

interface Data {
  name: string;
  value?: number;
  children?: Data[];
  current? : any;
}

const HierarchicalChart: React.FC<{ data: Data }> = ({ data }) => {
  const svgRef = React.useRef<SVGSVGElement>(null);
  

  useEffect(() => {
    const width = 500;
    const height = width;
    const radius = width / 6;

    const color = d3.scaleOrdinal(
      d3.quantize(
        d3.interpolateRainbow,
        (data.children && data.children.length) || 1 + 1
      )
    );

    const hierarchy: d3.HierarchyNode<Data> = d3
      .hierarchy<Data>(data)
      .sum((d) => d.value ?? 0)
      .sort((a, b) => b.value! - a.value!);

    const root = d3.partition<Data>().size([2 * Math.PI, hierarchy.height + 1])(
      hierarchy
    );

    root.each((d) => (d.current = d));

    const arc = d3
      .arc<d3.HierarchyRectangularNode<Data>>()
      .startAngle((d) => d.x0)
      .endAngle((d) => d.x1)
      .padAngle((d) => Math.min((d.x1 - d.x0) / 2, 0.005))
      .padRadius(radius * 1.5)
      .innerRadius((d) => d.y0 * radius)
      .outerRadius((d) => Math.max(d.y0 * radius, d.y1 * radius - 1));

    const svg = d3
      .select(svgRef.current)
      .selectAll("g")
      .data([null])
      .join("g")
      .attr("transform", `translate(${width / 2},${height / 2})`);

    const path = svg
      .selectAll("path")
      .data(root.descendants().slice(1))
      .join("path")
      .attr("fill", (d) => {
        while (d.depth > 1) d = d.parent;
        return color(d.data.name);
      })
      .attr("fill-opacity", (d) =>
        arcVisible(d.current) ? (d.children ? 0.6 : 0.4) : 0
      )
      .attr("pointer-events", (d) => (arcVisible(d.current) ? "auto" : "none"))
      .attr("d", (d) => arc(d.current));

    path
      .filter((d) => d.children)
      .style("cursor", "pointer")
      .on("click", clicked);

    const format = d3.format(",d");
    path.append("title").text(
      (d) =>
        `${d
          .ancestors()
          .map((d) => d.data.name)
          .reverse()
          .join("/")}\n${format(d.value)}`
    );

    const label = svg
      .selectAll("text")
      .data(root.descendants().slice(1))
      .join("text")
      .attr("dy", "0.35em")
      .attr("fill-opacity", (d) => +labelVisible(d.current))
      .attr("transform", (d) => labelTransform(d.current))
      .attr("pointer-events", "none")
      .text((d) => d.data.name);

    const parent = svg
      .append("circle")
      .datum(root)
      .attr("r", radius)
      .attr("fill", "none")
      .attr("pointer-events", "all")
      .on("click", clicked);

    function clicked(event, p) {
      parent.datum(p.parent || root);

      root.each(
        (d) =>
          (d.target = {
            x0:
              Math.max(0, Math.min(1, (d.x0 - p.x0) / (p.x1 - p.x0))) *
              2 *
              Math.PI,
            x1:
              Math.max(0, Math.min(1, (d.x1 - p.x0) / (p.x1 - p.x0))) *
              2 *
              Math.PI,
            y0: Math.max(0, d.y0 - p.depth),
            y1: Math.max(0, d.y1 - p.depth),
          })
      );

      const t = svg.transition().duration(750);

      path
        .transition(t)
        .tween("data", (d) => {
          const i = d3.interpolate(d.current, d.target);
          return (t) => (d.current = i(t));
        })
        .filter(function (d) {
          return +this.getAttribute("fill-opacity") || arcVisible(d.target);
        })
        .attr("fill-opacity", (d) =>
          arcVisible(d.target) ? (d.children ? 0.6 : 0.4) : 0
        )
        .attr("pointer-events", (d) => (arcVisible(d.target) ? "auto" : "none"))
        .attrTween("d", (d) => () => arc(d.current))
        .on("end", function (d) {
          // Hide non-visible elements after transition
          if (!arcVisible(d.target)) {
            d3.select(this).attr("fill-opacity", 0);
          }
        });

      label
        .transition(t)
        .attr("fill-opacity", (d) => +labelVisible(d.target))
        .attrTween("transform", (d) => () => labelTransform(d.current))
        .on("end", function (d) {
          // Hide non-visible elements after transition
          if (!labelVisible(d.target)) {
            d3.select(this).attr("fill-opacity", 0);
          }
        });
    }

    function arcVisible(d) {
      return d.y1 <= 3 && d.y0 >= 1 && d.x1 > d.x0;
    }

    function labelVisible(d) {
      return d.y1 <= 3 && d.y0 >= 1 && (d.y1 - d.y0) * (d.x1 - d.x0) > 0.03;
    }

    function labelTransform(d) {
      const x = (((d.x0 + d.x1) / 2) * 180) / Math.PI;
      const y = ((d.y0 + d.y1) / 2) * radius;
      return `rotate(${x - 90}) translate(${y},0) rotate(${x < 180 ? 0 : 180})`;
    }
  }, [data]);

  return <svg ref={svgRef} width={750} height={750}></svg>; // 設置 SVG 容器的寬度和高度
};

export default HierarchicalChart;
