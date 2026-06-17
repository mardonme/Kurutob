/**
 * Consistent section heading: eyebrow + title + subtitle.
 * `title` and `subtitle` accept strings or nodes (use <em> for the gold accent).
 * align: 'center' | 'left'
 */
const SectionHeader = ({
  eyebrow,
  title,
  subtitle,
  align = 'center',
  as: TitleTag = 'h2',
  id,
  className = '',
  children,
}) => {
  return (
    <div className={`section-header ${align === 'center' ? 'section-header--center' : ''} ${className}`.trim()}>
      {eyebrow && (
        <span className={`eyebrow ${align === 'center' ? 'eyebrow--center' : ''}`.trim()}>
          {eyebrow}
        </span>
      )}
      <TitleTag id={id} className="section-header__title">
        {title}
      </TitleTag>
      {subtitle && <p className="section-header__subtitle">{subtitle}</p>}
      {children}
    </div>
  );
};

export default SectionHeader;
