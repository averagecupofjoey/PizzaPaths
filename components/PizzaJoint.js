import articleStyles from '../styles/Article.module.css';
import Image from 'next/image';
const PizzaJoint = ({ pizzaJoint }) => {
  console.log('THIS IS THE PIZZA JOINT DATA', pizzaJoint);
  return (
    <>
      <h1>{`Walk ${Math.ceil(
        pizzaJoint.travelDistance * 3.28084
      )} feet to...`}</h1>
      <br></br>
      <div className={articleStyles.card}>
        <h3>{pizzaJoint.name}</h3>
        <Image
          src={pizzaJoint.image_url}
          alt='Pizza stop image'
          width={500}
          height={500}
        ></Image>
      </div>
    </>
  );
};

export default PizzaJoint;
