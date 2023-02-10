import articleStyles from '../styles/Article.module.css';
import Image from 'next/image';
const PizzaJoint = ({ pizzaJoint, index }) => {
  const copyAddress = () => {
    navigator.clipboard.writeText(pizzaJoint.location.display_address);
  };
  return (
    <>
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
        Heyyy
        <buton onClick={() => copyAddress()}>Copy Location Address</buton>
      </div>
    </>
  );
};

export default PizzaJoint;
