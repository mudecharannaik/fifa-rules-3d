import { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import DurationScene from '../three/scenes/DurationScene';

export default function MatchDuration() {
    const [phase, setPhase] = useState('first');
    const [minutes, setMinutes] = useState(0);

    const advanceTime = () => {
        if (phase === 'first') {
            setMinutes(45);
            setPhase('added');
        } else if (phase === 'added') {
            // Simulate adding 5 minutes, then go to half time
            setMinutes(50);
            setPhase('half');
        } else if (phase === 'half') {
            setMinutes(45); // Start second half (45 on the clock)
            setPhase('second');
        } else if (phase === 'second') {
            setMinutes(90);
            setPhase('added');
        } else if (phase === 'added' && minutes === 90) {
            setMinutes(95);
            setPhase('et1'); // Go to extra time for demo
        } else if (phase === 'et1') {
            setMinutes(105);
            setPhase('et2');
        } else if (phase === 'et2') {
            setMinutes(120);
            setPhase('added');
        }
    };

    const resetClock = () => {
        setPhase('first');
        setMinutes(0);
    };

    return (
        <div style={{ display: 'flex', height: '100vh', backgroundColor: '#0A1F0A' }}>

            {/* 3D Canvas Area */}
            <div style={{ flex: 2, position: 'relative' }}>
                <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
                    <DurationScene phase={phase} minutes={minutes} />
                    <OrbitControls enableZoom={false} enablePan={false} />
                </Canvas>
            </div>

            {/* UI Panel Area */}
            <div style={{ flex: 1, backgroundColor: '#112211', padding: '2rem', overflowY: 'auto', borderLeft: '2px solid #1a3a1a' }}>
                <h1 style={{ color: '#D4AF37', marginBottom: '1rem' }}>Law 7: Match Duration</h1>

                {/* Time Controls */}
                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
                    <button
                        onClick={advanceTime}
                        style={{ flex: 2, padding: '1rem', backgroundColor: '#2ECC71', color: '#0A1F0A', border: 'none', fontWeight: 'bold', fontSize: '1rem', cursor: 'pointer', borderRadius: '5px' }}
                    >
                        ⏱️ Advance Time
                    </button>
                    <button
                        onClick={resetClock}
                        style={{ flex: 1, padding: '1rem', backgroundColor: '#1a3a1a', color: '#fff', border: '1px solid #2ECC71', fontWeight: 'bold', fontSize: '1rem', cursor: 'pointer', borderRadius: '5px' }}
                    >
                        ↩️ Reset
                    </button>
                </div>

                <RuleCard title="⏱️ Regular Time" text="A football match consists of two 45-minute halves, making 90 minutes of regular playing time. The half-time interval must not exceed 15 minutes." />

                <RuleCard title="➕ Added (Stoppage) Time" text="The referee keeps track of all time lost due to substitutions, injuries, time-wasting, and VAR checks. This time is added on at the end of each half. The 4th official displays the minimum added time on their board, but the referee can extend it further if more delays occur." />

                <RuleCard title="🏆 Extra Time (Knockouts)" text="If a knockout match (like a World Cup Round of 16 game) is tied after 90 minutes, two 15-minute extra time periods are played. Teams get a short 'drinks break' (not a full halftime) before Extra Time begins." />

                <RuleCard title="🚫 Abandoned Matches" text="If a match is abandoned (stopped permanently) before completion due to severe weather, crowd trouble, or not enough players, the competition rules dictate if it must be replayed or if the current score stands." />

                <RuleCard title="🥤 Cooling Breaks (WC 2026)" text="In high temperatures (specifically the Wet Bulb Globe Temperature index), referees can mandate cooling breaks in the 30th minute of each half for players to rehydrate. These breaks count towards added time." />
            </div>
        </div>
    );
}

function RuleCard({ title, text }) {
    return (
        <div style={{ backgroundColor: '#0A1F0A', padding: '1.2rem', borderRadius: '10px', borderLeft: '4px solid #2ECC71', color: '#F5F5F5', lineHeight: '1.6', marginBottom: '1rem' }}>
            <h3 style={{ color: '#D4AF37', marginBottom: '0.5rem', fontSize: '1.1rem' }}>{title}</h3>
            <p style={{ fontSize: '0.95rem' }}>{text}</p>
        </div>
    );
}