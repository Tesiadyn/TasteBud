import React, { useEffect } from "react";
import * as d3 from "d3";

interface Data {
  name: string;
  value?: number;
  children?: Data[];
  current?: any;
}

interface NodeData {
  x0: number;
  x1: number;
  y0: number;
  y1: number;
  current?: {
    x0: number;
    x1: number;
    y0: number;
    y1: number;
  };
  target?: {
    x0: number;
    x1: number;
    y0: number;
    y1: number;
  };
}

const FlavourWheel: React.FC<{ data: Data }> = ({ data }) => {
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

    root.each((d) => ((d as any).current = d));

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
        while (d.depth > 1 && d.parent) d = d.parent;
        return color(d.data.name);
      })
      .attr("fill-opacity", (d) =>
        arcVisible((d as any).current) ? (d.children ? 0.6 : 0.4) : 0
      )
      .attr("pointer-events", (d) =>
        arcVisible((d as any).current) ? "auto" : "none"
      )
      .attr("d", (d) => arc((d as any).current));

    path
      .filter((d) => (d as any).children)
      .style("cursor", "pointer")
      .on("click", clicked);

    const format = d3.format(",d");
    path.append("title").text(
      (d) =>
        `${d
          .ancestors()
          .map((d) => d.data.name)
          .reverse()
          .join("/")}\n${format(d.value!)}`
    );

    const label = svg
      .selectAll("text")
      .data(root.descendants().slice(1))
      .join("text")
      .attr("dy", "0.35em")
      .attr("fill-opacity", (d) => +labelVisible((d as any).current))
      .attr("transform", (d) => labelTransform((d as any).current))
      .attr("pointer-events", "none")
      .text((d) => d.data.name);

    const parent = svg
      .append("circle")
      .datum(root)
      .attr("r", radius)
      .attr("fill", "none")
      .attr("pointer-events", "all")
      .on("click", clicked);

    function clicked(_event: React.MouseEvent, p: any) {
      parent.datum(p.parent || root);

      root.each(
        (d) =>
          ((d as any).target = {
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
          const i = d3.interpolate((d as any).current, (d as any).target);
          return (t) => ((d as any).current = i(t));
        })

        .attr("fill-opacity", (d) =>
          arcVisible((d as any).target) ? (d.children ? 0.6 : 0.4) : 0
        )
        .attr("pointer-events", (d) =>
          arcVisible((d as any).target) ? "auto" : "none"
        )
        .attrTween("d", function (d: d3.HierarchyRectangularNode<Data>) {
          const interpolate = d3.interpolate(
            (d as any).current as any,
            (d as any).target as any
          );
          return function (t: number): string {
            return arc(interpolate(t)!) as string;
          };
        })
        .on("end", function (d) {
          // Hide non-visible elements after transition
          if (!arcVisible((d as any).target)) {
            d3.select(this).attr("fill-opacity", 0);
          }
        });

      label
        .transition(t)
        .attr("fill-opacity", (d) => +labelVisible((d as any).target))
        .attrTween("transform", (d) => () => labelTransform((d as any).current))
        .on("end", function (d) {
          // Hide non-visible elements after transition
          if (!labelVisible((d as any).target)) {
            d3.select(this).attr("fill-opacity", 0);
          }
        });
    }

    function arcVisible(d: NodeData) {
      return d.y1 <= 3 && d.y0 >= 1 && d.x1 > d.x0;
    }

    function labelVisible(d: NodeData) {
      return d.y1 <= 3 && d.y0 >= 1 && (d.y1 - d.y0) * (d.x1 - d.x0) > 0.03;
    }

    function labelTransform(d: NodeData) {
      const x = (((d.x0 + d.x1) / 2) * 180) / Math.PI;
      const y = ((d.y0 + d.y1) / 2) * radius;
      return `rotate(${x - 90}) translate(${y},0) rotate(${x < 180 ? 0 : 180})`;
    }
  }, [data]);

  return <svg ref={svgRef} width={500} height={500}></svg>;
};

export default FlavourWheel;
