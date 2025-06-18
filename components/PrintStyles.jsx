"use client"

export function PrintStyles() {
  return (
    <style jsx global>{`
      @media print {
        body * {
          visibility: hidden;
        }
        .certificate-container,
        .certificate-container * {
          visibility: visible;
        }
        .certificate-container {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        @page {
          size: landscape;
          margin: 0;
        }
      }
    `}</style>
  )
}
