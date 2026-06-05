/* ==========================================================================
   AURA PREMIUM SCRIPT - PARTE 1
   Arquitectura de interacciones y animaciones de entrada.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    
    // ----------------------------------------------------------------------
    // 1. NAVEGACIÓN INTELIGENTE (Dynamic Glassmorphism)
    // ----------------------------------------------------------------------
    const navbar = document.querySelector('.nav-glass-wrapper');

    // Escuchamos el evento de scroll del usuario
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            // Cuando baja, oscurecemos un poco la barra y le damos sombra para que contraste
            navbar.style.background = 'rgba(7, 7, 9, 0.85)';
            navbar.style.borderBottom = '1px solid rgba(212, 175, 55, 0.1)'; // Borde dorado sutil
            navbar.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.5)';
        } else {
            // Cuando está arriba del todo, vuelve a ser cristal casi transparente
            navbar.style.background = 'rgba(255, 255, 255, 0.02)';
            navbar.style.borderBottom = '1px solid rgba(255, 255, 255, 0.05)';
            navbar.style.boxShadow = 'none';
        }
    });

    // ----------------------------------------------------------------------
    // 2. MOTOR DE REVELADO (Intersection Observer API)
    // Esto crea el efecto Premium de que los elementos aparecen al bajar
    // ----------------------------------------------------------------------
    
    // Seleccionamos todos los elementos que queremos animar
    const revealElements = document.querySelectorAll(`
        .section-header-minimal, 
        .concept-card, 
        .section-header-left,
        .pillar-card, 
        .glass-testimonial-card, 
        .pricing-glass-panel
    `);

    // Inyectamos las propiedades CSS iniciales directamente desde JS 
    // para asegurar una sincronización perfecta sin tocar el CSS anterior
    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(40px)'; // Los bajamos 40px
        el.style.transition = 'opacity 0.8s ease-out, transform 0.8s cubic-bezier(0.23, 1, 0.32, 1)';
        el.style.willChange = 'opacity, transform'; // Optimización de rendimiento para el navegador
    });

    // Configuramos el observador
    const revealOptions = {
        root: null,
        threshold: 0.15, // El elemento aparece cuando el 15% de él ya está en pantalla
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Cuando el elemento entra en pantalla, lo revelamos
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Dejamos de observarlo para que la animación solo ocurra la primera vez
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    // Activamos el observador para cada elemento
    revealElements.forEach(el => revealObserver.observe(el));

});
    // ==========================================================================
    // AURA PREMIUM SCRIPT - PARTE 2
    // Continuación dentro del document.addEventListener('DOMContentLoaded', () => { ...
    // ==========================================================================

    // ----------------------------------------------------------------------
    // 3. ACORDEÓN DE PREGUNTAS FRECUENTES (FAQ Premium Slide)
    // ----------------------------------------------------------------------
    const faqItems = document.querySelectorAll('.faq-question');

    faqItems.forEach(item => {
        item.addEventListener('click', function() {
            // Alternar clase activa en el botón presionado
            this.classList.toggle('active');
            
            // Animación del icono (Gira el "+" para convertirlo en una "x" elegante)
            const icon = this.querySelector('.faq-icon');
            if (this.classList.contains('active')) {
                icon.style.transform = 'rotate(45deg)';
                icon.style.color = 'var(--text-main)'; // Cambia de dorado a blanco suave
            } else {
                icon.style.transform = 'rotate(0deg)';
                icon.style.color = 'var(--gold-primary)'; // Vuelve a dorado
            }

            // Lógica de apertura/cierre matemático (Evita saltos bruscos)
            const answerWrapper = this.nextElementSibling;
            
            if (answerWrapper.style.maxHeight) {
                // Si ya está abierto (tiene altura asignada), lo cerramos
                answerWrapper.style.maxHeight = null;
            } else {
                // Si está cerrado, cerramos todos los demás primero (Opcional, para mantener limpieza visual)
                document.querySelectorAll('.faq-answer-wrapper').forEach(wrapper => {
                    wrapper.style.maxHeight = null;
                });
                document.querySelectorAll('.faq-icon').forEach(otherIcon => {
                    otherIcon.style.transform = 'rotate(0deg)';
                    otherIcon.style.color = 'var(--gold-primary)';
                });
                document.querySelectorAll('.faq-question').forEach(btn => {
                    btn.classList.remove('active');
                });

                // Re-activamos el botón actual y calculamos su altura exacta
                this.classList.add('active');
                icon.style.transform = 'rotate(45deg)';
                icon.style.color = 'var(--text-main)';
                
                // .scrollHeight obtiene la altura real del contenido interno invisible
                answerWrapper.style.maxHeight = answerWrapper.scrollHeight + "px";
            }
        });
    });

    // ----------------------------------------------------------------------
    // 4. NAVEGACIÓN SUAVE MILIMÉTRICA (Smooth Scroll con Offset)
    // ----------------------------------------------------------------------
    // Al usar una barra de navegación fija (Glassmorphism), los saltos normales de HTML 
    // ocultan el título de las secciones debajo de la barra. Este script lo corrige.
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault(); // Detenemos el salto brusco predeterminado de HTML
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return; // Ignoramos si el enlace está vacío
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Calculamos 90px de espacio extra para que la sección quede por debajo de la barra flotante
                const headerOffset = 90; 
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
                // Ejecutamos el scroll con comportamiento suave nativo
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

}); // FIN DEL DOMContentLoaded (Cierre de todo el bloque JavaScript)
