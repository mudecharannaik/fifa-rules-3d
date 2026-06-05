import { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import FoulScene from '../three/scenes/FoulScene';

export default function FoulsAndMisconduct() {
    const [cardType, setCardType] = useState('none');

    return (
        <div style={{ display: 'flex', height: '100vh', backgroundColor: '#0A1F0A' }}>

            {/* 3D Canvas Area */}
            <div style={{ flex: 2, position: 'relative' }}>
                <Canvas camera={{ position: [0, 4, 6], fov: 50 }}>
                    <ambientLight intensity={0.4} />
                    <directionalLight position={[10, 10, 5]} intensity={0.8} />
                    <FoulScene cardType={cardType} />
                    <OrbitControls
                        makeDefault
                        maxPolarAngle={Math.PI / 2.1}
                        minDistance={4}
                        maxDistance={12}
                    />
                </Canvas>
            </div>

            {/* UI Panel Area */}
            <div style={{ flex: 1, backgroundColor: '#112211', padding: '2rem', overflowY: 'auto', borderLeft: '2px solid #1a3a1a' }}>
                <h1 style={{ color: '#D4AF37', marginBottom: '1rem' }}>Law 12: Fouls & Misconduct</h1>

                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
                    <button
                        onClick={() => setCardType('yellow')}
                        style={{ flex: 1, padding: '1rem', backgroundColor: '#ffd700', color: '#000', border: 'none', fontWeight: 'bold', fontSize: '1rem', cursor: 'pointer', borderRadius: '5px' }}
                    >
                        🟨 Yellow Card
                    </button>
                    <button
                        onClick={() => setCardType('red')}
                        style={{ flex: 1, padding: '1rem', backgroundColor: '#ff0000', color: '#fff', border: 'none', fontWeight: 'bold', fontSize: '1rem', cursor: 'pointer', borderRadius: '5px' }}
                    >
                        🟥 Red Card
                    </button>
                    <button
                        onClick={() => setCardType('none')}
                        style={{ flex: 0.5, padding: '1rem', backgroundColor: '#1a3a1a', color: '#fff', border: '1px solid #2ECC71', fontWeight: 'bold', fontSize: '1rem', cursor: 'pointer', borderRadius: '5px' }}
                    >
                        Reset
                    </button>
                </div>

                <RuleCard title="⚡ Direct Free Kick Fouls" text="Awarded if a player commits any of the following against an opponent in a manner considered by the referee to be careless, reckless, or using excessive force: Kicks, Trips, Jumps at, Charges, Strikes, Pushes. Also awarded for: Tackles making contact before the ball, Holding, Spitting at someone, or Deliberate Handball." />
                <RuleCard title="🟨 7 Yellow Card Offenses" text="1. Unsporting behavior, 2. Dissent by word/action, 3. Delaying restart of play, 4. Failing to respect the required distance at restarts, 5. Persistent infringement, 6. Entering/re-entering the field without permission, 7. Deliberately leaving the field without permission." />
                <RuleCard title="🟥 7 Red Card Offenses" text="1. Denying an obvious goal-scoring opportunity (DOGSO) by a foul, 2. Serious foul play, 3. Violent conduct, 4. Spitting at someone, 5. Denying an obvious goal by deliberate handball, 6. Using offensive/insulting language, 7. Receiving a second yellow card in the same match." />
                <RuleCard title="🤚 Handball Rule" text="It is an offense if a player deliberately touches the ball with their hand/arm, or if their arm makes their body 'unnaturally bigger'." />
                <RuleCard title="🚫 DOGSO" text="If a foul denies an obvious goal, the player is sent off (Red). If a penalty is awarded for DOGSO, the punishment is reduced to a Yellow IF the attempt to play the ball was genuine." />
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