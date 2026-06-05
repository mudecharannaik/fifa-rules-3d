import { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import OfficialsScene from '../three/scenes/OfficialsScene';

export default function Referees() {
    const [signal, setSignal] = useState('none');

    return (
        <div style={{ display: 'flex', height: '100vh', backgroundColor: '#0A1F0A' }}>

            {/* 3D Canvas Area */}
            <div style={{ flex: 2, position: 'relative' }}>
                <Canvas camera={{ position: [0, 6, 8], fov: 50 }}>
                    <ambientLight intensity={0.6} />
                    <directionalLight position={[10, 10, 5]} intensity={1} />
                    <OfficialsScene signal={signal} />
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
                <h1 style={{ color: '#D4AF37', marginBottom: '0.2rem' }}>Law 5: The Referee</h1>
                <h2 style={{ color: '#D4AF37', marginBottom: '1rem', fontSize: '1.2rem', opacity: 0.8 }}>Law 6: The Other Match Officials</h2>

                {/* Signal Buttons */}
                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
                    <button onClick={() => setSignal('direct')} style={btnStyle(signal === 'direct', '#ff0000')}>👉 Direct FK</button>
                    <button onClick={() => setSignal('indirect')} style={btnStyle(signal === 'indirect', '#ffcc00')}>☝️ Indirect FK</button>
                    <button onClick={() => setSignal('advantage')} style={btnStyle(signal === 'advantage', '#2ECC71')}>🤚 Advantage</button>
                    <button onClick={() => setSignal('none')} style={btnStyle(signal === 'none', '#555')}>Reset</button>
                </div>

                <RuleCard title="⚖️ Referee Authority" text="Each match is controlled by a referee who has full authority to enforce the Laws of the Game. The decisions of the referee regarding facts connected with play are final." />
                <RuleCard title="🤚 The Advantage Rule" text="The referee allows play to continue when an offense occurs and the non-offending team still has possession and a clear attacking opportunity." />
                <RuleCard title="🧑‍⚖️ Assistant Referees (ARs)" text="ARs indicate when the ball leaves the field, which team is entitled to a restart, offside positions, and substitutions." />
                <RuleCard title="📋 Fourth Official" text="Assists with administrative duties, substitutions, monitors the technical areas, and indicates minimum added time." />
                <RuleCard title="📺 VAR & AARs" text="Video Assistant Referees review match-changing incidents. Additional Assistant Referees stand behind the goal line to help detect fouls inside the penalty area." />
            </div>
        </div>
    );
}

function btnStyle(isActive, color) {
    return {
        flex: 1,
        padding: '0.8rem',
        backgroundColor: isActive ? color : '#1a3a1a',
        color: isActive ? (color === '#ff0000' ? '#fff' : '#000') : '#fff',
        border: `1px solid ${color}`,
        fontWeight: 'bold',
        cursor: 'pointer',
        borderRadius: '5px',
        fontSize: '0.9rem'
    };
}

function RuleCard({ title, text }) {
    return (
        <div style={{ backgroundColor: '#0A1F0A', padding: '1.2rem', borderRadius: '10px', borderLeft: '4px solid #2ECC71', color: '#F5F5F5', lineHeight: '1.6', marginBottom: '1rem' }}>
            <h3 style={{ color: '#D4AF37', marginBottom: '0.5rem', fontSize: '1.1rem' }}>{title}</h3>
            <p style={{ fontSize: '0.95rem' }}>{text}</p>
        </div>
    );
}