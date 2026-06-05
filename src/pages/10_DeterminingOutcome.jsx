import { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import GoalLineScene from '../three/scenes/GoalLineScene';

export default function DeterminingOutcome() {
    const [ballX, setBallX] = useState(-1.0); // Start inside the pitch

    return (
        <div style={{ display: 'flex', height: '100vh', backgroundColor: '#0A1F0A' }}>

            {/* 3D Canvas Area */}
            <div style={{ flex: 2, position: 'relative' }}>
                <Canvas camera={{ position: [0, 3, 6], fov: 50 }}>
                    <GoalLineScene ballX={ballX} />
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
                <h1 style={{ color: '#D4AF37', marginBottom: '1rem' }}>Law 10: Match Outcome</h1>

                {/* Interactive Slider */}
                <div style={{ backgroundColor: '#0A1F0A', padding: '1.5rem', borderRadius: '10px', marginBottom: '1.5rem', border: '1px solid #2ECC71' }}>
                    <label style={{ color: '#D4AF37', fontWeight: 'bold', display: 'block', marginBottom: '1rem' }}>
                        ➡️ Push Ball Over Goal Line:
                    </label>
                    <input
                        type="range"
                        min="-2"
                        max="2"
                        step="0.05"
                        value={ballX}
                        onChange={(e) => setBallX(parseFloat(e.target.value))}
                        style={{ width: '100%', cursor: 'pointer' }}
                    />
                    <p style={{ color: '#ccc', fontSize: '0.9rem', marginTop: '0.5rem', textAlign: 'center' }}>
                        Watch the GLT sensor line change color!
                    </p>
                </div>

                <RuleCard title="⚽ Scoring a Goal" text="A goal is scored when the whole of the ball passes over the goal line, between the goalposts and under the crossbar, provided that no offense has been committed by the team scoring the goal." />
                <RuleCard title="🏆 Winning & Drawing" text="The team scoring the greater number of goals is the winner. If both teams score no goals or an equal number of goals, the match is drawn." />
                <RuleCard title="🥅 Goal-Line Technology (GLT)" text="GLT uses 14 high-speed cameras to track the ball. When the ball fully crosses the line, a signal is sent to the referee's smartwatch within 1 second." />
                <RuleCard title="🎯 Penalty Shootout" text="If the score is level after Extra Time, teams take alternate penalties. Best of 5, then sudden death if still tied." />
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