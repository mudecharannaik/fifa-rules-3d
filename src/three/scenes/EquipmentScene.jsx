import { Html } from '@react-three/drei';

export default function EquipmentScene({ mode }) {
    // Determine colors based on the selected mode
    const jerseyColor = mode === 'gk' ? '#ffcc00' : '#cc0000'; // Yellow for GK, Red for Outfield
    const shortsColor = '#ffffff';
    const socksColor = mode === 'required' ? '#2ECC71' : '#000000'; // Green glow if showing required
    const bootsColor = '#000000';
    const glovesColor = mode === 'gk' ? '#ff6600' : '#0044cc'; // Orange for GK gloves
    const shinGuardColor = mode === 'required' ? '#00ffff' : '#aaaaaa'; // Cyan for shinguards

    return (
        <group>
            <ambientLight intensity={0.6} />
            <directionalLight position={[5, 10, 5]} intensity={1} castShadow />

            {/* Ground */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
                <planeGeometry args={[10, 10]} />
                <meshStandardMaterial color="#1a1a1a" />
            </mesh>

            {/* --- THE PLAYER MANNEQUIN --- */}
            <group position={[0, 0, 0]}>

                {/* HEAD */}
                <mesh position={[0, 1.75, 0]}>
                    <sphereGeometry args={[0.2, 16, 16]} />
                    <meshStandardMaterial color="#f5f5f5" />
                </mesh>

                {/* JERSEY (Torso) */}
                <mesh position={[0, 1.2, 0]}>
                    <capsuleGeometry args={[0.25, 0.4, 4, 8]} />
                    <meshStandardMaterial color={jerseyColor} emissive={mode === 'required' ? jerseyColor : '#000000'} emissiveIntensity={0.3} />
                </mesh>

                {/* SHORTS */}
                <mesh position={[0, 0.7, 0]}>
                    <capsuleGeometry args={[0.25, 0.15, 4, 8]} />
                    <meshStandardMaterial color={shortsColor} />
                </mesh>

                {/* LEFT LEG / SOCKS */}
                <mesh position={[-0.1, 0.35, 0]}>
                    <capsuleGeometry args={[0.08, 0.3, 4, 8]} />
                    <meshStandardMaterial color={socksColor} emissive={mode === 'required' ? '#2ECC71' : '#000000'} emissiveIntensity={0.5} />
                </mesh>

                {/* RIGHT LEG / SOCKS */}
                <mesh position={[0.1, 0.35, 0]}>
                    <capsuleGeometry args={[0.08, 0.3, 4, 8]} />
                    <meshStandardMaterial color={socksColor} emissive={mode === 'required' ? '#2ECC71' : '#000000'} emissiveIntensity={0.5} />
                </mesh>

                {/* LEFT BOOT */}
                <mesh position={[-0.1, 0.08, 0.05]}>
                    <boxGeometry args={[0.15, 0.1, 0.25]} />
                    <meshStandardMaterial color={bootsColor} />
                </mesh>

                {/* RIGHT BOOT */}
                <mesh position={[0.1, 0.08, 0.05]}>
                    <boxGeometry args={[0.15, 0.1, 0.25]} />
                    <meshStandardMaterial color={bootsColor} />
                </mesh>

                {/* SHINGUARD (Visible through sock in 'Required' mode) */}
                {mode === 'required' && (
                    <mesh position={[-0.1, 0.45, 0.1]}>
                        <boxGeometry args={[0.12, 0.2, 0.05]} />
                        <meshStandardMaterial color={shinGuardColor} emissive={shinGuardColor} emissiveIntensity={1} transparent opacity={0.8} />
                    </mesh>
                )}

                {/* LEFT HAND / GLOVE */}
                <mesh position={[-0.35, 1.15, 0]}>
                    <sphereGeometry args={[0.08, 8, 8]} />
                    <meshStandardMaterial color={mode === 'gk' ? glovesColor : '#f5f5f5'} emissive={mode === 'gk' ? glovesColor : '#000000'} emissiveIntensity={mode === 'gk' ? 0.5 : 0} />
                </mesh>

                {/* RIGHT HAND / GLOVE */}
                <mesh position={[0.35, 1.15, 0]}>
                    <sphereGeometry args={[0.08, 8, 8]} />
                    <meshStandardMaterial color={mode === 'gk' ? glovesColor : '#f5f5f5'} emissive={mode === 'gk' ? glovesColor : '#000000'} emissiveIntensity={mode === 'gk' ? 0.5 : 0} />
                </mesh>

                {/* --- FORBIDDEN ITEMS (Jewelry) --- */}
                {mode === 'forbidden' && (
                    <>
                        {/* Earring */}
                        <mesh position={[-0.15, 1.78, 0.15]}>
                            <torusGeometry args={[0.04, 0.01, 8, 16]} />
                            <meshStandardMaterial color="#D4AF37" emissive="#D4AF37" emissiveIntensity={1} />
                        </mesh>

                        {/* Forbidden X mark */}
                        <Html position={[0, 2.5, 0]} center>
                            <div style={{
                                background: 'rgba(255, 0, 0, 0.9)',
                                color: 'white',
                                padding: '8px 15px',
                                borderRadius: '5px',
                                fontSize: '1.5rem',
                                fontWeight: 'bold',
                                border: '2px solid white'
                            }}>
                                🚫 NO JEWELRY
                            </div>
                        </Html>
                    </>
                )}
            </group>
        </group>
    );
}