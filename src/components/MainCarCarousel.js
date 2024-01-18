import Carousel from 'react-bootstrap/Carousel';
import Card from 'react-bootstrap/Card'
import CarouselCards from 'react-elastic-carousel'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import FooterMain from './smallcomponents/FooterMain';
import { useEffect } from 'react';
import {projectAuth} from '../firebase/config'


function MainCarCarousel(props) {



    const images = [
        {url : "https://s3-ap-southeast-1.amazonaws.com/assetsin.izmocars.com/b_images/suvbanner-16393-11937.jpg"},
        {url : "https://hondacarsdealer.com/wp-content/uploads/2023/01/Honda-City-Banner-1.jpg"},
        {url : "https://kunkiamotors.com/images/carens.jpg"},
        {url : "https://www.lexusindia.co.in/content/dam/lexus-v3-india/lexus-life/LOS-masthead-1920x780.jpg"},
        {url : "https://www.bmw-varshaautohaus.in/sites/default/files/sliders/M8_1680x756%20%281%29.jpg"},
        {url : "https://www.jeep-india.com/content/dam/cross-regional/apac/jeep/en_in/new-grand-cherokee/Homepage-2880x1228-v1.jpg.img.2880.jpg"}
    ]

    const cards = [
        {img : 'https://imgd.aeplcdn.com/272x153/cw/body/suv.jpg?v=1&q=75',cardTitle:'Top Compact SUVs in India',cardBody:'Maruti Suzuki Brezza, Hyundai Venue'},
        {img : 'https://imgd.aeplcdn.com/272x153/cw/body/hatchbacks.jpg?v=1&q=75',cardTitle:'Top Hatchbacks in India',cardBody:'Maruti Suzuki Swift, Hyundai Grand i10 Nios'},
        {img : 'https://imgd.aeplcdn.com/227x128/n/cw/ec/40087/thar-exterior-right-front-three-quarter-11.jpeg?q=75',cardTitle:'Top SUVs in India',cardBody:'Mahindra Thar, Mahindra Scorpio-N'},
        {img : 'https://imgd.aeplcdn.com/227x128/n/cw/ec/116201/new-c-class-exterior-right-front-three-quarter-2.jpeg?isig=0&q=75',cardTitle:'Top Sedans in India',cardBody:'Hyundai Verna,Mercendes Benz,HondaCity'},
        {img : 'https://imgd.aeplcdn.com/227x128/n/cw/ec/46994/jaguar-f-type-right-front-three-quarter18.jpeg?q=75',cardTitle:'Top Luxury Cars in India',cardBody:'Jaguvur,Porsche,Rolls-Royce,LandRoverDefender'},
        {img : 'https://imgd.aeplcdn.com/227x128/n/cw/ec/47349/bmw-x8-left-side-view0.jpeg?q=75',cardTitle:'UpComing Luxury Cars',cardBody:'BMW X8,Volkswagen ID4,Ferrari purosangue'},
        {img : 'https://imgd.aeplcdn.com/227x128/n/cw/ec/14054/huracan-evo-exterior-right-front-three-quarter-2.jpeg?q=75',cardTitle:'Top Coupe in India',cardBody:'Lamborghini,McLaren720S,Lexus Lc 500h'},
    ]
    
    const cards2 = [
      {img:'https://imgd.aeplcdn.com/370x208/n/cw/ec/142587/mercedes-benz-g-class-right-front-three-quarter1.jpeg?isig=0&wm=1&q=75',cardTitle:'Mercendes-AMG63 Prices in India hiked By Rs75lakhs',cardText:'Mercedes-Benz has increased the price of the G63 AMG by a whopping Rs 75 lakh with immediate effect. The model, which was previously priced at Rs 2.55 crore, now retails with a price tag of Rs 3.30 crore',cardFooter:'3 Hours ago'},
      {img:'https://imgd.aeplcdn.com/370x208/n/cw/ec/142571/front-view0.jpeg?isig=0&q=75',cardTitle:'Tata Red Dark Editions to be Launched Tomorrow',cardText:'Tata Motors had recently hinted at the Red Dark Editions of the Harrier, Safari, and Nexon by releasing a set of teasers. And now, the brand has confirmed that they will be launching the Red Dark Editions tomorrow',cardFooter:'5 Hours ago'},
      {img:'https://imgd.aeplcdn.com/370x208/n/cw/ec/142521/nissan-right-rear-three-quarter0.jpeg?isig=0&q=75',cardTitle:'Nissan Ariya Electric SUV Spotted in India',cardText:'Nissan Ariya, the electric crossover, was recently spied on a flatbed in an uncamouflaged avatar. The carmaker is probably testing the vehicle on Indian soil.The Ariya could be a part of six new models in India',cardFooter:'22 Hours ago'},
      {img:'https://imgd.aeplcdn.com/370x208/n/cw/ec/142543/right-front-three-quarter0.jpeg?isig=0&wm=1&q=75',cardTitle:'MG motor Delivers 108units of Hectors to ORIX India',cardText:'Notably, Orix India is a subsidiary brand of Orix Corporation, Japan. It serves Indian corporates through its several business verticals, including car rentals, car leasing, and MG had delivered ZS EV and Astor to Orix India under their joint venture.' ,cardFooter:'8 Hours ago'}
    ]
    const breakPoints = [
        {width:1,itemsToShow:1},
        {width:550,itemsToShow:2},
        {width:768,itemsToShow:3},
        {width:1200,itemsToShow:4},
        
    ]
  return (
    <div>  
         <Carousel fade>
         {images.map(e=>(
         <Carousel.Item>   
        <img
          height={'500px'}
          width={'100%'}
          className="d-block w-100"
          src={e.url}
          alt="First slide"
        />
        </Carousel.Item>
        ))}
       </Carousel>

      <div className='mt-5'> 
      <CarouselCards breakPoints = {breakPoints}>   
       {cards.map(e=>(
          <Card style={{ width: '18rem' }}>
          <Card.Img variant="top" src={e.img} />
          <Card.Body>
            <Card.Title>{e.cardTitle}</Card.Title>
            <Card.Text>
              {e.cardBody}
            </Card.Text>
          </Card.Body>
        </Card>
     ))}
     </CarouselCards>
     </div>
     
     
    <div className='mt-5' >
    <Container>
      <Row>
        <Col>
        <h2>Anticipating Your Needs</h2>
        ASPR is a Authorised  Cars India Dealer based in Porur, Chennai.
        Our State of art Showroom Service center & Bodyshop, spread over 70,000 Sqft is provided the most 
        comprehesive car services in chennai. We take care of all your car need from buying a New Car, 
        Genral repair, Paint & body works, Spare Parts, Accident repairs,  Engine diganosis & Repairs,
        value added service, Honda Assure Used cars, accessoriers and Insurance Renewal. 
       </Col>
        <Col>
        <h2>Always Better</h2>
        Every person is empowered to identify issues, problems or flaws, and to derive solutions, even if it
        means digging deeper and working harder. This is what drives us, and it is what makes us aspr,
        This vibrant culture of service has been fundamental from the start and we are deeply committed
        to providing high quality of attention and care at every level, from design conception to dealership,
        and from purchase to service. 

</Col>
      </Row>
     </Container>
    </div>


     <div className='mt-5'>
      <h3>Latest Car Updates</h3>
     <CarouselCards breakPoints={breakPoints}>
     {cards2.map(e=>(
     <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={e.img}/>
      <Card.Body>
        <Card.Title>{e.cardTitle}</Card.Title>
        <Card.Text>{e.cardText}</Card.Text>
        <Card.Footer>
          <small className="text-muted">{e.cardFooter}</small>
        </Card.Footer>
      </Card.Body>
    </Card>
    ))}
    </CarouselCards>
    </div>
    <FooterMain/>
    </div>
  );
}


export default MainCarCarousel