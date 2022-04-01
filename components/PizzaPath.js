import PizzaJoint from './PizzaJoint';
import articleStyles from '../styles/Article.module.css';

const PizzaPath = ({ pizzaData, numSlices, pathNum }) => {
  let slices = numSlices;
  let routeNumber = pathNum;

  return (
    <div className={articleStyles.grid}>
      {pizzaData[Number(slices)][routeNumber].map((pizzaArray, index) => (
        <PizzaJoint pizzaJoint={pizzaArray} key={pizzaArray.id} index={index} />
      ))}
    </div>
  );
};

export default PizzaPath;
