const Container = ({ as: Tag = 'div', size = 'default', className = '', children, ...props }) => {
  const sizeClass =
    size === 'narrow' ? 'container--narrow' : size === 'wide' ? 'container--wide' : '';
  return (
    <Tag className={`container ${sizeClass} ${className}`.trim()} {...props}>
      {children}
    </Tag>
  );
};

export default Container;
