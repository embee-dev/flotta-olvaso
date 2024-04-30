import { useState } from 'react';

export default function SzamlaButton({
    onClick = '',
    text,
    className = '',
    htmlFor = '',
    tooltip = '',
    icon = '',
    feedbackIcon = ''
    }) {

    const feedbackDelay = 600;
    const [showFeedback, setShowFeedback] = useState(false);

    function handleClick() {
        if (feedbackIcon) {
            setShowFeedback(true);
            setTimeout(() => { setShowFeedback(false); }, feedbackDelay);
        }
        if (onClick) onClick();
    }

    return (
        <label className={`flottaButton${className ? ' ' + className : ''}${(feedbackIcon && showFeedback) ? ' flottaButton-feedback' : ''}`} htmlFor={htmlFor} title={tooltip} onClick={() => { handleClick(); }}>
            {icon && <img className="flottaIcon" src={(feedbackIcon && showFeedback) ? feedbackIcon : icon} alt="tooltip" />}
            {text}
        </label>
    );
  }
  