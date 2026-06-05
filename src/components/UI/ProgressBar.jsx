export default function ProgressBar({ visited, totalLaws }) {
    const progress = (visited.length / totalLaws) * 100;

    return (
        <div style={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            width: '100%',
            height: '40px',
            backgroundColor: 'rgba(10, 31, 10, 0.9)',
            borderTop: '1px solid #1a3a1a',
            display: 'flex',
            alignItems: 'center',
            padding: '0 2rem',
            zIndex: 1000
        }}>
            <div style={{ color: '#D4AF37', fontWeight: 'bold', marginRight: '1rem', fontSize: '0.9rem', whiteSpace: 'nowrap' }}>
                🏆 Rules Mastered: {visited.length}/{totalLaws}
            </div>
            <div style={{
                flex: 1,
                height: '12px',
                backgroundColor: '#1a3a1a',
                borderRadius: '10px',
                overflow: 'hidden'
            }}>
                <div style={{
                    width: `${progress}%`,
                    height: '100%',
                    backgroundColor: progress === 100 ? '#D4AF37' : '#2ECC71',
                    borderRadius: '10px',
                    transition: 'width 0.5s ease-in-out',
                    boxShadow: progress > 0 ? `0 0 10px ${progress === 100 ? '#D4AF37' : '#2ECC71'}` : 'none'
                }}>
                </div>
            </div>
            {progress === 100 && (
                <span style={{ color: '#D4AF37', marginLeft: '1rem', fontWeight: 'bold', fontSize: '0.9rem' }}>
                    🎉 COMPLETE!
                </span>
            )}
        </div>
    );
}