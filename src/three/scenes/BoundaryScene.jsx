import { Html } from '@react-three/drei';
import { Icosahedron, Wireframe } from '@react-three/drei';

export default function BoundaryScene({ ballZ }) {
    // The pitch ends at Z=0. The touchline is drawn up to Z=0.
    // If the ball center passes Z=0.15 (radius of ball), it is OUT.
    const isOut = ballZ > 0.15;

    return (
        <group>
            <ambientLight intensity={0.6} />
            <directionalLight position={[5, 10, 5]} intensity={1} />

            {/* --- PITCH SECTION (Inside is Z < 0) --- */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, -5]}>
                <planeGeometry args={[10, 10]} />
                <meshStandardMaterial color="#2b5329" />
            </mesh>

            {/* --- OUT OF PLAY SECTION (Outside is Z > 0) --- */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 5]}>
                <planeGeometry args={[10, 10]} />
                <meshStandardMaterial color="#1a1a1a" />
            </mesh>

            {/* --- TOUCHLINE (White line at the border) --- */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
                <planeGeometry args={[10, 0.3]} />
                <meshStandardMaterial color="#ffffff" />
            </mesh>

            {/* --- CORNER FLAG --- */}
            <mesh position={[0, 1.5, 0]}>
                <cylinderGeometry args={[0.03, 0.03, 3, 8]} />
                <meshStandardMaterial color="#ffffff" />
            </mesh>
            <mesh position={[0.2, 2.8, 0]}>
                <planeGeometry args={[0.4, 0.3]} />
                <meshStandardMaterial color="#ff0000" side={2} />
            </mesh>

            {/* --- THE FOOTBALL --- */}
            <group position={[0, 0.2, ballZ]}>
                <Icosahedron args={[0.15, 1]}>
                    <meshStandardMaterial color="#ffffff" />
                </Icosahedron>
                <Icosahedron args={[0.155, 1]}>
                    <Wireframe strokeColor="#000000" strokeWidth={1} />
                </Icosahedron>
            </group>

            {/* --- MEASUREMENT LINE / SCANNER --- */}
            <mesh position={[0, 0.02, 0]}>
                <planeGeometry args={[0.02, 20]} />
                <meshStandardMaterial color={isOut ? "#ff0000" : "#2ECC71"} transparent opacity={0.8} />
            </mesh>

            {/* --- 3D STATUS LABEL --- */}
            <Html position={[0, 3, 0]} center>
                <div style={{
                    background: isOut ? 'rgba(255, 0, 0, 0.9)' : 'rgba(46, 204, 113, 0.9)',
                    color: 'white',
                    padding: '10px 30px',
                    borderRadius: '8px',
                    fontSize: '1.5rem',
                    fontWeight: 'bold',
                    border: '2px solid white',
                    boxShadow: '0 4px 6px rgba(0,0,0,0.5)',
                    textTransform: 'uppercase',
                    letterSpacing: '2px'
                }}>
                    {isOut ? '🛑 OUT OF PLAY' : '✅ IN PLAY'}
                </div>
            </Html>
        </group>
    );
}