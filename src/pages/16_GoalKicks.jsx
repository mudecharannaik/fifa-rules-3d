import { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import GoalKickScene from '../three/scenes/GoalKickScene';

export default function GoalKicks() {
    const [isKicked, setIsKicked] = useState(false);

    return (
        <div style={{ display: 'flex', height: '100vh', backgroundColor: '#0A1F0A' }}>

            {/* 3D Canvas Area */}
            <div style={{ flex: 2, position: 'relative' }}>
                <Canvas camera={{ position: [-3, 4, 6], fov: 50 }}>
                    <GoalKickScene isKicked={isKicked} onReset={() => setIsKicked(false)} />
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
                <h1 style={{ color: '#D4AF37', marginBottom: '1rem' }}>Law 16: The Goal Kick</h1>

                {/* Kick Button */}
                <button
                    onClick={() => !isKicked && setIsKicked(true)}
                    disabled={isKicked}
                    style={{
                        width: '100%',
                        padding: '1.2rem',
                        backgroundColor: isKicked ? '#555' : '#2ECC71',
                        color: isKicked ? '#999' : '#0A1F0A',
                        border: 'none',
                        borderRadius: '8px',
                        fontSize: '1.5rem',
                        fontWeight: 'bold',
                        cursor: isKicked ? 'not-allowed' : 'pointer',
                        textTransform: 'uppercase',
                        letterSpacing: '2px',
                        marginBottom: '1.5rem'
                    }}
                >
                    {isKicked ? '⚽ In Play!' : '🥅 Simulate Short Goal Kick'}
                </button>

                <RuleCard title="📋 When Awarded" text="A goal kick is awarded when the whole ball passes over the goal line, on the ground or in the air, having last touched a player of the attacking team, and a goal is not scored." />

                <RuleCard title="🆕 The NEW Rule (Crucial!)" text="The ball is in play when it is kicked and clearly moves. It does NOT have to leave the penalty area anymore. As demonstrated in the 3D scene above, the goalkeeper can now pass the ball directly to a teammate standing inside the penalty area." />

                <RuleCard title="📜 The OLD Rule (Pre-2019)" text="Before 2019, the ball had to leave the penalty area before it was in play. If a teammate touched it inside the box, the goal kick was retaken. This rule was changed to speed up the game and stop time-wasting!" />

                <RuleCard title="🚫 Opponent Restrictions" text="Opponents must remain outside the penalty area until the ball is in play. If an opponent enters the penalty area before the ball is kicked and touches or challenges for the ball, the goal kick is retaken." />

                <RuleCard title="🎯 Scoring Directly" text="A goal CAN be scored directly from a goal kick, but only against the opponents. If the ball somehow enters the kicker's own goal directly from a goal kick, a corner kick is awarded to the opponents." />
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