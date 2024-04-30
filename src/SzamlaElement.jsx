import uploadIcon from '/icons/icon-upload.svg';
import SzamlaButton from './SzamlaButton.jsx';

import { useState } from 'react';

export default function SzamlaElement({ id, title, sorszam, osszeg, isInvalid, onFileSelect, canBeRemoved, onRemove }) {
  const [fileName, setFileName] = useState(null);
  const inputId = `file-${id}`;

  function handleFileSelect(e) {
    if (!e.target.files.length) {
      return;
    }
    if (e.target.files[0].type.indexOf('pdf') === -1) {
      alert('Ez a fájl nem PDF formátumú.\nVálassz másik fájlt!');
      return;
    }
    const uploadedFile = URL.createObjectURL(e.target.files[0]);
    setFileName(e.target?.files[0].name);
    onFileSelect(uploadedFile, e.target?.files[0].name, id);
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

          <SzamlaButton 
            className="flottaSzamlaElement-label"
            htmlFor={inputId}
            icon={uploadIcon}
            title="Feltöltés"
            text="Számla PDF feltöltése"></SzamlaButton>
        </div>
      </fieldset>
    </section>
  );
}
