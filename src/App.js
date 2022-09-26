import React from 'react';
import { useState } from 'react';

const URL = 'https://api.exchangerate.host/latest'

function App() {
  const [eur, setEur] = useState(0);
  const [gbp, setGbp] = useState(0);
  const [rate, setRate] = useState(0);

  async function convert(e) {
    e.preventDefault();
    try {
      const address = URL;
      const response = await fetch(address);
  
      if (response.ok) {
        const json = await response.json();
        console.log(json.rates.GBP);
        setRate(json.rates.GBP);
  
        setGbp(eur * json.rates.GBP);
      } else {
        alert('Error retrieving excange rate.');
        console.log(response);
      }
    } catch (err) {
      alert(err);
    }
  }

  return (
    <div id="container">
      <form style={{margin: 20}}onSubmit={convert}>
        <div>
          <label style={{margin: 10}}>Eur</label>&nbsp;
          <input type="number" step="0.01" value={eur} onChange={e => setEur(e.target.value)}/>
          <output style={{margin: 10}}>{rate}</output>
        </div>
        <div>
          <label style={{margin:10}}>Gbp</label>
          <output>{gbp.toFixed(2)} €</output>
        </div>
        <div>
          <button style={{margin:10}}>Calculate</button>
        </div>
      </form>
    </div>
  );
}

export default App;
