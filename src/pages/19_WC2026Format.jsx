import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import TrophyScene from '../three/scenes/TrophyScene';

export default function WC2026Format() {
    return (
        <div style={{ display: 'flex', height: '100vh', backgroundColor: '#0A1F0A' }}>

            {/* 3D Canvas Area */}
            <div style={{ flex: 2, position: 'relative' }}>
                <Canvas camera={{ position: [0, 3, 6], fov: 50 }}>
                    <ambientLight intensity={0.5} />
                    <directionalLight position={[5, 10, 5]} intensity={1.5} castShadow />
                    <TrophyScene />
                    <Environment preset="city" />
                    <OrbitControls
                        makeDefault
                        enablePan={false}
                        maxPolarAngle={Math.PI / 2.1}
                        minDistance={4}
                        maxDistance={10}
                    />
                </Canvas>

                <div style={{ position: 'absolute', bottom: '20px', left: '20px', color: '#D4AF37', fontSize: '0.9rem', background: 'rgba(0,0,0,0.6)', padding: '10px', borderRadius: '5px' }}>
                    🖱️ Drag to rotate the tournament pathway
                </div>
            </div>

            {/* UI Panel Area */}
            <div style={{ flex: 1, backgroundColor: '#112211', padding: '2rem', overflowY: 'auto', borderLeft: '2px solid #1a3a1a' }}>
                <h1 style={{ color: '#D4AF37', marginBottom: '0.5rem' }}>🏆 World Cup 2026 Format</h1>
                <p style={{ color: '#2ECC71', marginBottom: '1.5rem', fontSize: '0.9rem' }}>Hosted by USA, Canada, & Mexico</p>

                <RuleCard title="🌍 48 Teams" text="The tournament expands from 32 to 48 teams. Teams are divided into 12 groups of 4 teams each (previously 8 groups of 4)." />

                <RuleCard title="📊 Advancing Rules" text="The Top 2 teams from each group (24 teams) AND the 8 best 3rd-placed teams advance. This means 32 teams move on to the Knockout Stage." />

                <RuleCard title="🆕 Round of 32 Added" text="Because of the expansion, a completely new 'Round of 32' is added before the Round of 16. This means more winner-takes-all knockout matches early in the tournament!" />

                <RuleCard title="🔢 Total Matches" text="The tournament will feature a total of 104 matches (up from 64 in 2022). The eventual champions will play 8 matches instead of 7." />

                <RuleCard title="👥 Squad Size: 26 Players" text="Teams can select a maximum of 26 players for their final squad (up from 23 in previous World Cups before 2022). 15 substitutes can be named on the team sheet for each match." />

                <RuleCard title="🔄 Substitution Rule (WC Specific)" text="Each team is permitted a maximum of five substitutes. To reduce time-wasting, teams have a maximum of three substitution opportunities (e.g., you cannot make subs in 4 different breaks in play, excluding half-time). One additional sub is allowed in Extra Time." />

                <RuleCard title="🧠 Concussion Substitutions" text="In addition to the 5 normal substitutions, teams are permitted one additional permanent substitution in the event of a suspected concussion, regardless of whether the maximum number of subs has been used." />

            </div>
        </div>
    );
}

function RuleCard({ title, text }) {
    return (
        <div style={{ backgroundColor: '#0A1F0A', padding: '1.2rem', borderRadius: '10px', borderLeft: '4px solid #D4AF37', color: '#F5F5F5', lineHeight: '1.6', marginBottom: '1rem' }}>
            <h3 style={{ color: '#D4AF37', marginBottom: '0.5rem', fontSize: '1.1rem' }}>{title}</h3>
            <p style={{ fontSize: '0.95rem' }}>{text}</p>
        </div>
    );
}