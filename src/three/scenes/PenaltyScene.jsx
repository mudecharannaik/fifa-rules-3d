import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Icosahedron, Wireframe, Cylinder } from '@react-three/drei';
import * as THREE from 'three';

export default function PenaltyScene({ isShooting, onReset }) {
    const ballRef = useRef();
    const gkRef = useRef();
    const timeRef = useRef(0);
    const [phase, setPhase] = useState('ready'); // ready, shooting, scored

    useFrame((state, delta) => {
        if (!ballRef.current || !gkRef.current) return;

        if (isShooting && phase === 'ready') {
            setPhase('shooting');
        }

        if (phase === 'shooting') {
            timeRef.current += delta;
            const t = Math.min(timeRef.current / 0.4, 1); // 0.4 seconds to reach net

            // Ball flies to top left corner
            const startX = 0, startY = 0.2, startZ = 0;
            const endX = -1.5, endY = 2.2, endZ = -5;

            ballRef.current.position.x = THREE.MathUtils.lerp(startX, endX, t);
            ballRef.current.position.y = THREE.MathUtils.lerp(startY, endY, t) - (4 * t * (1 - t)); // arc
            ballRef.current.position.z = THREE.MathUtils.lerp(startZ, endZ, t);

            // GK dives to the RIGHT (opposite the ball)
            const gkT = Math.min(timeRef.current / 0.3, 1);
            gkRef.current.position.x = THREE.MathUtils.lerp(0, 2, gkT);
            gkRef.current.position.y = THREE.MathUtils.lerp(0.6, 1.5, gkT);
            gkRef.current.rotation.z = THREE.MathUtils.lerp(0, -Math.PI / 3, gkT);

            if (t >= 1) {
                setPhase('scored');
                setTimeout(() => {
                    // Reset after goal
                    ballRef.current.position.set(0, 0.2, 0);
                    gkRef.current.position.set(0, 0.6, -5.5);
                    gkRef.current.rotation.set(0, 0, 0);
                    setPhase('ready');
                    timeRef.current = 0;
                    onReset();
                }, 1500);
            }
        } else if (phase === 'ready') {
            // Idle ball bounce
            ballRef.current.position.y = 0.2 + Math.sin(state.clock.elapsedTime * 2) * 0.03;
        }
    });

    return (
        <group>
            {/* Ground */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, -2.5]}>
                <planeGeometry args={[12, 12]} />
                <meshStandardMaterial color="#2b5329" />
            </mesh>

            {/* Penalty Spot */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
                <circleGeometry args={[0.1, 16]} />
                <meshBasicMaterial color="#ffffff" />
            </mesh>

            {/* --- THE GOAL --- */}
            <group position={[0, 0, -5.5]}>
                {/* Left Post */}
                <Cylinder args={[0.05, 0.05, 2.44, 8]} position={[-3.66, 1.22, 0]}>
                    <meshStandardMaterial color="#ffffff" />
                </Cylinder>
                {/* Right Post */}
                <Cylinder args={[0.05, 0.05, 2.44, 8]} position={[3.66, 1.22, 0]}>
                    <meshStandardMaterial color="#ffffff" />
                </Cylinder>
                {/* Crossbar */}
                <Cylinder args={[0.05, 0.05, 7.32, 8]} rotation={[0, 0, Math.PI / 2]} position={[0, 2.44, 0]}>
                    <meshStandardMaterial color="#ffffff" />
                </Cylinder>
                {/* Net (Simple translucent back wall) */}
                <mesh position={[0, 1.22, -1]}>
                    <planeGeometry args={[7.32, 2.44]} />
                    <meshStandardMaterial color="#ffffff" transparent opacity={0.3} side={2} />
                </mesh>
            </group>

            {/* --- FOOTBALL --- */}
            <group ref={ballRef} position={[0, 0.2, 0]}>
                <Icosahedron args={[0.15, 1]}>
                    <meshStandardMaterial color="#ffffff" roughness={0.4} />
                </Icosahedron>
                <Icosahedron args={[0.155, 1]}>
                    <Wireframe strokeColor="#000000" strokeWidth={1} />
                </Icosahedron>
            </group>

            {/* --- GOALKEEPER --- */}
            <group ref={gkRef} position={[0, 0.6, -5.5]}>
                {/* GK Body */}
                <mesh>
                    <capsuleGeometry args={[0.2, 0.6, 4, 8]} />
                    <meshStandardMaterial color="#ffcc00" roughness={0.6} /> {/* Yellow GK Kit */}
                </mesh>
                {/* GK Head */}
                <mesh position={[0, 0.55, 0]}>
                    <sphereGeometry args={[0.18, 16, 16]} />
                    <meshStandardMaterial color="#f5f5f5" />
                </mesh>
            </group>

            {/* --- REQUIRED DISTANCE MARKERS --- */}
            {/* Arc behind penalty spot (9.15m radius) */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
                <ringGeometry args={[1.5, 1.55, 32, 1, Math.PI / 4, Math.PI / 2]} />
                <meshBasicMaterial color="#D4AF37" side={2} />
            </mesh>
        </group>
    );
}