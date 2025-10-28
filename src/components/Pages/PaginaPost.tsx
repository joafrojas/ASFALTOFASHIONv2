import React from 'react';
import NavBar from '../NavBar';
import '../../styles/FFXIV.css';

const safeParsePosts = (fallback: any[]) => {
    try {
        const raw = localStorage.getItem('asfalto_posts');
        if (raw) {
            const parsed = JSON.parse(raw);
            if (Array.isArray(parsed) && parsed.length > 0) return parsed;
        }
    } catch (e) {
       
    }
    return fallback;
};

const PaginaPost: React.FC = () => {
    const path = typeof window !== 'undefined' ? window.location.pathname : '/';
    const id = path.startsWith('/post/') ? path.replace('/post/', '') : '';

    
    const FALLBACK = [
        { id: 'p1', image: '/IMG/marlon.jpg', title: 'Marlon Fashion LOOKBOOK', category: 'EDITORIAL', author: 'ASFALTOSFASHION', date: '2025-10-20' },
        { id: 'p2', image: '/IMG/central.jpg', title: 'Central Look LOOKBOOK', category: 'PERFIL', author: 'USUARIO_ASFALTO', date: '2025-10-18' },
        { id: 'p3', image: '/IMG/kuroh.jpg', title: 'Kuroh Style LOOKBOOK', category: 'COLECCIONES', author: 'USUARIO_ASFALTO', date: '2025-10-15' },
    ];

    const posts = safeParsePosts(FALLBACK);
    const post = posts.find((p: any) => p.id === id);

    return (
        <>
            <NavBar />
            <main className="ffxiv-page">
                <header className="ffxiv-header">
                    <h1>{post ? post.title : 'Publicación no encontrada'}</h1>
                    {post ? <p className="ffxiv-sub">{post.category} • Por {post.author} — {post.date}</p> : null}
                </header>

                {post ? (
                    <section className="ffxiv-hero">
                        <img src={post.image} alt={post.title} style={{ maxWidth: 1100, width: '100%', borderRadius: 10 }} />
                    </section>
                ) : (
                    <section style={{ textAlign: 'center', padding: 40 }}>
                        <p>No se encontró la publicación solicitada.</p>
                        <a href="/">Volver al inicio</a>
                    </section>
                )}
            </main>
        </>
    );
};

export default PaginaPost;
