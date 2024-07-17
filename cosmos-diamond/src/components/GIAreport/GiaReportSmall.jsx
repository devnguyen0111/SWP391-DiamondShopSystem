import React, { useEffect, useRef } from "react";
import "./GiaReportSmall.scss";
import { Button } from "antd";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const GiaReportSmall = ({ product }) => {
  const printRef = useRef();

  const handleDownloadPdf = async () => {
    const element = printRef.current;
    const canvas = await html2canvas(element, { scale: 2 }); // Increase scale for better quality
    const data = canvas.toDataURL("image/png");

    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(data, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("GIA-Certificate.pdf");
  };

  return (
    <>
      <table
        ref={printRef}
        className="gia-small"
        cellPadding="0"
        cellSpacing="0"
        border="0"
      >
        <tbody>
          <tr>
            <td className="column">
              <div style={{ padding: "10px" }}>
                <img
                  src="/GIA.png"
                  alt="GIA banner"
                />
              </div>
              <div className="border-top pt-3">
                <h3 className="h5">GIA NATURAL DIAMOND GRADING REPORT</h3>
                <div
                  className=""
                  style={{ padding: "10px", fontSize: "0.61em" }}
                >
                  <p>
                    <strong>January 01, 2014</strong>
                  </p>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <p>GIA Report Number:</p>
                    <strong>214438167</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <p>Shape and Cutting:</p>
                    <strong>Round Brilliant</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <p>Measurements:</p>
                    <strong>6.41-6.43x3.97 mm</strong>
                  </div>
                </div>
              </div>
              <div className="border-top pt-3">
                <h3 className="h5">GRADING RESULTS</h3>
                <div
                  className=""
                  style={{ padding: "10px", fontSize: "0.61em" }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <p>Carat Weight:</p>
                    <strong>
                      {product.carat || product.caratWeight} carat
                    </strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <p>Color Grade:</p>
                    <strong>{product.color}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <p>Clarity Grade:</p>
                    <strong>{product.clarity}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <p>Cut Grade:</p>
                    <strong>{product.cut}</strong>
                  </div>
                </div>
              </div>
              <div className="border-top pt-3">
                <h3 className="h5">ADDITIONAL GRADING INFORMATION</h3>
                <div
                  className=""
                  style={{ padding: "10px", fontSize: "0.61em" }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <p>Polish:</p>
                    <strong>Excellent</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <p>Symmetry:</p>
                    <strong>Excellent</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <p>Fluorescence:</p>
                    <strong>None</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <p>Inscription(s):</p>
                    <strong>GIA 2141438167</strong>
                  </div>
                </div>
              </div>
            </td>
            <td className="column">
              <div className="text-center mb-2">
                <h2 className="h4">GIA REPORT</h2>
                <p className="font-weight-bold" style={{ fontSize: "0.8em" }}>
                  214438167
                </p>
                <p style={{ fontSize: "0.8em" }}>
                  Verify this report at{" "}
                  <a style={{ color: "#c5965d" }} href="https://www.gia.edu/">
                    GIA.edu
                  </a>
                </p>
              </div>
              <div className="pt-3">
                <h3 className="h5">GRADING SCALES</h3>
                <div className="text-center" style={{ fontSize: "0.6em" }}>
                  <h4 className="h6">GIA COLOR SCALE</h4>
                  <p>D E F G H I J K L M N O P Q R S T U V W X Y Z</p>
                </div>
                <div className="text-center" style={{ fontSize: "0.6em" }}>
                  <h4 className="h6">GIA CLARITY SCALE</h4>
                  <p>
                    FLAWLESS
                    <br />
                    INTERNALLY FLAWLESS
                    <br />
                    VVS<sub>1</sub> VVS<sub>2</sub>
                    <br />
                    VS<sub>1</sub> VS<sub>2</sub>
                    <br />
                    SI<sub>1</sub> SI<sub>2</sub>
                    <br />I<sub>1</sub> I<sub>2</sub> I<sub>3</sub>
                  </p>
                </div>
                <div className="text-center" style={{ fontSize: "0.6em" }}>
                  <h4 className="h6">GIA CUT SCALE</h4>
                  <p>
                    EXCELLENT
                    <br />
                    VERY GOOD
                    <br />
                    GOOD
                    <br />
                    FAIR
                    <br />
                    POOR
                  </p>
                </div>
              </div>
              <div className="border-top pt-3 text-center">
                <h3 className="h5">CLARITY CHARACTERISTICS</h3>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <img
                    style={{padding:'20px', borderRadius:'10px'}}
                    src={`/${product.shape}.jpg`}
                    alt="Clarity Characteristics"
                    className="scaled-image"
                  />
                </div>
                <p>
                  <strong style={{ fontSize: "0.6em" }}>KEY TO SYMBOLS:</strong>
                </p>
                <ul style={{ fontSize: "0.62em" }} className="list-inline">
                  <li className="list-inline-item">Crystal</li>
                  <li className="list-inline-item">Cloud</li>
                  <li className="list-inline-item">Feather</li>
                  <li className="list-inline-item">Natural</li>
                </ul>
              </div>
            </td>
            <td className="column">
              <div className="" style={{ padding: "10px" }}>
                <div className="pt-3" style={{ fontSize: "0.8em" }}>
                  <p>
                    The results documented in this report refer only to the
                    diamond described, and were obtained using the techniques
                    and equipment available to GIA at the time of examination.
                    This report is not a guarantee or valuation. For additional
                    information and important limitations and disclaimers,
                    please see gia.edu/terms.
                  </p>
                  <p>
                    For additional information, contact us at{" "}
                    <strong>800-421-7250</strong> or{" "}
                    <strong>760-603-4500</strong>.
                  </p>
                </div>
                <div className="pt-3 text-right">
                  <img
                    src="/GIA-seal.png"
                    alt="GIA Seal"
                    style={{ maxWidth: "100px" }}
                  />
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <Button style={{marginTop:'40px'}} onClick={handleDownloadPdf}>Download PDF</Button>
    </>
  );
};

export default GiaReportSmall;
