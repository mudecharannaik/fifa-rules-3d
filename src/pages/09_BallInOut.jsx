import { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import BoundaryScene from '../three/scenes/BoundaryScene';

export default function BallInOut() {
    const [ballZ, setBallZ] = useState(-1.0); // Start inside the pitch

    return (
        <div style={{ display: 'flex', height: '100vh', backgroundColor: '#0A1F0A' }}>

            {/* 3D Canvas Area */}
            <div style={{ flex: 2, position: 'relative' }}>
                <Canvas camera={{ position: [0, 4, 4], fov: 50 }}>
                    <BoundaryScene ballZ={ballZ} />
                    <OrbitControls
                        makeDefault
                        maxPolarAngle={Math.PI / 2.1}
                        minDistance={3}
                        maxDistance={10}
                    />
                </Canvas>
            </div>

            {/* UI Panel Area */}
            <div style={{ flex: 1, backgroundColor: '#112211', padding: '2rem', overflowY: 'auto', borderLeft: '2px solid #1a3a1a' }}>
                <h1 style={{ color: '#D4AF37', marginBottom: '1rem' }}>Law 9: Ball In & Out</h1>

                {/* Interactive Slider */}
                <div style={{ backgroundColor: '#0A1F0A', padding: '1.5rem', borderRadius: '10px', marginBottom: '1.5rem', border: '1px solid #2ECC71' }}>
                    <label style={{ color: '#D4AF37', fontWeight: 'bold', display: 'block', marginBottom: '1rem' }}>
                        ➡️ Drag Ball Across Touchline:
                    </label>
                    <input
                        type="range"
                        min="-2"
                        max="2"
                        step="0.05"
                        value={ballZ}
                        onChange={(e) => setBallZ(parseFloat(e.target.value))}
                        style={{ width: '100%', cursor: 'pointer' }}
                    />
                    <div style={{ display: 'flex', justifyContent: 'space-between', color: '#aaa', fontSize: '0.8rem', marginTop: '0.5rem' }}>
                        <span>Deep In Play</span>
                        <span>Touchline</span>
                        <span>Out of Play</span>
                    </div>
                </div>

                <RuleCard title="📏 The Whole Ball Rule" text="The ball is ONLY out of play when the ENTIRE ball has crossed the goal line or touchline, whether on the ground or in the air. Even if 99% of the ball is over the line, if a tiny curve is still touching the line, it is IN PLAY!" />

                <RuleCard title="🧱 Rebounds (Still In Play)" text="If the ball hits the goalpost, crossbar, corner flagpost, or even the match officials (referee/ARs) and stays on the field, it remains IN PLAY. Play does not stop." />

                <RuleCard title="⚖️ Computing Position" text="In 3D space, a ball is a sphere, and a line has no area. The ball is out when its center passes over the outer edge of the line. The lines themselves belong to the areas of which they are boundaries (the touchline is part of the field of play)." />

                <RuleCard title="🟢 Restarting Play" text="When the ball goes out over the touchlines, it restarts with a Throw-in. When it goes out over the goal lines, it restarts with either a Goal Kick (if the attackers kicked it out) or a Corner Kick (if the defenders kicked it out)." />
            </div>
        </div>
    );
}

function RuleCard({ title, text }) {
    return (
        <div style={{ backgroundColor: '#0A1F0A', padding: '1.2rem', borderRadius: '10px', borderLeft: '4px solid #2ECC71', color: '#F5F5F5', lineHeight: '1.6', marginBottom: '1rem' }}>
            <h3 style={{ color: '#D4AF37', marginBottom: '0.5rem', fontSize: '1.1rem' }}>{title}</h3>
            <p style={{ fontSize: '0.95rem' }}>{text}</p>
        </div>
    );
}