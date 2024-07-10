import React from "react";
import "./GiaReport.css";
import { Flex } from "antd";

const GiaReport = ({product}) => {
  const dottedSpace = {
    flexGrow: 1,
    borderBottom: "1px dotted black",
    margin: "7px 1px", // Adjust the margin as needed
  };
  let src = `/${product.shape}.jpg`
  
  return (
    <table className="gia" cellPadding="0" cellSpacing="0" border="0">
      <tbody>
        <tr>
          <td className="column">
            <div style={{ padding: "10px" }}>
              <img
                src="https://firebasestorage.googleapis.com/v0/b/idyllic-bloom-423215-e4.appspot.com/o/GIA.png?alt=media&token=c208c241-01e5-4b79-bcd1-d353e7f55bf5"
                alt="GIA banner"
              />
            </div>
            <div className="border-top pt-3">
              <h3 className="h5">GIA NATURAL DIAMOND GRADING REPORT</h3>
              <div className="" style={{ padding: "10px" }}>
                <p>
                  <strong>January 01, 2014</strong>
                </p>
                <Flex justify="space-between">
                  <p>GIA Report Number:</p>
                  <div style={dottedSpace}></div>
                  <strong>214438167</strong>
                </Flex>
                <Flex justify="space-between">
                  <p>Shape and Cutting Style:</p>
                  <div style={dottedSpace}></div>
                  <strong>Round Brilliant</strong>
                </Flex>
                <Flex justify="space-between">
                  <p>Measurements:</p>
                  <div style={dottedSpace}></div>
                  <strong>6.41 - 6.43 x 3.97 mm</strong>
                </Flex>
              </div>
            </div>
            <div className="border-top pt-3">
              <h3 className="h5">GRADING RESULTS</h3>
              <div className="" style={{ padding: "10px" }}>
                <Flex justify="space-between">
                  <p>Carat Weight:</p>
                  <div style={dottedSpace}></div>
                  <strong>{product.carat || product.caratWeight} carat</strong>
                </Flex>
                <Flex justify="space-between">
                  <p>Color Grade:</p>
                  <div style={dottedSpace}></div>
                  <strong>{product.color}</strong>
                </Flex>
                <Flex justify="space-between">
                  <p>Clarity Grade:</p>
                  <div style={dottedSpace}></div>
                  <strong>{product.clarity}</strong>
                </Flex>
                <Flex justify="space-between">
                  <p>Cut Grade:</p>
                  <div style={dottedSpace}></div>
                  <strong>{product.cut}</strong>
                </Flex>
              </div>
            </div>
            <div className="border-top pt-3">
              <h3 className="h5">ADDITIONAL GRADING INFORMATION</h3>
              <div className="" style={{ padding: "10px" }}>
                <Flex justify="space-between">
                  <p>Polish:</p>
                  <div style={dottedSpace}></div>
                  <strong>Excellent</strong>
                </Flex>
                <Flex justify="space-between">
                  <p>Symmetry:</p>
                  <div style={dottedSpace}></div>
                  <strong>Excellent</strong>
                </Flex>
                <Flex justify="space-between">
                  <p>Fluorescence:</p>
                  <div style={dottedSpace}></div>
                  <strong>None</strong>
                </Flex>
                <Flex justify="space-between">
                  <p>Inscription(s):</p>
                  <div style={dottedSpace}></div>
                  <strong>GIA 2141438167</strong>
                </Flex>
                {/* <Flex justify="space-between">
                  <p>Comments:</p>
                  <div style={dottedSpace}></div>
                  <strong>"SAMPLE"-"SAMPLE"-"SAMPLE"-"SAMPLE"</strong>
                </Flex> */}
              </div>
            </div>
          </td>
          <td className="column">
            <div className="text-center mb-2">
              <h2 className="h4">GIA REPORT</h2>
              <p className="font-weight-bold">214438167</p>
              <p>
                Verify this report at{" "}
                <a style={{ color: "#c5965d" }} href="https://www.gia.edu/">
                  GIA.edu
                </a>
              </p>
            </div>
            <div className="pt-3">
              <h3 className="h5">GRADING SCALES</h3>
              <div className="text-center">
                <h4 className="h6">GIA COLOR SCALE</h4>
                <p>D E F G H I J K L M N O P Q R S T U V W X Y Z</p>
              </div>
              <div className="text-center">
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
              <div className="text-center">
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
              <Flex justify="center" style={{marginTop:'4px'}}>
                <img
                  src={product.imgUrl || src}
                  alt="Clarity Characteristics"
                  className="scaled-image"
                />
              </Flex>
              <p>
                <strong>KEY TO SYMBOLS:</strong>
              </p>
              <ul className="list-inline">
                <li className="list-inline-item">Crystal</li>
                <li className="list-inline-item">Cloud</li>
                <li className="list-inline-item">Feather</li>
                <li className="list-inline-item">Natural</li>
              </ul>
            </div>
          </td>
          <td className="column">
            <div className="" style={{padding:'10px'}}>
              <div className="pt-3">
                <p>
                  The results documented in this report refer only to the
                  diamond described, and were obtained using the techniques and
                  equipment available to GIA at the time of examination. This
                  report is not a guarantee or valuation. For additional
                  information and important limitations and disclaimers, please
                  see gia.edu/terms.
                </p>
                <p>
                  For additional information, contact us at{" "}
                  <strong>800-421-7250</strong> or <strong>760-603-4500</strong>
                  .
                </p>
              </div>
              <div className="pt-3 text-right">
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/idyllic-bloom-423215-e4.appspot.com/o/GIA-seal.png?alt=media&token=ef7e7eb0-fcc0-4767-ac47-85ed041bee5f"
                  alt="GIA Seal"
                  style={{ maxWidth: "100px" }}
                />
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default GiaReport;
