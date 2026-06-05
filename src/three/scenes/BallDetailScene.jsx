import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Icosahedron, Wireframe, Html } from '@react-three/drei';

export default function BallDetailScene() {
    const ballRef = useRef();
    const [kicked, setKicked] = useState(false);
    const timeRef = useRef(0);

    // Animation loop for the "kick"
    useFrame((state, delta) => {
        if (!ballRef.current) return;

        if (kicked) {
            timeRef.current += delta;
            const t = timeRef.current;

            // Simulate gravity and forward motion over 2 seconds
            if (t < 2) {
                ballRef.current.position.y = 1.5 + (6 * t) - (3 * t * t); // Parabolic arc
                ballRef.current.position.z = -3 * t; // Move forward
                ballRef.current.rotation.x += delta * 8; // Spin fast
            } else {
                // Reset ball after 2 seconds
                ballRef.current.position.set(0, 1.5, 0);
                timeRef.current = 0;
                setKicked(false);
            }
        } else {
            // Gentle idle floating
            ballRef.current.position.y = 1.5 + Math.sin(state.clock.elapsedTime) * 0.2;
            ballRef.current.rotation.y += delta * 0.3;
        }
    });

    return (
        <group ref={ballRef} position={[0, 1.5, 0]} onClick={() => setKicked(true)}>
            {/* Main White Ball */}
            <Icosahedron args={[1.5, 1]}>
                <meshStandardMaterial color="#ffffff" roughness={0.3} metalness={0.1} />
            </Icosahedron>

            {/* Black Wireframe Pentagons */}
            <Icosahedron args={[1.52, 1]}>
                <Wireframe strokeColor="#000000" strokeWidth={2} />
            </Icosahedron>

            {/* Floating Dimension Label */}
            <Html position={[0, 2.2, 0]} center>
                <div style={{
                    background: 'rgba(10, 31, 10, 0.9)',
                    color: '#D4AF37',
                    padding: '8px 15px',
                    borderRadius: '8px',
                    border: '1px solid #2ECC71',
                    whiteSpace: 'nowrap',
                    pointerEvents: 'none',
                    fontSize: '0.9rem',
                    fontWeight: 'bold',
                    boxShadow: '0 4px 6px rgba(0,0,0,0.3)'
                }}>
                    Circumference: 68-70 cm
                </div>
            </Html>
        </group>
    );
}