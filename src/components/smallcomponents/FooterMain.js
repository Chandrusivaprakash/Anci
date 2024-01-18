import React from 'react';
import { MDBFooter, MDBContainer, MDBRow, MDBCol, MDBIcon } from 'mdb-react-ui-kit';

 function FooterMain() {
  return (
	
	  <MDBFooter className='text-center text-white' style={{ backgroundColor: '#0a4275' }}>
      <section className='d-flex justify-content-center justify-content-lg-between p-4 border-bottom'>
        <div className='me-5 d-none d-lg-block'>
        <span>Get connected with us on social networks:</span>
        </div>
		<div>
		<a href="#"><i class="fab fa-github"><button><ion-icon name="logo-github"></ion-icon></button></i></a>
  	 	<a href="#"><i class="fab fa-facebook-f"><button><ion-icon name="logo-facebook"></ion-icon></button></i></a>
  	 	<a href="#"><i class="fab fa-twitter"><button><ion-icon name="logo-twitter"></ion-icon></button></i></a>
  	 	<a href="#"><i class="fab fa-linkedin-in"><button><ion-icon name="logo-linkedin"></ion-icon></button></i></a>
  	 			
        </div>
      </section>

      <section className=''>
        <MDBContainer className='text-center text-md-start mt-5'>
          <MDBRow className='mt-3'>
            <MDBCol md='3' lg='4' xl='3' className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>
                <MDBIcon color='secondary' icon='gem' className='me-3' />
                ASPR
              </h6>
              <p>
			  Vehicle colors and specifications may vary by market.
Contact your local dealer for more information.
 </p>
            </MDBCol>

            <MDBCol md='2' lg='2' xl='2' className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Overview</h6>
              <p><a href='#!' className='text-reset'>about us</a> </p>
              <p><a href='#!' className='text-reset'> our services</a></p>
              <p><a href='#!' className='text-reset'>privacy policy </a></p>
              <p><a href='#!' className='text-reset'>affiliate program</a></p>
            </MDBCol>

            <MDBCol md='3' lg='2' xl='2' className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Useful Links</h6>
              <p><a href='#!' className='text-reset'>Shipping</a></p>
              <p><a href='#!' className='text-reset'>Returns</a></p>
              <p><a href='#!' className='text-reset'>Order status</a></p>
              <p><a href='#!' className='text-reset'>payment options</a></p>
            </MDBCol>

            <MDBCol md='4' lg='3' xl='3' className='mx-auto mb-md-0 mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Contact</h6>
              <p>
                <MDBIcon color='secondary' className='me-2'/><ion-icon name="home-outline"></ion-icon>
                 INDIA,Chennai,Porur, No :12
              </p>
              <p>
                <MDBIcon color='secondary' className='me-3' /><ion-icon name="mail-outline"></ion-icon>
                aspr@example.com
              </p>
              <p>
                <MDBIcon color='secondary' className='me-3' /><ion-icon name="call-outline"></ion-icon> + 01 234 567 88
              </p>
              <p>
                <MDBIcon color='secondary' className='me-3' /><ion-icon name="print-outline"></ion-icon> + 01 234 567 89
              </p>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>

      <div className='text-center p-4' style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
        © 2021 Copyright:
        <a className='text-reset fw-bold' href='#'>
          ASPR.in
        </a>
      </div>
    </MDBFooter>
  );
}

export default FooterMain