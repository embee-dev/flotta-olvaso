export default function SzamlaButton({
    onClick,
    text,
    className = '',
    htmlFor = '',
    tooltip = '',
    icon = '',
    }) {
    return (
        <label className={`flottaButton${className ? ' ' + className : ''}`} htmlFor={htmlFor} title={tooltip} onClick={onClick}>
            {icon && <img className="flottaIcon" src={icon} alt="tooltip" />}
            {text}
        </label>
    );
  }
  