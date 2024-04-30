import SzamlaButton from './SzamlaButton.jsx';
import copyIcon from '/icons/icon-copy.svg';
import checkmarkIcon from '/icons/icon-checkmark.svg';

export default function SzamlaOsszesito({ szamlak }) {
  let vegosszeg = szamlak.reduce((a, v) => {
    return a + v?.vegosszeg;
  }, 0);
  let osszegek = szamlak.map((i) => i.vegosszeg);
  let sorszamok = szamlak.map((i) => i.sorszam).sort();

  function copyText(itemToCopy) {
    const item = document.getElementById(itemToCopy);
    const textToCopy = item?.value;
    if (!textToCopy) return;
    (async () => {
      try {
        item.focus();
        item.select();
        await navigator.clipboard.writeText(textToCopy);
        console.info(`${textToCopy} copied!`);
      } catch (error) {
        console.error(error);
      }
    })();
  }

  return (
    <>
    {vegosszeg > 0 && (
      <section className="flottaSzamlaOsszesito">
        <div className="flottaSzamlaOsszesito-block">
          <label htmlFor="vegosszeg" className="flottaSzamlaOsszesito-label">Végösszeg</label>
          <input type="text" className="flottaSzamlaOsszesito-value" id="vegosszeg"
          onFocus={(e) => e.target.select() }
          title={osszegek
            .filter((i) => i > 0)
            .join(' + ')} readOnly value={vegosszeg} />
          <SzamlaButton className="flottaSzamlaOsszesito-copy" icon={copyIcon} feedbackIcon={checkmarkIcon} text="Másolás" tooltip="Végösszeg vágólapra másolása" onClick={() => copyText('vegosszeg')}></SzamlaButton>
        </div>
            
        <div className="flottaSzamlaOsszesito-block">
          <label htmlFor="sorszamok" className="flottaSzamlaOsszesito-label">Sorszámok</label>
          <input type="text" className="flottaSzamlaOsszesito-value" id="sorszamok"
          onFocus={(e) => e.target.select() }
            readOnly value={sorszamok
            .filter((i) => i.length > 0)
            .join(', ')} />
          <SzamlaButton className="flottaSzamlaOsszesito-copy" icon={copyIcon} feedbackIcon={checkmarkIcon} text="Másolás" tooltip="Sorszámok vágólapra másolása" onClick={() => copyText('sorszamok')}></SzamlaButton>
        </div>
      </section>
    )}
    </>
  );
}
