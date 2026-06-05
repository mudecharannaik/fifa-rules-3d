import { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import CornerKickScene from '../three/scenes/CornerKickScene';

export default function CornerKicks() {
    const [isShooting, setIsShooting] = useState(false);

    return (
        <div style={{ display: 'flex', height: '100vh', backgroundColor: '#0A1F0A' }}>

            {/* 3D Canvas Area */}
            <div style={{ flex: 2, position: 'relative' }}>
                <Canvas camera={{ position: [2, 4, 6], fov: 50 }}>
                    <CornerKickScene isShooting={isShooting} onReset={() => setIsShooting(false)} />
                    <OrbitControls
                        makeDefault
                        maxPolarAngle={Math.PI / 2.1}
                        minDistance={4}
                        maxDistance={15}
                    />
                </Canvas>
            </div>

            {/* UI Panel Area */}
            <div style={{ flex: 1, backgroundColor: '#112211', padding: '2rem', overflowY: 'auto', borderLeft: '2px solid #1a3a1a' }}>
                <h1 style={{ color: '#D4AF37', marginBottom: '1rem' }}>Law 17: The Corner Kick</h1>

                {/* Shoot Button */}
                <button
                    onClick={() => !isShooting && setIsShooting(true)}
                    disabled={isShooting}
                    style={{
                        width: '100%',
                        padding: '1.2rem',
                        backgroundColor: isShooting ? '#555' : '#D4AF37',
                        color: isShooting ? '#999' : '#0A1F0A',
                        border: 'none',
                        borderRadius: '8px',
                        fontSize: '1.5rem',
                        fontWeight: 'bold',
                        cursor: isShooting ? 'not-allowed' : 'pointer',
                        textTransform: 'uppercase',
                        letterSpacing: '2px',
                        marginBottom: '1.5rem'
                    }}
                >
                    {isShooting ? '⚽ Flying!' : '🌀 Simulate Olimpico!'}
                </button>

                <RuleCard title="📋 When Awarded" text="A corner kick is awarded when the whole ball passes over the goal line, on the ground or in the air, having last touched a player of the defending team, and a goal is not scored." />

                <RuleCard title="📍 Positioning" text="The ball must be placed inside the corner arc (the quarter circle at the intersection of the touchline and goal line). The corner flagpost must not be moved or removed. The ball is in play when it is kicked and clearly moves." />

                <RuleCard title="📏 Opponent Distance" text="Opponents must remain at least 9.15m (10 yards) from the corner arc until the ball is in play. The referee will often pace out the distance to ensure defenders retreat." />

                <RuleCard title="🚫 Offside Exception" text="A player CANNOT be offside directly from a corner kick. This is why you often see attackers right on the goal line during a corner!" />

                <RuleCard title="🏆 The Olimpico" text="Scoring directly from a corner kick without any other player touching the ball is incredibly rare and is called an 'Olimpico' (named after Cesáreo Onzari who scored one in 1924). Click the button above to see the 3D simulation of this spectacular move!" />
            </div>
        </div>
    );
}

function RuleCard({ title, text }) {
    return (
        <div style={{ backgroundColor: '#0A1F0A', padding: '1.2rem', borderRadius: '10px', borderLeft: '4px solid #D4AF37', color: '#F5F5F5', lineHeight: '1.6', marginBottom: '1rem' }}>
            <h3 style={{ color: '#D4AF37', marginBottom: '0.5rem', fontSize: '1.1rem' }}>{title}</h3>
            <p style={{ fontSize: '0.95rem' }}>{text}</p>
        </div>
    );
}