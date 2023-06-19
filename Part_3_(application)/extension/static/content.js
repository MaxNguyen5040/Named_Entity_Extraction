var checked_word = "";

chrome.runtime.onMessage.addListener( 

    function gotMessage(message, sender, sendResponse){
        console.log(message.txt);

        let body = document.getElementsByTagName('p');

        for (let paragraph = 1; paragraph < body.length; paragraph++){
            sentences = body[paragraph].innerHTML;

             const htmlTagRegex = /<[^>]*>/g;
             const text = sentences.replace(htmlTagRegex, '').replace(/\s+/g, '|');
             const words = text.split('|');

             for (word of words){

                if(word == ''){
                    break;
                }

                var placeholder = "";



                // if starts with non letter or number
                const first_char = word[0];

                if(!first_char.match(/[a-zA-Z0-9"']/)){
                    for (let i = 0; i < word.length; i++) {
                        const character = word[i];
    
                        // Check if the character is a letter
                        if (character.match(/[a-zA-Z0-9"']/)) {
                            placeholder = word.substring(0,i);
                            break;
                        }
                          
                    }
                }
                // if ends with non letter or number
                else{
                    for (let i = 0; i < word.length; i++) {
                        const character = word[i];
    
                        // Check if the character is not a letter
                        if (!character.match(/[a-zA-Z0-9"']/)) {
                            placeholder = word.substring(i);
                            break;
                        } 
                    }
                }
                
                var modifiedString = word.replace(/[^a-zA-Z0-9]/g, '');

                checked_word = modifiedString;

                var entity_or_not = sendData(modifiedString);
                console.log(entity_or_not);

                // Indentify if this word is an entity
                if(entity_or_not == "entity!"){
                    console.log("Entity Found");
                    let newText = sentences.replace(modifiedString, `<mark>${modifiedString}</mark>`);
                    paragraph.innerHTML = newText;
                }
                
             }
            }
                
        } 
);

function sendData(inputString) {
    console.log(inputString);
    var value = inputString;
    $.ajax({
        url: '/process',
        type: 'POST',
        data: { 'data': value},
        success: function(response) {
            document.getElementById('output').innerHTML = response;
            return response;
        },
        error: function(error) {
            console.log(error);
        }
        });
}

