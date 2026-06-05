import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function PlayerMannequin({ targetPosition, position, color }) {
    const groupRef = useRef();

    // targetPosition uses [x, z] format (for FormationScene)
    // position uses [x, y, z] format (for other scenes)
    const posX = targetPosition ? targetPosition[0] : (position ? position[0] : 0);
    const posZ = targetPosition ? targetPosition[1] : (position ? position[2] : 0);

    const currentPos = useRef(new THREE.Vector3(posX, 0.6, posZ));

    useFrame(() => {
        if (!groupRef.current) return;

        const target = new THREE.Vector3(posX, 0.6, posZ);

        if (targetPosition) {
            // Smoothly move player towards the target position (Lerp) - Used in FormationScene
            currentPos.current.lerp(target, 0.05);
            groupRef.current.position.copy(currentPos.current);
        } else {
            // Static position - Used in other scenes like OfficialsScene
            groupRef.current.position.set(posX, 0.6, posZ);
        }
    });

    return (
        <group ref={groupRef}>
            {/* Body (Capsule shape) */}
            <mesh castShadow>
                <capsuleGeometry args={[0.2, 0.6, 4, 8]} />
                <meshStandardMaterial color={color} roughness={0.6} />
            </mesh>

            {/* Head */}
            <mesh position={[0, 0.55, 0]} castShadow>
                <sphereGeometry args={[0.18, 16, 16]} />
                <meshStandardMaterial color="#f5f5f5" roughness={0.8} />
            </mesh>
        </group>
    );
}