import { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import OffsideScene from '../three/scenes/OffsideScene';

export default function Offside() {
    const [strikerX, setStrikerX] = useState(1.0); // Start onside

    return (
        <div style={{ display: 'flex', height: '100vh', backgroundColor: '#0A1F0A' }}>

            {/* 3D Canvas Area */}
            <div style={{ flex: 2, position: 'relative' }}>
                <Canvas camera={{ position: [0, 6, 8], fov: 50 }}>
                    <ambientLight intensity={0.6} />
                    <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
                    <OffsideScene strikerX={strikerX} />
                    <OrbitControls
                        makeDefault
                        maxPolarAngle={Math.PI / 2.1}
                        minDistance={5}
                        maxDistance={15}
                    />
                </Canvas>
            </div>

            {/* UI Panel Area */}
            <div style={{ flex: 1, backgroundColor: '#112211', padding: '2rem', overflowY: 'auto', borderLeft: '2px solid #1a3a1a' }}>
                <h1 style={{ color: '#D4AF37', marginBottom: '1rem' }}>Law 11: Offside</h1>

                {/* Interactive Slider */}
                <div style={{ backgroundColor: '#0A1F0A', padding: '1.5rem', borderRadius: '10px', marginBottom: '1.5rem', border: '1px solid #2ECC71' }}>
                    <label style={{ color: '#D4AF37', fontWeight: 'bold', display: 'block', marginBottom: '1rem' }}>
                        ⚽ Move Striker Position:
                    </label>
                    <input
                        type="range"
                        min="-1"
                        max="4"
                        step="0.1"
                        value={strikerX}
                        onChange={(e) => setStrikerX(parseFloat(e.target.value))}
                        style={{ width: '100%', cursor: 'pointer' }}
                    />
                    <p style={{ color: '#ccc', fontSize: '0.9rem', marginTop: '0.5rem', textAlign: 'center' }}>
                        Drag slider right to push striker past the defenders
                    </p>
                </div>

                <RuleCard title="📍 Position" text="A player is in an offside position if any part of the head, body, or feet is nearer to the opponents' goal line than both the ball and the second-last opponent." />
                <RuleCard title="⏱️ Moment of the Pass" text="Offside is judged at the exact moment the ball is played by a teammate. It does NOT matter where the player is when they receive the ball." />
                <RuleCard title="🚫 Not an Offense Alone" text="Being in an offside position is NOT an offense by itself. It only becomes an offside offense if the player is involved in active play." />
                <RuleCard title="🎯 Active Involvement" text="Offside is committed if the player: 1) Interferes with play (touching the ball), 2) Interferes with an opponent (blocking vision/movement), or 3) Gains an advantage from a rebound/save." />
                <RuleCard title="🟢 Exceptions (Never Offside)" text="A player CANNOT be offside from: 1) A goal kick, 2) A throw-in, 3) A corner kick. Also, a player in their OWN half cannot be offside." />
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