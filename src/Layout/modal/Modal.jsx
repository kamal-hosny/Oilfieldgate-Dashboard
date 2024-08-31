import React from 'react';
import { Helmet } from 'react-helmet-async';

const Modal = ({isOpen , children , closeModalHandler}) => {


    return (
        <>
         <Helmet>
        <style type="text/css">{`

        ${
            isOpen &&  `
            body {
                overflow: hidden;
            } 
            `
        }

        `}</style>
      </Helmet>
            <div 
                onClick={closeModalHandler}
                style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
                className={`fixed h-full w-full z-[5] ${isOpen ? 'modal-show' : 'modal-hide'}`}>
            </div>
            {children}
        </>
    );
}

export default Modal;
