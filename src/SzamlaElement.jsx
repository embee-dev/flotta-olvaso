import copyIcon from '/icons/icon-copy.svg';
import uploadIcon from '/icons/icon-upload.svg';

import { useState } from 'react';

export default function SzamlaElement({ id, title, isInvalid, onFileSelect }) {
  const [fileName, setFileName] = useState(null);
  const inputId = `file-${id}`;

  function handleFileSelect(e) {
    if (!e.target.files.length) {
      alert(`No file selected, please try again!`);
      return;
    }
    const uploadedFile = URL.createObjectURL(e.target?.files[0]);
    setFileName(e.target?.files[0]?.name);
    onFileSelect(uploadedFile, fileName, id);
  }

  return (
    <article className={`flottaSzamlaElement${isInvalid ? ' flottaSzamlaElement-invalid' : ''}`}>
      <header className="flottaSzamlaElement-header">Flotta Számla: {title}</header>
      <section className="flottaSzamlaElement-content">
        {isInvalid}
      <input
            id={inputId}
            className="flottaSzamlaElement-hidden"
            type="file"
            accept=".pdf"
            onChange={handleFileSelect}
          />
        <label className="flottaSzamlaElement-label flottaButton" htmlFor={inputId}>
          <img className="flottaIcon" src={uploadIcon} alt="Feltöltés" title="Feltöltés" />Számla PDF feltöltése
        </label>
        {fileName && <span className="flottaSzamlaElement-filename">{fileName}</span>}
      </section>
    </article>
  );
}
