import React from 'react';
import { Link } from 'react-router-dom';
//import { useNavigate } from 'react-router-dom';

function Home() {
  //const navigate = useNavigate();
  return (
    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '90vh'}}>
    <div className="container">
<h1>🌿 My Plant</h1>
<p className='description'>A smart platform for identifying plants through images</p>
<div style={{display: 'flex', gap: '1rem'}}>
<Link to="/identify">
<button>🌱Start identifying your plant</button>
</Link>
<Link to="/library">
<button>📚 Browse the plant library</button>
</Link>
<Link to="/qr">
<button>🔍 Scan the QR code</button>
</Link>
</div>
</div>
    </div>
  );
}

export default Home;

