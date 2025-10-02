// --- Lógica para el Gimnasio Cognitivo ---
const sequenceDisplay = document.getElementById('sequence-display');
const userInput = document.getElementById('user-input');
const feedback = document.getElementById('feedback');
const checkButton = document.getElementById('check-btn');

let currentSequence = [];
let sequenceLength = 4; // Longitud inicial de la secuencia

function startSequence() {
    // 1. Desactivar el botón de iniciar y el de comprobar
    document.querySelector('.button-group button:first-child').disabled = true;
    checkButton.disabled = true;
    userInput.disabled = true;
    userInput.value = '';
    feedback.textContent = '¡Concéntrate!';

    // 2. Generar la secuencia
    currentSequence = [];
    for (let i = 0; i < sequenceLength; i++) {
        currentSequence.push(Math.floor(Math.random() * 10)); // Números del 0 al 9
    }
    
    const sequenceString = currentSequence.join(' - ');
    sequenceDisplay.textContent = sequenceString;

    // 3. Ocultar la secuencia después de 2 segundos
    setTimeout(() => {
        sequenceDisplay.textContent = '... ¿Qué números viste? ...';
        userInput.disabled = false;
        checkButton.disabled = false;
        feedback.textContent = 'Escribe la secuencia separada por comas.';
    }, 2000); 

    // Opcional: Aumentar la dificultad para la próxima ronda
    sequenceLength++;
}

function checkSequence() {
    // 1. Desactivar para evitar múltiples clicks
    checkButton.disabled = true;
    userInput.disabled = true;

    // 2. Obtener la entrada del usuario y limpiarla
    const userSequence = userInput.value.split(',').map(s => s.trim()).filter(s => s !== '').map(Number);
    
    const correctSequenceString = currentSequence.join(', ');
    const userSequenceString = userSequence.join(', ');

    // 3. Comparar
    const isCorrect = userSequence.length === currentSequence.length && 
                      userSequence.every((val, index) => val === currentSequence[index]);

    if (isCorrect) {
        feedback.textContent = `¡Correcto! 💪 Tu mente está ágil. Siguiente nivel (${sequenceLength}).`;
        feedback.style.color = '#28a745'; // Verde
    } else {
        feedback.textContent = `¡Incorrecto! 😥 La secuencia correcta era: ${correctSequenceString}. Inténtalo de nuevo.`;
        feedback.style.color = '#dc3545'; // Rojo
        // Reiniciar la dificultad si falla
        sequenceLength = 4;
    }

    // 4. Habilitar para la próxima ronda
    document.querySelector('.button-group button:first-child').disabled = false;
}


// --- Lógica para la Autoevaluación ---

function calculateScore() {
    let score = 0;
    const questions = ['q1', 'q2', 'q3'];
    const resultElement = document.getElementById('quiz-result');

    questions.forEach(qName => {
        const selected = document.querySelector(`input[name="${qName}"]:checked`);
        if (selected && selected.value === 'yes') {
            score++;
        }
    });

    let message = '';
    if (score === 3) {
        message = `¡Felicidades! Tienes ${score} de 3. Estás adoptando excelentes hábitos preventivos. ¡Sigue así! 🎉`;
        resultElement.style.color = '#28a745';
    } else if (score >= 1) {
        message = `Buen inicio. Tienes ${score} de 3. Identifica dónde puedes mejorar tus hábitos de vida. ¡Tú puedes! 👍`;
        resultElement.style.color = '#ffc107';
    } else {
        message = `Puntaje de ${score} de 3. Es crucial que empieces a incorporar los 4 pilares en tu rutina diaria. ¡Tu cerebro te lo agradecerá! ⚠️`;
        resultElement.style.color = '#dc3545';
    }

    resultElement.textContent = message;
}