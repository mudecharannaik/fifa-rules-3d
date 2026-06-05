import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Icosahedron, Wireframe } from '@react-three/drei';

export default function BallScene() {
    const ballRef = useRef();

    // Rotate the ball slowly every frame
    useFrame((state, delta) => {
        if (ballRef.current) {
            ballRef.current.rotation.y += delta * 0.5;
            ballRef.current.rotation.x += delta * 0.2;
        }
    });

    return (
        <group ref={ballRef}>
            {/* Main white shape of the football */}
            <Icosahedron args={[1.5, 1]}>
                <meshStandardMaterial color="#ffffff" roughness={0.4} metalness={0.1} />
            </Icosahedron>

            {/* The black pentagons/lines on the football (Wireframe overlay) */}
            <Icosahedron args={[1.52, 1]}>
                <Wireframe
                    strokeColor="#000000"
                    strokeWidth={2}
                    backfaceStrokeColor="#000000"
                />
            </Icosahedron>
        </group>
    );
}