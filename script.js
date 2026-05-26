document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
    // 3.5 Seconds tak bantai ka splash screen chalne do
    setTimeout(() => {
        const splashScreen = document.getElementById("splash-screen");
        splashScreen.style.opacity = "0";
        
        setTimeout(() => {
            // DeepSeek ko InAppBrowser ke secure container mein kholo
            // location=no se upar ka browser URL bar gayab ho jayega
            let deepseekWindow = cordova.InAppBrowser.open(
                'https://chat.deepseek.com/', 
                '_blank', 
                'location=no,zoom=no,hardwareback=yes,toolbar=no'
            );
            
            // 🔥 ENGINE TRIGGER: Jaise hi DeepSeek load hoga, inject.js fire ho jayegi
            deepseekWindow.addEventListener('loadstop', () => {
                deepseekWindow.executeScript({ file: "inject.js" });
                console.log("Beast Mode: Injected core logic script into DeepSeek!");
            });

        }, 800); 
    }, 3500);
}

