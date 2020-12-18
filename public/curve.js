function createCurve() {
  return $(
    `<svg class="curve" xmlns="http://www.w3.org/2000/svg" x1="0" y1="0" x2="10" y2="10">
        <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%" spreadMethod="pad">
            <stop offset="0%"   stop-color="#888" stop-opacity="1"/>
            <stop offset="50%" stop-color="#444" stop-opacity="1"/>
            <stop offset="100%" stop-color="#888" stop-opacity="1"/>
        </linearGradient>

        <path d="M 10 10 C 20 20, 40 20, 50 10" />
    </svg>`
  );
}

function redrawCurve(curve) {
  const { from, to, rectangle, margin } = getCurveParameters(curve);

  const width = Math.abs(rectangle.right - rectangle.left);
  curve.attr("width", margin + width + margin);

  const height = Math.abs(rectangle.bottom - rectangle.top);
  curve.attr("height", margin + height + margin);

  const path = curve.find("path");

  const pathCode = `M ${margin + (from.point.x - rectangle.left)} ${
    margin + (from.point.y - rectangle.top)
  } C ${margin + (from.shoot.x - rectangle.left)} ${margin + (from.shoot.y - rectangle.top)}, ${
    margin + (to.shoot.x - rectangle.left)
  } ${margin + (to.shoot.y - rectangle.top)}, ${margin + (to.point.x - rectangle.left)} ${
    margin + (to.point.y - rectangle.top)
  }`;

  if (path.attr("d") !== pathCode) {
    path.attr("d", pathCode);
  }

  return {
    x: rectangle.left - margin,
    y: rectangle.top - margin,
  };
}
function getCurveParameters(curve) {
  const fromPoint = {
    x: parseFloat(curve.attr("x1")),
    y: parseFloat(curve.attr("y1")),
  };
  const fromShoot = {
    x: fromPoint.x + (parseFloat(curve.attr("s1")) || 100),
    y: fromPoint.y + (parseFloat(curve.attr("t1")) || 0),
  };

  const toPoint = {
    x: parseFloat(curve.attr("x2")),
    y: parseFloat(curve.attr("y2")),
  };
  const toShoot = {
    x: toPoint.x + (parseFloat(curve.attr("s2")) || -100),
    y: toPoint.y + (parseFloat(curve.attr("t2")) || 0),
  };

  const points = [fromPoint, fromShoot, toShoot, toPoint];
  const rectangle = {
    left: Math.min(...points.map((t) => t.x)),
    right: Math.max(...points.map((t) => t.x)),
    top: Math.min(...points.map((t) => t.y)),
    bottom: Math.max(...points.map((t) => t.y)),
  };

  return {
    from: {
      point: fromPoint,
      shoot: fromShoot,
    },
    to: {
      point: toPoint,
      shoot: toShoot,
    },
    rectangle,
    margin: 5,
  };
}

function getCurvedPoint(curve, proportion) {
  const { from, to, rectangle, margin } = getCurveParameters(curve);

  const inverseProportion = 1 - proportion;

  const x =
    inverseProportion * inverseProportion * inverseProportion * from.point.x +
    3 * inverseProportion * inverseProportion * proportion * from.shoot.x +
    3 * inverseProportion * proportion * proportion * to.shoot.x +
    proportion * proportion * proportion * to.point.x;

  const y =
    inverseProportion * inverseProportion * inverseProportion * from.point.y +
    3 * inverseProportion * inverseProportion * proportion * from.shoot.y +
    3 * inverseProportion * proportion * proportion * to.shoot.y +
    proportion * proportion * proportion * to.point.y;

  return {
    x: margin + x - rectangle.left,
    y: margin + y - rectangle.top,
  };
}
