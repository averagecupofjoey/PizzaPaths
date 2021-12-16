import articleStyles from '../styles/Article.module.css';
import Image from 'next/image';
const PizzaJoint = ({ pizzaJoint }) => {
  return (
    <div className={articleStyles.card}>
      <h3>{pizzaJoint.name}</h3>
      <Image
        src={pizzaJoint.image_url}
        alt='Pizza stop image'
        width={500}
        height={500}
      ></Image>
    </div>
  );
};

export default PizzaJoint;
