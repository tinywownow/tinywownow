/* Text cluster copy. Same blueprint and rules as pdf.js. */
'use strict';
module.exports = {
  'word-counter': {
    title: 'Word Counter and Character Counter',
    meta: 'Count words, characters, sentences, paragraphs and reading time as you type. Free and private, with no sign-up.',
    answer: 'Word Counter counts the words, characters, sentences and paragraphs in your text as you type, and it estimates the reading time at 200 words per minute. Your text stays in your browser.',
    steps: ['Type or paste your text into the box.', 'Read the live counts above it.', 'Edit your text until you reach your target length.'],
    use: ['You must hit a word limit for an essay or article.', 'You want to check a meta description or social post length.', 'You want to estimate how long a text takes to read.'],
    tips: [
      'Use the character count to check text against limits, such as a meta description, which search results usually show up to around 155 characters.',
      'Remember that words are groups separated by spaces, so a hyphenated word such as well-known counts as one.',
      'Rely on the reading time as a guide. It uses 200 words per minute, a typical speed for silent reading.',
      'Paste your draft and trim it until you reach your target. The counts update as you type.'
    ],
    limits: ['The tool counts words as groups of characters separated by spaces or line breaks.', 'The tool rounds reading time up to whole minutes.', 'Long texts depend on your device.'],
    faq: [
      ['How does the tool count words?', 'It counts groups of characters that spaces or line breaks separate.'],
      ['How does the tool calculate reading time?', 'It divides the word count by 200 words per minute and rounds up to whole minutes.'],
      ['Does the tool save my text?', 'No. Your text stays in your browser, and the tool does not store it or send it anywhere.'],
      ['Does the character count include spaces?', 'Yes. The count covers every character in the box, including spaces and line breaks.']
    ],
    next: [['case-converter', 'Fix the capitalisation of your text.'], ['text-reverser', 'Flip the text by characters, words or lines.'], ['pdf-to-text', 'Extract text from a PDF to count.']],
    io: ['Text', 'Counts']
  },
  'case-converter': {
    title: 'Case Converter, UPPER lower Title camelCase',
    meta: 'Convert text to UPPERCASE, lowercase, Title Case, Sentence case, camelCase, PascalCase, snake_case or kebab-case. Free and instant.',
    answer: 'Case Converter changes the capitalisation of your text to uppercase, lowercase, title case, sentence case, camelCase, PascalCase, snake_case or kebab-case with one click. It runs in your browser, so your text stays private.',
    steps: ['Type or paste your text into Input.', 'Click the case style you want.', 'Click Copy Result.'],
    use: ['You typed a paragraph in ALL CAPS by mistake.', 'You need a variable name in camelCase or snake_case.', 'You want a URL slug in kebab-case.'],
    tips: [
      'Use sentence case to fix text that you typed in ALL CAPS, and lowercase before you apply another style.',
      'Choose camelCase, PascalCase or snake_case for variable and file names. kebab-case suits URL slugs.',
      'Adjust small words such as of and the by hand for headlines, because Title Case capitalises every word.',
      'Click one style after another on the same text, then copy the result you like best.'
    ],
    limits: ['Title Case capitalises every word, including small words like of and the.', 'The tool changes capitalisation and word separators only.', 'The tool works on the text in the box, one block at a time.'],
    faq: [
      ['What is the difference between camelCase and PascalCase?', 'camelCase starts with a lowercase letter (myVariableName). PascalCase starts with a capital (MyVariableName).'],
      ['What is snake_case?', 'snake_case writes words in lowercase and joins them with underscores, for example my_variable_name.'],
      ['Does Title Case follow style guides?', 'It capitalises the first letter of every word. It does not skip small words such as of or the.'],
      ['Which case suits a URL slug?', 'kebab-case suits URL slugs, because it joins lowercase words with hyphens.']
    ],
    next: [['word-counter', 'Count the words in your text.'], ['text-reverser', 'Reverse the text.'], ['url-encode', 'Percent-encode the converted text for a URL.']],
    io: ['Text', 'Text']
  },
  'text-reverser': {
    title: 'Text Reverser, Reverse Text Words Lines',
    meta: 'Reverse the characters, words or lines of any text instantly. Free and private, with no sign-up.',
    answer: 'Text Reverser flips your text by characters, by words or by lines. Type or paste text, and the reversed version appears instantly. It runs in your browser, so your text stays private.',
    steps: ['Type or paste your text.', 'Choose Reverse Characters, Reverse Words or Reverse Lines.', 'Click Copy Result.'],
    use: ['You want to flip the order of a list.', 'You want to check whether a word is a palindrome.', 'You want a mirrored text for a puzzle or a joke.'],
    tips: [
      'Use Reverse Lines to flip the order of a list, for example to turn an oldest-first list into a newest-first list.',
      'Reverse the characters to check a palindrome. Reverse the text and compare it with the original.',
      'Use words or lines mode for text with emoji, because reversing characters can break multi-part emoji.',
      'Choose Reverse Words to keep each word as it is and change only the order of the words.'
    ],
    limits: ['The tool reverses by characters, words or lines only.', 'Reversing characters can split multi-part emoji.', 'The tool works on one block of text at a time.'],
    faq: [
      ['What is the difference between the three modes?', 'Characters reverses every letter ("abc" becomes "cba"). Words reverses the order of the words. Lines reverses the order of the lines.'],
      ['Does it work with emoji?', 'Basic emoji work, but reversing characters can split some multi-part emoji.'],
      ['Does the tool save my text?', 'No. Your text stays in your browser.'],
      ['Can I reverse a list?', 'Yes. Paste the list, one item per line, and choose Reverse Lines.']
    ],
    next: [['case-converter', 'Change the capitalisation.'], ['word-counter', 'Count the words and characters.'], ['hash-gen', 'Create a hash of the reversed text.']],
    io: ['Text', 'Text']
  }
};
