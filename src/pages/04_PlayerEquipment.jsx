import { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import EquipmentScene from '../three/scenes/EquipmentScene';

export default function PlayerEquipment() {
    const [mode, setMode] = useState('required');

    return (
        <div style={{ display: 'flex', height: '100vh', backgroundColor: '#0A1F0A' }}>

            {/* 3D Canvas Area */}
            <div style={{ flex: 2, position: 'relative' }}>
                <Canvas camera={{ position: [0, 1.5, 3], fov: 50 }}>
                    <EquipmentScene mode={mode} />
                    <OrbitControls
                        makeDefault
                        maxPolarAngle={Math.PI / 1.8}
                        minDistance={2}
                        maxDistance={5}
                        target={[0, 1, 0]}
                    />
                </Canvas>
            </div>

            {/* UI Panel Area */}
            <div style={{ flex: 1, backgroundColor: '#112211', padding: '2rem', overflowY: 'auto', borderLeft: '2px solid #1a3a1a' }}>
                <h1 style={{ color: '#D4AF37', marginBottom: '1rem' }}>Law 4: The Players' Equipment</h1>

                {/* Mode Buttons */}
                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
                    <button
                        onClick={() => setMode('required')}
                        style={{ flex: 1, padding: '0.8rem', backgroundColor: mode === 'required' ? '#2ECC71' : '#1a3a1a', color: mode === 'required' ? '#000' : '#fff', border: '1px solid #2ECC71', fontWeight: 'bold', cursor: 'pointer', borderRadius: '5px' }}
                    >
                        ✅ Required
                    </button>
                    <button
                        onClick={() => setMode('gk')}
                        style={{ flex: 1, padding: '0.8rem', backgroundColor: mode === 'gk' ? '#ffcc00' : '#1a3a1a', color: mode === 'gk' ? '#000' : '#fff', border: '1px solid #ffcc00', fontWeight: 'bold', cursor: 'pointer', borderRadius: '5px' }}
                    >
                        🧤 Goalkeeper
                    </button>
                    <button
                        onClick={() => setMode('forbidden')}
                        style={{ flex: 1, padding: '0.8rem', backgroundColor: mode === 'forbidden' ? '#ff0000' : '#1a3a1a', color: mode === 'forbidden' ? '#fff' : '#fff', border: '1px solid #ff0000', fontWeight: 'bold', cursor: 'pointer', borderRadius: '5px' }}
                    >
                        🚫 Forbidden
                    </button>
                </div>

                {mode === 'required' && (
                    <>
                        <RuleCard title="👕 Mandatory Items" text="A player must have: A jersey/shirt with sleeves, Shorts, Socks, Shinguards, and Footwear (boots/cleats)." />
                        <RuleCard title="🦵 Shinguard Rules" text="Shinguards must be covered entirely by the socks. They must be made of rubber, plastic, or a similar suitable material, and provide a reasonable degree of protection." />
                        <RuleCard title="🔢 Numbers & Names" text="Each player must have a unique number on the back of their jersey, different from the goalkeeper. The number must also appear on the front of the shorts. Names are usually required in official FIFA tournaments." />
                    </>
                )}

                {mode === 'gk' && (
                    <>
                        <RuleCard title="🟡 Different Color" text="Each goalkeeper must wear colors that are distinguishable from the other players, the referee, and the assistant referees." />
                        <RuleCard title="🧤 Goalkeeper Gloves" text="Gloves are standard equipment for goalkeepers to grip the ball and protect their hands. They are strictly optional for outfield players but mandatory for almost all GKs." />
                        <RuleCard title="🔄 Changing Positions" text="If a goalkeeper and an outfield player swap positions during a match, they must also swap jerseys/kits to reflect their new roles, and this must be done during a stoppage in play with the referee's permission." />
                    </>
                )}

                {mode === 'forbidden' && (
                    <>
                        <RuleCard title="💍 No Jewelry" text="All jewelry (rings, earrings, necklaces, wristwatches) must be removed before the match. Taping over jewelry is NOT permitted. This rule exists to prevent injuries to both the wearer and opponents." />
                        <RuleCard title="🩳 Undergarments" text="If undershorts or thermal pants are worn, their color must match the main color of the shorts. If a long-sleeved undershirt is worn, its sleeves must match the main color of the jersey sleeves." />
                        <RuleCard title="📱 Communication Equipment" text="Players are forbidden from wearing any electronic communication equipment (like earpieces or smartwatches). Goalkeepers are also forbidden from wearing caps with hard peaks." />
                    </>
                )}
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