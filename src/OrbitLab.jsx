import { useEffect, useRef, useState } from "react";

export default function OrbitLab({ compact = false, onOpen }) {
  const canvasRef = useRef(null);
  const phaseRef = useRef(0);
  const [eccentricity, setEccentricity] = useState(0.3);
  const [phase, setPhase] = useState(0);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    let frame;
    let previous = 0;
    let visible = true;
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      cancelAnimationFrame(frame);
      previous = 0;
      frame = requestAnimationFrame(draw);
    });
    observer.observe(canvas);
    const draw = (time) => {
      if (playing && visible && previous)
      phaseRef.current =
      (phaseRef.current + Math.min(time - previous, 50) / 4200) % (
      Math.PI * 2);
      previous = time;
      const { width, height } = canvas.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      if (
      canvas.width !== Math.round(width * ratio) ||
      canvas.height !== Math.round(height * ratio))
      {
        canvas.width = Math.round(width * ratio);
        canvas.height = Math.round(height * ratio);
      }
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      context.clearRect(0, 0, width, height);
      const a = Math.min(width * 0.29, height * 0.38);
      const e = eccentricity;
      const b = a * Math.sqrt(1 - e * e);
      const cx = width / 2;
      const cy = height / 2;
      const sunX = cx + a * e;
      context.strokeStyle = "#7f9c963f";
      context.lineWidth = 1;
      context.setLineDash([3, 5]);
      context.beginPath();
      context.ellipse(cx, cy, a, b, 0, 0, Math.PI * 2);
      context.stroke();
      context.setLineDash([]);
      let anomaly = phaseRef.current;
      for (let i = 0; i < 10; i++)
      anomaly -=
      (anomaly - e * Math.sin(anomaly) - phaseRef.current) / (
      1 - e * Math.cos(anomaly));
      const x = cx + a * Math.cos(anomaly);
      const y = cy + b * Math.sin(anomaly);
      context.fillStyle = "#d5b57b";
      context.beginPath();
      context.arc(sunX, cy, compact ? 8 : 11, 0, Math.PI * 2);
      context.fill();
      context.strokeStyle = "#d5b57b22";
      context.lineWidth = 7;
      context.beginPath();
      context.arc(sunX, cy, compact ? 13 : 17, 0, Math.PI * 2);
      context.stroke();
      context.strokeStyle = "#93bbb073";
      context.lineWidth = 1;
      context.beginPath();
      context.moveTo(sunX, cy);
      context.lineTo(x, y);
      context.stroke();
      context.fillStyle = "#92c5c8";
      context.beginPath();
      context.arc(x, y, 5, 0, Math.PI * 2);
      context.fill();
      context.fillStyle = "#c1d2c9";
      context.font = '11px "DM Sans", sans-serif';
      context.textAlign = "center";
      context.fillText("Sun", sunX, cy + 31);
      context.fillText("Planet", x, y - 16);
      if (playing && visible) frame = requestAnimationFrame(draw);
    };
    const resizeObserver = new ResizeObserver(() => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(draw);
    });
    resizeObserver.observe(canvas);
    frame = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      resizeObserver.disconnect();
    };
  }, [eccentricity, compact, playing, phase]);

  return (
    <section
      className={`orbit-lab ${compact ? "orbit-lab-compact" : ""}`}
      aria-label="Kepler orbit simulation">

      <div className="lab-copy">
        <h3>{compact ? "The universe is always moving." : "Explore an orbit."}</h3>
        <p>
          Change the eccentricity and watch the planet move faster as it approaches the Sun.
        </p>
        {onOpen &&
        <button className="lab-open" onClick={onOpen}>
            Open the orbit lesson{" "}
            <svg
            aria-hidden="true"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7">

              <path d="M6 18 18 6M6 6h12v12" />
            </svg>
          </button>
        }
      </div>
      <div className="lab-stage">
        <canvas
          ref={canvasRef}
          role="img"
          aria-label={`Elliptical orbit with eccentricity ${eccentricity.toFixed(2)}. The Sun is at one focus.`} />

        <span className="lab-scale">ILLUSTRATIVE MODEL · NOT TO SCALE</span>
      </div>
      <div className="lab-controls">
        <label>
          Eccentricity <output>{eccentricity.toFixed(2)}</output>
          <input
            aria-label="Eccentricity"
            type="range"
            min="0"
            max="0.65"
            step="0.01"
            value={eccentricity}
            onChange={(event) => setEccentricity(Number(event.target.value))} />

        </label>
        {!compact &&
        <label>
            Orbital position{" "}
            <input
            type="range"
            min="0"
            max="6.28"
            step="0.01"
            value={phase}
            aria-label="Planetary position"
            onChange={(event) => {
              const value = Number(event.target.value);
              setPhase(value);
              phaseRef.current = value;
              setPlaying(false);
            }} />

          </label>
        }
        <button
          onClick={() => {
            if (playing) setPhase(phaseRef.current);
            setPlaying((value) => !value);
          }}
          aria-pressed={playing}>

          {playing ? "Pause" : "Run orbit"}{" "}
          <svg
            aria-hidden="true"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7">

            {playing ?
            <path d="M8 5v14M16 5v14" /> :

            <path d="m8 5 11 7-11 7z" />
            }
          </svg>
        </button>
      </div>
    </section>);

}
