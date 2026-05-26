document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
    console.log("Beast Mode: Device Ready. Launching DeepSeek Portal...");
    
    // Splash screen timeout
    setTimeout(() => {
        const splashScreen = document.getElementById("splash-screen");
        if(splashScreen) splashScreen.style.opacity = "0";
        
        setTimeout(() => {
            // Secure container configurations enhanced
            let deepseekWindow = cordova.InAppBrowser.open(
                'https://chat.deepseek.com/', 
                '_blank', 
                'location=no,zoom=no,hardwareback=yes,toolbar=no,clearcache=no,clearsessioncache=no'
            );
            
            // 🔥 ADVANCED MONITOR: Jaise hi load stop ho, script inject karo
            deepseekWindow.addEventListener('loadstop', function() {
                console.log("Beast Mode: DeepSeek Web Page Loaded Stop, Injecting Script...");
                
                // Direct code string injection for high privilege access
                deepseekWindow.executeScript({
                    code: `
                        console.log("Script string executing inside webview...");
                        var script = document.createElement('script');
                        script.src = 'inject.js'; // local script fetch backup
                        document.head.appendChild(script);
                    `
                });
                
                // Main execution file loading injection
                deepseekWindow.executeScript({ file: "inject.js" }, function(result) {
                    console.log("Beast Mode: inject.js execution callback triggered!");
                });
            });

        }, 800); 
    }, 3500);
}

