from transformers import GPT2LMHeadModel, GPT2Tokenizer
# Tokenizer takes our input worsd adn turns them into an effective number
# Then its put into the generator which detokenizes it
# Created Tokenizer from gpt2-large
tokenizer = GPT2Tokenizer.from_pretrained('gpt2-large') # remove the large fo the smaller version
# Created Model from gpt2-large. The pad token id is the text padding
model = GPT2LMHeadModel.from_pretrained('gpt2-large', pad_token_id=tokenizer.eos_token_id)

# Padding
# In natural language processing (NLP), padding text with a tokenizer means to add extra tokens to the end of a text sequence 
# so that it has the same length as other text sequences in a batch. This is done so that all the text sequences in a batch can 
# be processed by a machine learning model at the same time. The padded tokens are usually special tokens that have no semantic 
# meaning, such as [PAD] or [EOS].
sentence = "Write me a resume for Citadel Securities Quantitative Researcher Position"
# Tokenization: The process of convcerting a string into a sequence of numbers
input_ids = tokenizer.encode(sentence, return_tensors='pt') # Pt just means we want to pass the tensors as PyTorch tensors
print(input_ids)
# generation
# Input_ids is already tokenized above, the max length is max text length, num_beams is coming from "beam search" which is the number of search trees to determine
# The next word. The no repeat simply makes sure we dont have a probability that keeps getting nuggested again and again and early stopping it stops when the prob for
# the next words has falled too low quality
output = model.generate(input_ids, max_length=100, num_beams=5, no_repeat_ngram_size=2, early_stopping=True)

tokenizer.decode(output[0], skip_special_tokens=True)
text = tokenizer.decode(output[0], skip_special_tokens=True)
# with open('Post.txt', 'w') as f:
#     f.write(text)
print(text)