import { Html, Icosahedron, Wireframe } from '@react-three/drei';

export default function GoalLineScene({ ballX }) {
    // Goal line is at X = 0. The ball has a radius of 0.15.
    // For a goal, the WHOLE ball must be over the line. So X must be > 0.15
    const isGoal = ballX > 0.15;

    return (
        <group>
            <ambientLight intensity={0.6} />
            <directionalLight position={[5, 10, 5]} intensity={1} />

            {/* --- PITCH (Left side - In Play) --- */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-5, 0, 0]}>
                <planeGeometry args={[10, 8]} />
                <meshStandardMaterial color="#2b5329" />
            </mesh>

            {/* --- GOAL AREA (Right side - Past the line) --- */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[5, 0, 0]}>
                <planeGeometry args={[10, 8]} />
                <meshStandardMaterial color="#1a1a1a" />
            </mesh>

            {/* --- THE GOAL LINE (White) --- */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
                <planeGeometry args={[0.3, 8]} />
                <meshStandardMaterial color="#ffffff" />
            </mesh>

            {/* --- GOALPOST & CROSSBAR --- */}
            <mesh position={[0, 1.22, -3.66]}>
                <cylinderGeometry args={[0.05, 0.05, 2.44, 8]} />
                <meshStandardMaterial color="#ffffff" />
            </mesh>
            <mesh position={[0, 1.22, 3.66]}>
                <cylinderGeometry args={[0.05, 0.05, 2.44, 8]} />
                <meshStandardMaterial color="#ffffff" />
            </mesh>
            <mesh position={[0, 2.44, 0]} rotation={[0, 0, Math.PI / 2]}>
                <cylinderGeometry args={[0.05, 0.05, 7.32, 8]} />
                <meshStandardMaterial color="#ffffff" />
            </mesh>

            {/* --- NET (Translucent) --- */}
            <mesh position={[2, 1.22, 0]}>
                <planeGeometry args={[4, 2.44]} />
                <meshStandardMaterial color="#ffffff" transparent opacity={0.2} side={2} />
            </mesh>

            {/* --- THE FOOTBALL --- */}
            <group position={[ballX, 0.2, 0]}>
                <Icosahedron args={[0.15, 1]}>
                    <meshStandardMaterial color="#ffffff" />
                </Icosahedron>
                <Icosahedron args={[0.155, 1]}>
                    <Wireframe strokeColor="#000000" strokeWidth={1} />
                </Icosahedron>
            </group>

            {/* --- GLT SENSOR LINE (Glowing line on the goal line) --- */}
            <mesh position={[0, 0.02, 0]}>
                <planeGeometry args={[0.05, 8]} />
                <meshStandardMaterial color={isGoal ? "#00ff00" : "#ff0000"} emissive={isGoal ? "#00ff00" : "#ff0000"} emissiveIntensity={2} />
            </mesh>

            {/* --- 3D STATUS OVERLAY --- */}
            <Html position={[1, 2.5, 0]} center>
                <div style={{
                    background: isGoal ? 'rgba(0, 255, 0, 0.9)' : 'rgba(255, 0, 0, 0.9)',
                    color: 'white',
                    padding: '10px 30px',
                    borderRadius: '8px',
                    fontSize: '1.5rem',
                    fontWeight: 'bold',
                    fontFamily: 'monospace',
                    border: '2px solid white',
                    boxShadow: `0 0 20px ${isGoal ? 'rgba(0,255,0,0.5)' : 'rgba(255,0,0,0.5)'}`,
                    textTransform: 'uppercase',
                    letterSpacing: '2px',
                    opacity: ballX > -0.5 ? 1 : 0 // Only show when near the line
                }}>
                    {isGoal ? '⚽ GOAL!' : '🚫 NO GOAL'}
                </div>
            </Html>
        </group>
    );
}