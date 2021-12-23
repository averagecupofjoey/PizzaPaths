import articleStyles from '../styles/Article.module.css';
import Image from 'next/image';
const PizzaJoint = ({ pizzaJoint, pizzaDistance }) => {
  console.log('THIS IS THE PIZZA JOINT DATA', pizzaJoint);
  return (
    <>
      <h1>{`Walk ${Math.ceil(pizzaDistance * 3.28084)} feet to...`}</h1>
      <br></br>
      <div className={articleStyles.card}>
        <h3>{pizzaJoint[0].name}</h3>
        <Image
          src={pizzaJoint[0].image_url}
          alt='Pizza stop image'
          width={500}
          height={500}
        ></Image>
      </div>
    </>
  );
};

export default PizzaJoint;
