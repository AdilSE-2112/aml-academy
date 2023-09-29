import React from 'react';
import cl from './Charter.module.css';
import DefaultHeader from '../../../components/defaultHeader/DefaultHeader';
import Footer from '../../../components/footer/Footer';
import pdf from '../../../assets/images/pdf.svg'
import DownloadPDF from '../../../components/pdfSaver/DownloadPDF';



function Charter() {
    return (
        <div className={cl.charterWrapper}>
            <div className={cl.container}>
            <DefaultHeader />
                <h1 className={cl.headline}>Устав</h1>
                <DownloadPDF />
                <div className={cl.charterContent}>
                    <img src={pdf} alt="" />
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Charter;