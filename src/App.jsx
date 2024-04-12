import * as PDFJS from 'pdfjs-dist/build/pdf';
import * as pdfjsWorker from 'pdfjs-dist/build/pdf.worker';
window.PDFJS = PDFJS;
PDFJS.GlobalWorkerOptions.workerSrc = pdfjsWorker;

import { useImmer } from 'use-immer';
import SzamlaElement from './SzamlaElement.jsx';
import SzamlaManager from './SzamlaManager.jsx';
import SzamlaOsszesito from './SzamlaOsszesito.jsx';

import './App.css';

const szamlakSzama = localStorage.getItem('szamlakSzama') ?? 2;
const szamlakSzamaLimit = 5;

const szamlaInterFace = {
  sorszam: '',
  vegosszeg: 0,
  invalid: false
};
const szamlaElemek = Array.from({ length: szamlakSzama }, (v, i) => {
  return createBlankSzamla();
});
console.log(szamlaElemek);

function createBlankSzamla() {
  return { ...szamlaInterFace, id: self.crypto.randomUUID() };
}

function App() {
  const [szamlak, updateSzamlak] = useImmer(szamlaElemek);

  const regs = {
    sorszam: /Sorszám:\s+([0-9-]+)\s+/,
    vegosszeg: /Bruttó végösszeg:\s+([0-9- ]+)\s+/,
  };

  function storeSzamlakSzama(szamlakSzama) {
    localStorage.setItem('szamlakSzama', szamlakSzama);
  }

  function szamlaUpdater(operation = 'add', key = null) {
    if (operation === 'add') {
      updateSzamlak((draft) => {
        draft.push(createBlankSzamla());
        storeSzamlakSzama(draft.length);
      });
    } else if (operation === 'remove' && key) {
      updateSzamlak((draft) => {
        draft = draft.filter(a => a.id !== key);
        storeSzamlakSzama(draft.length);
        return draft;
      });
    }
  }

  function printFile(fileBlob, fileName, key) {
    (async function () {
      let doc, pageTexts = '';
      let sorszam, vegosszeg;

      try {
        doc = await PDFJS.getDocument(fileBlob).promise;  
      } catch (error) {
        console.error(error);
        return;
      }

      for (let i = 1; i <= doc.numPages; i++) {
        pageTexts += (await (await doc.getPage(i)).getTextContent()).items
          .map((i) => i.str)
          .join(' ');
      }
      sorszam = pageTexts.match(regs.sorszam)?.[1].replace('-', '');
      vegosszeg = Number(pageTexts.match(regs.vegosszeg)?.[1].replace(' ', ''));

      if (sorszam && vegosszeg) {
        updateSzamlak((draft) => {
          const szamla = draft.find((a) => a.id === key);
          szamla.invalid = false;
          szamla.vegosszeg = vegosszeg;
          szamla.sorszam = sorszam;
        });
      } else {
        alert(`Could not extract data from PDF file: "${fileName}"\nSelect another file!`);
        updateSzamlak((draft) => {
          const szamla = draft.find((a) => a.id === key);
          szamla.invalid = true;
          szamla.vegosszeg = szamlaInterFace.vegosszeg;
          szamla.sorszam = szamlaInterFace.sorszam;
        });
      }
    })();
  }

  return (
    <div className="flottaSzamla">
      
      <header className="flottaSzamlaHeader">
        <h1 className="flottaSzamlaTitle">Flotta Számla feldolgozó</h1>        
      </header>


    
      <main className="flottaSzamlaMain">

        {szamlak.map((szamla) => (
          
          <SzamlaElement
            onFileSelect={printFile}
            canBeRemoved={szamlak.length > 1 ? true : false}
            onRemove={key => szamlaUpdater('remove', key)}
            id={szamla.id}
            key={szamla.id}
            sorszam={szamla.sorszam}
            osszeg={szamla.vegosszeg}
            isInvalid={szamla.invalid}
            title={szamla.id}
          />
        ))}
                
        <SzamlaManager
          onCreate={() => szamlaUpdater('add')}
          szamlak={szamlak}
        />

        <SzamlaOsszesito szamlak={szamlak} />        
      </main>

    </div>
  );
}

export default App;
