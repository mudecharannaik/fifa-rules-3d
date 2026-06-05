import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import BallDetailScene from '../three/scenes/BallDetailScene';

export default function TheBall() {
    return (
        <div style={{ display: 'flex', height: '100vh', backgroundColor: '#0A1F0A' }}>

            {/* 3D Canvas Area */}
            <div style={{ flex: 2, position: 'relative', cursor: 'pointer' }}>
                <Canvas camera={{ position: [0, 3, 8], fov: 45 }}>
                    <ambientLight intensity={0.5} />
                    <directionalLight position={[5, 5, 5]} intensity={1} castShadow />
                    <BallDetailScene />
                    <Environment preset="city" />
                    <OrbitControls
                        enablePan={false}
                        maxPolarAngle={Math.PI / 1.8}
                        minDistance={5}
                        maxDistance={15}
                        target={[0, 1.5, 0]}
                    />
                </Canvas>

                {/* Interaction instruction */}
                <div style={{ position: 'absolute', bottom: '20px', left: '20px', color: '#D4AF37', fontSize: '1.1rem', fontWeight: 'bold', background: 'rgba(0,0,0,0.6)', padding: '10px 20px', borderRadius: '10px' }}>
                    👆 Click the ball to kick it!
                </div>
            </div>

            {/* UI Panel Area */}
            <div style={{
                flex: 1,
                backgroundColor: '#112211',
                padding: '2rem',
                overflowY: 'auto',
                borderLeft: '2px solid #1a3a1a',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.5rem'
            }}>
                <h1 style={{ color: '#D4AF37', marginBottom: '0.5rem' }}>Law 2: The Ball</h1>

                <RuleCard title="📐 Dimensions" text="The ball is spherical. Circumference must be between 68cm and 70cm." />
                <RuleCard title="⚖️ Weight" text="At the start of the match, the ball must weigh between 410g and 450g." />
                <RuleCard title="💨 Pressure" text="Inflated to a pressure of 0.6 - 1.1 atmospheres (600 - 1100 g/cm²) at sea level." />
                <RuleCard title="🛑 Defective Ball" text="If the ball becomes defective (bursts or loses shape) during play, play is stopped, a new ball is dropped by the referee, and play restarts." />
                <RuleCard title="🔄 Pre-Match Approval" text="All balls used in a match must have the FIFA Quality Pro mark, FIFA Quality mark, or IMS mark." />

            </div>
        </div>
    );
}

// Reusable Rule Card Component
function RuleCard({ title, text }) {
    return (
        <div style={{
            backgroundColor: '#0A1F0A',
            padding: '1.2rem',
            borderRadius: '10px',
            borderLeft: '4px solid #2ECC71',
            color: '#F5F5F5',
            lineHeight: '1.6'
        }}>
            <h3 style={{ color: '#D4AF37', marginBottom: '0.5rem', fontSize: '1.1rem' }}>{title}</h3>
            <p style={{ fontSize: '0.95rem' }}>{text}</p>
        </div>
    );
}