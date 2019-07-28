function copyFormatted() {


    //Get values from form
    var primaryColor = document.getElementById('first-color').value;
    var secondaryColor = document.getElementById('second-color').value;
    var errorColor = document.getElementById('error-color').value;
    var prefix = translateAlternateColorCodes('&', document.getElementById('prefix_placeholder').value);
    
    
    if (errorColor == null || primaryColor == null || secondaryColor == null) {
        M.toast({html: "Some of your values are blank!"});
        return;
    }

    var messageArray = MESSAGE_EN.split('\n');
    for (var i = 0; i < messageArray.length; i++) {
      


      var message = messageArray[i] + "";
      
      

      if (message.match("00a74") != null) {
        //Bed bug fix (no pun intended)
        //TODO: Make array of blacklisted words
        if (!message.includes("bed")) {
          message = message.replaceAll("00a76", "01a7" + primaryColor);
          message = message.replaceAll("00a7c", "01a7" + secondaryColor);
          message = message.replaceAll("00a74", "01a7" + errorColor);
          message = message.replaceAll("=", "= " + prefix + " ");
          //Prevents colors from changing the previous one
          message = message.replaceAll("01a7", "00a7");
          messageArray[i] = message;
        }

      }
    }





    //alert(messageArray);


    copyToClipboard(messageArray.join("\n"));

    //Display notification copied to clipboard
    M.toast({html: "Copied to clipboard!"});
}

String.prototype.replaceAll = function(search, replacement) {
  var target = this;




  return target.replace(new RegExp(search, 'g'), replacement);
};

//Found this neat function on SO
const copyToClipboard = (function initClipboardText() {
    const textarea = document.createElement('textarea');
  
    // Move it off screen.
    textarea.style.cssText = 'position: absolute; left: -99999em';
  
    // Set to readonly to prevent mobile devices opening a keyboard when
    // text is .select()'ed.
    textarea.setAttribute('readonly', true);
  
    document.body.appendChild(textarea);
  
    return function setClipboardText(text) {
      textarea.value = text;
  
      // Check if there is any content selected previously.
      const selected = document.getSelection().rangeCount > 0 ?
        document.getSelection().getRangeAt(0) : false;
  
      // iOS Safari blocks programmtic execCommand copying normally, without this hack.
      if (navigator.userAgent.match(/ipad|ipod|iphone/i)) {
        const editable = textarea.contentEditable;
        textarea.contentEditable = true;
        const range = document.createRange();
        range.selectNodeContents(textarea);
        const sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
        textarea.setSelectionRange(0, 999999);
        textarea.contentEditable = editable;
      } else {
        textarea.select();
      }
  
      try {
        const result = document.execCommand('copy');
  
        // Restore previous selection.
        if (selected) {
          document.getSelection().removeAllRanges();
          document.getSelection().addRange(selected);
        }
  
        return result;
      } catch (err) {
        console.log(err);
        return false;
      }
    };
  })();


//Modified from original ChatColor.translateAlternateColorCodes
function translateAlternateColorCodes(altColorChar, textToTranslate) {
    var b = [...textToTranslate];
    for (var i = 0; i < b.length - 1; i++) {
        if (b[i] == altColorChar && "0123456789AaBbCcDdEeFfKkLlMmNnOoRr".indexOf(b[i+1]) > -1) {
            b[i] = '\\u00a7';
            b[i+1] = b[i+1].toLowerCase();
        }
    }
    return b.join('');
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}





