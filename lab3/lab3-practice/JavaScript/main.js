document.addEventListener("DOMContentLoaded", () => {
  const svg = d3.select("svg").attr("width", 600).attr("height", 600);
  const form = document.getElementById("setting");

  const drawBtn = document.getElementById("drawBtn");
  const clearBtn = document.getElementById("clearBtn");
  const animBtn = document.getElementById("animBtn");

  const enableAnim = document.getElementById("enableAnim");
  const enablePath = document.getElementById("enablePath");

  const easingSelect = document.getElementById("easing");
  const pathSelect = document.getElementById("pathSelect");

  const pathCheckboxWrap = document.getElementById("pathCheckboxWrap");
  const coordBlock = document.getElementById("coordBlock");

  const animSettingsDiv = document.getElementById("animSettings");

  const finalFields = [
    "cx_to_wrap",
    "cy_to_wrap",
    "scaleX_to_wrap",
    "scaleY_to_wrap",
    "rotate_to_wrap",
  ].map(id => document.getElementById(id));

  function toggleAnimationFields(show) {
    finalFields.forEach(el => el.style.display = show ? "" : "none");
    animSettingsDiv.style.display = show ? "" : "none";
    pathCheckboxWrap.style.display = show ? "" : "none";

    drawBtn.style.display = show ? "none" : "";
    animBtn.style.display = show ? "" : "none";

    if (!show) {
      enablePath.checked = false;
      pathSelect.style.display = "none";
      coordBlock.style.display = "";
    }
  }

  function togglePathFields(usePath) {
    pathSelect.style.display = usePath ? "" : "none";
    coordBlock.style.display = usePath ? "none" : "";
  }

  clearBtn.addEventListener("click", () => {
    svg.selectAll("*").remove();
  });

  drawBtn.addEventListener("click", () => {
    draw(form);
  });

  animBtn.addEventListener("click", () => {
    runAnimation(form);
  });

  enableAnim.addEventListener("change", (e) => {
    toggleAnimationFields(e.target.checked);
  });

  enablePath.addEventListener("change", (e) => {
    togglePathFields(e.target.checked);
  });

  toggleAnimationFields(false);
});

function draw(dataForm) {
  const svg = d3.select("svg");
  let pict = drawSkyscraper(svg); 

  const cx = dataForm.cx.value;
  const cy = dataForm.cy.value;
  const scaleX = dataForm.scaleX.value;
  const scaleY = dataForm.scaleY.value;
  const rotate = dataForm.rotate.value;

  pict.attr(
    "transform",
    `translate(${cx},${cy}) scale(${scaleX},${scaleY}) rotate(${rotate})`
  );
}

function runAnimation(dataForm) {
  const svg = d3.select("svg");
  let pict = drawSkyscraper(svg);

  const easingName = dataForm.easing.value;
  const easingFunc = d3[easingName] || d3.easeLinear;

  const moveAlongPath = dataForm.enablePath.checked;

  const duration = +dataForm.duration?.value || 6000;

  if (!moveAlongPath) {
    const cxStart = +dataForm.cx.value;
    const cyStart = +dataForm.cy.value;
    const scaleXStart = +dataForm.scaleX.value;
    const scaleYStart = +dataForm.scaleY.value;
    const rotateStart = +dataForm.rotate.value;

    const cxEnd = +dataForm.cx_to.value;
    const cyEnd = +dataForm.cy_to.value;
    const scaleXEnd = +dataForm.scaleX_to.value;
    const scaleYEnd = +dataForm.scaleY_to.value;
    const rotateEnd = +dataForm.rotate_to.value;

    pict
      .attr(
        "transform",
        `translate(${cxStart},${cyStart}) scale(${scaleXStart},${scaleYStart}) rotate(${rotateStart})`
      )
      .transition()
      .duration(duration)
      .ease(easingFunc)
      .attr(
        "transform",
        `translate(${cxEnd},${cyEnd}) scale(${scaleXEnd},${scaleYEnd}) rotate(${rotateEnd})`
      );
  } else {
    const typePath = +dataForm.path.value;
    const path = drawPath(typePath);

    pict
      .transition()
      .duration(duration)
      .ease(easingFunc)
      .attrTween("transform", translateAlong(path.node()));
  }
}
