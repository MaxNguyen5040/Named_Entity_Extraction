import nltk
#nltk.download('words')
from nltk.corpus import words
setofwords = set(words.words())
#print(f"Words in this dictionary: {len(setofwords)}")

import re
import warnings

warnings.filterwarnings('ignore')  # "error", "ignore", "always", "default", "module" or "once"

predicted = []
dictionary_words = []

#ADD IN SOMETHING WITH FIRST CAPTIAL LETTER?
with open('input.txt', 'r') as file:
    content = file.read()

    words = content.split()

    for word in words:

        clean_word = re.sub(r'[.,()\[\]{}"]', '', word)
        clean_word = clean_word.lower()

        words_to_try = [clean_word]
        post_fixes = ["es","s","ed","d"]

        for j in words_to_try:
            if j == "-":
                break

            if isinstance(j, (int, float, complex)):
                predicted.append(j)
                break

            if j in setofwords:
                dictionary_words.append(j)

            else: #if not in the dictionary
                for i in post_fixes:
                    if clean_word.endswith(i):
                        if clean_word.rstrip(i) in setofwords:
                            predicted.append(clean_word.rstrip(i))
                    else:
                        predicted.append(clean_word)
                        break


from sklearn.metrics import precision_score, recall_score, f1_score

ground_truth = []

# Read the contents of the file
with open("test.txt", 'r') as file:
    input_text = file.read()

    # Splitting the input text by whitespace and removing empty tokens
    ground_truth = input_text.split()
    ground_truth = [token.lower() for token in ground_truth]


aligned_predicted = []

for l in ground_truth:
    if l in predicted:
        aligned_predicted.append(l)
    else:
        aligned_predicted.append(" ")

print("Ground truth: ")
print(ground_truth)
print("Predicted:")
print(aligned_predicted)


# Calculate precision, recall, and F1-score
precision = precision_score(ground_truth, aligned_predicted, average='weighted')
recall = recall_score(ground_truth, aligned_predicted, average='weighted')
f1 = f1_score(ground_truth, aligned_predicted, average='weighted')

print("\nPrecision score:", precision)
print("Recall score:", recall)
print("F1 Score:", f1)

print("\n\n\n\n")