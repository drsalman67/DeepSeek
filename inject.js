(function() {
    console.log("Beast Mode: DeepSeek Custom Injection Active!");

    // ─── 1. CSS STYLING FOR CUSTOM BUTTON & POP-UP MODAL ───
    const style = document.createElement('style');
    style.innerHTML = `
        /* Floating Button Layout */
        #custom-instruction-btn {
            position: fixed;
            top: 15px;
            left: 15px;
            z-index: 999999;
            background: linear-gradient(135deg, #4d96ff, #0055ff);
            color: #ffffff;
            border: none;
            border-radius: 50px;
            padding: 10px 16px;
            font-size: 13px;
            font-weight: bold;
            box-shadow: 0 4px 15px rgba(0, 85, 255, 0.4);
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 5px;
        }
        /* Custom Modal Box */
        #custom-instruction-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: rgba(5, 7, 10, 0.85);
            backdrop-filter: blur(5px);
            z-index: 9999999;
            display: none;
            justify-content: center;
            align-items: center;
        }
        .modal-content {
            background: #0c1017;
            border: 1px solid #4d96ff;
            border-radius: 16px;
            padding: 25px;
            width: 85%;
            max-width: 400px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
            text-align: center;
        }
        .modal-content h3 {
            color: #4d96ff;
            margin-bottom: 15px;
            font-size: 1.2rem;
            letter-spacing: 1px;
        }
        .modal-content textarea {
            width: 100%;
            height: 150px;
            background: #161b22;
            color: #ffffff;
            border: 1px solid #30363d;
            border-radius: 8px;
            padding: 12px;
            font-size: 14px;
            resize: none;
            outline: none;
        }
        .modal-content textarea:focus {
            border-color: #4d96ff;
        }
        .modal-buttons {
            margin-top: 15px;
            display: flex;
            justify-content: space-between;
            gap: 10px;
        }
        .modal-btn {
            flex: 1;
            padding: 10px;
            border-radius: 8px;
            border: none;
            font-weight: bold;
            cursor: pointer;
        }
        .save-btn { background: #4d96ff; color: #fff; }
        .close-btn { background: #21262d; color: #c9d1d9; }
    `;
    document.head.appendChild(style);

    // ─── 2. CREATING & INJECTING THE BUTTON AND MODAL HTML ───
    const btn = document.createElement('button');
    btn.id = 'custom-instruction-btn';
    btn.innerHTML = '⚙️ Instructions';
    document.body.appendChild(btn);

    const modal = document.createElement('div');
    modal.id = 'custom-instruction-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <h3>⚙️ Protocol Instructions</h3>
            <textarea id="instruction-text-area" placeholder="Apni custom rules yahan likho bantai..."></textarea>
            <div class="modal-buttons">
                <button class="modal-btn close-btn" id="close-modal-btn">Close</button>
                <button class="modal-btn save-btn" id="save-modal-btn">Save Rules</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);

    // Load saved instructions from Phone Storage
    const textArea = document.getElementById('instruction-text-area');
    textArea.value = localStorage.getItem('my_custom_rules') || '';

    // Button Click Event Listeners
    btn.addEventListener('click', () => { modal.style.display = 'flex'; });
    document.getElementById('close-modal-btn').addEventListener('click', () => { modal.style.display = 'none'; });
    document.getElementById('save-modal-btn').addEventListener('click', () => {
        localStorage.setItem('my_custom_rules', textArea.value);
        modal.style.display = 'none';
        alert('Rules Locked in Memory, Akira! ⚡');
    });

    // ─── 3. THE SMART INJECTION INTERCEPTION LOGIC ───
    // Event listener to check when user triggers a message send
    document.addEventListener('keydown', function(event) {
        // Agar Enter key dabayi hai (bina Shift ke), matlab message send ho raha hai
        if (event.key === 'Enter' && !event.shiftKey) {
            handlePromptLogic();
        }
    }, true);

    document.addEventListener('click', function(event) {
        // DeepSeek ke original send button click ko target karne ke liye (Aksar textarea ke paas svg/button hota hai)
        const target = event.target;
        if (target.closest('button') || target.closest('svg')) {
            // Chota sa delay taaki input text change kiya ja sake click push hone se pehle
            handlePromptLogic();
        }
    }, true);

    function handlePromptLogic() {
        const deepseekTextArea = document.querySelector('textarea');
        if (!deepseekTextArea || !deepseekTextArea.value.trim()) return;

        const currentURL = window.location.href;
        const savedRules = localStorage.getItem('my_custom_rules');

        // Agar koi rules saved nahi hain, toh load lene ki zaroorat hi nahi
        if (!savedRules || !savedRules.trim()) return;

        // Smart Check: Agar current path baseline portal par hai, matlab NEW CHAT hai!
        if (window.location.pathname === '/' || window.location.pathname === '/basic') {
            const originalUserPrompt = deepseekTextArea.value;
            
            // Text Blending: Rules ko sirf pehli baar user prompt ke sath jod do
            deepseekTextArea.value = `[SYSTEM PROTOCOL: ${savedRules}]\n\n[USER MESSAGE]: ${originalUserPrompt}`;
            console.log("Beast Mode: First prompt rules injected successfully!");
        } else {
            // URL badal chuka hai (Purani Chat ID setup hai), toh chupchaap bina change kiye jaane do
            console.log("Beast Mode: Conversation history active. No injection needed.");
        }
    }
})();

