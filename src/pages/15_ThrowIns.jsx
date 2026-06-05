import { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import ThrowInScene from '../three/scenes/ThrowInScene';

export default function ThrowIns() {
    const [footDistance, setFootDistance] = useState(-0.5); // Start behind the line
    const [isThrowing, setIsThrowing] = useState(false);

    return (
        <div style={{ display: 'flex', height: '100vh', backgroundColor: '#0A1F0A' }}>

            {/* 3D Canvas Area */}
            <div style={{ flex: 2, position: 'relative' }}>
                <Canvas camera={{ position: [2, 3, 5], fov: 50 }}>
                    <ThrowInScene footDistance={footDistance} isThrowing={isThrowing} onReset={() => setIsThrowing(false)} />
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
                <h1 style={{ color: '#D4AF37', marginBottom: '1rem' }}>Law 15: The Throw-in</h1>

                {/* Foot Position Slider */}
                <div style={{ backgroundColor: '#0A1F0A', padding: '1.5rem', borderRadius: '10px', marginBottom: '1rem', border: '1px solid #2ECC71' }}>
                    <label style={{ color: '#D4AF37', fontWeight: 'bold', display: 'block', marginBottom: '1rem' }}>
                        👟 Move Player's Feet:
                    </label>
                    <input
                        type="range"
                        min="-1"
                        max="1"
                        step="0.05"
                        value={footDistance}
                        onChange={(e) => setFootDistance(parseFloat(e.target.value))}
                        style={{ width: '100%', cursor: 'pointer' }}
                    />
                    <div style={{ display: 'flex', justifyContent: 'space-between', color: '#aaa', fontSize: '0.8rem', marginTop: '0.5rem' }}>
                        <span>Behind Line</span>
                        <span>On Line</span>
                        <span>On Pitch</span>
                    </div>
                </div>

                {/* Throw Button */}
                <button
                    onClick={() => !isThrowing && setIsThrowing(true)}
                    disabled={isThrowing}
                    style={{
                        width: '100%',
                        padding: '1rem',
                        backgroundColor: isThrowing ? '#555' : '#2ECC71',
                        color: isThrowing ? '#999' : '#0A1F0A',
                        border: 'none',
                        borderRadius: '8px',
                        fontSize: '1.2rem',
                        fontWeight: 'bold',
                        cursor: isThrowing ? 'not-allowed' : 'pointer',
                        marginBottom: '1.5rem'
                    }}
                >
                    {isThrowing ? '⚽ Thrown!' : '🤾 Simulate Throw-in'}
                </button>

                <RuleCard title="📋 Procedure" text="A throw-in is awarded when the whole ball passes over the touchline, on the ground or in the air, and touches a player of the opposing team. It is taken from the point where it crossed the line." />

                <RuleCard title="🦶 Feet Position" text="At the moment of delivering the ball, the thrower must face the field of play, and have part of each foot on the touchline or on the ground OUTSIDE the touchline. (Use the slider above to see this in 3D!)" />

                <RuleCard title="🤚 Hands & Motion" text="The thrower must throw the ball with both hands from behind and over their head. The ball must be delivered from the point where it left the field of play." />

                <RuleCard title="🚫 Foul Throws" text="If the thrower does not meet these requirements (e.g., one foot fully inside the pitch, lifting a foot before releasing, spinning the ball with one hand), it is a 'foul throw' and a throw-in is awarded to the opposing team." />

                <RuleCard title="🎯 Cannot Score Directly" text="A goal CANNOT be scored directly from a throw-in. If the ball enters the opponent's goal directly, a goal kick is awarded. If it enters the thrower's own goal directly, a corner kick is awarded." />

                <RuleCard title="⚠️ Opponent Interference" text="An opponent who unfairly distracts or impedes a thrower (e.g., jumping in front of them) must be cautioned for unsporting behavior (Yellow Card). Opponents must be at least 2 meters from the point of the throw." />
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