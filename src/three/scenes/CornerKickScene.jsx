import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html, Icosahedron, Wireframe } from '@react-three/drei';
import * as THREE from 'three';
import PlayerMannequin from './PlayerMannequin';

export default function CornerKickScene({ isShooting, onReset }) {
    const ballRef = useRef();
    const timeRef = useRef(0);
    const [phase, setPhase] = useState('ready');

    useFrame((state, delta) => {
        if (!ballRef.current) return;

        if (isShooting && phase === 'ready') {
            setPhase('shooting');
        }

        if (phase === 'shooting') {
            timeRef.current += delta;
            const t = Math.min(timeRef.current / 1.2, 1); // 1.2 seconds to reach the goal

            // Olimpico trajectory: from corner (0.3, 0, 0.3) to top corner of goal (5, 2.4, 0)
            const startX = 0.3, startZ = 0.3, startY = 0.2;
            const endX = 5, endZ = 0, endY = 2.2;

            ballRef.current.position.x = THREE.MathUtils.lerp(startX, endX, t);
            ballRef.current.position.z = THREE.MathUtils.lerp(startZ, endZ, t);
            // Add a nice upward arc
            ballRef.current.position.y = THREE.MathUtils.lerp(startY, endY, t) + (3 * Math.sin(Math.PI * t));

            // Spin the ball as it flies
            ballRef.current.rotation.y += delta * 10;
            ballRef.current.rotation.z += delta * 5;

            if (t >= 1) {
                setPhase('scored');
                setTimeout(() => {
                    ballRef.current.position.set(0.3, 0.2, 0.3);
                    timeRef.current = 0;
                    setPhase('ready');
                    onReset();
                }, 2000);
            }
        } else if (phase === 'ready') {
            ballRef.current.position.y = 0.2 + Math.sin(state.clock.elapsedTime * 2) * 0.03;
        }
    });

    return (
        <group>
            <ambientLight intensity={0.6} />
            <directionalLight position={[10, 10, 5]} intensity={1} />

            {/* --- PITCH (The quadrant where the corner is taken) --- */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[5, 0, 5]}>
                <planeGeometry args={[15, 15]} />
                <meshStandardMaterial color="#2b5329" />
            </mesh>

            {/* Touchline & Goal line borders */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[5, 0.01, -0.075]}>
                <planeGeometry args={[15, 0.15]} />
                <meshStandardMaterial color="#ffffff" />
            </mesh>
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-0.075, 0.01, 5]}>
                <planeGeometry args={[0.15, 15]} />
                <meshStandardMaterial color="#ffffff" />
            </mesh>

            {/* --- CORNER ARC (Quarter circle) --- */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]}>
                <ringGeometry args={[0.4, 0.45, 16, 1, 0, Math.PI / 2]} />
                <meshStandardMaterial color="#ffffff" />
            </mesh>

            {/* --- CORNER FLAG --- */}
            <mesh position={[0, 1, 0]}>
                <cylinderGeometry args={[0.02, 0.02, 2, 8]} />
                <meshStandardMaterial color="#ffffff" />
            </mesh>
            <mesh position={[0.15, 1.8, 0]}>
                <planeGeometry args={[0.3, 0.2]} />
                <meshStandardMaterial color="#ff0000" side={2} />
            </mesh>

            {/* --- THE GOAL --- */}
            <group position={[5, 0, 0]}>
                <mesh position={[0, 1.22, -2.5]}>
                    <cylinderGeometry args={[0.05, 0.05, 2.44, 8]} />
                    <meshStandardMaterial color="#ffffff" />
                </mesh>
                <mesh position={[0, 1.22, 2.5]}>
                    <cylinderGeometry args={[0.05, 0.05, 2.44, 8]} />
                    <meshStandardMaterial color="#ffffff" />
                </mesh>
                <mesh position={[0, 2.44, 0]} rotation={[0, 0, Math.PI / 2]}>
                    <cylinderGeometry args={[0.05, 0.05, 5, 8]} />
                    <meshStandardMaterial color="#ffffff" />
                </mesh>
                <mesh position={[0.5, 1.22, 0]}>
                    <planeGeometry args={[1, 2.44]} />
                    <meshStandardMaterial color="#ffffff" transparent opacity={0.2} side={2} />
                </mesh>
            </group>

            {/* --- ATTACKER (Kicker) --- */}
            <PlayerMannequin position={[0.6, 0.6, 0.6]} color="#cc0000" />

            {/* --- DEFENDERS --- */}
            <PlayerMannequin position={[4, 0.6, 1.5]} color="#0044cc" />
            <PlayerMannequin position={[4, 0.6, -1.5]} color="#0044cc" />

            {/* --- FOOTBALL --- */}
            <group ref={ballRef} position={[0.3, 0.2, 0.3]}>
                <Icosahedron args={[0.15, 1]}>
                    <meshStandardMaterial color="#ffffff" />
                </Icosahedron>
                <Icosahedron args={[0.155, 1]}>
                    <Wireframe strokeColor="#000000" strokeWidth={1} />
                </Icosahedron>
            </group>

            {/* --- OLIMPICO SUCCESS LABEL --- */}
            {phase === 'scored' && (
                <Html position={[5, 3, 0]} center>
                    <div style={{
                        background: 'rgba(212, 175, 55, 0.95)',
                        color: '#000',
                        padding: '15px 30px',
                        borderRadius: '8px',
                        fontSize: '1.8rem',
                        fontWeight: 'bold',
                        border: '3px solid white',
                        textTransform: 'uppercase',
                        letterSpacing: '3px',
                        boxShadow: '0 0 30px rgba(212, 175, 55, 0.5)'
                    }}>
                        🏆 OLIMPICO!
                    </div>
                </Html>
            )}
        </group>
    );
}