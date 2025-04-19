/**
 * Text formatting utility for parsing markdown-style formatting in resume content
 */

/**
 * Formats text with markdown-style syntax into proper HTML
 * Handles **bold**, *italic*, and other formatting options
 */
export function formatText(text) {
  if (!text) return '';
  
  // Replace markdown-style bold text with HTML strong tags
  let formattedText = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  
  // Replace markdown-style italic text with HTML em tags
  formattedText = formattedText.replace(/\*(.*?)\*/g, '<em>$1</em>');
  
  // Replace markdown-style underline with HTML u tags (less common in markdown)
  formattedText = formattedText.replace(/__(.*?)__/g, '<u>$1</u>');
  
  // Convert line breaks to <br/> tags
  formattedText = formattedText.replace(/\n/g, '<br/>');
  
  return formattedText;
}

/**
 * React component to render formatted text
 */
export function FormattedText({ text, className }) {
  if (!text) return null;
  
  return (
    <div 
      className={className} 
      dangerouslySetInnerHTML={{ __html: formatText(text) }}
    />
  );
}