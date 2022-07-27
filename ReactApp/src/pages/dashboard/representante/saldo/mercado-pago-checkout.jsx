import React, { useEffect } from "react";

export default ({ token, preference, onClose = () => { }, onSubmit = () => { } }) => {
  useEffect(() => {
    const messageHandler = (event) => {
      if (event.origin === 'https://www.mercadopago.com.ar') {
        if (event.data?.type === 'close') {
          onClose();
        }
        else if (event.data?.type === 'submit') {
          onSubmit();
        }
      }
    }

    window.addEventListener('message', messageHandler)
    return () => window.removeEventListener('message', messageHandler)
  });

  const mp = new window.MercadoPago(token, { locale: 'es-AR' });

  mp.checkout({
    preference: {
      id: preference
    },
    autoOpen: true
  });

  return (<></>);
};