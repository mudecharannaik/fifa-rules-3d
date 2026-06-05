import { useState, useEffect } from 'react';

export function useProgress() {
    const [visited, setVisited] = useState(() => {
        // Get saved progress from local storage on initial load
        const saved = localStorage.getItem('fifa-rules-progress');
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        // Save to local storage whenever visited array changes
        localStorage.setItem('fifa-rules-progress', JSON.stringify(visited));
    }, [visited]);

    const markVisited = (path) => {
        if (!visited.includes(path)) {
            setVisited((prev) => [...prev, path]);
        }
    };

    return { visited, markVisited };
}