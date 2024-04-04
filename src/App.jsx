// @TODO:
// - CSS formatting
// - Copy to Clipboard button next to labels
// - error handling

import * as PDFJS from 'pdfjs-dist/build/pdf';
import * as pdfjsWorker from 'pdfjs-dist/build/pdf.worker';
window.PDFJS = PDFJS;
PDFJS.GlobalWorkerOptions.workerSrc = pdfjsWorker;

import { useImmer } from 'use-immer';
import SzamlaElement from './SzamlaElement.jsx';
import SzamlaManager from './SzamlaManager.jsx';
import SzamlaOsszesito from './SzamlaOsszesito.jsx';

const szamlakSzama = 2;
const szamlaInterFace = {
  sorszam: '',
  vegosszeg: 0,
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

  function szamlaUpdater(operation = 'add') {
    if (operation === 'add') {
      updateSzamlak((draft) => {
        draft.push(createBlankSzamla());
      });
    } else if (operation === 'remove') {
      updateSzamlak((draft) => {
        draft.pop();
      });
    }
  }

  function printFile(fileName, key) {
    (async function () {
      let doc = await PDFJS.getDocument(fileName).promise;
      let pageTexts = '';
      let sorszam, vegosszeg;
      for (let i = 1; i <= doc.numPages; i++) {
        pageTexts += (await (await doc.getPage(i)).getTextContent()).items
          .map((i) => i.str)
          .join(' ');
      }
      sorszam = pageTexts.match(regs.sorszam)?.[1].replace('-', '');
      vegosszeg = Number(pageTexts.match(regs.vegosszeg)?.[1].replace(' ', ''));

      updateSzamlak((draft) => {
        const szamla = draft.find((a) => a.id === key);
        szamla.vegosszeg = vegosszeg;
        szamla.sorszam = sorszam;
      });
    })();
  }

  return (
    <>
      <SzamlaManager
        onCreate={() => szamlaUpdater('add')}
        onRemove={(key) => szamlaUpdater('remove')}
        szamlak={szamlak}
      />

      {szamlak.map((szamla) => (
        <SzamlaElement
          onFileSelect={printFile}
          id={szamla.id}
          key={szamla.id}
          title={szamla.id}
        />
      ))}

      <SzamlaOsszesito szamlak={szamlak} />
    </>
  );
}

export default App;
