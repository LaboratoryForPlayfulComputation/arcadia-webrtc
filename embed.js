(function() {
    if (window.ksRunnerInit) return;

    // This line gets patched up by the cloud
    var pxtConfig = {
    "relprefix": "/arcadia-webrtc/",
    "verprefix": "",
    "workerjs": "/arcadia-webrtc/worker.js",
    "monacoworkerjs": "/arcadia-webrtc/monacoworker.js",
    "gifworkerjs": "/arcadia-webrtc/gifjs/gif.worker.js",
    "serviceworkerjs": "/arcadia-webrtc/serviceworker.js",
    "pxtVersion": "6.2.23",
    "pxtRelId": "",
    "pxtCdnUrl": "/arcadia-webrtc/",
    "commitCdnUrl": "/arcadia-webrtc/",
    "blobCdnUrl": "/arcadia-webrtc/",
    "cdnUrl": "/arcadia-webrtc/",
    "targetVersion": "0.0.0",
    "targetRelId": "",
    "targetUrl": "",
    "targetId": "arcadia",
    "simUrl": "/arcadia-webrtc/simulator.html",
    "simserviceworkerUrl": "/arcadia-webrtc/simulatorserviceworker.js",
    "simworkerconfigUrl": "/arcadia-webrtc/workerConfig.js",
    "partsUrl": "/arcadia-webrtc/siminstructions.html",
    "runUrl": "/arcadia-webrtc/run.html",
    "docsUrl": "/arcadia-webrtc/docs.html",
    "multiUrl": "/arcadia-webrtc/multi.html",
    "asseteditorUrl": "/arcadia-webrtc/asseteditor.html",
    "isStatic": true
};

    var scripts = [
        "/arcadia-webrtc/highlight.js/highlight.pack.js",
        "/arcadia-webrtc/bluebird.min.js",
        "/arcadia-webrtc/marked/marked.min.js",
    ]

    if (typeof jQuery == "undefined")
        scripts.unshift("/arcadia-webrtc/jquery.js")
    if (typeof jQuery == "undefined" || !jQuery.prototype.sidebar)
        scripts.push("/arcadia-webrtc/semantic.js")
    if (!window.pxtTargetBundle)
        scripts.push("/arcadia-webrtc/target.js");
    scripts.push("/arcadia-webrtc/pxtembed.js");

    var pxtCallbacks = []

    window.ksRunnerReady = function(f) {
        if (pxtCallbacks == null) f()
        else pxtCallbacks.push(f)
    }

    window.ksRunnerWhenLoaded = function() {
        pxt.docs.requireHighlightJs = function() { return hljs; }
        pxt.setupWebConfig(pxtConfig || window.pxtWebConfig)
        pxt.runner.initCallbacks = pxtCallbacks
        pxtCallbacks.push(function() {
            pxtCallbacks = null
        })
        pxt.runner.init();
    }

    scripts.forEach(function(src) {
        var script = document.createElement('script');
        script.src = src;
        script.async = false;
        document.head.appendChild(script);
    })

} ())
