import { Html } from '@react-three/drei';
import PlayerMannequin from './PlayerMannequin';
import PitchScene from './PitchScene';

export default function VARScene({ isChecking }) {
    const defLineX = 1.5;
    const strikerX = 1.8; // Slightly offside

    // Determine the result after the "check"
    const isOffside = isChecking && strikerX > defLineX;

    return (
        <group>
            <PitchScene highlight="full" />

            {/* --- DEFENSIVE TEAM (Blue) --- */}
            <PlayerMannequin position={[-4.5, 0.6, 0]} color="#0044cc" />
            <PlayerMannequin position={[defLineX, 0.6, -1.5]} color="#0044cc" />
            <PlayerMannequin position={[defLineX, 0.6, 0]} color="#0044cc" />
            <PlayerMannequin position={[defLineX, 0.6, 1.5]} color="#0044cc" />

            {/* --- ATTACKING TEAM (Red) --- */}
            <PlayerMannequin position={[-1, 0.6, -2]} color="#cc0000" />
            {/* Striker (Slightly offside) */}
            <PlayerMannequin position={[strikerX, 0.6, 0]} color="#cc0000" />

            {/* --- VAR TECHNOLOGY LINES --- */}
            {isChecking && (
                <>
                    {/* 1. Defensive Line (Cyan laser) */}
                    <mesh position={[defLineX, 0.5, 0]} rotation={[0, -Math.PI / 2, 0]}>
                        <planeGeometry args={[6.8, 3]} />
                        <meshBasicMaterial color="#00ffff" transparent opacity={0.3} side={2} />
                    </mesh>

                    {/* 2. Striker Line (Where the striker's shoulder/arm is) */}
                    <mesh position={[strikerX, 0.5, 0]} rotation={[0, -Math.PI / 2, 0]}>
                        <planeGeometry args={[6.8, 3]} />
                        <meshBasicMaterial color="#ff0000" transparent opacity={0.3} side={2} />
                    </mesh>

                    {/* 3. Camera Ray from above (Simulating the tracking camera) */}
                    <mesh position={[1.5, 8, 0]} rotation={[Math.PI / 2, 0, 0]}>
                        <cylinderGeometry args={[0.1, 1.5, 8, 4]} />
                        <meshBasicMaterial color="#00ffff" transparent opacity={0.2} />
                    </mesh>

                    {/* 3D Overhead UI */}
                    <Html position={[0, 4, 0]} center>
                        <div style={{
                            background: isOffside ? 'rgba(255, 0, 0, 0.9)' : 'rgba(0, 255, 0, 0.9)',
                            color: 'white',
                            padding: '15px 40px',
                            borderRadius: '8px',
                            fontSize: '1.8rem',
                            fontWeight: 'bold',
                            fontFamily: 'monospace',
                            border: '2px solid white',
                            boxShadow: '0 0 20px rgba(0,0,0,0.8)',
                            textTransform: 'uppercase',
                            letterSpacing: '3px'
                        }}>
                            {isOffside ? '🚫 OFFSIDE CONFIRMED' : '✅ GOAL CONFIRMED'}
                        </div>
                    </Html>
                </>
            )}
        </group>
    );
}