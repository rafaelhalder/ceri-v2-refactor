export const titleCase = str => {
  if(str){
    return str.toLowerCase().split(' ').map(word => {
      if(word[0]){
        return word.replace(word[0], word[0].toUpperCase());
      }
      return '';
    }).join(' ');
  }
  return '';
}