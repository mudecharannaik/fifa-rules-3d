import { Html } from '@react-three/drei';
import PlayerMannequin from './PlayerMannequin';
import PitchScene from './PitchScene';

export default function OfficialsScene({ signal }) {
    let rightArmRotZ = 0;
    let leftArmRotZ = 0;
    let signalText = "";
    let signalColor = "#ffffff";

    if (signal === 'direct') {
        rightArmRotZ = -Math.PI / 4;
        signalText = "👉 Direct Free Kick";
        signalColor = "#ff0000";
    } else if (signal === 'indirect') {
        rightArmRotZ = 0;
        signalText = "☝️ Indirect Free Kick";
        signalColor = "#ffcc00";
    } else if (signal === 'advantage') {
        rightArmRotZ = -Math.PI / 2;
        leftArmRotZ = Math.PI / 2;
        signalText = "🤚 Advantage Play On!";
        signalColor = "#2ECC71";
    }

    return (
        <group>
            <PitchScene highlight="full" />

            {/* ASSISTANT REFEREE 1 */}
            <group position={[-5.25, 0, -2]}>
                <PlayerMannequin position={[0, 0.6, 0]} color="#ffcc00" />
                <mesh position={[0.3, 1.3, 0]}>
                    <boxGeometry args={[0.03, 0.6, 0.03]} />
                    <meshStandardMaterial color="#8B4513" />
                </mesh>
                <mesh position={[0.3, 1.65, 0.1]}>
                    <planeGeometry args={[0.3, 0.2]} />
                    <meshStandardMaterial color="#ff0000" side={2} />
                </mesh>
                <Html position={[0, 2.5, 0]} center>
                    <div style={labelStyle}>AR1 (Offside/Touchline)</div>
                </Html>
            </group>

            {/* ASSISTANT REFEREE 2 */}
            <group position={[-5.25, 0, 2]}>
                <PlayerMannequin position={[0, 0.6, 0]} color="#ffcc00" />
                <mesh position={[0.3, 1.3, 0]}>
                    <boxGeometry args={[0.03, 0.6, 0.03]} />
                    <meshStandardMaterial color="#8B4513" />
                </mesh>
                <mesh position={[0.3, 1.65, 0.1]}>
                    <planeGeometry args={[0.3, 0.2]} />
                    <meshStandardMaterial color="#ff0000" side={2} />
                </mesh>
                <Html position={[0, 2.5, 0]} center>
                    <div style={labelStyle}>AR2 (Offside/Touchline)</div>
                </Html>
            </group>

            {/* 4TH OFFICIAL */}
            <group position={[0, 0, -5]}>
                <PlayerMannequin position={[0, 0.6, 0]} color="#ffcc00" />
                <Html position={[0, 2.5, 0]} center>
                    <div style={labelStyle}>4th Official (Technical Area)</div>
                </Html>
            </group>

            {/* MAIN REFEREE */}
            <group position={[0, 0, 0]}>
                <mesh position={[0, 1.2, 0]}>
                    <capsuleGeometry args={[0.2, 0.4, 4, 8]} />
                    <meshStandardMaterial color="#000000" />
                </mesh>
                <mesh position={[0, 1.75, 0]}>
                    <sphereGeometry args={[0.18, 16, 16]} />
                    <meshStandardMaterial color="#f5f5f5" />
                </mesh>

                {/* Right Arm */}
                <group position={[0.25, 1.35, 0]} rotation={[0, 0, rightArmRotZ]}>
                    <mesh position={[0.15, -0.2, 0]}>
                        <capsuleGeometry args={[0.05, 0.4, 4, 8]} />
                        <meshStandardMaterial color="#000000" />
                    </mesh>
                </group>

                {/* Left Arm */}
                <group position={[-0.25, 1.35, 0]} rotation={[0, 0, leftArmRotZ]}>
                    <mesh position={[-0.15, -0.2, 0]}>
                        <capsuleGeometry args={[0.05, 0.4, 4, 8]} />
                        <meshStandardMaterial color="#000000" />
                    </mesh>
                </group>

                {/* Legs */}
                <mesh position={[-0.1, 0.5, 0]}>
                    <capsuleGeometry args={[0.08, 0.4, 4, 8]} />
                    <meshStandardMaterial color="#000000" />
                </mesh>
                <mesh position={[0.1, 0.5, 0]}>
                    <capsuleGeometry args={[0.08, 0.4, 4, 8]} />
                    <meshStandardMaterial color="#000000" />
                </mesh>

                {/* Signal Label */}
                {signal !== 'none' && (
                    <Html position={[0, 2.8, 0]} center>
                        <div style={{
                            background: signalColor,
                            color: '#000',
                            padding: '8px 20px',
                            borderRadius: '5px',
                            fontSize: '1.2rem',
                            fontWeight: 'bold',
                            border: '2px solid white',
                            boxShadow: `0 0 15px ${signalColor}`
                        }}>
                            {signalText}
                        </div>
                    </Html>
                )}
            </group>
        </group>
    );
}

const labelStyle = {
    background: 'rgba(255, 204, 0, 0.9)',
    color: '#000',
    padding: '5px 10px',
    borderRadius: '5px',
    fontSize: '0.8rem',
    fontWeight: 'bold',
    whiteSpace: 'nowrap',
    border: '1px solid black'
};