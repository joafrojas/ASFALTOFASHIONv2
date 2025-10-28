

import React, { useEffect, useMemo, useState } from 'react';
import { type UserData } from '../../utils/validation';
import '../../styles/Gallery.css'; 

// --- Tipos de Datos y Mocks ---
interface Post { id: string; image: string; title: string; category: string; author: string; date: string; }
interface PaginaPrincipalProps { currentUser: UserData; onLogout: () => void; }

const MOCK_GRID_POSTS: Post[] = [
    { id: 'p1', image: '/IMG/marlon.jpg', title: 'Marlon Fashion LOOKBOOK', category: 'EDITORIAL', author: 'ASFALTOSFASHION', date: '2025-10-20' },
    { id: 'p2', image: '/IMG/central.jpg', title: 'Central Look LOOKBOOK', category: 'PERFIL', author: 'USUARIO_ASFALTO', date: '2025-10-18' },
    { id: 'p3', image: '/IMG/kuroh.jpg', title: 'Kuroh Style LOOKBOOK', category: 'COLECCIONES', author: 'USUARIO_ASFALTO', date: '2025-10-15' },
    { id: 'p4', image: '/IMG/kai.jpg', title: 'Kai Style LOOKBOOK', category: 'DESFILES', author: 'USUARIO_ASFALTO', date: '2025-10-10' },
    { id: 'p5', image: '/IMG/pablo.jpg', title: 'Pablo Fashion LOOKBOOK', category: 'EDITORIAL', author: 'ASFALTOSFASHION', date: '2025-10-05' },
    { id: 'p6', image: '/IMG/lil wey.jpg', title: 'Lil Wey Fashion LOOKBOOK', category: 'EDITORIAL', author: 'ASFALTOSFASHION', date: '2025-09-28' },
    { id: 'p7', image: '/IMG/nene.jpg', title: 'Nene Look LOOKBOOK', category: 'PERFIL', author: 'USUARIO_ASFALTO', date: '2025-09-25' },
    { id: 'p8', image: '/IMG/Louis-Vuitton-Final-Fantasy-Lightning-Square-Enix-2.webp', title: 'Louis Vuitton x Final Fantasy — Lookbook', category: 'COLECCIONES', author: 'LOUIS VUITTON', date: '2025-10-22' },
    { id: 'p9', image: '/IMG/yun tug.jpg', title: 'Young Thug - Backstage Look', category: 'DESFILES', author: 'YUNGTHUG', date: '2025-10-21' },
    { id: 'p10', image: '/IMG/galegale.jpg', title: 'VSA Collection — Street Editorial', category: 'COLECCIONES', author: 'VSA', date: '2025-10-19' },
];

const safeSrc = (s?: string) => (s ? encodeURI(s) : '');

// --- Componentes Funcionales Separados ---

const MediaElement: React.FC<{ src: string; alt?: string; className?: string }> = ({ src, alt, className }) => {
    const isVideo = src.endsWith('.mp4');
    const source = safeSrc(src);
    if (isVideo) {
        return <video src={source} aria-label={alt || 'Video'} className={className || ''} controls={false} muted loop autoPlay playsInline />;
    }
    return <img src={source} alt={alt} loading="lazy" className={className || 'img-blur loaded'} />;
};

import NavBar from '../NavBar';

const PaginaPrincipal: React.FC<PaginaPrincipalProps> = ({ currentUser, onLogout }) => {
    // estado: lista de posts (inicializamos leyendo localStorage para evitar sobreescribirlo)
    const [posts, setPosts] = useState<Post[]>(() => {
        try {
            const raw = localStorage.getItem('asfalto_posts');
            if (raw) {
                const parsed = JSON.parse(raw) as Post[];
                if (Array.isArray(parsed) && parsed.length > 0) {
                    parsed.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
                    return parsed;
                }
            }
        } catch (e) {
            // ignore
        }
        return MOCK_GRID_POSTS.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    });
    // filtro de categoría
    const [filter, setFilter] = useState<string>('todos');
    // modal de subida abierto?
    const [uploadOpen, setUploadOpen] = useState<boolean>(false);

    // categorías disponibles (memorizadas)
    const categories = useMemo(() => ['todos', ...Array.from(new Set(posts.map(p => p.category.toLowerCase())))], [posts]);
    // posts filtrados según categoría
    const displayedPosts = useMemo(() => {
        if (filter === 'todos') return posts;
        return posts.filter(p => p.category.toLowerCase() === filter);
    }, [posts, filter]);

    



 
    // crear nuevo post y añadir al estado
    const addPost = (data: { title: string; category: string; image: string }) => {
        const newPost: Post = {
            id: `p${Date.now()}`,
            image: data.image || '/IMG/placeholder.jpg',
            title: data.title || 'Nueva publicación',
            category: (data.category || 'EDITORIAL').toUpperCase(),
            author: currentUser.nombre_usu || 'USUARIO_ASFALTO',
            date: new Date().toISOString().split('T')[0],
        };
        setPosts(prev => [newPost, ...prev]);
        setFilter('todos');
        setUploadOpen(false);
    };

  
    // guardar posts en localStorage cuando cambian
    useEffect(() => {
        try {
            localStorage.setItem('asfalto_posts', JSON.stringify(posts));
        } catch (err) {

        }
    }, [posts]);

 
    // Nota: la carga desde localStorage se hace en el inicializador de useState (arriba)
    
    // manejar navegación interna (filtros)
    const handleNavigate = (t: string) => {
        setFilter(t);
    };

    return (
        <>
            <NavBar onLogout={onLogout} onNavigate={handleNavigate} />
            
            <main className="galeria-page">
                {/* Información / Noticias antes de los filtros */}
                <div className="info-section">
                    <div className="info-item">
                        <a href="/ffxiv" className="info-link">
                            <img src="/IMG/ffxlv1.jpg" alt="LV x FFXIV" className="info-image" />
                        </a>
                        <div className="info-body">
                            <strong>NOTICIAS</strong>
                            <p className="info-text">Louis Vuitton colabora con Final Fantasy — <a href="/ffxiv">ver artículo</a></p>
                        </div>
                    </div>
                </div>


                {/* 1. ENCABEZADO PRINCIPAL (ASFALTO GALLERY) */}
                <header className="galeria-header editorial-header">
                    <h1>ASFALTO PRINCIPAL</h1>
                    <p className="galeria-sub">Curación de Streetwear y Pasarelas de élite. Bienvenido, {currentUser.nombre_usu}.</p>
                </header>
   
             


                {/* 2. FILTROS DE CATEGORÍA (Pegajosos/Sticky) */}
                <div className="filters-sticky" role="region" aria-label="Filtros de categoría">
                    <div className="filter-chips">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setFilter(cat)}
                                className={`chip ${filter === cat ? 'active' : ''}`}
                                aria-pressed={filter === cat}
                            >
                                {cat === 'todos' ? 'TODOS' : cat.toUpperCase()}
                            </button>
                        ))}
                    </div>
                </div>
                
                {/* 4. MASONRY GRID DE POSTS */}
                <section className="masonry-grid editorial-grid" aria-label="Posts de la comunidad de moda">
                    {displayedPosts.length > 0 ? (
                            displayedPosts.map((item) => (
                                <article 
                                    key={item.id} 
                                    className={`masonry-item`} 
                                    tabIndex={0} 
                                    aria-label={`Publicación: ${item.title}`} 
                                >
                                    {
                     
                                    }
                                    {
                                        (() => {
                                            const mapToPage = (id: string) => {
                                                if (id === 'p8') return '/ffxiv';
                                                if (id === 'p9') return '/thug';
                                                if (id === 'p10') return '/vsa';
                                                return `/post/${id}`;
                                            };
                                            const href = mapToPage(item.id);
                                            return (
                                                <a href={href} className="masonry-link">
                                                    <MediaElement src={item.image} alt={item.title} />
                                                </a>
                                            );
                                        })()
                                    }
                                
                                    {/* Bloque de metadatos */}
                                    <div className="masonry-meta-block">
                                        <p className="masonry-meta-category">{(item.category || 'Editorial').toUpperCase()}</p>
                                        <h3 className="masonry-meta-title">
                                            {
                                                (() => {
                                                    const mapToPage = (id: string) => {
                                                        if (id === 'p8') return '/ffxiv';
                                                        if (id === 'p9') return '/thug';
                                                        if (id === 'p10') return '/vsa';
                                                        return `/post/${id}`;
                                                    };
                                                    const href = mapToPage(item.id);
                                                    return <a href={href}>{item.title}</a>;
                                                })()
                                            }
                                        </h3>
                                        <p className="masonry-meta-author">Por {item.author}</p>
                                    </div>
                                </article>
                            ))
                        ) : (
                            <p style={{ textAlign: 'center', color: '#888' }}>No hay posts en esta categoría.</p>
                        )}
                </section>
                {/* Botón flotante de subida */}
                <FloatingUploadButton
                    open={uploadOpen}
                    onOpen={() => setUploadOpen(true)}
                    onClose={() => setUploadOpen(false)}
                    categories={categories}
                    onCreate={addPost}
                    currentUserName={currentUser.nombre_usu}
                />
            </main>
        </>
    );
};
 
export default PaginaPrincipal;


const FloatingUploadButton: React.FC<{
    open: boolean;
    onOpen: () => void;
    onClose: () => void;
    categories: string[];
    onCreate: (data: { title: string; category: string; image: string }) => void;
    currentUserName?: string;
}> = ({ open, onOpen, onClose, categories, onCreate, currentUserName }) => {
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState<string>(categories[0] || 'todos');

    const [image, setImage] = useState<string>('');
    const [imageFileName, setImageFileName] = useState<string>('');
    const [uploadError, setUploadError] = useState<string>('');


    useEffect(() => {
        if (categories && categories.length > 0 && !categories.includes(category)) {
            setCategory(categories[0]);
        }
    }, [categories]);

  
    const handleFileChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
        const f = ev.target.files && ev.target.files[0];
        if (!f) return;
        setImageFileName(f.name || '');
        const reader = new FileReader();
        reader.onload = () => {
            const result = reader.result as string;
            setImage(result);
        };
        reader.readAsDataURL(f);
    };

    const handleSubmit = (e?: React.FormEvent) => {
        e?.preventDefault();
        setUploadError('');
        if (!title || !title.trim()) {
            setUploadError('El título es obligatorio.');
            return;
        }
        if (!image) {
            setUploadError('Adjunta una imagen (archivo) antes de publicar.');
            return;
        }
        onCreate({ title, category: category === 'todos' ? 'EDITORIAL' : category, image: image });
        setTitle('');
        setImage('');
        setImageFileName('');
        setUploadError('');
    };

    return (
        <>
            <button className="floating-upload-btn" onClick={onOpen} aria-label="Crear publicación">+</button>

            {open && (
                <div className="upload-modal" role="dialog" aria-modal="true" aria-label="Subir publicación">
                    <div className="upload-modal-card">
                        <header className="upload-modal-header">
                            <h3>Nueva publicación</h3>
                            <button className="upload-close" onClick={() => { setTitle(''); setImage(''); setImageFileName(''); setUploadError(''); onClose(); }} aria-label="Cerrar">✕</button>
                        </header>
                        <form className="upload-form" onSubmit={handleSubmit}>
                            {uploadError ? <div className="upload-error" role="alert">{uploadError}</div> : null}

                            <label>Título</label>
                            <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Título de la publicación" />

                            <label>Categoría</label>
                            <select value={category} onChange={e => setCategory(e.target.value)}>
                                {categories.map(c => (
                                    <option key={c} value={c}>{c === 'todos' ? 'TODOS' : c.toUpperCase()}</option>
                                ))}
                            </select>

                            <label>Imagen (archivo)</label>
                            <input type="file" accept="image/*" onChange={handleFileChange} />
                            {imageFileName ? <p className="upload-filename">{imageFileName}</p> : null}

                            {image ? (
                                <div style={{ marginTop: 10 }}>
                                    <p style={{ color: '#bbb', fontSize: 13, margin: 0 }}>Previsualización</p>
                                    <img src={image} alt="preview" className="upload-preview" />
                                </div>
                            ) : null}

                            <p className="upload-author">Publicar como <strong>{currentUserName || 'Invitado'}</strong></p>

                            <div className="upload-actions">
                                <button type="button" className="btn-secondary" onClick={() => { setTitle(''); setImage(''); setImageFileName(''); setUploadError(''); onClose(); }}>Cancelar</button>
                                <button type="submit" className="btn-primary">Publicar</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};