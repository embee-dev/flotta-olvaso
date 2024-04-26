import SzamlaButton from './SzamlaButton.jsx';

export default function SzamlaManager({ szamlak, onCreate, szamlakSzamaLimit }) {
  function onPlus() {
    onCreate();
  }

  return (
    <>
      {szamlak.length < szamlakSzamaLimit && 
        <section className="flottaSzamlaManager">
          <SzamlaButton className="flottaSzamlaManager-add" text="+ Új számla hozzáadása" onClick={onPlus}></SzamlaButton>
        </section>
      }
    </>
  );
}
