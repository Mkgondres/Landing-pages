/**
 * Códice de Conversión - Premium Landing Page JS
 * Autor: J.D. Valeriano (Arquitectura del Éxito Digital)
 * * PARTE 1: Inicialización, Navegación y Desplazamiento Suave
 */

document.addEventListener('DOMContentLoaded', () => {
    
    /* ==========================================================================
       1. EFECTO DINÁMICO DE LA BARRA DE NAVEGACIÓN AL HACER SCROLL
       ========================================================================== */
    const navbar = document.getElementById('main-nav');
    
    // Función para cambiar el estilo del navbar basado en la posición del scroll
    const handleNavbarScroll = () => {
        // Verificamos si el usuario ha bajado más de 50px
        if (window.scrollY > 50) {
            // Estado con Scroll: Más opaco y con sombra para destacar sobre el contenido
            navbar.style.background = 'rgba(18, 18, 21, 0.95)';
            navbar.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.5)';
            navbar.style.padding = '10px 0'; // Se hace ligeramente más delgada
            navbar.style.borderBottom = '1px solid rgba(212, 175, 55, 0.3)';
        } else {
            // Estado Inicial (Top): Glassmorphism sutil y un poco más alta
            navbar.style.background = 'rgba(18, 18, 21, 0.7)'; 
            navbar.style.boxShadow = 'none';
            navbar.style.padding = '15px 0';
            navbar.style.borderBottom = '1px solid rgba(212, 175, 55, 0.15)';
        }
    };

    // Escuchar el evento de scroll
    window.addEventListener('scroll', handleNavbarScroll);
    
    // Ejecutar inmediatamente por si el usuario recarga la página a mitad del contenido
    handleNavbarScroll();

    /* ==========================================================================
       2. DESPLAZAMIENTO SUAVE (SMOOTH SCROLLING) MILIMÉTRICO
       ========================================================================== */
    const scrollLinks = document.querySelectorAll('.nav-link');
    
    scrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault(); // Prevenir el salto brusco predeterminado del navegador
            
            // Obtener el ID de la sección objetivo (quitando el '#')
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                // Obtenemos la altura actual de la barra de navegación para usarla como "offset" (margen)
                const navHeight = navbar.offsetHeight;
                
                // Calculamos la posición exacta en la pantalla
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - navHeight - 20; // -20px extra para que respire
                
                // Ejecutamos la animación de scroll nativa del navegador
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

});
    /* ==========================================================================
       3. INTERACTIVIDAD DEL ACORDEÓN (PREGUNTAS FRECUENTES)
       ========================================================================== */
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            // Seleccionamos el elemento padre (.faq-item) del botón clickeado
            const currentItem = this.parentElement;
            
            // Verificamos si este ítem ya está activo
            const isActive = currentItem.classList.contains('active');

            // Primero, cerramos todos los ítems para mantener la limpieza visual
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
            });

            // Si el ítem clickeado no estaba activo, lo abrimos
            // Si ya estaba activo, se quedará cerrado gracias al paso anterior
            if (!isActive) {
                currentItem.classList.add('active');
            }
        });
    });

/* ==========================================================================
   4. FUNCIONES GLOBALES DE ACCIÓN (CTAs)
   ========================================================================== */
// Estas funciones están fuera del DOMContentLoaded porque se llaman directamente 
// desde el HTML usando atributos onclick="nombreFuncion()"

/**
 * Función para llevar al usuario directamente a la zona de Checkout
 * desde cualquier botón de la página.
 */
window.scrollToCheckout = function() {
    const checkoutSection = document.getElementById('oferta');
    const navbar = document.getElementById('main-nav');
    
    if (checkoutSection) {
        const navHeight = navbar ? navbar.offsetHeight : 80;
        // Calculamos la posición exacta considerando el menú fijo
        const elementPosition = checkoutSection.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - navHeight - 20;
        
        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
        
        // Efecto visual: hacemos brillar la caja de pago unos segundos después de llegar
        setTimeout(() => {
            const checkoutCard = document.querySelector('.checkout-card');
            if (checkoutCard) {
                checkoutCard.style.boxShadow = '0 0 50px rgba(212, 175, 55, 0.6)';
                setTimeout(() => {
                    checkoutCard.style.boxShadow = '0 25px 50px rgba(0, 0, 0, 0.5), 0 0 30px rgba(212, 175, 55, 0.15)';
                }, 1500);
            }
        }, 800);
    }
};

/**
 * Función para abrir el Video de Ventas (VSL) en un Modal (Lightbox) Premium
 */
window.openVideoModal = function() {
    // 1. Creamos el contenedor del modal oscuro
    const modalOverlay = document.createElement('div');
    modalOverlay.id = 'premium-video-modal';
    
    // Estilos inline rápidos para el modal (se podrían poner en CSS, pero aquí asegura modularidad)
    Object.assign(modalOverlay.style, {
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(5, 5, 7, 0.95)',
        backdropFilter: 'blur(10px)',
        zIndex: '9999',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: '0',
        transition: 'opacity 0.4s ease'
    });

    // 2. Botón de cierre
    const closeBtn = document.createElement('button');
    closeBtn.innerHTML = '✕ Cerrar';
    Object.assign(closeBtn.style, {
        position: 'absolute',
        top: '30px',
        right: '40px',
        background: 'transparent',
        border: 'none',
        color: '#D4AF37',
        fontSize: '1.2rem',
        cursor: 'pointer',
        fontFamily: "'Montserrat', sans-serif",
        textTransform: 'uppercase',
        letterSpacing: '2px'
    });

    // 3. Contenedor del video (Simulado)
    const videoContainer = document.createElement('div');
    Object.assign(videoContainer.style, {
        width: '80%',
        maxWidth: '1000px',
        aspectRatio: '16/9',
        backgroundColor: '#000',
        border: '2px solid #D4AF37',
        borderRadius: '12px',
        boxShadow: '0 20px 50px rgba(0,0,0,0.8), 0 0 30px rgba(212, 175, 55, 0.2)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#888',
        fontFamily: "'Montserrat', sans-serif"
    });
    // Aquí pondrías tu iframe de Vimeo o YouTube real
    videoContainer.innerHTML = '<h3>[Reproductor de Video VSL de Alta Conversión]</h3>';

    // 4. Ensamblaje y lógica de cierre
    modalOverlay.appendChild(closeBtn);
    modalOverlay.appendChild(videoContainer);
    document.body.appendChild(modalOverlay);

    // Animación de entrada
    setTimeout(() => {
        modalOverlay.style.opacity = '1';
    }, 10);

    // Cerrar modal al hacer click en el botón o fuera del video
    const closeModal = () => {
        modalOverlay.style.opacity = '0';
        setTimeout(() => document.body.removeChild(modalOverlay), 400);
    };

    closeBtn.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', (e) => {
        if(e.target === modalOverlay) closeModal();
    });
};
/* ==========================================================================
   5. SIMULACIÓN DE CHECKOUT Y REDIRECCIÓN SEGURA
   ========================================================================== */
/**
 * Función que se ejecuta al hacer clic en el botón principal de compra.
 * Añade un estado de "Carga" para dar feedback visual y transmitir seguridad.
 */
window.processCheckout = function() {
    const btn = document.querySelector('.btn-massive');
    
    // Guardamos el contenido original del botón
    const originalText = btn.innerHTML;
    
    // Cambiamos el estado del botón a "Procesando"
    btn.style.pointerEvents = 'none'; // Evita doble clic
    btn.innerHTML = `
        <svg class="spinner" viewBox="0 0 50 50" style="width:24px; height:24px; margin-right:10px; animation: rotate 2s linear infinite;">
            <circle cx="25" cy="25" r="20" fill="none" stroke="#050507" stroke-width="5" stroke-dasharray="50" style="animation: dash 1.5s ease-in-out infinite; stroke-linecap: round;"></circle>
        </svg>
        ESTABLECIENDO CONEXIÓN SEGURA...
    `;

    // Añadimos los keyframes de la animación del spinner al documento si no existen
    if (!document.getElementById('spinner-styles')) {
        const style = document.createElement('style');
        style.id = 'spinner-styles';
        style.innerHTML = `
            @keyframes rotate { 100% { transform: rotate(360deg); } }
            @keyframes dash {
                0% { stroke-dasharray: 1, 150; stroke-dashoffset: 0; }
                50% { stroke-dasharray: 90, 150; stroke-dashoffset: -35; }
                100% { stroke-dasharray: 90, 150; stroke-dashoffset: -124; }
            }
        `;
        document.head.appendChild(style);
    }

    // Simulamos un tiempo de procesamiento de pasarela (ej. Stripe o Hotmart) de 1.5 segundos
    setTimeout(() => {
        // Aquí iría la URL real de tu checkout. Ej: window.location.href = 'https://pay.hotmart.com/XXXXX';
        alert("¡Conexión segura establecida! Redirigiendo a la pasarela de pago premium...");
        
        // Restauramos el botón (en caso de que el usuario regrese a la página)
        btn.innerHTML = originalText;
        btn.style.pointerEvents = 'auto';
    }, 1500);
};

/* ==========================================================================
   6. ANIMACIONES DE REVELACIÓN AL HACER SCROLL (INTERSECTION OBSERVER)
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Inyectamos las clases CSS necesarias para la animación inicial
    // Los elementos empezarán invisibles y desplazados ligeramente hacia abajo
    const animationStyles = document.createElement('style');
    animationStyles.innerHTML = `
        .reveal-element {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.8s cubic-bezier(0.25, 1, 0.5, 1);
        }
        .reveal-element.is-visible {
            opacity: 1;
            transform: translateY(0);
        }
        /* Retrasos en escalera para elementos en cuadrícula (ej. módulos) */
        .delay-1 { transition-delay: 0.1s; }
        .delay-2 { transition-delay: 0.2s; }
        .delay-3 { transition-delay: 0.3s; }
        .delay-4 { transition-delay: 0.4s; }
    `;
    document.head.appendChild(animationStyles);

    // 2. Seleccionamos los elementos a los que queremos aplicar el efecto mágico
    // Añadimos dinámicamente la clase 'reveal-element' a tarjetas, testimonios e imágenes
    const elementsToReveal = document.querySelectorAll(
        '.module-card, .bonus-row, .testimonial-card, .revelation-text, .revelation-image'
    );

    elementsToReveal.forEach((el, index) => {
        el.classList.add('reveal-element');
        
        // Si estamos en una cuadrícula de módulos o testimonios, añadimos un pequeño retraso
        // para que aparezcan en forma de "ola" o "cascada"
        if (el.classList.contains('module-card') || el.classList.contains('testimonial-card')) {
            const delayClass = `delay-${(index % 4) + 1}`;
            el.classList.add(delayClass);
        }
    });

    // 3. Configuramos el Intersection Observer
    const observerOptions = {
        root: null, // Usa el viewport del navegador
        rootMargin: '0px',
        threshold: 0.15 // Se activa cuando el 15% del elemento es visible
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Cuando el elemento entra en pantalla, le añadimos la clase que lo hace visible
                entry.target.classList.add('is-visible');
                // Dejamos de observar el elemento para que la animación ocurra solo una vez (opcional)
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // 4. Iniciamos la observación en todos nuestros elementos
    elementsToReveal.forEach(el => {
        scrollObserver.observe(el);
    });

});
