import React, { useEffect, useRef, useState } from "react";
import "./WarrantyCertificate.scss";
import { apiHeader } from "../urlApiHeader";
import { getToken } from "./../getToken";
import formatDate from "./../formatDate";
import { Button } from "antd";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const WarrantyCertificate = ({ order, product }) => {
  const [customer, setCustomer] = useState();
  useEffect(() => {
    let user = getToken();
    if (user) {
      fetch(`${apiHeader}/Customer/customer/${user.UserID}/profile`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
        .then((res) => res.json())
        .then((res) => {
          setCustomer(res.customerinfo);
          console.log(res.customerinfo);
        })
        .catch((e) => {
          alertFail("Fail to fetch user profile");
        });
    }
  }, []);
  function addTwoYearsToDate(dateString) {
    const [day, month, year] = dateString.split("-");

    const newYear = (parseInt(year) + 2).toString();
    const newDateString = `${day}-${month}-${newYear}`;

    return newDateString;
  }

  const printRef = useRef();

  const handleDownloadPdf = async () => {
    const element = printRef.current;
    const canvas = await html2canvas(element, { scale: 2 }); // Increase scale for better quality
    const data = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(data, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("Warranty.pdf");
  };

  return (
    <>
      {customer && (
        <div className="warranty-certificate" ref={printRef}>
          <h1 className="warranty-certificate__title">Warranty Certificate</h1>
          <div className="warranty-certificate__content">
            <p className="warranty-certificate__item">
              <span className="warranty-certificate__label">Customer name:</span>
              <span className="warranty-certificate__value">{`${customer.cusFirstName} ${customer.cusLastName}`}</span>
            </p>
            <p className="warranty-certificate__item">
              <span className="warranty-certificate__label">Date of purchase:</span>
              <span className="warranty-certificate__value">
                {order && formatDate(order.orderDate)}
              </span>
            </p>
            <p className="warranty-certificate__item">
              <span className="warranty-certificate__label">Service:</span>
              <span className="warranty-certificate__value">
                Purchase Jewelry
              </span>
            </p>
            <p className="warranty-certificate__item">
              <span className="warranty-certificate__label">ID number:</span>
              <span className="warranty-certificate__value">
                {product && product.productId}
              </span>
            </p>
            <p className="warranty-certificate__item">
              <span className="warranty-certificate__label">Warranty Period:</span>
              <span className="warranty-certificate__value">
                from {order && formatDate(order.orderDate)} to{" "}
                {order && addTwoYearsToDate(formatDate(order.orderDate))}
              </span>
            </p>
          </div>
          <div className="warranty-certificate__footer">
            <div className="warranty-certificate__signature">
              <p>Huynh Minh Long</p>
              <p>Store owner's representative</p>
            </div>
            <div className="warranty-certificate__company">
              <p>Cosmos Diamond</p>
              <p>Phone number: 0394388333</p>
            </div>
          </div>
          <p className="warranty-certificate__note">
            The warranty is valid only in the presence of this certificate, as
            well as: original purchase document (receipt, invoice), correctly
            and completely filled out warranty card.
          </p>
        </div>
      )}
      <Button style={{marginTop:'40px'}} onClick={handleDownloadPdf}>Download Warranty Card</Button>
    </>
  );
};

export default WarrantyCertificate;
