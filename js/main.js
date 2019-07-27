function copyFormatted() {
    var version = document.getElementById('mc-version').value;
    var primaryColor = document.getElementById('first-color').value;
    var secondaryColor = document.getElementById('second-color').value;
    var prefix = document.getElementById('prefix_placeholder').value;
    
    
    
    if (version == null || primaryColor == null || secondaryColor == null || prefix === "") {
        M.toast({html: "Some of your values are blank!"});
        return;
    }

    var formattedMessage = MESSAGE_EN;
    formattedMessage = formattedMessage.replaceAll("00a76", "00a7" + primaryColor);
    formattedMessage = formattedMessage.replaceAll("00a7c", secondaryColor);
    formattedMessage = formattedMessage.replaceAll("=", "= " + prefix + " ");
    //formattedMessage = formattedMessage.replace(/(?:\r\n|\r|\n)/g, '<br>');


    



    copyToClipboard(formattedMessage);




    //Display notification copied to clipboard
    M.toast({html: "Copied to clipboard!"});
    //document.getElementById('generate-message').innerHTML = "Copied!";
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
      // https://stackoverflow.com/questions/34045777/copy-to-clipboard-using-javascript-in-ios
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





