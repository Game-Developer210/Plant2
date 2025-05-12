import React from 'react';
import { QRCodeSVG } from 'qrcode.react';

function QRCodePage() {
  const cameraUrl = `https://myplantie.netlify.app/Camera`; 

  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
<h2>📸 Scan the barcode to open the camera</h2>
<p>Use your phone's camera to scan this barcode to take a photo of the plant directly</p>

<div style={{ marginTop: '30px' }}>
<QRCodeSVG value={cameraUrl} size={256} />
<p style={{ marginTop: '20px' }}>
Or open the link directly: <br />
          <a href={cameraUrl}>{cameraUrl}</a>
        </p>

      </div>
    </div>
  );
}

export default QRCodePage;
