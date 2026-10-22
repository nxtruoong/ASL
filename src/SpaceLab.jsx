import { useEffect, useRef, useState } from "react";

const modes = [
{ id: "system", name: "Solar System", copy: "Tilt your perspective and change your speed to see the planets moving in orbital planes." },
{ id: "moon", name: "Moon Phases", copy: "Move the Moon around Earth and track the portion of its surface illuminated by the Sun." },
{ id: "gravity", name: "Gravity Well", copy: "Increase the mass to see the modelled spacetime grid curve more strongly around the celestial body." }];


export default function SpaceLab() {
  const canvasRef = useRef(null);
  const phaseRef = useRef(0);
  const [mode, setMode] = useState("system");
  const [value, setValue] = useState(45);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    let frame;
    let previous = performance.now();
    const drawSphere = (x, y, radius, color, glow = 0) => {
      const gradient = context.createRadialGradient(x - radius * .35, y - radius * .35, 1, x, y, radius);
      gradient.addColorStop(0, "#fff");gradient.addColorStop(.18, color);gradient.addColorStop(1, "#09101d");
      context.shadowColor = color;context.shadowBlur = glow;context.fillStyle = gradient;
      context.beginPath();context.arc(x, y, radius, 0, Math.PI * 2);context.fill();context.shadowBlur = 0;
    };
    const render = (time) => {
      const { width, height } = canvas.getBoundingClientRect();
      const ratio = Math.min(devicePixelRatio || 1, 2);
      if (canvas.width !== Math.round(width * ratio) || canvas.height !== Math.round(height * ratio)) {
        canvas.width = Math.round(width * ratio);canvas.height = Math.round(height * ratio);
      }
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      context.clearRect(0, 0, width, height);
      const delta = Math.min(time - previous, 40);previous = time;
      if (playing) phaseRef.current += delta * .00025 * (mode === "system" ? value / 35 : 1);
      const cx = width / 2,cy = height / 2;
      if (mode === "system") {
        const tilt = .16 + value / 130;
        const planets = [[.28, 4, "#b9aca0", 2.1], [.43, 6, "#e9b779", 1.4], [.58, 7, "#6ab6db", 1], [.74, 5, "#d77959", .8], [.94, 11, "#d7a875", .43]];
        planets.forEach(([scale, radius, color, speed], index) => {
          const orbit = Math.min(width * .42, height * .48) * scale;
          context.strokeStyle = "#6f88b43d";context.lineWidth = 1;context.beginPath();
          context.ellipse(cx, cy, orbit, orbit * tilt, -.18, 0, Math.PI * 2);context.stroke();
          const angle = phaseRef.current * speed + index * 1.7;
          const x = cx + Math.cos(angle) * orbit,y = cy + Math.sin(angle) * orbit * tilt;
          drawSphere(x, y, radius, color);
        });
        drawSphere(cx, cy, 18, "#ffd36f", 22);
      } else if (mode === "moon") {
        const angle = value / 100 * Math.PI * 2;
        context.strokeStyle = "#7186ad45";context.beginPath();context.ellipse(cx, cy, width * .3, height * .23, 0, 0, Math.PI * 2);context.stroke();
        context.fillStyle = "#ffd46f";context.fillRect(16, cy - 2, 30, 4);
        context.fillStyle = "#ffd46f";context.beginPath();context.arc(28, cy, 14, 0, Math.PI * 2);context.fill();
        drawSphere(cx, cy, 28, "#4e9bd1", 8);
        const mx = cx + Math.cos(angle) * width * .3,my = cy + Math.sin(angle) * height * .23;
        drawSphere(mx, my, 13, "#bfc7ce");
        context.fillStyle = "#05091499";context.beginPath();
        context.ellipse(mx + Math.cos(angle) * 7, my, Math.abs(Math.cos(angle)) * 12, 13, 0, 0, Math.PI * 2);context.fill();
      } else {
        const strength = value / 12;
        context.lineWidth = 1;
        for (let i = -8; i <= 8; i++) {
          context.strokeStyle = i === 0 ? "#75d7d078" : "#60749d38";
          context.beginPath();
          for (let x = -width / 2; x <= width / 2; x += 8) {
            const distance = Math.sqrt(x * x + i * i * 225);
            const y = cy + i * 15 + strength * 280 / (distance / 20 + 1);
            if (x === -width / 2) context.moveTo(cx + x, y);else context.lineTo(cx + x, y);
          }
          context.stroke();
        }
        for (let i = -12; i <= 12; i++) {
          context.strokeStyle = "#60749d32";context.beginPath();
          for (let y = -height / 2; y <= height / 2; y += 8) {
            const distance = Math.sqrt(i * i * 225 + y * y);
            const yy = cy + y + strength * 280 / (distance / 20 + 1);
            if (y === -height / 2) context.moveTo(cx + i * 15, yy);else context.lineTo(cx + i * 15, yy);
          }
          context.stroke();
        }
        drawSphere(cx, cy + strength * 18, 15 + value / 8, "#9a78de", 20);
      }
      if (playing) frame = requestAnimationFrame(render);
    };
    frame = requestAnimationFrame(render);
    return () => cancelAnimationFrame(frame);
  }, [mode, value, playing]);

  const active = modes.find((item) => item.id === mode);
  return (
    <section className="space-lab" id="simulations">
      <div className="space-lab-copy"><span>3D SIMULATION LAB</span><h2>Explore the mechanics of the universe.</h2><p>{active.copy}</p></div>
      <div className="space-tabs" role="tablist" aria-label="Select simulation">
        {modes.map((item) => <button key={item.id} role="tab" aria-selected={mode === item.id} onClick={() => {setMode(item.id);setValue(item.id === "system" ? 45 : 50);}}>{item.name}</button>)}
      </div>
      <div className="space-stage"><canvas ref={canvasRef} role="img" aria-label={`${active.name} simulation`} /><span>SPACE VIEW · ILLUSTRATIVE MODEL</span></div>
      <div className="space-controls">
        <label>{mode === "system" ? "Speed & tilt" : mode === "moon" ? "Orbital position" : "Mass"}<input type="range" min="5" max="100" value={value} onChange={(event) => setValue(Number(event.target.value))} /></label>
        <button aria-pressed={playing} onClick={() => setPlaying((item) => !item)}>{playing ? "Pause" : "Continue"}</button>
      </div>
    </section>);

}
