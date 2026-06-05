import { Html } from '@react-three/drei';

export default function DurationScene({ phase, minutes }) {
    const maxMinutes = 120;
    const progressAngle = (minutes / maxMinutes) * Math.PI * 2;
    const ringColor = phase === 'added' ? '#D4AF37' : '#2ECC71';
    const glowColor = phase === 'added' ? 'rgba(212, 175, 55, 0.3)' : 'rgba(46, 204, 113, 0.3)';

    return (
        <group>
            <ambientLight intensity={0.5} />
            <directionalLight position={[5, 5, 5]} intensity={1} />

            <mesh rotation={[0, 0, 0]}>
                <ringGeometry args={[2.5, 2.8, 64]} />
                <meshStandardMaterial color="#1a1a1a" />
            </mesh>

            <mesh rotation={[0, 0, Math.PI / 2]}>
                <ringGeometry args={[2.5, 2.8, 64, 1, 0, progressAngle]} />
                <meshStandardMaterial color={ringColor} emissive={ringColor} emissiveIntensity={0.5} />
            </mesh>

            <mesh rotation={[0, 0, 0]}>
                <ringGeometry args={[2.3, 2.5, 64]} />
                <meshBasicMaterial color={glowColor} transparent opacity={0.5} />
            </mesh>

            <Html center>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: '#F5F5F5', userSelect: 'none' }}>
                    <span style={{ fontSize: '3rem', fontWeight: 'bold', color: ringColor, lineHeight: 1 }}>
                        {minutes}'
                    </span>
                    <span style={{ fontSize: '1.2rem', color: '#aaa', marginTop: '5px', textTransform: 'uppercase' }}>
                        {phase === 'first' && '1st Half'}
                        {phase === 'second' && '2nd Half'}
                        {phase === 'added' && 'Added Time'}
                        {phase === 'half' && 'Half Time'}
                        {phase === 'et1' && 'Extra Time 1'}
                        {phase === 'et2' && 'Extra Time 2'}
                    </span>
                </div>
            </Html>
        </group>
    );
}