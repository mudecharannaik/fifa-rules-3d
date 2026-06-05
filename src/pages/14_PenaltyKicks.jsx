import { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import PenaltyScene from '../three/scenes/PenaltyScene';

export default function PenaltyKicks() {
    const [isShooting, setIsShooting] = useState(false);

    return (
        <div style={{ display: 'flex', height: '100vh', backgroundColor: '#0A1F0A' }}>

            {/* 3D Canvas Area */}
            <div style={{ flex: 2, position: 'relative' }}>
                <Canvas camera={{ position: [0, 2, 4], fov: 50 }}>
                    <ambientLight intensity={0.6} />
                    <directionalLight position={[5, 10, 5]} intensity={1} castShadow />
                    <PenaltyScene isShooting={isShooting} onReset={() => setIsShooting(false)} />
                    <OrbitControls
                        makeDefault
                        maxPolarAngle={Math.PI / 2.1}
                        minDistance={3}
                        maxDistance={10}
                        target={[0, 1, -2]}
                    />
                </Canvas>
            </div>

            {/* UI Panel Area */}
            <div style={{ flex: 1, backgroundColor: '#112211', padding: '2rem', overflowY: 'auto', borderLeft: '2px solid #1a3a1a' }}>
                <h1 style={{ color: '#D4AF37', marginBottom: '1rem' }}>Law 14: The Penalty Kick</h1>

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
                        marginBottom: '1.5rem',
                        boxShadow: isShooting ? 'none' : '0 4px 6px rgba(0,0,0,0.3)'
                    }}
                >
                    {isShooting ? '⚽ GOAL!' : '🥅 Shoot Penalty!'}
                </button>

                <RuleCard title="📍 When Awarded" text="A penalty kick is awarded if a player commits a direct free kick offense inside their own penalty area, or off the field as part of play as outlined in Law 12." />
                <RuleCard title="🎯 Positioning" text="Ball: Must be stationary on the penalty mark (spot). Kicker: Must be clearly identified. Goalkeeper: Must remain on the goal line, facing the kicker, until the ball is kicked. Players: Must be outside the penalty area, behind the penalty mark, and at least 9.15m (10 yds) from the spot (the arc shows this distance)." />
                <RuleCard title="🧤 Goalkeeper Restrictions" text="The GK must have at least part of one foot on/in line with the goal line when the kick is taken. They cannot be standing in front of the line. If they infringe and the penalty is saved, the penalty is retaken." />
                <RuleCard title="🚫 Kicker Restrictions" text="The kicker cannot kick the ball again until it has touched another player. If the ball rebounds off the post/crossbar directly to the kicker, they cannot score (it would be an indirect free kick to the defense)." />
                <RuleCard title="⏱️ Extra Time & Shootouts" text="If time runs out before the penalty is taken, the kick MUST still be taken. In a penalty shootout (to decide a match), rules change slightly: e.g., the kicker cannot touch a rebound, and if the GK is injured during the shootout, a substitute can replace them (if the team hasn't used all subs)." />
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