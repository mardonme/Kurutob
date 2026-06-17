/**
 * Unified button primitive.
 * Renders a <button> by default, or any element via `as` (e.g. as="a").
 * variant: 'primary' | 'secondary' | 'ghost'
 * size: 'sm' | 'md' | 'lg'
 */
const Button = ({
  as: Tag = 'button',
  variant = 'primary',
  size = 'md',
  block = false,
  className = '',
  children,
  ...props
}) => {
  const classes = [
    'btn',
    `btn--${variant}`,
    size !== 'md' ? `btn--${size}` : '',
    block ? 'btn--block' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <Tag className={classes} {...props}>
      {children}
    </Tag>
  );
};

export default Button;
