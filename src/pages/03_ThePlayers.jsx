import { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import FormationScene from '../three/scenes/FormationScene';

export default function ThePlayers() {
    const [formation, setFormation] = useState('4-3-3');

    return (
        <div style={{ display: 'flex', height: '100vh', backgroundColor: '#0A1F0A' }}>

            {/* 3D Canvas Area */}
            <div style={{ flex: 2, position: 'relative' }}>
                <Canvas camera={{ position: [0, 8, 10], fov: 50 }}>
                    <ambientLight intensity={0.6} />
                    <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
                    <FormationScene formation={formation} />
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
                <h1 style={{ color: '#D4AF37', marginBottom: '1rem' }}>Law 3: The Players</h1>

                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem' }}>
                    <FormationBtn label="4-3-3" current={formation} setter={setFormation} />
                    <FormationBtn label="4-4-2" current={formation} setter={setFormation} />
                    <FormationBtn label="3-5-2" current={formation} setter={setFormation} />
                </div>

                <RuleCard title="👥 Team Size" text="A match is played by two teams, each with a maximum of eleven players; one must be the goalkeeper. A match cannot start or continue if either team has fewer than seven players." />
                <RuleCard title="🔄 Substitutions (WC 2026)" text="Each team may use a maximum of five substitutes. To reduce disruption, the team can only have a maximum of three opportunities to make subs (plus half-time). If a team makes a sub at half-time, it doesn't count as an opportunity." />
                <RuleCard title="⏱️ Extra Time Subs" text="In knockout matches that go to Extra Time, each team is allowed one additional substitution (making it 6 total), plus one extra substitution opportunity." />
                <RuleCard title="🧠 Concussion Subs" text="Regardless of the 5-sub limit, teams are permitted one additional permanent substitution in the event of a suspected concussion." />

                <button onClick={() => navigate('/field')} style={nextBtnStyle}>
                    Back to Law 1: Field →
                </button>
            </div>
        </div>
    );
}

// UI Helper Components
function FormationBtn({ label, current, setter }) {
    const isActive = current === label;
    return (
        <button
            onClick={() => setter(label)}
            style={{
                flex: 1,
                padding: '0.8rem',
                backgroundColor: isActive ? '#D4AF37' : '#1a3a1a',
                color: isActive ? '#0A1F0A' : '#F5F5F5',
                border: `1px solid ${isActive ? '#D4AF37' : '#2ECC71'}`,
                borderRadius: '5px',
                cursor: 'pointer',
                fontWeight: 'bold',
                textTransform: 'uppercase'
            }}
        >
            {label}
        </button>
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

const nextBtnStyle = {
    marginTop: '1rem',
    padding: '1rem',
    backgroundColor: '#D4AF37',
    color: '#0A1F0A',
    border: 'none',
    borderRadius: '5px',
    fontSize: '1rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    textTransform: 'uppercase',
    width: '100%'
};