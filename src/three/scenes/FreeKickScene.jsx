import { Html, Icosahedron, Wireframe } from '@react-three/drei';
import PlayerMannequin from './PlayerMannequin';

export default function FreeKickScene({ wallDistance }) {
    // Standard 9.15m radius. In our scale, let's call it 2.5 units.
    const legalDistance = 2.5;
    const isEncroaching = wallDistance < legalDistance;

    return (
        <group>
            {/* Ground */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
                <planeGeometry args={[20, 20]} />
                <meshStandardMaterial color="#2b5329" />
            </mesh>

            {/* --- THE FOOTBALL --- */}
            <group position={[0, 0.2, 0]}>
                <Icosahedron args={[0.15, 1]}>
                    <meshStandardMaterial color="#ffffff" />
                </Icosahedron>
                <Icosahedron args={[0.155, 1]}>
                    <Wireframe strokeColor="#000000" strokeWidth={1} />
                </Icosahedron>
            </group>

            {/* --- ATTACKER (Kicker) --- */}
            <PlayerMannequin position={[-0.8, 0.6, 0]} color="#cc0000" />

            {/* --- DEFENSIVE WALL (Moveable) --- */}
            <group position={[wallDistance, 0, 0]}>
                <PlayerMannequin position={[0, 0.6, -0.6]} color="#0044cc" />
                <PlayerMannequin position={[0, 0.6, 0]} color="#0044cc" />
                <PlayerMannequin position={[0, 0.6, 0.6]} color="#0044cc" />
            </group>

            {/* --- 9.15m MEASUREMENT CIRCLE --- */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]}>
                <ringGeometry args={[legalDistance - 0.05, legalDistance + 0.05, 64]} />
                <meshBasicMaterial
                    color={isEncroaching ? "#ff0000" : "#2ECC71"}
                    transparent
                    opacity={0.8}
                />
            </mesh>

            {/* --- DISTANCE LINE --- */}
            <Html position={[wallDistance / 2, 2.5, 0]} center>
                <div style={{
                    background: isEncroaching ? 'rgba(255, 0, 0, 0.9)' : 'rgba(46, 204, 113, 0.9)',
                    color: 'white',
                    padding: '8px 15px',
                    borderRadius: '5px',
                    fontSize: '1rem',
                    fontWeight: 'bold',
                    fontFamily: 'monospace',
                    border: '2px solid white',
                    textTransform: 'uppercase'
                }}>
                    {isEncroaching ? '⛔ Too Close!' : `${(wallDistance / legalDistance * 9.15).toFixed(1)}m`}
                </div>
            </Html>
        </group>
    );
}