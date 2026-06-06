/**
 * Códice de Conversión - Component-Driven Architecture
 * PASO 1: Control de Navbar y Modal de Video Integrado
 */

document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       1. EFECTO DE ALTERNANCIA DINÁMICA EN NAVBAR (CONTROL DE SCROLL)
       ========================================================================== */
    const navbar = document.getElementById('main-navbar');

    const toggleNavbarSolidState = () => {
        if (window.scrollY > 40) {
            // Estado Avanzado: Al desplazarse hacia abajo
            navbar.style.padding = '12px 0';
            navbar.style.background = 'rgba(6, 11, 25, 0.96)';
            navbar.style.boxShadow = '0 10px 40px rgba(0, 0, 0, 0.3)';
            navbar.style.borderBottom = '1px solid rgba(214, 175, 55, 0.2)';
        } else {
            // Estado Inicial: En el tope de la página
            navbar.style.padding = '20px 0';
            navbar.style.background = 'rgba(6, 11, 25, 0.7)';
            navbar.style.boxShadow = 'none';
            navbar.style.borderBottom = '1px solid rgba(255, 255, 255, 0.03)';
        }
    };

    window.addEventListener('scroll', toggleNavbarSolidState);
    toggleNavbarSolidState(); // Disparo de seguridad inicial

    /* ==========================================================================
       2. ARQUITECTURA DE MANEJO DE ENLACES INTERNOS (PREVENCION DE ERRORES)
       ========================================================================== */
    // Mapeamos los activadores del scroll hacia el checkout (sección de precio que crearemos después)
    const ctaTriggers = document.querySelectorAll('.cta-scroll-trigger');

    ctaTriggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            const checkoutSection = document.getElementById('oferta');
            
            if (checkoutSection) {
                const navHeight = navbar.offsetHeight;
                const targetPosition = checkoutSection.getBoundingClientRect().top + window.pageYOffset - navHeight - 15;
                window.scrollTo({ top: targetPosition, behavior: 'smooth' });
            } else {
                // Alerta de desarrollo temporal amigable mientras construimos
                console.warn("Módulo de Checkout en proceso de construcción. El botón responderá automáticamente en los siguientes pasos.");
            }
        });
    });

    /* ==========================================================================
       3. SISTEMA DE REPRODUCTOR DE VIDEO VSL EN MODAL LIGHTBOX
       ========================================================================== */
    const playVideoBtn = document.getElementById('play-vsl-btn');

    if (playVideoBtn) {
        playVideoBtn.addEventListener('click', () => {
            // Generación dinámica y limpia del contenedor oscuro
            const modalOverlay = document.createElement('div');
            modalOverlay.id = 'dynamic-video-modal';
            
            // Estilos de encapsulación total para el modal premium
            Object.assign(modalOverlay.style, {
                position: 'fixed', top: '0', left: '0', width: '100%', height: '100%',
                backgroundColor: 'rgba(4, 8, 18, 0.96)', backdropFilter: 'blur(8px)',
                webkitBackdropFilter: 'blur(8px)', zIndex: '2000', display: 'flex',
                alignItems: 'center', justifyBox: 'center', justifyContent: 'center',
                opacity: '0', transition: 'opacity 0.4s ease-in-out'
            });

            // Botón de escape integrado
            const closeButton = document.createElement('button');
            closeButton.innerHTML = '✕ Cerrar Video';
            Object.assign(closeButton.style, {
                position: 'absolute', top: '40px', right: '40px', color: '#d4af37',
                fontSize: '0.85rem', fontWeight: '600', letterSpacing: '2px',
                textTransform: 'uppercase', fontFamily: "'Inter', sans-serif"
            });

            // Marco interno del video fotorrealista (Aspect Ratio 16:9)
            const videoFrame = document.createElement('div');
            Object.assign(videoFrame.style, {
                width: '90%', maxWidth: '960px', aspectRatio: '16/9',
                backgroundColor: '#000000', border: '1px solid rgba(214, 175, 55, 0.3)',
                borderRadius: '8px', boxShadow: '0 30px 60px rgba(0,0,0,0.7), 0 0 40px rgba(214, 175, 55, 0.1)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b'
            });
            // Aquí se integrará tu iframe real en producción (Vimeo, YouTube, etc.)
            videoFrame.innerHTML = '<p style="font-family:\'Inter\',sans-serif;">[Reproductor de Video VSL de Alta Conversión Activado]</p>';

            // Ensamble modular del DOM
            modalOverlay.appendChild(closeButton);
            modalOverlay.appendChild(videoFrame);
            document.body.appendChild(modalOverlay);

            // Transición suave de entrada (Fade-in)
            setTimeout(() => { modalOverlay.style.opacity = '1'; }, 15);

            // Lógica de salida controlada
            const destroyModal = () => {
                modalOverlay.style.opacity = '0';
                setTimeout(() => { document.body.removeChild(modalOverlay); }, 400);
            };

            closeButton.addEventListener('click', destroyModal);
            modalOverlay.addEventListener('click', (e) => {
                if (e.target === modalOverlay) destroyModal();
            });
        });
    }
});
