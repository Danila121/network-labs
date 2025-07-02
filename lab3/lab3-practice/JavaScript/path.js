/* массив точек пути будет иметь следующий вид:
  [
    {x: координата, y: координата},
    {x: координата, y: координата},
    ...
  ]
*/
function createHeartPath() {
  const svg = d3.select("svg");
  const width = +svg.attr("width");
  const height = +svg.attr("height");
  const cx = width / 2;
  const cy = height / 2;
  const scale = Math.min(width, height) / 3;
  let points = [];

  for (let t = 0; t <= 2 * Math.PI; t += 0.02) {
    const r = 1 - Math.sin(t);
    const x = cx + scale * r * Math.cos(t);
    const y = cy + scale * r * Math.sin(t);
    points.push({ x, y });
  }
  return points;
}

let drawPath = () => {
  const points = createHeartPath();

  const line = d3.line()
    .x(d => d.x)
    .y(d => d.y);

  const svg = d3.select("svg");
  svg.selectAll("path.animation-path").remove();

  const path = svg.append("path")
    .attr("class", "animation-path")
    .attr("d", line(points))
    .attr("stroke", "none")
    .attr("fill", "none");

  return path;
}

function translateAlong(path) {
    const length = path.getTotalLength();
    return function () {
        return function (t) {
            const { x, y } = path.getPointAtLength(t * length);
            return `translate(${x},${y})`;
        }
    }
}