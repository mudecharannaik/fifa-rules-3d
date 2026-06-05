import * as THREE from 'three';
import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html, Icosahedron, Wireframe } from '@react-three/drei';
import PlayerMannequin from './PlayerMannequin';

export default function ThrowInScene({ footDistance, isThrowing, onReset }) {
    const ballRef = useRef();
    const timeRef = useRef(0);
    const [phase, setPhase] = useState('ready'); // ready, throwing, done

    // Is it a foul throw? Feet must be ON or BEHIND the line (<= 0).
    // If footDistance goes positive (feet fully on the pitch), it's a foul.
    const isFoulThrow = footDistance > 0.1;

    useFrame((state, delta) => {
        if (!ballRef.current) return;

        if (isThrowing && phase === 'ready') {
            setPhase('throwing');
        }

        if (phase === 'throwing') {
            timeRef.current += delta;
            const t = Math.min(timeRef.current / 0.6, 1); // 0.6 seconds to reach target

            // Parabolic arc from player's hands to the pitch
            const startX = footDistance - 0.5, startY = 1.8, startZ = 0;
            const endX = footDistance - 3, endY = 0.2, endZ = 0;

            ballRef.current.position.x = THREE.MathUtils.lerp(startX, endX, t);
            ballRef.current.position.y = THREE.MathUtils.lerp(startY, endY, t) - (5 * t * (1 - t)); // Arc
            ballRef.current.position.z = THREE.MathUtils.lerp(startZ, endZ, t);

            if (t >= 1) {
                setPhase('done');
                setTimeout(() => {
                    ballRef.current.position.set(footDistance - 0.5, 1.8, 0);
                    timeRef.current = 0;
                    setPhase('ready');
                    onReset();
                }, 1000);
            }
        } else if (phase === 'ready') {
            // Ball hovers in player's hands
            ballRef.current.position.set(footDistance - 0.5, 1.8, 0);
        }
    });

    return (
        <group>
            <ambientLight intensity={0.6} />
            <directionalLight position={[5, 10, 5]} intensity={1} />

            {/* --- PITCH (In Play) --- */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-5, 0, 0]}>
                <planeGeometry args={[10, 10]} />
                <meshStandardMaterial color="#2b5329" />
            </mesh>

            {/* --- OUT OF PLAY AREA --- */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[5, 0, 0]}>
                <planeGeometry args={[10, 10]} />
                <meshStandardMaterial color="#1a1a1a" />
            </mesh>

            {/* --- TOUCHLINE --- */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
                <planeGeometry args={[0.3, 10]} />
                <meshStandardMaterial color="#ffffff" />
            </mesh>

            {/* --- THE THROWER --- */}
            <group position={[footDistance, 0, 0]}>
                <PlayerMannequin position={[0, 0.6, 0]} color="#cc0000" />

                {/* Simple representation of feet on the ground */}
                <mesh position={[-0.1, 0.05, -0.2]}>
                    <boxGeometry args={[0.2, 0.1, 0.3]} />
                    <meshStandardMaterial color="#000000" />
                </mesh>
                <mesh position={[-0.1, 0.05, 0.2]}>
                    <boxGeometry args={[0.2, 0.1, 0.3]} />
                    <meshStandardMaterial color="#000000" />
                </mesh>
            </group>

            {/* --- THE FOOTBALL --- */}
            <group ref={ballRef}>
                <Icosahedron args={[0.15, 1]}>
                    <meshStandardMaterial color="#ffffff" />
                </Icosahedron>
                <Icosahedron args={[0.155, 1]}>
                    <Wireframe strokeColor="#000000" strokeWidth={1} />
                </Icosahedron>
            </group>

            {/* --- STATUS INDICATOR --- */}
            <Html position={[0, 3, 0]} center>
                <div style={{
                    background: isFoulThrow ? 'rgba(255, 0, 0, 0.9)' : 'rgba(46, 204, 113, 0.9)',
                    color: 'white',
                    padding: '10px 30px',
                    borderRadius: '8px',
                    fontSize: '1.5rem',
                    fontWeight: 'bold',
                    border: '2px solid white',
                    textTransform: 'uppercase',
                    letterSpacing: '2px'
                }}>
                    {isFoulThrow ? '🚫 FOUL THROW' : '✅ LEGAL POSITION'}
                </div>
            </Html>
        </group>
    );
}