import { useState, useEffect } from 'react';
import { getWedstrijden, createWedstrijd, updateWedstrijd, deleteWedstrijd } from './api';

function App() {
  const [wedstrijden, setWedstrijden] = useState([]);
  const [naam, setNaam] = useState('');
  const [datum, setDatum] = useState('');
  const [afstand, setAfstand] = useState('');
  const [tijd, setTijd] = useState('');
  const [categorie, setCategorie] = useState('weg');
  const [isPr, setIsPr] = useState(false);
  const [bewerkId, setBewerkId] = useState(null);
  const [zoekTerm, setZoekTerm] = useState('');
  const [error, setError] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [idOmTeVerwijderen, setIdOmTeVerwijderen] = useState(null);

  const fetchWedstrijden = async () => {
    try {
      const data = await getWedstrijden();
      setWedstrijden(data);
    } catch (err) {
      console.error("Fout bij ophalen:", err);
      setError('Kan wedstrijden niet ophalen. Is de server actief?');
    }
  };

  useEffect(() => { fetchWedstrijden(); }, []);

  const resetForm = () => {
    setNaam(''); 
    setDatum(''); 
    setAfstand(''); 
    setTijd(''); 
    setCategorie('weg'); 
    setIsPr(false); 
    setBewerkId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    
    const body = { naam, datum, afstand_km: afstand, tijd, categorie, is_pr: isPr };
    
    try {
      if (bewerkId) {
        await updateWedstrijd(bewerkId, body);
      } else {
        await createWedstrijd(body);
      }
      resetForm();
      fetchWedstrijden();
    } catch (err) {
      console.error("Verzendfout:", err);
      setError(err.message);
    }
  };

  const openDeleteModal = (id) => {
    setIdOmTeVerwijderen(id);
    setShowDeleteModal(true);
  };

  const bevestigVerwijderen = async () => {
    try {
      await deleteWedstrijd(idOmTeVerwijderen);
      setShowDeleteModal(false);
      setIdOmTeVerwijderen(null);
      fetchWedstrijden();
    } catch (err) {
      console.error("Verwijderfout:", err);
      setError(err.message);
    }
  };

  const getCategorieIcoon = (cat) => {
    switch(cat) {
      case 'baan': return { icoon: '🏟️', label: 'Baan' };
      case 'trail': return { icoon: '🏔️🌲', label: 'Trail' };
      default: return { icoon: '🛣️', label: 'Weg' };
    }
  };

  const startBewerken = (w) => {
    setBewerkId(w.id);
    setNaam(w.naam);
    setDatum(w.datum.split('T')[0]);
    setAfstand(w.afstand_km);
    setTijd(w.tijd || '');
    setCategorie(w.categorie || 'weg');
    setIsPr(w.is_pr || false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const vandaag = new Date();
  vandaag.setHours(0,0,0,0);

  const gefilterdeWedstrijden = wedstrijden.filter(w => 
    w.naam.toLowerCase().includes(zoekTerm.toLowerCase())
  );

  const prLijst = gefilterdeWedstrijden.filter(w => w.is_pr).sort((a, b) => a.afstand_km - b.afstand_km);

  const btnSmallStyle = { padding: '4px 8px', fontSize: '12px', cursor: 'pointer', borderRadius: '4px', border: '1px solid #ccc', backgroundColor: '#007bff', color: 'white' };
  const badgeStyle = { padding: '3px 8px', borderRadius: '12px', fontSize: '11px', color: 'white', fontWeight: 'bold' };

  const renderLijst = (titel, lijst, isToekomst) => (
    <div style={{ flex: 1, minWidth: '300px' }}>
      <h2 style={{ borderBottom: '2px solid #eee', paddingBottom: '10px' }}>
        {titel} ({lijst.length})
      </h2>
      
      {lijst.length === 0 ? (
        <p style={{color: '#999'}}>Geen wedstrijden gevonden...</p>
      ) : (
        lijst.map(w => {
          const { icoon, label } = getCategorieIcoon(w.categorie);
          const wDatum = new Date(w.datum);
          const dagenNog = Math.ceil((wDatum - vandaag) / (1000 * 60 * 60 * 24));

          return (
            <div 
              key={w.id} 
              data-testid={`wedstrijd-item-${w.id}`}
              style={{ 
                padding: '12px', marginBottom: '10px', borderRadius: '8px',
                backgroundColor: isToekomst ? '#e3f2fd' : '#f5f5f5',
                borderLeft: `5px solid ${isToekomst ? '#2196f3' : '#9e9e9e'}`
              }}
            >
              <div style={{ marginBottom: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <span>
                    <span title={label} style={{marginRight: '5px'}}>{icoon}</span> 
                    {w.is_pr && <span title="Persoonlijk Record" style={{marginRight:'5px'}}>🏆</span>}
                    <strong data-testid={`naam-${w.id}`}>{w.naam}</strong>
                  </span>
                  {isToekomst && <span style={{...badgeStyle, backgroundColor: dagenNog === 0 ? '#ff4d4d' : '#2196f3'}}>{dagenNog === 0 ? "VANDAAG" : `${dagenNog}d`}</span>}
                </div>
                <small>🏁 {w.afstand_km} km | 📅 {new Date(w.datum).toLocaleDateString('nl-NL')} {w.tijd && `| ⏱️ ${w.tijd}`}</small>
              </div>
              <div style={{ display: 'flex', gap: '5px' }}>
                <button 
                  onClick={() => startBewerken(w)} 
                  style={btnSmallStyle}
                  data-testid={`bewerk-btn-${w.id}`}
                >
                  Bewerk
                </button>
                <button 
                  onClick={() => openDeleteModal(w.id)} 
                  style={{...btnSmallStyle, backgroundColor:'#dc3545', color:'white', border:'none'}}
                  data-testid={`verwijder-btn-${w.id}`}
                >
                  Verwijder
                </button>
              </div>
            </div>
          );
        })
      )}
    </div>
  );

  return (
    <div style={{ padding: '20px', fontFamily: 'Segoe UI, sans-serif', maxWidth: '1100px', margin: '0 auto', color: '#333' }}>
      <h1 style={{ textAlign: 'center', color: '#2c3e50' }}>🏃 Mijn Hardloopkalender</h1>
      
      {showDeleteModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }} data-testid="delete-modal">
          <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '12px', maxWidth: '400px', textAlign: 'center', boxShadow: '0 4px 15px rgba(0,0,0,0.2)' }}>
            <h3>⚠️ Weet je het zeker?</h3>
            <p>Je staat op het punt deze wedstrijd definitief te verwijderen.</p>
            <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
              <button onClick={bevestigVerwijderen} data-testid="bevestig-verwijder-btn" style={{ flex: 1, padding: '10px', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', backgroundColor: '#dc3545', color: 'white' }}>Ja, ik weet het zeker</button>
              <button onClick={() => setShowDeleteModal(false)} data-testid="annuleer-verwijder-btn" style={{ flex: 1, padding: '10px', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', backgroundColor: '#6c757d', color: 'white' }}>Annuleren</button>
            </div>
          </div>
        </div>
      )}

      <div style={{ display: 'flex', gap: '30px', marginBottom: '20px', flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: '350px' }}>
          {error && <p data-testid="error-message" style={{ color: '#dc3545', fontWeight: 'bold', backgroundColor: '#f8d7da', padding: '10px', borderRadius: '6px' }}>⚠️ {error}</p>}
          <form onSubmit={handleSubmit} data-testid="wedstrijd-form" style={{ padding: '20px', backgroundColor: bewerkId ? '#fff9db' : '#f8f9fa', borderRadius: '12px', border: bewerkId ? '2px solid #fcc419' : '1px solid #dee2e6' }}>
            <h3 style={{ marginTop: 0 }}>{bewerkId ? '✏️ Bewerken' : '➕ Toevoegen'}</h3>
            <input type="text" placeholder="Naam" value={naam} onChange={e => setNaam(e.target.value)} required style={{ width: '100%', padding: '8px', marginBottom: '10px', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' }} data-testid="input-naam" />
            <input type="date" value={datum} onChange={e => setDatum(e.target.value)} required style={{ width: '100%', padding: '8px', marginBottom: '10px', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' }} data-testid="input-datum" />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <input type="number" step="0.1" placeholder="km" value={afstand} onChange={e => setAfstand(e.target.value)} required style={{ width: '100%', padding: '8px', marginBottom: '10px', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' }} data-testid="input-afstand" />
              <input type="text" placeholder="Tijd (00:00:00)" value={tijd} onChange={e => setTijd(e.target.value)} style={{ width: '100%', padding: '8px', marginBottom: '10px', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' }} data-testid="input-tijd" />
            </div>
            <select value={categorie} onChange={e => setCategorie(e.target.value)} style={{ width: '100%', padding: '8px', marginBottom: '10px', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' }} data-testid="select-categorie">
              <option value="weg">Weg 🛣️</option>
              <option value="baan">Baan 🏟️</option>
              <option value="trail">Trail 🏔️🌲</option>
            </select>
            <label style={{ display: 'flex', alignItems: 'center', marginBottom: '20px', cursor: 'pointer' }}>
              <input type="checkbox" checked={isPr} onChange={e => setIsPr(e.target.checked)} style={{ marginRight: '10px' }} data-testid="checkbox-pr" />
              Dit is een PR! 🏆
            </label>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button type="submit" data-testid="submit-btn" style={{ flex: 2, padding: '10px', backgroundColor: bewerkId ? '#fcc419' : '#28a745', color: bewerkId ? 'black' : 'white', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>{bewerkId ? 'Opslaan' : 'Toevoegen'}</button>
              {bewerkId && <button type="button" onClick={resetForm} data-testid="cancel-edit-btn" style={{ flex: 1, padding: '10px', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>Annuleren</button>}
            </div>
          </form>
        </div>

        <div style={{ flex: 1, minWidth: '350px', backgroundColor: '#fff', padding: '20px', borderRadius: '12px', border: '1px solid #ffd700' }}>
          <h3 style={{ marginTop: 0, color: '#b8860b' }}>🏆 Mijn Records (PR's)</h3>
          <div data-testid="pr-lijst" style={{ maxHeight: '320px', overflowY: 'auto' }}>
            {prLijst.length === 0 ? <p>Geen records gevonden.</p> : prLijst.map(pr => (
              <div key={pr.id} style={{ borderBottom: '1px solid #eee', padding: '10px 0', fontSize: '0.9em' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}><strong>{pr.naam}</strong><span style={{ fontWeight: 'bold', color: '#28a745' }}>{pr.tijd}</span></div>
                <div style={{ color: '#666', fontSize: '0.85em' }}>{pr.afstand_km} km — {new Date(pr.datum).toLocaleDateString('nl-NL')}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ marginBottom: '30px' }}>
        <input 
          type="text" 
          placeholder="🔍 Zoek op wedstrijdnaam..." 
          value={zoekTerm}
          onChange={(e) => setZoekTerm(e.target.value)}
          data-testid="zoekbalk"
          style={{ width: '100%', padding: '12px', fontSize: '1em', borderRadius: '25px', border: '2px solid #eee', boxSizing: 'border-box', marginBottom: '20px' }}
        />
      </div>

      <div style={{ display: 'flex', gap: '30px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
        {renderLijst("🗓️ Planning", gefilterdeWedstrijden.filter(w => new Date(w.datum) >= vandaag).sort((a,b)=>new Date(a.datum)-new Date(b.datum)), true)}
        {renderLijst("✅ Historie", gefilterdeWedstrijden.filter(w => new Date(w.datum) < vandaag).sort((a,b)=>new Date(b.datum)-new Date(a.datum)), false)}
      </div>
    </div>
  );
}

const inputStyle = { width: '100%', padding: '8px', marginBottom: '10px', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' };
const btnSmallStyle = { padding: '4px 8px', cursor: 'pointer', borderRadius: '4px', border: '1px solid #ccc', fontSize: '0.8em' };
const btnStyle = { flex: 1, padding: '10px', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' };
const badgeStyle = { color: 'white', padding: '2px 6px', borderRadius: '10px', fontSize: '0.7em', fontWeight: 'bold' };
const modalOverlayStyle = { position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 };
const modalStyle = { backgroundColor: 'white', padding: '30px', borderRadius: '12px', maxWidth: '400px', textAlign: 'center', boxShadow: '0 4px 15px rgba(0,0,0,0.2)' };

export default App;
