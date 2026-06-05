import { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import FreeKickScene from '../three/scenes/FreeKickScene';

export default function FreeKicks() {
    const [wallDistance, setWallDistance] = useState(3.5); // Start slightly outside the circle

    return (
        <div style={{ display: 'flex', height: '100vh', backgroundColor: '#0A1F0A' }}>

            {/* 3D Canvas Area */}
            <div style={{ flex: 2, position: 'relative' }}>
                <Canvas camera={{ position: [3, 3, 5], fov: 50 }}>
                    <ambientLight intensity={0.6} />
                    <directionalLight position={[5, 10, 5]} intensity={1} />
                    <FreeKickScene wallDistance={wallDistance} />
                    <OrbitControls
                        makeDefault
                        maxPolarAngle={Math.PI / 2.1}
                        minDistance={3}
                        maxDistance={12}
                    />
                </Canvas>
            </div>

            {/* UI Panel Area */}
            <div style={{ flex: 1, backgroundColor: '#112211', padding: '2rem', overflowY: 'auto', borderLeft: '2px solid #1a3a1a' }}>
                <h1 style={{ color: '#D4AF37', marginBottom: '1rem' }}>Law 13: Free Kicks</h1>

                {/* Interactive Slider */}
                <div style={{ backgroundColor: '#0A1F0A', padding: '1.5rem', borderRadius: '10px', marginBottom: '1.5rem', border: '1px solid #2ECC71' }}>
                    <label style={{ color: '#D4AF37', fontWeight: 'bold', display: 'block', marginBottom: '1rem' }}>
                        🧱 Move Defensive Wall:
                    </label>
                    <input
                        type="range"
                        min="1"
                        max="5"
                        step="0.1"
                        value={wallDistance}
                        onChange={(e) => setWallDistance(parseFloat(e.target.value))}
                        style={{ width: '100%', cursor: 'pointer' }}
                    />
                    <p style={{ color: '#ccc', fontSize: '0.9rem', marginTop: '0.5rem', textAlign: 'center' }}>
                        Drag slider left to move the wall closer to the ball!
                    </p>
                </div>

                <RuleCard title="🔵 Direct Free Kick (DFK)" text="Awarded for 'penal' fouls (kicks, trips, pushes, handballs, etc.). The kicker CAN score directly into the opponent's goal. If it goes directly into the kicker's own goal, it's a corner kick to the opponents." />

                <RuleCard title="🟡 Indirect Free Kick (IFK)" text="Awarded for 'technical' fouls (obstruction, dangerous play, dissent, offside). The ball MUST touch another player before a goal can be scored. If it goes directly into the goal without a touch, it's a goal kick." />

                <RuleCard title="📏 The 9.15m (10 Yard) Rule" text="All opposing players must remain at least 9.15m (10 yards) from the ball until it is in play. The green circle in the 3D scene shows this exact distance. If they encroach (red circle), they can be cautioned (yellow card)." />

                <RuleCard title="⚡ Quick Free Kick" text="The kicking team does NOT have to wait for the referee's whistle or for the opponents to retreat 9.15m. They can take a 'quick free kick' immediately. If they do, and an opponent who is too close blocks the ball, the referee can allow play to continue (no foul on the blocker)." />

                <RuleCard title="🛑 Inside the Penalty Area" text="If a DFK is awarded to the attacking team inside the opponent's penalty area, it becomes a Penalty Kick (Law 14). If an IFK is awarded to the attacking team inside the opponent's penalty area, all opponents must be on the goal line or outside the penalty area until the ball is kicked." />
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