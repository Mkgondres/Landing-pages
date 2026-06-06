document.addEventListener('DOMContentLoaded', () => {

    /* ==================== 1. NAVBAR SCROLL EFFECT ==================== */
    const navbar = document.getElementById('main-navbar');
    const toggleNavbarSolidState = () => {
        if (window.scrollY > 40) {
            navbar.style.padding = '12px 0';
            navbar.style.background = 'rgba(6, 11, 25, 0.96)';
            navbar.style.boxShadow = '0 10px 40px rgba(0, 0, 0, 0.3)';
            navbar.style.borderBottom = '1px solid rgba(214, 175, 55, 0.2)';
        } else {
            navbar.style.padding = '20px 0';
            navbar.style.background = 'rgba(6, 11, 25, 0.7)';
            navbar.style.boxShadow = 'none';
            navbar.style.borderBottom = '1px solid rgba(255, 255, 255, 0.03)';
        }
    };
    window.addEventListener('scroll', toggleNavbarSolidState);
    toggleNavbarSolidState();

    /* ==================== 2. BOTONES SCROLL ==================== */
    const ctaTriggers = document.querySelectorAll('.cta-scroll-trigger');
    ctaTriggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            const checkoutSection = document.getElementById('oferta'); // Lo crearemos después
            if (checkoutSection) {
                const navHeight = navbar.offsetHeight;
                const targetPosition = checkoutSection.getBoundingClientRect().top + window.pageYOffset - navHeight - 15;
                window.scrollTo({ top: targetPosition, behavior: 'smooth' });
            } else {
                console.log("Botón listo. Esperando a que construyamos la sección de pago.");
            }
        });
    });

    /* ==================== 3. MODAL DE VIDEO ==================== */
    const playVideoBtn = document.getElementById('play-vsl-btn');
    if (playVideoBtn) {
        playVideoBtn.addEventListener('click', () => {
            const modalOverlay = document.createElement('div');
            Object.assign(modalOverlay.style, {
                position: 'fixed', top: '0', left: '0', width: '100%', height: '100%',
                backgroundColor: 'rgba(4, 8, 18, 0.96)', backdropFilter: 'blur(8px)',
                zIndex: '2000', display: 'flex', alignItems: 'center', justifyContent: 'center',
                opacity: '0', transition: 'opacity 0.4s ease-in-out'
            });

            const closeButton = document.createElement('button');
            closeButton.innerHTML = '✕ Cerrar Video';
            Object.assign(closeButton.style, {
                position: 'absolute', top: '40px', right: '40px', color: '#d4af37',
                fontSize: '0.85rem', fontWeight: '600', textTransform: 'uppercase', 
                border: 'none', background: 'transparent', cursor: 'pointer'
            });

            const videoFrame = document.createElement('div');
            Object.assign(videoFrame.style, {
                width: '90%', maxWidth: '960px', aspectRatio: '16/9',
                backgroundColor: '#000', border: '1px solid rgba(214, 175, 55, 0.3)',
                borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b'
            });
            videoFrame.innerHTML = '<p>[Aquí va tu reproductor de video]</p>';

            modalOverlay.appendChild(closeButton);
            modalOverlay.appendChild(videoFrame);
            document.body.appendChild(modalOverlay);

            setTimeout(() => modalOverlay.style.opacity = '1', 15);

            const destroyModal = () => {
                modalOverlay.style.opacity = '0';
                setTimeout(() => document.body.removeChild(modalOverlay), 400);
            };

            closeButton.addEventListener('click', destroyModal);
            modalOverlay.addEventListener('click', (e) => { if (e.target === modalOverlay) destroyModal(); });
        });
    }
});
    /* ==================== 4. ANIMACIÓN DE REVELACIÓN AL HACER SCROLL ==================== */
    // Esto hará que la sección aparezca suavemente cuando el usuario baje la página
    const revealElements = document.querySelectorAll('.reveal-scroll');

    const revealOnScroll = () => {
        const triggerBottom = window.innerHeight * 0.85;

        revealElements.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;
            if (elementTop < triggerBottom) {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }
        });
    };

    // Configuración inicial de los elementos para la animación
    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.8s ease-out';
    });

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Disparo inicial
    /* ==================== 5. ACORDEÓN DE PREGUNTAS FRECUENTES (FAQ) ==================== */
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const questionBtn = item.querySelector('.faq-question');
        
        questionBtn.addEventListener('click', () => {
            // Cerramos las otras preguntas si queremos que solo haya una abierta a la vez
            const currentlyActive = document.querySelector('.faq-item.active');
            if (currentlyActive && currentlyActive !== item) {
                currentlyActive.classList.remove('active');
                currentlyActive.querySelector('.faq-answer').style.maxHeight = 0;
            }

            // Alternamos el estado de la pregunta actual
            item.classList.toggle('active');
            const answer = item.querySelector('.faq-answer');
            
            if (item.classList.contains('active')) {
                // Le damos la altura exacta que necesita para mostrar el texto
                answer.style.maxHeight = answer.scrollHeight + "px";
            } else {
                // Lo volvems a ocultar
                answer.style.maxHeight = 0;
            }
        });
    });
/* Lógica de Modal */
const modal = document.getElementById("checkoutModal");
document.querySelectorAll('.checkout-btn').forEach(btn => btn.onclick = () => modal.style.display = 'flex');
document.querySelector('.close-modal').onclick = () => modal.style.display = 'none';

function nextToPayment() {
    document.getElementById('form-phase').style.display = 'none';
    document.getElementById('payment-phase').style.display = 'block';
}

function showTab(tab) {
    document.getElementById('card-tab').style.display = tab === 'card' ? 'block' : 'none';
    document.getElementById('qr-tab').style.display = tab === 'qr' ? 'block' : 'none';
}

function simulatePayment() {
    document.getElementById('payment-phase').style.display = 'none';
    document.getElementById('success-phase').style.display = 'block';
}
