        chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
            
            if (request.method == "getLocalStorage")
            {
                //alert(localStorage[request.key]);
                 sendResponse({data: localStorage[request.key]});
                 console.log("getLocalStorage ");
            }
            else if(request.method == "setLocalStorage"){
                localStorage[request.key] = request.value;
                sendResponse({data:"success"});
            }
            else
              sendResponse({}); // snub them.
        });  
