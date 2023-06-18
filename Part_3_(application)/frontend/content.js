chrome.runtime.onMessage.addListener( 
    function gotMessage(message, sender, sendResponse){
        console.log(message.txt);

        let body = document.getElementsByTagName('p');

        for (paragraph of body){
            sentences = paragraph.innerHTML;
            //paragraph.style['background-color'] = "#D64550";
            console.log(sentences);

            // rn this is individual letters need to convert to words
            for (let i = 0; i < sentences.length; i++) {
                var check = "f";
                if(sentences[i] == check){
                    let newText = sentences.replace(sentences[i], `<mark>${check}</mark>`);
		            paragraph.innerHTML = newText;
                }

              }

            }
                
        }
        
);
