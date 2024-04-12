import copyIcon from '/icons/icon-copy.svg';
import uploadIcon from '/icons/icon-upload.svg';

import { useState } from 'react';

export default function SzamlaElement({ id, title, sorszam, osszeg, isInvalid, onFileSelect, canBeRemoved, onRemove }) {
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

  function onMinus() {
    onRemove(id);
  }

  return (
    <section className={`flottaSzamlaElement${isInvalid ? ' flottaSzamlaElement-invalid' : ''}${(fileName && !isInvalid) ? ' flottaSzamlaElement-valid' : ''}`}>
      <fieldset className="flottaSzamlaElement-content">
        {canBeRemoved && <label className="flottaButton-fieldset" onClick={onMinus}>-</label>}
        <legend title={title}>Flotta Számla</legend>
        <div className="flottaSzamlaElement-text">
          {fileName && <div className="flottaSzamlaElement-filename">{fileName}</div>}
          {(sorszam && osszeg) && <div className="flottaSzamlaElement-summary">Sorszám: {sorszam}, Összeg: {osszeg}</div>}
        </div>
        <div className="flottaSzamlaElement-buttons">
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
        </div>
      </fieldset>
    </section>
  );
}
