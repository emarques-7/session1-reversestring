/**
 * Reverse String — script.js
 * Reverses a text string and displays the result.
 */

(function () {
    const inputText = document.getElementById('inputText');
    const btnReverse = document.getElementById('btnReverse');
    const resultBox = document.getElementById('resultBox');
    const btnCopy = document.getElementById('btnCopy');

    /**
     * Reverses a given string.
     * Uses Array.from to correctly handle multi-byte / emoji characters.
     * @param {string} str
     * @returns {string}
     */
    function reverseString(str) {
        return Array.from(str).reverse().join('');
    }

    const MIN_CHARS = 3;

    function getCharCount(str) {
        return Array.from(str).length;
    }

    /**
     * Updates the result box with the reversed string.
     * Can be called from the button click or from the live input listener.
     */
    function updateResult() {
        const value = inputText.value;
        const charCount = getCharCount(value);

        if (charCount < MIN_CHARS) {
            resultBox.innerHTML = charCount === 0
                ? '<span class="placeholder-text">Your reversed string will appear here</span>'
                : `<span class="placeholder-text">Keep typing… (${MIN_CHARS - charCount} more character${MIN_CHARS - charCount !== 1 ? 's' : ''})</span>`;
            resultBox.classList.remove('has-value');
            btnCopy.classList.remove('visible');
            return;
        }

        const reversed = reverseString(value);

        // Only re-create the span (triggering animation) when the button is clicked;
        // for live updates, just patch the text to avoid constant flashing.
        const existing = resultBox.querySelector('.result-text');
        if (existing) {
            existing.textContent = reversed;
        } else {
            resultBox.innerHTML = '';
            const span = document.createElement('span');
            span.className = 'result-text';
            span.textContent = reversed;
            resultBox.appendChild(span);
        }

        resultBox.classList.add('has-value');
        btnCopy.classList.remove('copied');
        btnCopy.textContent = 'Copy';
        btnCopy.classList.add('visible');
    }

    /**
     * Called exclusively by the Reverse button — re-triggers the flash animation.
     */
    function handleReverse() {
        // Force animation replay by removing the span first
        resultBox.querySelector('.result-text')?.remove();
        updateResult();
    }

    /**
     * Keeps the Reverse button in sync with the minimum-character rule.
     */
    function syncButtonState() {
        const enabled = getCharCount(inputText.value) >= MIN_CHARS;
        btnReverse.disabled = !enabled;
    }

    /**
     * Copies the reversed string to the clipboard.
     */
    async function handleCopy() {
        const text = resultBox.querySelector('.result-text')?.textContent;
        if (!text) return;

        try {
            await navigator.clipboard.writeText(text);
            btnCopy.textContent = 'Copied!';
            btnCopy.classList.add('copied');
            setTimeout(() => {
                btnCopy.textContent = 'Copy';
                btnCopy.classList.remove('copied');
            }, 2000);
        } catch {
            // Fallback for environments without clipboard API
            const ta = document.createElement('textarea');
            ta.value = text;
            ta.style.position = 'fixed';
            ta.style.opacity = '0';
            document.body.appendChild(ta);
            ta.focus();
            ta.select();
            document.execCommand('copy');
            document.body.removeChild(ta);
            btnCopy.textContent = 'Copied!';
            setTimeout(() => { btnCopy.textContent = 'Copy'; }, 2000);
        }
    }

    // Event listeners
    btnReverse.addEventListener('click', handleReverse);
    btnCopy.addEventListener('click', handleCopy);

    // Live update on every keystroke
    inputText.addEventListener('input', () => {
        syncButtonState();
        updateResult();
    });

    // Allow triggering with Enter key inside the input field
    inputText.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !btnReverse.disabled) handleReverse();
    });

    // Init: button starts disabled
    syncButtonState();
})();
