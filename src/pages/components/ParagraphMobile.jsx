const ParagraphMobile = ({ children, theme='dark', justify='justify' }) => {
  const themeClass = theme === 'dark' ? 'text-paragraph-color' : 'text-paragraph-light-color';
  return <p className={`${themeClass} text-p-size text-${justify}`}>{children}</p>;
}

export default ParagraphMobile;