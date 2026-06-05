import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import { Link } from 'react-router-dom';
import BallScene from '../three/scenes/BallScene';

// Data for all our pages
const laws = [
    { id: 1, title: "The Field of Play", icon: "🟩", path: "/field", desc: "Pitch dimensions, markings, and goals" },
    { id: 2, title: "The Ball", icon: "⚽", path: "/ball", desc: "Shape, size, pressure, and replacement" },
    { id: 3, title: "The Players", icon: "👥", path: "/players", desc: "Team size, subs, and formations" },
    { id: 7, title: "Match Duration", icon: "⏱️", path: "/duration", desc: "Halves, added time, and extra time" },
    { id: 8, title: "Start & Restart", icon: "🔄", path: "/start", desc: "Kickoff procedures and dropped balls" },
    { id: 9, title: "Ball In & Out", icon: "📍", path: "/inout", desc: "When is the ball legally out of play?" },
    { id: 10, title: "Determining Outcome", icon: "🥅", path: "/outcome", desc: "Scoring goals, GLT, and shootouts" },
    { id: 11, title: "Offside", icon: "🚩", path: "/offside", desc: "The offside rule explained in 3D", highlight: true },
    { id: 12, title: "Fouls & Misconduct", icon: "🟨🟥", path: "/fouls", desc: "Direct/Indirect FKs, Yellow & Red cards", highlight: true },
    { id: 13, title: "Free Kicks", icon: "🆓", path: "/freekicks", desc: "Direct vs Indirect and the 10-yard wall" },
    { id: 14, title: "The Penalty Kick", icon: "🎯", path: "/penalty", desc: "Penalty procedure and restrictions", highlight: true },
    { id: 15, title: "The Throw-in", icon: "🤾", path: "/throwin", desc: "Legal throw-ins and foul throws" },
    { id: 16, title: "The Goal Kick", icon: "🥅", path: "/goalkick", desc: "The new rule for playing inside the box" },
    { id: 17, title: "The Corner Kick", icon: "🚩", path: "/corner", desc: "Corner arc rules and the 'Olimpico'" },
    { id: 'VAR', title: "VAR & Technology", icon: "📺", path: "/var", desc: "Video review and semi-automated offside" },
    { id: 'WC', title: "World Cup 2026", icon: "🏆", path: "/wc2026", desc: "48 teams, 104 matches, new formats", highlight: true },
];

export default function Home() {
    return (
        <div style={{ height: '100vh', position: 'relative', backgroundColor: '#0A1F0A' }}>

            {/* 3D Background Layer */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: 1
            }}>
                <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
                    <ambientLight intensity={0.5} />
                    <directionalLight position={[10, 10, 5]} intensity={1} />
                    <BallScene />
                    <Environment preset="city" />
                    <OrbitControls enableZoom={false} enablePan={false} autoRotate={true} autoRotateSpeed={1} />
                </Canvas>
            </div>

            {/* UI Overlay Layer */}
            <div style={{
                position: 'relative',
                zIndex: 2,
                height: '100%',
                overflowY: 'auto',
                padding: '6rem 2rem 2rem 2rem',
                backgroundColor: 'rgba(10, 31, 10, 0.7)',
                backdropFilter: 'blur(8px)'
            }}>

                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    {/* Header Section */}
                    <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                        <h1 style={{ color: '#D4AF37', fontSize: '3.5rem', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '0.5rem' }}>
                            FIFA Football Rules
                        </h1>
                        <p style={{ color: '#F5F5F5', fontSize: '1.2rem', opacity: 0.9 }}>
                            Interactive 3D Explanations of the Laws of the Game
                        </p>
                    </div>

                    {/* Cards Grid */}
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
                        gap: '1.5rem'
                    }}>
                        {laws.map((law) => (
                            <Link key={law.id} to={law.path} style={{ textDecoration: 'none' }}>
                                <div style={{
                                    backgroundColor: law.highlight ? 'rgba(212, 175, 55, 0.1)' : 'rgba(17, 34, 17, 0.8)',
                                    border: law.highlight ? '2px solid #D4AF37' : '1px solid #1a3a1a',
                                    borderRadius: '12px',
                                    padding: '1.5rem',
                                    color: '#F5F5F5',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease',
                                    height: '100%',
                                    boxShadow: law.highlight ? '0 0 15px rgba(212, 175, 55, 0.2)' : 'none'
                                }}
                                    onMouseOver={(e) => {
                                        e.currentTarget.style.transform = 'translateY(-5px)';
                                        e.currentTarget.style.borderColor = '#2ECC71';
                                        e.currentTarget.style.boxShadow = '0 10px 20px rgba(0,0,0,0.3)';
                                    }}
                                    onMouseOut={(e) => {
                                        e.currentTarget.style.transform = 'translateY(0)';
                                        e.currentTarget.style.borderColor = law.highlight ? '#D4AF37' : '#1a3a1a';
                                        e.currentTarget.style.boxShadow = law.highlight ? '0 0 15px rgba(212, 175, 55, 0.2)' : 'none';
                                    }}
                                >
                                    <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{law.icon}</div>
                                    <h3 style={{ color: law.highlight ? '#D4AF37' : '#2ECC71', marginBottom: '0.5rem', fontSize: '1.1rem' }}>
                                        {law.id !== 'VAR' && law.id !== 'WC' ? `Law ${law.id}: ` : ''}{law.title}
                                    </h3>
                                    <p style={{ fontSize: '0.9rem', color: '#ccc', lineHeight: '1.4' }}>{law.desc}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}