document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
    console.log("Beast Mode: Launching DeepSeek in Desktop Mode...");
    
    // Splash screen animation timeout (3.5s)
    setTimeout(() => {
        const splashScreen = document.getElementById("splash-screen");
        if(splashScreen) splashScreen.style.opacity = "0";
        
        setTimeout(() => {
            // ─── DESKTOP CONFIGURATION LAYER ───
            // 'overrideUserAgent' sabse main hai, ye DeepSeek ko batayega ki hum PC se hain phone se nahi.
            let desktopOptions = "location=no,zoom=yes,hardwareback=yes,toolbar=no," +
                                 "overrideUserAgent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";
            
            let deepseekWindow = cordova.InAppBrowser.open(
                'https://chat.deepseek.com/', 
                '_blank', 
                desktopOptions
            );
            
            // Jaise hi page load hoga, hum dynamic viewports aur zooming restrictions ko uda denge
            deepseekWindow.addEventListener('loadstop', function() {
                console.log("Beast Mode: DeepSeek Loaded. Forcing Desktop Viewport & Zoom Fix...");
                
                deepseekWindow.executeScript({
                    code: `
                        // 1. Mobile viewport scaling meta-tag ko replace ya remove karna
                        var viewport = document.querySelector('meta[name="viewport"]');
                        if (viewport) {
                            // Page ko rigid pc browser layout de rahe hain jisse landscape mein fatela na dikhe
                            viewport.setAttribute('content', 'width=1280, initial-scale=0.75, maximum-scale=2.0, user-scalable=yes');
                        } else {
                            var meta = document.createElement('meta');
                            meta.name = "viewport";
                            meta.content = "width=1280, initial-scale=0.75, maximum-scale=2.0, user-scalable=yes";
                            document.getElementsByTagName('head')[0].appendChild(meta);
                        }
                        
                        // 2. CSS scaling hacks agar text fir bhi bohot bada dikhe
                        document.body.style.zoom = "85%"; 
                        console.log("Desktop viewports successfully simulated inside Android shell!");
                    `
                });
            });

        }, 800); 
    }, 3500);
}

