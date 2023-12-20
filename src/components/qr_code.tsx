import React, { useRef } from 'react'
import QRCode from 'react-qr-code';
import styles from '../app/QRCodeWithIcon.module.css';
import * as htmlToImage from 'html-to-image';
import download from 'downloadjs';

type Props = {
  data: any;
}

const QRCodeComponent = ({ data }: Props) => {
  const qrCodeRef = useRef<HTMLDivElement>(null);

  const downloadQRCode = () => {
    if (qrCodeRef.current) {
      htmlToImage
        .toPng(qrCodeRef.current)
        .then((dataUrl) => {
          download(dataUrl, 'qrcode.png');
        })
        .catch((error) => {
          console.error('Error generating QR code image:', error);
        });
    }
  };

  return (
    <div>
      <div ref={qrCodeRef} className={styles.qrCodeContainer}>
        <QRCode value={data} className={styles.qrCode} />
      </div>
      <button onClick={downloadQRCode}>Download QR Code</button>
    </div>
  );
}


export default QRCodeComponent