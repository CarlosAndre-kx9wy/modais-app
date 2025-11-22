document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;
    const darkModeToggle = document.getElementById('darkModeToggle');
    const searchInput = document.getElementById('searchInput');
    const modalCards = document.querySelectorAll('.modal-card');

    /* ---------------------------------------------------- */
    /* 1. FUNCIONALIDADE MODO ESCURO (DARK MODE)            */
    /* ---------------------------------------------------- */

    // Função para aplicar o modo com base na preferência
    function applyDarkMode(isDark) {
        if (isDark) {
            body.classList.add('dark-mode');
            // Altera o ícone do botão para sol (claro)
            darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            darkModeToggle.setAttribute('aria-label', 'Alternar Modo Claro');
        } else {
            body.classList.remove('dark-mode');
            // Altera o ícone do botão para lua (escuro)
            darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            darkModeToggle.setAttribute('aria-label', 'Alternar Modo Escuro');
        }
    }

    // Carregar preferência do localStorage
    const savedMode = localStorage.getItem('darkMode');
    // Se houver uma preferência salva, use-a. Caso contrário, verifique a preferência do sistema.
    if (savedMode) {
        applyDarkMode(savedMode === 'enabled');
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        // Se não houver preferência salva, use a preferência do sistema
        applyDarkMode(true);
    } else {
         applyDarkMode(false);
    }
    

    // Alternar Modo Escuro ao clicar no botão
    darkModeToggle.addEventListener('click', () => {
        const isDark = body.classList.toggle('dark-mode');
        // Salva a preferência no localStorage
        localStorage.setItem('darkMode', isDark ? 'enabled' : 'disabled');
        applyDarkMode(isDark);
    });

    /* ---------------------------------------------------- */
    /* 2. FUNCIONALIDADE DE BUSCA (FILTRO EM TEMPO REAL)    */
    /* ---------------------------------------------------- */

    // Função para filtrar os cards
    function filterCards() {
        // Pega o texto do input, remove espaços e converte para minúsculas
        const searchTerm = searchInput.value.trim().toLowerCase();

        modalCards.forEach(card => {
            // Pega o texto de dentro do card (título e parágrafo) e converte para minúsculas
            const cardText = card.textContent.toLowerCase();

            // Verifica se o texto do card inclui o termo de busca
            if (cardText.includes(searchTerm)) {
                card.classList.remove('hidden'); // Mostra o card
            } else {
                card.classList.add('hidden'); // Esconde o card
            }
        });
    }

    // Adiciona o listener para filtrar a cada tecla digitada
    searchInput.addEventListener('input', filterCards);
});