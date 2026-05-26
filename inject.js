(function() {
    console.log("Beast Mode: Core Hybrid Injector Engine Fired!");

    function initCustomSystem() {
        // Agar button pehle se bana hua hai toh dobara mat banao
        if (document.getElementById('custom-instruction-btn')) return;

        // ─── 1. CSS STYLING ───
        const style = document.createElement('style');
        style.innerHTML = `
            #custom-instruction-btn {
                position: fixed !important;
                top: 20px !important;
                left: 70px !important; /* Thoda shift kiya taaki hamburger menu block na ho */
                z-index: 2147483647 !important; /* Maximum possible android webview z-index */
                background: linear-gradient(135deg, #0055ff, #00aeff) !important;
                color: #ffffff !important;
                border: 2px solid #ffffff !important;
                border-radius: 30px !important;
                padding: 8px 14px !important;
                font-size: 12px !important;
                font-weight: bold !important;
                box-shadow: 0 4px 20px rgba(0, 85, 255, 0.6) !important;
                cursor: pointer !important;
                display: flex !important;
                align-items: center !important;
            }
            #custom-instruction-modal {
                position: fixed !important;
                top: 0 !important;
                left: 0 !important;
                width: 100vw !important;
                height: 100vh !important;
                background: rgba(0, 0, 0, 0.85) !important;
                z-index: 2147483647 !important;
                display: none;
                justify-content: center;
                align-items: center;
            }
            .modal-content {
                background: #0b111e !important;
                border: 2px solid #0055ff !important;
                border-radius: 16px !important;
                padding: 20px !important;
                width: 85% !important;
                max-width: 360px !important;
            }
            .modal-content h3 { color: #00aeff !important; margin-bottom: 12px !important; text-align: center; }
            .modal-content textarea {
                width: 100% !important; height: 130px !important;
                background: #161e2e !important; color: #fff !important;
                border: 1px solid #0055ff !important; border-radius: 8px !important;
                padding: 10px !important; outline: none !important;
            }
            .modal-buttons { margin-top: 15px !important; display: flex !important; gap: 10px !important; }
            .modal-btn { flex: 1 !important; padding: 10px !important; border-radius: 8px !important; border: none !important; font-weight: bold !important; }
            .save-btn { background: #0055ff !important; color: #fff !important; }
            .close-btn { background: #2c313c !important; color: #fff !important; }
        `;
        document.head.appendChild(style);

        // ─── 2. DOM GENERATION ───
        const btn = document.createElement('button');
        btn.id = 'custom-instruction-btn';
        btn.innerText = '⚙️ Rules';
        document.body.appendChild(btn);

        const modal = document.createElement('div');
        modal.id = 'custom-instruction-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <h3>⚙️ Custom Protocol</h3>
                <textarea id="instruction-text-area" placeholder="Write rules here..."></textarea>
                <div class="modal-buttons">
                    <button class="modal-btn close-btn" id="close-modal-btn">Close</button>
                    <button class="modal-btn save-btn" id="save-modal-btn">Save</button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);

        // Events Handling
        const textArea = document.getElementById('instruction-text-area');
        textArea.value = localStorage.getItem('my_custom_rules') || '';

        btn.addEventListener('click', function(e) { e.preventDefault(); modal.style.display = 'flex'; });
        document.getElementById('close-modal-btn').addEventListener('click', function() { modal.style.display = 'none'; });
        document.getElementById('save-modal-btn').addEventListener('click', function() {
            localStorage.setItem('my_custom_rules', textArea.value);
            modal.style.display = 'none';
            alert('Protocol Loaded, Akira! ⚡');
        });

        // ─── 3. INTERCEPT SEND LOGIC ───
        function processIntercept() {
            const tx = document.querySelector('textarea');
            if (!tx || !tx.value.trim()) return;

            const rules = localStorage.getItem('my_custom_rules');
            if (!rules || !rules.trim()) return;

            // Strict New Chat Check
            if (window.location.pathname === '/' || window.location.pathname === '/basic') {
                const userVal = tx.value;
                if (!userVal.includes('[SYSTEM PROTOCOL:')) {
                    tx.value = `[SYSTEM PROTOCOL: ${rules}]\n\n[USER MESSAGE]: ${userVal}`;
                    console.log("Beast Engine: Injected rules into primary prompt node.");
                }
            }
        }

        // Monitoring enter key & dynamic click node intercepts
        document.addEventListener('keydown', function(e) { if (e.key === 'Enter' && !e.shiftKey) processIntercept(); }, true);
        document.addEventListener('click', function(e) { if (e.target.closest('button') || e.target.closest('svg')) processIntercept(); }, true);

        console.log("Beast Mode: Elements completely injected into DeepSeek layout layer!");
    }

    // Loop system: Har 1.5 second check karega jab tak page ready na ho
    var checkExist = setInterval(function() {
       if (document.body) {
          initCustomSystem();
          clearInterval(checkExist);
       }
    }, 1500);
})();

