import PlayerMannequin from './PlayerMannequin';
import PitchScene from './PitchScene';

// Formation Coordinates [X, Z] (Pitch is 10.5 x 6.8)
const formations = {
    '4-3-3': [
        [-4.5, 0],      // GK
        [-2.5, -2.5],   // RB
        [-2.5, -0.8],   // CB
        [-2.5, 0.8],    // CB
        [-2.5, 2.5],    // LB
        [-0.5, -2],     // CM
        [-0.5, 0],      // CM
        [-0.5, 2],      // CM
        [1.5, -2.2],    // RW
        [1.5, 0],       // ST
        [1.5, 2.2],     // LW
    ],
    '4-4-2': [
        [-4.5, 0],      // GK
        [-2.5, -2.5],   // RB
        [-2.5, -0.8],   // CB
        [-2.5, 0.8],    // CB
        [-2.5, 2.5],    // LB
        [-0.5, -2.5],   // RM
        [-0.5, -0.8],   // CM
        [-0.5, 0.8],    // CM
        [-0.5, 2.5],    // LM
        [1.5, -1.2],    // ST
        [1.5, 1.2],     // ST
    ],
    '3-5-2': [
        [-4.5, 0],      // GK
        [-2.5, -2],     // CB
        [-2.5, 0],      // CB
        [-2.5, 2],      // CB
        [-0.5, -3],     // RWB
        [-0.5, -1.2],   // CM
        [-0.5, 0],      // CM
        [-0.5, 1.2],    // CM
        [-0.5, 3],      // LWB
        [1.5, -1.2],    // ST
        [1.5, 1.2],     // ST
    ]
};

export default function FormationScene({ formation }) {
    const playerPositions = formations[formation];

    return (
        <group>
            {/* Reuse the pitch from Law 1, no highlights */}
            <PitchScene highlight="full" />

            {/* Team (Red) */}
            {playerPositions.map((pos, index) => (
                <PlayerMannequin
                    key={index}
                    targetPosition={pos}
                    color="#cc0000"
                />
            ))}

            {/* Opponent GK (Blue) just for visual balance */}
            <PlayerMannequin targetPosition={[4.5, 0]} color="#0044cc" />
        </group>
    );
}