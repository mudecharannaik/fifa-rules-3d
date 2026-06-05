import { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import VARScene from '../three/scenes/VARScene';

export default function VARAndTechnology() {
    const [isChecking, setIsChecking] = useState(false);

    return (
        <div style={{ display: 'flex', height: '100vh', backgroundColor: '#0A1F0A' }}>

            {/* 3D Canvas Area */}
            <div style={{ flex: 2, position: 'relative' }}>
                <Canvas camera={{ position: [0, 8, 10], fov: 50 }}>
                    <ambientLight intensity={0.6} />
                    <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
                    <VARScene isChecking={isChecking} />
                    <OrbitControls
                        makeDefault
                        maxPolarAngle={Math.PI / 2.1}
                        minDistance={5}
                        maxDistance={20}
                    />
                </Canvas>
            </div>

            {/* UI Panel Area */}
            <div style={{ flex: 1, backgroundColor: '#112211', padding: '2rem', overflowY: 'auto', borderLeft: '2px solid #1a3a1a' }}>
                <h1 style={{ color: '#D4AF37', marginBottom: '1rem' }}>📺 VAR & Technology</h1>

                {/* VAR Trigger Button */}
                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
                    <button
                        onClick={() => setIsChecking(true)}
                        style={{ flex: 2, padding: '1rem', backgroundColor: '#00ffff', color: '#000', border: 'none', fontWeight: 'bold', fontSize: '1rem', cursor: 'pointer', borderRadius: '5px' }}
                    >
                        🔍 Trigger VAR Check
                    </button>
                    <button
                        onClick={() => setIsChecking(false)}
                        style={{ flex: 1, padding: '1rem', backgroundColor: '#1a3a1a', color: '#fff', border: '1px solid #2ECC71', fontWeight: 'bold', fontSize: '1rem', cursor: 'pointer', borderRadius: '5px' }}
                    >
                        Reset
                    </button>
                </div>

                <RuleCard title="👀 The 4 Reviewable Incidents" text="VAR is only used for clear and obvious errors involving: 1) Goals (offside/foul in buildup), 2) Penalty decisions (foul/no foul inside the box), 3) Direct Red Cards (violent conduct, DOGSO), 4) Mistaken Identity (punishing the wrong player)." />

                <RuleCard title="🤖 Semi-Automated Offside (SAOT)" text="Used in the World Cup, this system uses 12 dedicated stadium cameras tracking 29 points on each player's body 50 times per second. When a goal is scored, the system instantly calculates the exact moment the ball was played and draws the offside lines, alerting the VAR." />

                <RuleCard title="🧊 The 3D Animation" text="Once SAOT confirms an offside, a 3D animation is generated showing the exact positions of the players and the ball at the kick moment. This is what you see on TV and in the stadium!" />

                <RuleCard title="🥅 Goal-Line Technology (GLT)" text="A separate system from VAR. 14 high-speed cameras track the ball. If the whole ball crosses the whole goal line, a signal is sent to the referee's watch in less than 1 second. It is 100% accurate." />

                <RuleCard title="🔄 The Review Process" text="1) VAR constantly checks the 4 incidents. 2) If a clear error is spotted, VAR recommends a review to the referee. 3) For factual decisions (like offside), the referee accepts the VAR's advice. 4) For subjective decisions (like a foul severity), the referee can do an On-Field Review (OFR) by looking at a pitchside monitor." />
            </div>
        </div>
    );
}

function RuleCard({ title, text }) {
    return (
        <div style={{ backgroundColor: '#0A1F0A', padding: '1.2rem', borderRadius: '10px', borderLeft: '4px solid #00ffff', color: '#F5F5F5', lineHeight: '1.6', marginBottom: '1rem' }}>
            <h3 style={{ color: '#D4AF37', marginBottom: '0.5rem', fontSize: '1.1rem' }}>{title}</h3>
            <p style={{ fontSize: '0.95rem' }}>{text}</p>
        </div>
    );
}