import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import PitchScene from '../three/scenes/PitchScene';

export default function TheField() {
    const navigate = useNavigate(); // Initialized here
    const [highlight, setHighlight] = useState('full');

    return (
        <div style={{ display: 'flex', height: '100vh', backgroundColor: '#0A1F0A' }}>

            {/* 3D Canvas Area */}
            <div style={{ flex: 2, position: 'relative' }}>
                <Canvas camera={{ position: [0, 8, 10], fov: 50 }}>
                    <ambientLight intensity={0.6} />
                    <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
                    <PitchScene highlight={highlight} />
                    <OrbitControls
                        makeDefault
                        maxPolarAngle={Math.PI / 2.1} // Prevent going under the pitch
                        minDistance={5}
                        maxDistance={20}
                    />
                </Canvas>

                {/* Camera instruction */}
                <div style={{ position: 'absolute', bottom: '20px', left: '20px', color: '#aaa', fontSize: '0.9rem' }}>
                    🖱️ Right-click drag to pan | 🖱️ Left-click drag to rotate | Scroll to zoom
                </div>
            </div>

            {/* UI Panel Area */}
            <div style={{
                flex: 1,
                backgroundColor: '#112211',
                padding: '2rem',
                overflowY: 'auto',
                borderLeft: '2px solid #1a3a1a'
            }}>
                <h1 style={{ color: '#D4AF37', marginBottom: '1rem' }}>Law 1: The Field of Play</h1>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '2rem' }}>
                    <button onClick={() => setHighlight('full')} style={btnStyle}>Full Pitch Dimensions</button>
                    <button onClick={() => setHighlight('penalty')} style={btnStyle}>Penalty Area</button>
                    <button onClick={() => setHighlight('center')} style={btnStyle}>Center Circle</button>
                </div>

                {/* Dynamic Text based on selection */}
                {highlight === 'full' && (
                    <div style={textBlockStyle}>
                        <h3>Dimensions</h3>
                        <p>Length: <strong>100m - 110m</strong></p>
                        <p>Width: <strong>64m - 75m</strong></p>
                        <p style={{ marginTop: '1rem', fontSize: '0.9rem', color: '#ccc' }}>
                            For World Cup matches, the pitch is strictly 105m x 68m. The boundary lines must not be more than 12cm wide.
                        </p>
                    </div>
                )}

                {highlight === 'penalty' && (
                    <div style={textBlockStyle}>
                        <h3>Penalty Area</h3>
                        <p>Extends: <strong>16.5m</strong> from the goal line.</p>
                        <p>Width: <strong>40.32m</strong>.</p>
                        <p style={{ marginTop: '1rem', fontSize: '0.9rem', color: '#ccc' }}>
                            Any foul committed by the defending team inside this area results in a Penalty Kick. The penalty spot is exactly 11m (12 yards) from the goal line.
                        </p>
                    </div>
                )}

                {highlight === 'center' && (
                    <div style={textBlockStyle}>
                        <h3>Center Circle</h3>
                        <p>Radius: <strong>9.15m</strong>.</p>
                        <p style={{ marginTop: '1rem', fontSize: '0.9rem', color: '#ccc' }}>
                            At kickoff, opposing players must remain outside this circle until the ball is kicked and moves. The ball is placed on the center spot at kickoff.
                        </p>
                    </div>
                )}
                {/* Add this at the bottom of the UI panel */}
                <button
                    onClick={() => navigate('/ball')}
                    style={{
                        marginTop: '1rem',
                        padding: '1rem',
                        backgroundColor: '#D4AF37',
                        color: '#0A1F0A',
                        border: 'none',
                        borderRadius: '5px',
                        fontSize: '1rem',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        textTransform: 'uppercase'
                    }}
                >
                    Next Law: The Ball →
                </button>
            </div>
        </div>
    );
}

// Quick inline styles for the buttons
const btnStyle = {
    padding: '0.8rem',
    backgroundColor: '#1a3a1a',
    color: '#F5F5F5',
    border: '1px solid #2ECC71',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    transition: 'all 0.2s ease'
};

// Quick inline styles for the text blocks
const textBlockStyle = {
    backgroundColor: '#0A1F0A',
    padding: '1.5rem',
    borderRadius: '10px',
    color: '#F5F5F5',
    lineHeight: '1.6'
};
