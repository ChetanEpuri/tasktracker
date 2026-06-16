import React, { useRef, useEffect, useState, useCallback } from "react";

// Liquid Image Hover Effect with Color Reveal and Hotspots
// Real-time water-like displacement, grayscale-to-color reveal, persistent hotspots.
export default function LiquidImage(props: any) {
  const {
    image = "https://images.unsplash.com/photo-1544413660-299165566b1d?q=80&w=2574&auto=format&fit=crop",
    strength = 0.15,
    speed = 0.18,
    fit = "cover",
    style,
    hotspots = [],
    borderRadius = 24
  } = props;

  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const offCanvasRef = useRef<HTMLCanvasElement | null>(null);
  
  const [size, setSize] = useState({ width: 400, height: 300 });
  const sizeRef = useRef({ width: 400, height: 300 });
  const dprRef = useRef(1);
  const fitRef = useRef(fit);
  fitRef.current = fit;

  const mouseRef = useRef({ x: -10, y: -10, active: false });
  const maskRadiusRef = useRef(0);
  const wakeRef = useRef<any[]>([]);
  const hotspotsRef = useRef(hotspots);
  const hoveredRef = useRef(false);

  useEffect(() => { hotspotsRef.current = hotspots; }, [hotspots]);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    
    const measure = () => {
      let dpr = 1;
      if (typeof window !== "undefined") {
        dpr = window.devicePixelRatio || 1;
      }
      dprRef.current = dpr;
      const rect = el.getBoundingClientRect();
      const w = Math.max(1, Math.round(rect.width * dpr));
      const h = Math.max(1, Math.round(rect.height * dpr));
      sizeRef.current = { width: w, height: h };
      setSize(prev => prev.width === w && prev.height === h ? prev : { width: w, height: h });
    };
    
    measure();
    if (typeof window !== "undefined" && typeof window.ResizeObserver !== "undefined") {
      const ro = new window.ResizeObserver(measure);
      ro.observe(el);
      window.addEventListener("resize", measure);
      return () => {
        ro.disconnect();
        window.removeEventListener("resize", measure);
      };
    }
    
    if (typeof window !== "undefined") {
      window.addEventListener("resize", measure);
      return () => window.removeEventListener("resize", measure);
    }
    return () => {};
  }, []);

  const handleMove = useCallback((e: any) => {
    if (!canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    let x, y;
    if (e.touches && e.touches.length > 0) {
      x = (e.touches[0].clientX - rect.left) / rect.width;
      y = (e.touches[0].clientY - rect.top) / rect.height;
    } else {
      x = (e.clientX - rect.left) / rect.width;
      y = (e.clientY - rect.top) / rect.height;
    }
    x = Math.max(0, Math.min(1, x));
    y = Math.max(0, Math.min(1, y));
    mouseRef.current = { x, y, active: true };
    hoveredRef.current = true;
    const now = Date.now();
    wakeRef.current = [...wakeRef.current.filter(w => now - w.t < 1200), { x, y, t: now }].slice(-8);
  }, []);

  const handleLeave = useCallback(() => {
    mouseRef.current = { ...mouseRef.current, active: false };
    hoveredRef.current = false;
  }, []);

  useEffect(() => {
    let animId: number;
    let lastHovered = false;
    let start: number | null = null;
    let from = 0;
    let to = 0;
    let duration = 650;
    
    function easeInOutCubic(t: number) {
      return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }
    
    function animate(ts: number) {
      const hovered = hoveredRef.current;
      if (hovered !== lastHovered) {
        lastHovered = hovered;
        start = ts;
        from = maskRadiusRef.current;
        to = hovered ? 1.5 : 0;
      }
      if (start === null) start = ts;
      const elapsed = Math.min((ts - start) / duration, 1);
      const eased = easeInOutCubic(elapsed);
      maskRadiusRef.current = from + (to - from) * eased;
      
      if (elapsed < 1) {
        animId = requestAnimationFrame(animate);
      } else {
        maskRadiusRef.current = to;
        animId = requestAnimationFrame(animate);
      }
    }
    animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, []);

  useEffect(() => {
    if (!canvasRef.current) return;
    const initialDpr = dprRef.current || 1;
    const initialSize = sizeRef.current;
    
    canvasRef.current.width = initialSize.width;
    canvasRef.current.height = initialSize.height;
    canvasRef.current.style.width = initialSize.width / initialDpr + "px";
    canvasRef.current.style.height = initialSize.height / initialDpr + "px";
    
    let appliedW = initialSize.width;
    let appliedH = initialSize.height;
    let gl = canvasRef.current.getContext("webgl");
    if (!gl) return;
    
    let animationId: number;
    let img = new window.Image();
    img.crossOrigin = "anonymous";
    img.src = image;
    
    let tex: WebGLTexture | null, program: WebGLProgram, uTime: WebGLUniformLocation | null, uMouse: WebGLUniformLocation | null, uStrength: WebGLUniformLocation | null, uSpeed: WebGLUniformLocation | null, uResolution: WebGLUniformLocation | null, uWake: WebGLUniformLocation | null, uWakeCount: WebGLUniformLocation | null, uMaskRadius: WebGLUniformLocation | null;
    let startTime = Date.now();
    let loaded = false;

    const vs = `
      attribute vec2 a_position;
      varying vec2 v_uv;
      void main() {
          v_uv = a_position * 0.5 + 0.5;
          gl_Position = vec4(a_position, 0, 1);
      }
    `;

    const fs = `
      precision highp float;
      varying vec2 v_uv;
      uniform sampler2D u_image;
      uniform vec2 u_mouse;
      uniform float u_time;
      uniform float u_strength;
      uniform float u_speed;
      uniform vec2 u_resolution;
      #define MAX_WAKE 16
      uniform int u_wakeCount;
      uniform vec3 u_wake[MAX_WAKE];
      uniform float u_maskRadius;
      void main() {
          vec2 uv = v_uv;
          float total = 0.0;
          for (int i = 0; i < MAX_WAKE; ++i) {
              if (i >= u_wakeCount) break;
              vec2 w = u_wake[i].xy;
              float t = u_time - u_wake[i].z;
              float dist = distance(uv, w);
              float amp = exp(-dist * 16.0) * exp(-t * 1.2);
              float ripple = sin(32.0 * dist - t * 8.0 * u_speed) * 0.04;
              uv += normalize(uv - w) * ripple * u_strength * amp * 2.0;
          }
          if (u_mouse.x >= 0.0 && u_mouse.x <= 1.0 && u_mouse.y >= 0.0 && u_mouse.y <= 1.0) {
              float dist = distance(uv, u_mouse);
              float ripple = sin(32.0 * dist - u_time * 8.0 * u_speed) * 0.04;
              float effect = exp(-dist * 12.0);
              uv += normalize(uv - u_mouse) * ripple * u_strength * effect * 2.0;
          }
          uv = clamp(uv, 0.0, 1.0);
          vec4 color = texture2D(u_image, uv);
          float gray = dot(color.rgb, vec3(0.299, 0.587, 0.114));
          vec3 grayColor = vec3(gray);
          float mask = 0.0;
          float maskRadius = u_maskRadius;
          if (u_mouse.x >= 0.0 && u_mouse.x <= 1.0 && u_mouse.y >= 0.0 && u_mouse.y <= 1.0 && maskRadius > 0.0) {
              float d = distance(uv, u_mouse);
              mask = max(mask, smoothstep(maskRadius, maskRadius * 0.8, d));
          }
          for (int i = 0; i < MAX_WAKE; ++i) {
              if (i >= u_wakeCount) break;
              vec2 w = u_wake[i].xy;
              float d = distance(uv, w);
              mask = max(mask, smoothstep(maskRadius, maskRadius * 0.8, d));
          }
          vec3 finalColor = mix(grayColor, color.rgb, mask);
          gl_FragColor = vec4(finalColor, color.a);
      }
    `;

    function createShader(type: number, src: string) {
      if (!gl) return null;
      let s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    }

    function createProgram(vshader: WebGLShader, fshader: WebGLShader) {
      if (!gl) return null;
      let p = gl.createProgram()!;
      gl.attachShader(p, vshader);
      gl.attachShader(p, fshader);
      gl.linkProgram(p);
      return p;
    }

    function setup() {
      if (!gl) return;
      let vshader = createShader(gl.VERTEX_SHADER, vs)!;
      let fshader = createShader(gl.FRAGMENT_SHADER, fs)!;
      program = createProgram(vshader, fshader)!;
      gl.useProgram(program);

      let pos = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, pos);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
      let loc = gl.getAttribLocation(program, "a_position");
      gl.enableVertexAttribArray(loc);
      gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

      uTime = gl.getUniformLocation(program, "u_time");
      uMouse = gl.getUniformLocation(program, "u_mouse");
      uStrength = gl.getUniformLocation(program, "u_strength");
      uSpeed = gl.getUniformLocation(program, "u_speed");
      uResolution = gl.getUniformLocation(program, "u_resolution");
      uWake = gl.getUniformLocation(program, "u_wake");
      uWakeCount = gl.getUniformLocation(program, "u_wakeCount");
      uMaskRadius = gl.getUniformLocation(program, "u_maskRadius");

      tex = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
      gl.activeTexture(gl.TEXTURE0);
      gl.uniform1i(gl.getUniformLocation(program, "u_image"), 0);
      loaded = true;
    }

    function getOffscreen(w: number, h: number) {
      let off = offCanvasRef.current;
      if (!off) {
        off = document.createElement("canvas");
        offCanvasRef.current = off;
      }
      if (off.width !== w || off.height !== h) {
        off.width = w;
        off.height = h;
      }
      return off;
    }

    img.onload = () => {
      setup();
      render();
    };

    function updateTexture() {
      if (!tex || !gl) return;
      gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
      let offW = sizeRef.current.width;
      let offH = sizeRef.current.height;
      let off = getOffscreen(offW, offH);
      let ctx = off.getContext("2d")!;
      let sourceEl = img;
      let iw = img.width;
      let ih = img.height;
      
      const fitMode = fitRef.current;
      let sx, sy, sw, sh;
      if (fitMode === "fill") {
        sx = 0; sy = 0; sw = offW; sh = offH;
      } else if (fitMode === "contain") {
        let scale = Math.min(offW / iw, offH / ih);
        sw = iw * scale; sh = ih * scale;
        sx = (offW - sw) / 2; sy = (offH - sh) / 2;
      } else {
        let scale = Math.max(offW / iw, offH / ih);
        sw = iw * scale; sh = ih * scale;
        sx = (offW - sw) / 2; sy = (offH - sh) / 2;
      }
      ctx.clearRect(0, 0, offW, offH);
      ctx.drawImage(sourceEl, sx, sy, sw, sh);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, off);
    }

    function render() {
      if (!loaded || !gl) return;
      const curW = sizeRef.current.width;
      const curH = sizeRef.current.height;
      if (curW !== appliedW || curH !== appliedH) {
        const d = dprRef.current || 1;
        if (canvasRef.current) {
          canvasRef.current.width = curW;
          canvasRef.current.height = curH;
          canvasRef.current.style.width = curW / d + "px";
          canvasRef.current.style.height = curH / d + "px";
        }
        appliedW = curW;
        appliedH = curH;
      }
      updateTexture();
      gl.viewport(0, 0, curW, curH);
      gl.clear(gl.COLOR_BUFFER_BIT);
      const now = (Date.now() - startTime) / 1000;
      gl.uniform1f(uTime, now);
      
      let mx = mouseRef.current.active ? Math.max(0, Math.min(1, mouseRef.current.x)) : -10;
      let my = mouseRef.current.active ? Math.max(0, Math.min(1, mouseRef.current.y)) : -10;
      my = 1 - my;
      gl.uniform2f(uMouse, mx, my);
      gl.uniform1f(uStrength, strength * 2.5);
      gl.uniform1f(uSpeed, speed);
      gl.uniform2f(uResolution, curW, curH);
      
      let nowMs = Date.now();
      let wakeArr = wakeRef.current.slice(-8);
      let hotspotArr = (hotspotsRef.current || []).slice(0, 8).map((h: any) => ({ x: h.x, y: h.y, t: nowMs - 1e5 }));
      let allWake = [...wakeArr, ...hotspotArr].slice(-16);
      let wakeData = new Float32Array(16 * 3);
      let count = 0;
      for (let i = 0; i < allWake.length; ++i) {
        let w = allWake[i];
        wakeData[i * 3 + 0] = w.x;
        wakeData[i * 3 + 1] = 1 - w.y;
        wakeData[i * 3 + 2] = (w.t - startTime) / 1000;
        count++;
      }
      gl.uniform1i(uWakeCount, count);
      gl.uniform3fv(uWake, wakeData);
      gl.uniform1f(uMaskRadius, maskRadiusRef.current);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      animationId = requestAnimationFrame(render);
    }
    
    return () => {
      if (animationId) cancelAnimationFrame(animationId);
      gl = null;
    };
  }, [image, strength, speed]);

  return (
    <div
      ref={wrapperRef}
      style={{ width: "100%", height: "100%", position: "relative", overflow: "hidden", borderRadius, ...style }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      onTouchMove={handleMove}
      onTouchEnd={handleLeave}
    >
      <canvas
        ref={canvasRef}
        width={size.width}
        height={size.height}
        style={{ width: "100%", height: "100%", display: "block", borderRadius }}
      />
    </div>
  );
}
