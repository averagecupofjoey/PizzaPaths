import articleStyles from '../styles/Article.module.css';
import Image from 'next/image';
const PizzaJoint = ({ pizzaJoint, index }) => {
  console.log('THIS IS THE PIZZA JOINT DATA', pizzaJoint);
  return (
    <>
      {/* <h1>{`Walk ${Math.ceil(
        pizzaJoint.travelDistance * 3.28084
      )} feet to...`}</h1> */}
      <br></br>
      <div className={articleStyles.card}>
        <h4>{`Stop number ${index + 1}`}</h4>
        <h2>{pizzaJoint.name}</h2>
        <Image
          src={pizzaJoint.image_url}
          alt='Pizza stop image'
          width={500}
          height={500}
        ></Image>
        <h4>{pizzaJoint.location.display_address[0]}</h4>
        <h5>{`Yelp rating: ${pizzaJoint.rating}`}</h5>
      </div>
    </>
  );
};

export default PizzaJoint;
