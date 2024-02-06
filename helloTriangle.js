function showError(errorText) {
  const errorBoxDiv = document.getElementById('error-box');
  const errorSpan = document.createElement('p');
  errorSpan.innerText = errorText;
  errorBoxDiv.appendChild(errorSpan);
  console.error(errorText);
}
function hexagon(){
const canvas = document.getElementById('IDcanvas');
const gl = canvas.getContext('webgl2');

    const hexagonVertices = [
        -0.4, 0.9,
        0.4, 0.9,
        0.9, 0,
        0.4, -0.9,
        -0.4, -0.9,
        -0.9, 0
    ];

const hexagonCpuBuffer = new Float32Array(hexagonVertices);

const hexagonGpuBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, hexagonGpuBuffer);
gl.bufferData(gl.ARRAY_BUFFER, hexagonCpuBuffer, gl.STATIC_DRAW);

const vertexShaderSourceCode = `#version 300 es
precision mediump float;

in vec2 hexagonVertex;

void main(){
    gl_Position = vec4(hexagonVertex, 0.0, 1.0);
}`;

const vertexShader = gl.createShader(gl.VERTEX_SHADER);
gl.shaderSource(vertexShader, vertexShaderSourceCode);
gl.compileShader(vertexShader);

const fragmentShaderSourceCode = `#version 300 es
precision mediump float;

out vec4 outputColor;

void main(){
    outputColor = vec4(1.0, 0.0, 0.0, 1.0);
}`;

const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
gl.shaderSource(fragmentShader, fragmentShaderSourceCode);
gl.compileShader(fragmentShader);

const hexagonProgram = gl.createProgram();
gl.attachShader(hexagonProgram, vertexShader);
gl.attachShader(hexagonProgram, fragmentShader);
gl.linkProgram(hexagonProgram);

const vertexPositionAttributeLocation = gl.getAttribLocation(hexagonProgram, 'hexagonVertex');

//output merger
canvas.width = canvas.clientWidth;
canvas.height = canvas.clientHeight;

gl.clearColor(0.0, 0.0, 0.0, 1.0);
gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

gl.viewport(0, 0, canvas.width, canvas.height);
gl.useProgram(hexagonProgram);

gl.enableVertexAttribArray(vertexPositionAttributeLocation);

gl.vertexAttribPointer(vertexPositionAttributeLocation, 2, gl.FLOAT, false, 0, 0);

gl.drawArrays(gl.TRIANGLES_FAN, 0, 6);
}

try {
    hexagon();
} catch (e) {
    showError("js error" + e);
}
