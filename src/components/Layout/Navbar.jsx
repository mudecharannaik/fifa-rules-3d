import { Link } from 'react-router-dom';

export default function Navbar({ visited }) {
    // Helper function to check if a page has been visited
    const isVisited = (path) => visited.includes(path);

    const linkStyle = (path) => ({
        color: isVisited(path) ? '#2ECC71' : '#F5F5F5',
        textDecoration: 'none',
        fontSize: '0.95rem'
    });

    return (
        <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            padding: '1rem 2rem',
            backgroundColor: 'rgba(10, 31, 10, 0.9)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            zIndex: 100,
            borderBottom: '2px solid #1a3a1a',
            flexWrap: 'wrap',
            gap: '0.5rem'
        }}>
            <Link to="/" style={{ color: '#D4AF37', textDecoration: 'none', fontWeight: 'bold', fontSize: '1.2rem' }}>
                ⚽ FIFA Rules 3D
            </Link>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <Link to="/" style={linkStyle('/')}>Home</Link>
                <Link to="/field" style={linkStyle('/field')}>Law 1 {isVisited('/field') && '✅'}</Link>
                <Link to="/ball" style={linkStyle('/ball')}>Law 2 {isVisited('/ball') && '✅'}</Link>
                <Link to="/players" style={linkStyle('/players')}>Law 3 {isVisited('/players') && '✅'}</Link>
                <Link to="/equipment" style={linkStyle('/equipment')}>Law 4 {isVisited('/equipment') && '✅'}</Link>
                <Link to="/referees" style={linkStyle('/referees')}>Law 5/6 {isVisited('/referees') && '✅'}</Link>
                <Link to="/duration" style={linkStyle('/duration')}>Law 7 {isVisited('/duration') && '✅'}</Link>
                <Link to="/start" style={linkStyle('/start')}>Law 8 {isVisited('/start') && '✅'}</Link>
                <Link to="/inout" style={linkStyle('/inout')}>Law 9 {isVisited('/inout') && '✅'}</Link>
                <Link to="/outcome" style={linkStyle('/outcome')}>Law 10 {isVisited('/outcome') && '✅'}</Link>
                <Link to="/offside" style={{ color: '#2ECC71', fontWeight: 'bold', textDecoration: 'none' }}>Law 11 {isVisited('/offside') && '✅'}</Link>
                <Link to="/fouls" style={linkStyle('/fouls')}>Law 12 {isVisited('/fouls') && '✅'}</Link>
                <Link to="/freekicks" style={linkStyle('/freekicks')}>Law 13 {isVisited('/freekicks') && '✅'}</Link>
                <Link to="/penalty" style={linkStyle('/penalty')}>Law 14 {isVisited('/penalty') && '✅'}</Link>
                <Link to="/throwin" style={linkStyle('/throwin')}>Law 15 {isVisited('/throwin') && '✅'}</Link>
                <Link to="/goalkick" style={linkStyle('/goalkick')}>Law 16 {isVisited('/goalkick') && '✅'}</Link>
                <Link to="/corner" style={linkStyle('/corner')}>Law 17 {isVisited('/corner') && '✅'}</Link>
                <Link to="/var" style={linkStyle('/var')}>VAR {isVisited('/var') && '✅'}</Link>
                <Link to="/wc2026" style={{ color: '#D4AF37', textDecoration: 'none', fontWeight: 'bold' }}>🏆 WC 2026 {isVisited('/wc2026') && '✅'}</Link>
            </div>
        </div>
    );
}