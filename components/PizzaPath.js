import PizzaJoint from './PizzaJoint';
import articleStyles from '../styles/Article.module.css';

const PizzaPath = ({ pizzaData, numSlices }) => {
  let slices = { numSlices };
  // const getNewPath = function (pizzaData, numSlices) {};
  // if({pizzaData}.{})
  console.log('In pizza path');
  console.log('The initial pizza data', pizzaData);
  console.log('Attempting to map data', pizzaData[slices][0]);
  return (
    <div className={articleStyles.grid}>
      {pizzaData[slices][0].map((pizzaJoint) => (
        <PizzaJoint pizzaJoint={pizzaJoint} key={pizzaJoint.id} />
      ))}
    </div>
  );
};

export default PizzaPath;
