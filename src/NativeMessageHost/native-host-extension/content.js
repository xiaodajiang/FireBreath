/*global chrome*/
(function() {

    var nextId = 1;
    var ports = {};
    //var extensionId = 'niedeobcoghhbdejmjemafcagoolfnha';
    var extensionId = chrome.runtime.id;

    window.addEventListener("message", function(event) {
        // We only accept messages from ourselves
        if (event.source != window) { return; }

        if (event.data.source && (event.data.source == "page")) {
            handleEvent(event.data);
        }
    }, false);

    function handleEvent(evt) {
        if (evt.request == "Create") {
            createWyrmhole();
        } else if (evt.port) {
            var port = evt.port;
            delete evt.port;
            delete evt.source;
            if (ports[port]) {
                // Message from the page received, post it to the background script
                ports[port].postMessage(evt);
            } else {
                // Invalid port!
                window.postMessage({
                    source: "host",
                    port: port,
                    message: "Error",
                    error: "Invalid port"
                }, "*");
            }
        }
    }

    function createWyrmhole() {
        var portName = "FireWyrmPort" + (nextId++);
        var port = chrome.runtime.connect(extensionId, {name: portName});
        ports[portName] = port;

        window.postMessage({
            source: "host",
            port: portName,
            message: "Created"
        }, "*");
        port.onMessage.addListener(function(msg) {
            // Message from the background script received, post it to the page
            msg.source = "host";
            msg.port = portName;
            window.postMessage(msg, "*");
        });
        port.onDisconnect.addListener(function() {
            // The host port disconnected; tell the window
            window.postMessage({
                source: "host",
                port: portName,
                message: "Disconnected"
            }, "*");
            delete ports[portName];
        });
    }

    // Script to inject scripts into the page
    function injectScript(script) {
        // Inject the page script (wyrmhole.js) into the page
        var s = document.createElement('script');
        s.src = chrome.extension.getURL(script);
        s.onload = function() {
            this.parentNode.removeChild(this);
        };
        (document.head||document.documentElement).appendChild(s);
    }

    injectScript("FireBreathPromise.js");
    injectScript("wyrmhole.js");
    injectScript("firewyrm.js");

})();
