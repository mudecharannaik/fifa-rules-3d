import PlayerMannequin from './PlayerMannequin';
import PitchScene from './PitchScene';

export default function FoulScene({ cardType }) {
    const cardColor = cardType === 'red' ? '#ff0000' : cardType === 'yellow' ? '#ffd700' : '#ffffff';
    const spotlightIntensity = cardType !== 'none' ? 2 : 0;

    return (
        <group>
            <PitchScene highlight="full" />

            {/* Player with the ball (being fouled) */}
            <mesh position={[1, 0.2, 0.5]}>
                <sphereGeometry args={[0.2, 16, 16]} />
                <meshStandardMaterial color="#ffffff" />
            </mesh>
            <PlayerMannequin position={[0.8, 0.6, 0.2]} color="#0044cc" />

            {/* Tackling Player (Fouler) */}
            <group rotation={[0, Math.PI / 4, -0.5]} position={[1.5, 0.2, 0]}>
                <PlayerMannequin position={[0, 0.4, 0]} color="#cc0000" />
            </group>

            {/* REFEREE CARD */}
            {cardType !== 'none' && (
                <group position={[-2, 2.5, 0]} rotation={[0, 0, Math.PI / 6]}>
                    <mesh position={[0, -0.6, 0]}>
                        <cylinderGeometry args={[0.05, 0.05, 0.8, 8]} />
                        <meshStandardMaterial color="#f5f5dc" />
                    </mesh>
                    <mesh>
                        <boxGeometry args={[1.2, 1.8, 0.05]} />
                        <meshStandardMaterial color={cardColor} emissive={cardColor} emissiveIntensity={0.5} />
                    </mesh>
                </group>
            )}

            <spotLight position={[-2, 6, 2]} angle={0.5} intensity={spotlightIntensity} color={cardColor} castShadow />
        </group>
    );
}