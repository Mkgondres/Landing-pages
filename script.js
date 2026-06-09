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
                currentlyActive.querySelector('.faq-answer').style.maxHeight = null;
            }

            // Alternamos el estado de la pregunta actual
            item.classList.toggle('active');
            const answer = item.querySelector('.faq-answer');
            
            if (item.classList.contains('active')) {
                // Le damos la altura exacta que necesita para mostrar el texto
                answer.style.maxHeight = answer.scrollHeight + "px";
            } else {
                // Lo volvems a ocultar
                answer.style.maxHeight = null;
            }
        });
    });
/* Lógica de Modal */
    /* ==================== 6. LÓGICA DE MODAL DE PAGO ==================== */
    const modal = document.getElementById("checkoutModal");
    const checkoutButtons = document.querySelectorAll('.checkout-btn');
    const closeModalBtn = document.querySelector('.close-modal');

    // Abrir modal
    checkoutButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault(); 
            if(modal) {
                modal.style.display = 'flex';
                setTimeout(() => modal.classList.add('show'), 10);
            }
        });
    });

    // Cerrar modal con la X
    if(closeModalBtn) {
        closeModalBtn.addEventListener('click', () => {
            modal.classList.remove('show');
            setTimeout(() => modal.style.display = 'none', 300);
        });
    }

    // Cerrar modal al tocar fuera
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('show');
            setTimeout(() => modal.style.display = 'none', 300);
        }
    });

}); /* AQUÍ CERRAMOS EL BLOQUE PRINCIPAL QUE BORRAMOS EN EL PASO 2 */

/* ==================== 7. FUNCIONES DEL FORMULARIO ==================== */
window.nextToPayment = function() {
    // 1. Leer los datos de las cajas
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const goal = document.getElementById('goal').value;

    // 2. Comprobar si falta alguno
    if (name === "" || email === "" || phone === "" || goal === "") {
        // Muestra una alerta en pantalla si faltan datos
        alert("⚠️ Por favor, completa todos los espacios antes de continuar al pago.");
        return; // Esto detiene la acción y evita que pase a la fase 2
    }

    // 3. Si todo está lleno, avanza a la siguiente fase
    document.getElementById('form-phase').style.display = 'none';
    document.getElementById('payment-phase').style.display = 'block';
};

window.showTab = function(tab) {
    document.getElementById('card-tab').style.display = tab === 'card' ? 'block' : 'none';
    document.getElementById('qr-tab').style.display = tab === 'qr' ? 'block' : 'none';
};

window.simulatePayment = function() {
    document.getElementById('payment-phase').style.display = 'none';
    document.getElementById('success-phase').style.display = 'block';
};
/* ==========================================================================
   MOTOR DE URGENCIA REAL (CAMBIO DE PRECIO AUTOMÁTICO AL LLEGAR A CERO)
   ========================================================================== */
function startTimer() {
    const hElement = document.getElementById('hours');
    const mElement = document.getElementById('minutes');
    const sElement = document.getElementById('seconds');
    
    const timerText = document.querySelector('.timer-text');
    const finalPrice = document.querySelector('.final-price');
    const discountText = document.querySelector('.discount-text');
    const totalValue = document.querySelector('.total-value');

    if (!hElement || !mElement || !sElement) return;

    // 1. CORRECCIÓN: Agregado el asterisco para la multiplicación
    const duration = (2 * 3600 + 45 * 60) * 1000; 
    const storageKey = 'eliteOfferEndTime';
    
    // 2. MEJORA: Convertir el valor de localStorage a un número entero
    let storedEndTime = localStorage.getItem(storageKey);
    let endTime = storedEndTime ? parseInt(storedEndTime, 10) : null;
    let now = new Date().getTime();

    if (!endTime) {
        endTime = now + duration;
        localStorage.setItem(storageKey, endTime);
    }

    function updateTimer() {
        now = new Date().getTime();
        let distance = endTime - now;

        if (distance <= 0) {
            hElement.textContent = '00';
            mElement.textContent = '00';
            sElement.textContent = '00';
            
            if (timerText) {
                timerText.textContent = "❌ LA OFERTA EXCLUSIVA HA EXPIRADO";
                timerText.style.color = "#64748b"; 
            }
            
            if (finalPrice) {
                finalPrice.innerHTML = '$4,970 <span class="currency">USD</span>';
                finalPrice.style.color = '#ffffff'; 
                finalPrice.style.textShadow = 'none';
            }
            
            if (discountText) {
                discountText.textContent = "El periodo de descuento ha finalizado. Inscripciones abiertas a precio regular.";
                discountText.style.color = "#64748b";
            }
            
            if (totalValue) {
                totalValue.style.display = 'none';
            }
            
            return true; 
        }

        const hrs = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const mins = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const secs = Math.floor((distance % (1000 * 60)) / 1000);

        hElement.textContent = String(hrs).padStart(2, '0');
        mElement.textContent = String(mins).padStart(2, '0');
        sElement.textContent = String(secs).padStart(2, '0');
        return false;
    }

    const isExpired = updateTimer();
    
    if (!isExpired) {
        const interval = setInterval(() => {
            const expired = updateTimer();
            if (expired) {
                clearInterval(interval); 
            }
        }, 1000);
    }
}

document.addEventListener('DOMContentLoaded', startTimer);
