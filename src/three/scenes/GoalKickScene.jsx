import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html, Icosahedron, Wireframe } from '@react-three/drei';
import * as THREE from 'three';

export default function GoalKickScene({ isKicked, onReset }) {
    const ballRef = useRef();
    const timeRef = useRef(0);
    const [phase, setPhase] = useState('ready');

    useFrame((state, delta) => {
        if (!ballRef.current) return;

        if (isKicked && phase === 'ready') {
            setPhase('kicked');
        }

        if (phase === 'kicked') {
            timeRef.current += delta;
            const t = Math.min(timeRef.current / 0.8, 1); // 0.8 seconds for the pass

            // GK passes to Defender standing INSIDE the penalty area
            const startX = -4, startZ = 0;
            const endX = -2, endZ = -2;

            ballRef.current.position.x = THREE.MathUtils.lerp(startX, endX, t);
            ballRef.current.position.z = THREE.MathUtils.lerp(startZ, endZ, t);
            ballRef.current.position.y = 0.2 + (0.5 * Math.sin(Math.PI * t)); // Slight lift

            if (t >= 1) {
                setPhase('done');
                setTimeout(() => {
                    ballRef.current.position.set(-4, 0.2, 0);
                    timeRef.current = 0;
                    setPhase('ready');
                    onReset();
                }, 1500);
            }
        } else if (phase === 'ready') {
            ballRef.current.position.y = 0.2 + Math.sin(state.clock.elapsedTime * 2) * 0.03;
        }
    });

    return (
        <group>
            <ambientLight intensity={0.6} />
            <directionalLight position={[10, 10, 5]} intensity={1} />

            {/* Pitch Background */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-5, 0, 0]}>
                <planeGeometry args={[20, 20]} />
                <meshStandardMaterial color="#2b5329" />
            </mesh>

            {/* Penalty Area Highlight (The 18-yard box) */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-1.75, 0.01, 0]}>
                <planeGeometry args={[5.5, 8]} /> {/* Scaled for visual */}
                <meshStandardMaterial color="#1a4d1a" transparent opacity={0.8} />
            </mesh>
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-1.75, 0.02, 0]}>
                <planeGeometry args={[5.5, 8]} />
                <meshBasicMaterial color="#2ECC71" transparent opacity={0.2} wireframe={true} />
            </mesh>

            {/* --- GOALKEEPER --- */}
            <group position={[-4.5, 0, 0]}>
                <mesh position={[0, 0.6, 0]}>
                    <capsuleGeometry args={[0.2, 0.6, 4, 8]} />
                    <meshStandardMaterial color="#ffcc00" /> {/* Yellow GK Kit */}
                </mesh>
                <mesh position={[0, 1.15, 0]}>
                    <sphereGeometry args={[0.18, 16, 16]} />
                    <meshStandardMaterial color="#f5f5f5" />
                </mesh>
            </group>

            {/* --- DEFENDER (Inside the Penalty Area!) --- */}
            <group position={[-2, 0, -2]}>
                <mesh position={[0, 0.6, 0]}>
                    <capsuleGeometry args={[0.2, 0.6, 4, 8]} />
                    <meshStandardMaterial color="#0044cc" />
                </mesh>
                <mesh position={[0, 1.15, 0]}>
                    <sphereGeometry args={[0.18, 16, 16]} />
                    <meshStandardMaterial color="#f5f5f5" />
                </mesh>
            </group>

            {/* --- FOOTBALL --- */}
            <group ref={ballRef} position={[-4, 0.2, 0]}>
                <Icosahedron args={[0.15, 1]}>
                    <meshStandardMaterial color="#ffffff" />
                </Icosahedron>
                <Icosahedron args={[0.155, 1]}>
                    <Wireframe strokeColor="#000000" strokeWidth={1} />
                </Icosahedron>
            </group>

            {/* Label for the Penalty Area */}
            <Html position={[-1.75, 0.5, 0]} center>
                <div style={{
                    background: 'rgba(46, 204, 113, 0.9)',
                    color: 'white',
                    padding: '8px 15px',
                    borderRadius: '5px',
                    fontSize: '0.9rem',
                    fontWeight: 'bold',
                    border: '2px solid white',
                    textTransform: 'uppercase'
                }}>
                    Penalty Area
                </div>
            </Html>

            {/* Success message after kick */}
            {phase === 'done' && (
                <Html position={[-2, 2, -2]} center>
                    <div style={{
                        background: 'rgba(0, 255, 0, 0.9)',
                        color: '#000',
                        padding: '8px 20px',
                        borderRadius: '5px',
                        fontSize: '1.2rem',
                        fontWeight: 'bold',
                        border: '2px solid white'
                    }}>
                        ✅ LEGAL PLAY!
                    </div>
                </Html>
            )}
        </group>
    );
}