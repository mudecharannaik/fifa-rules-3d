import PlayerMannequin from './PlayerMannequin';
import PitchScene from './PitchScene';
import { Html } from '@react-three/drei'; // Import added

export default function OffsideScene({ strikerX }) {
    // Defenders' X position (attacking left to right)
    const defLineX = 2.0;

    // Is the striker ahead of the 2nd last defender? (Goalkeeper is the last)
    // Striker is offside if their X is GREATER than the defensive line X
    const isOffside = strikerX > defLineX;

    return (
        <group>
            {/* Reuse the pitch, but let's tint it red if offside */}
            <PitchScene highlight={isOffside ? 'penalty' : 'full'} />

            {/* --- DEFENSIVE TEAM (Blue) --- */}
            <PlayerMannequin position={[-4.5, 0.6, 0]} color="#0044cc" /> {/* GK (Last defender) */}
            <PlayerMannequin position={[defLineX, 0.6, -1.5]} color="#0044cc" /> {/* Defender 1 */}
            <PlayerMannequin position={[defLineX, 0.6, 0]} color="#0044cc" /> {/* Defender 2 (2nd Last) */}
            <PlayerMannequin position={[defLineX, 0.6, 1.5]} color="#0044cc" /> {/* Defender 3 */}

            {/* --- ATTACKING TEAM (Red) --- */}
            {/* Player passing the ball */}
            <mesh position={[-1, 0.2, -2]}>
                <sphereGeometry args={[0.2, 16, 16]} />
                <meshStandardMaterial color="#ffffff" />
            </mesh>
            <PlayerMannequin position={[-1, 0.6, -2]} color="#cc0000" />

            {/* The Striker - Position controlled by slider */}
            <PlayerMannequin position={[strikerX, 0.6, 0]} color="#cc0000" />

            {/* --- THE OFFSIDE LINE --- */}
            <mesh position={[defLineX, 1.5, 0]} rotation={[0, -Math.PI / 2, 0]}>
                <planeGeometry args={[6.8, 3]} />
                <meshStandardMaterial
                    color={isOffside ? "#ff0000" : "#00ff00"}
                    transparent={true}
                    opacity={0.2}
                    side={2}
                />
            </mesh>

            {/* Dynamic HTML Text Label floating above the line */}
            <Html position={[defLineX, 3.5, 0]} center>
                <div style={{
                    background: isOffside ? 'rgba(255, 0, 0, 0.9)' : 'rgba(0, 255, 0, 0.9)',
                    color: 'white',
                    padding: '10px 30px',
                    borderRadius: '5px',
                    fontSize: '1.5rem',
                    fontWeight: 'bold',
                    border: '2px solid white',
                    boxShadow: '0 4px 6px rgba(0,0,0,0.5)',
                    textTransform: 'uppercase',
                    letterSpacing: '2px'
                }}>
                    {isOffside ? '⛔ OFFSIDE' : '✅ ONSIDE'}
                </div>
            </Html>
        </group>
    );
}
