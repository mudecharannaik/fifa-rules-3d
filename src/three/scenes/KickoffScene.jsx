import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Icosahedron, Wireframe } from '@react-three/drei';
import PlayerMannequin from './PlayerMannequin';
import PitchScene from './PitchScene';

export default function KickoffScene({ isKicked, onReset }) {
    const ballRef = useRef();
    const timeRef = useRef(0);
    const [phase, setPhase] = useState('ready'); // ready, kicked, done

    useFrame((state, delta) => {
        if (!ballRef.current) return;

        if (isKicked && phase === 'ready') {
            setPhase('kicked');
        }

        if (phase === 'kicked') {
            timeRef.current += delta;
            // Ball rolls forward into the opponent's half
            if (timeRef.current < 0.8) {
                ballRef.current.position.z = -3 * timeRef.current;
            } else {
                setPhase('done');
                setTimeout(() => {
                    ballRef.current.position.set(0, 0.2, 0);
                    timeRef.current = 0;
                    setPhase('ready');
                    onReset();
                }, 1500);
            }
        } else if (phase === 'ready') {
            // Idle ball
            ballRef.current.position.y = 0.2 + Math.sin(state.clock.elapsedTime * 2) * 0.03;
        }
    });

    return (
        <group>
            <PitchScene highlight="center" /> {/* Highlight center circle to show restriction */}

            {/* --- FOOTBALL --- */}
            <group ref={ballRef} position={[0, 0.2, 0]}>
                <Icosahedron args={[0.15, 1]}>
                    <meshStandardMaterial color="#ffffff" />
                </Icosahedron>
                <Icosahedron args={[0.155, 1]}>
                    <Wireframe strokeColor="#000000" strokeWidth={1} />
                </Icosahedron>
            </group>

            {/* --- RED TEAM (Left Side) --- */}
            <PlayerMannequin position={[-4.5, 0.6, 0]} color="#0044cc" /> {/* GK */}
            <PlayerMannequin position={[-0.3, 0.6, 0]} color="#cc0000" /> {/* Kicker */}
            <PlayerMannequin position={[-1.5, 0.6, -2]} color="#cc0000" />
            <PlayerMannequin position={[-1.5, 0.6, 2]} color="#cc0000" />
            <PlayerMannequin position={[-2.5, 0.6, 0]} color="#cc0000" />

            {/* --- BLUE TEAM (Right Side) --- */}
            <PlayerMannequin position={[4.5, 0.6, 0]} color="#cc0000" /> {/* GK */}
            <PlayerMannequin position={[1, 0.6, -1.5]} color="#0044cc" /> {/* Opponent at circle edge */}
            <PlayerMannequin position={[1, 0.6, 1.5]} color="#0044cc" />
            <PlayerMannequin position={[2, 0.6, 0]} color="#0044cc" />

            {/* Visual Indicator for "In Own Half" rule */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, -2.5]}>
                <planeGeometry args={[10.5, 2]} />
                <meshBasicMaterial color="#cc0000" transparent opacity={0.15} side={2} />
            </mesh>
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 2.5]}>
                <planeGeometry args={[10.5, 2]} />
                <meshBasicMaterial color="#0044cc" transparent opacity={0.15} side={2} />
            </mesh>
        </group>
    );
}