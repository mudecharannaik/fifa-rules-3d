import { useMemo } from 'react';
import { Line, Cylinder } from '@react-three/drei';

export default function PitchScene({ highlight }) {
    // Standard Pitch Dimensions (scaled down for 3D: 1 unit = 10 meters)
    // 105m x 68m -> 10.5 x 6.8 units
    const pW = 10.5; // Pitch Width (x-axis)
    const pH = 6.8;  // Pitch Height (z-axis)
    const lineColor = "#ffffff";
    const grassColor = highlight === 'full' ? "#1a4d1a" : "#2b5329";

    // Line thickness
    const lt = 0.05;

    return (
        <group>
            {/* Grass Surface */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
                <planeGeometry args={[pW, pH]} />
                <meshStandardMaterial color={grassColor} />
            </mesh>

            {/* Boundary Lines */}
            <Line
                points={[[-pW / 2, 0.01, -pH / 2], [pW / 2, 0.01, -pH / 2], [pW / 2, 0.01, pH / 2], [-pW / 2, 0.01, pH / 2], [-pW / 2, 0.01, -pH / 2]]}
                color={lineColor}
                lineWidth={lt}
            />

            {/* Halfway Line */}
            <Line points={[[0, 0.01, -pH / 2], [0, 0.01, pH / 2]]} color={lineColor} lineWidth={lt} />

            {/* Center Circle (Radius: 9.15m -> 0.915 units) */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
                <ringGeometry args={[0.91, 0.92, 64]} />
                <meshBasicMaterial color={highlight === 'center' ? "#D4AF37" : lineColor} side={2} />
            </mesh>

            {/* Center Spot */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
                <circleGeometry args={[0.05, 16]} />
                <meshBasicMaterial color={lineColor} />
            </mesh>

            {/* Penalty Areas (Left & Right) */}
            {/* 40.32m wide (4.032), 16.5m deep (1.65) */}
            <Line
                points={[[-pW / 2, 0.01, -2.016], [-pW / 2 + 1.65, 0.01, -2.016], [-pW / 2 + 1.65, 0.01, 2.016], [-pW / 2, 0.01, 2.016]]}
                color={highlight === 'penalty' ? "#D4AF37" : lineColor}
                lineWidth={lt}
            />
            <Line
                points={[[pW / 2, 0.01, -2.016], [pW / 2 - 1.65, 0.01, -2.016], [pW / 2 - 1.65, 0.01, 2.016], [pW / 2, 0.01, 2.016]]}
                color={highlight === 'penalty' ? "#D4AF37" : lineColor}
                lineWidth={lt}
            />

            {/* Goals (Left & Right) - 7.32m wide (0.732), 2.44m high (0.244) */}
            <group position={[-pW / 2, 0.122, 0]}>
                {/* Left Goal Posts */}
                <Cylinder args={[0.03, 0.03, 0.244, 8]} position={[0, 0, -0.366]} color="white" />
                <Cylinder args={[0.03, 0.03, 0.244, 8]} position={[0, 0, 0.366]} color="white" />
                {/* Crossbar */}
                <Cylinder args={[0.03, 0.03, 0.732, 8]} rotation={[Math.PI / 2, 0, 0]} position={[0, 0.244, 0]} color="white" />
            </group>

            <group position={[pW / 2, 0.122, 0]}>
                {/* Right Goal Posts */}
                <Cylinder args={[0.03, 0.03, 0.244, 8]} position={[0, 0, -0.366]} color="white" />
                <Cylinder args={[0.03, 0.03, 0.244, 8]} position={[0, 0, 0.366]} color="white" />
                {/* Crossbar */}
                <Cylinder args={[0.03, 0.03, 0.732, 8]} rotation={[Math.PI / 2, 0, 0]} position={[0, 0.244, 0]} color="white" />
            </group>
        </group>
    );
}