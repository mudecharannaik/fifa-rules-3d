import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';

export default function TrophyScene() {
    const groupRef = useRef();

    useFrame((state, delta) => {
        if (groupRef.current) {
            groupRef.current.rotation.y += delta * 0.3;
        }
    });

    const orbitRadius = 3.5;

    return (
        <group ref={groupRef}>
            {/* --- THE TROPHY --- */}
            {/* Base */}
            <mesh position={[0, 0.2, 0]}>
                <cylinderGeometry args={[0.8, 1, 0.4, 8]} />
                <meshStandardMaterial color="#8B8000" metalness={0.8} roughness={0.2} />
            </mesh>
            {/* Stem */}
            <mesh position={[0, 0.9, 0]}>
                <cylinderGeometry args={[0.15, 0.3, 1, 8]} />
                <meshStandardMaterial color="#D4AF37" metalness={0.9} roughness={0.1} />
            </mesh>
            {/* Cup Top */}
            <mesh position={[0, 1.8, 0]}>
                <sphereGeometry args={[0.7, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
                <meshStandardMaterial color="#D4AF37" metalness={0.9} roughness={0.1} />
            </mesh>

            {/* --- ORBITING STAGE LABELS --- */}
            {/* Round of 32 (New!) */}
            <Html position={[0, 0.5, orbitRadius]} center>
                <div style={labelStyle('#00ff00')}>
                    ⚽ Round of 32 <br /> <span style={{ fontSize: '0.6rem', opacity: 0.8 }}>(NEW!)</span>
                </div>
            </Html>

            {/* Round of 16 */}
            <Html position={[orbitRadius, 0.5, 0]} center>
                <div style={labelStyle('#D4AF37')}>
                    🏟️ Round of 16
                </div>
            </Html>

            {/* Quarter Finals */}
            <Html position={[0, 0.5, -orbitRadius]} center>
                <div style={labelStyle('#D4AF37')}>
                    🥊 Quarter Finals
                </div>
            </Html>

            {/* Semi Finals */}
            <Html position={[-orbitRadius, 0.5, 0]} center>
                <div style={labelStyle('#ff8c00')}>
                    🏆 Semi Finals
                </div>
            </Html>
        </group>
    );
}

// Quick style for the 3D floating labels
const labelStyle = (borderColor) => ({
    background: 'rgba(10, 31, 10, 0.9)',
    color: '#F5F5F5',
    padding: '8px 12px',
    borderRadius: '8px',
    border: `2px solid ${borderColor}`,
    fontSize: '0.9rem',
    fontWeight: 'bold',
    textAlign: 'center',
    whiteSpace: 'nowrap',
    boxShadow: `0 0 10px ${borderColor}40`
});