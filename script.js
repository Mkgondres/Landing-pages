document.addEventListener("DOMContentLoaded", () => {
    
    // 1. SISTEMA DE ACORDEÓN PARA PREGUNTAS FRECUENTES (FAQ)
    const faqItems = document.querySelectorAll('.faq-item h4');

    faqItems.forEach(item => {
        item.addEventListener('click', () => {
            const answer = item.nextElementSibling;
            const isOpen = answer.style.maxHeight;

            // Cerrar todos los demás
            document.querySelectorAll('.faq-answer').forEach(ans => ans.style.maxHeight = null);
            
            // Abrir el clickeado si estaba cerrado
            if (!isOpen) {
                answer.style.maxHeight = answer.scrollHeight + "px";
                answer.style.paddingBottom = "20px";
            } else {
                answer.style.paddingBottom = "0px";
            }
        });
    });

    // 2. CRONÓMETRO DE URGENCIA (Simulador de escasez)
    // Configuramos una fecha límite de 2 días desde el momento en que entran
    let countDownDate = new Date().getTime() + (2 * 24 * 60 * 60 * 1000) + (5 * 60 * 60 * 1000);

    let x = setInterval(function() {
        let now = new Date().getTime();
        let distance = countDownDate - now;

        // Cálculos de tiempo
        let days = Math.floor(distance / (1000 * 60 * 60 * 24));
        let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Mostrar el resultado en el elemento
        document.getElementById("reloj").innerHTML = 
            `<span>${days} Días</span> : <span>${hours} Horas</span> : <span>${minutes} Min</span> : <span>${seconds} Seg</span>`;

        // Si la cuenta termina
        if (distance < 0) {
            clearInterval(x);
            document.getElementById("reloj").innerHTML = "¡OFERTA EXPIRADA!";
        }
    }, 1000);
});
