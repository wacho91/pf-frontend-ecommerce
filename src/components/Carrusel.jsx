import Carousel from 'react-bootstrap/Carousel';

import blusas from '../images/blusas.png';
import blusas2 from '../images/blusas2.png';
import chaqueta from '../images/chaqueta.png';
import chaqueta2 from '../images/chaqueta2.png';
import chaqueta3 from '../images/chaqueta3.png';
import jeans from '../images/jeans.png';
import jeans2 from '../images/jeans2.jpg';
import vestido from '../images/vestido.png';
import vestido2 from '../images/vestido2.png';

const Carrusel = () => {

  return (
    <div>
      <Carousel>
      <Carousel.Item>
      <img style={{height: '80vh'}}
          className="d-block w-100"
          src={blusas}
          alt="First slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img style={{height: '80vh'}}
          className="d-block w-100"
          src={blusas2}
          alt="First slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img style={{height: '80vh'}}
          className="d-block w-100"
          src={chaqueta}
          alt="First slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img style={{height: '80vh'}}
          className="d-block w-100"
          src={chaqueta2}
          alt="First slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img style={{height: '80vh'}}
          className="d-block w-100"
          src={chaqueta3}
          alt="First slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img style={{height: '80vh'}}
          className="d-block w-100"
          src={jeans}
          alt="First slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img style={{height: '80vh'}}
          className="d-block w-100"
          src={jeans2}
          alt="First slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img style={{height: '80vh'}}
          className="d-block w-100"
          src={vestido}
          alt="First slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img style={{height: '80vh'}}
          className="d-block w-100"
          src={vestido2}
          alt="First slide"
        />
      </Carousel.Item>
      </Carousel>
    </div>
  )
}

export default Carrusel;